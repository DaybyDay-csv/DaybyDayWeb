#!/usr/bin/env python3
"""
cluster-momentum.py — Track topic cluster momentum via GSC week-over-week growth.
Ranks clusters by impression growth to inform topic selection priority.

Usage:
  python3 cluster-momentum.py              # run analysis + print report
  python3 cluster-momentum.py --enrich    # enrich topic_research state with momentum scores
  python3 cluster-momentum.py --weekly    # called by cron Monday 6:00 UTC before blog pipeline
"""
import json
import requests
from datetime import datetime, timedelta
from pathlib import Path

# Load secrets
with open('/root/.env') as f:
    for line in f:
        line = line.strip()
        if line and not line.startswith('#') and '=' in line:
            k, v = line.split('=', 1)
            import os
            os.environ.setdefault(k, v)

GSC_TOKEN_FILE = Path("/root/.hermes/gsc_token.json")
GSC_SITE = "sc-domain%3Adaybydayconsulting.com"
STATE_FILE = Path("/root/logs/topic-research/state.json")
OUTPUT_FILE = Path("/root/logs/topic-research/cluster-momentum.json")

# Cluster keyword mappings
CLUSTER_KEYWORDS = {
    "paid-media-foundations": ["meta ads", "facebook ads", "campaña meta", "presupuesto meta", "como empezar"],
    "attribution-reporting": ["atribucion", "modelo atribucion", "cfd", "ffd", "mix modeling", "mmm", "incrementality"],
    "creative-ugc": ["creatividad", "ugc", "hook", "ad fatigue", "rotacion", "test a/b", "test creativo"],
    "strategy-scaling": ["escalar", "cbo", "abo", "advantage+", "performance max", "ampliar"],
    "unit-economics": ["roas", "cac", "ltv", "aov", "margen", "unit economics"],
    "agency-selection": ["agencia", "media buyer", "freelance", "contratar", "seleccionar agencia", "inhouse"],
    "technical-tracking": ["ga4", "server side", "gtm", "pixel", "capi", "conversions api", "tracking"],
    "geo-expansion": ["tiktok", "youtube", "internacional", "españa", "europa"],
}

CLUSTER_DISPLAY = {
    "paid-media-foundations": "Paid Media Foundations",
    "attribution-reporting": "Attribution & Reporting",
    "creative-ugc": "Creative & UGC",
    "strategy-scaling": "Strategy & Scaling",
    "unit-economics": "Unit Economics",
    "agency-selection": "Agency Selection",
    "technical-tracking": "Technical Tracking",
    "geo-expansion": "Geographic Expansion",
}

def get_gsc_token():
    try:
        token = json.load(open(GSC_TOKEN_FILE))
        resp = requests.post(
            "https://oauth2.googleapis.com/token",
            data={
                "client_id": __import__('os').environ['GSC_CLIENT_ID'],
                "client_secret": __import__('os').environ['GSC_CLIENT_SECRET'],
                "refresh_token": token["refresh_token"],
                "grant_type": "refresh_token"
            },
            timeout=15
        )
        return resp.json().get("access_token", "")
    except:
        return ""

def fetch_gsc_weekly_clusters(token):
    """Fetch per-cluster impression data: compare this week vs last 4 weeks avg."""
    headers = {"Authorization": f"Bearer {token}"}
    end = datetime.now().strftime("%Y-%m-%d")
    start_7d = (datetime.now() - timedelta(days=7)).strftime("%Y-%m-%d")
    start_28d = (datetime.now() - timedelta(days=28)).strftime("%Y-%m-%d")
    start_35d = (datetime.now() - timedelta(days=35)).strftime("%Y-%m-%d")

    results = {}

    # Fetch 7-day impressions per query
    for period_name, period_start, period_end in [
        ("last_7d", start_7d, end),
        ("prev_7d_1", start_28d, start_21d := (datetime.now() - timedelta(days=21)).strftime("%Y-%m-%d")),
        ("prev_7d_2", start_35d, start_28d),
    ]:
        payload = {
            "startDate": period_start,
            "endDate": period_end,
            "dimensions": ["query"],
            "rowLimit": 500,
            "aggregationType": "byPage"
        }
        try:
            resp = requests.post(
                f"https://www.googleapis.com/webmasters/v3/sites/{GSC_SITE}/searchAnalytics/query",
                headers=headers, json=payload, timeout=20
            )
            if resp.status_code == 200:
                results[period_name] = resp.json().get("rows", [])
        except:
            pass

    return results

def assign_cluster(query):
    query_lower = query.lower()
    for cluster, keywords in CLUSTER_KEYWORDS.items():
        if any(kw in query_lower for kw in keywords):
            return cluster
    return "general"

