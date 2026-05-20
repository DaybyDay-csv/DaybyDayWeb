#!/bin/bash
# Writer phase. Produces one JSX blog file; runs jsx-safe-check after.
set -uo pipefail
set -a; [ -f /root/.env ] && source /root/.env; set +a

HERMES=/root/projects/DaybyDay/hermes
REPO=/root/projects/DaybyDay
DATE=$(date +%Y-%m-%d)
PLAN=$HERMES/state/plan-$DATE.json
RESEARCH=$HERMES/state/research-$DATE.json

[ -f "$PLAN" ]     || { echo "Writer: plan missing"; exit 1; }
[ -f "$RESEARCH" ] || { echo "Writer: research missing"; exit 1; }

SLUG=$(jq -r .slug "$PLAN")
TITLE=$(jq -r .title "$PLAN")
COMPONENT=$(python3 -c "
import sys
parts = sys.argv[1].split('-')
print(''.join(p.capitalize() for p in parts) + 'Page')
" "$SLUG")
JSX_PATH="$REPO/src/pages/blog/${COMPONENT}.jsx"

if [ -f "$JSX_PATH" ] && python3 "$HERMES/scripts/jsx-safe-check.py" "$JSX_PATH" >/dev/null 2>&1; then
  echo "Writer: $JSX_PATH exists and is safe, skipping"
  exit 0
fi

EXAMPLE_ID=$(jq -r '.example_id // ""' "$PLAN")
USR_FILE=$(mktemp)
trap 'rm -f $USR_FILE' EXIT

python3 - <<PYEOF > "$USR_FILE"
import json
plan     = json.load(open("$PLAN"))
research = json.load(open("$RESEARCH"))
branding = json.load(open("$HERMES/branding.json"))
checklist= json.load(open("$HERMES/checklist.json"))
examples = json.load(open("$HERMES/examples-pool.json"))
template = open("$HERMES/template.jsx").read()

example = next((e for e in examples["examples"] if e["id"]=="$EXAMPLE_ID"), examples["examples"][0])

print(json.dumps({
    "PLAN": plan,
    "RESEARCH": research,
    "BRANDING": branding,
    "CHECKLIST": checklist,
    "EXAMPLE": example,
    "TEMPLATE": template,
    "COMPONENT_NAME": "$COMPONENT"
}, ensure_ascii=False, indent=2))
PYEOF

/root/scripts/minimax_call.sh "$HERMES/prompts/writer.md" "$USR_FILE" 15000 "$JSX_PATH"
RC=$?

if [ $RC -eq 64 ]; then
  echo "Writer: Path A sentinel. MiniMax must produce $JSX_PATH."
  exit 64
fi

[ $RC -ne 0 ] && exit $RC

# Safety check
if ! python3 "$HERMES/scripts/jsx-safe-check.py" "$JSX_PATH"; then
  echo "Writer: jsx-safe-check FAILED. Removing $JSX_PATH."
  rm -f "$JSX_PATH"
  exit 11
fi

echo "Writer OK $JSX_PATH"
