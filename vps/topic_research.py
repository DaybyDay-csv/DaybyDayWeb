#!/usr/bin/env python3
"""
topic_research.py — Topic research for DayByDay blog pipeline.
Discovers high-value blog topics from multiple sources:
  1. GSC gap analysis (queries where we rank 5-20 but get low CTR)
  2. Reddit communities (r/ecommerce, r/emprendedores, r/dropship)
  3. Google People Also Ask / Related searches
  4. AnswerThePublic free search
  5. Seed keyword expansion via autocomplete

Usage:
  python3 topic_research.py --seed meta-ads-ecommerce --region es
  python3 topic_research.py --slugs-only    # print only slugs for pipeline
  python3 topic_research.py --report        # full research report to stdout
"""

import json, re, requests, sys, os
from datetime import datetime, timedelta
from pathlib import Path

# Load secrets from /root/.env
with open('/root/.env') as f:
    for line in f:
        line = line.strip()
        if line and not line.startswith('#') and '=' in line:
            k, v = line.split('=', 1)
            os.environ.setdefault(k, v)

# ── Config ──────────────────────────────────────────────────────────────────
GSC_TOKEN_FILE = Path("/root/.hermes/gsc_token.json")
GSC_CLIENT_ID = os.environ['GSC_CLIENT_ID']
GSC_CLIENT_SECRET = os.environ['GSC_CLIENT_SECRET']
GSC_SITE = "sc-domain%3Adaybydayconsulting.com"

STATE_FILE = Path("/root/logs/topic-research/state.json")
STATE_FILE.parent.mkdir(parents=True, exist_ok=True)

# Spanish autocomplete seeds — D2C España founders real questions
AUTOCOMPLETE_SEEDS_ES = [
    "meta ads ecommerce españa",
    "facebook ads tienda online españa",
    "google ads meta ads como combinar",
    "roas meta ads españa benchmarks",
    "cuanto cobrar meta ads freelancer",
    "agencia meta ads mejor españa",
    "advantage shopping meta ads configuracion",
    "retargeting ecommerce conversion españa",
    "tiktok ads ecommerce españa",
    "creatividad ugc meta ads",
    "escalar campanas meta ads sin romper roas",
    "test a/b meta ads principiante",
    "ga4 meta eventos server side",
    "marketing mix modeling ecommerce españa",
    "incrementality testing meta ads",
    "cbo vs abo meta ads 2026",
    "performance max ecommerce cuando usar",
    "lookalike meta ads alta calidad",
    "aov primera compra ecommerce",
    "ltv cac ecommerce españa",
    "pixel meta ads shopify",
    "server side tracking shopify",
    "meta conversions api shopify",
    "proxy attribution meta google",
    "paid media freelancer españa",
    "consultora marketing digital españa",
]

