#!/bin/bash
# DayByDay Daily Health Check — sends Telegram alerts on failures
# Cron: 0 8 * * * /root/scripts/health-check.sh
set -a; source /root/.env; set +a

ISSUES=()
STATUS_LINES=()

# 1. Check Claude auth (legacy check — Hermes uses MiniMax, not Claude)
EXPIRED=$(python3 -c "
import json,time
with open('/root/.claude/.credentials.json') as f:
    d = json.load(f)
c = d.get('claudeAiOauth', {})
exp = c.get('expiresAt', 0) / 1000
now = time.time()
print('expired' if now > exp else 'ok')
" 2>/dev/null)

API_KEY="${ANTHROPIC_API_KEY:-}"

if [ "$EXPIRED" = 'expired' ] && [ -z "$API_KEY" ]; then
  ISSUES+=('❌ Claude auth expired — necesitas API key')
  STATUS_LINES+=('Auth: EXPIRED (no API key)')
elif [ "$EXPIRED" = 'expired' ]; then
  STATUS_LINES+=('Auth: CLI expired, usando API key')
else
  STATUS_LINES+=('Auth: OK')
fi

# 2. Check for agents stuck in 'running' > 2 hours
# Clean up stale runs first
docker exec daybyday-postgres psql -U daybyday -d daybyday -c \
  "UPDATE agent_runs SET status='stale' WHERE status='running' AND (started_at < NOW() - INTERVAL '24 hours' OR finished_at IS NULL AND started_at < NOW() - INTERVAL '1 hour');" \
  2>/dev/null

STUCK=$(docker exec daybyday-postgres psql -U daybyday -d daybyday -t -c \
  "SELECT COUNT(*) FROM agent_runs WHERE status='running' AND started_at < NOW() - INTERVAL '2 hours';" \
  2>/dev/null | tr -d ' \n\r')

if [ -n "$STUCK" ] && [ "$STUCK" -gt 0 ]; then
  ISSUES+=('⚠️ '"$STUCK"' agentes bloqueados en running > 2h')
fi

# 3. Clean up stale/timeout runs older than 7 days to keep DB small
docker exec daybyday-postgres psql -U daybyday -d daybyday -c \
  "DELETE FROM agent_runs WHERE status IN ('stale','timeout','failed') AND started_at < NOW() - INTERVAL '7 days';" \
  2>/dev/null

# 4. Check for failed agents in last 24h
FAILED=$(docker exec daybyday-postgres psql -U daybyday -d daybyday -t -c \
  "SELECT COUNT(*) FROM agent_runs WHERE status='failed' AND started_at > NOW() - INTERVAL '24 hours';" \
  2>/dev/null | tr -d ' \n\r')

SUCCEEDED=$(docker exec daybyday-postgres psql -U daybyday -d daybyday -t -c \
  "SELECT COUNT(*) FROM agent_runs WHERE status='success' AND started_at > NOW() - INTERVAL '24 hours';" \
  2>/dev/null | tr -d ' \n\r')

STATUS_LINES+=('Runs 24h: '"${SUCCEEDED:-0}"' OK / '"${FAILED:-0}"' failed')

# 4. Check dashboard
HTTP=$(curl -s -o /dev/null -w '%{http_code}' https://dashboard.daybydayconsulting.com/ 2>/dev/null)
[ "$HTTP" != '200' ] && ISSUES+=('❌ Dashboard no responde (HTTP '"$HTTP"')')
STATUS_LINES+=('Dashboard: '"$HTTP")

# 5. Check PostgreSQL
PG=$(docker exec daybyday-postgres psql -U daybyday -d daybyday -t -c 'SELECT 1' 2>/dev/null | tr -d ' \n')
[ "$PG" != '1' ] && ISSUES+=('❌ PostgreSQL no responde')
STATUS_LINES+=('PostgreSQL: '"$([ "$PG" = '1' ] && echo OK || echo FAIL)")

# 6. Check blog publishing failures — 3-strike escalation
FAIL_COUNT=0
for log in /var/log/daybyday/blog-cron.log /var/log/daybyday/blog-pivot-cron.log; do
  if [ -f "$log" ]; then
    # Count consecutive failures from tail of log
    tail -20 "$log" | grep -q "EXIT_CODE: 1\|ERROR\|FAILED" && FAIL_COUNT=$((FAIL_COUNT + $(tail -20 "$log" | grep -c "EXIT_CODE: 1\|ERROR\|FAILED")))
  fi
done

ESCALATION_FILE="/root/logs/.escalation-strike-count"
STRIKES=$(cat "$ESCALATION_FILE" 2>/dev/null || echo 0)

if [ "$FAIL_COUNT" -gt 0 ]; then
  STRIKES=$((STRIKES + FAIL_COUNT))
  echo "$STRIKES" > "$ESCALATION_FILE"
  if [ "$STRIKES" -ge 3 ]; then
    ISSUES+=('🚨 '"$STRIKES"' strikes — blog publish failures escalating. Human review required.')
    echo "0" > "$ESCALATION_FILE"  # Reset after escalation
  fi
else
  # Reset strikes on success
  [ -f "$ESCALATION_FILE" ] && echo "0" > "$ESCALATION_FILE"
fi

# Build message
MSG="DayByDay Health Check - $(date '+%Y-%m-%d %H:%M')"
MSG="$MSG
"
for line in "${STATUS_LINES[@]}"; do
  MSG="$MSG
• $line"
done

if [ ${#ISSUES[@]} -gt 0 ]; then
  SEV="error"
  MSG="$MSG

ALERTAS:"
  for issue in "${ISSUES[@]}"; do
    MSG="$MSG
$issue"
  done
else
  SEV="success"
fi
/root/scripts/send-telegram.sh "$MSG" "$SEV"