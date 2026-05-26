#!/bin/bash
# Pivot-track retry — checks for today's rate-limit flag and re-runs once.
# Wired to cron after the Anthropic quota reset window (Berlin 19:00 = 17:00 UTC).

set -euo pipefail

DATE=$(date +%Y-%m-%d)
FLAG="/tmp/blog-retry-pivot-${DATE}.flag"
LOG="/var/log/daybyday/blog-pivot-retry-${DATE}.log"
mkdir -p /var/log/daybyday

if [ ! -f "$FLAG" ]; then
  exit 0
fi

echo "[$(date '+%F %T')] retry flag found — re-running pivot track" >> "$LOG"
rm -f "$FLAG"
/root/scripts/run-daily-blog.sh --track=pivot >> "$LOG" 2>&1
