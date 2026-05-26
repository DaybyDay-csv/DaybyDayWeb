#!/bin/bash
# Pivot snapshot for Telegram — URL + title + excerpt + voice gate.
# Usage: pivot-snapshot.sh <worktree_dir>
# Emits multiline text to stdout. Empty if no new article in HEAD.

set -euo pipefail
WORKTREE="${1:?worktree path required}"

cd "$WORKTREE"
NEW_PAGE=$(git diff --name-only --diff-filter=A HEAD~1 HEAD -- 'src/pages/blog/*.jsx' 2>/dev/null | head -1)
[ -z "$NEW_PAGE" ] && exit 0

NEW_URL=$(git diff HEAD~1 HEAD -- public/sitemap.xml 2>/dev/null \
  | grep -E '^\+\s*<loc>https://www\.daybydayconsulting\.com/blog/' \
  | grep -oP '(?<=<loc>)[^<]+' | head -1)

KEYWORD=$(git log -1 --pretty=%s | grep -oP 'keyword:\s*\K.+' || echo "?")

python3 - "$NEW_PAGE" "$NEW_URL" "$KEYWORD" <<'PY'
import sys, re, pathlib
page, url, keyword = sys.argv[1], sys.argv[2], sys.argv[3]
text = pathlib.Path(page).read_text(encoding="utf-8", errors="ignore")

def first(rx):
    m = re.search(rx, text, re.S)
    return m.group(1).strip() if m else ""

title = first(r'title="([^"]+)"') or first(r'<h1[^>]*>([^<]+)</h1>')
desc  = first(r'description="([^"]+)"')
excerpt = (desc[:280] + "…") if len(desc) > 280 else desc

# word count from visible text inside JSX (rough)
plain = re.sub(r'<[^>]+>', ' ', text)
plain = re.sub(r'\{[^}]*\}', ' ', plain)
words = len(re.findall(r'\b\w+\b', plain))

low = text.lower()
required_terms = ("growth partner","operador","socios de crecimiento")
forbidden_terms = ("agencia","media buyer")
req_count = sum(low.count(w) for w in required_terms)
forb_count = sum(low.count(w) for w in forbidden_terms)
required_hits = [w for w in required_terms if w in low]
forbidden_hits = [w for w in forbidden_terms if w in low]
# Forbidden terms are OK in contrastive use (e.g. "vs agencia", "no media buyer")
# as long as required-term density dominates. Warn only if forbidden outweighs required.
voice_ok = bool(required_hits) and req_count > forb_count

flag = "✅" if voice_ok else "⚠️"

lines = [
    f"📌 PIVOT snapshot",
    f"🔗 {url}",
    f"📝 {title}",
    f"🎯 kw: {keyword}",
    f"📊 ~{words} palabras",
    f"{flag} voz: req={req_count}({','.join(required_hits) or '—'}) forb={forb_count}({','.join(forbidden_hits) or '—'})",
]
if excerpt:
    lines.append("")
    lines.append(excerpt)
print("\n".join(lines))
PY
