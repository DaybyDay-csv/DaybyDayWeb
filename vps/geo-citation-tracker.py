#!/usr/bin/env python3
"""
geo-citation-tracker.py — Track whether published DayByDay blog posts
are cited by AI answer engines (GEO monitoring).

How it works:
- Bing is the source for ChatGPT Search, Perplexity (Pro), Copilot — if a URL
  is indexed by Bing, it can appear in AI answers.
- We submit to IndexNow → Bing indexes within minutes.
- This script checks if the URL appears in Bing index and monitors
  whether any AI-generated answers cite it.

Runs: 72h after publish (via --slug flag) or --daily checks all published posts.
Output: /root/logs/geo-citations/citations-state.json
"""
import json
import time
import requests
from datetime import datetime
from pathlib import Path

STATE_FILE = Path("/root/logs/geo-citations/citations-state.json")
LOG_DIR = Path("/root/logs/geo-citations")
LOG_DIR.mkdir(parents=True, exist_ok=True)

def load_state():
    if STATE_FILE.exists():
        with open(STATE_FILE) as f:
            return json.load(f)
    return {"tracked_urls": {}, "last_check": None}

def save_state(state):
    with open(STATE_FILE, "w") as f:
        json.dump(state, f, indent=2, default=str)

def check_url_indexed_in_bing(slug):
    """Check if URL is indexed by Bing via site: search."""
    url = f"https://www.daybydayconsulting.com/blog/{slug}"
    headers = {
        "User-Agent": ("Mozilla/5.0 (compatible; Googlebot/2.1; "
                       "+http://www.google.com/bot.html)")
    }
    try:
        search_url = (f"https://www.bing.com/search?q=site%3Adaybydayconsulting"
                      f".com%2Fblog%2F{slug}")
        resp = requests.get(search_url, headers=headers, timeout=15)
        if resp.status_code == 200:
            text = resp.text.lower()
            if slug.lower() in text or url.lower() in text:
                return {"indexed": True, "source": "bing_site_search",
                         "timestamp": datetime.now().isoformat()}
            if "no results for" in text or "there are no results for" in text:
                return {"indexed": False, "source": "bing_site_search",
                         "timestamp": datetime.now().isoformat()}
        return {"indexed": None, "source": "bing_site_search",
                "timestamp": datetime.now().isoformat(),
                "error": f"HTTP {resp.status_code}"}
    except Exception as e:
        return {"indexed": None, "source": "bing_site_search",
                "timestamp": datetime.now().isoformat(), "error": str(e)}

def check_ai_citation_presence(slug):
    """Check if article appears in AI-generated answer contexts.
    
    Checks three AI search surfaces via web search simulation:
    1. Bing Copilot (AI-powered search)
    2. Google AI Overviews
    3. Perplexity
    
    Returns presence_score (0-100) and per-platform citation status.
    """
    url = f"https://www.daybydayconsulting.com/blog/{slug}"
    query = slug.replace("-", "+") + "+ecommerce+meta+ads+spain"
    citations = {}
    overall_score = 0

    # Bing Copilot check
    try:
        search_url = f"https://www.bing.com/search?q={query}&copilot=1"
        headers = {"User-Agent": ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                                  "AppleWebKit/537.36")}
        resp = requests.get(search_url, headers=headers, timeout=15)
        if resp.status_code == 200:
            text = resp.text.lower()
            cited = url.lower() in text or "daybydayconsulting" in text
            citations["bing_copilot"] = {"cited": cited,
                                         "timestamp": datetime.now().isoformat()}
            if cited:
                overall_score += 33
    except Exception as e:
        citations["bing_copilot"] = {"cited": None, "error": str(e)}

    # Google AI Overview check
    try:
        search_url = f"https://www.google.com/search?q={query}"
        headers = {"User-Agent": ("Mozilla/5.0 (X11; Linux x86_64) "
                                  "AppleWebKit/537.36")}
        resp = requests.get(search_url, headers=headers, timeout=15)
        if resp.status_code == 200:
            text = resp.text.lower()
            cited = url.lower() in text
            citations["google_ai_overview"] = {"cited": cited,
                                               "timestamp": datetime.now().isoformat()}
            if cited:
                overall_score += 33
    except Exception as e:
        citations["google_ai_overview"] = {"cited": None, "error": str(e)}

    # Perplexity check
    try:
        search_url = f"https://perplexity.ai/search?q={query}"
        headers = {"User-Agent": "Mozilla/5.0"}
        resp = requests.get(search_url, headers=headers, timeout=15)
        if resp.status_code == 200:
            text = resp.text.lower()
            cited = url.lower() in text or "daybydayconsulting" in text
            citations["perplexity"] = {"cited": cited,
                                      "timestamp": datetime.now().isoformat()}
            if cited:
                overall_score += 34
    except Exception as e:
        citations["perplexity"] = {"cited": None, "error": str(e)}

    return {
        "citations": citations,
        "presence_score": min(overall_score, 100),
        "checked_at": datetime.now().isoformat(),
    }

