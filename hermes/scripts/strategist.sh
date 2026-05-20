#!/bin/bash
# Strategist phase. Builds input, calls LLM (Path A or B), validates output.
set -uo pipefail
set -a; [ -f /root/.env ] && source /root/.env; set +a

HERMES=/root/projects/DaybyDay/hermes
REPO=/root/projects/DaybyDay
DATE=$(date +%Y-%m-%d)
OUT=$HERMES/state/plan-$DATE.json

if [ -f "$OUT" ] && jq -e .task_id "$OUT" >/dev/null 2>&1; then
  echo "Strategist: plan-$DATE.json exists with task_id, skipping"
  TASK_ID=$(jq -r .task_id "$OUT")
  jq ".task_id=\"$TASK_ID\"" "$HERMES/state/current.json" > "$HERMES/state/current.json.tmp" && \
    mv "$HERMES/state/current.json.tmp" "$HERMES/state/current.json"
  exit 0
fi

USR_FILE=$(mktemp)
trap 'rm -f $USR_FILE' EXIT

python3 - <<PYEOF > "$USR_FILE"
import json
est = json.load(open("$REPO/seo-plan/estado.json"))
top5 = sorted([t for t in est.get("tasks",[]) if t.get("status")=="pending" and t.get("type")=="article"],
              key=lambda t: t["id"])[:5]
pub_posts = est.get("published_posts", []) or []
pub_slugs = []
for p in pub_posts:
    if isinstance(p, str):
        pub_slugs.append(p)
    elif isinstance(p, dict) and p.get("slug"):
        pub_slugs.append(p["slug"])

try:
    kp = json.load(open("$REPO/seo-plan/keyword_priorities.json"))
    top10 = (kp.get("priorities") or [])[:10]
except FileNotFoundError:
    top10 = []

try:
    gsc = json.load(open("$HERMES/state/gsc-daily.json"))
except FileNotFoundError:
    gsc = []

print(json.dumps({
    "top5_pending": top5,
    "published_post_slugs": pub_slugs,
    "top10_keywords": top10,
    "gsc_quickwins": gsc
}, ensure_ascii=False, indent=2))
PYEOF

# Call LLM
RAW="$OUT.raw"
/root/scripts/minimax_call.sh "$HERMES/prompts/strategist.md" "$USR_FILE" 4000 "$RAW"
RC=$?

if [ $RC -eq 64 ]; then
  # Path A — MiniMax-in-session takes over
  echo "Strategist: Path A sentinel written to $RAW. MiniMax must produce $OUT."
  exit 64
fi

[ $RC -ne 0 ] && exit $RC

# Validate JSON
python3 - <<PYEOF
import json, sys
try:
    d = json.load(open("$RAW"))
except Exception as e:
    print(f"Strategist output invalid JSON: {e}", file=sys.stderr); sys.exit(1)
required = ["task_id","title","slug","keyword","faqs","internal_link_slugs"]
missing = [k for k in required if k not in d]
if missing:
    print(f"Strategist output missing keys: {missing}", file=sys.stderr); sys.exit(1)
json.dump(d, open("$OUT","w"), ensure_ascii=False, indent=2)
PYEOF

rm -f "$RAW"

TASK_ID=$(jq -r .task_id "$OUT")
jq ".task_id=\"$TASK_ID\"" "$HERMES/state/current.json" > "$HERMES/state/current.json.tmp" && \
  mv "$HERMES/state/current.json.tmp" "$HERMES/state/current.json"
echo "Strategist OK task=$TASK_ID"
