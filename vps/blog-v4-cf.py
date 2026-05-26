#!/usr/bin/env python3
"""
DayByDay BLOG v4.0 - Cloudflare Pages (Robusto)
"""

import requests
import subprocess
import time
import sys
import re

API_KEY = "sk-cp-coe8mqQVc96sCuRUl3su_wFRaMr9lveb9hdg6D9ne4bJHRY-_l-HjYjU9mQwsr2eWVhYtlj86yC3f_m0XjfGGiiQGU4UZx17be_aoVnO7vpC-o3gWHXpL4w"
REPO_DIR = "/root/projects/DaybyDay"

CF_ACCOUNT_ID = "f07baa80011ef9da206ccbcbd33ca27a"
CF_API_TOKEN = "PLACEHOLDER_CF_API_TOKEN"
CF_PROJECT = "daybyday"

def log(msg):
    print("[%s] %s" % (time.strftime("%H:%M:%S"), msg))

def run(cmd, cwd=REPO_DIR):
    r = subprocess.run(cmd, shell=True, cwd=cwd, capture_output=True, text=True)
    return r.stdout.strip(), r.stderr.strip(), r.returncode

def call_llm(prompt):
    resp = requests.post(
        "https://api.minimax.io/v1/chat/completions",
        headers={"Authorization": "Bearer %s" % API_KEY, "Content-Type": "application/json"},
        json={
            "model": "MiniMax-M2.7",
            "messages": [{"role": "user", "content": prompt}],
            "max_tokens": 8000,
            "temperature": 0.1
        }
    )
    if resp.status_code != 200:
        raise Exception("API error: %s" % resp.text[:200])
    result = resp.json()
    return result.get("choices", [{}])[0].get("message", {}).get("content", "")

def generate(topic, slug):
    log("[TOPIC] %s" % topic)
    
    prompt = f"""Escríbeme UN ARTÍCULO COMPLETO de blog en ESPAÑOL sobre: {topic}

REGLAS:
1. NO pongas texto antes o después del código
2. NO incluyas ```jsx ni ```
3. El código debe empezar con: import React from 'react';
4. El código debe terminar con: export default [Nombre]Page;
5. Mínimo 1500 palabras de contenido real

Usa este formato EXACTO (reemplaza los datos):

import React from 'react';
import {{ Link }} from "react-router-dom";
import BlogPostLayout from "../../components/BlogPostLayout";

const faqs = [
  {{ q: "Pregunta 1?", a: "Respuesta 1." }},
  {{ q: "Pregunta 2?", a: "Respuesta 2." }},
  {{ q: "Pregunta 3?", a: "Respuesta 3." }}
];

const [Nombre]Page = ({{ openCalendly }}) => (
  <BlogPostLayout
    title="TÍTULO DEL ARTÍCULO"
    description="Descripción meta del artículo"
    slug="{slug}"
    datePublished="2026-05-23"
    readingTime="8 min"
    category="Meta Ads"
    faqs={{faqs}}
    openCalendly={{openCalendly}}
  >
    <section>
      <h2>Introducción</h2>
      <p>Párrafo de introducción...</p>
    </section>
    <section>
      <h2>Sección 1</h2>
      <p>Contenido...</p>
    </section>
    [Más secciones]
  </BlogPostLayout>
);

export default [Nombre]Page;

ARTÍCULO:"""

    content = call_llm(prompt)
    log("[RAW] %d chars" % len(content))
    
    # Clean markdown artifacts
    content = re.sub(r"^```jsx\s*", "", content, flags=re.MULTILINE)
    content = re.sub(r"```\s*$", "", content)
    content = re.sub(r"^```.*$", "", content, flags=re.MULTILINE)
    content = content.strip()
    
    return content

