#!/bin/bash
# Publisher phase. Pure shell, NO LLM. Updates routes, builds, commits, pushes.
set -euo pipefail
set -a; [ -f /root/.env ] && source /root/.env; set +a

HERMES=/root/projects/DaybyDay/hermes
REPO=/root/projects/DaybyDay
DATE=$(date +%Y-%m-%d)
PLAN=$HERMES/state/plan-$DATE.json
STATE=$HERMES/state/current.json

[ -f "$PLAN" ] || { echo "Publisher: plan missing"; exit 1; }

cd "$REPO"

SLUG=$(jq -r .slug "$PLAN")
TITLE=$(jq -r .title "$PLAN")
KEYWORD=$(jq -r .keyword "$PLAN")
TASK_ID=$(jq -r .task_id "$PLAN")
CATEGORY=$(jq -r '.category // "Estrategia D2C"' "$PLAN")
READING_TIME=$(jq -r '.reading_time // 11' "$PLAN")
COMPONENT=$(python3 -c "
import sys
parts = sys.argv[1].split('-')
print(''.join(p.capitalize() for p in parts) + 'Page')
" "$SLUG")
JSX_PATH="src/pages/blog/${COMPONENT}.jsx"
RUN_ID=$(jq -r .run_id "$STATE")

[ -f "$JSX_PATH" ] || { echo "Publisher: $JSX_PATH not found"; exit 1; }

# Excerpt: prefer META description from JSX file if extractable; fallback to title-derived blurb
EXCERPT=$(python3 - <<PYEOF
import re, sys
text = open("$JSX_PATH").read()
m = re.search(r'description="([^"]{40,400})"', text)
print(m.group(1) if m else "$TITLE — guía DayByDay Consulting.")
PYEOF
)

# 1. Kill leaked prerender ports
fuser -k 4173/tcp 4174/tcp 4175/tcp 4176/tcp 4177/tcp 2>/dev/null || true

# 2. Run deterministic route updater
node "$HERMES/scripts/update-routes.js" \
  --slug "$SLUG" \
  --title "$TITLE" \
  --component "$COMPONENT" \
  --taskId "$TASK_ID" \
  --keyword "$KEYWORD" \
  --excerpt "$EXCERPT" \
  --category "$CATEGORY" \
  --reading-time "$READING_TIME"

# 3. JSX safety
python3 "$HERMES/scripts/jsx-safe-check.py" "$JSX_PATH" || exit 11

# 4. Build
npm run build || exit 10

# 5. Stage allowed files only
git add "$JSX_PATH" \
        src/App.jsx \
        src/pages/BlogPage.jsx \
        public/sitemap.xml \
        public/llms.txt \
        seo-plan/estado.json

# 6. Conflict-marker guard
if git diff --cached -U0 | grep -E '^\+[<>=]{7}' >/dev/null 2>&1; then
  echo "Publisher: conflict markers in staged content"
  exit 12
fi

# 7. Commit (skip cleanly if there's nothing to commit, e.g. re-run idempotency)
if git diff --cached --quiet; then
  echo "Publisher: nothing staged to commit (idempotent re-run)"
else
  git commit -m "feat(blog): ${SLUG} — keyword: ${KEYWORD} [task=${TASK_ID}] [run=${RUN_ID}]"
fi

# 8. Push (guarded — only if HERMES_AUTOPUSH=1)
if [ "${HERMES_AUTOPUSH:-0}" = "1" ]; then
  BRANCH=$(git branch --show-current)
  git push origin "$BRANCH"
else
  echo "Publisher: HERMES_AUTOPUSH not set, skipping push. Branch: $(git branch --show-current)"
fi

# 9. IndexNow ping (only if pushed and URL becomes live)
if [ "${HERMES_AUTOPUSH:-0}" = "1" ] && [ -x /root/scripts/indexnow-submit.sh ]; then
  URL="https://www.daybydayconsulting.com/blog/${SLUG}"
  for i in 1 2 3 4 5; do
    sleep 60
    if curl -fsI "$URL" >/dev/null 2>&1; then
      /root/scripts/indexnow-submit.sh "$URL" || true
      break
    fi
  done
fi

echo "Publisher OK $SLUG"
