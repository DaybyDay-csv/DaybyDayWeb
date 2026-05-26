#!/bin/bash
# Daily blog prerender + deploy script
# Run: bash /root/scripts/daily-blog-deploy.sh

set -e
cd /root/projects/DaybyDay

echo "[DEPLOY] Starting daily blog deploy..."

# 1. Kill any existing vite
pkill -f "vite preview" 2>/dev/null || true
sleep 1

# 2. Build
npm run build

# 3. Start server, prerender blogs
NODE_PATH=/root/.npm-global/lib/node_modules node -e '
const {chromium} = require("playwright");
const fs = require("fs");
const {spawn,execSync} = require("child_process");

(async () => {
  const srv = spawn("npx",["vite","preview","--port","4195"], {cwd:"/root/projects/DaybyDay", stdio:"ignore"});
  await new Promise(r=>setTimeout(r, 4000));
  
  const br = await chromium.launch({headless:true});
  const pg = await br.newPage();
  
  const blogs = [
    "que-es-roas-meta-ads","meta-ads-vs-google-ads","como-reducir-cpa-ecommerce",
    "estrategia-full-funnel-meta-ads-d2c","automatizacion-marketing-que-es",
    "agencia-paid-media-vs-generalista","advantage-plus-shopping-cuando-usarlo-no",
    "cbo-vs-abo-meta-ads-2026-cual-gana-en-ecommerce-espana",
    "meta-ads-creative-strategy-2026","como-mejorar-roas-meta-ads-7-palancas"
  ];
  
  for(let b of blogs) {
    try {
      await pg.goto("http://localhost:4195/blog/"+b, {waitUntil:"networkidle", timeout:15000});
      const html = await pg.content();
      fs.mkdirSync("dist/blog/"+b, {recursive:true});
      fs.writeFileSync("dist/blog/"+b+"/index.html", html);
      console.log("OK:", b);
    } catch(e) { console.log("ERR:", b); }
  }
  await br.close();
  srv.kill();
  
  // 4. Zip
  execSync("rm -f /tmp/blog-deploy.zip && cd dist && zip -r /tmp/blog-deploy.zip . -x *.map", {cwd:"/root/projects/DaybyDay"});
  console.log("ZIP ready");
})();
'

# 5. Deploy to Cloudflare
echo "[DEPLOY] Uploading to Cloudflare..."
CF_ACC="f07baa80011ef9da206ccbcbd33ca27a"
CF_TOK="PLACEHOLDER_CF_TOKEN2"

RESP=$(curl -s -X POST \
  -H "Authorization: Bearer PLACEHOLDER
  -H "Content-Type: application/zip" \
  --data-binary "@/tmp/blog-deploy.zip" \
  "https://api.cloudflare.com/client/v4/accounts/$CF_ACC/pages/projects/daybyday/deployments")

DEPLOY_ID=$(echo $RESP | jq -r '.result.id')
DEPLOY_URL=$(echo $RESP | jq -r '.result.url')

echo "[DEPLOY] Done! URL: $DEPLOY_URL"

# Cleanup
pkill -f "vite preview" 2>/dev/null || true
rm -f /tmp/blog-deploy.zip