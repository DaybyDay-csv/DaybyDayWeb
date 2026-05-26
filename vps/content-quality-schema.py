#!/usr/bin/env python3
"""
content-quality-schema.py — E-E-A-T schema injector for blog posts.

Adds/validates JSON-LD structured data:
  - Article (BlogPosting)
  - FAQPage
  - HowTo (conditional — only if procedural steps detected)
  - Author (Person: Pablo Santirsó)
  - Organization (DayByDay Consulting)

Usage:
  content-quality-schema.py --slug "meta-ads-creative-testing-2026-d2c"
  content-quality-schema.py --slug "..." --fix   # inject missing schemas
  content-quality-schema.py --slug "..." --audit  # report only
"""

import argparse
import json
import re
import sys
from pathlib import Path
from datetime import datetime

# ─── Config ───────────────────────────────────────────────
WORKTREE = Path("/root/projects/DaybyDay/.claude/worktrees/epic-pasteur")

AUTHOR_SCHEMA = {
    "@type": "Person",
    "name": "Pablo Santirsó",
    "jobTitle": "Founder & Paid Media Strategist",
    "url": "https://daybydayconsulting.com",
    "sameAs": [
        "https://es.linkedin.com/in/pablo-santirso-perez",
        "https://www.daybydayconsulting.com"
    ]
}

ORGANIZATION_SCHEMA = {
    "@type": "Organization",
    "name": "DayByDay Consulting",
    "url": "https://daybydayconsulting.com",
    "logo": "https://www.daybydayconsulting.com/favicon.ico",
    "sameAs": [
        "https://es.linkedin.com/in/pablo-santirso-perez",
        "https://www.linkedin.com/company/daybyday-consulting"
    ],
    "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "email": "contact@daybydayconsulting.com",
        "url": "https://calendly.com/daybydayconsulting/discovery"
    }
}


def extract_article_schema(html: str) -> dict | None:
    """Extract existing Article/BlogPosting schema from page."""
    match = re.search(r'<script type="application/ld\+json">(.*?)</script>', html, re.DOTALL)
    if not match:
        return None
    try:
        data = json.loads(match.group(1))
        return data
    except (json.JSONDecodeError, Exception):
        return None


def has_schema_type(html: str, schema_type: str) -> bool:
    """Check if page has a specific schema type."""
    return bool(re.search(rf'"@type"\s*:\s*"{schema_type}"', html, re.I))


def get_post_date(slug: str) -> str:
    """Get publish date for a post (today if new)."""
    path = WORKTREE / "src/pages/blog" / f"{slug}Page.jsx"
    if not path.exists():
        return datetime.utcnow().strftime("%Y-%m-%d")
    content = path.read_text(errors="ignore")
    # Look for datePublished in props
    m = re.search(r'datePublished\s*=\s*["\']([^"\']+)', content)
    if m:
        return m.group(1)[:10]
    return datetime.utcnow().strftime("%Y-%m-%d")


def build_article_schema(slug: str, title: str, description: str, keywords: list, cluster: str) -> dict:
    """Build Article/BlogPosting schema."""
    date = get_post_date(slug)
    return {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": title,
        "description": description,
        "datePublished": date,
        "dateModified": date,
        "author": AUTHOR_SCHEMA,
        "publisher": ORGANIZATION_SCHEMA,
        "url": f"https://daybydayconsulting.com/blog/{slug}",
        "keywords": ", ".join(keywords) if keywords else "",
        "articleSection": cluster.replace("-", " ").title() if cluster else "Marketing",
        "inLanguage": "es-ES",
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": f"https://daybydayconsulting.com/blog/{slug}"
        },
        "image": {
            "@type": "ImageObject",
            "url": "https://www.daybydayconsulting.com/og-default.jpg",
            "width": 1200,
            "height": 630
        }
    }


def build_faq_schema(faqs: list) -> dict:
    """Build FAQPage schema from FAQ items."""
    if not faqs:
        return None

    mainEntity = []
    for faq in faqs:
        question = faq.get("question", "")
        answer = faq.get("answer", "")
        if question and answer:
            mainEntity.append({
                "@type": "Question",
                "name": question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": answer,
                    "dateCreated": datetime.utcnow().isoformat() + "Z"
                }
            })

    if not mainEntity:
        return None

    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": mainEntity
    }


