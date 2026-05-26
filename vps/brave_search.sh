#!/bin/bash
# Brave Search wrapper for Hermes Researcher (Path B).
# Usage: brave_search.sh "query"
# Outputs JSON: {"results": [{"url","title","description"}, ...]}
# Requires BRAVE_API_KEY in /root/.env. Without it, emits empty results gracefully.

set -uo pipefail
set -a; [ -f /root/.env ] && source /root/.env; set +a

if [ $# -lt 1 ]; then
  echo '{"results": [], "error": "no query provided"}'
  exit 0
fi

QUERY="$1"

if [ -z "${BRAVE_API_KEY:-}" ]; then
  echo '{"results": [], "error": "BRAVE_API_KEY not set — Path B disabled"}'
  exit 0
fi

ENCODED=$(python3 -c "import urllib.parse, sys; print(urllib.parse.quote(sys.argv[1]))" "$QUERY")

RESP=$(curl -fsS --max-time 12 \
  "https://api.search.brave.com/res/v1/web/search?q=${ENCODED}&count=5&country=es&search_lang=es" \
  -H "X-Subscription-Token: ${BRAVE_API_KEY}" \
  -H "Accept: application/json" 2>/dev/null || echo '')

if [ -z "$RESP" ]; then
  echo '{"results": [], "error": "brave api call failed"}'
  exit 0
fi

echo "$RESP" | jq '{results: [(.web.results // [])[] | {url, title, description}]}' 2>/dev/null \
  || echo '{"results": [], "error": "brave response parse failed"}'