# Curated high-value topics for D2C España ICP (fallback when automated research is sparse)
CURATED_TOPICS = [
    {"title": "como empezar con meta ads en 2026 siendo ecommerce españa", "cluster": "paid-media-foundations", "priority": "high"},
    {"title": "cuanto invertir en meta ads segun mi tamano de ecommerce", "cluster": "paid-media-foundations", "priority": "high"},
    {"title": "test a b meta ads ecommerce cuando hacerlo y como interpretarlo", "cluster": "creative-ugc", "priority": "high"},
    {"title": "cbo vs abo meta ads 2026 cual gana en ecommerce espana", "cluster": "strategy-scaling", "priority": "high"},
    {"title": "retargeting ecommerce espana cuando activar y con que presupuesto", "cluster": "strategy-scaling", "priority": "medium"},
    {"title": "advantage shopping meta ads configuracion paso a paso", "cluster": "strategy-scaling", "priority": "high"},
    {"title": "ga4 meta server side tracking shopify sin dolores de cabeza", "cluster": "technical-tracking", "priority": "high"},
    {"title": "meta conversions api shopify como configurarla correctamente", "cluster": "technical-tracking", "priority": "high"},
    {"title": "escalar meta ads sin romper roas cuando y como hacerlo", "cluster": "strategy-scaling", "priority": "high"},
    {"title": "marketing mix modeling ecommerce para que sirve y cuando hacerlo", "cluster": "attribution-reporting", "priority": "medium"},
    {"title": "incrementality testing meta ads cuando necesitas uno y como disenararlo", "cluster": "attribution-reporting", "priority": "medium"},
    {"title": "lookalike meta ads alta calidad como construir semilla correcta", "cluster": "strategy-scaling", "priority": "medium"},
    {"title": "creatividad ugc meta ads que funciona en ecommerce espana 2026", "cluster": "creative-ugc", "priority": "high"},
    {"title": "ad fatigue meta ads como detectarla antes de que rompa el cpa", "cluster": "creative-ugc", "priority": "high"},
    {"title": "aov primera compra ecommerce como subirlo con meta ads", "cluster": "unit-economics", "priority": "medium"},
    {"title": "ltv cac ecommerce metricas que importan para escalar", "cluster": "unit-economics", "priority": "medium"},
    {"title": "tiktok ads ecommerce espana 2026 merece la pena para d2c", "cluster": "geo-expansion", "priority": "medium"},
    {"title": "youtube ads ecommerce como complemento a meta ads", "cluster": "geo-expansion", "priority": "low"},
    {"title": "agencia meta ads vs media buyer freelancer espana pros contras", "cluster": "agency-selection", "priority": "medium"},
    {"title": "cuanto cobra una agencia meta ads en espana 2026", "cluster": "agency-selection", "priority": "medium"},
    {"title": "modelos atribucion meta google ecommerce cual usar", "cluster": "attribution-reporting", "priority": "high"},
    {"title": "performance max ecommerce cuando usarla y cuando evitarla", "cluster": "strategy-scaling", "priority": "high"},
    {"title": "hook rate meta ads como medirlo y mejorarlo", "cluster": "creative-ugc", "priority": "high"},
    {"title": "pixel meta ads shopify configuracion paso a paso", "cluster": "technical-tracking", "priority": "medium"},
    {"title": "roas meta ads benchmarks por sector ecommerce espana 2026", "cluster": "unit-economics", "priority": "high"},
    {"title": "internacionalizar ecommerce espana meta ads europa", "cluster": "geo-expansion", "priority": "low"},
    {"title": "media mix modeling vs attribution modelo cuando usar cada uno", "cluster": "attribution-reporting", "priority": "medium"},
    {"title": "cfd attribution meta google como funciona y para que sirve", "cluster": "attribution-reporting", "priority": "low"},
    {"title": "escala ecommerce 100k 1m meta ads sin agency de moda", "cluster": "strategy-scaling", "priority": "high"},
    {"title": "partnership ads meta creators ugc para ecommerce d2c", "cluster": "creative-ugc", "priority": "high"},
]

# Topic clusters
CLUSTERS = {
    "paid-media-foundations": ["meta ads para principiantes", "facebook ads para ecommerce", "como empezar con meta ads", "presupuesto meta ads primeros meses"],
    "attribution-reporting": ["modelos atribucion meta google", "cfd vs ffd attribution", "media mix modeling ecommerce españa", "incrementality testing meta ads"],
    "creative-ugc": ["ugc meta ads creatividad", "test a/b creatividades meta", "ad fatigue meta ads rotacion", "hook rate meta ads"],
    "strategy-scaling": ["como escalar meta ads sin romper roas", "cbo vs abo meta ads 2026", "advantage+ shopping configuracion", "performance max vs manual"],
    "unit-economics": ["roas bueno ecommerce españa", "cac vs ltv ecommerce", "aov primera compra", "margen contribucion ecommerce"],
    "agency-selection": ["mejor agencia meta ads españa", "media buyer freelancer vs agencia", "cuanto cobra agencia meta ads", "agencia paid media vs inhouse"],
    "technical-tracking": ["ga4 meta eventos custom", "server side tracking shopify", "meta conversions api", "gtm server side ecommerce"],
    "geo-expansion": ["tiktok ads españa 2026", "youtube ads ecommerce", "internacionalizar ecommerce españa meta"],
}

CACHE_TTL_HOURS = 72


# ── GSC access ──────────────────────────────────────────────────────────────

def get_gsc_token():
    try:
        token = json.load(open(GSC_TOKEN_FILE))
        resp = requests.post("https://oauth2.googleapis.com/token", data={
            "client_id": GSC_CLIENT_ID,
            "client_secret": GSC_CLIENT_SECRET,
            "refresh_token": token["refresh_token"],
            "grant_type": "refresh_token"
        }, timeout=15)
        return resp.json().get("access_token", "")
    except:
        return ""


def fetch_gsc_queries(days=90, limit=100):
    token = get_gsc_token()
    if not token:
        return []
    headers = {"Authorization": f"Bearer {token}"}
    end = datetime.now().strftime("%Y-%m-%d")
    start = (datetime.now() - timedelta(days=days)).strftime("%Y-%m-%d")
    payload = {"startDate": start, "endDate": end, "dimensions": ["query"],
               "rowLimit": limit, "aggregationType": "byPage"}
    try:
        resp = requests.post(
            f"https://www.googleapis.com/webmasters/v3/sites/{GSC_SITE}/searchAnalytics/query",
            headers=headers, json=payload, timeout=20
        )
        if resp.status_code == 200:
            return resp.json().get("rows", [])
    except:
        pass
    return []


