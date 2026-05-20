#!/usr/bin/env python3
"""
Hermes JSX safety check. Rejects files that would break the Vite build.
Usage: jsx-safe-check.py file1.jsx [file2.jsx ...]
Exit 0 = safe. Exit 1 = unsafe (prints reasons to stderr).
"""
import re
import sys
import pathlib

CHECKS = [
    # Conflict markers anywhere
    (r'^[<>=]{7}', 'Merge conflict marker'),
    # TODO/FIXME comments
    (r'\b(TODO|FIXME|XXX|HACK)\b', 'Stray TODO/FIXME comment'),
    # Unreplaced template placeholders
    (r'\{\{[A-Z_0-9]+\}\}', 'Unreplaced {{PLACEHOLDER}} token'),
    # Raw `<` followed by digit in JSX text — common LLM mistake ("audiencias <2M usuarios")
    (r'>\s*[A-Za-zÀ-ÿ][^<>{}]*<\d', 'Raw "<digit" inside JSX text — escape with &lt; or wrap in {`<N`}'),
    # Raw `>` followed by digit at start of text
    (r'<\d[^<>{}]*[A-Za-zÀ-ÿ][^<>{}]*<', 'Suspicious "<digit" pattern in text node'),
]

EXEMPT_FILES = set()  # add filenames to exempt if needed


def check_file(path: pathlib.Path):
    if path.name in EXEMPT_FILES:
        return []
    try:
        text = path.read_text(encoding='utf-8')
    except Exception as e:
        return [f"{path}: cannot read ({e})"]
    issues = []
    for pat, msg in CHECKS:
        for m in re.finditer(pat, text, flags=re.MULTILINE):
            line = text[:m.start()].count('\n') + 1
            snippet = m.group(0)
            if len(snippet) > 60:
                snippet = snippet[:60] + '...'
            issues.append(f"{path}:{line}: {msg} → {snippet!r}")
    # Component must have a default export
    if 'export default' not in text:
        issues.append(f"{path}: missing 'export default' statement")
    # Must import BlogPostLayout
    if 'BlogPostLayout' not in text:
        issues.append(f"{path}: missing BlogPostLayout import or usage")
    return issues


def main(argv):
    if len(argv) < 2:
        print("Usage: jsx-safe-check.py <file.jsx> [...]", file=sys.stderr)
        return 2
    all_issues = []
    for arg in argv[1:]:
        all_issues.extend(check_file(pathlib.Path(arg)))
    if all_issues:
        print("\n".join(all_issues), file=sys.stderr)
        return 1
    print(f"jsx-safe-check: OK ({len(argv)-1} files)")
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv))
