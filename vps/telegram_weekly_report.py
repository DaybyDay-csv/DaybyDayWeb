#!/usr/bin/env python3
"""
telegram_weekly_report.py — Weekly SEO/Audit report to Telegram.
Sends summary of: GSC metrics, Lighthouse scores, blog performance, crawl status.
"""
import json, requests, os, sys
from datetime import datetime, timedelta
from pathlib import Path

# Load secrets from /root/.env
Dotenv = type('Dotenv', (), {'data': {}})()
with open('/root/.env') as f:
    for line in f:
        line = line.strip()
        if line and not line.startswith('#') and '=' in line:
            k, v = line.split('=', 1)
            os.environ.setdefault(k, v)

TELEGRAM_CREDS = "/root/.hermes/telegram_credentials.json"
GSC_TOKEN_FILE = "/root/.hermes/gsc_token.json"
GSC_CLIENT_ID = os.environ['GSC_CLIENT_ID']
GSC_CLIENT_SECRET = os.environ['GSC_CLIENT_SECRET']
GSC_SITE = "sc-domain%3Adaybydayconsulting.com"
LH_LOG_DIR = Path("/root/logs/lighthouse/weekly")

BOT_TOKEN = os.environ['TELEGRAM_BOT_TOKEN']
CHAT_ID_FILE = "/root/.hermes/telegram_chat_id.json"

def get_chat_id():
    f = Path(CHAT_ID_FILE)
    if f.exists():
        return json.load(open(f)).get("chat_id")
    return None

def save_chat_id(chat_id):
    os.makedirs(str(Path(CHAT_ID_FILE).parent), exist_ok=True)
    json.dump({"chat_id": chat_id}, open(CHAT_ID_FILE, "w"))

def send_telegram(text, chat_id=None):
    if chat_id is None:
        chat_id = get_chat_id()
    if chat_id is None:
        print("ERROR: No chat_id. Start a conversation with the bot first.")
        return False
    resp = requests.post(
        f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage",
        json={"chat_id": chat_id, "text": text, "parse_mode": "HTML"},
        timeout=10
    )
    return resp.status_code == 200

def get_gsc_access_token():
    token = json.load(open(GSC_TOKEN_FILE))
    resp = requests.post("https://oauth2.googleapis.com/token", data={
        "client_id": GSC_CLIENT_ID, "client_secret": GSC_CLIENT_SECRET,
        "refresh_token": token["refresh_token"], "grant_type": "refresh_token"
    })
    return resp.json()["access_token"]

def get_gsc_summary(days=7):
    try:
        access_token = get_gsc_access_token()
        headers = {"Authorization": f"Bearer {access_token}"}
        end = datetime.now().strftime("%Y-%m-%d")
        start = (datetime.now() - timedelta(days=days)).strftime("%Y-%m-%d")

        # Total stats
        payload = {
            "startDate": start, "endDate": end,
            "dimensions": [],
        }
        resp = requests.post(
            f"https://www.googleapis.com/webmasters/v3/sites/{GSC_SITE}/searchAnalytics/query",
            headers=headers, json=payload
        )
        if resp.status_code != 200:
            return None

        row = resp.json()["rows"][0]
        return {
            "clicks": int(row.get("clicks", 0)),
            "impressions": int(row.get("impressions", 0)),
            "position": round(row.get("position", 0), 1),
        }
    except Exception as e:
        return None

def get_gsc_top_pages(days=7, limit=5):
    try:
        access_token = get_gsc_access_token()
        headers = {"Authorization": f"Bearer {access_token}"}
        end = datetime.now().strftime("%Y-%m-%d")
        start = (datetime.now() - timedelta(days=days)).strftime("%Y-%m-%d")

        payload = {
            "startDate": start, "endDate": end,
            "dimensions": ["page"], "rowLimit": limit,
            "aggregationType": "byPage"
        }
        resp = requests.post(
            f"https://www.googleapis.com/webmasters/v3/sites/{GSC_SITE}/searchAnalytics/query",
            headers=headers, json=payload
        )
        if resp.status_code != 200:
            return []
        return [
            {
                "url": r["keys"][0],
                "clicks": r.get("clicks", 0),
                "impressions": r.get("impressions", 0),
                "position": round(r.get("position", 0), 1),
            }
            for r in resp.json().get("rows", []) if "/blog/" in r["keys"][0]
        ]
    except Exception:
        return []