def fetch_gsc_pages(days=90, limit=100):
    token = get_gsc_token()
    if not token:
        return []
    headers = {"Authorization": f"Bearer {token}"}
    end = datetime.now().strftime("%Y-%m-%d")
    start = (datetime.now() - timedelta(days=days)).strftime("%Y-%m-%d")
    payload = {"startDate": start, "endDate": end, "dimensions": ["page"],
               "rowLimit": limit, "aggregationType": "byPage"}
    try:
        resp = requests.post(
            f"https://www.googleapis.com/webmasters/v3/sites/{GSC_SITE}/searchAnalytics/query",
            headers=headers, json=payload, timeout=20
        )
        if resp.status_code == 200:
            return resp.json().get("rows", [])
    except:
        pass
    return []


# ── Cluster Momentum Tracking ───────────────────────────────────────────────

def fetch_gsc_page_metrics(days=28, limit=100):
    """Fetch page-level GSC metrics for a recent period."""
    token = get_gsc_token()
    if not token:
        return {}
    headers = {"Authorization": f"Bearer {token}"}
    end = datetime.now().strftime("%Y-%m-%d")
    start = (datetime.now() - timedelta(days=days)).strftime("%Y-%m-%d")
    payload = {
        "startDate": start, "endDate": end,
        "dimensions": ["page"],
        "rowLimit": limit,
        "aggregationType": "byPage"
    }
    try:
        resp = requests.post(
            f"https://www.googleapis.com/webmasters/v3/sites/{GSC_SITE}/searchAnalytics/query",
            headers=headers, json=payload, timeout=20
        )
        if resp.status_code == 200:
            result = {}
            for r in resp.json().get("rows", []):
                url = r["keys"][0]
                slug = url.split("/blog/")[-1] if "/blog/" in url else url.split("/")[-1]
                result[slug] = {
                    "clicks": int(r.get("clicks", 0)),
                    "impressions": int(r.get("impressions", 0)),
                    "position": round(r.get("position", 99), 1),
                }
            return result
    except:
        pass
    return {}


def compute_cluster_momentum(current_pages, prev_pages):
    """
    Compute week-over-week (28d) impression growth per cluster.
    Returns dict: cluster -> {"current_impr": N, "prev_impr": N, "growth_pct": float, "slug_count": N}
    """
    # Map slug -> cluster from curated topics (reverse lookup)
    cluster_map = {}
    cluster_data = {}
    for t in CURATED_TOPICS:
        slug = slugify(t["title"])
        cluster = t.get("cluster", "unknown")
        cluster_map[slug] = cluster
        if cluster not in cluster_data:
            cluster_data[cluster] = {"current_impr": 0, "prev_impr": 0, "slugs": set()}
        cluster_data[cluster]["slugs"].add(slug)

    # Aggregate impressions by cluster for current and previous periods
    for slug, metrics in current_pages.items():
        cluster = cluster_map.get(slug)
        if cluster and cluster in cluster_data:
            cluster_data[cluster]["current_impr"] += metrics.get("impressions", 0)

    for slug, metrics in prev_pages.items():
        cluster = cluster_map.get(slug)
        if cluster and cluster in cluster_data:
            cluster_data[cluster]["prev_impr"] += metrics.get("impressions", 0)

    # Compute growth % for each cluster
    momentum = {}
    for cluster, data in cluster_data.items():
        prev = data["prev_impr"]
        curr = data["current_impr"]
        if prev > 0:
            growth = round((curr - prev) / prev * 100, 1)
        elif curr > 0:
            growth = 100.0  # new cluster
        else:
            growth = 0.0
        momentum[cluster] = {
            "current_impr": curr,
            "prev_impr": prev,
            "growth_pct": growth,
            "slug_count": len(data["slugs"]),
        }

    return momentum


def get_topic_momentum_boost(cluster, momentum_scores):
    """
    Return a score boost (0-20) based on cluster momentum.
    Clusters with >20% WoW growth get +20, 10-20% get +15, 5-10% get +10.
    """
    m = momentum_scores.get(cluster, {})
    growth = m.get("growth_pct", 0)
    if growth >= 20:
        return 20
    elif growth >= 10:
        return 15
    elif growth >= 5:
        return 10
    elif growth >= 0:
        return 5
    return 0  # negative growth = no boost


# ── Reddit scraping ─────────────────────────────────────────────────────────

