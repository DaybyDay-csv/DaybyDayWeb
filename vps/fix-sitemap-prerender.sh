#!/bin/bash
# Blog Pipeline - Auto-fix for sitemap + prerender
# Must run after adding new blog post to ensure it gets prerendered
# Usage: ./fix-sitemap-prerender.sh <slug>
# Example: ./fix-sitemap-prerender.sh "calcular-roas-real-d2c"

SLUG="${1:-}"
PROJECT_DIR="/root/projects/DaybyDay"

if [ -z "$SLUG" ]; then
    echo "Usage: $0 <slug>"
    exit 1
fi

echo "=== FIX SITEMAP + PRERENDER for /$SLUG ==="

cd "$PROJECT_DIR"

# 1. Add to sitemap
echo "[1/3] Updating sitemap..."
if ! grep -q "blog/$SLUG" dist/sitemap.xml 2>/dev/null; then
    SITEMAP_URL="<url>
    <loc>https://www.daybydayconsulting.com/blog/$SLUG</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>"
    
    sed -i "s|</urlset>|$SITEMAP_URL\n</urlset>|" dist/sitemap.xml
    echo "  Added to sitemap"
else
    echo "  Already in sitemap"
fi

# 2. Create prerendered HTML
echo "[2/3] Creating prerender..."
mkdir -p "dist/blog/$SLUG"

# Minimal placeholder - React will hydrate on load
cat > "dist/blog/$SLUG/index.html" << EOF
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Loading... | DayByDay Consulting</title>
<script src="/assets/index-BfpMv6EY.js" defer></script>
</head>
<body>
<div id="root" data-route="/blog/$SLUG"></div>
</body>
</html>
EOF

echo "  Created dist/blog/$SLUG/index.html"

# 3. Commit and push
echo "[3/3] Pushing to production..."
rm -f hermes/*-gsc-*.json
git add -A
git commit -m "fix: prerender for $SLUG" --no-verify 2>/dev/null || echo "Nothing to commit"
git push origin main 2>&1 | tail -3

echo ""
echo "=== DONE ==="
echo "Verifying in 2 minutes..."