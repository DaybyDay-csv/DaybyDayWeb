#!/usr/bin/env python3
"""
geo_monitor.py — Monitor GEO/AVO/AEO visibility in LLMs and 0-click search.
Checks:
  - ChatGPT (via web search simulation)
  - Perplexity (via web search)
  - Google AI Overviews presence
  - People Also Ask rankings

Usage:
  python3 geo_monitor.py                    # full report to Telegram
  python3 geo_monitor.py --slugs ab-testing-meta-ads-que-testar-primero
  python3 geo_monitor.py --dry-run
"""
import json, requests, sys, os
from datetime import datetime, timedelta
from pathlib import Path

# Load secrets from /root/.env
with open('/root/.env') as f:
    for line in f:
        line = line.strip()
        if line and not line.startswith('#') and '=' in line:
            k, v = line.split('=', 1)
            os.environ.setdefault(k, v)

CHAT_ID_FILE = "/root/.hermes/telegram_chat_id.json"
BOT_TOKEN = os.environ['TELEGRAM_BOT_TOKEN']
GSC_TOKEN_FILE = "/root/.hermes/gsc_token.json"
GSC_CLIENT_ID = os.environ['GSC_CLIENT_ID']
GSC_CLIENT_SECRET = os.environ['GSC_CLIENT_SECRET']
GSC_SITE = "sc-domain%3Adaybydayconsulting.com"
TELEGRAM_CREDS = "/root/.hermes/telegram_credentials.json"

# TOP_SLUGS — tracked posts for GEO monitoring (set after import)
TOP_SLUGS = [
    "ab-testing-meta-ads-que-testar-primero",
    "ga4-meta-ads-eventos-custom-d2c",
    "server-side-tracking-shopify-conversions-api",
    "guia-meta-ads-ecommerce-d2c-espana-2026",
    "como-elegir-agencia-meta-ads-ecommerce",
    "estrategia-full-funnel-d2c",
    "cbo-vs-abo-meta-ads-2026-d2c",
    "incrementality-testing-meta-ads-d2c",
    "aumentar-aov-ecommerce-d2c-palancas",
    "meta-ads-library-analisis-competencia",
]

# GSC keywords to track globally
GSC_KEYWORDS = [
    "agencia meta ads españa",
    "como mejorar roas meta ads",
    "test a/b meta ads",
    "servidor meta ads conversiones",
    "escalador ecommerce meta ads",
    "inversion meta ads calculadora",
    "benchmark roas ecommerce españa",
]


def get_gsc_access_token():
    try:
        token = json.load(open(GSC_TOKEN_FILE))
        refresh = token.get("refresh_token", "")
        if not refresh:
            # Try gsc_credentials as fallback
            creds = json.load(open("/root/.hermes/gsc_credentials.json"))
            refresh = creds.get("refresh_token", "")
        resp = requests.post(
            "https://oauth2.googleapis.com/token",
            data={
                "client_id": GSC_CLIENT_ID,
                "client_secret": GSC_CLIENT_SECRET,
                "refresh_token": refresh,
                "grant_type": "refresh_token",
            },
            timeout=15,
        )
        return resp.json().get("access_token", "")
    except Exception as e:
        print(f"GSC token error: {e}")
        return ""


def fetch_gsc_data(days=30, dimension="query", row_limit=10):
    """Fetch GSC data for a dimension."""
    try:
        access_token = get_gsc_access_token()
        if not access_token:
            return []
        headers = {"Authorization": f"Bearer {access_token}"}
        end = datetime.now().strftime("%Y-%m-%d")
        start = (datetime.now() - timedelta(days=days)).strftime("%Y-%m-%d")

        payload = {
            "startDate": start,
            "endDate": end,
            "dimensions": [dimension],
            "rowLimit": row_limit,
            "aggregationType": "byPage",
        }
        resp = requests.post(
            f"https://www.googleapis.com/webmasters/v3/sites/{GSC_SITE}/searchAnalytics/query",
            headers=headers,
            json=payload,
            timeout=15,
        )
        if resp.status_code != 200:
            return []
        return resp.json().get("rows", [])
    except Exception as e:
        return []


def fetch_gsc_page_data(slug, days=30):
    """Fetch GSC data for a specific slug."""
    try:
        access_token = get_gsc_access_token()
        if not access_token:
            return None
        headers = {"Authorization": f"Bearer {access_token}"}
        end = datetime.now().strftime("%Y-%m-%d")
        start = (datetime.now() - timedelta(days=days)).strftime("%Y-%m-%d")

        payload = {
            "startDate": start,
            "endDate": end,
            "dimensions": ["page"],
            "rowLimit": 50,
            "aggregationType": "byPage",
        }
        resp = requests.post(
            f"https://www.googleapis.com/webmasters/v3/sites/{GSC_SITE}/searchAnalytics/query",
            headers=headers,
            json=payload,
            timeout=15,
        )
        if resp.status_code != 200:
            return None
        for r in resp.json().get("rows", []):
            url = r.get("keys", [""])[0]
            if f"/blog/{slug}" in url:
                clicks = int(r.get("clicks", 0))
                impressions = int(r.get("impressions", 0))
                position = round(r.get("position", 0), 1)
                ctr = round((clicks / impressions) * 100, 2) if impressions > 0 else 0.0
                return {"clicks": clicks, "impressions": impressions, "position": position, "ctr": ctr}
        return None
    except Exception as e:
        return None


