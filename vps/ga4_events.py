#!/usr/bin/env python3
"""
ga4_events.py — GA4 Measurement Protocol server-side event sender.
Sends custom events (blog_read, cta_click, calendar_book, form_submit) to GA4
without requiring JavaScript frontend tracking.

Usage:
  python3 ga4_events.py --event=blog_read --slug=cro-landing-page --seconds=120
  python3 ga4_events.py --event=cta_click --slug=pricing-page --cta=calendly
  python3 ga4_events.py --event=calendar_book --test
"""
import json, requests, argparse, os, uuid
from datetime import datetime

CREDENTIALS_FILE = "/root/.hermes/ga4_credentials.json"


def load_credentials():
    return json.load(open(CREDENTIALS_FILE))


def send_event(event_name, params, client_id=None):
    creds = load_credentials()
    measurement_id = creds["measurement_id"]
    api_secret = creds["api_secret"]
    property_id = creds["property_id"]

    if client_id is None:
        client_id = str(uuid.getnode())

    payload = {
        "client_id": client_id,
        "events": [{
            "name": event_name,
            "params": params
        }]
    }

    url = f"https://www.google-analytics.com/mp/collect?measurement_id={measurement_id}&api_secret={api_secret}"

    resp = requests.post(url, json=payload, timeout=10)
    return resp.status_code, resp.text


def send_blog_read(slug, time_on_page_seconds, client_id=None):
    return send_event("blog_read", {
        "slug": slug,
        "time_on_page": time_on_page_seconds,
        "engaged": "yes" if time_on_page_seconds > 60 else "no"
    }, client_id)


def send_cta_click(slug, cta_text, destination, client_id=None):
    return send_event("cta_click", {
        "slug": slug,
        "cta_text": cta_text,
        "destination": destination
    }, client_id)


def send_calendar_book(slug=None, client_id=None):
    return send_event("calendar_book", {
        "slug": slug or "unknown",
        "source": "blog" if slug else "direct"
    }, client_id)


def send_form_submit(form_name, slug=None, client_id=None):
    return send_event("form_submit", {
        "form_name": form_name,
        "slug": slug or "unknown"
    }, client_id)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="GA4 Measurement Protocol event sender")
    parser.add_argument("--event", required=True, choices=["blog_read", "cta_click", "calendar_book", "form_submit", "test"])
    parser.add_argument("--slug", help="Blog slug")
    parser.add_argument("--seconds", type=int, help="Time on page (for blog_read)")
    parser.add_argument("--cta", help="CTA text (for cta_click)")
    parser.add_argument("--dest", help="CTA destination URL (for cta_click)")
    parser.add_argument("--form", help="Form name (for form_submit)")
    parser.add_argument("--client-id", help="Client ID override")
    args = parser.parse_args()

    if args.event == "test":
        status, text = send_event("test_event", {"source": "vps_script"})
        print(f"Status: {status} | {text}")
        exit(0 if status == 204 else 1)

    handlers = {
        "blog_read": lambda: send_blog_read(args.slug or "unknown", args.seconds or 0, args.client_id),
        "cta_click": lambda: send_cta_click(args.slug or "unknown", args.cta or "unknown", args.dest or "unknown", args.client_id),
        "calendar_book": lambda: send_calendar_book(args.slug, args.client_id),
        "form_submit": lambda: send_form_submit(args.form or "unknown", args.slug, args.client_id),
    }

    status, text = handlers[args.event]()
    print(f"Event '{args.event}': {status} | {text}")
    exit(0 if status == 204 else 1)