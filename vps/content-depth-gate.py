#!/usr/bin/env python3
"""
content-depth-gate — SERP competitor comparison before blog publish.
Compares article draft against top 3 SERP competitors on:
  - Word count
  - H2 sections
  - FAQ schema presence
  - Structured data types

Gate: article must score >= 80% of competitor average on each metric
      to pass. If fails, returns recommendations for expansion.

Usage:
  content-depth-gate.py --keyword "meta ads creative testing" --slug "meta-ads-creative-testing-2026-d2c"
  content-depth-gate.py --keyword "..." --slug "..." --threshold 70  # override threshold %
"""

import argparse
import json
import re
import sys
from pathlib import Path
from urllib.request import urlopen, Request
from urllib.error import URLError, HTTPError
import time

# ─── Config ───────────────────────────────────────────────
USER_AGENT = "Mozilla/5.0 (compatible; HermesBot/1.0; +https://daybydayconsulting.com)"
TIMEOUT = 10
TOP_N = 3
MIN_WORD_COUNT = 800
DEFAULT_THRESHOLD_PCT = 80  # article must hit 80% of competitor average


def fetch_url(url: str) -> str:
    """Fetch page content with fallback encodings."""
    req = Request(url, headers={"User-Agent": USER_AGENT})
    try:
        with urlopen(req, timeout=TIMEOUT) as resp:
            content = resp.read()
            for enc in ("utf-8", "latin-1", "cp1252"):
                try:
                    return content.decode(enc)
                except UnicodeDecodeError:
                    continue
    except (URLError, HTTPError, TimeoutError) as e:
        print(f"WARN: fetch failed {url}: {e}", file=sys.stderr)
    return ""


def extract_text(html: str) -> str:
    """Strip script/style/nav and get visible text."""
    html = re.sub(r"<script[^>]*>.*?</script>", "", html, flags=re.DOTALL | re.I)
    html = re.sub(r"<style[^>]*>.*?</style>", "", html, flags=re.DOTALL | re.I)
    html = re.sub(r"<nav[^>]*>.*?</nav>", "", html, flags=re.DOTALL | re.I)
    html = re.sub(r"<!--.*?-->", "", html, flags=re.DOTALL)
    html = re.sub(r"<[^>]+>", " ", html)
    return " ".join(html.split())


def count_words(text: str) -> int:
    return len(text.split())


def count_h2s(html: str) -> int:
    return len(re.findall(r"<h2[^>]*>", html, re.I))


def has_faq_schema(html: str) -> bool:
    return bool(re.search(r'"@type"\s*:\s*"FAQPage"', html, re.I))


def has_article_schema(html: str) -> bool:
    return bool(re.search(r'"@type"\s*:\s*"(Article|BlogPosting)"', html, re.I))


def has_howto_schema(html: str) -> bool:
    return bool(re.search(r'"@type"\s*:\s*"HowTo"', html, re.I))


def extract_schema_types(html: str) -> list:
    """Return list of JSON-LD @type values found."""
    types = re.findall(r'"@type"\s*:\s*"([^"]+)"', html)
    return list(set(t for t in types if t))


def google_search(query: str, n: int = 10) -> list:
    """
    DuckDuckGo HTML scrape (no API key needed).
    Returns list of URLs.
    """
    url = f"https://html.duckduckgo.com/html/?q={query.replace(' ', '+')}"
    req = Request(url, headers={"User-Agent": USER_AGENT})
    try:
        with urlopen(req, timeout=TIMEOUT) as resp:
            html = resp.read().decode("utf-8", errors="ignore")
    except Exception as e:
        print(f"WARN: search failed: {e}", file=sys.stderr)
        return []

    links = re.findall(r'<a class="result__url" href="(https?://[^"]+)"', html)
    # dedupe and filter-out social/video/news
    seen = set()
    clean = []
    for link in links:
        if any(s in link for s in ("youtube.com", "twitter.com", "facebook.com",
                                   "instagram.com", "linkedin.com", "pinterest.com",
                                   "tiktok.com", "reddit.com", "google.com/search")):
            continue
        if link not in seen:
            seen.add(link)
            clean.append(link)
    return clean[:n]