def fetch_reddit_posts(subreddit, sort="hot", limit=25):
    """Fetch posts from a subreddit via Reddit API (no auth needed for public)."""
    try:
        # Use a browser-like User-Agent to avoid Reddit blocking
        headers = {
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Accept": "application/json",
            "Accept-Language": "es-ES,es;q=0.9",
        }
        url = f"https://www.reddit.com/r/{subreddit}/{sort}.json?limit={limit}"
        resp = requests.get(url, headers=headers, timeout=15)
        if resp.status_code != 200:
            return []
        data = resp.json()
        posts = []
        for child in data.get("data", {}).get("children", []):
            p = child["data"]
            posts.append({
                "title": p.get("title", ""),
                "score": p.get("score", 0),
                "comments": p.get("num_comments", 0),
                "flair": p.get("link_flair_text", ""),
                "selftext": p.get("selftext", "")[:300],
                "url": f"https://reddit.com{p.get('permalink', '')}",
            })
        return posts
    except Exception as e:
        return []


def extract_questions_from_reddit(posts):
    """Extract question-style titles (D2C/Meta Ads relevant)."""
    question_patterns = [
        r"^(¿cómo|cómo|que|qué|por qué|porqué|cuándo|cuando|dónde|donde|cuál|cual|cuánto|cuanto|es posible|puede alguien|alguien sabe|busco|necesito|ayuda|consejo)",
        r"\?",
    ]
    topics = []
    for p in posts:
        title = p["title"]
        # Skip very short titles or very long ones
        if len(title) < 20 or len(title) > 200:
            continue
        # Filter to D2C/Meta Ads/ecommerce relevant
        relevance_keywords = [
            "meta", "facebook", "ads", "roas", "ecommerce", "tienda", "online",
            "d2c", "shopify", "meta ads", "google ads", "pixel", "capi",
            "ga4", "conversion", "ctr", "cpm", "campaña", "presupuesto",
            "creatividad", "ugc", "retargeting", "lookalike", "escalabilidad",
            "agencia", "media buyer", " freelance", "funnel", "aov", "ltv",
            "cac", "roi", "test", "ab testing", "ventas", "vender",
        ]
        if not any(k.lower() in title.lower() for k in relevance_keywords):
            continue

        # Questions preferred, but high-score posts also ok
        is_question = any(re.search(pat, title.lower()) for pat in question_patterns)
        if is_question or p["score"] >= 5:
            topics.append({
                "source": "reddit",
                "title": title,
                "score": p["score"],
                "comments": p["comments"],
                "flair": p.get("flair", ""),
                "selftext": p["selftext"],
            })
    return topics


# ── Google People Also Ask ─────────────────────────────────────────────────

def fetch_paa_for_query(query, limit=8):
    """Fetch People Also Ask results for a query using SerpAPI or manual search.
    Falls back to text extraction if no API key.
    """
    # Try SerpAPI if available
    serp_key = os.environ.get("SERPAPI_KEY", "")
    if serp_key:
        try:
            params = {
                "q": query, "api_key": serp_key, "engine": "google",
                "num": limit, "gl": "es", "hl": "es"
            }
            resp = requests.get("https://serpapi.com/search", params=params, timeout=15)
            if resp.status_code == 200:
                data = resp.json()
                paa = data.get("people_also_ask", [])
                return [{"question": p.get("question", ""), "answer": p.get("snippet", "")[:150]}
                        for p in paa[:limit]]
        except:
            pass
    return []


FIRECRAWL_API_KEY = os.environ.get("FIRECRAWL_API_KEY", "fc-1e76f041134248f5b2d72a2fd16e81e7")
FIRECRAWL_API_URL = os.environ.get("FIRECRAWL_API_URL", "https://api.firecrawl.dev")

def firecrawl_search(query, limit=5, timeout=25):
    """Search via Firecrawl API. Returns list of {title, url, description}."""
    try:
        import subprocess, json
        result = subprocess.run(
            ['curl', '-s', '-X', 'POST', f'{FIRECRAWL_API_URL}/v1/search',
             '-H', f'Authorization: Bearer {FIRECRAWL_API_KEY}',
             '-H', 'Content-Type: application/json',
             '-d', json.dumps({"query": query, "limit": limit})],
            capture_output=True, text=True, timeout=timeout
        )
        data = json.loads(result.stdout)
        if data.get('success'):
            return data.get('data', [])
    except:
        pass
    return []


def firecrawl_scrape(url, formats=None, timeout=40):
    """Scrape a URL via Firecrawl v2. Returns markdown content or None."""
    try:
        import subprocess, json
        payload = {"url": url, "onlyMainContent": True}
        if formats:
            payload["formats"] = formats
        else:
            payload["formats"] = ["markdown"]
        result = subprocess.run(
            ['curl', '-s', '-X', 'POST', f'{FIRECRAWL_API_URL}/v2/scrape',
             '-H', f'Authorization: Bearer {FIRECRAWL_API_KEY}',
             '-H', 'Content-Type: application/json',
             '-d', json.dumps(payload)],
            capture_output=True, text=True, timeout=timeout
        )
        data = json.loads(result.stdout)
        if data.get('success'):
            return data.get('data', {}).get('markdown', '')
    except:
        pass
    return None


