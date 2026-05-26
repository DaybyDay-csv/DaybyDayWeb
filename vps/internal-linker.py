#!/usr/bin/env python3
"""
internal-linker.py — Bidirectional internal linking automation.

After a post is published:
  1. Classify new post as hub/spoke/connector via detect-hub-spoke
  2. Find relevant existing posts to link to (contextual, topical)
  3. Add outbound links from new post → existing posts
  4. Add inbound links from existing posts → new post (reverse)

Usage:
  internal-linker.py --slug "post-slug" --worktree "/path/to/worktree"
  internal-linker.py --run-all        # re-link all posts
"""

import argparse
import json
import re
import sys
from pathlib import Path
from datetime import datetime

# ─── Config ───────────────────────────────────────────────
WORKTREE = Path("/root/projects/DaybyDay/.claude/worktrees/epic-pasteur")
HUB_STATE_FILE = Path("/root/logs/hub-spoke/hub-spoke-state.json")
LINK_LOG = Path("/root/logs/internal-links/link-log.json")
LINK_LOG.parent.mkdir(parents=True, exist_ok=True)

MIN_LINKS_PER_POST = 2
MAX_LINKS_PER_POST = 4
SKIP_CLUSTERS = {"technical-tracking", "geo-expansion"}  # already well-linked


def load_hub_spoke_state() -> dict:
    if not HUB_STATE_FILE.exists():
        return {"hubs": [], "spokes": [], "connectors": [], "cluster_summary": {}}
    try:
        return json.loads(HUB_STATE_FILE.read_text())
    except Exception:
        return {"hubs": [], "spokes": [], "connectors": [], "cluster_summary": {}}


def load_all_posts() -> list:
    """Get all blog post slugs."""
    blog_dir = WORKTREE / "src/pages/blog"
    if not blog_dir.exists():
        return []
    return [p.stem.replace("Page", "") for p in blog_dir.glob("*Page.jsx")]


def find_topical_matches(new_slug: str, cluster: str, all_posts: list) -> list:
    """Find posts in same cluster + related clusters for linking."""
    state = load_hub_spoke_state()

    # Get posts in same cluster
    same_cluster = []
    different_cluster = []

    all_classified = state.get("hubs", []) + state.get("connectors", []) + state.get("spokes", [])

    for post in all_classified:
        if post["slug"] == new_slug:
            continue
        if post.get("cluster") == cluster:
            same_cluster.append(post)
        elif post.get("cluster") and post.get("cluster") not in SKIP_CLUSTERS:
            different_cluster.append(post)

    # Sort: hubs first, then by authority score
    same_cluster.sort(key=lambda x: x.get("authority_score", 0), reverse=True)
    different_cluster.sort(key=lambda x: x.get("authority_score", 0), reverse=True)

    return same_cluster + different_cluster


def get_existing_links(slug: str) -> list:
    """Get current internal links from a post."""
    path = WORKTREE / "src/pages/blog" / f"{slug}Page.jsx"
    if not path.exists():
        return []
    content = path.read_text(errors="ignore")
    return re.findall(r'href="/blog/([^"]+)"', content)


def add_outbound_links(slug: str, target_slugs: list) -> dict:
    """
    Add outbound links to new post.
    Inserts links into relevant H2 sections based on keyword proximity.
    Returns: {added: [...], skipped: [...]}
    """
    path = WORKTREE / "src/pages/blog" / f"{slug}Page.jsx"
    if not path.exists():
        return {"added": [], "skipped": target_slugs, "error": f"File not found: {slug}"}

    content = path.read_text()

    existing = get_existing_links(slug)
    to_add = [t for t in target_slugs if t not in existing]
    added = []

    for target in to_add:
        # Build link text from slug
        link_text = format_link_text(target)
        link_url = f"/blog/{target}"

        # Try to insert near related H2 section
        # Pattern: look for cluster-related keywords in H2s
        inserted = False

        # Find insertion point: after the last H2 that mentions related keyword
        h2_sections = list(re.finditer(r'(<h2[^>]*>.*?</h2>)', content, re.DOTALL | re.I))

        # Simple approach: append before the last </div> in main content or before FAQs
        faq_match = re.search(r'(<div[^>]*class="[^"]*faq[^"]*".*?)(?=<div|<script|</main)', content, re.DOTALL | re.I)
        if faq_match:
            insert_pos = faq_match.start()
            link_html = f'<a href="{link_url}" class="text-accent hover:underline">{link_text}</a>'
            # Check not already there
            new_content = content[:insert_pos] + f"<p>{link_html}</p>\n" + content[insert_pos:]
            content = new_content
            added.append(target)
            inserted = True

        if not inserted:
            # Fallback: append before closing tag
            if "</article>" in content:
                insert_pos = content.rfind("</article>")
                link_html = f'<a href="{link_url}" class="text-accent hover:underline">{link_text}</a>'
                new_content = content[:insert_pos] + f"<p>{link_html}</p>\n" + content[insert_pos:]
                content = new_content
                added.append(target)

    # Write back
    path.write_text(content)
    return {"added": added, "skipped": [t for t in target_slugs if t not in added]}


