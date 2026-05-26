#!/bin/bash
# DayByDay — GEO Monitor — Mondays 6:45 UTC
# GEO visibility in ChatGPT/Perplexity + Telegram alerts
set -a; source /root/.env; set +a

START_MSG="🌐 GEO Monitor started — $(date '+%Y-%m-%d %H:%M')
Checking ChatGPT + Perplexity visibility..."
/root/scripts/send-telegram.sh "$START_MSG" info &

cd /root

hermes run daybyday-geo-monitor --output-format compact
HERMES_EXIT=$?

# Also run geo-citation-tracker --daily for structured alert check
/root/scripts/geo-citation-tracker.py --daily >> /var/log/daybyday/geo-citation.log 2>&1 &
GEO_EXIT=$?

if [ $HERMES_EXIT -eq 0 ] && [ $GEO_EXIT -eq 0 ]; then
    /root/scripts/send-telegram.sh "✅ GEO Monitor completed — alerts sent if any" success &
else
    /root/scripts/send-telegram.sh "❌ GEO Monitor FAILED (hermes=$HERMES_EXIT geo=$GEO_EXIT)" error &
fi

exit 0  # Don't fail the cron just because geo tracker had issues