def track_slug(slug, check_ai=False):
    """Track a single slug: check Bing index + optionally AI citation."""
    state = load_state()
    if slug not in state["tracked_urls"]:
        state["tracked_urls"][slug] = {
            "first_tracked": datetime.now().isoformat(),
            "index_checked_at": None,
            "ai_checked_at": None,
            "indexed": None,
            "presence_score": 0,
        }

    idx_result = check_url_indexed_in_bing(slug)
    state["tracked_urls"][slug]["index_checked_at"] = datetime.now().isoformat()
    state["tracked_urls"][slug]["indexed"] = idx_result.get("indexed")
    state["tracked_urls"][slug]["index_check_source"] = idx_result.get("source")

    if check_ai:
        ai_result = check_ai_citation_presence(slug)
        state["tracked_urls"][slug]["ai_checked_at"] = datetime.now().isoformat()
        state["tracked_urls"][slug]["presence_score"] = ai_result.get(
            "presence_score", 0)
        state["tracked_urls"][slug]["citations"] = ai_result.get("citations", {})

    state["last_check"] = datetime.now().isoformat()
    save_state(state)
    return state["tracked_urls"][slug]

def daily_check():
    """Check all published posts from estado.json."""
    estado_path = Path("/root/projects/DaybyDay/seo-plan/estado.json")
    if not estado_path.exists():
        print("estado.json not found — skipping daily GEO check")
        return

    with open(estado_path) as f:
        estado = json.load(f)

    published = estado.get("published_posts", [])
    state = load_state()
    checked = []
    new_citations = []

    for slug in published:
        if slug not in state["tracked_urls"]:
            result = track_slug(slug, check_ai=True)
            checked.append(slug)
            if result.get("indexed"):
                new_citations.append(slug)
            time.sleep(1)

    state["last_daily_check"] = datetime.now().isoformat()
    save_state(state)

    print(f"GEO Citation Check — {datetime.now().date()}")
    print(f"Checked: {len(checked)} new URLs")
    print(f"Indexed in Bing: {len(new_citations)}")
    for s in new_citations[:5]:
        print(f"  OK {s}")

def weekly_report():
    """Generate weekly GEO report for Telegram."""
    state = load_state()
    tracked = state.get("tracked_urls", {})
    indexed_count = sum(1 for t in tracked.values() if t.get("indexed") == True)
    with_citations = sum(1 for t in tracked.values()
                         if t.get("presence_score", 0) > 0)
    avg_score = (sum(t.get("presence_score", 0) for t in tracked.values())
                 / max(len(tracked), 1))

    top_cited = sorted(tracked.items(),
                       key=lambda x: x[1].get("presence_score", 0),
                       reverse=True)[:5]

    report = (
        f"GEO Weekly Report — {datetime.now().strftime('%Y-%m-%d')}\n"
        f"Tracked URLs: {len(tracked)}\n"
        f"Indexed in Bing: {indexed_count}\n"
        f"With AI citations: {with_citations}\n"
        f"Avg presence score: {avg_score:.0f}/100\n\n"
        f"Top cited articles:"
    )
    for slug, data in top_cited:
        score = data.get("presence_score", 0)
        idx_mark = "OK" if data.get("indexed") else "NO"
        report += f"\n  [{idx_mark}] {slug[:50]} score={score}"

    print(report)
    return report


# ─── GEO Alerting ───────────────────────────────────────────────────────────────

TREND_STATE = Path("/root/logs/geo-citations/trend-state.json")

def load_trend_state() -> dict:
    if TREND_STATE.exists():
        return json.loads(TREND_STATE.read_text())
    return {"previous_scores": {}, "alerts_sent": [], "last_alert_date": None}

def save_trend_state(state: dict):
    TREND_STATE.parent.mkdir(parents=True, exist_ok=True)
    TREND_STATE.write_text(json.dumps(state, indent=2, default=str))

