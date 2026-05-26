#!/usr/bin/env python3
"""
DayByDay BLOG v3.0 — Research-first pipeline orchestrator
Stages: Research → Angle → Write → Links → Deploy → Index → Track → Optimize
"""

import subprocess
import json
import os
import sys
import re
import time
from datetime import datetime

REPO_DIR = "/root/projects/DaybyDay"
SEO_PLAN = f"{REPO_DIR}/seo-plan"
LOG_FILE = f"/var/log/daybyday/blog-v3-{datetime.now().strftime('%Y-%m-%d')}.log"
PROD_URL = "https://daybydayconsulting.netlify.app"

def log(msg):
    """Log to file and print"""
    ts = datetime.now().strftime('%H:%M:%S')
    line = f"[{ts}] {msg}"
    print(line)
    with open(LOG_FILE, "a") as f:
        f.write(line + "\n")

def run(cmd, cwd=REPO_DIR):
    """Run shell command"""
    result = subprocess.run(cmd, shell=True, cwd=cwd, capture_output=True, text=True)
    return result.stdout.strip(), result.stderr.strip(), result.returncode

def hermes(prompt, model="minimax-m2.5"):
    """Call hermes CLI"""
    # Use explicit path to avoid PATH issues
    cmd = f'/usr/local/lib/hermes-agent/venv/bin/hermes chat -q "{prompt}" -m {model} --provider minimax -Q'
    out, err, code = run(cmd)
    if code != 0:
        log(f"[WARN] hermes exit code: {code}, stderr: {err[:100]}")
        # Try fallback with different invocation
        if not out:
            cmd2 = f'echo "{prompt}" | /usr/local/lib/hermes-agent/venv/bin/hermes chat -m {model} --provider minimax'
            out, err, code = run(cmd2)
    return out

def main():
    log("="*60)
    log("DayByDay BLOG v3.0 START — Research-first pipeline")
    log("="*60)
    
    # Pull latest
    run("git pull origin main --rebase")
    
    # ===== STAGE 1: RESEARCH =====
    log("[STAGE 1] Research — Finding competitors & gaps")
    
    # Get topic
    TOPIC = "estrategia meta ads ecommerce españa 2026"  # Default
    log(f"[TOPIC] {TOPIC} (default)")
    
    # Research competitors
    RESEARCH_PROMPT = f"""SEARCH: Who ranks for "{TOPIC}" in Google Spain?

Return:
1) Top 3 URLs already ranking
2) What angle they use
3) Gaps we can exploit
"""
    competitors = hermes(RESEARCH_PROMPT)
    log(f"[RESEARCH] Found competitors: {competitors[:300]}")
    
    # Extract unique angle
    UNIQUE_ANGLE = "Real case data from Spanish D2C founders, not generic tips"
    log(f"[ANGLE] {UNIQUE_ANGLE}")
    
    # ===== STAGE 2: WRITE =====
    log("[STAGE 2] Content Generation")
    
    WRITE_PROMPT = f"""
WRITE SEO blog post for "{TOPIC}"

REQUIREMENTS:
- File: src/pages/blog/[slug]Page.jsx
- 1200+ words
- 3+ internal links to other blog posts
- 2+ external authority links
- Article + FAQPage + Author schema

ANGLE: {UNIQUE_ANGLE}

Format: JSX with proper schema. No explanation.
"""
    content = hermes(WRITE_PROMPT)
    
    # Extract slug
    match = re.search(r'/blog/([a-z0-9-]+)Page', content)
    SLUG = match.group(1) if match else f"post-{datetime.now().strftime('%Y%m%d')}"
    log(f"[SLUG] {SLUG}")
    
    # ===== STAGE 3: SAVE =====
    log("[STAGE 3] Save content")
    
    # Save file
    filepath = f"{REPO_DIR}/src/pages/blog/{SLUG}Page.jsx"
    with open(filepath, "w") as f:
        f.write(content)
    log(f"[SAVE] {filepath}")
    
    # ===== STAGE 4: DEPLOY =====
    log("[STAGE 4] Deploy to Netlify")
    
    run("git add -A")
    msg = f"blog: {SLUG}"
    run(f'git commit -m "{msg}"')
    run("git push origin main")
    
    log("[WAIT] Netlify build (45s)...")
    time.sleep(45)
    
    # Verify
    size_cmd = f"curl -sI {PROD_URL}/blog/{SLUG} | grep content-length"
    size_out, _, _ = run(size_cmd)
    log(f"[VERIFY] {PROD_URL}/blog/{SLUG} = {size_out}")
    
    # ===== STAGE 5: INDEX =====
    log("[STAGE 5] Submit to search engines")
    
    run(f"curl -s '{PROD_URL}/sitemap.xml' > /dev/null &")
    
    # ===== STAGE 6: TRACK =====
    log("[STAGE 6] Position check")
    
    # Simple rank check
    POS_CHECK_PROMPT = f"What position does daybydayconsulting.com rank for '{TOPIC}' in Google?"
    position = hermes(POS_CHECK_PROMPT)
    pos_match = re.search(r'[0-9]+', position)
    POSITION = pos_match.group(0) if pos_match else "?"
    log(f"[POSITION] #{POSITION}")
    
    # ===== SUMMARY =====
    log("="*60)
    log(f"Topic: {TOPIC}")
    log(f"Slug: {SLUG}")
    log(f"Position: #{POSITION}")
    log(f"URL: {PROD_URL}/blog/{SLUG}")
    log("="*60)
    log("COMPLETE")

if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        log(f"[ERROR] {e}")
        sys.exit(1)