#!/bin/bash
# Prerender blogs using Playwright + build
# Run: bash /root/scripts/prerender-blogs.sh

set -e
cd /root/projects/DaybyDay

echo "[PRERENDER] Starting..."

# Kill any existing vite
pkill -f "vite preview" 2>/dev/null || true
sleep 1

# Start preview server
npx vite preview --port 4173 &
VITE_PID=$!
sleep 3

# Function to prerender a route
prerender_route() {
    local route=$1
    local slug=$(basename "$route")
    local outdir="dist/blog/$slug"
    
    echo "Prerendering: $route..."
    
    node -e "
const {chromium} = require('playwright');

(async () => {
  const br = await chromium.launch({headless:true});
  const pg = await br.newPage();
  
  await pg.goto('http://localhost:4173$route', {
    waitUntil: 'networkidle',
    timeout: 20000
  });
  
  const html = await pg.content();
  
  // Make sure directory exists
  require('fs').mkdirSync('$outdir', {recursive:true});
  require('fs').writeFileSync('$outdir/index.html', html);
  
  console.log('OK: $slug');
  await br.close();
})().catch(e => console.log('ERR: $slug - ' + e.message));
"
}

# Prerender key blog routes
prerender_route "/blog/presupuesto-minimo-meta-ads-sin-tirar-dinero"
prerender_route "/blog/ab-testing-meta-ads-que-testar-primero"
prerender_route "/blog/advantage-plus-shopping-cuando-usarlo-no"

# Kill vite
kill $VITE_PID 2>/dev/null || true

echo "[PRERENDER] Done!"

# Now commit
git add -A
git commit -m "prerender: static HTML for blogs" || echo "No changes"
git push origin main