#!/bin/bash
# run-keyword-db.sh — Refresh keyword DB daily (Mon-Fri 6:30am Spain)
# Uses: Brave Search (free) + GSC (authorized) + competitor SERP scrape
# Output: seo-plan/keyword-db.json
set -uo pipefail

set -a; source /root/.env; set +a

LOG="/var/log/daybyday/keyword-db-$(date +%Y-%m-%d).log"
DB_SCRIPT="/root/projects/DaybyDay/vps/keyword-db.py"

mkdir -p /var/log/daybyday

log() { echo "[$(date '+%F %T')] $*" | tee -a "$LOG"; }

log "Starting keyword DB refresh..."

python3 "$DB_SCRIPT" 2>&1 | tee -a "$LOG"
EXIT=$?

if [ $EXIT -eq 0 ]; then
    log "Keyword DB refresh complete"
else
    log "Keyword DB refresh failed (exit $EXIT)"
fi

exit $EXIT