def analyze_competitor(url: str) -> dict:
    """Fetch and analyze a competitor URL."""
    html = fetch_url(url)
    if not html:
        return {"url": url, "error": True}

    text = extract_text(html)
    words = count_words(text)
    h2s = count_h2s(html)
    faq = has_faq_schema(html)
    article = has_article_schema(html)
    howto = has_howto_schema(html)
    schema_types = extract_schema_types(html)

    return {
        "url": url,
        "word_count": words,
        "h2_count": h2s,
        "faq_schema": faq,
        "article_schema": article,
        "howto_schema": howto,
        "schema_types": schema_types,
        "error": False,
    }


def score_article_vs_competitors(article_metrics: dict, competitors: list) -> dict:
    """
    Compute depth scores vs competitor average.
    Returns pass/fail per metric + recommendations.
    """
    valid = [c for c in competitors if not c.get("error")]
    if not valid:
        return {"status": "unknown", "reason": "no competitor data"}

    avg_words = sum(c["word_count"] for c in valid) / len(valid)
    avg_h2s = sum(c["h2_count"] for c in valid) / len(valid)
    faq_count = sum(1 for c in valid if c["faq_schema"])
    article_count = sum(1 for c in valid if c["article_schema"])
    howto_count = sum(1 for c in valid if c["howto_schema"])

    threshold_pct = args.threshold / 100.0

    word_score = min(article_metrics["word_count"] / max(avg_words, 1), 2.0) * 100
    h2_score = min(article_metrics["h2_count"] / max(avg_h2s, 1), 2.0) * 100
    faq_score = 100 if article_metrics["faq_schema"] else (50 if faq_count >= len(valid) * 0.5 else 0)
    article_score = 100 if article_metrics["article_schema"] else 0
    howto_score = 100 if article_metrics["howto_schema"] else (50 if howto_count >= 1 else 0)

    # Overall score = weighted average
    overall = (word_score * 0.3 + h2_score * 0.25 + faq_score * 0.2 +
               article_score * 0.15 + howto_score * 0.10)

    passed = overall >= threshold_pct * 100

    recommendations = []
    if word_score < threshold_pct * 100:
        recommendations.append(f"+ Expande contenido: {article_metrics['word_count']} palabras vs {int(avg_words)} promedio competidores. Añade {int(avg_words * threshold_pct - article_metrics['word_count'])}+ palabras.")
    if h2_score < threshold_pct * 100:
        recommendations.append(f"+ Añade secciones H2: {article_metrics['h2_count']} vs {int(avg_h2s)} promedio. Considera dividir secciones largas.")
    if not article_metrics["faq_schema"] and faq_count >= 1:
        recommendations.append("+ Añade FAQPage schema (3+ preguntas con respuestas completas)")
    if not article_metrics["article_schema"]:
        recommendations.append("+ Añade Article/BlogPosting schema con author, datePublished, dateModified")
    if not article_metrics["howto_schema"] and howto_count >= 1:
        recommendations.append("+ Considera HowTo schema si el artículo incluye pasos procesales")

    return {
        "status": "pass" if passed else "fail",
        "overall_score": round(overall, 1),
        "threshold_pct": threshold_pct * 100,
        "competitor_avg": {
            "word_count": round(avg_words, 0),
            "h2_count": round(avg_h2s, 1),
            "faq_schema_pct": round(faq_count / len(valid) * 100, 0),
        },
        "article_metrics": article_metrics,
        "metric_scores": {
            "word_count": round(word_score, 1),
            "h2_count": round(h2_score, 1),
            "faq_schema": round(faq_score, 1),
            "article_schema": round(article_score, 1),
            "howto_schema": round(howto_score, 1),
        },
        "recommendations": recommendations,
    }


