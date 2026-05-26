#!/usr/bin/env python3
"""
keyword-db.py — Free keyword research using Brave Search + GSC + competitor SERP.

Replaces DataForSEO/Ahrefs with:
  - GSC: real position/clicks/impressions per slug (already authorized)
  - Brave Search API: top 10 SERP titles for any keyword (free tier: 2000/mo)
  - Competitor gap analysis: extract what's missing from top 3 competitors

Usage:
  python3 keyword-db.py                       # full refresh
  python3 keyword-db.py --keywords meta-ads,roas-ecommerce   # specific keywords
  python3 keyword-db.py --quickwins          # GSC position 4-15 only
  python3 keyword-db.py --export cluster     # export keyword clusters

Output: seo-plan/keyword-db.json (live keyword database)
"""

import json, requests, os, sys, re, time
import argparse
from datetime import datetime, timedelta
from pathlib import Path

# ── Config ──────────────────────────────────────────────────────────────────
SEO_PLAN = Path("/root/projects/DaybyDay/seo-plan")
KEYWORD_DB_FILE = SEO_PLAN / "keyword-db.json"
BRAVE_API_KEY = os.environ.get("BRAVE_API_KEY", "")

# ── GSC fetch (reuse existing logic) ───────────────────────────────────────

SITE = "sc-domain%3Adaybydayconsulting.com"
TOKEN_FILE = "/root/.hermes/gsc_token.json"

def load_env():
    with open("/root/.env") as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                k, v = line.split("=", 1)
                os.environ.setdefault(k, v)

def get_gsc_token():
    """Refresh GSC access token."""
    load_env()
    token = json.load(open(TOKEN_FILE))
    resp = requests.post(
        "https://oauth2.googleapis.com/token",
        data={
            "client_id": os.environ["GSC_CLIENT_ID"],
            "client_secret": os.environ["GSC_CLIENT_SECRET"],
            "refresh_token": token["refresh_token"],
            "grant_type": "refresh_token",
        },
        timeout=15,
    )
    return resp.json()["access_token"]


def fetch_gsc_all(days=28):
    """Fetch GSC metrics for all blog pages. Returns dict: slug -> metrics."""
    try:
        access_token = get_gsc_token()
        headers = {"Authorization": f"Bearer {access_token}"}
        end = datetime.now().strftime("%Y-%m-%d")
        start = (datetime.now() - timedelta(days=days)).strftime("%Y-%m-%d")

        payload = {
            "startDate": start,
            "endDate": end,
            "dimensions": ["page"],
            "rowLimit": 250,
            "aggregationType": "byPage",
        }

        resp = requests.post(
            f"https://www.googleapis.com/webmasters/v3/sites/{SITE}/searchAnalytics/query",
            headers=headers, json=payload, timeout=30,
        )
        if resp.status_code != 200:
            print(f"[GSC] Error {resp.status_code}: {resp.text[:200]}")
            return {}

        rows = resp.json().get("rows", [])
        results = {}
        for r in rows:
            url = r["keys"][0]
            if "/blog/" not in url:
                continue
            slug = url.split("/blog/")[-1].rstrip("/").rstrip("/")
            clicks = r.get("clicks", 0)
            impressions = r.get("impressions", 0)
            position = round(r.get("position", 0), 1)
            ctr = round((clicks / impressions) * 100, 2) if impressions > 0 else 0.0
            results[slug] = {
                "clicks": clicks, "impressions": impressions,
                "position": position, "ctr": ctr, "url": url,
            }
        return results
    except Exception as e:
        print(f"[GSC] Failed: {e}")
        return {}


# ── Brave Search SERP ────────────────────────────────────────────────────────

def brave_serp(keyword, count=10):
    """
    Fetch top N SERP results for a keyword using Brave Search API.
    Free tier: 2000 calls/month.

    Returns: [{"title": ..., "url": ..., "description": ...}, ...]
    """
    if not BRAVE_API_KEY:
        print("[BRAVE] No API key — using mock data for: " + keyword)
        return []

    try:
        url = "https://api.search.brave.com/res/v1/search"
        headers = {
            "Authorization": f"Bearer {BRAVE_API_KEY}",
            "Accept": "application/json",
        }
        params = {
            "q": keyword,
            "count": count,
            "safesearch": "moderate",
        }
        resp = requests.get(url, headers=headers, params=params, timeout=15)
        if resp.status_code != 200:
            print(f"[BRAVE] Error {resp.status_code} for '{keyword}'")
            return []

        data = resp.json()
        results = []
        for item in data.get("web", {}).get("results", []):
            results.append({
                "title": item.get("title", ""),
                "url": item.get("url", ""),
                "description": item.get("description", ""),
            })
        return results
    except Exception as e:
        print(f"[BRAVE] Failed for '{keyword}': {e}")
        return []