def firecrawl_map(url, search=None, limit=20, timeout=40):
    """Crawl site structure via Firecrawl map. Returns list of links."""
    try:
        import subprocess, json
        payload = {"url": url, "limit": limit}
        if search:
            payload["search"] = search
        result = subprocess.run(
            ['curl', '-s', '-X', 'POST', f'{FIRECRAWL_API_URL}/v1/crawl',
             '-H', f'Authorization: Bearer {FIRECRAWL_API_KEY}',
             '-H', 'Content-Type: application/json',
             '-d', json.dumps(payload)],
            capture_output=True, text=True, timeout=timeout
        )
        data = json.loads(result.stdout)
        if data.get('success'):
            return data.get('data', {}).get('links', [])
    except:
        pass
    return []


# ── Autocomplete / Related searches ────────────────────────────────────────

def fetch_google_autocomplete(seed, lang="es", region="ES"):
    """Get autocomplete suggestions from Google via suggests.google.com."""
    suggestions = []
    try:
        url = f"https://suggestqueries.google.com/complete/search?client=firefox&q={requests.utils.quote(seed)}&hl={lang}&gl={region}"
        resp = requests.get(url, timeout=10)
        if resp.status_code == 200:
            try:
                data = resp.json()  # Returns [query, [suggestions], stats]
                if isinstance(data, list) and len(data) > 1:
                    for item in data[1]:
                        if isinstance(item, str) and len(item) >= 4:
                            suggestions.append(item)
            except:
                # Fallback: parse raw text
                text = resp.text
                import re
                found = re.findall(r'"([^"]{4,60})"', text)
                suggestions = [f for f in found if len(f) >= 4][:10]
    except:
        pass
    return suggestions


# ── AnswerThePublic free scraping ───────────────────────────────────────────

def fetch_answerthepublic(seed):
    """Scrape AnswerThePublic free results for a seed keyword."""
    # ATP has a free tier — scrape their public results page
    topics = []
    try:
        # Try to fetch the visual map page (may require premium)
        url = f"https://answerthepublic.com/searches?q={requests.utils.quote(seed)}&re=sp&pa=sp"
        resp = requests.get(url, headers={"User-Agent": "Mozilla/5.0"}, timeout=10)
        if resp.status_code == 200:
            text = resp.text
            # Extract questions from the page
            questions = re.findall(r'class="[^"]*question[^"]*"[^>]*>([^<]+)<', text)
            for q in questions[:20]:
                q = q.strip()
                if len(q) > 15:
                    topics.append({"source": "answerthepublic", "question": q})
    except:
        pass
    return topics


# ── GSC gap analysis ────────────────────────────────────────────────────────

def gsc_gap_analysis():
    """Find topics we rank for but don't get clicks (position 5-20) — opportunity."""
    rows = fetch_gsc_queries(days=90, limit=200)
    opportunities = []
    for r in rows:
        q = r["keys"][0]
        clicks = int(r.get("clicks", 0))
        impr = int(r.get("impressions", 0))
        pos = r.get("position", 99)
        ctr = (clicks / impr * 100) if impr > 0 else 0

        # Opportunity: position 5-20, low CTR, meaningful impressions
        if 5 <= pos <= 20 and impr >= 5 and ctr < 3:
            opportunities.append({
                "query": q, "position": round(pos, 1),
                "ctr": round(ctr, 2), "clicks": clicks,
                "impressions": impr,
                "opportunity_type": "position_gate" if pos <= 10 else "ctr_improve"
            })

    # Sort by potential (impressions * (20-pos))
    opportunities.sort(key=lambda x: x["impressions"] * max(0, 20 - x["position"]), reverse=True)
    return opportunities[:15]


def gsc_top_pages():
    """Top pages by clicks — shows what already works."""
    rows = fetch_gsc_pages(days=90, limit=20)
    pages = []
    for r in rows:
        url = r["keys"][0]
        clicks = int(r.get("clicks", 0))
        impr = int(r.get("impressions", 0))
        pos = r.get("position", 99)
        slug = url.split("/blog/")[-1] if "/blog/" in url else url.split("/")[-1]
        pages.append({
            "url": url, "slug": slug, "clicks": clicks,
            "impressions": impr, "position": round(pos, 1)
        })
    pages.sort(key=lambda x: x["clicks"], reverse=True)
    return pages[:10]


