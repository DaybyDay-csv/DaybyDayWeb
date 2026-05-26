#!/bin/bash
# DayByDay — Weekly Lighthouse Audit + GSC Stats Report
# Schedule: Mondays 7:00 AM UTC (9:00 AM Spain)
# Purpose: Compare Lighthouse scores week-over-week, alert on regressions
# Telegram: send-telegram.sh on completion

set -e
export PATH=/usr/local/bin:/usr/bin:/bin:/root/.npm-global/bin
set -a; source /root/.env; set +a

LOG_DIR="/root/logs/lighthouse"
REPORT_DIR="$LOG_DIR/weekly"
mkdir -p "$REPORT_DIR"

TODAY=$(date +%Y-%m-%d)
WEEK_DIR="$REPORT_DIR/week-$(date +%G-%V)"
mkdir -p "$WEEK_DIR"

# Sample blog slugs (3 most recent from git log)
cd /root/projects/DaybyDay
SLUGS=$(git log --since="7 days ago" --name-only --format="" | grep -oP 'src/pages/blog/[^/]+' | sed 's|src/pages/blog/||;s|Page\.jsx||' | sort -u | head -3)

if [ -z "$SLUGS" ]; then
    /root/scripts/send-telegram.sh "📊 Weekly Lighthouse: no posts this week — skipped" info
    exit 0
fi

# Kill any stale HTTP servers
pkill -f "python3 -m http.server 8891" 2>/dev/null || true
sleep 1

# Start local server for Lighthouse
python3 -m http.server 8891 --directory /root/projects/DaybyDay/dist > /dev/null 2>&1 &
HTTP_PID=$!
sleep 3

export CHROME_PATH="/snap/chromium/3423/usr/lib/chromium-browser/chrome"
export PATH="$PATH:/root/.npm-global/bin"

REPORT_FILE="$WEEK_DIR/audit-$(date +%H%M).json"

# Run Lighthouse on first slug as sample
FIRST_SLUG=$(echo "$SLUGS" | head -1)
lighthouse "http://localhost:8891/blog/$FIRST_SLUG/" \
    --output=json --output-path="$REPORT_FILE" \
    --chrome-flags="--headless --no-sandbox --disable-dev-shm-usage" \
    --quiet 2>&1 | grep -v "^$" || true

kill $HTTP_PID 2>/dev/null
pkill -f "python3 -m http.server 8891" 2>/dev/null || true

# Extract scores
if [ -s "$REPORT_FILE" ]; then
    PERF=$(python3 -c "
import json, sys
with open('$REPORT_FILE') as f: d=json.load(f)
cats = d.get('categories', {})
perf = cats.get('performance', {}).get('score')
seo = cats.get('seo', {}).get('score')
a11y = cats.get('accessibility', {}).get('score')
print(f'perf={round(perf*100) if perf else 0} seo={round(seo*100) if seo else 0} a11y={round(a11y*100) if a11y else 0}')
" 2>/dev/null || echo "parse error")

    PREV_WEEK_DIR=$(ls -d $REPORT_DIR/week-* 2>/dev/null | sort | tail -1)
    PREV_REPORT=""
    if [ -n "$PREV_WEEK_DIR" ] && [ "$PREV_WEEK_DIR" != "$WEEK_DIR" ]; then
        PREV_REPORT=$(ls $PREV_WEEK_DIR/audit-*.json 2>/dev/null | head -1)
    fi

    CURRENT_PERF=${PERF##*perf=}
    CURRENT_PERF=${CURRENT_PERF%% *}
    PREV_PERF_NUM="?"
    WOW_DIFF="?"

    if [ -n "$PREV_REPORT" ] && [ -f "$PREV_REPORT" ]; then
        PREV_PERF_NUM=$(python3 -c "
import json
with open('$PREV_REPORT') as f: d=json.load(f)
perf = d.get('categories', {}).get('performance', {}).get('score')
print(round(perf*100) if perf else 0)
" 2>/dev/null || echo "?")
        if [ "$PREV_PERF_NUM" != "?" ] && [ "$CURRENT_PERF" != "0" ]; then
            WOW_DIFF=$(( CURRENT_PERF - PREV_PERF_NUM ))
        fi
    fi

    # Determine severity
    SEV="success"
    if [ "$CURRENT_PERF" -lt 50 ]; then
        SEV="error"
    elif [ "$CURRENT_PERF" -lt 70 ]; then
        SEV="warn"
    fi

    MSG="📊 Weekly Lighthouse Audit — $TODAY
Slug: $FIRST_SLUG
$PERF
vs prev week: perf $WOW_DIFF (prev: $PREV_PERF_NUM)"

    [ "$CURRENT_PERF" -lt 50 ] && MSG="$MSG
⚠️ PERFORMANCE BAJO — below 50 threshold"

    /root/scripts/send-telegram.sh "$MSG" "$SEV"
    echo "$TODAY|$FIRST_SLUG|$PERF" >> "$REPORT_DIR/weekly-log.csv"
else
    /root/scripts/send-telegram.sh "⚠️ Weekly Lighthouse: failed for $FIRST_SLUG — check logs" warn
fi