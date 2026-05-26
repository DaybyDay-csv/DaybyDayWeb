#!/usr/bin/env python3
"""
DayByDay BLOG v3.0 - Cloudflare Pages
Generates blog posts and deploys to Cloudflare (unlimited builds)
"""

import requests
import subprocess
import time
import sys
import re

API_KEY = "sk-cp-coe8mqQVc96sCuRUl3su_wFRaMr9lveb9hdg6D9ne4bJHRY-_l-HjYjU9mQwsr2eWVhYtlj86yC3f_m0XjfGGiiQGU4UZx17be_aoVnO7vpC-o3gWHXpL4w"
MODEL = "MiniMax-M2.7"
REPO_DIR = "/root/projects/DaybyDay"

# Cloudflare
CF_ACCOUNT_ID = "f07baa80011ef9da206ccbcbd33ca27a"
CF_API_TOKEN = "PLACEHOLDER_CF_API_TOKEN"
CF_PROJECT = "daybyday"
CF_URL = "https://daybyday-bg5.pages.dev"

def log(msg):
    print("[%s] %s" % (time.strftime("%H:%M:%S"), msg))

def run(cmd, cwd=REPO_DIR):
    r = subprocess.run(cmd, shell=True, cwd=cwd, capture_output=True, text=True)
    return r.stdout.strip(), r.stderr.strip(), r.returncode

def call_llm(prompt, max_tokens=8000):
    resp = requests.post(
        "https://api.minimax.io/v1/chat/completions",
        headers={"Authorization": "Bearer %s" % API_KEY, "Content-Type": "application/json"},
        json={
            "model": MODEL,
            "messages": [{"role": "user", "content": prompt}],
            "max_tokens": max_tokens,
            "temperature": 0.1
        }
    )
    if resp.status_code != 200:
        raise Exception("API error: %s" % resp.text[:200])
    result = resp.json()
    content = result.get("choices", [{}])[0].get("message", {}).get("content", "")
    content = re.sub(r"", "", content)
    return content

def get_links():
    out, _, _ = run("ls %s/src/pages/blog/*.jsx 2>/dev/null | xargs -n1 basename | sed 's/Page.jsx//' | head -5" % REPO_DIR)
    if not out:
        return "que-es-roas-meta-ads"
    return ",".join([p.strip() for p in out.split("\n")[:5]])

def generate(topic, slug):
    log("[TOPIC] %s" % topic)
    
    links = get_links()
    
    prompt = f"""Escríbeme un artículo de blog completo en ESPAÑOL para la temática: {topic}

REGLAS ESTRICTAS:
- NO incluyas texto de introducción como "Aquí tienes el artículo" o similares
- NO incluyas marcadores de pensamiento como "" o "MiniMax thinking"
- El contenido debe empezar DIRECTAMENTE con el código JSX
- Máxima calidad profesional
- Mínimo 1500 palabras

FORMATO DE RESPUESTA:
```jsx
import React from 'react';
import {{ Link }} from "react-router-dom";
import BlogPostLayout from "../../components/BlogPostLayout";

const faqs = [
  {{ q: "...", a: "..." }},
  // 3 FAQs
];

const [Nombre]Page = ({{ openCalendly }}) => (
  <BlogPostLayout
    title="TÍTULO COMPLETO"
    description="Descripción meta"
    slug="{slug}"
    datePublished="2026-05-23"
    readingTime="8 min"
    category="Meta Ads"
    faqs={{faqs}}
    openCalendly={{openCalendly}}
  >
    <section>
      <h2>Introducción</h2>
      <p>Contenido...</p>
    </section>
    // Más secciones
  </BlogPostLayout>
);

export default [Nombre]Page;
```

ARTÍCULOS RELACIONADOS PARA ENLAZAR: {links}

ESCRIBE EL ARTÍCULO COMPLETO AHORA:"""

    content = call_llm(prompt, max_tokens=8000)
    log("[CONTENT] %d chars" % len(content))
    return content

def save_page(content, slug):
    path = "%s/src/pages/blog/%sPage.jsx" % (REPO_DIR, slug.replace("-", "").title().replace(" ", ""))
    path = path.replace("'", "")
    
    jsx = content
    for pattern in [r"^.*```jsx\s*", r"```jsx?\s*$", r"^.*import React from 'react'"]:
        jsx = re.sub(pattern, "", jsx, flags=re.MULTILINE).strip()
    
    with open(path, "w") as f:
        f.write(jsx)
    
    log("[SAVE] %s" % path)
    return path