# ── Topic scoring ───────────────────────────────────────────────────────────

def score_topic(topic_dict, existing_slugs, momentum_scores=None):
    """Score a topic for blog potential. Returns 0-100.
    momentum_scores: dict of cluster -> {growth_pct, current_impr, prev_impr, slug_count}
    """
    if momentum_scores is None:
        momentum_scores = {}
    score = 0
    title = topic_dict.get("title", topic_dict.get("question", ""))

    # Length: 40-80 chars ideal
    if 40 <= len(title) <= 80:
        score += 15
    elif len(title) > 15:
        score += 5

    # Score from source
    if topic_dict.get("source") == "gsc_opportunity":
        score += 25
    elif topic_dict.get("source") == "reddit":
        score += min(topic_dict.get("score", 0) * 2, 30)

    # Check cluster relevance
    cluster_match = any(
        kw in title.lower()
        for cluster_kws in CLUSTERS.values()
        for kw in cluster_kws
    )
    if cluster_match:
        score += 20

    # Curated priority bonus
    if topic_dict.get("source") == "curated":
        priority = topic_dict.get("priority", "medium")
        if priority == "high":
            score += 30
        elif priority == "medium":
            score += 20
        else:
            score += 10

    # Cluster momentum boost
    cluster = topic_dict.get("cluster", "")
    if cluster:
        boost = get_topic_momentum_boost(cluster, momentum_scores)
        score += boost

    # Avoid duplicate slugs
    slug = slugify(title)
    if slug not in existing_slugs:
        score += 15

    return score


def slugify(text):
    """Convert title to URL slug."""
    import unicodedata
    text = unicodedata.normalize("NFKD", text)
    text = re.sub(r"[^\w\s-]", "", text).lower()
    text = re.sub(r"[-\s]+", "-", text).strip("-")
    return text[:80]


# ── Main research function ──────────────────────────────────────────────────

