#!/bin/bash
# Hermes orchestrator — state machine, file-locked, idempotent, exit-code-disciplined.
# Path A (default): MiniMax IS the LLM and runs this script. Phase scripts that need LLM
#                   work emit a sentinel; MiniMax handles inline, then re-runs orchestrator.
# Path B: MINIMAX_API_KEY set in /root/.env → phase scripts call the API directly.

set -uo pipefail

set -a; [ -f /root/.env ] && source /root/.env; set +a

HERMES=/root/projects/DaybyDay/hermes
REPO=/root/projects/DaybyDay
STATE=$HERMES/state/current.json
LOCK=/var/lock/hermes.lock
DATE=$(date +%Y-%m-%d)
LOG_DIR=/var/log/daybyday
LOG=$LOG_DIR/hermes-$DATE.log
mkdir -p "$LOG_DIR" "$HERMES/state"

# Single instance via flock (if available)
if command -v flock >/dev/null 2>&1; then
  exec 200>"$LOCK"
  flock -n 200 || { echo "[$(date)] orchestrator: another instance is running" >> "$LOG"; exit 0; }
fi

log() { echo "[$(date '+%F %T')] $*" | tee -a "$LOG"; }

# Pre-flight: dirty git check (allow .bak / .hermes-bak untracked)
cd "$REPO"
DIRTY=$(git status --porcelain | grep -vE '^\?\?.*\.(bak|hermes-bak)$' || true)
if [ -n "$DIRTY" ]; then
  log "HALT(30): dirty git state:"
  echo "$DIRTY" | tee -a "$LOG"
  command -v /root/scripts/notify.sh >/dev/null && /root/scripts/notify.sh "Hermes halt: dirty git state" || true
  exit 30
fi

# Load or init state
if [ ! -f "$STATE" ]; then
  echo '{"phase":"IDLE","task_id":null,"run_id":null,"started_at":null,"retries":0,"last_error":null}' > "$STATE"
fi
PHASE=$(jq -r .phase "$STATE")
log "Resume phase=$PHASE"

set_state() {
  local k="$1" v="$2"
  jq "$k = $v" "$STATE" > "$STATE.tmp" && mv "$STATE.tmp" "$STATE"
}

run_phase() {
  local name="$1" cmd="$2"
  log "→ $name"
  if bash -c "$cmd" >> "$LOG" 2>&1; then
    log "✓ $name"
    set_state ".retries" "0"
    return 0
  fi
  local code=$?
  log "✗ $name (exit $code)"
  set_state ".last_error" "{\"phase\":\"$name\",\"code\":$code,\"timestamp\":\"$(date -u +%FT%TZ)\"}"
  case $code in
    42)
      # Rate limit — bump retries, exit cleanly so cron resumes
      local r=$(jq -r .retries "$STATE")
      if [ "$r" -ge 3 ]; then
        log "HALT: max retries on $name"
        command -v /root/scripts/notify.sh >/dev/null && /root/scripts/notify.sh "Hermes: max retries on $name" || true
        exit 1
      fi
      set_state ".retries" "$((r+1))"
      log "rate-limit, exit clean for next cron tick"
      exit 0
      ;;
    64)
      # Path A sentinel — phase script needs MiniMax in-session handling
      log "PATH_A: $name needs in-session MiniMax handling. See $HERMES/state/ for sentinel files."
      command -v /root/scripts/notify.sh >/dev/null && /root/scripts/notify.sh "Hermes: $name awaiting MiniMax inline handling" || true
      exit 64
      ;;
    *)
      command -v /root/scripts/notify.sh >/dev/null && /root/scripts/notify.sh "Hermes FAIL $name code=$code" || true
      exit "$code"
      ;;
  esac
}

case $PHASE in
  IDLE|FAILED|null)
    RUN_ID="hermes-$(date +%Y%m%d-%H%M%S)"
    NOW="$(date -u +%FT%TZ)"
    set_state ".phase" "\"PLANNING\""
    set_state ".run_id" "\"$RUN_ID\""
    set_state ".started_at" "\"$NOW\""
    set_state ".retries" "0"
    run_phase "Strategist" "$HERMES/scripts/strategist.sh"
    set_state ".phase" "\"PLANNED\""
    ;&
  PLANNED|PLANNING)
    set_state ".phase" "\"RESEARCHING\""
    run_phase "Researcher" "$HERMES/scripts/researcher.sh"
    set_state ".phase" "\"RESEARCHED\""
    ;&
  RESEARCHED|RESEARCHING)
    set_state ".phase" "\"WRITING\""
    run_phase "Writer" "$HERMES/scripts/writer.sh"
    set_state ".phase" "\"WRITTEN\""
    ;&
  WRITTEN|WRITING)
    set_state ".phase" "\"PUBLISHING\""
    run_phase "Publisher" "$HERMES/scripts/publisher.sh"
    set_state ".phase" "\"PUBLISHED\""
    ;&
  PUBLISHED|PUBLISHING)
    set_state ".phase" "\"ANALYZING\""
    run_phase "Analyst" "$HERMES/scripts/analyst.sh"
    set_state ".phase" "\"IDLE\""
    set_state ".task_id" "null"
    set_state ".retries" "0"
    ;;
  ANALYZING)
    run_phase "Analyst" "$HERMES/scripts/analyst.sh"
    set_state ".phase" "\"IDLE\""
    set_state ".task_id" "null"
    ;;
  *)
    log "Unknown phase '$PHASE', resetting to IDLE"
    set_state ".phase" "\"IDLE\""
    ;;
esac

log "✓ orchestrator run complete"
