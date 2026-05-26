#!/bin/bash
# DayByDay — SEO Weekly — Mondays 6:30 UTC
# Runs full GSC + Lighthouse + GEO weekly review + sends Telegram reports
set -a; source /root/.env; set +a

LOG="/var/log/daybyday/seo-cron.log"
exec > >(tee -a "$LOG") 2>&1

START_MSG="📊 SEO Weekly started — $(date '+%Y-%m-%d %H:%M')
Running full weekly review (GSC + Lighthouse + GEO)..."
/root/scripts/send-telegram.sh "$START_MSG" info &

cd /root

# Run the hermes weekly review
hermes run daybyday-seo-weekly --output-format compact
HERMES_EXIT=$?

if [ $HERMES_EXIT -eq 0 ]; then
    /root/scripts/send-telegram.sh "✅ SEO Weekly completed — $(date '+%Y-%m-%d %H:%M')" success &
else
    /root/scripts/send-telegram.sh "❌ SEO Weekly FAILED (exit=$HERMES_EXIT) — check logs" error &
fi

exit $HERMES_EXIT