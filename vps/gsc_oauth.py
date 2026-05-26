#!/usr/bin/env python3
"""
DayByDay — GSC OAuth2 Authorization Script
Flow: genera URL → usuario autoriza → recibe code → intercambia por tokens
"""

import json
import os
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials

SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"]
TOKEN_PATH = "/root/.hermes/gsc_token.json"
CREDS_PATH = "/root/.hermes/gsc_credentials.json"

CLIENT_ID = "PLACEHOLDER_CLIENT_ID"
CLIENT_SECRET = "PLACEHOLDER_CLIENT_SECRET"

def save_client_creds():
    creds_data = {
        "installed": {
            "client_id": CLIENT_ID,
            "client_secret": CLIENT_SECRET,
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
            "redirect_uris": ["http://localhost"]
        }
    }
    with open(CREDS_PATH, "w") as f:
        json.dump(creds_data, f, indent=2)
    print(f"Credentials saved to {CREDS_PATH}")

def authorize():
    save_client_creds()
    
    flow = InstalledAppFlow.from_client_secrets_file(CREDS_PATH, SCOPES)
    # Use localhost as redirect —InstalledAppFlow handles port automatically
    creds = flow.run_local_server(port=8080, prompt="consent", access_type="offline")
    
    with open(TOKEN_PATH, "w") as f:
        f.write(creds.to_json())
    
    print(f"\n✅ Token guardado en {TOKEN_PATH}")
    print(f"Refresh token: {creds.refresh_token[:20]}...")
    return creds

def test_connection(creds):
    import requests
    # Test: get site list
    service = build_service(creds)
    # Simple test — list sites
    page = service.sites().list().execute()
    sites = page.get('siteEntry', [])
    print(f"\n✅ Conexión GSC OK. Sitios accesibles: {len(sites)}")
    for s in sites:
        print(f"  - {s['siteUrl']}")

def build_service(creds):
    from googleapiclient.discovery import build
    return build('searchconsole', 'v1', credentials=creds)

if __name__ == "__main__":
    authorize()