def get_lighthouse_trend():
    """Get last 2 weeks of Lighthouse scores."""
    try:
        weekly_dirs = sorted(LH_LOG_DIR.glob("week-*"))
        if len(weekly_dirs) < 2:
            return None, None
        prev = weekly_dirs[-2]
        curr = weekly_dirs[-1]
        scores = {}
        for d in [prev, curr]:
            for f in d.glob("audit-*.json"):
                data = json.load(open(f))
                cats = data.get("categories", {})
                scores[d.name] = {
                    "perf": round(cats.get("performance", {}).get("score", 0) * 100),
                    "seo": round(cats.get("seo", {}).get("score", 0) * 100),
                }
        return scores.get(prev.name), scores.get(curr.name)
    except Exception:
        return None, None

def build_report():
    today = datetime.now().strftime("%Y-%m-%d")
    gsc = get_gsc_summary(days=7)
    top_pages = get_gsc_top_pages(days=7, limit=5)
    prev_lh, curr_lh = get_lighthouse_trend()

    lines = [
        f"📊 <b>DayByDay — Weekly Report</b>",
        f"📅 {today}",
        "",
        "🔍 <b>GSC — Últimos 7 días</b>",
    ]

    if gsc:
        ctr = round(gsc["clicks"] / gsc["impressions"] * 100, 2) if gsc["impressions"] > 0 else 0
        lines += [
            f"  Clics: {gsc['clicks']}",
            f"  Impresiones: {gsc['impressions']}",
            f"  Posición media: {gsc['position']}",
            f"  CTR: {ctr}%",
        ]
    else:
        lines.append("  Sin datos GSC esta semana")

    if top_pages:
        lines.append("")
        lines.append("  <b>Top páginas blog:</b>")
        for p in top_pages:
            slug = p["url"].split("/blog/")[-1].rstrip("/")[:30]
            lines.append(f"  • {slug}: {p['clicks']} clics, pos {p['position']}")

    lines += ["", "⚡ <b>Lighthouse (último vs anterior):</b>"]
    if curr_lh:
        diff = curr_lh["perf"] - (prev_lh["perf"] if prev_lh else 0)
        arrow = "🟢" if diff >= 0 else "🔴"
        lines.append(f"  Performance: {curr_lh['perf']} {arrow} ({diff:+.0f})")
        lines.append(f"  SEO: {curr_lh['seo']}")
    else:
        lines.append("  Sin datos Lighthouse esta semana")

    lines += ["", "📝 <b>Blogs publicados esta semana:</b>"]
    # Count git commits in last 7 days
    try:
        import subprocess
        result = subprocess.run(
            ["git", "log", "--since=f7 days ago", "--oneline", "--", "src/pages/blog/"],
            cwd="/root/projects/DaybyDay", capture_output=True, text=True
        )
        commits = [l for l in result.stdout.strip().split("\n") if l]
        lines.append(f"  {len(commits)} posts publicados")
    except Exception:
        lines.append("  Sin datos")

    return "\n".join(lines)

if __name__ == "__main__":
    # First run: register chat_id if not set
    chat_id = get_chat_id()
    if chat_id is None:
        print("Buscando updates del bot para registrar chat_id...")
        resp = requests.get(f"https://api.telegram.org/bot{BOT_TOKEN}/getUpdates", timeout=10)
        updates = resp.json()
        if updates.get("ok") and updates.get("result"):
            chat_id = updates["result"][0]["message"]["chat"]["id"]
            save_chat_id(chat_id)
            print(f"Chat ID registrado: {chat_id}")
        else:
            print("No se pudo obtener chat_id. Envía un mensaje al bot primero.")
            print(" Luego ejecuta este script de nuevo.")
            exit(1)

    report = build_report()
    if "--test" in sys.argv:
        print(report)
        exit(0)

    sent = send_telegram(report, chat_id)
    if sent:
        print(f"✅ Reporte enviado a Telegram (chat_id={chat_id})")
    else:
        print("❌ Error enviando a Telegram")