def add_inbound_links(new_slug: str, source_slugs: list) -> dict:
    """
    Add inbound links from existing posts to the new post.
    For each source post, find a relevant context to insert the link.
    """
    added = []
    skipped = []

    for source in source_slugs:
        source_path = WORKTREE / "src/pages/blog" / f"{source}Page.jsx"
        if not source_path.exists():
            skipped.append(source)
            continue

        content = source_path.read_text()

        # Check if link already exists
        existing = get_existing_links(source)
        if new_slug in existing:
            skipped.append(source)
            continue

        # Check if we already have max links
        if len(existing) >= MAX_LINKS_PER_POST:
            skipped.append(source)
            continue

        link_text = format_link_text(new_slug)
        link_url = f"/blog/{new_slug}"

        # Try to insert near related topic section
        faq_match = re.search(r'(<div[^>]*class="[^"]*faq[^"]*".*?)(?=<div|<script|</main)', content, re.DOTALL | re.I)
        if faq_match:
            insert_pos = faq_match.start()
            link_html = f'<a href="{link_url}" class="text-accent hover:underline">{link_text}</a>'
            new_content = content[:insert_pos] + f"<p>{link_html}</p>\n" + content[insert_pos:]
            source_path.write_text(new_content)
            added.append(source)
        elif "</article>" in content:
            insert_pos = content.rfind("</article>")
            link_html = f'<a href="{link_url}" class="text-accent hover:underline">{link_text}</a>'
            new_content = content[:insert_pos] + f"<p>{link_html}</p>\n" + content[insert_pos:]
            source_path.write_text(new_content)
            added.append(source)
        else:
            skipped.append(source)

    return {"added": added, "skipped": skipped}


def format_link_text(slug: str) -> str:
    """Convert slug to readable anchor text."""
    return slug.replace("-", " ").replace("/", " ").title()


def link_post(slug: str, cluster: str) -> dict:
    """Main linking logic for a single post."""
    all_posts = load_all_posts()

    # Find topical matches
    matches = find_topical_matches(slug, cluster, all_posts)

    # Take top posts for outbound (link from new post to existing)
    outbound_targets = [p["slug"] for p in matches[:MAX_LINKS_PER_POST]]

    outbound_result = add_outbound_links(slug, outbound_targets)

    # For inbound: link from top hubs/connectors to the new post
    state = load_hub_spoke_state()
    all_classified = state.get("hubs", []) + state.get("connectors", []) + state.get("spokes", [])

    # Filter to high-authority posts that can pass link juice
    authority_sources = [p for p in all_classified
                          if p.get("authority_score", 0) >= 45
                          and p["slug"] != slug
                          and p.get("cluster") != cluster]  # prefer different cluster for diversity

    inbound_sources = [p["slug"] for p in authority_sources[:3]]  # max 3 inbound sources
    inbound_result = add_inbound_links(slug, inbound_sources)

    return {
        "slug": slug,
        "cluster": cluster,
        "outbound_added": outbound_result["added"],
        "outbound_skipped": outbound_result.get("skipped", []),
        "inbound_added": inbound_result["added"],
        "inbound_skipped": inbound_result.get("skipped", []),
        "total_outbound": len(outbound_result["added"]),
        "total_inbound": len(inbound_result["added"]),
    }


def run_all() -> list:
    """Re-link all posts (run periodically to ensure mesh integrity)."""
    all_posts = load_all_posts()
    results = []
    for slug in all_posts:
        # Get cluster for this post
        cluster = ""
        estado_path = Path("/root/projects/DaybyDay/seo-plan/estado.json")
        if estado_path.exists():
            try:
                d = json.load(estado_path.open())
                for t in d.get("pending_tasks", []) + d.get("completed_tasks", []):
                    if isinstance(t, dict) and t.get("slug") == slug:
                        cluster = t.get("cluster", "")
                        break
            except Exception:
                pass
        r = link_post(slug, cluster)
        results.append(r)
        print(f"  Linked {slug}: +{r['total_outbound']} outbound, +{r['total_inbound']} inbound")
    return results


def commit_changes(worktree: Path, message: str = ""):
    """Git commit linking changes."""
    import subprocess
    try:
        result = subprocess.run(
            ["git", "add", "src/pages/blog/"],
            cwd=str(worktree),
            capture_output=True, text=True, timeout=30
        )
        result = subprocess.run(
            ["git", "commit", "-m", message or "chore: bidirectional internal link updates"],
            cwd=str(worktree),
            capture_output=True, text=True, timeout=30
        )
        result = subprocess.run(
            ["git", "push", "origin", "claude/epic-pasteur"],
            cwd=str(worktree),
            capture_output=True, text=True, timeout=30
        )
        return True
    except Exception as e:
        print(f"WARN: git commit failed: {e}")
        return False


def main():
    parser = argparse.ArgumentParser(description="Internal linker — bidirectional blog linking")
    parser.add_argument("--slug", help="New post slug to link")
    parser.add_argument("--cluster", default="", help="Post cluster")
    parser.add_argument("--worktree", default=str(WORKTREE), help="Worktree path")
    parser.add_argument("--run-all", action="store_true", help="Re-link all posts")
    parser.add_argument("--no-commit", action="store_true", help="Skip git commit")
    args = parser.parse_args()

    worktree = Path(args.worktree)

    if args.run_all:
        print("Running full internal linking sweep...")
        results = run_all()
    elif args.slug:
        print(f"Linking post: {args.slug} (cluster={args.cluster or 'unknown'})")
        result = link_post(args.slug, args.cluster or "")
        results = [result]
        print(f"  Outbound: +{result['total_outbound']} | Inbound: +{result['total_inbound']}")
    else:
        print("ERROR: --slug or --run-all required")
        sys.exit(1)

    # Log results
    log_entry = {
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "results": results
    }
    if LINK_LOG.exists():
        try:
            existing = json.loads(LINK_LOG.read_text())
            if not isinstance(existing, list):
                existing = [existing]
        except Exception:
            existing = []
    else:
        existing = []

    existing.append(log_entry)
    LINK_LOG.write_text(json.dumps(existing, indent=2))

    # Commit if changes made
    if not args.no_commit and results:
        commit_changes(worktree, "chore: internal link updates via internal-linker")

    print(f"Link log: {LINK_LOG}")


if __name__ == "__main__":
    main()