#!/usr/bin/env python3
"""
gsc_fetch.py — Fetch real GSC metrics per slug for Prompt Hatching.
Fetches last 30 days of data from Google Search Console API.

Usage:
  python3 gsc_fetch.py                    # all blog slugs
  python3 gsc_fetch.py --slug=cro-landing-page-meta-ads-d2c
  python3 gsc_fetch.py --json            # output JSON for piping
"""
import json, requests, os, argparse
from datetime import datetime, timedelta

# Load secrets from /root/.env
with open('/root/.env') as f:
    for line in f:
        line = line.strip()
        if line and not line.startswith('#') and '=' in line:
            k, v = line.split('=', 1)
            os.environ.setdefault(k, v)

SITE = "sc-domain%3Adaybydayconsulting.com"
TOKEN_FILE = "/root/.hermes/gsc_token.json"
CLIENT_ID = os.environ['GSC_CLIENT_ID']
CLIENT_SECRET = os.environ['GSC_CLIENT_SECRET']


def get_access_token():
    token = json.load(open(TOKEN_FILE))
    resp = requests.post("https://oauth2.googleapis.com/token", data={
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "refresh_token": token["refresh_token"],
        "grant_type": "refresh_token"
    })
    return resp.json()["access_token"]


def fetch_gsc_data(slug=None, days=30):
    access_token = get_access_token()
    headers = {"Authorization": f"Bearer {access_token}"}

    end = datetime.now().strftime("%Y-%m-%d")
    start = (datetime.now() - timedelta(days=days)).strftime("%Y-%m-%d")

    payload = {
        "startDate": start,
        "endDate": end,
        "dimensions": ["page"],
        "rowLimit": 100,
        "aggregationType": "byPage"
    }

    resp = requests.post(
        f"https://www.googleapis.com/webmasters/v3/sites/{SITE}/searchAnalytics/query",
        headers=headers, json=payload
    )

    if resp.status_code != 200:
        raise Exception(f"GSC API error {resp.status_code}: {resp.text}")

    data = resp.json()
    rows = data.get("rows", [])

    results = {}
    for r in rows:
        url = r["keys"][0]
        if "/blog/" not in url:
            continue

        slug_key = url.split("/blog/")[-1].rstrip("/").rstrip("/")
        clicks = r.get("clicks", 0)
        impressions = r.get("impressions", 0)
        position = round(r.get("position", 0), 1)
        ctr = round((clicks / impressions) * 100, 2) if impressions > 0 else 0.0

        results[slug_key] = {
            "clicks": clicks,
            "impressions": impressions,
            "position": position,
            "ctr": ctr,
            "url": url,
        }

    if slug:
        return results.get(slug, None)

    return results


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--slug", help="Specific slug to fetch")
    parser.add_argument("--json", action="store_true", help="JSON output")
    args = parser.parse_args()

    try:
        if args.slug:
            result = fetch_gsc_data(slug=args.slug)
            if result:
                print(json.dumps(result, indent=2))
            else:
                print(f"No GSC data for slug: {args.slug}")
        else:
            results = fetch_gsc_data()
            if args.json:
                print(json.dumps(results, indent=2))
            else:
                print(f"{'SLUG':<50} {'CLICKS':>6} {'IMPRESSIONS':>12} {'CTR':>6} {'POS':>5}")
                print("-" * 82)
                for slug, d in sorted(results.items(), key=lambda x: x[1]["clicks"], reverse=True):
                    print(f"{slug:<50} {d['clicks']:>6} {d['impressions']:>12} {d['ctr']:>5.1f}% {d['position']:>5.1f}")
    except Exception as e:
        print(f"ERROR: {e}")
        exit(1)
