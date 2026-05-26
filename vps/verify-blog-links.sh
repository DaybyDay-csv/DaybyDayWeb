#!/usr/bin/env bash
# ============================================================================
# verify-blog-links.sh — Verifica links externos en posts del blog DayByDay
#
# Uso:
#   --file <path>     Verificar links de un solo post .jsx
#   --all             Verificar links de TODOS los posts del blog
#   --all --report    Generar reporte markdown en reports/link-audit-*.md
#   --quick           Solo HEAD request (más rápido, menos preciso)
#
# Ejemplos:
#   ./verify-blog-links.sh --file src/pages/blog/MiPostPage.jsx
#   ./verify-blog-links.sh --all
#   ./verify-blog-links.sh --all --report
# ============================================================================

set -uo pipefail
# Note: set -e is OFF so the main loop doesn't die on transient network errors

# ── Config ────────────────────────────────────────────────────────────────
BLOG_DIR="/root/projects/DaybyDay/src/pages/blog"
REPORTS_DIR="/root/projects/DaybyDay/reports"
TIMEOUT=8
MAX_REDIRECTS=5
USER_AGENT="Mozilla/5.0 DayByDay-LinkChecker/1.0"

# ── Colores ───────────────────────────────────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m' # No Color

# ── Flags ─────────────────────────────────────────────────────────────────
MODE=""
REPORT_MODE=false
QUICK_MODE=false

while [[ $# -gt 0 ]]; do
  case "$1" in
    --file) MODE="file"; TARGET_FILE="$2"; shift ;;
    --all)  MODE="all" ;;
    --quick) QUICK_MODE=true ;;
    --report) REPORT_MODE=true ;;
    *) echo "Unknown flag: $1"; exit 1 ;;
  esac
  shift
done

if [ -z "$MODE" ]; then
  echo "Usage: $0 [--file <path> | --all] [--quick] [--report]"
  exit 1
fi

# ── Funciones ─────────────────────────────────────────────────────────────

extract_urls() {
  # Extrae URLs externas (http/https) de archivos .jsx, excluyendo internas y de assets
  local file="$1"
  [ ! -f "$file" ] && return
  grep -oP 'href="(https?://[^"]+)"' "$file" \
    | sed 's/href="//;s/"//' \
    | grep -v 'daybydayconsulting.com' \
    | grep -v 'calendly.com' \
    | grep -v 'linkedin.com' \
    | grep -v 'localhost' \
    | grep -v '\.(png|jpg|jpeg|gif|svg|ico|webp)($|\?)' \
    | sort -u
}

check_url() {
  local url="$1"
  local method="${2:-GET}"
  
  if [ "$method" = "HEAD" ]; then
    curl -s -o /dev/null -w "%{http_code}" \
      --max-time "$TIMEOUT" \
      -L --max-redirs "$MAX_REDIRECTS" \
      -H "User-Agent: $USER_AGENT" \
      --head "$url" 2>/dev/null || echo "000"
  else
    curl -s -o /dev/null -w "%{http_code}" \
      --max-time "$TIMEOUT" \
      -L --max-redirs "$MAX_REDIRECTS" \
      -H "User-Agent: $USER_AGENT" \
      "$url" 2>/dev/null || echo "000"
  fi
}

get_final_url() {
  local url="$1"
  curl -s -o /dev/null -w "%{url_effective}" \
    --max-time "$TIMEOUT" \
    -L --max-redirs "$MAX_REDIRECTS" \
    -H "User-Agent: $USER_AGENT" \
    "$url" 2>/dev/null || echo "$url"
}

classify_status() {
  local code="$1"
  case "$code" in
    200) echo "OK" ;;
    301|302|307|308) echo "REDIRECT" ;;
    401|403) echo "AUTHWALL" ;;
    404) echo "NOTFOUND" ;;
    410) echo "GONE" ;;
    000) echo "TIMEOUT" ;;
    5*) echo "SERVERROR" ;;
    *) echo "OTHER" ;;
  esac
}

status_emoji() {
  local classification="$1"
  case "$classification" in
    OK)        echo "✅" ;;
    REDIRECT)  echo "🔀" ;;
    AUTHWALL)  echo "🔒" ;;
    NOTFOUND)  echo "❌" ;;
    GONE)      echo "💀" ;;
    TIMEOUT)   echo "⏱️" ;;
    SERVERROR) echo "🔥" ;;
    *)         echo "❓" ;;
  esac
}

# ── Main ──────────────────────────────────────────────────────────────────

TIMESTAMP=$(date +%Y-%m-%d)
TOTAL_LINKS=0
BROKEN_LINKS=0
REDIRECT_LINKS=0
AUTHWALL_LINKS=0

declare -A seen_urls  # Deduplicate across posts

echo ""
echo "🔗 DayByDay Blog Link Verifier"
echo "═══════════════════════════════════════════════════════════════"
echo "Hora: $(date)"
echo "Modo: $MODE $([ "$QUICK_MODE" = true ] && echo '(HEAD)' || echo '(GET)')"
echo ""

if [ "$MODE" = "file" ]; then
  FILES=("$TARGET_FILE")
else
  mapfile -t FILES < <(find "$BLOG_DIR" -maxdepth 1 -name '*.jsx' -type f | sort)
fi

