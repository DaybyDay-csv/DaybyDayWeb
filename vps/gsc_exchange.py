#!/usr/bin/env python3
"""GSC OAuth2 — exchange auth code for tokens, save to /root/.hermes/gsc_token.json"""
import json, os, requests

CLIENT_ID = "PLACEHOLDER_CLIENT_ID"
CLIENT_SECRET = "PLACEHOLDER_CLIENT_SECRET"
TOKEN_PATH = "/root/.hermes/gsc_token.json"
CREDS_PATH = "/root/.hermes/gsc_credentials.json"

code = "4/1AeoWuM_5UMA62jhnVCSW_HMwLZJB5TDTApuCi0AqpeGUpdurdNmQB7n5WrQ"

resp = requests.post("https://oauth2.googleapis.com/token", data={
    "code": code,
    "client_id": CLIENT_ID,
    "client_secret": CLIENT_SECRET,
    "redirect_uri": "urn:ietf:wg:oauth:2.0:oob",
    "grant_type": "authorization_code"
})

if resp.status_code != 200:
    print(f"ERROR {resp.status_code}: {resp.text}")
    exit(1)

token_data = resp.json()
print("Token response:", json.dumps(token_data, indent=2))

os.makedirs("/root/.hermes", exist_ok=True)
with open(TOKEN_PATH, "w") as f:
    json.dump(token_data, f, indent=2)

creds_data = {
    "installed": {
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "redirect_uris": ["urn:ietf:wg:oauth:2.0:oob"]
    }
}
with open(CREDS_PATH, "w") as f:
    json.dump(creds_data, f, indent=2)

print(f"\n✅ Guardado en {TOKEN_PATH}")
print(f"Refresh token: {token_data.get('refresh_token', 'N/A')[:30]}...")

# Test GSC access
access_token = token_data["access_token"]
headers = {"Authorization": f"Bearer {access_token}"}
sites_resp = requests.get(
    "https://www.googleapis.com/webmasters/v3/sites",
    headers=headers
)
print(f"\nGSC sites: {sites_resp.status_code}")
if sites_resp.status_code == 200:
    sites = sites_resp.json().get("siteEntry", [])
    print(f"✅ Accede a {len(sites)} sitios:")
    for s in sites:
        print(f"   {s['siteUrl']}")
else:
    print(f"Error: {sites_resp.text[:200]}")