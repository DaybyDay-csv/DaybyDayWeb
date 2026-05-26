#!/bin/bash
# Daily blog prerender + GitHub commit
# Run: bash /root/scripts/daily-blog-seo-deploy.sh

set -e
cd /root/projects/DaybyDay

echo "[DEPLOY] Starting daily blog deploy..."

# 1. Kill any existing vite
pkill -f "vite preview" 2>/dev/null || true
sleep 1

# 2. Build Vite
npm run build

# 3. If dist-prebuilt exists, copy to dist/blog/
if [ -d "dist-prebuilt/blog" ]; then
    cp -rf dist-prebuilt/blog/* dist/blog/ 2>/dev/null && echo "[PRERENDER] Copied prebuilt blogs" || echo "[PRERENDER] Copy skipped"
else
    echo "[PRERENDER] Skipped (no dist-prebuilt)"
fi

# 4. GitHub commit + push
git add -A
git commit -m "daily: blog build" || echo "No changes"
git push origin main

echo "[DEPLOY] Done!"