def save_page(content, slug):
    # Extract component name from file
    match = re.search(r'const (\w+)Page\s*=', content)
    if match:
        component_name = match.group(1)
    else:
        component_name = "BlogPage" + slug.replace("-", "").title()
    
    filename = component_name + ".jsx"
    path = "%s/src/pages/blog/%s" % (REPO_DIR, filename)
    
    with open(path, "w") as f:
        f.write(content)
    
    log("[SAVE] %s" % path)
    return path, component_name

def add_route(page_path, slug, component_name):
    import os
    app_jsx = "%s/src/App.jsx" % REPO_DIR
    
    with open(app_jsx, "r") as f:
        app = f.read()
    
    # Check if route already exists
    if 'path="/blog/%s"' % slug in app:
        log("[ROUTE] Already exists")
        return
    
    import_line = 'import %s from "./pages/blog/%s";' % (component_name, component_name)
    
    # Find last import from pages/blog
    pattern = r'(import \w+ from "\./pages/blog/[^"]+";)'
    matches = re.findall(pattern, app)
    if matches:
        last_import = matches[-1]
        app = app.replace(last_import, last_import + "\n" + import_line)
    else:
        # Add after gsap.registerPlugin
        app = app.replace("gsap.registerPlugin(ScrollTrigger, SplitText);", "gsap.registerPlugin(ScrollTrigger, SplitText);\n" + import_line)
    
    route_line = '<Route path="/blog/%s" element={<%s openCalendly={openCalendly} />} />' % (slug, component_name)
    app = app.replace("</Routes>", "      " + route_line + "\n      </Routes>")
    
    with open(app_jsx, "w") as f:
        f.write(app)
    
    log("[ROUTE] Added")

def deploy_cf():
    log("[DEPLOY] Cloudflare Pages...")
    
    resp = requests.post(
        "https://api.cloudflare.com/client/v4/accounts/%s/pages/projects/%s/deployments" % (CF_ACCOUNT_ID, CF_PROJECT),
        headers={"Authorization": "Bearer %s" % CF_API_TOKEN, "Content-Type": "application/json"},
        json={"branch": "main"}
    )
    
    if resp.status_code != 200:
        log("[ERROR] %s" % resp.text[:200])
        return None
    
    deploy_id = resp.json()["result"]["id"]
    log("[ID] %s" % deploy_id)
    
    for i in range(12):
        time.sleep(5)
        status = requests.get(
            "https://api.cloudflare.com/client/v4/accounts/%s/pages/projects/%s/deployments/%s" % (CF_ACCOUNT_ID, CF_PROJECT, deploy_id),
            headers={"Authorization": "Bearer %s" % CF_API_TOKEN}
        ).json()["result"]["latest_stage"]
        
        log("[%ds] %s: %s" % ((i+1)*5, status["name"], status["status"]))
        if status["status"] == "success":
            return resp.json()["result"]["url"]
    
    return None

def main(topic, slug):
    print("=" * 50)
    print("DayByDay BLOG v4.0 - Cloudflare")
    print("=" * 50)
    
    content = generate(topic, slug)
    page_path, component_name = save_page(content, slug)
    add_route(page_path, slug, component_name)
    
    # Build locally first to catch errors
    log("[BUILD] Local build...")
    out, err, code = run("npm run build", REPO_DIR)
    if code != 0:
        log("[ERROR] Build failed: %s" % err[-500:])
        return
    
    # Commit and push
    run("git add -A && git commit -m 'blog: %s' --no-verify" % slug, REPO_DIR)
    run("git push origin main", REPO_DIR)
    
    # Deploy to Cloudflare
    url = deploy_cf()
    
    print("=" * 50)
    if url:
        log("OK: %s" % url)
        log("BLOG: %s/blog/%s" % (url, slug))
    else:
        log("ERROR: Deploy failed")
    print("=" * 50)

if __name__ == "__main__":
    topic = sys.argv[1] if len(sys.argv) > 1 else "estrategia meta ads"
    slug = sys.argv[2] if len(sys.argv) > 2 else "estrategia-meta-ads-" + time.strftime("%Y%m%d")
    main(topic, slug)