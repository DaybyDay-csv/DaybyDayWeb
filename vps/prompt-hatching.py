#!/usr/bin/env python3
"""
prompt-hatching.py — Prompt Hatching: A/B variant testing for blog generation prompts.
Tracks Lighthouse scores + GSC CTR per variant and promotes the winner.

Usage:
  python3 prompt-hatching.py --variant=A --slug=<slug> --gsc-ctr=<float> --gsc-position=<int>
  python3 prompt-hatching.py --report          # print current state + winner
  python3 prompt-hatching.py --promote         # promote winning variant

Data stored in: /root/logs/hatching/hatching-state.json
Reports:        /root/logs/hatching/reports/
"""

import json
import os
import sys
import argparse
import requests
from datetime import datetime, timedelta
from pathlib import Path

# Load secrets from /root/.env
with open('/root/.env') as f:
    for line in f:
        line = line.strip()
        if line and not line.startswith('#') and '=' in line:
            k, v = line.split('=', 1)
            os.environ.setdefault(k, v)

STATE_FILE = Path("/root/logs/hatching/hatching-state.json")
REPORT_DIR = Path("/root/logs/hatching/reports")
REPORT_DIR.mkdir(parents=True, exist_ok=True)

GSC_SITE = "sc-domain%3Adaybydayconsulting.com"
GSC_TOKEN_FILE = Path("/root/.hermes/gsc_token.json")
GSC_CLIENT_ID = os.environ['GSC_CLIENT_ID']
GSC_CLIENT_SECRET = os.environ['GSC_CLIENT_SECRET']


def get_gsc_access_token():
    token = json.load(open(GSC_TOKEN_FILE))
    resp = requests.post("https://oauth2.googleapis.com/token", data={
        "client_id": GSC_CLIENT_ID,
        "client_secret": GSC_CLIENT_SECRET,
        "refresh_token": token["refresh_token"],
        "grant_type": "refresh_token"
    })
    return resp.json()["access_token"]


def fetch_gsc_metrics(slug, days=30):
    """Fetch real GSC CTR + position for a slug. Returns (ctr, position) or (None, None)."""
    try:
        access_token = get_gsc_access_token()
        headers = {"Authorization": f"Bearer {access_token}"}
        end = datetime.now().strftime("%Y-%m-%d")
        start = (datetime.now() - timedelta(days=days)).strftime("%Y-%m-%d")

        payload = {
            "startDate": start, "endDate": end,
            "dimensions": ["page"], "rowLimit": 100, "aggregationType": "byPage"
        }
        resp = requests.post(
            f"https://www.googleapis.com/webmasters/v3/sites/{GSC_SITE}/searchAnalytics/query",
            headers=headers, json=payload
        )
        if resp.status_code != 200:
            return None, None

        for r in resp.json().get("rows", []):
            url = r["keys"][0]
            if f"/blog/{slug}" in url or url.endswith(f"/{slug}"):
                clicks = r.get("clicks", 0)
                impressions = r.get("impressions", 0)
                position = round(r.get("position", 0), 1)
                ctr = round((clicks / impressions) * 100, 2) if impressions > 0 else 0.0
                return ctr, position
        return None, None
    except Exception:
        return None, None

VARIANTS = {
    "A": {
        "name": "control",
        "description": "Tono operador directo, respuestas FAQ cortas, 4-5 líneas por H2",
        "section_length": "4-5 líneas",
        "faq_style": "respuestas cortas (1-2 líneas)",
        "tone": "operador directo",
        "examples_in_body": False,
        "internal_links_count": 2,
    },
    "B": {
        "name": "variant_b",
        "description": "Tono narrativo con ejemplo cliente, respuestas FAQ largas con dato, 8-10 líneas por H2",
        "section_length": "8-10 líneas con datos硬的 y ejemplo",
        "faq_style": "respuestas largas (3-4 líneas con ejemplo)",
        "tone": "narrativo con ejemplo de cliente real",
        "examples_in_body": True,
        "internal_links_count": 2,
    },
}

DEFAULT_THRESHOLDS = {
    "min_sample_size": 6,       # mínimo posts antes de evaluar
    "confidence_p": 0.10,        # p-value threshold para Welch's t-test
    "min_effect_size": 0.15,     # diferencia mínima en score (15%)
    "lighthouse_weight": 0.50,   # peso de Lighthouse en score compuesto
    "gsc_weight": 0.35,          # peso de CTR GSC en score compuesto
    "perf_weight": 0.15,         # peso de posición GSC en score compuesto
}


