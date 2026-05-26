#!/usr/bin/env python3
"""
GSC OAuth2 — Single-use script que abre el browser para autorizar
y guarda el refresh token en /root/.hermes/gsc_token.json
"""
import json, os, socket, webbrowser, sys
from google_auth_oauthlib.flow import InstalledAppFlow

CLIENT_ID = "PLACEHOLDER_CLIENT_ID"
CLIENT_SECRET = "PLACEHOLDER_CLIENT_SECRET"
SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"]
TOKEN_PATH = "/root/.hermes/gsc_token.json"
CREDS_PATH = "/root/.hermes/gsc_credentials.json"
PORT = 9999

creds_data = {
    "installed": {
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "redirect_uris": [f"http://localhost:{PORT}"]
    }
}
os.makedirs("/root/.hermes", exist_ok=True)
with open(CREDS_PATH, "w") as f:
    json.dump(creds_data, f, indent=2)

flow = InstalledAppFlow.from_client_config(creds_data, SCOPES)
url, _ = flow.authorization_url(prompt="consent", access_type="offline")

print("=" * 60)
print("AUTORIZACIÓN GSC — copia esta URL en tu navegador:")
print("=" * 60)
print(url)
print("=" * 60)
print(f"\nEsperando callback en http://localhost:{PORT}...")
sys.stdout.flush()

# Run local server, open browser
creds = flow.run_local_server(port=PORT, prompt="consent", access_type="offline")

with open(TOKEN_PATH, "w") as f:
    f.write(creds.to_json())

print(f"\n✅ Token guardado en {TOKEN_PATH}")
print(f"Refresh token: {creds.refresh_token[:30]}...")

# Test
from googleapiclient.discovery import build
service = build("searchconsole", "v1", credentials=creds)
sites = service.sites().list().execute().get("siteEntry", [])
print(f"✅ GSC OK — sitios accesibles: {len(sites)}")
for s in sites:
    print(f"   {s['siteUrl']}")