def run_topic_research(seed_keywords=None, include_reddit=True, include_paa=True):
    print("🔍 TOPIC RESEARCH — DayByDay Blog Pipeline")
    print(f"   {datetime.now().strftime('%Y-%m-%d %H:%M')}")

    all_topics = []
    existing_slugs = set()

    # Load existing slugs from GSC pages
    top_pages = gsc_top_pages()
    for p in top_pages:
        if p["slug"]:
            existing_slugs.add(p["slug"])

    # 1. GSC gap analysis
    print("📊 GSC Gap Analysis (90d)...")
    gaps = gsc_gap_analysis()
    for g in gaps:
        topic = {
            "source": "gsc_opportunity",
            "title": g["query"],
            "position": g["position"],
            "ctr": g["ctr"],
            "impressions": g["impressions"],
            "opportunity_type": g["opportunity_type"],
            "cluster": detect_cluster(g["query"]),
        }
        all_topics.append(topic)

    # 2. Autocomplete for seeds
    print("🔎 Autocomplete expansion...")
    for seed in (seed_keywords or AUTOCOMPLETE_SEEDS_ES)[:20]:
        suggestions = fetch_google_autocomplete(seed)
        for s in suggestions:
            all_topics.append({
                "source": "autocomplete",
                "title": s,
                "cluster": detect_cluster(s),
            })
        if len(suggestions) > 3:
            print(f"   {seed[:40]} → {len(suggestions)} suggestions")

    # 3. Reddit
    if include_reddit:
        print("💬 Reddit communities...")
        for sub in ["ecommerce", "emprendedores", "MarketingDigital", "Dropshipping"]:
            posts = fetch_reddit_posts(sub, sort="hot", limit=30)
            questions = extract_questions_from_reddit(posts)
            for q in questions[:8]:
                all_topics.append({
                    "source": "reddit",
                    "title": q["title"],
                    "reddit_score": q["score"],
                    "reddit_comments": q["comments"],
                    "reddit_flair": q.get("flair", ""),
                    "cluster": detect_cluster(q["title"]),
                })
            if posts:
                print(f"   r/{sub}: {len(questions)} relevant questions")

    # 4. PAA for top queries
    if include_paa:
        print("🤖 People Also Ask...")
        top_gsc_queries = [g["query"] for g in gaps[:5]]
        for q in top_gsc_queries:
            paa = fetch_paa_for_query(q, limit=5)
            for item in paa:
                all_topics.append({
                    "source": "paa",
                    "title": item.get("question", ""),
                    "snippet": item.get("answer", "")[:100],
                    "cluster": detect_cluster(item.get("question", "")),
                })

    # 5. AnswerThePublic
    print("📋 AnswerThePublic...")
    for seed in AUTOCOMPLETE_SEEDS_ES[:10]:
        atp_results = fetch_answerthepublic(seed)
        for r in atp_results:
            all_topics.append({
                "source": "answerthepublic",
                "title": r.get("question", ""),
                "cluster": detect_cluster(r.get("question", "")),
            })

    # 5.5 Curated topics (high-value D2C España topics pre-validated)
    print("📝 Curated topics (pre-validated D2C España)...")
    for t in CURATED_TOPICS:
        all_topics.append({
            "source": "curated",
            "title": t["title"],
            "cluster": t.get("cluster", "general"),
            "priority": t.get("priority", "medium"),
        })

    # 5.7 Firecrawl — web-scale topic discovery across all clusters
    print("🌐 Firecrawl web search (topic discovery)...")
    firecrawl_queries = [
        ("como empezar meta ads ecommerce españa 2026 guia paso paso", "paid-media-foundations"),
        ("meta ads facebook instagram principiante tutorial para ecommerce", "paid-media-foundations"),
        ("presupuesto meta ads primer mes ecommerce cuanto invertir españa", "paid-media-foundations"),
        ("modelo atribucion multi-touch ecommerce cuando usarlo pros contras", "attribution-reporting"),
        ("marketing mix modeling mmm ecommerce cuando merece la pena españa", "attribution-reporting"),
        ("incrementality testing meta ads diseno analisis resultados", "attribution-reporting"),
        ("creatividad ugc meta ads que funciona ecommerce españa 2026", "creative-ugc"),
        ("ad fatigue meta ads sintomas solucion rotacion creativa", "creative-ugc"),
        ("hook rate ctr meta ads como mejorarlo creatividad anuncios", "creative-ugc"),
        ("cbo vs abo meta ads 2026 cual ganar ecommerce comparativa", "strategy-scaling"),
        ("advantage plus shopping campaign meta ads configuracion tutorial", "strategy-scaling"),
        ("escalar meta ads sin romper roas cuando como hacerlo ecommerce", "strategy-scaling"),
        ("meta conversion api shopify errores comunes configuracion completa", "technical-tracking"),
        ("ga4 server side tracking shopify meta eventos config", "technical-tracking"),
        ("pixel meta ads shopify configuracion eventos tutorial 2026", "technical-tracking"),
        ("roas meta ads benchmarks ecommerce españa 2026 por sector", "unit-economics"),
        ("aov primera compra ecommerce como aumentarlo meta ads", "unit-economics"),
        ("ltv cac ecommerce metricas para escalar negocio d2c", "unit-economics"),
        ("agencia meta ads vs freelancer españa pros contras cual elegir", "agency-selection"),
        ("cuanto cobra agencia meta ads españa 2026 precios media", "agency-selection"),
        ("tiktok ads vs meta ads ecommerce españa comparativa 2026", "geo-expansion"),
        ("internacionalizar ecommerce españa meta ads europa strategy", "geo-expansion"),
        ("performance max ecommerce cuando usar cuando evitar 2026", "strategy-scaling"),
        ("lookalike meta ads alta calidad semilla correcta construir", "strategy-scaling"),
    ]
    seen_firecrawl_titles = set()
    firecrawl_count = 0
    for q, cluster in firecrawl_queries:
        results = firecrawl_search(q, limit=4)
        for item in results:
            title = item.get("title", "")
            if not title or len(title) < 15 or title in seen_firecrawl_titles:
                continue
            url_lower = item.get("url", "").lower()
            # Skip YouTube-heavy results to keep quality
            if "youtube.com" in url_lower and firecrawl_count % 3 == 0:
                continue
            seen_firecrawl_titles.add(title)
            all_topics.append({
                "source": "firecrawl",
                "title": title,
                "description": item.get("description", "")[:200],
                "url": item.get("url", ""),
                "cluster": cluster,
            })
            firecrawl_count += 1
        if results:
            print(f"   [{cluster}] \"{q[:45]}...\" → {len(results)} results")

    # Compute cluster momentum (28d vs prev 28d) before scoring
    print("📈 Cluster momentum tracking (28d WoW)...")
    current_pages = fetch_gsc_page_metrics(days=28, limit=100)
    prev_pages = fetch_gsc_page_metrics(days=56, limit=100)  # 28-56d ago
    momentum_scores = compute_cluster_momentum(current_pages, prev_pages)
    if momentum_scores:
        print("   Cluster momentum:")
        for c, m in sorted(momentum_scores.items(), key=lambda x: x[1]['growth_pct'], reverse=True):
            print(f"   [{m['growth_pct']:+.1f}%] {c}: {m['current_impr']} impr (prev: {m['prev_impr']})")

    # Deduplicate by slug
    seen_slugs = set()
    deduped = []
    for t in all_topics:
        slug = slugify(t.get("title", ""))
        if slug and slug not in seen_slugs:
            seen_slugs.add(slug)
            t["slug"] = slug
            t["blog_score"] = score_topic(t, existing_slugs, momentum_scores)
            deduped.append(t)

    # Sort by score
    deduped.sort(key=lambda x: x["blog_score"], reverse=True)

    # Build report
    print()
    print("=" * 70)
    print(f"TOPIC RESEARCH RESULTS — {len(deduped)} unique topics")
    print("=" * 70)

    print("\n🎯 TOP OPPORTUNITY QUERIES (GSC gaps)")
    print("-" * 70)
    for t in [x for x in deduped if x["source"] == "gsc_opportunity"][:10]:
        print(f"  [{t['opportunity_type']}] pos={t['position']} ctr={t['ctr']}% impr={t['impressions']}")
        print(f"    {t['title']}")
        print(f"    slug candidates: {t['slug']}")
        print()

    print("\n🔥 REDDIT COMMUNITY QUESTIONS")
    print("-" * 70)
    for t in [x for x in deduped if x["source"] == "reddit"][:10]:
        print(f"  score={t.get('reddit_score', 0)} comments={t.get('reddit_comments', 0)}")
        print(f"    {t['title']}")
        print(f"    slug: {t['slug']}")
        print()

    print("\n💡 AUTOCOMPLETE + PAA")
    print("-" * 70)
    for t in [x for x in deduped if x["source"] in ("autocomplete", "paa", "answerthepublic")][:10]:
        print(f"  [{t['source']}] {t['title'][:70]}")
        print(f"    cluster: {t.get('cluster', 'N/A')} | slug: {t['slug']}")
        print()

    print("\n🏆 TOP 15 PRIORITY BLOG TOPICS")
    print("-" * 70)
    for i, t in enumerate(deduped[:15], 1):
        print(f"  {i:2d}. [{t['blog_score']:3.0f}] {t['title'][:60]}")
        print(f"      source={t['source']} | cluster={t.get('cluster', 'N/A')}")

    # Save state
    state = {
        "last_run": datetime.now().isoformat(),
        "topics": deduped[:30],
        "gsc_gaps": gaps,
        "existing_slugs": list(existing_slugs),
        "cluster_momentum": momentum_scores,
    }
    with open(STATE_FILE, "w") as f:
        json.dump(state, f, indent=2, default=str)

    print()
    print(f"✅ Results saved to {STATE_FILE}")
    return deduped