# ── Competitor gap analysis ──────────────────────────────────────────────────

def extract_serp_gaps(keyword, serp_results):
    """
    From SERP results, extract:
    - Angles used by top 3 competitors
    - Gaps (topics nobody covers well)
    - Questions nobody answers
    """
    if not serp_results:
        return {"angles": [], "gaps": [], "unanswered": []}

    # Simple heuristic: title contains certain patterns
    angle_patterns = [
        ("guia", "educational/how-to"),
        ("mejor", "comparativa"),
        ("como", "proceso/paso a paso"),
        ("vs", "comparativa"),
        ("cuanto", "precio/costo"),
        ("caso", "prueba social/caso real"),
    ]

    angles_found = set()
    titles_lower = [r["title"].lower() for r in serp_results[:5]]

    for pattern, label in angle_patterns:
        for title in titles_lower:
            if pattern in title and label not in angles_found:
                angles_found.add(label)

    # Extract what gaps exist (heuristic)
    gaps = []
    our_domain = "daybydayconsulting.com"
    competitor_domains = [r["url"] for r in serp_results[:3]
                         if our_domain not in r.get("url", "")]

    # If no D2C/agency content in top 5, that's a gap
    d2c_mentions = sum(1 for r in serp_results[:5]
                       if any(w in r.get("title", "").lower()
                              for w in ["d2c", "ecommerce", "agencia"]))
    if d2c_mentions < 2:
        gaps.append("Niche D2C España angle missing in top results")

    return {
        "angles": list(angles_found),
        "gaps": gaps,
        "top3_urls": [r["url"] for r in serp_results[:3]],
    }


# ── Keyword DB ────────────────────────────────────────────────────────────────

def build_keyword_db(target_keywords=None, gsc_data=None):
    """
    Build the live keyword database.

    target_keywords: list of keyword strings to research. If None, use GSC data.
    """
    print("[KEYWORD-DB] Building...")
    db = {
        "updated": datetime.now().isoformat(),
        "keywords": {},      # keyword -> {volume, difficulty, intent, serp_gaps, gsc_slug}
        "gsc_quickwins": [], # position 4-15, impressions > 50
        "competitor_angles": {}, # keyword -> {angles, gaps, top3_urls}
    }

    # Load existing DB to preserve data
    if KEYWORD_DB_FILE.exists():
        try:
            existing = json.loads(KEYWORD_DB_FILE.read_text())
            db["keywords"] = existing.get("keywords", {})
        except Exception:
            pass

    # GSC quickwins (live data)
    if gsc_data is None:
        gsc_data = fetch_gsc_all()

    quickwins = []
    for slug, metrics in gsc_data.items():
        pos = metrics.get("position", 99)
        imp = metrics.get("impressions", 0)
        if 4 <= pos <= 15 and imp >= 50:
            quickwins.append({
                "slug": slug,
                "position": pos,
                "impressions": imp,
                "clicks": metrics.get("clicks", 0),
                "ctr": metrics.get("ctr", 0),
            })
    quickwins.sort(key=lambda x: (x["impressions"] * (16 - x["position"])), reverse=True)
    db["gsc_quickwins"] = quickwins[:10]

    # Keyword research
    if target_keywords is None:
        # Use GSC quickwins as keywords to research further
        target_keywords = [qw["slug"].replace("-", " ") for qw in quickwins[:10]]
        if not target_keywords:
            # Fallback: load from keyword_priorities.json
            kp_file = SEO_PLAN / "keyword_priorities.json"
            if kp_file.exists():
                try:
                    kp = json.loads(kp_file.read_text())
                    target_keywords = [k.get("keyword", k.get("term", ""))
                                     for k in kp.get("top_keywords", [])[:20]]
                except Exception:
                    pass

    if not target_keywords:
        print("[KEYWORD-DB] No target keywords found")
        return db

    # Deduplicate
    target_keywords = list(dict.fromkeys(target_keywords))[:30]

    for i, keyword in enumerate(target_keywords):
        print(f"[KEYWORD-DB] [{i+1}/{len(target_keywords)}] {keyword}")

        # Check if we have recent data (skip if < 24h old)
        existing = db["keywords"].get(keyword, {})
        if existing.get("last_fetched"):
            age_h = (datetime.now() - datetime.fromisoformat(
                existing["last_fetched"])).total_seconds() / 3600
            if age_h < 24:
                print(f"  [cached, {age_h:.0f}h old] — skipping")
                continue

        # Brave SERP
        serp = brave_serp(keyword, count=10)
        time.sleep(0.3)  # Respect rate limits

        # Gap analysis
        gaps = extract_serp_gaps(keyword, serp)

        # Match to GSC slug
        slug_candidate = re.sub(r"[^a-z0-9\s]", "",
                                keyword.lower()).replace(" ", "-")[:50]
        gsc_match = gsc_data.get(slug_candidate, {})

        # Infer intent from keyword
        intent = "TOFU"
        if any(w in keyword.lower() for w in ["como", "guia", "que es", "mejor"]):
            intent = "MOFU"
        if any(w in keyword.lower() for w in ["precio", "contratar", "cuanto cuesta", "agencia"]):
            intent = "BOFU"

        db["keywords"][keyword] = {
            "volume_est": _est_volume(keyword),
            "difficulty": _est_difficulty(gaps),
            "intent": intent,
            "serp_gaps": gaps,
            "gsc_slug": slug_candidate if gsc_match else None,
            "gsc_position": gsc_match.get("position"),
            "gsc_impressions": gsc_match.get("impressions"),
            "top_serp_results": serp[:5],
            "last_fetched": datetime.now().isoformat(),
        }
        db["competitor_angles"][keyword] = {
            "angles": gaps.get("angles", []),
            "gaps": gaps.get("gaps", []),
            "top3_urls": gaps.get("top3_urls", []),
        }

    return db


