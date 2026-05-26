#!/bin/bash
# Blog Pipeline - End to End con MiniMax M2.5
# Usage: ./run-blog-post.sh <topic> <slug>
# Example: ./run-blog-post.sh "ROAS real" "calcular-roas-real-d2c"

set -euo pipefail

# Load env
API_KEY=$(grep MINIMAX_API_KEY /root/.env | cut -d'=' -f2 | tr -d '"')
PROJECT_DIR="/root/projects/DaybyDay"

TOPIC="${1:-}"
SLUG="${2:-}"

if [ -z "$TOPIC" ] || [ -z "$SLUG" ]; then
    echo "Usage: $0 <topic> <slug>"
    exit 1
fi

echo "=== BLOG PIPELINE: $TOPIC ==="

# 1. Generate content with MiniMax
echo "[1/7] Generando contenido..."
SYSTEM_PROMPT="Eres copywriter SEO para DayByDay Consulting. Posts en español, tono directo, sin corporativismo. Estructura: Hook -> 7 tácticas numbered -> FAQ -> CTA."
USER_PROMPT="Genera post de blog SEO sobre: $TOPIC

Slug: $SLUG
Keywords: $TOPIC,D2C,paid media
Formato:
- Hook (1 línea impactante)
- 7 tácticas numbered
- FAQ (3 items)
- CTA: 'Agenda discovery call'
- Links internos: 2+
- Links externos: 1+

IMPORTANTE: 
- NO usar >N% o >NK€ tal cual - escribir 'mayor de N%' o similar
- NO usar < simbolo en texto
- Genera SOLO el contenido del post, nada de código"

RESPONSE=$(curl -s -X POST "https://api.minimax.io/v1/chat/completions" \
  -H "Authorization: Bearer PLACEHOLDER
  -H "Content-Type: application/json" \
  -d "$(cat <<EOF
{
  "model": "MiniMax-M2.5",
  "max_tokens": 4000,
  "temperature": 0.7,
  "messages": [
    {"role": "system", "content": "$SYSTEM_PROMPT"},
    {"role": "user", "content": "$USER_PROMPT"}
  ]
}
EOF
)")"

# Check response
if ! echo "$RESPONSE" | python3 -c "import sys,json; d=json.load(sys.stdin); d.get('choices',[{}])[0].get('message',{}).get('content','')" 2>/dev/null; then
    echo "ERROR: API call failed"
    echo "$RESPONSE" | head -100
    exit 1
fi

# 2. Create page file
echo "[2/7] Creando archivo..."
PAGE_NAME="$(echo "$SLUG" | sed 's/-([a-z])/\U\1/g; s/-//g' | sed 's/^./\U&/')Page"
PAGE_FILE="$PROJECT_DIR/src/pages/blog/${PAGE_NAME}.jsx"

# Fix content - remove thinking tags and fix special chars
CONTENT_FIXED=$(echo "$RESPONSE" | python3 -c "
import sys,json,re
d=json.load(sys.stdin)
c = d.get('choices',[{}])[0].get('message',{}).get('content','')
# Remove thinking tags
c = re.sub(r'<[^>]+>', '', c)
# Fix > symbols
c = c.replace('>', 'mayor de').replace('<', 'menos de')
print(c)
")

echo "Skipping JSX generation - using simplified approach"
exit 0

# Above exits early to avoid breaking - need to redesign proper JSX template
# The actual pipeline is complex and needs the full JSX template
# For now this documents the working API approach