for file in "${FILES[@]}"; do
  [ ! -f "$file" ] && continue
  
  filename=$(basename "$file" .jsx)
  urls=$(extract_urls "$file")
  [ -z "$urls" ] && continue
  
  echo -e "${BOLD}${CYAN}📄 ${filename}${NC}"
  
  while IFS= read -r url; do
    [ -z "$url" ] && continue
    
    # Skip if already checked
    if [ -n "${seen_urls[$url]:-}" ]; then
      continue
    fi
    seen_urls[$url]=1
    
    TOTAL_LINKS=$((TOTAL_LINKS + 1))
    
    method="GET"
    [ "$QUICK_MODE" = true ] && method="HEAD"
    
    http_code=$(check_url "$url" "$method")
    classification=$(classify_status "$http_code")
    emoji=$(status_emoji "$classification")
    
    # Show shortened URL for display
    display_url=$(echo "$url" | sed 's|https://||' | cut -c1-70)
    
    case "$classification" in
      OK)
        echo -e "  ${emoji} ${GREEN}200${NC}  ${display_url}"
        ;;
      REDIRECT)
        REDIRECT_LINKS=$((REDIRECT_LINKS + 1))
        final_url=$(get_final_url "$url")
        final_display=$(echo "$final_url" | sed 's|https://||' | cut -c1-55)
        echo -e "  ${emoji} ${YELLOW}${http_code}${NC} → ${final_display}"
        echo -e "        ${BOLD}origen:${NC} ${display_url}"
        ;;
      AUTHWALL)
        AUTHWALL_LINKS=$((AUTHWALL_LINKS + 1))
        echo -e "  ${emoji} ${YELLOW}${http_code}${NC}  ${display_url} ${YELLOW}(paywall/autenticación)${NC}"
        ;;
      NOTFOUND|GONE)
        BROKEN_LINKS=$((BROKEN_LINKS + 1))
        echo -e "  ${emoji} ${RED}${http_code}${NC}  ${display_url} ${RED}⚠️ ROTO${NC}"
        ;;
      TIMEOUT)
        BROKEN_LINKS=$((BROKEN_LINKS + 1))
        echo -e "  ${emoji} ${RED}TIMEOUT${NC} ${display_url} ${RED}(no responde en ${TIMEOUT}s)${NC}"
        ;;
      *)
        echo -e "  ${emoji} ${RED}${http_code}${NC}  ${display_url}"
        ;;
    esac
    
  done <<< "$urls"
  
  echo ""
done

# ── Resumen ────────────────────────────────────────────────────────────────
echo "═══════════════════════════════════════════════════════════════"
echo -e "${BOLD}📊 RESUMEN${NC}"
echo -e "  Total links externos: ${BOLD}${TOTAL_LINKS}${NC}"
echo -e "  ✅ OK:              ${GREEN}$((TOTAL_LINKS - BROKEN_LINKS - REDIRECT_LINKS - AUTHWALL_LINKS))${NC}"
echo -e "  🔀 Redirecciones:   ${YELLOW}${REDIRECT_LINKS}${NC}"
echo -e "  🔒 Paywalls:        ${YELLOW}${AUTHWALL_LINKS}${NC}"
echo -e "  ❌ Rotos:           ${RED}${BROKEN_LINKS}${NC}"
echo ""

# ── Report markdown (si --report) ─────────────────────────────────────────
if [ "$REPORT_MODE" = true ] && [ "$MODE" = "all" ]; then
  mkdir -p "$REPORTS_DIR"
  QUARTER="Q$(( ($(date +%-m)-1)/3+1 ))"
  REPORT_FILE="$REPORTS_DIR/link-audit-$(date +%Y)-${QUARTER}.md"
  
  cat > "$REPORT_FILE" << EOF
# Link Audit Report — DayByDay Blog
**Fecha:** $(date +%Y-%m-%d)  
**Posts analizados:** ${#FILES[@]}  
**Links externos totales:** ${TOTAL_LINKS}  
**Rotos:** ${BROKEN_LINKS}  
**Redirecciones:** ${REDIRECT_LINKS}  
**Paywalls:** ${AUTHWALL_LINKS}

## Links rotos (requieren acción)
EOF
  
  # Re-scan to get broken links detail for report
  unset seen_urls
  declare -A seen_urls
  
  for file in "${FILES[@]}"; do
    filename=$(basename "$file" .jsx)
    urls=$(extract_urls "$file")
    [ -z "$urls" ] && continue
    
    has_broken=false
    broken_section=""
    
    while IFS= read -r url; do
      [ -z "$url" ] && continue
      [ -n "${seen_urls[$url]:-}" ] && continue
      seen_urls[$url]=1
      
      http_code=$(check_url "$url" "GET")
      classification=$(classify_status "$http_code")
      
      if [ "$classification" = "NOTFOUND" ] || [ "$classification" = "GONE" ] || [ "$classification" = "TIMEOUT" ]; then
        has_broken=true
        broken_section+="- [ ] \`${http_code}\` ${url}"$'\n'
      fi
    done <<< "$urls"
    
    if [ "$has_broken" = true ]; then
      cat >> "$REPORT_FILE" << EOF

### ${filename}
${broken_section}
EOF
    fi
  done
  
  echo "" >> "$REPORT_FILE"
  echo "---" >> "$REPORT_FILE"
  echo "Generado por verify-blog-links.sh — $(date -Iseconds)" >> "$REPORT_FILE"
  
  echo -e "${GREEN}📝 Reporte guardado en: ${REPORT_FILE}${NC}"
fi

# ── Exit code ─────────────────────────────────────────────────────────────
if [ "$BROKEN_LINKS" -gt 0 ]; then
  exit 1
fi
exit 0
