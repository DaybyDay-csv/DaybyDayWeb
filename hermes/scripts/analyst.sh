#!/bin/bash
# Analyst phase. Pure Python, NO LLM. Pulls GSC + Lighthouse, mutates keyword_priorities.
set -uo pipefail
set -a; [ -f /root/.env ] && source /root/.env; set +a

HERMES=/root/projects/DaybyDay/hermes
REPO=/root/projects/DaybyDay
DATE=$(date +%Y-%m-%d)

# Fetch GSC data (best effort)
if [ -x /root/scripts/gsc_fetch.py ]; then
  python3 /root/scripts/gsc_fetch.py --days 7 --output "$HERMES/state/gsc-daily.json" 2>&1 || echo "Analyst: gsc_fetch failed (non-fatal)"
fi

# Boost keyword priorities for GSC quick-wins
python3 - <<PYEOF
import json, datetime, pathlib
g = pathlib.Path("$HERMES/state/gsc-daily.json")
k = pathlib.Path("$REPO/seo-plan/keyword_priorities.json")
if not g.exists() or not k.exists():
    print("Analyst: gsc or keyword_priorities missing, skipping boost")
    raise SystemExit(0)
try:
    gsc = json.load(open(g))
    kp  = json.load(open(k))
except Exception as e:
    print(f"Analyst: parse failed {e}")
    raise SystemExit(0)
qwins = {r.get("query","").lower() for r in gsc
         if 4 <= (r.get("position") or 99) <= 10
         and (r.get("clicks") or 0) >= 5}
boosted = 0
for p in kp.get("priorities", []):
    kw = (p.get("keyword") or "").lower()
    if any(q in kw or kw in q for q in qwins) and p.get("priority") != "high":
        p["priority"] = "high"
        boosted += 1
kp["last_updated"] = datetime.datetime.utcnow().isoformat()
json.dump(kp, open(k, "w"), ensure_ascii=False, indent=2)
print(f"Analyst: boosted {boosted} keywords")
PYEOF

# Lighthouse on last published blog (best effort)
LAST_SLUG=$(jq -r '.published_posts[-1].slug // ""' "$REPO/seo-plan/estado.json" 2>/dev/null || true)
if [ -n "$LAST_SLUG" ] && [ -x /root/scripts/lighthouse-audit.sh ]; then
  /root/scripts/lighthouse-audit.sh "https://www.daybydayconsulting.com/blog/$LAST_SLUG" \
    > "$HERMES/state/lighthouse-${DATE}.json" 2>&1 || echo "Analyst: lighthouse failed (non-fatal)"
fi

echo "Analyst OK"
