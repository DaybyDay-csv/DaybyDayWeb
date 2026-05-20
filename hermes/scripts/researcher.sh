#!/bin/bash
# Researcher phase. Gathers ≥3 citations (Brave optional, MiniMax fallback).
set -uo pipefail
set -a; [ -f /root/.env ] && source /root/.env; set +a

HERMES=/root/projects/DaybyDay/hermes
DATE=$(date +%Y-%m-%d)
PLAN=$HERMES/state/plan-$DATE.json
OUT=$HERMES/state/research-$DATE.json

[ -f "$PLAN" ] || { echo "Researcher: plan-$DATE.json missing"; exit 1; }
if [ -f "$OUT" ] && jq -e '.citations | length >= 2' "$OUT" >/dev/null 2>&1; then
  echo "Researcher: research-$DATE.json exists with citations, skipping"
  exit 0
fi

KEYWORD=$(jq -r .keyword "$PLAN")

# Optional pre-fetch from Brave if key present
SEARCH_RESULTS='{"results":[]}'
if [ -n "${BRAVE_API_KEY:-}" ] && [ -x /root/scripts/brave_search.sh ]; then
  SEARCH_RESULTS=$(/root/scripts/brave_search.sh "$KEYWORD 2026 españa estadísticas" 2>/dev/null || echo '{"results":[]}')
fi

USR_FILE=$(mktemp)
trap 'rm -f $USR_FILE' EXIT

python3 - <<PYEOF > "$USR_FILE"
import json
plan = json.load(open("$PLAN"))
search = json.loads('''$SEARCH_RESULTS''') if '''$SEARCH_RESULTS''' else {"results": []}
print(json.dumps({
    "task_id": plan["task_id"],
    "keyword": plan["keyword"],
    "title": plan["title"],
    "search_results": search.get("results", [])
}, ensure_ascii=False, indent=2))
PYEOF

RAW="$OUT.raw"
/root/scripts/minimax_call.sh "$HERMES/prompts/researcher.md" "$USR_FILE" 6000 "$RAW"
RC=$?

if [ $RC -eq 64 ]; then
  echo "Researcher: Path A sentinel at $RAW. MiniMax must produce $OUT."
  exit 64
fi

[ $RC -ne 0 ] && exit $RC

python3 - <<PYEOF
import json, sys
try:
    d = json.load(open("$RAW"))
except Exception as e:
    print(f"Researcher output invalid JSON: {e}", file=sys.stderr); sys.exit(1)
if "citations" not in d or len(d["citations"]) < 2:
    print(f"Researcher output needs ≥2 citations, got {len(d.get('citations',[]))}", file=sys.stderr); sys.exit(1)
json.dump(d, open("$OUT","w"), ensure_ascii=False, indent=2)
PYEOF

rm -f "$RAW"
echo "Researcher OK"
