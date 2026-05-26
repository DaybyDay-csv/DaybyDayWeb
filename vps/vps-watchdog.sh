#!/bin/bash
# VPS Watchdog — Auto-documentation for iteration limits and workflow completions
# Monitors logs and auto-saves progress to project tracking files

WATCHDOG_LOG="/root/logs/vps-watchdog.log"
PROGRESS_DIR="/root"
INTERVAL=120  # Run every 2 minutes
STATE_DIR="/root/logs/vps-watchdog-state"
LAST_RUN_FILE="$STATE_DIR/last_runs.json"

# Patterns de detección
ITERATION_LIMIT_PATTERNS="max_tool_calls|maximum.*exceeded|iteration.*limit|too many turns|maximum.*tool.*calls"
COMPLETION_PATTERNS="BLOG PUBLISHER DONE|PIPELINE COMPLETE|Agent end duration="
ERROR_PATTERNS="Vercel deploy FAILED|build gate: FAILED|Deploy blocked|pre-merge build gate"
BUILD_START_PATTERNS="Invoking Hermes|Starting agent|BLOG PUBLISHER START|Pipeline"

mkdir -p /root/logs /var/log/daybyday "$STATE_DIR"

log() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$WATCHDOG_LOG"; }

detect_project() {
    local context="$1"
    if echo "$context" | grep -qE "run-daily-blog|blog-.*\.log|claude/epic-pasteur|claude/pivot"; then
        echo "blog-pipeline"
    elif echo "$context" | grep -qE "orchestrator|outreach|prospect|client-acquisition"; then
        echo "client-acquisition"
    elif echo "$context" | grep -qE "ruflo"; then
        echo "ruflo"
    elif echo "$context" | grep -qE "daybyday|hermes"; then
        echo "daybyday-web"
    else
        echo "generic"
    fi
}

is_recent() {
    local logf="$1"
    local pattern="$2"
    # Create a simple state file per log+pattern
    local hash=$(echo "${logf}:${pattern}" | md5sum | cut -d' ' -f1)
    local lock_file="$STATE_DIR/${hash}.lock"
    local now=$(date +%s)

    if [ -f "$lock_file" ]; then
        local last_ts=$(cat "$lock_file" 2>/dev/null)
        local age=$((now - last_ts))
        if [ $age -lt 1800 ]; then  # Less than 30 min = skip
            return 1
        fi
    fi
    # Write current timestamp and document
    echo "$now" > "$lock_file"
    return 0
}

append_progress() {
    local project="$1"
    local status="$2"
    local message="$3"
    local timestamp=$(date '+%Y-%m-%d %H:%M')
    local progress_file="${PROJECT_FILES[$project]:-$PROGRESS_DIR/generic-progress.md}"

    case "$project" in
        "blog-pipeline")
            progress_file="/root/blogpost-build-status.md"
            ;;
        "client-acquisition")
            progress_file="/root/client-acquisition-progress.md"
            ;;
        *)
            progress_file="/root/vps-progress.md"
            ;;
    esac
    cat >> "$progress_file" << EOF

### $timestamp — $status
\`\`\`
$message
\`\`\`
EOF
    log "[$project] Progress saved to $progress_file"
}

append_build_start() {
    local project="$1"
    local message="$2"
    local timestamp=$(date '+%Y-%m-%d %H:%M')
    local progress_file="/root/blogpost-build-status.md"

    # Solo blog-pipeline por ahora
    if [ "$project" != "blog-pipeline" ]; then
        return
    fi

    cat >> "$progress_file" << EOF

### $timestamp — 🚀 BUILD STARTED
\`\`\`
$message
\`\`\`
EOF
    log "[$project] Build start documented"
}

check_logs() {
    # Only scan /var/log/daybyday (blog logs — unique) + /root/logs/orchestrator (client acquisition)
    # EXCLUDE /root/logs/blog-*.log — duplicate of /var/log/daybyday/blog-*.log (causes double documentation)
    local log_files=$(find /var/log/daybyday -name "*.log" -mmin -120 2>/dev/null)
    log_files="$log_files $(find /root/logs -name "orchestrator*.log" -mmin -120 2>/dev/null)"

    for logf in $log_files; do
        local basename=$(basename "$logf")
        local last_lines=$(tail -30 "$logf" 2>/dev/null)

        if echo "$last_lines" | grep -qE "$ITERATION_LIMIT_PATTERNS"; then
            local project=$(detect_project "$logf")
            local msg=$(echo "$last_lines" | grep -E "$ITERATION_LIMIT_PATTERNS" | tail -2 | tr '\n' ' ')
            is_recent "$logf" "iteration_limit" && {
                append_progress "$project" "⚠️ ITERATION LIMIT" "$msg"
                log "[!] Iteration limit detected in $logf"
            }

        elif echo "$last_lines" | grep -qE "$COMPLETION_PATTERNS"; then
            local project=$(detect_project "$logf")
            local duration=$(echo "$last_lines" | grep -oP 'Agent end duration=\K\d+' | tail -1)
            local status_text=$(echo "$last_lines" | grep -oP 'status=\w+' | tail -1 || echo "status=unknown")
            is_recent "$logf" "completion" && {
                append_progress "$project" "✅ COMPLETADO (${duration}s)" "$status_text"
                log "[OK] Workflow completed in $logf (${duration}s)"
            }

        elif echo "$last_lines" | grep -qE "$ERROR_PATTERNS"; then
            local project=$(detect_project "$logf")
            local error=$(echo "$last_lines" | grep -E "$ERROR_PATTERNS" | tail -1 | cut -c1-150)
            is_recent "$logf" "error" && {
                append_progress "$project" "❌ FALLO" "$error"
                log "[!] Error detected in $logf: $error"
                /root/scripts/send-telegram.sh "⚠️ VPS Error — $project
$error" error 2>/dev/null &
            }
        fi
    done

    # Check for build starts (blog only)
    local blog_log=$(find /var/log/daybyday -name "blog-$(date +%Y-%m-%d).log" -mmin -60 2>/dev/null | head -1)
    if [ -f "$blog_log" ]; then
        local last_start=$(tail -10 "$blog_log" 2>/dev/null | grep -E "$BUILD_START_PATTERNS" | tail -1)
        if [ -n "$last_start" ]; then
            # Solo documentar si no hay un start documentado hace poco
            local recent=$(tail -50 "$blog_log" 2>/dev/null | grep "BUILD STARTED" | tail -1)
            if [ -z "$recent" ]; then
                append_build_start "blog-pipeline" "$last_start"
            fi
        fi
    fi
}

# Modo daemon (ejecutar con nohup ./vps-watchdog.sh &)
if [ "${1:-}" = "--daemon" ]; then
    log "Watchdog starting in daemon mode (interval=${INTERVAL}s)"
    while true; do
        check_logs
        sleep $INTERVAL
    done
else
    # Modo one-shot (para cron)
    check_logs
fi