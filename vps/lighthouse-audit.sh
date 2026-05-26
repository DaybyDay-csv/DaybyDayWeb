#!/bin/bash
# lighthouse-audit.sh — Ejecuta Lighthouse en build local y genera informe de scores
# Uso: lighthouse-audit.sh <slug> [output_json]
# Ejemplo: lighthouse-audit.sh juicio-cross-funcional-founder-d2c /tmp/lh-result.json

set -e

SLUG="$1"
OUTPUT="${2:-/tmp/lh-result.json}"
DIST_DIR="/root/projects/DaybyDay/.claude/worktrees/pivot-growth/dist"
LH_BIN="/root/.npm-global/bin/lighthouse"
CHROME_PATH="/snap/chromium/3423/usr/lib/chromium-browser/chrome"
export CHROME_PATH
export PATH="$PATH:/root/.npm-global/bin"

if [ -z "$SLUG" ]; then
    echo "Usage: lighthouse-audit.sh <slug> [output_json]"
    exit 1
fi

# Asegurar que el servidor local está corriendo
if ! curl -s http://localhost:8888 > /dev/null 2>&1; then
    echo "[lighthouse-audit] Starting local server on :8888"
    python3 -m http.server 8888 --directory "$DIST_DIR" > /dev/null 2>&1 &
    sleep 2
fi

URL="http://localhost:8888/blog/${SLUG}/"

echo "[lighthouse-audit] Running Lighthouse on $URL"

$LH_BIN "$URL" \
    --output=json \
    --output-path="$OUTPUT" \
    --chrome-flags="--headless --no-sandbox" \
    --preset=desktop \
    --quiet \
    2>/dev/null

if [ $? -eq 0 ]; then
    echo "[lighthouse-audit] Audit complete: $OUTPUT"
else
    echo "[lighthouse-audit] WARN: Lighthouse exited with non-zero"
fi

# Parse scores y extraer summary
python3 << PYEOF
import json, sys

try:
    with open("$OUTPUT") as f:
        d = json.load(f)
except:
    print("[lighthouse-audit] ERROR: Could not parse JSON")
    sys.exit(1)

cats = d.get('categories', {})
audits = d.get('audits', {})

scores = {}
for cat, info in cats.items():
    s = info.get('score')
    scores[cat] = round(s * 100) if s is not None else 0

# Core vitals
vitals = {
    'lcp': audits.get('largest-contentful-paint', {}),
    'cls': audits.get('cumulative-layout-shift', {}),
    'inp': audits.get('interaction-to-next-paint', {}),
    'tbt': audits.get('total-blocking-time', {}),
}

vitals_out = {}
for k, a in vitals.items():
    nv = a.get('numericValue')
    if nv is not None:
        vitals_out[k] = {
            'value': round(nv, 0),
            'display': a.get('displayValue', ''),
            'score': round(a.get('score', 0) * 100) if a.get('score') is not None else 0
        }

# SEO issues
seo_issues = []
for key in ['canonical', 'meta-description', 'hreflang', 'robots-txt', 'document-title', 'http-status-code']:
    a = audits.get(key, {})
    s = a.get('score')
    if s is not None and s == 0:
        seo_issues.append(a.get('title', key))

# Performance opportunities
perf_issues = []
for key in ['unused-css-rules', 'unused-javascript', 'render-blocking-resources', 'uses-optimized-images']:
    a = audits.get(key, {})
    dv = a.get('displayValue', '')
    s = a.get('score')
    if s is not None and s == 0 and dv:
        perf_issues.append(f"{dv} — {a.get('title', '')}")

result = {
    'slug': '$SLUG',
    'timestamp': d.get('fetchTime', ''),
    'scores': scores,
    'vitals': vitals_out,
    'seo_issues': seo_issues,
    'perf_issues': perf_issues,
    'url': d.get('finalUrl', URL),
}

output_path = "$OUTPUT".replace('.json', '-summary.json')
with open(output_path, 'w') as f:
    json.dump(result, f, indent=2)

print(f"[lighthouse-audit] Summary: {output_path}")
print(f"  Performance: {scores.get('performance', 'N/A')}")
print(f"  SEO: {scores.get('seo', 'N/A')}")
print(f"  Accessibility: {scores.get('accessibility', 'N/A')}")
print(f"  LCP: {vitals_out.get('lcp', {}).get('display', 'N/A')}")
print(f"  CLS: {vitals_out.get('cls', {}).get('display', 'N/A')}")
if vitals_out.get('inp'):
    print(f"  INP: {vitals_out.get('inp', {}).get('display', 'N/A')}")
print(f"  SEO issues: {len(seo_issues)}")
print(f"  Perf opportunities: {len(perf_issues)}")
PYEOF

echo "[lighthouse-audit] Done"