def build_howto_schema(title: str, steps: list) -> dict | None:
    """Build HowTo schema if procedural steps detected."""
    if not steps or len(steps) < 3:
        return None

    howto_steps = []
    for i, step in enumerate(steps[:10], 1):  # max 10 steps
        howto_steps.append({
            "@type": "HowToStep",
            "name": step if isinstance(step, str) else step.get("name", f"Step {i}"),
            "text": step if isinstance(step, str) else step.get("description", step.get("name", "")),
            "position": i
        })

    return {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": title,
        "description": f"Guía paso a paso: {title}",
        "step": howto_steps,
        "totalTime": f"PT{MIN(len(steps) * 3, 60)}M"  # ~3min per step
    }


def extract_faqs_from_jsx(slug: str) -> list:
    """Parse JSX file to extract FAQ items."""
    path = WORKTREE / "src/pages/blog" / f"{slug}Page.jsx"
    if not path.exists():
        return []

    content = path.read_text(errors="ignore")

    # Find FAQ items: look for questions in the FAQ section
    # Pattern: question prop or "question:" text
    faqs = []

    # Try to extract from faqs={[]} prop
    faq_match = re.search(r'faqs\s*=\s*\[(.*?)\]', content, re.DOTALL)
    if faq_match:
        try:
            # Try to parse the array as JS-like objects
            faq_text = faq_match.group(1)
            questions = re.findall(r'question\s*:\s*["\']([^"\']+)', faq_text)
            answers = re.findall(r'answer\s*:\s*["\']([^"\']+)', faq_text)
            for q, a in zip(questions, answers):
                faqs.append({"question": q, "answer": a})
        except Exception:
            pass

    # Also scan for H2/Q&A patterns
    if not faqs:
        q_blocks = re.findall(r'<h3[^>]*>(.*?)</h3>\s*<p[^>]*>(.*?)</p>', content, re.DOTALL)
        for q, a in q_blocks:
            q_clean = re.sub(r"<[^>]+>", "", q).strip()
            a_clean = re.sub(r"<[^>]+>", "", a).strip()
            if q_clean and a_clean and len(q_clean) > 10:
                faqs.append({"question": q_clean, "answer": a_clean})

    return faqs


def extract_steps_from_jsx(slug: str) -> list:
    """Detect procedural steps in article (for HowTo schema)."""
    path = WORKTREE / "src/pages/blog" / f"{slug}Page.jsx"
    if not path.exists():
        return []

    content = path.read_text(errors="ignore")

    # Look for numbered steps or "step" patterns
    steps = []

    # Pattern 1: "1." numbered items in paragraphs
    numbered = re.findall(r'<p[^>]*>\s*(\d+[.)]\s+[A-Z].*?)</p>', content, re.DOTALL)
    steps.extend(numbered[:10])

    # Pattern 2: "Paso" or "Step" keywords in H2s
    step_h2s = re.findall(r'<h2[^>]*>.*?(?:Paso|Step| paso| step).*?</h2>', content, re.I)
    for h2 in step_h2s[:10]:
        clean = re.sub(r"<[^>]+>", "", h2).strip()
        if clean:
            steps.append(clean)

    return steps


def inject_schema(html: str, schema: dict, schema_name: str = "Article") -> str:
    """Inject JSON-LD schema into HTML, replacing any existing of same type."""
    schema_json = json.dumps(schema, ensure_ascii=False, indent=2)
    script_tag = f'<script type="application/ld+json">{schema_json}</script>'

    # Remove existing schema of same type
    if schema.get("@type"):
        type_name = schema["@type"]
        html = re.sub(
            rf'<script type="application/ld\+json">[^<]*?"@type"\s*:\s*"{re.escape(type_name)}"[^<]*</script>',
            "",
            html,
            flags=re.DOTALL
        )

    # Inject before closing </head> or at start of body
    if "</head>" in html:
        html = html.replace("</head>", f"\n{script_tag}\n</head>")
    else:
        html = script_tag + "\n" + html

    return html