def load_state():
    if STATE_FILE.exists():
        with open(STATE_FILE) as f:
            return json.load(f)
    return {
        "variants": {v: {"posts": [], "scores": []} for v in VARIANTS},
        "current_control": "A",
        "winner": None,
        "last_promoted": None,
        "runs": 0,
    }


def save_state(state):
    STATE_FILE.parent.mkdir(parents=True, exist_ok=True)
    with open(STATE_FILE, "w") as f:
        json.dump(state, f, indent=2, default=str)


def compute_composite_score(lh_perf, lh_seo, gsc_ctr, gsc_position):
    """Compute 0-100 composite score from Lighthouse + GSC metrics.
    gsc_ctr is in percentage (0-100), gsc_position is rank (1+).
    """
    w = DEFAULT_THRESHOLDS
    lh_score = (lh_perf / 100) * 0.4 + (lh_seo / 100) * 0.6
    gsc_ctr_score = min(gsc_ctr / 100, 1.0) if gsc_ctr is not None else 0.0  # 100% CTR = 1.0
    gsc_pos_score = max(0, 1 - (gsc_position - 1) / 20) if gsc_position is not None else 0.0  # pos 1 = 1.0, pos 20+ = 0
    return (
        w["lighthouse_weight"] * lh_score
        + w["gsc_weight"] * gsc_ctr_score
        + w["perf_weight"] * gsc_pos_score
    ) * 100


def welch_t_test(a, b):
    """Welch's t-test for unequal variances. Returns (t_stat, p_value)."""
    import math
    n1, n2 = len(a), len(b)
    if n1 < 2 or n2 < 2:
        return 0.0, 1.0
    m1, m2 = sum(a) / n1, sum(b) / n2
    v1 = sum((x - m1) ** 2 for x in a) / (n1 - 1) if n1 > 1 else 0
    v2 = sum((x - m2) ** 2 for x in b) / (n2 - 1) if n2 > 1 else 0
    se = math.sqrt(v1 / n1 + v2 / n2)
    if se == 0:
        return 0.0, 1.0
    t = (m1 - m2) / se
    # Welch df approximation
    num = (v1 / n1 + v2 / n2) ** 2
    den = (v1 / n1) ** 2 / (n1 - 1) + (v2 / n2) ** 2 / (n2 - 1)
    df = num / den if den > 0 else 1
    # Approximate p using normal CDF for simplicity
    from math import sqrt, erf
    p = 0.5 * (1 + erf(t / sqrt(2)))
    p = 2 * min(p, 1 - p)  # two-tailed
    return t, p


def register_post(variant, slug, lh_perf=None, lh_seo=None, gsc_ctr=None, gsc_position=None):
    state = load_state()
    if variant not in VARIANTS:
        print(f"ERROR: unknown variant '{variant}'. Valid: {list(VARIANTS.keys())}")
        return

    composite = compute_composite_score(
        lh_perf or 50,
        lh_seo or 50,
        gsc_ctr or 0,
        gsc_position or 20,
    )
    post_record = {
        "slug": slug,
        "timestamp": datetime.now().isoformat(),
        "lh_perf": lh_perf,
        "lh_seo": lh_seo,
        "gsc_ctr": gsc_ctr,
        "gsc_position": gsc_position,
        "composite_score": round(composite, 2),
    }
    state["variants"][variant]["posts"].append(post_record)
    state["variants"][variant]["scores"].append(composite)
    state["runs"] += 1
    save_state(state)
    print(f"Registered post '{slug}' → variant {variant}, composite={composite:.1f}")
    return composite


