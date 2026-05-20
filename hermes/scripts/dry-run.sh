#!/bin/bash
# Hermes dry-run harness.
# Uses hermes/fixtures/* instead of real LLM. Asserts pipeline works end-to-end.
# ALWAYS reverts the worktree at the end (git restore + clean .hermes-bak).
# Exit 0 = pipeline healthy. Non-zero = something is broken.

set -uo pipefail

HERMES=/root/projects/DaybyDay/hermes
REPO=/root/projects/DaybyDay
DATE=$(date +%Y-%m-%d)
START=$(date +%s)

echo "=== HERMES DRY RUN ==="
echo "Repo: $REPO"
echo "Date: $DATE"
echo

cd "$REPO"

# Pre-check: clean state
DIRTY=$(git status --porcelain | grep -vE '^\?\?.*\.(bak|hermes-bak)$' | grep -vE '^.. .claude/worktrees/' | wc -l)
if [ "$DIRTY" -gt 0 ]; then
  echo "✗ Repo not clean. Run 'git status' to inspect. Dry-run aborted."
  git status --short
  exit 30
fi

# Stash any state file that might interfere
STASH_PLAN=""
STASH_RESEARCH=""
[ -f "$HERMES/state/plan-$DATE.json" ] && {
  mv "$HERMES/state/plan-$DATE.json" "$HERMES/state/plan-$DATE.json.dryrun-stash"
  STASH_PLAN=1
}
[ -f "$HERMES/state/research-$DATE.json" ] && {
  mv "$HERMES/state/research-$DATE.json" "$HERMES/state/research-$DATE.json.dryrun-stash"
  STASH_RESEARCH=1
}

cleanup() {
  echo
  echo "=== CLEANUP ==="
  cd "$REPO"
  # Revert all tracked changes
  git checkout -- src/App.jsx src/pages/BlogPage.jsx public/sitemap.xml public/llms.txt seo-plan/estado.json 2>/dev/null || true
  # Remove the test blog file if created
  rm -f src/pages/blog/DryRunSampleHermesPipelineTestPage.jsx
  # Remove .hermes-bak files
  find "$REPO" -maxdepth 4 -name '*.hermes-bak' -delete 2>/dev/null || true
  # Remove dry-run state artifacts
  rm -f "$HERMES/state/plan-$DATE.json" "$HERMES/state/research-$DATE.json"
  rm -f "$HERMES/state/current.json.dryrun"
  # Restore stashed real state
  [ -n "$STASH_PLAN" ] && mv "$HERMES/state/plan-$DATE.json.dryrun-stash" "$HERMES/state/plan-$DATE.json" 2>/dev/null
  [ -n "$STASH_RESEARCH" ] && mv "$HERMES/state/research-$DATE.json.dryrun-stash" "$HERMES/state/research-$DATE.json" 2>/dev/null
  # Verify clean
  FINAL_DIRTY=$(git status --porcelain | grep -vE '^\?\?.*\.(bak|hermes-bak)$' | grep -vE '^.. .claude/worktrees/' | wc -l)
  if [ "$FINAL_DIRTY" -gt 0 ]; then
    echo "✗ CLEANUP INCOMPLETE — worktree dirty after dry-run:"
    git status --short
    exit 30
  fi
  echo "✓ worktree restored clean"
}
trap cleanup EXIT

# 1) Copy fixtures into state files
cp "$HERMES/fixtures/plan-sample.json"     "$HERMES/state/plan-$DATE.json"
cp "$HERMES/fixtures/research-sample.json" "$HERMES/state/research-$DATE.json"
echo "✓ fixtures copied to state"

# 2) Place the writer output JSX at the expected component path
SLUG=$(jq -r .slug "$HERMES/state/plan-$DATE.json")
COMPONENT=$(python3 -c "
import sys
parts = sys.argv[1].split('-')
print(''.join(p.capitalize() for p in parts) + 'Page')
" "$SLUG")
JSX_PATH="$REPO/src/pages/blog/${COMPONENT}.jsx"
cp "$HERMES/fixtures/writer-output-sample.jsx" "$JSX_PATH"
echo "✓ Writer fixture placed at $JSX_PATH"

# 3) JSX safety check (must pass on fixture)
if ! python3 "$HERMES/scripts/jsx-safe-check.py" "$JSX_PATH"; then
  echo "✗ jsx-safe-check FAILED on fixture — fixture is bad or check has false positive"
  exit 11
fi
echo "✓ jsx-safe-check passed"

# 4) Run Publisher (no LLM, full deterministic chain except the push)
HERMES_AUTOPUSH=0  # ensure no push
# Override the state so Publisher reads correct run_id
echo '{"phase":"PUBLISHING","task_id":"T999","run_id":"hermes-dryrun-test","retries":0}' > "$HERMES/state/current.json"

if ! bash "$HERMES/scripts/publisher.sh"; then
  echo "✗ Publisher failed during dry-run"
  exit 1
fi
echo "✓ Publisher completed"

# 5) Verify the 5 expected files were mutated
echo
echo "=== Verifying mutations ==="
for f in src/App.jsx src/pages/BlogPage.jsx public/sitemap.xml public/llms.txt seo-plan/estado.json; do
  if git diff --cached --name-only | grep -q "^$f$" || git diff --name-only HEAD | grep -q "^$f$" ; then
    echo "  ✓ $f mutated"
  else
    echo "  ✗ $f NOT mutated"
    exit 1
  fi
done

ELAPSED=$(( $(date +%s) - START ))
echo
echo "=== DRY RUN PASSED in ${ELAPSED}s ==="
echo "Component: $COMPONENT"
echo "Slug:      $SLUG"
echo "Cleanup will revert all changes. No real commit created."
exit 0