def detect_cluster(query):
    """Assign a topic cluster to a query."""
    query_lower = query.lower()
    cluster_keywords = {
        "paid-media-foundations": ["meta ads", "facebook ads", "campaña meta", "presupuesto meta", "como empezar", "principiante"],
        "attribution-reporting": ["atribucion", "modelo atribucion", "cfd", "ffd", "mix modeling", "mmm", "incrementality", "atribución"],
        "creative-ugc": ["creatividad", "ugc", "hook", "ad fatigue", "rotacion", "test a/b", "ab test", "test creativo"],
        "strategy-scaling": ["escalar", "cbo", "abo", "advantage+", "performance max", "ampliar", "escalabilidad"],
        "unit-economics": ["roas", "cac", "ltv", "aov", "margen", "unit economics", "lifetime value", "customer acquisition"],
        "agency-selection": ["agencia", "media buyer", "freelance", "contratar", "seleccionar agencia", "inhouse"],
        "technical-tracking": ["ga4", "server side", "gtm", "pixel", "capi", "conversions api", "tracking"],
        "geo-expansion": ["tiktok", "youtube", "internacional", "españa", "europa", "海外"],
    }
    for cluster, keywords in cluster_keywords.items():
        if any(k in query_lower for k in keywords):
            return cluster
    return "general"


if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("--seed", help="Specific seed keyword")
    parser.add_argument("--region", default="es", help="Region code (es, eu)")
    parser.add_argument("--slugs-only", action="store_true", help="Print only new slugs for pipeline")
    parser.add_argument("--report", action="store_true", help="Print full report")
    args = parser.parse_args()

    seeds = [args.seed] if args.seed else None

    topics = run_topic_research(seed_keywords=seeds)

    if args.slugs_only:
        existing = set()
        for p in gsc_top_pages():
            if p["slug"]:
                existing.add(p["slug"])
        print("\nNew topic slugs for pipeline:")
        for t in topics[:20]:
            if t["slug"] not in existing:
                print(f"  {t['slug']} (score={t['blog_score']:.0f}, source={t['source']})")

    if args.report or not (args.slugs_only or args.seed):
        pass  # Full report already printed in run_topic_research