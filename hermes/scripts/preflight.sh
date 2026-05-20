#!/bin/bash
# Hermes preflight validator. Run FIRST before any orchestrator run.
# Exit 0 = ready. Exit 1 = blocked, with remediation steps.
set -uo pipefail

HERMES=/root/projects/DaybyDay/hermes
REPO=/root/projects/DaybyDay
PASS=0
FAIL=0
WARN=0

ok()   { echo "  ✓ $1"; PASS=$((PASS+1)); }
warn() { echo "  ⚠ $1"; WARN=$((WARN+1)); }
fail() { echo "  ✗ $1"; FAIL=$((FAIL+1)); }

echo "=== HERMES PREFLIGHT ==="
echo
echo "[1/8] Filesystem"
for d in $HERMES $HERMES/scripts $HERMES/prompts $HERMES/state $HERMES/fixtures $REPO/src/pages/blog $REPO/public; do
  [ -d "$d" ] && ok "dir $d" || fail "missing dir $d"
done

echo
echo "[2/8] Config files"
for f in branding.json checklist.json examples-pool.json template.jsx HERMES_WHITEPAPER.md SCHEMAS.md; do
  [ -f "$HERMES/$f" ] && ok "$f" || fail "missing $HERMES/$f"
done

echo
echo "[3/8] Scripts"
for s in jsx-safe-check.py update-routes.js; do
  [ -x "$HERMES/scripts/$s" ] && ok "$s (executable)" || warn "$s not executable, fixing"
  chmod +x "$HERMES/scripts/$s" 2>/dev/null || true
done

echo
echo "[4/8] Markers in source files"
grep -q 'HERMES_IMPORTS_END' $REPO/src/App.jsx     && ok "App.jsx imports marker"  || fail "App.jsx missing HERMES_IMPORTS_END"
grep -q 'HERMES_ROUTES_END'  $REPO/src/App.jsx     && ok "App.jsx routes marker"   || fail "App.jsx missing HERMES_ROUTES_END"
grep -q 'HERMES_POSTS_START' $REPO/src/pages/BlogPage.jsx && ok "BlogPage marker" || fail "BlogPage.jsx missing HERMES_POSTS_START"

echo
echo "[5/8] Env vars (/root/.env)"
if [ -f /root/.env ]; then
  set -a; source /root/.env; set +a
  for v in VERCEL_TOKEN TELEGRAM_BOT_TOKEN TELEGRAM_CHAT_ID INDEXNOW_KEY GSC_CLIENT_ID GSC_CLIENT_SECRET; do
    [ -n "${!v:-}" ] && ok "$v set" || fail "$v missing in /root/.env"
  done
  # Optional (Path B only)
  for v in MINIMAX_API_KEY BRAVE_API_KEY; do
    [ -n "${!v:-}" ] && ok "$v set (Path B enabled)" || warn "$v missing — Path A only (MiniMax-as-orchestrator)"
  done
else
  fail "/root/.env not found"
fi

echo
echo "[6/8] Dependencies"
command -v node >/dev/null && ok "node $(node -v)" || fail "node not installed"
command -v npm  >/dev/null && ok "npm $(npm -v)"  || fail "npm not installed"
command -v jq   >/dev/null && ok "jq"             || fail "jq missing — apt install jq"
command -v python3 >/dev/null && ok "python3"     || fail "python3 missing"
command -v git  >/dev/null && ok "git"            || fail "git missing"
command -v curl >/dev/null && ok "curl"           || fail "curl missing"
command -v flock >/dev/null && ok "flock"         || warn "flock missing — concurrency guard disabled"
command -v fuser >/dev/null && ok "fuser"         || warn "fuser missing — port-kill disabled (apt install psmisc)"
[ -x /root/scripts/notify.sh ] && ok "notify.sh" || warn "notify.sh missing or not executable"

echo
echo "[7/8] Git state"
cd $REPO
BRANCH=$(git branch --show-current)
[ -n "$BRANCH" ] && ok "branch=$BRANCH" || fail "detached HEAD"
DIRTY=$(git status --porcelain | grep -v '^??.*\.\(bak\|hermes-bak\)$' | wc -l)
[ "$DIRTY" -eq 0 ] && ok "working tree clean (excl .bak)" || warn "working tree has $DIRTY unexpected changes"
git remote get-url origin >/dev/null 2>&1 && ok "remote origin configured" || fail "no remote origin"

echo
echo "[8/8] Estado data"
PENDING=$(jq '[.tasks[] | select(.status=="pending")] | length' $REPO/seo-plan/estado.json 2>/dev/null)
PUBLISHED=$(jq '[.tasks[] | select(.status=="published")] | length' $REPO/seo-plan/estado.json 2>/dev/null)
if [ -n "$PENDING" ]; then
  ok "estado.json parseable ($PENDING pending, $PUBLISHED published)"
  [ "$PENDING" -gt 0 ] || warn "no pending tasks — Strategist will idle"
else
  fail "estado.json invalid JSON"
fi
[ -f $REPO/seo-plan/keyword_priorities.json ] && ok "keyword_priorities.json exists" || warn "keyword_priorities.json missing"

echo
echo "=== RESULT ==="
echo "  PASS: $PASS"
echo "  WARN: $WARN"
echo "  FAIL: $FAIL"
echo
if [ $FAIL -gt 0 ]; then
  echo "❌ NOT READY. Fix failures above before running orchestrator."
  exit 1
fi
if [ $WARN -gt 0 ]; then
  echo "⚠️  READY WITH WARNINGS. Review above. Path A (MiniMax-as-orchestrator) works without Path B keys."
  exit 0
fi
echo "✅ READY. Run: $HERMES/scripts/orchestrator.sh"
exit 0
