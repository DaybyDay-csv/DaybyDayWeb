#!/bin/bash
# DayByDay — IndexNow submitter
# Pushes URLs to api.indexnow.org (Bing, Yandex, Seznam, Naver) → powers ChatGPT/Perplexity AI search.
#
# Usage:
#   indexnow-submit.sh <url1> [url2 ...]   # specific URLs
#   indexnow-submit.sh --all               # all URLs from sitemap.xml
#   indexnow-submit.sh --new               # URLs with lastmod within 25h
#   indexnow-submit.sh --blog              # only blog URLs from sitemap
#
# State file enforces 24h dedup per URL to avoid burning the 99/day quota.

set -euo pipefail
set -a; source /root/.env; set +a

KEY="$INDEXNOW_KEY"
HOST="www.daybydayconsulting.com"
SITEMAP="https://${HOST}/sitemap.xml"
KEY_LOCATION="https://${HOST}/${KEY}.txt"
LOG_DIR="/root/logs"
LOG_FILE="${LOG_DIR}/indexnow-$(date +%Y-%m-%d).log"
STATE_FILE="/root/projects/DaybyDay/seo-plan/indexnow-submitted.json"
DEDUP_WINDOW=$((24*3600))

mkdir -p "$LOG_DIR" "$(dirname "$STATE_FILE")"
[ -f "$STATE_FILE" ] || echo '{}' > "$STATE_FILE"

log() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" | tee -a "$LOG_FILE"; }

mode="${1:-}"
case "$mode" in
  --all)
    URLS=$(curl -s "$SITEMAP" | grep -oP '(?<=<loc>)[^<]+')
    ;;
  --new)
    cutoff=$(date -u -d '25 hours ago' +%s)
    URLS=$(curl -s "$SITEMAP" | python3 - <<PY
import sys, re
from datetime import datetime, timezone
content = sys.stdin.read()
out = []
for block in re.findall(r'<url>(.*?)</url>', content, re.DOTALL):
    loc = re.search(r'<loc>([^<]+)</loc>', block)
    lm  = re.search(r'<lastmod>([^<]+)</lastmod>', block)
    if not loc: continue
    if not lm:
        out.append(loc.group(1)); continue
    try:
        d = datetime.strptime(lm.group(1)[:10], '%Y-%m-%d').replace(tzinfo=timezone.utc)
        if d.timestamp() >= ${cutoff}:
            out.append(loc.group(1))
    except Exception:
        pass
print('\n'.join(out))
PY
)
    ;;
  --blog)
    URLS=$(curl -s "$SITEMAP" | grep -oP '(?<=<loc>)[^<]+' | grep -E '/blog(/|$)')
    ;;
  ""|"-h"|"--help")
    echo "Usage: $0 --all | --new | --blog | <url> [url ...]"
    exit 1
    ;;
  *)
    URLS=$(printf '%s\n' "$@")
    ;;
esac

if [ -z "${URLS//[[:space:]]/}" ]; then
  log "No URLs matched mode=${mode}"
  exit 0
fi

NOW=$(date +%s)
FILTERED=$(echo "$URLS" | awk 'NF' | while IFS= read -r u; do
  last=$(jq -r --arg u "$u" '.[$u] // 0' "$STATE_FILE")
  if [ $((NOW - last)) -gt $DEDUP_WINDOW ]; then
    echo "$u"
  fi
done)

if [ -z "${FILTERED//[[:space:]]/}" ]; then
  log "All ${mode} URLs submitted within last 24h, skipping (dedup)"
  exit 0
fi

COUNT=$(echo "$FILTERED" | awk 'NF' | wc -l)
log "Submitting ${COUNT} URLs (mode=${mode})"

URL_JSON=$(echo "$FILTERED" | awk 'NF' | jq -R . | jq -s .)
PAYLOAD=$(jq -n \
  --arg host "$HOST" \
  --arg key "$KEY" \
  --arg kl "$KEY_LOCATION" \
  --argjson urls "$URL_JSON" \
  '{host:$host,key:$key,keyLocation:$kl,urlList:$urls}')

RESP_FILE=$(mktemp)
HTTP=$(curl -sS -o "$RESP_FILE" -w "%{http_code}" \
  -X POST -H "Content-Type: application/json" \
  -d "$PAYLOAD" https://api.indexnow.org/IndexNow || echo "000")

BODY=$(cat "$RESP_FILE")
rm -f "$RESP_FILE"
log "Response HTTP=${HTTP} body=${BODY:-<empty>}"

if [ "$HTTP" = "200" ] || [ "$HTTP" = "202" ]; then
  TMP=$(mktemp)
  jq --argjson now "$NOW" --argjson urls "$URL_JSON" \
    'reduce $urls[] as $u (.; .[$u] = $now)' "$STATE_FILE" > "$TMP" && mv "$TMP" "$STATE_FILE"
  log "OK: ${COUNT} URLs accepted"
  exit 0
else
  log "FAIL: HTTP=${HTTP}"
  exit 1
fi