def load_article_metrics(slug: str, worktree_dir: str = "/root/projects/DaybyDay/.claude/worktrees/epic-pasteur") -> dict:
    """Parse the generated JSX file for content metrics."""
    path = Path(worktree_dir) / "src/pages/blog" / f"{slug}Page.jsx"
    if not path.exists():
        return {}

    content = path.read_text(errors="ignore")

    text = extract_text(content)
    word_count = count_words(text)
    h2_count = count_h2s(content)
    faq_schema = has_faq_schema(content)
    article_schema = has_article_schema(content)
    howto_schema = has_howto_schema(content)
    schema_types = extract_schema_types(content)

    return {
        "word_count": word_count,
        "h2_count": h2_count,
        "faq_schema": faq_schema,
        "article_schema": article_schema,
        "howto_schema": howto_schema,
        "schema_types": schema_types,
    }


def main():
    global args
    parser = argparse.ArgumentParser(description="Content depth gate — SERP competitor comparison")
    parser.add_argument("--keyword", required=True, help="Primary keyword/topic for SERP search")
    parser.add_argument("--slug", required=True, help="Article slug (to find the generated JSX)")
    parser.add_argument("--worktree", default="/root/projects/DaybyDay/.claude/worktrees/epic-pasteur", help="Worktree path")
    parser.add_argument("--threshold", type=int, default=DEFAULT_THRESHOLD_PCT, help="Min %% of competitor avg (default 80)")
    parser.add_argument("--skip-article", action="store_true", help="Skip local article analysis (competitive analysis only)")
    args = parser.parse_args()

    print(f"content-depth-gate: keyword='{args.keyword}' slug='{args.slug}' threshold={args.threshold}%")

    # Step 1: Search competitors
    print(f"Fetching top {TOP_N} competitors for '{args.keyword}'...")
    competitor_urls = google_search(args.keyword, n=TOP_N)
    if not competitor_urls:
        print("ERROR: no competitor URLs found", file=sys.stderr)
        sys.exit(2)

    print(f"Competitors: {competitor_urls}")

    # Step 2: Analyze competitors
    competitors = []
    for url in competitor_urls:
        print(f"  Analyzing: {url}")
        result = analyze_competitor(url)
        competitors.append(result)
        print(f"    words={result.get('word_count','?')} h2s={result.get('h2_count','?')} faq={result.get('faq_schema','?')} schema={result.get('schema_types',[])}")
        time.sleep(1)  # polite rate-limit

    # Step 3: Analyze local article
    article_metrics = {"word_count": 0, "h2_count": 0, "faq_schema": False, "article_schema": False, "howto_schema": False, "schema_types": []}
    if not args.skip_article:
        article_metrics = load_article_metrics(args.slug, args.worktree)
        if article_metrics.get("word_count", 0) == 0:
            print("WARN: article file not found or empty — competitive analysis only")
        else:
            print(f"Article: words={article_metrics['word_count']} h2s={article_metrics['h2_count']} faq={article_metrics['faq_schema']} article={article_metrics['article_schema']}")

    # Step 4: Score vs competitors
    result = score_article_vs_competitors(article_metrics, competitors)

    # Output
    print("\n=== CONTENT DEPTH GATE RESULT ===")
    print(f"Status: {result['status'].upper()}")
    print(f"Overall score: {result.get('overall_score','?')}% (threshold: {result.get('threshold_pct','?')}%)")

    if "competitor_avg" in result:
        ca = result["competitor_avg"]
        print(f"Competitor avg: {ca['word_count']} words, {ca['h2_count']} H2s, {ca['faq_schema_pct']}% FAQ")

    if "metric_scores" in result:
        ms = result["metric_scores"]
        print(f"Metric scores: words={ms['word_count']}% h2={ms['h2_count']}% faq={ms['faq_schema']}% article={ms['article_schema']}% howto={ms['howto_schema']}%")

    if result["recommendations"]:
        print("\nRecommendations:")
        for rec in result["recommendations"]:
            print(f"  {rec}")

    # Write result to state file
    state_file = Path("/root/logs/content-depth-gate") / f"{args.slug}.json"
    state_file.parent.mkdir(parents=True, exist_ok=True)
    state_file.write_text(json.dumps(result, indent=2, default=str))
    print(f"\nResult saved: {state_file}")

    if result["status"] == "pass":
        sys.exit(0)
    else:
        sys.exit(1)


if __name__ == "__main__":
    main()