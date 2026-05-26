#!/bin/bash
# Blog Deploy + Health Check
# Usa después de generar posts para deployar a producción
set -euo pipefail

PROJECT_DIR="/root/projects/DaybyDay"
DEST_URL="www.daybydayconsulting.com"
MIN_HTML_SIZE=50000  # 50KB mínimo para HTML válido

cd "$PROJECT_DIR"

echo "=== BLOG DEPLOY HEALTH CHECK ==="

# 1. Verificar que dist existe y tiene contenido
if [ ! -d "dist" ]; then
    echo "ERROR: dist/ no existe. Ejecuta npm run build primero."
    exit 1
fi

INDEX_SIZE=$(wc -c < dist/index.html)
echo "[1/4] HTML size local: $INDEX_SIZE bytes"

if [ "$INDEX_SIZE" -lt "$MIN_HTML_SIZE" ]; then
    echo "ERROR: HTML suspiciously small (expected >$MIN_HTML_SIZE)"
    exit 1
fi

# 2. Deploy a Vercel
echo "[2/4] Deploying to Vercel..."
DEPLOY_OUTPUT=$(vercel --yes --prod dist/ 2>&1)
echo "$DEPLOY_OUTPUT"

# Extraer URL del deployment
DEPLOY_URL=$(echo "$DEPLOY_OUTPUT" | grep -o 'https://[^ ]*\.vercel\.app' | head -1)
if [ -z "$DEPLOY_URL" ]; then
    echo "ERROR: No se pudo obtener URL del deployment"
    exit 1
fi
echo "Deployment: $DEPLOY_URL"

# 3. Actualizar alias
echo "[3/4] Actualizando alias..."
vercel alias set "$DEPLOY_URL" "$DEST_URL"

# 4. Verificar que producción sirve HTML correcto
sleep 5
echo "[4/4] Verificando producción..."
PROD_SIZE=$(curl -s "https://$DEST_URL/" | wc -c)

if [ "$PROD_SIZE" -lt "$MIN_HTML_SIZE" ]; then
    echo "ERROR CRÍTICO: Producción sirve HTML de solo $PROD_SIZE bytes (esperado >$MIN_HTML_SIZE)"
    echo "Esto indica que el alias no apunta al deployment correcto."
    echo ""
    echo "SOLUCIÓN MANUAL:"
    echo "  vercel alias ls | grep $DEST_URL"
    echo "  vercel alias set $DEPLOY_URL $DEST_URL"
    exit 1
fi

echo ""
echo "=== SUCCESS ==="
echo "Producción: https://$DEST_URL/"
echo "HTML size: $PROD_SIZE bytes ✓"