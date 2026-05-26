#!/usr/bin/env python3
"""
detect-hub-spoke.py — Score blog posts for hub/spoke classification.
Hub = high authority, foundational topic, many internal links
Spoke = long-tail, specific, few inbound links

Usage:
  detect-hub-spoke.py                    # full scan of all posts
  detect-hub-spoke.py --slug "post-slug"  # single post classification
  detect-hub-spoke.py --report           # summary of all clusters
"""

import argparse
import json
import re
import sys
from collections import defaultdict
from pathlib import Path

# ─── Config ───────────────────────────────────────────────
WORKTREE = Path("/root/projects/DaybyDay/.claude/worktrees/epic-pasteur")
STATE_FILE = Path("/root/logs/hub-spoke/hub-spoke-state.json")
STATE_FILE.parent.mkdir(parents=True, exist_ok=True)

HUB_WORD_COUNT_THRESHOLD = 1500
HUB_CLUSTER_FOUNDATIONAL = {
    "paid-media-foundations", "attribution-reporting", "strategy-scaling"
}


def extract_post_metadata(slug: str) -> dict:
    """Parse a blog post JSX for metrics."""
    path = WORKTREE / "src/pages/blog" / f"{slug}Page.jsx"
    if not path.exists():
        return {"error": True}

    content = path.read_text(errors="ignore")

    # Word count
    text = re.sub(r"<[^>]+>", " ", content)
    text = " ".join(text.split())
    word_count = len(text.split())

    # H2 count
    h2_count = len(re.findall(r"<h2", content, re.I))

    # Cluster from file path (check if cluster info embedded)
    cluster = ""
    # Try to infer from slug
    slug_lower = slug.lower()

    # Read from estado.json if available
    estado_path = Path("/root/projects/DaybyDay/seo-plan/estado.json")
    cluster = ""
    if estado_path.exists():
        try:
            d = json.load(estado_path.open())
            for t in d.get("pending_tasks", []) + d.get("completed_tasks", []):
                if isinstance(t, dict) and t.get("slug") == slug:
                    cluster = t.get("cluster", "")
                    break
        except Exception:
            pass

    # Check for internal links (count /blog/ references in content)
    internal_links = re.findall(r'href="/blog/([^"]+)"', content)
    internal_link_count = len(internal_links)

    # Has FAQ schema
    has_faq = bool(re.search(r'"@type"\s*:\s*"FAQPage"', content, re.I))
    # Has Article schema
    has_article = bool(re.search(r'"@type"\s*:\s*"(Article|BlogPosting)"', content, re.I))

    return {
        "slug": slug,
        "word_count": word_count,
        "h2_count": h2_count,
        "cluster": cluster,
        "internal_link_count": internal_link_count,
        "has_faq": has_faq,
        "has_article": has_article,
        "error": False,
    }


def compute_authority_score(post: dict) -> float:
    """
    Hub score: composite of word count, H2 depth, schema, cluster.
    0-100 scale.
    """
    # Word count factor (40% weight)
    wc = post.get("word_count", 0)
    wc_score = min(wc / HUB_WORD_COUNT_THRESHOLD, 1.0) * 40

    # H2 depth factor (20% weight)
    h2 = post.get("h2_count", 0)
    h2_score = min(h2 / 8, 1.0) * 20  # 8 H2s = max

    # Schema factor (20% weight) — hubs should have rich schema
    schema_score = 0
    if post.get("has_article"):
        schema_score += 10
    if post.get("has_faq"):
        schema_score += 10

    # Cluster factor (20% weight) — foundational clusters produce hubs
    cluster = post.get("cluster", "")
    cluster_score = 15 if cluster in HUB_CLUSTER_FOUNDATIONAL else 5

    total = wc_score + h2_score + schema_score + cluster_score
    return round(min(total, 100), 1)


def classify_post(post: dict, all_posts: list) -> dict:
    """Classify as hub, spoke, or connector based on authority score."""
    score = compute_authority_score(post)

    # Hub thresholds
    if score >= 65:
        role = "hub"
    elif score >= 40:
        role = "connector"
    else:
        role = "spoke"

    # Inbound link analysis
    inbound_from = [p["slug"] for p in all_posts if post["slug"] in p.get("linked_slugs", [])]
    outbound_to = post.get("internal_link_count", 0)

    return {
        "slug": post["slug"],
        "cluster": post.get("cluster", ""),
        "authority_score": score,
        "role": role,
        "inbound_count": len(inbound_from),
        "outbound_count": outbound_to,
        "word_count": post.get("word_count", 0),
        "h2_count": post.get("h2_count", 0),
        "has_faq": post.get("has_faq", False),
        "has_article": post.get("has_article", False),
    }


