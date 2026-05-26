#!/bin/bash
# ─── ruflo-wrapper.sh ─────────────────────────────────────────────────────
# Runs a Claude/ruflo agent task with automatic rate-limit retry.
# Usage: ./ruflo-wrapper.sh "your task prompt"
# ──────────────────────────────────────────────────────────────────────────

TASK="${1:-}"
LOG_DIR="/root/logs"
LOG_FILE="$LOG_DIR/ruflo-$(date +%Y-%m-%d).log"
WAIT_MINUTES=60  # wait time when rate limited (credits exhausted)
MAX_RETRIES=48   # 48 x 60min = 48h max wait before giving up

mkdir -p "$LOG_DIR"

log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

if [ -z "$TASK" ]; then
  log "ERROR: No task provided. Usage: $0 \"your task prompt\""
  exit 1
fi

log "=== Starting ruflo task ==="
log "Task: $TASK"

attempt=0
while true; do
  attempt=$((attempt + 1))
  log "Attempt #$attempt"

  # Run claude with bypass permissions and pipe-mode (non-interactive)
  OUTPUT=$(claude --dangerously-skip-permissions -p "$TASK" 2>&1)
  EXIT_CODE=$?

  # Check for rate limit / credit exhaustion patterns
  if echo "$OUTPUT" | grep -qiE "rate.limit|credit|quota|overload|529|529|too many|usage limit|capacity"; then
    log "RATE LIMITED / CREDITS EXHAUSTED detected."
    if [ "$attempt" -ge "$MAX_RETRIES" ]; then
      log "Max retries ($MAX_RETRIES) reached. Giving up."
      exit 2
    fi
    log "Waiting ${WAIT_MINUTES} minutes before retry..."
    sleep $((WAIT_MINUTES * 60))
    continue
  fi

  if [ "$EXIT_CODE" -eq 0 ]; then
    log "Task completed successfully."
    echo "$OUTPUT" >> "$LOG_FILE"
    break
  else
    log "Task failed with exit code $EXIT_CODE."
    echo "$OUTPUT" >> "$LOG_FILE"
    exit "$EXIT_CODE"
  fi
done

log "=== Done ==="
