#!/usr/bin/env python3
"""GA4 OAuth2 — exchange auth code for tokens, save to /root/.hermes/ga4_token.json"""
import json, os, requests

CLIENT_ID = "PLACEHOLDER_CLIENT_ID"
CLIENT_SECRET = "PLACEHOLDER_CLIENT_SECRET"
TOKEN_PATH = "/root/.hermes/ga4_token.json"
CREDS_PATH = "/root/.hermes/ga4_credentials.json"

code = input("Paste the auth code: ").strip()

SCOPES = [
    "https://www.googleapis.com/auth/analytics.manage.users",
    "https://www.googleapis.com/auth/analytics.edit",
    "https://www.googleapis.com/auth/analytics.readonly"
]

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

print(f"✅ Token guardado en {TOKEN_PATH}")

# Test GA4 Admin API
access_token = token_data["access_token"]
headers = {"Authorization": f"Bearer {access_token}"}

# Get account summaries
resp = requests.get(
    "https://analyticsadmin.googleapis.com/v1beta/accountSummaries",
    headers=headers
)
if resp.status_code == 200:
    data = resp.json()
    print(f"\n✅ GA4 Admin API OK. Cuentas: {len(data.get('accountSummaries', []))}")
    for a in data.get("accountSummaries", []):
        print(f"  Account: {a['account']}")
        for p in a.get("propertySummaries", []):
            print(f"    Property: {p['displayName']} → {p['property']}")
else:
    print(f"\nError GA4: {resp.status_code} {resp.text[:200]}")