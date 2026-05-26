#!/bin/bash
# Usage: minimax_call.sh <system_prompt_file> <user_prompt_file> <max_tokens> <output_file>
# Reads MINIMAX_API_KEY from /root/.env
# Writes raw response text to <output_file>
# Exit codes: 0 ok, 42 rate-limited, 1 other error
set -euo pipefail
set -a && source /root/.env && set +a

SYS_FILE="$1"; USR_FILE="$2"; MAX_TOK="$3"; OUT_FILE="$4"
TRACE_ID="hermes-$(date +%Y%m%d-%H%M%S)-$$"

SYS=$(jq -Rs . < "$SYS_FILE")
USR=$(jq -Rs . < "$USR_FILE")

PAYLOAD=$(cat <<EOF
{
  "model": "MiniMax-M2.7",
  "max_tokens": ${MAX_TOK},
  "temperature": 0.4,
  "messages": [
    {"role": "system", "content": ${SYS}},
    {"role": "user",   "content": ${USR}}
  ]
}
EOF
)

HTTP_CODE=$(curl -s -o /tmp/mm-${TRACE_ID}.json -w "%{http_code}" \
  -X POST "https://api.minimax.io/v1/chat/completions" \
  -H "Authorization: Bearer PLACEHOLDER
  -H "Content-Type: application/json" \
  -d "$PAYLOAD")

if [ "$HTTP_CODE" = "429" ]; then
  # Check if it's insufficient_balance (non-retryable) vs rate-limit (retryable)
  if grep -q '"type":"insufficient_balance_error"' /tmp/mm-${TRACE_ID}.json 2>/dev/null; then
    echo "INSUFFICIENT_BALANCE $(date)" >&2
    cat /tmp/mm-${TRACE_ID}.json >&2
    exit 43
  fi
  echo "RATE_LIMIT $(date)" >&2
  cat /tmp/mm-${TRACE_ID}.json >&2
  exit 42
elif [ "$HTTP_CODE" != "200" ]; then
  echo "MINIMAX_ERROR $HTTP_CODE" >&2
  cat /tmp/mm-${TRACE_ID}.json >&2
  exit 1
fi

# Extract content
jq -r '.choices[0].message.content' /tmp/mm-${TRACE_ID}.json > "$OUT_FILE"

# Log token usage
IN_TOK=$(jq -r '.usage.prompt_tokens // 0' /tmp/mm-${TRACE_ID}.json)
OUT_TOK=$(jq -r '.usage.completion_tokens // 0' /tmp/mm-${TRACE_ID}.json)
BUDGET_FILE="/root/projects/DaybyDay/hermes/state/budget-$(date +%Y-%m-%d).json"
python3 - <<PYEOF
import json, os
p = "${BUDGET_FILE}"
d = json.load(open(p)) if os.path.exists(p) else {"in":0,"out":0,"calls":0}
d["in"]  += ${IN_TOK}
d["out"] += ${OUT_TOK}
d["calls"] += 1
json.dump(d, open(p,"w"))
PYEOF

# Cleanup
rm -f /tmp/mm-${TRACE_ID}.json
exit 0