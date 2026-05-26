#!/bin/bash
# send-telegram.sh — Shared Telegram sender for all DayByDay scripts
# Usage: send-telegram.sh "message" [severity]
#   severity: info (default), warn, error, success
# Reads: TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID from /root/.env
set -a; source /root/.env; set +a

MSG="${1:-}"
SEV="${2:-info}"

if [ -z "$MSG" ]; then
  echo "[send-telegram] Empty message, skipping"
  exit 0
fi

TOKEN="${TELEGRAM_BOT_TOKEN:-}"
CHAT_ID="${TELEGRAM_CHAT_ID:-}"

# Strip surrounding quotes if present (env vars sometimes carry them)
TOKEN="${TOKEN%\"}"
TOKEN="${TOKEN#\"}"
CHAT_ID="${CHAT_ID%\"}"
CHAT_ID="${CHAT_ID#\"}"

# Discovery: if env vars empty, read from legacy files
if [ -z "$TOKEN" ]; then
  TOKEN=$(cat /root/.telegram_bot_token 2>/dev/null | tr -d '"' || echo "")
fi
if [ -z "$CHAT_ID" ]; then
  CHAT_ID=$(cat /root/.telegram_chat_id 2>/dev/null | tr -d '"' || echo "")
fi

# Emoji prefix by severity
case "$SEV" in
  error)  PREFIX="❌ " ;;
  warn)   PREFIX="⚠️  " ;;
  success) PREFIX="✅ " ;;
  *)      PREFIX="ℹ️  " ;;
esac

PAYLOAD="${PREFIX}${MSG}"

# Escape HTML special chars
PAYLOAD="${PAYLOAD//&/&amp;}"
PAYLOAD="${PAYLOAD//</&lt;}"
PAYLOAD="${PAYLOAD//>/&gt;}"
PAYLOAD="${PAYLOAD//\"/&quot;}"

[ -z "$TOKEN" ] || [ -z "$CHAT_ID" ] && {
  echo "[send-telegram] Missing credentials (token=${TOKEN:0:5}... chat_id=${CHAT_ID:-empty})"
  exit 1
}

# Retry loop: 3 attempts, 2s delay
for ATTEMPT in 1 2 3; do
  RESP=$(curl -s -w "\n%{http_code}" -X POST \
    "https://api.telegram.org/bot${TOKEN}/sendMessage" \
    -d "chat_id=${CHAT_ID}" \
    -d "text=${PAYLOAD}" \
    -d "parse_mode=HTML" 2>&1)
  HTTP_CODE=$(echo "$RESP" | tail -1)
  BODY=$(echo "$RESP" | sed '$d')

  if [ "$HTTP_CODE" = "200" ]; then
    MSG_ID=$(echo "$BODY" | python3 -c "import json,sys; d=json.load(sys.stdin); print(d.get('result',{}).get('message_id',''))" 2>/dev/null || echo "")
    echo "[send-telegram] OK msg_id=$MSG_ID"
    exit 0
  fi

  echo "[send-telegram] Attempt $ATTEMPT failed HTTP=$HTTP_CODE — $BODY" >&2
  [ "$ATTEMPT" -lt 3 ] && sleep 2
done

echo "[send-telegram] All 3 attempts failed — giving up" >&2
exit 1