def evaluate_winner():
    """Evaluate A vs B and return winner info."""
    state = load_state()
    scores_a = state["variants"]["A"]["scores"]
    scores_b = state["variants"]["B"]["scores"]
    n = min(len(scores_a), len(scores_b))
    th = DEFAULT_THRESHOLDS

    if n < th["min_sample_size"]:
        return {
            "ready": False,
            "reason": f"Sample too small (n={n}, need {th['min_sample_size']})",
            "scores_a": scores_a,
            "scores_b": scores_b,
        }

    t_stat, p_val = welch_t_test(scores_a, scores_b)
    mean_a = sum(scores_a) / len(scores_a) if scores_a else 0
    mean_b = sum(scores_b) / len(scores_b) if scores_b else 0
    effect_size = abs(mean_b - mean_a) / max(mean_a, mean_b, 1)

    winner = None
    if p_val < th["confidence_p"] and effect_size >= th["min_effect_size"]:
        winner = "B" if mean_b > mean_a else "A"

    return {
        "ready": True,
        "winner": winner,
        "p_value": round(p_val, 4),
        "t_stat": round(t_stat, 3),
        "effect_size": round(effect_size, 3),
        "mean_a": round(mean_a, 2),
        "mean_b": round(mean_b, 2),
        "n_a": len(scores_a),
        "n_b": len(scores_b),
        "scores_a": scores_a,
        "scores_b": scores_b,
    }


def print_report():
    state = load_state()
    print("=" * 60)
    print("PROMPT HATCHING — STATE REPORT")
    print("=" * 60)
    for v in VARIANTS:
        posts = state["variants"][v]["posts"]
        scores = state["variants"][v]["scores"]
        print(f"\nVariant {v}: {len(posts)} posts")
        if posts:
            latest = posts[-1]
            print(f"  Latest: {latest['slug']} ({latest['timestamp'][:10]})")
            print(f"  Scores: {scores}")
            print(f"  Mean: {sum(scores)/len(scores):.1f}" if scores else "  Mean: N/A")
    print()
    result = evaluate_winner()
    print(f"Evaluation ready: {result['ready']}")
    if result["ready"]:
        if result["winner"]:
            print(f">>> WINNER: Variant {result['winner']} (p={result['p_value']}, effect={result['effect_size']})")
        else:
            print(f"No significant winner (p={result['p_value']}, effect={result['effect_size']})")
        print(f"  Mean A: {result['mean_a']} (n={result['n_a']})")
        print(f"  Mean B: {result['mean_b']} (n={result['n_b']})")
    else:
        print(f"  Reason: {result['reason']}")
    print("=" * 60)


def promote_winner():
    state = load_state()
    result = evaluate_winner()
    if not result["ready"]:
        print(f"Cannot promote: {result['reason']}")
        return
    if not result["winner"]:
        print("No winner to promote.")
        return
    new_control = result["winner"]
    state["current_control"] = new_control
    state["winner"] = new_control
    state["last_promoted"] = datetime.now().isoformat()
    save_state(state)
    print(f">>> PROMOTED: Variant {new_control} is now the new control.")
    print(f"    Mean A: {result['mean_a']} → Mean B: {result['mean_b']}")
    print(f"    p-value: {result['p_value']}, effect size: {result['effect_size']}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Prompt Hatching for DayByDay blog pipeline")
    parser.add_argument("--variant", choices=list(VARIANTS.keys()), help="Variant used (A or B)")
    parser.add_argument("--slug", help="Blog slug")
    parser.add_argument("--lh-perf", type=float, help="Lighthouse Performance score (0-100)")
    parser.add_argument("--lh-seo", type=float, help="Lighthouse SEO score (0-100)")
    parser.add_argument("--gsc-ctr", type=float, help="GSC CTR (%%, 0-100)")
    parser.add_argument("--gsc-position", type=float, help="GSC average position")
    parser.add_argument("--report", action="store_true", help="Print current state report")
    parser.add_argument("--promote", action="store_true", help="Promote winning variant as new control")
    args = parser.parse_args()

    if args.report:
        print_report()
    elif args.promote:
        promote_winner()
    elif args.variant and args.slug:
        # Auto-fetch GSC data if not provided
        gsc_ctr = args.gsc_ctr
        gsc_position = args.gsc_position
        if gsc_ctr is None or gsc_position is None:
            ctr, pos = fetch_gsc_metrics(args.slug)
            gsc_ctr = gsc_ctr if gsc_ctr is not None else ctr
            gsc_position = gsc_position if gsc_position is not None else pos
        register_post(
            variant=args.variant,
            slug=args.slug,
            lh_perf=args.lh_perf,
            lh_seo=args.lh_seo,
            gsc_ctr=gsc_ctr,
            gsc_position=gsc_position,
        )
    else:
        parser.print_help()