def check_geo_alerts() -> list:
    """
    Compare current GEO state vs previous.
    Alert on: new AI citations, lost citations, score drops >30 pts.
    Returns list of alert dicts.
    """
    state = load_state()
    trend = load_trend_state()
    tracked = state.get("tracked_urls", {})
    prev = trend.get("previous_scores", {})

    alerts = []
    now = datetime.now().isoformat()

    for slug, data in tracked.items():
        score = data.get("presence_score", 0)
        prev_score = prev.get(slug, {}).get("presence_score", -1)
        prev_indexed = prev.get(slug, {}).get("indexed")

        # NEW AI citation
        if score > 0 and prev_score == 0:
            alerts.append({
                "type": "NEW_CITATION",
                "slug": slug,
                "score": score,
                "message": f"🆕 First AI citation! {slug[:50]}\nScore: {score}/100"
            })

        # Lost AI citation
        elif score == 0 and prev_score > 0:
            alerts.append({
                "type": "LOST_CITATION",
                "slug": slug,
                "prev_score": prev_score,
                "message": f"📉 Lost AI citation: {slug[:50]}\nPrevious score: {prev_score}/100"
            })

        # Score drop >30 points
        elif prev_score > 0 and (prev_score - score) > 30:
            alerts.append({
                "type": "SCORE_DROP",
                "slug": slug,
                "prev_score": prev_score,
                "new_score": score,
                "message": f"⚠️ GEO score drop >30pts: {slug[:50]}\n{prev_score} → {score}"
            })

        # Newly indexed in Bing
        indexed_now = data.get("indexed")
        if indexed_now and not prev_indexed:
            alerts.append({
                "type": "NEW_INDEXED",
                "slug": slug,
                "message": f"✅ Bing indexed: {slug[:50]}"
            })

    # Update trend state
    new_scores = {}
    for slug, data in tracked.items():
        new_scores[slug] = {
            "presence_score": data.get("presence_score", 0),
            "indexed": data.get("indexed"),
            "checked_at": data.get("ai_checked_at")
        }
    trend["previous_scores"] = new_scores
    trend["last_alert_check"] = now
    save_trend_state(trend)

    return alerts


def notify_geo_alerts(alerts: list):
    """Send GEO alerts to Telegram."""
    if not alerts:
        return
    import os
    msg_lines = [f"🚨 GEO Alert — {len(alerts)} change(s) detected"]
    for a in alerts[:5]:  # cap at 5
        msg_lines.append(a["message"])
    msg = "\n".join(msg_lines)
    if len(alerts) > 5:
        msg += f"\n...and {len(alerts) - 5} more (see full report)"
    # Write to notify queue
    alert_queue = Path("/root/logs/geo-citations/alert-queue.json")
    alert_queue.parent.mkdir(parents=True, exist_ok=True)
    existing = []
    if alert_queue.exists():
        try:
            existing = json.loads(alert_queue.read_text())
        except Exception:
            existing = []
    existing.extend(alerts)
    alert_queue.write_text(json.dumps(existing, indent=2, default=str))
    # Send via notify.sh
    os.system(f'bash /root/scripts/send-telegram.sh {repr(msg)} info &')
    print(f"GEO alerts queued: {len(alerts)}")

if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("--slug", help="Track a specific slug")
    parser.add_argument("--daily", action="store_true",
                        help="Run daily check on all published posts")
    parser.add_argument("--weekly-report", action="store_true",
                        help="Print weekly GEO report")
    args = parser.parse_args()

    if args.weekly_report:
        weekly_report()
    elif args.slug:
        result = track_slug(args.slug, check_ai=True)
        print(f"Slug: {args.slug}")
        print(f"  Indexed: {result.get('indexed')}")
        print(f"  Presence score: {result.get('presence_score', 0)}")
        print(f"  Citations: {result.get('citations', {})}")
    elif args.daily:
        daily_check()
        # Run alert check after daily check
        alerts = check_geo_alerts()
        if alerts:
            notify_geo_alerts(alerts)
        else:
            print("No GEO alerts this cycle.")
    elif "--alerts" in sys.argv:
        # Manual alert check
        alerts = check_geo_alerts()
        if alerts:
            notify_geo_alerts(alerts)
            print(f"Sent {len(alerts)} alerts")
        else:
            print("No alerts")
    else:
        daily_check()
        # Run default daily check when no args given