#!/bin/bash
# Hermes Blog Pipeline — deterministic, single-topic, exit-code-disciplined.
# Run via cron: 0 7 * * 1-5 /root/scripts/run-hermes-blog.sh
#
# Exit codes:
#   0  = ok (published or already exists)
#   42 = rate-limit (MiniMax), retry later
#   43 = insufficient balance
#   1  = other error
set -uo pipefail

set -a; source /root/.env; set +a

REPO="/root/projects/DaybyDay"
SEO_PLAN="$REPO/seo-plan"
LOG="/var/log/daybyday/hermes-blog-$(date +%Y-%m-%d).log"
PIPELINE="$REPO/vps/blog-pipeline-v4.py"

mkdir -p /var/log/daybyday

log() { echo "[$(date '+%F %T')] $*" | tee -a "$LOG"; }

# --- Pre-flight: dirty git ---
cd "$REPO" || { log "Repo not found"; exit 1; }
DIRTY=$(git status --porcelain | grep -vE '^\?\?.*\.(bak|hermes-bak)$' || true)
if [ -n "$DIRTY" ]; then
  log "HALT: dirty git: $DIRTY"
  exit 30
fi

# --- Pick next pending topic ---
log "Selecting next topic..."

NEXT=$(jq -r '
  .tasks
  | map(select(.status == "pending" or .status == "published"))
  | first
  | "\(.id)|\(.keyword // .title)|\(.cluster // "general")"
' "$SEO_PLAN/estado.json" 2>/dev/null)

if [ -z "$NEXT" ] || [ "$NEXT" = "null|null|null" ]; then
  log "No pending topics found in estado.json"
  exit 0
fi

TOPIC_ID=$(echo "$NEXT" | cut -d'|' -f1)
TOPIC=$(echo "$NEXT" | cut -d'|' -f2)
CLUSTER=$(echo "$NEXT" | cut -d'|' -f3)

log "Selected: [$TOPIC_ID] $TOPIC (cluster=$CLUSTER)"

# --- Run v4 pipeline ---
log "Running v4 pipeline..."
cd "$REPO"

TOPIC_SLUG=$(python3 - "$TOPIC" <<'PYEOF'
import sys, re
t = sys.stdin.read().strip()
slug = re.sub(r'[^a-z0-9\s]', '', t.lower())
slug = re.sub(r'\s+', '-', slug)[:50]
print(slug)
PYEOF
)

# Check if already published
PUBLISHED=$(jq -r '.published_posts[]' "$SEO_PLAN/estado.json" 2>/dev/null)
if echo "$PUBLISHED" | grep -q "^${TOPIC_SLUG}$"; then
  log "Already published: $TOPIC_SLUG — skipping"
  exit 0
fi

# Run pipeline with fixed v4
python3 "$PIPELINE" "$TOPIC" 2>&1 | tee -a "$LOG"
PIPE_EXIT=${PIPESTATUS[0]}

if [ "$PIPE_EXIT" -eq 42 ]; then
  log "RATE_LIMIT — exit clean for retry"
  exit 42
elif [ "$PIPE_EXIT" -eq 43 ]; then
  log "INSUFFICIENT_BALANCE"
  exit 43
elif [ "$PIPE_EXIT" -ne 0 ]; then
  log "PIPELINE_FAILED (exit $PIPE_EXIT)"
  exit 1
fi

# --- Mark as published in estado.json ---
python3 - "$SEO_PLAN/estado.json" "$TOPIC_ID" <<'PYEOF'
import json, sys
path, tid = sys.argv[1], sys.argv[2]
with open(path) as f: d = json.load(f)
for t in d.get("tasks", []):
    if t.get("id") == tid:
        t["status"] = "published"
        break
d["published_posts"] = d.get("published_posts", [])
slug = tid.lower().replace("t", "")
if slug not in d["published_posts"]:
    d["published_posts"].append(slug)
with open(path, "w") as f: json.dump(d, f, indent=2)
print("Updated estado.json")
PYEOF

log "Hermes blog pipeline complete: $TOPIC"
exit 0
