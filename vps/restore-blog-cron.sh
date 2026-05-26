#!/bin/bash
# Post-sprint cron management — May 16 2026 onwards
# PIVOT FASE 1+ active: keep 2 current (5,17 UTC) + 1 pivot (14 UTC)
# This script is now a no-op confirmation — it preserves the dual-track schedule
# FASE 2 (8 días+) bumps pivot to 9+14 UTC; that switch happens manually after gate

LOG=/var/log/daybyday/cron-restore.log
mkdir -p /var/log/daybyday
echo "[$(date)] Sprint end — preserving dual-track cron (FASE 1: 2 current + 1 pivot)" >> "$LOG"

crontab -l 2>/dev/null > /tmp/crontab.snapshot

# Verify expected lines exist
HAS_CURRENT=$(grep -c "^0 5,17 \* \* \* /root/scripts/run-daily-blog.sh" /tmp/crontab.snapshot || true)
HAS_PIVOT=$(grep -c "^0 14 \* \* \* /root/scripts/run-daily-blog.sh --track=pivot" /tmp/crontab.snapshot || true)

echo "[$(date)] current line present=${HAS_CURRENT} pivot line present=${HAS_PIVOT}" >> "$LOG"
echo "[$(date)] Final schedule:" >> "$LOG"
grep run-daily-blog /tmp/crontab.snapshot >> "$LOG"

if [ "$HAS_CURRENT" = "1" ] && [ "$HAS_PIVOT" = "1" ]; then
  /root/scripts/notify.sh "✅ Sprint end (May 15) — dual-track preservado: current 5+17 UTC + pivot 14 UTC" 2>/dev/null &
else
  /root/scripts/notify.sh "⚠️ Sprint end — cron dual-track INESPERADO (current=${HAS_CURRENT} pivot=${HAS_PIVOT}). Revisar manualmente." 2>/dev/null &
fi
