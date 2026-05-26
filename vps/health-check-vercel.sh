#!/bin/bash
# Health check para detectar deploys rotos de Vercel
# Uso: ./health-check-vercel.sh

set -euo pipefail

DEST_URL="www.daybydayconsulting.com"
MIN_SIZE=50000

echo "=== VERCEL HEALTH CHECK ==="

SIZE=$(curl -s "https://$DEST_URL/" | wc -c)

if [ "$SIZE" -lt "$MIN_SIZE" ]; then
    echo "⚠️  ALERTA: HTML de solo $SIZE bytes (esperado >$MIN_SIZE)"
    echo ""
    echo "1. Ver deployments pendientes:"
    vercel ls | head -5
    echo ""
    echo "2. Verificar alias:"
    vercel alias ls | grep "$DEST_URL"
    echo ""
    echo "3. Fix inmediato:"
    echo "   cd /root/projects/DaybyDay"
    echo "   ./scripts/deploy-blog.sh"
    exit 1
fi

echo "✓ OK: HTML size = $SIZE bytes"