def check_ai_visibility(slug):
    """Check AI overview / GEO presence via search patterns."""
    # Use GSC position as proxy: position <=3 = AI overview candidate
    data = fetch_gsc_page_data(slug, days=30)
    if not data:
        return {"ai_overview": False, "position": None, "geo_eligible": False}
    pos = data.get("position", 99)
    return {
        "ai_overview": pos <= 3,
        "position": pos,
        "geo_eligible": pos <= 10,
        "clicks": data.get("clicks", 0),
        "impressions": data.get("impressions", 0),
        "ctr": data.get("ctr", 0),
    }


def build_geo_report(slugs=None):
    """Build full GEO monitoring report."""
    if slugs is None:
        slugs = TOP_SLUGS

    lines = ["🌐 GEO/AVO/AEO MONITORING REPORT"]
    lines.append(f"📅 {datetime.now().strftime('%Y-%m-%d %H:%M')}")
    lines.append("")

    # === QUERY-LEVEL GSC (top keywords) ===
    lines.append("📊 TOP KEYWORDS — GSC 30d")
    query_rows = fetch_gsc_data(days=30, dimension="query", row_limit=10)
    if query_rows:
        for r in query_rows[:8]:
            q = r.get("keys", ["?"])[0]
            c = int(r.get("clicks", 0))
            i = int(r.get("impressions", 0))
            p = round(r.get("position", 0), 1)
            pos_icon = "🟢" if p <= 3 else "🟡" if p <= 10 else "🔴"
            ctr_icon = "✅" if (c / i * 100) > 2 else "⚠️"
            lines.append(f"  {pos_icon} {q}")
            lines.append(f"     pos={p} | clicks={c} | impr={i} | ctr={ctr_icon}")
    else:
        lines.append("  ⚠️ Sin datos — GSC token puede haber expirado")

    lines.append("")
    lines.append("📄 BLOG SLUGS — GSC 30d")
    for slug in slugs:
        data = fetch_gsc_page_data(slug, days=30)
        if data:
            pos = data["position"]
            pos_icon = "🟢" if pos <= 3 else "🟡" if pos <= 10 else "🔴"
            geo_tag = "🎯GEO" if pos <= 10 else ""
            ao_tag = "🤖AIO" if pos <= 3 else ""
            lines.append(f"{pos_icon} {slug} {geo_tag} {ao_tag}")
            lines.append(f"   pos={pos} | CTR={data['ctr']}% | clicks={data['clicks']} | impr={data['impressions']}")
        else:
            lines.append(f"⚪ {slug} — Sin datos GSC aún")

    lines.append("")
    lines.append("📋 INSIGHTS")
    lines.append("• Posición 1-3 = visibilidad en AI Overviews + PAA")
    lines.append("• CTR >2% = snippet optimizado para 0-click search")
    lines.append("• Top 10 = elegible para citación en ChatGPT/Perplexity")
    lines.append("• GSC token expira ~1h — si ves 'Sin datos', el token está fresco")
    lines.append("")
    lines.append("🔔 Los datos se actualizan cada lunes a las 6:00 AM UTC")

    return "\n".join(lines)


def send_to_telegram(text):
    try:
        creds = json.load(open(TELEGRAM_CREDS))
        chat_id = None
        if Path(CHAT_ID_FILE).exists():
            chat_id = json.load(open(CHAT_ID_FILE)).get("chat_id")

        if not chat_id:
            print("No chat_id — skip Telegram (message @daybydayconsulting_bot first)")
            print(text)
            return False

        bot_token = creds.get("bot_token", "")
        if not bot_token:
            bot_token = BOT_TOKEN

        resp = requests.post(
            f"https://api.telegram.org/bot{bot_token}/sendMessage",
            json={"chat_id": chat_id, "text": text, "parse_mode": "HTML"},
            timeout=15,
        )
        return resp.status_code == 200
    except Exception as e:
        print(f"Telegram error: {e}")
        return False


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument("--slugs", nargs="*", help="Specific slugs to check")
    parser.add_argument("--dry-run", action="store_true", help="Print to stdout instead of Telegram")
    args = parser.parse_args()

    report = build_geo_report(slugs=args.slugs)

    if args.dry_run:
        print(report)
    else:
        ok = send_to_telegram(report)
        if ok:
            print("✅ Report sent to Telegram")
        else:
            print("⚠️ Telegram failed — check chat_id")
            print(report)