def audit_post(slug: str) -> dict:
    """Audit a post for E-E-A-T schema completeness."""
    path = WORKTREE / "src/pages/blog" / f"{slug}Page.jsx"
    if not path.exists():
        return {"error": True, "slug": slug}

    content = path.read_text(errors="ignore")

    has_article = has_schema_type(content, "BlogPosting") or has_schema_type(content, "Article")
    has_faq = has_schema_type(content, "FAQPage")
    has_howto = has_schema_type(content, "HowTo")
    has_author = has_schema_type(content, "Person")
    has_org = has_schema_type(content, "Organization")

    # Check for JSON-LD scripts
    ld_scripts = re.findall(r'<script type="application/ld\+json">(.*?)</script>', content, re.DOTALL)
    schema_types = []
    for s in ld_scripts:
        try:
            d = json.loads(s)
            t = d.get("@type", "Unknown")
            schema_types.append(t)
        except Exception:
            schema_types.append("INVALID")

    # Extract title for context
    title_match = re.search(r'title\s*=\s*["\']([^"\']+)', content)
    title = title_match.group(1) if title_match else slug

    # Check Author name (should be Pablo Santirsó)
    author_ok = bool(re.search(r'Pablo|Santirsó', content)) or has_author

    # Check Organization brand mentions
    brand_ok = bool(re.search(r'DayByDay|Day ?by ?Day', content, re.I))

    missing = []
    if not has_article:
        missing.append("Article/BlogPosting schema")
    if not has_faq:
        missing.append("FAQPage schema")
    if not has_author:
        missing.append("Author (Person) schema")
    if not has_org:
        missing.append("Organization schema")

    score = 0
    if has_article: score += 25
    if has_faq: score += 20
    if has_howto: score += 15
    if has_author: score += 20
    if has_org: score += 20

    return {
        "slug": slug,
        "title": title,
        "has_article": has_article,
        "has_faq": has_faq,
        "has_howto": has_howto,
        "has_author": has_author,
        "has_org": has_org,
        "author_ok": author_ok,
        "brand_ok": brand_ok,
        "schema_types": schema_types,
        "missing": missing,
        "eeat_score": score,
        "status": "complete" if score >= 80 else "partial" if score >= 50 else "incomplete"
    }


def fix_post(slug: str, title: str, description: str, keywords: list, cluster: str) -> dict:
    """Inject missing E-E-A-T schemas into a post."""
    path = WORKTREE / "src/pages/blog" / f"{slug}Page.jsx"
    if not path.exists():
        return {"error": True, "slug": slug, "message": "File not found"}

    content = path.read_text(errors="ignore")
    original = content

    # Build Article schema
    article_schema = build_article_schema(slug, title, description, keywords, cluster)
    content = inject_schema(content, article_schema, "BlogPosting")

    # Build FAQ schema if FAQ data available
    faqs = extract_faqs_from_jsx(slug)
    if faqs:
        faq_schema = build_faq_schema(faqs)
        if faq_schema:
            content = inject_schema(content, faq_schema, "FAQPage")

    # Build HowTo schema if steps detected
    steps = extract_steps_from_jsx(slug)
    if steps:
        howto_schema = build_howto_schema(title, steps)
        if howto_schema:
            content = inject_schema(content, howto_schema, "HowTo")

    # Write back
    if content != original:
        path.write_text(content)
        return {"slug": slug, "fixed": True, "schemas_added": ["Article", "FAQPage"] + (["HowTo"] if steps else [])}
    else:
        return {"slug": slug, "fixed": False, "message": "No changes needed"}


def main():
    parser = argparse.ArgumentParser(description="E-E-A-T schema injector and auditor")
    parser.add_argument("--slug", required=True, help="Blog post slug")
    parser.add_argument("--title", help="Post title (for schema)")
    parser.add_argument("--description", help="Post description (for schema)")
    parser.add_argument("--keywords", help="Comma-separated keywords")
    parser.add_argument("--cluster", help="Topic cluster")
    parser.add_argument("--fix", action="store_true", help="Inject missing schemas")
    parser.add_argument("--audit", action="store_true", help="Audit only, don't modify")
    parser.add_argument("--worktree", default=str(WORKTREE), help="Worktree path")
    args = parser.parse_args()

    worktree = Path(args.worktree)

    if args.audit:
        result = audit_post(args.slug)
        print(f"\n=== E-E-A-T AUDIT: {args.slug} ===")
        print(f"Title: {result.get('title', '?')}")
        print(f"Score: {result.get('eeat_score', 0)}/100 ({result.get('status', '?')})")
        print(f"Article schema: {result.get('has_article', False)}")
        print(f"FAQ schema: {result.get('has_faq', False)}")
        print(f"HowTo schema: {result.get('has_howto', False)}")
        print(f"Author schema: {result.get('has_author', False)}")
        print(f"Organization schema: {result.get('has_org', False)}")
        print(f"Schema types found: {result.get('schema_types', [])}")
        if result.get("missing"):
            print(f"Missing: {', '.join(result['missing'])}")
        return

    if args.fix:
        title = args.title or "DayByDay Consulting Blog Post"
        desc = args.description or "Estrategias de Paid Media y Growth para ecommerce D2C en España."
        keywords = args.keywords.split(",") if args.keywords else []
        cluster = args.cluster or ""

        result = fix_post(args.slug, title, desc, keywords, cluster)
        print(f"E-E-A-T fix result: {result}")
        return

    # Default: audit
    result = audit_post(args.slug)
    print(json.dumps(result, indent=2))


if __name__ == "__main__":
    main()