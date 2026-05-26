#!/bin/bash
# run-weekly-seo-report.sh — Telegram SEO Weekly Report
# Schedule: Mondays 7:00 AM UTC (9:00 AM Spain)
set -a; source /root/.env; set +a

export PATH=/usr/local/bin:/usr/bin:/bin:/root/.npm-global/bin
GSC_TOKEN_FILE="/root/.hermes/gsc_token.json"
LOG_DIR="/root/logs/lighthouse/weekly"
mkdir -p "$LOG_DIR"

log() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"; }

get_gsc_token() {
    local client_id="PLACEHOLDER_CLIENT_ID"
    local client_secret="PLACEHOLDER_CLIENT_SECRET"
    local refresh_token
    refresh_token=$(python3 -c "import json; d=json.load(open('$GSC_TOKEN_FILE')); print(d.get('refresh_token',''))" 2>/dev/null || echo "")
    curl -s -X POST "https://oauth2.googleapis.com/token" \
        -d "client_id="PLACEHOLDER_CLIENT_ID"" \
        | python3 -c "import json,sys; d=json.load(sys.stdin); print(d.get('access_token',''))"
}

get_gsc_summary() {
    local days="$1"
    local access_token="$2"
    local site="sc-domain%3Adaybydayconsulting.com"
    local end_date
    end_date=$(date +%Y-%m-%d)
    local start_date
    start_date=$(date +%Y-%m-%d --date="${days} days ago")

    curl -s -X POST "https://www.googleapis.com/webmasters/v3/sites/${site}/searchAnalytics/query" \
        -H "Authorization: Bearer ${access_token}" \
        -H "Content-Type: application/json" \
        -d "{\"startDate\":\"${start_date}\",\"endDate\":\"${end_date}\",\"dimensions\":[]}" \
        2>/dev/null
}

get_top_queries() {
    local days="$1"
    local access_token="$2"
    local site="sc-domain%3Adaybydayconsulting.com"
    local end_date
    end_date=$(date +%Y-%m-%d)
    local start_date
    start_date=$(date +%Y-%m-%d --date="${days} days ago")

    curl -s -X POST "https://www.googleapis.com/webmasters/v3/sites/${site}/searchAnalytics/query" \
        -H "Authorization: Bearer ${access_token}" \
        -H "Content-Type: application/json" \
        -d "{\"startDate\":\"${start_date}\",\"endDate\":\"${end_date}\",\"dimensions\":[\"query\"],\"rowLimit\":10,\"aggregationType\":\"byPage\"}" \
        2>/dev/null
}

# === MAIN ===
log "=== WEEKLY SEO REPORT START ==="
/root/scripts/send-telegram.sh "📊 Weekly SEO Report starting — $(date '+%Y-%m-%d %H:%M')" info &

TOKEN=$(get_gsc_token)
if [ -z "$TOKEN" ]; then
    log "ERROR: Failed to get GSC access token"
    exit 1
fi

# 7-day summary
GSC_7=$(get_gsc_summary 7 "$TOKEN")
Clicks7=$(echo "$GSC_7" | python3 -c "import json,sys; d=json.load(sys.stdin); r=d.get('rows',[]); print(int(sum(x.get('clicks',0) for x in r)))" 2>/dev/null || echo "0")
Impr7=$(echo "$GSC_7" | python3 -c "import json,sys; d=json.load(sys.stdin); r=d.get('rows',[]); print(int(sum(x.get('impressions',0) for x in r)))" 2>/dev/null || echo "0")
Pos7=$(echo "$GSC_7" | python3 -c "import json,sys; d=json.load(sys.stdin); r=d.get('rows',[]); print(round(sum(x.get('position',0)*x.get('impressions',0) for x in r)/sum(x.get('impressions',0) for x in r),1) if r else 0)" 2>/dev/null || echo "?")

# 28-day comparison
GSC_28=$(get_gsc_summary 28 "$TOKEN")
Clicks28=$(echo "$GSC_28" | python3 -c "import json,sys; d=json.load(sys.stdin); r=d.get('rows',[]); print(int(sum(x.get('clicks',0) for x in r)))" 2>/dev/null || echo "0")
Impr28=$(echo "$GSC_28" | python3 -c "import json,sys; d=json.load(sys.stdin); r=d.get('rows',[]); print(int(sum(x.get('impressions',0) for x in r)))" 2>/dev/null || echo "0")

# Top queries
TOP_Q=$(get_top_queries 7 "$TOKEN")
TOP_QUERIES=$(echo "$TOP_Q" | python3 -c "
import json,sys
d=json.load(sys.stdin)
rows=d.get('rows',[])
for r in rows[:5]:
    q=r.get('keys',['?'])[0]
    c=int(r.get('clicks',0))
    i=int(r.get('impressions',0))
    p=round(r.get('position',0),1)
    print(f'  #{r.index(q)+1} {q} → {c}clicks | {i}impr | pos {p}')
" 2>/dev/null || echo "  No data")

# Blog posts indexed
BLOG_COUNT=$(curl -s "https://www.daybydayconsulting.com/sitemap.xml" | grep -c "<loc>.*/blog/" || echo "?")

# Build report
REPORT="📊 WEEKLY SEO REPORT — DayByDay"
REPORT="${REPORT}
📅 $(date '+%Y-%m-%d') | week-$(date '+%G-%V')

━━━━━━━━━━━━━━━━━━━━━━━━
📈 GSC (últimos 7 días)
━━━━━━━━━━━━━━━━━━━━━━━━
🟢 Clicks: ${Clicks7}
🟡 Impresiones: ${Impr7}
📍 Posición media: ${Pos7}
━━━━━━━━━━━━━━━━━━━━━━━━
📊 GSC (últimos 28 días)
━━━━━━━━━━━━━━━━━━━━━━━━
  Clicks: ${Clicks28}
  Impresiones: ${Impr28}
━━━━━━━━━━━━━━━━━━━━━━━━
🔍 Top queries (7d)
━━━━━━━━━━━━━━━━━━━━━━━━
${TOP_QUERIES}
━━━━━━━━━━━━━━━━━━━━━━━━
📝 Blog posts indexados: ${BLOG_COUNT}
━━━━━━━━━━━━━━━━━━━━━━━━
🏆 Prompt Hatching — 27 posts tracking"

# Telegram
/root/scripts/send-telegram.sh "$REPORT" info
STATUS=$?
if [ $STATUS -eq 0 ]; then
    log "✅ Weekly report sent to Telegram"
else
    log "⚠️ Telegram failed (chat_id not registered yet)"
fi

log "=== WEEKLY SEO REPORT END ==="