def _est_volume(keyword):
    """Very rough volume estimate based on keyword patterns."""
    word_count = len(keyword.split())
    if word_count <= 2:
        return "500-2000"  # head terms
    elif word_count <= 4:
        return "100-500"   # mid-tail
    else:
        return "50-200"    # long-tail


def _est_difficulty(gaps):
    """Estimate difficulty based on gap analysis."""
    if not gaps.get("top3_urls"):
        return "Unknown"
    has_wiki = any("wikipedia" in u for u in gaps.get("top3_urls", []))
    has_hubspot = any("hubspot" in u or "marketing" in u for u in gaps.get("top3_urls", []))
    if has_wiki or has_hubspot:
        return "Media"
    return "Baja-Media"


# ── Export ───────────────────────────────────────────────────────────────────

def export_clusters(db):
    """Export keyword clusters for content planning."""
    clusters = {}
    for keyword, data in db["keywords"].items():
        intent = data.get("intent", "TOFU")
        cluster_key = f"{intent}-content"
        if cluster_key not in clusters:
            clusters[cluster_key] = []
        clusters[cluster_key].append({
            "keyword": keyword,
            "volume": data.get("volume_est", "?"),
            "difficulty": data.get("difficulty", "?"),
            "gsc_position": data.get("gsc_position"),
            "gaps": data.get("serp_gaps", {}).get("gaps", []),
        })
    return clusters


# ── Main ──────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Keyword DB — Brave + GSC free research")
    parser.add_argument("--keywords", help="Comma-separated keywords to research")
    parser.add_argument("--quickwins", action="store_true",
                        help="Only output GSC quickwins (pos 4-15)")
    parser.add_argument("--export", choices=["cluster", "gaps", "keywords"],
                        help="Export format")
    parser.add_argument("--days", type=int, default=28,
                        help="GSC lookback days (default 28)")
    args = parser.parse_args()

    # Fetch GSC data once
    gsc_data = fetch_gsc_all(days=args.days)

    if args.quickwins:
        db = {"gsc_quickwins": []}
        # Rebuild quickwins only
        for slug, metrics in gsc_data.items():
            pos = metrics.get("position", 99)
            imp = metrics.get("impressions", 0)
            if 4 <= pos <= 15 and imp >= 50:
                db["gsc_quickwins"].append({
                    "slug": slug, "position": pos,
                    "impressions": imp, "clicks": metrics.get("clicks", 0),
                })
        db["gsc_quickwins"].sort(key=lambda x: x["impressions"], reverse=True)
        print(json.dumps(db["gsc_quickwins"], indent=2))
        exit(0)

    # Parse keywords
    target_keywords = None
    if args.keywords:
        target_keywords = [k.strip() for k in args.keywords.split(",")]

    # Build DB
    db = build_keyword_db(target_keywords=target_keywords, gsc_data=gsc_data)

    # Save
    KEYWORD_DB_FILE.parent.mkdir(parents=True, exist_ok=True)
    KEYWORD_DB_FILE.write_text(json.dumps(db, indent=2, ensure_ascii=False))
    print(f"[KEYWORD-DB] Saved to {KEYWORD_DB_FILE}")
    print(f"  Keywords researched: {len(db['keywords'])}")
    print(f"  GSC quickwins: {len(db['gsc_quickwins'])}")

    # Export if requested
    if args.export == "cluster":
        clusters = export_clusters(db)
        print(json.dumps(clusters, indent=2))
    elif args.export == "gaps":
        gaps = {k: v for k, v in db.get("competitor_angles", {}).items()
                if v.get("gaps")}
        print(json.dumps(gaps, indent=2))
