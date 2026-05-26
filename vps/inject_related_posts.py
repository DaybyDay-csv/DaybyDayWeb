#!/usr/bin/env python3
"""
inject_related_posts.py — Add relatedPosts prop to all blog posts.
Reads from /root/projects/DaybyDay/src/data/relatedPosts.json
and injects const relatedPosts + relatedPosts={} into each BlogPostLayout call.
"""
import json, re
from pathlib import Path

BLOG_DIR = Path("/root/projects/DaybyDay/src/pages/blog")
RELATED_FILE = Path("/root/projects/DaybyDay/src/data/relatedPosts.json")
related = json.load(open(RELATED_FILE))

results = {"updated": [], "no_change": [], "errors": []}

for slug, posts in related.items():
    # Find the file for this slug
    path = None
    for f in BLOG_DIR.glob("*Page.jsx"):
        if slug in f.stem.lower().replace("page", "").replace("-", ""):
            path = f
            break
    
    if not path:
        # Try slug directly
        import re as re2
        parts = slug.split("-")
        camel = "".join(p.capitalize() for p in parts)
        fname = f"{camel}Page.jsx"
        path = BLOG_DIR / fname if (BLOG_DIR / fname).exists() else None

    if not path:
        results["errors"].append(slug)
        continue

    content = path.read_text()

    # Check if relatedPosts already injected
    if "relatedPosts={" in content:
        results["no_change"].append(slug)
        continue

    # Build const relatedPosts declaration
    posts_js = "[\n"
    for p in posts:
        posts_js += f'    {{ slug: "{p["slug"]}", title: "{p["title"]}", description: "{p.get("description", "")}" }},\n'
    posts_js += "  ]"

    # Check if const relatedPosts already exists
    if "const relatedPosts" in content:
        # Replace existing
        content = re.sub(r"const relatedPosts\s*=\s*\[[^\]]*\];?\n", f"const relatedPosts = {posts_js};\n", content, flags=re.DOTALL)
    else:
        # Add after the faqs={faqs} line
        faqs_pattern = r"(faqs=\{faqs\})"
        if re.search(faqs_pattern, content):
            content = re.sub(faqs_pattern, f"faqs={{faqs}}\n    relatedPosts={posts_js}", content)
        else:
            # Try to inject after any prop before the closing >
            content = re.sub(r"(category=)", f"relatedPosts={posts_js}\n    \\1", content)

    # Add relatedPosts to BlogPostLayout props
    if "relatedPosts=" not in content:
        content = re.sub(r"faqs=\{faqs\}(,\n|,\n    )", "faqs={faqs},\n    relatedPosts={relatedPosts}", content)

    path.write_text(content)
    results["updated"].append(slug)

print(f"Updated: {len(results['updated'])}")
print(f"No change: {len(results['no_change'])}")
print(f"Errors (not found): {len(results['errors'])}")
if results["errors"]:
    print(f"  Not found: {results['errors'][:10]}")
if results["updated"]:
    print(f"\nUpdated slugs: {results['updated']}")