def compute_momentum(periods_data):
    """Compute week-over-week momentum per cluster.
    
    Returns dict: cluster → {last_7d, prev_7d_avg, growth_pct, momentum_score}
    """
    # Sum impressions per cluster for last 7d
    last_7d = {}
    for row in periods_data.get("last_7d", []):
        query = row.get("keys", [{}])[0] if row.get("keys") else ""
        impressions = row.get("impressions", 0)
        cluster = assign_cluster(query)
        last_7d[cluster] = last_7d.get(cluster, 0) + impressions

    # Average of previous two 7-day periods
    prev_periods = [periods_data.get("prev_7d_1", []), periods_data.get("prev_7d_2", [])]
    prev_avg = {}
    for period in prev_periods:
        for row in period:
            query = row.get("keys", [{}])[0] if row.get("keys") else ""
            impressions = row.get("impressions", 0)
            cluster = assign_cluster(query)
            prev_avg[cluster] = prev_avg.get(cluster, 0) + impressions
    for c in prev_avg:
        prev_avg[c] = prev_avg[c] / len(prev_periods)

    # Compute growth
    cluster_momentum = {}
    all_clusters = set(list(last_7d.keys()) + list(prev_avg.keys()))
    for cluster in all_clusters:
        current = last_7d.get(cluster, 0)
        previous = prev_avg.get(cluster, 0)
        if previous > 0:
            growth_pct = ((current - previous) / previous) * 100
        else:
            growth_pct = 100 if current > 0 else 0

        # momentum_score: weighted by absolute volume + growth rate
        # 0-100 scale: higher = prioritize this cluster in topic selection
        volume_factor = min(current / 1000, 1.0)  # cap at 1000 impressions/week
        growth_factor = min(abs(growth_pct) / 50, 1.0)  # cap at 50% growth
        direction = 1 if growth_pct > 0 else 0.5  # decaying factor for declining clusters
        momentum_score = int((volume_factor * 0.4 + growth_factor * 0.6) * direction * 100)

        cluster_momentum[cluster] = {
            "last_7d_impressions": current,
            "prev_avg_impressions": round(previous, 1),
            "growth_pct": round(growth_pct, 1),
            "momentum_score": momentum_score,
            "trend": "rising" if growth_pct > 5 else ("falling" if growth_pct < -5 else "stable"),
        }

    return cluster_momentum

def enrich_topic_state(momentum):
    """Add momentum scores to topic_research state.json for topic prioritization."""
    if not STATE_FILE.exists():
        return

    with open(STATE_FILE) as f:
        state = json.load(f)

    for topic in state.get("topics", []):
        cluster = topic.get("cluster", "general")
        if cluster in momentum:
            topic["cluster_momentum_score"] = momentum[cluster]["momentum_score"]
            topic["cluster_growth_pct"] = momentum[cluster]["growth_pct"]
            topic["cluster_trend"] = momentum[cluster]["trend"]

    # Re-sort by blog_score + momentum boost
    for t in state.get("topics", []):
        boost = t.get("cluster_momentum_score", 0) * 0.1
        t["effective_priority"] = t.get("blog_score", 50) + boost

    state["topics"].sort(key=lambda x: x.get("effective_priority", 0), reverse=True)
    state["cluster_momentum"] = momentum
    state["momentum_updated"] = datetime.now().isoformat()

    with open(STATE_FILE, "w") as f:
        json.dump(state, f, indent=2, default=str, ensure_ascii=False)

    return state

def print_report(momentum):
    print("=" * 60)
    print(f"CLUSTER MOMENTUM REPORT — {datetime.now().strftime('%Y-%m-%d')}")
    print("=" * 60)
    print()

    sorted_clusters = sorted(
        momentum.items(),
        key=lambda x: x[1].get("momentum_score", 0),
        reverse=True
    )

    print(f"{'Cluster':<30} {'Impr (7d)':>12} {'Prev avg':>12} {'Growth':>8} {'Score':>6} {'Trend'}")
    print("-" * 75)
    for cluster, data in sorted_clusters:
        display = CLUSTER_DISPLAY.get(cluster, cluster)
        last = data.get("last_7d_impressions", 0)
        prev = data.get("prev_avg_impressions", 0)
        growth = data.get("growth_pct", 0)
        score = data.get("momentum_score", 0)
        trend = data.get("trend", "stable")
        trend_icon = {"rising": "↑", "falling": "↓", "stable": "→"}[trend]
        print(f"{display:<30} {last:>12.0f} {prev:>12.0f} {growth:>+7.0f}% {score:>5}  {trend_icon}")

    print()
    top_cluster = sorted_clusters[0][0] if sorted_clusters else None
    if top_cluster:
        print(f"🔥 TOP PRIORITY CLUSTER: {CLUSTER_DISPLAY.get(top_cluster, top_cluster)} "
              f"(score={momentum[top_cluster]['momentum_score']})")
        print(f"   → Prioritize topics from this cluster in next week's publish queue")

    return sorted_clusters

if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("--enrich", action="store_true",
                        help="Enrich topic_research state.json with momentum scores")
    parser.add_argument("--weekly", action="store_true",
                        help="Weekly mode: enrich + print report")
    args = parser.parse_args()

    token = get_gsc_token()
    if not token:
        print("ERROR: Could not get GSC access token")
        exit(1)

    periods = fetch_gsc_weekly_clusters(token)
    momentum = compute_momentum(periods)

    if args.enrich or args.weekly:
        enrich_topic_state(momentum)

    report = print_report(momentum)

    # Save to output file
    output = {
        "generated_at": datetime.now().isoformat(),
        "clusters": momentum,
        "top_cluster": report[0][0] if report else None,
    }
    with open(OUTPUT_FILE, "w") as f:
        json.dump(output, f, indent=2, default=str)

    if not (args.enrich or args.weekly):
        print()
        print(f"Full data saved to {OUTPUT_FILE}")
        print("Use --enrich to add momentum scores to topic research state")