#!/bin/bash
# Usage: notify.sh "message"
set -a; source /root/.env; set +a

# TELEGRAM_BOT_TOKEN sourced from /root/.env
CHAT_ID_FILE="/root/.telegram_chat_id"

if [ ! -f "$CHAT_ID_FILE" ]; then
  CHAT_ID=$(curl -s "https://api.telegram.org/bot${TOKEN}/getUpdates" | \
    python3 -c 'import json,sys; d=json.load(sys.stdin); msgs=d.get("result",[]); print(msgs[-1]["message"]["chat"]["id"] if msgs else "")' 2>/dev/null)
  [ -n "$CHAT_ID" ] && echo "$CHAT_ID" > "$CHAT_ID_FILE"
fi

CHAT_ID=$(cat "$CHAT_ID_FILE" 2>/dev/null)
[ -z "$CHAT_ID" ] && exit 0

MSG="🤖 DayByDay VPS
$1"
curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
  -d "chat_id=${CHAT_ID}" \
  -d "text=${MSG}" \
  -d "parse_mode=HTML" > /dev/null