def add_route(slug, component_name):
    import os
    page_file = "%s/src/pages/blog/%s" % (REPO_DIR, slug)
    for ext in ["Page.jsx", "-Page.jsx", "page.jsx"]:
        if os.path.exists(page_file + ext):
            page_file = page_file + ext
            break
    
    app_jsx = "%s/src/App.jsx" % REPO_DIR
    with open(app_jsx, "r") as f:
        app = f.read()
    
    import_line = 'import %s from "./pages/blog/%s";' % (component_name, slug.replace("-", "").title().replace(" ", "") + "Page")
    if import_line not in app:
        app = app.replace(
            'import RemarketingMetaAdsPage from "./pages/blog/estrategia-remarketing-meta-2026Page";',
            'import RemarketingMetaAdsPage from "./pages/blog/estrategia-remarketing-meta-2026Page";\n' + import_line
        )
    
    route_line = '<Route path="/blog/%s" element={<%s openCalendly={{openCalendly}} />} />' % (slug, component_name)
    if route_line not in app:
        app = app.replace(
            '<Route path="/blog/estrategia-remarketing-meta-2026"',
            route_line + '\n        <Route path="/blog/estrategia-remarketing-meta-2026"'
        )
    
    with open(app_jsx, "w") as f:
        f.write(app)
    
    blog_list = "%s/src/pages/BlogPage.jsx" % REPO_DIR
    with open(blog_list, "r") as f:
        listing = f.read()
    
    new_entry = '''  {{
    slug: "{slug}",
    title: "{topic}",
    excerpt: "Artículo completo sobre {topic}.",
    category: "Meta Ads",
    date: "23 may 2026",
    readingTime: "8 min",
  }},
        // HERMES_POSTS_START'''.format(slug=slug, topic=topic)
    
    if new_entry not in listing:
        listing = listing.replace("// HERMES_POSTS_START", new_entry)
        with open(blog_list, "w") as f:
            f.write(listing)
    
    log("[ROUTE] Added to App.jsx and BlogPage.jsx")

def deploy_cf():
    log("[DEPLOY] Triggering Cloudflare Pages...")
    
    resp = requests.post(
        "https://api.cloudflare.com/client/v4/accounts/%s/pages/projects/%s/deployments" % (CF_ACCOUNT_ID, CF_PROJECT),
        headers={"Authorization": "Bearer %s" % CF_API_TOKEN, "Content-Type": "application/json"},
        json={"branch": "main"}
    )
    
    if resp.status_code != 200:
        log("[ERROR] Deploy failed: %s" % resp.text[:200])
        return None
    
    data = resp.json()
    deploy_id = data["result"]["id"]
    log("[DEPLOY] ID: %s" % deploy_id)
    
    log("[WAIT] Cloudflare build (~60s)...")
    for i in range(12):
        time.sleep(5)
        status_resp = requests.get(
            "https://api.cloudflare.com/client/v4/accounts/%s/pages/projects/%s/deployments/%s" % (CF_ACCOUNT_ID, CF_PROJECT, deploy_id),
            headers={"Authorization": "Bearer %s" % CF_API_TOKEN}
        )
        if status_resp.status_code == 200:
            stage = status_resp.json()["result"]["latest_stage"]
            log("[%ds] %s: %s" % ((i+1)*5, stage["name"], stage["status"]))
            if stage["status"] == "success":
                return data["result"]["url"]
    
    return None

def main(topic, slug):
    print("=" * 50)
    print("DayByDay BLOG v3.0 - Cloudflare Pages")
    print("=" * 50)
    
    content = generate(topic, slug)
    page_path = save_page(content, slug)
    add_route(slug, "NuevoBlog")
    
    run("cd %s && git add -A && git commit -m 'blog: %s' --no-verify" % (REPO_DIR, slug))
    run("cd %s && git push origin main" % REPO_DIR)
    
    url = deploy_cf()
    
    print("=" * 50)
    if url:
        print("OK:", url)
        print("BLOG:", url + "/blog/" + slug)
    else:
        print("ERROR: Deploy failed")
    print("=" * 50)

if __name__ == "__main__":
    topic = sys.argv[1] if len(sys.argv) > 1 else "estrategia meta ads"
    slug = sys.argv[2] if len(sys.argv) > 2 else "estrategia-meta-ads-" + time.strftime("%Y%m%d")
    main(topic, slug)