def scan_all_posts() -> list:
    """Scan all blog posts in the worktree."""
    blog_dir = WORKTREE / "src/pages/blog"
    if not blog_dir.exists():
        print(f"WARN: blog dir not found: {blog_dir}")
        return []

    posts = []
    for path in blog_dir.glob("*Page.jsx"):
        slug = path.stem.replace("Page", "")
        meta = extract_post_metadata(slug)
        if not meta.get("error"):
            posts.append(meta)

    return posts


def build_hub_spoke_state(posts: list) -> dict:
    """Build full state with classifications."""
    classified = []
    for post in posts:
        c = classify_post(post, posts)
        # Add linked_slugs from content
        slug = post["slug"]
        content_path = WORKTREE / "src/pages/blog" / f"{slug}Page.jsx"
        if content_path.exists():
            content = content_path.read_text(errors="ignore")
            linked = re.findall(r'href="/blog/([^"]+)"', content)
            c["linked_slugs"] = list(set(linked))
        classified.append(c)

    # Sort by authority score desc
    classified.sort(key=lambda x: x["authority_score"], reverse=True)

    # Per-cluster summary
    clusters = defaultdict(list)
    for post in classified:
        if post["cluster"]:
            clusters[post["cluster"]].append(post)

    cluster_summary = {}
    for cluster, posts_list in clusters.items():
        hubs = [p for p in posts_list if p["role"] == "hub"]
        spokes = [p for p in posts_list if p["role"] == "spoke"]
        connectors = [p for p in posts_list if p["role"] == "connector"]
        cluster_summary[cluster] = {
            "total": len(posts_list),
            "hubs": [p["slug"] for p in hubs],
            "spokes": [p["slug"] for p in spokes],
            "connectors": [p["slug"] for p in connectors],
            "top_hub": hubs[0]["slug"] if hubs else None,
        }

    return {
        "generated_at": "",
        "total_posts": len(classified),
        "hubs": [p for p in classified if p["role"] == "hub"],
        "spokes": [p for p in classified if p["role"] == "spoke"],
        "connectors": [p for p in classified if p["role"] == "connector"],
        "cluster_summary": cluster_summary,
    }


def main():
    parser = argparse.ArgumentParser(description="Detect hub/spoke classification for blog posts")
    parser.add_argument("--slug", help="Single slug to classify")
    parser.add_argument("--report", action="store_true", help="Print summary report")
    parser.add_argument("--output-json", help="Write state to file")
    args = parser.parse_args()

    if args.slug:
        meta = extract_post_metadata(args.slug)
        if meta.get("error"):
            print(f"ERROR: post not found: {args.slug}")
            sys.exit(1)
        posts = [meta]
    else:
        posts = scan_all_posts()
        print(f"Scanned {len(posts)} posts")

    state = build_hub_spoke_state(posts)

    # Timestap
    from datetime import datetime
    state["generated_at"] = datetime.utcnow().isoformat() + "Z"

    # Save state
    STATE_FILE.write_text(json.dumps(state, indent=2, default=str))
    print(f"State saved: {STATE_FILE}")

    if args.report or not args.slug:
        print("\n=== HUB-SPOKE SUMMARY ===")
        print(f"Total posts: {state['total_posts']}")
        print(f"Hubs: {len(state['hubs'])} | Connectors: {len(state['connectors'])} | Spokes: {len(state['spokes'])}")
        print()
        for cluster, summary in state["cluster_summary"].items():
            print(f"Cluster: {cluster} ({summary['total']} posts)")
            if summary["hubs"]:
                print(f"  Hubs: {', '.join(summary['hubs'])}")
            if summary["connectors"]:
                print(f"  Connectors: {', '.join(summary['connectors'])}")
            if summary["spokes"]:
                print(f"  Spokes: {', '.join(summary['spokes'])}")
        print()
        print("Top 10 authority posts:")
        for p in state["hubs"][:10]:
            print(f"  {p['authority_score']} — {p['slug']} ({p['role']}) [{p['cluster']}] {p['word_count']}w {p['h2_count']}h2")

    if args.slug:
        # Single post — find its classification
        for post in state["hubs"] + state["connectors"] + state["spokes"]:
            if post["slug"] == args.slug:
                print(f"\nPost: {post['slug']}")
                print(f"  Authority score: {post['authority_score']}/100")
                print(f"  Role: {post['role']}")
                print(f"  Cluster: {post['cluster']}")
                print(f"  Word count: {post['word_count']} | H2s: {post['h2_count']}")
                print(f"  Inbound: {post['inbound_count']} | Outbound: {post['outbound_count']}")
                print(f"  FAQ: {post['has_faq']} | Article schema: {post['has_article']}")
                break

    if args.output_json:
        Path(args.output_json).write_text(json.dumps(state, indent=2))


if __name__ == "__main__":
    main()