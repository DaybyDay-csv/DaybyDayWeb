#!/bin/bash
# ─── run-ruflo-agent.sh ───────────────────────────────────────────────────
# Spawns a ruflo multi-agent swarm task autonomously.
# Usage: ./run-ruflo-agent.sh [agent-type] [task]
# Examples:
#   ./run-ruflo-agent.sh coordinator "analyze DayByDay prospects and generate outreach"
#   ./run-ruflo-agent.sh researcher "find D2C ecommerce brands Spain spending >5K meta ads"
# ──────────────────────────────────────────────────────────────────────────

AGENT_TYPE="${1:-coordinator}"
TASK="${2:-}"
LOG_DIR="/root/logs"
LOG_FILE="$LOG_DIR/ruflo-agent-$(date +%Y-%m-%d).log"
RUFLO_DIR="/root/projects/ruflo"

mkdir -p "$LOG_DIR"

log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] [$AGENT_TYPE] $1" | tee -a "$LOG_FILE"
}

if [ -z "$TASK" ]; then
  log "ERROR: No task provided."
  echo "Usage: $0 [agent-type] \"task description\""
  echo "Agent types: coordinator, researcher, coder, reviewer, architect, security-architect"
  exit 1
fi

log "=== Spawning ruflo swarm agent ==="
log "Agent: $AGENT_TYPE | Task: $TASK"

# Build the Claude prompt that initializes ruflo swarm
CLAUDE_PROMPT="You are running as part of the DayByDay Consulting autonomous agent system on a VPS.
Working directory: $RUFLO_DIR

Initialize a ruflo swarm and execute this task:
Agent type: $AGENT_TYPE
Task: $TASK

Use ruflo/claude-flow MCP tools if available (ruv-swarm, claude-flow).
Run all operations autonomously. Do not ask for confirmation.
Log results to $LOG_DIR/ruflo-agent-$(date +%Y-%m-%d).log"

/root/scripts/ruflo-wrapper.sh "$CLAUDE_PROMPT"
