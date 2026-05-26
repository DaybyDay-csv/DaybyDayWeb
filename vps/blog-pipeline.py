#!/usr/bin/env python3
"""
DayByDay BLOG PIPELINE v1.0 - Research + Write + Deploy
Full system: Research → Content Brief → Blog Post → Cloudflare
"""

import requests
import subprocess
import time
import re
import sys
import os

API_KEY = "sk-cp-coe8mqQVc96sCuRUl3su_wFRaMr9lveb9hdg6D9ne4bJHRY-_l-HjYjU9mQwsr2eWVhYtlj86yC3f_m0XjfGGiiQGU4UZx17be_aoVnO7vpC-o3gWHXpL4w"
MODEL = "MiniMax-M2.5"
REPO_DIR = "/root/projects/DaybyDay"
CF_ACCOUNT = "f07baa80011ef9da206ccbcbd33ca27a"
CF_TOKEN = "PLACEHOLDER_CF_TOKEN2"

def log(msg):
    print("[%s] %s" % (time.strftime("%H:%M:%S"), msg))

def clean_blog_content(content):
    """Remove LLM thinking tokens from generated blog content"""
    # Remove thinking blocks: blocks starting with (and containing reasoning
    content = re.sub(r"\n*<think>.*?</think>", "", content, flags=re.DOTALL)
    # Remove numbered instructions that leaked into output
    content = re.sub(r"\n\d+\.\s+Include necessary imports.*?(?=\nimport)", "\n", content)
    content = re.sub(r"\n\d+\.\s+(?:Use|Before|Ends).*?(?=\nimport)", "\n", content)
    # Remove standalone numbered lists at the start
    content = re.sub(r"^1\.\s+.{10,100}\n?", "", content, flags=re.MULTILINE)
    content = re.sub(r"^\d+\.\s+.{10,100}\n?", "", content, flags=re.MULTILINE)
    # Find the actual import statement and keep everything from there
    match = re.search(r"import React from ['\"]react['\"]", content)
    if match:
        content = content[match.start():]
    return content

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

def run(cmd, cwd=REPO_DIR):
    r = subprocess.run(cmd, shell=True, cwd=cwd, capture_output=True, text=True)
    return r.stdout.strip(), r.stderr.strip(), r.returncode

# ============ RESEARCH PHASE ============

def research_topic(topic):
    log("[RESEARCH] Starting research for: %s" % topic)
    
    # Questions people ask
    log("[1/3] Analyzing questions people ask...")
    questions_prompt = f"""Genera 20 preguntas que la gente REALMENTE pregunta sobre: {topic}

Formato: una pregunta por linea, sin bullets ni numeros.
Incluye: como, porque, cuanto, cuando, donde, que, vs"""
    questions = call_llm(questions_prompt, max_tokens=1500)
    
    # Competitor analysis
    log("[2/3] Analyzing competitors for gaps...")
    competitors_prompt = f"""Analiza como las principales agencias de marketing D2C y growth posicionan contenidos sobre: {topic}

Agencias a revisar: Growth Partners, LP Agency, Clerk, Outbound, Agencia Paid Media

Para cada una detecta:
- ANGULO: Como posicionan el tema
- HUECO: Donde NO-cover bien

Analiza el topico: {topic}

Devuelve:
- Angulos ya cogidos por competidores
- 3 HUECOS donde podemos posicionarnos
- Preguntas que NINGUN competidor responde bien"""
    competitors = call_llm(competitors_prompt, max_tokens=2000)
    
    # Authority links
    log("[3/3] Finding authority links to cite...")
    links_prompt = f"""Busca 5-7 fuentes de AUTORIDAD para citar en un blog sobre: {topic}

Fuentes validas:
- Documentacion oficial: Meta Business Help Center, Google Ads, Shopify
- Estudios: Deloitte, McKinsey, eMarketer, Statista, HBR
- Blogs tecnicos de alto nivel

Formato por enlace:
[Nombre](URL) - Motivo por el que es buena fuente para citar

NO enlaces de blogs de agencias."""
    links = call_llm(links_prompt, max_tokens=2000)
    
    # Content brief
    brief_prompt = f"""Eres content strategist para DayByDay Consulting - agencia paid media D2C España.

TOPICO: {topic}

RESEARCH:

Preguntas que la gente hace:
{questions}

ANALISIS DE COMPETIDORES:
{competitors}

ENLACES DE AUTORIDAD:
{links}

Genera un CONTENT BRIEF completo:

## Titulo (H1)
## Meta Description (max 155 chars)
## Slug
## Angulo unico (diferenciador)
## 5 preguntas clave que responder
## Estructura (H2 + H3 bullets)
## Enlaces autoridad a citar (formato: [Text](URL))
## Keywords target
## CTAs

El tono: directo, sin marketing vacio, datos reales."""
    
    brief = call_llm(brief_prompt, max_tokens=4000)
    
    log("[RESEARCH] Done")
    return brief, links

# ============ WRITE PHASE ============

def extract_from_brief(brief, section):
    """Extract a section from the brief"""
    pattern = r"##?\s*" + section + r"\s*\n(.*?)(?=\n##|\n$)"
    match = re.search(pattern, brief, re.IGNORECASE | re.DOTALL)
    if match:
        return match.group(1).strip()
    return ""

def write_blog_post(topic, brief, authority_links):
    log("[WRITE] Generating blog post...")
    
    # Extract from brief
    title = extract_from_brief(brief, "Titulo")
    description = extract_from_brief(brief, "Meta Description")
    slug = extract_from_brief(brief, "Slug")
    angle = extract_from_brief(brief, "Angulo")
    questions = extract_from_brief(brief, "preguntas clave|preguntas que")
    structure = extract_from_brief(brief, "Estructura")
    keywords = extract_from_brief(brief, "Keywords")
    
    # FAQs
    faqs_prompt = f"""Topico: {topic}
Preguntas clave:
{questions}

Convierte las preguntas en 4 FAQs con respuestas sustanciales (2-3 sentences cada una).
Formato JSON array:
[
  {{"q": "...", "a": "..."}},
  {{"q": "...", "a": "..."}}
]"""
    faqs_result = call_llm(faqs_prompt, max_tokens=1500)
    
    # Blog content
    content_prompt = f"""Eres Pablo Santirsó - founder de DayByDay Consulting.

Llevo 15 años en Deep Dive Marketing-specializado en acompañar a negocios D2C España a reencuadrar su propuesta de valor, capitalizar su potencial y maximizar impacto. Trabajo con herramientas de posicionamiento técnico pagado y sistemas de nurturing y automatizacion con AI (con Jorge, mi socio CTO).

Lo que me define: me siento con fundadores a entender su vision y les ayudo a implementarla aportando creatividad, orden y sistematizacion. Mi motivacion es liberar tiempo para que puedan seguir trabajando en su vision y servicio al mundo - porque eso es lo que un emprendedor nace y necesita.

TOPICO: {topic}

ANGLE: {angle}

ESTRUCTURA:
{structure}

ENLACES AUTORIDAD A CITAR:
{authority_links}

Escribe el BLOG POST completo en español, EN PRIMERA PERSONA plural ("nosotros", "nuestro") como si hablaras directamente con el fundador/cliente.

REGLAS ANTI-AI (MUY IMPORTANTE):
- NO uses frases como: "explora", "sumergite", "imagina", "descubre el poder de"
- NO listas vacías de 3-4 bullets sin contenido real
- NO buzzwords marketing vacios: "libera tu potencial", "transforma tu negocio"
- NO introducciones tipo "En el panorama competitivo de..."
- NO finales forzados tipo "¿Listo para empezar?"

REGLAS TECNICAS:
1. Empieza con: import React from 'react';
2. NO pongas texto antes o después del código JSX
3. NO inclusas ```jsx ni ```
4. Incluye TODOS los imports necesarios:
   - import {{ Link }} from "react-router-dom";
   - import BlogPostLayout from "../../components/BlogPostLayout";
5. Props de BlogPostLayout:
   - title="..."
   - description="..."
   - slug="..."
   - datePublished="YYYY-MM-DD"
   - readingTime="X min"
   - category="Meta Ads"
   - faqs={{ [...] }}
6. Usa <Link to="/blog/..."> para interlinking
7. Usa <a href="..." target="_blank" rel="noopener"> para enlaces externos
8. Contenido MÍNIMO 1500 palabras reales
9. Estructura: h2 secciones principales, h3 subsecciones
10. Cada sección 3-5 párrafos sustanciales
11. Interlinking a otros blogs DayByDay relevantes
12. CTAs naturales, no forzados
13. Código termina con: export default [Nombre]Page;"""
    
    content = call_llm(content_prompt, max_tokens=10000)
    
    # CRITICAL: Clean LLM thinking tokens from output
    content = clean_blog_content(content)
    
    # Component name
    name = re.sub(r'[^a-zA-Z0-9]+', '', topic.title().replace(" ", ""))
    if len(name) > 30:
        name = name[:30]
    component_name = name + "Page"
    
    log("[WRITE] Generated: %s" % component_name)
    
    return content, component_name, slug

# ============ DEPLOY PHASE ============

def add_to_app(slug, component_name):
    log("[DEPLOY] Adding route to App.jsx...")
    
    # Check if already exists
    out, _, _ = run("grep -c '%s' src/App.jsx" % slug)
    if out and int(out) > 0:
        log("[DEPLOY] Route already exists")
        return False
    
    # Add import
    import_line = "import %s from \"./pages/blog/%s\";" % (component_name, component_name)
    
    app_jsx = "%s/src/App.jsx" % REPO_DIR
    with open(app_jsx, "r") as f:
        app = f.read()
    
    # Add import
    if import_line not in app:
        pattern = r"(import.*from.*blog.*Page.*\n)"
        match = re.search(pattern, app)
        if match:
            app = app.replace(match.group(0), match.group(0) + import_line + "\n")
    
    # Add route - FIXED QUOTING
    quote = '"'
    route_line = '<Route path="/blog/' + slug + quote + ' element={' + component_name + ' openCalendly={openCalendly} />} />'
    if route_line not in app:
        app = app.replace('<Route path="*" element={<NotFoundPage />} />', route_line + "\n        " + '<Route path="*" element={<NotFoundPage />} />')
    
    with open(app_jsx, "w") as f:
        f.write(app)
    
    return True

def add_to_listing(slug, title, excerpt, category, date, reading_time):
    log("[DEPLOY] Adding to BlogPage.jsx listing...")
    
    blog_page = "%s/src/pages/BlogPage.jsx" % REPO_DIR
    
    entry = "  {\n    slug: \"" + slug + "\",\n    title: \"" + title + "\",\n    excerpt: \"" + excerpt + "\",\n    category: \"" + category + "\",\n    date: \"" + date + "\",\n    readingTime: \"" + reading_time + "\",\n  },\n"
    
    with open(blog_page, "r") as f:
        content = f.read()
    
    if 'slug: "%s"' % slug in content:
        log("[DEPLOY] Already in listing")
        return False
    
    marker = "// HERMES_POSTS_START"
    if marker in content:
        content = content.replace(marker, marker + "\n" + entry)
        with open(blog_page, "w") as f:
            f.write(content)
    
    return True

def deploy_to_cloudflare():
    log("[DEPLOY] Building and deploying to Cloudflare...")
    
    # Build
    out, err, code = run("npm run build")
    if code != 0:
        log("[DEPLOY] Build failed: %s" % err[:200])
        return False
    
    # Zip dist
    run("cd dist && rm -f /tmp/blog-deploy.zip && zip -r /tmp/blog-deploy.zip . -x '*.hermes-bak'")
    
    # Deploy
    result = subprocess.run([
        "curl", "-s", "-X", "POST",
        "-H", "Authorization: Bearer PLACEHOLDER
        "-H", "Content-Type: application/zip",
        "--data-binary", "@/tmp/blog-deploy.zip",
        "https://api.cloudflare.com/client/v4/accounts/%s/pages/projects/daybyday/deployments" % CF_ACCOUNT
    ], capture_output=True, text=True)
    
    import json
    try:
        data = json.loads(result.stdout)
        deploy_id = data.get("result", {}).get("id", "")
        url = data.get("result", {}).get("url", "")
        log("[DEPLOY] Deployment ID: %s" % deploy_id)
        log("[DEPLOY] URL: %s" % url)
        return url
    except:
        log("[DEPLOY] Deploy response: %s" % result.stdout[:200])
        return None

def verify_deploy(url, slug, timeout=90):
    log("[VERIFY] Checking deploy...")
    
    for i in range(timeout // 10):
        time.sleep(10)
        result = subprocess.run([
            "curl", "-s", "-I",
            "%s/blog/%s" % (url, slug)
        ], capture_output=True, text=True)
        
        if "HTTP/2 200" in result.stdout:
            log("[VERIFY] SUCCESS: %s/blog/%s" % (url, slug))
            return True
        
        log("[VERIFY] Waiting... (%d)" % (i * 10))
    
    log("[VERIFY] Timeout")
    return False

# ============ MAIN ============

def send_telegram_full(topic, brief, deploy_url, slug):
    log("[NOTIFY] Sending Telegram notification...")
    try:
        import urllib.request
        import json
        
        angle = extract_from_brief(brief, "Angulo")
        links_section = extract_from_brief(brief, "enlaces.*autoridad|ENLACES AUTORIDAD|Enlaces autoridad")
        questions = extract_from_brief(brief, "preguntas clave")
        
        msg_parts = [
            "*NUEVO BLOG: " + topic + "*",
            "",
            "*ANGULO (Gap):*",
            (angle[:300] if angle else "Ver brief"),
            "",
            "*PREGUNTAS CUBIERTAS:*",
            (questions[:400] if questions else "Ver brief"),
            "",
            "*ENLACES AUTORIDAD:*",
            (links_section[:600] if links_section else "Ver brief"),
            "",
            "*URL:* " + deploy_url + "/blog/" + slug
        ]
        msg = "\n".join(msg_parts)
        
        data = json.dumps({"chat_id": "5472173497", "text": msg, "parse_mode": "Markdown"}).encode()
        req = urllib.request.Request(
            "https://api.telegram.org/bot8836576649:sendMessage",
            data=data,
            headers={"Content-Type": "application/json"}
        )
        urllib.request.urlopen(req)
        log("[NOTIFY] Telegram sent successfully")
    except Exception as e:
        log("[NOTIFY] Telegram failed: " + str(e))

def main():
    if len(sys.argv) < 2:
        print("Usage: python3 blog-pipeline.py '<topic>'")
        print("Example: python3 blog-pipeline.py 'meta ads ecommerce 2026'")
        sys.exit(1)
    
    topic = sys.argv[1]
    log("[START] Pipeline for: %s" % topic)
    
    # Phase 1: Research
    brief, links = research_topic(topic)
    
    # Save brief
    slug = re.sub(r'[^a-z0-9]+', '-', topic.lower()).strip('-')
    os.makedirs("/root/blog-briefs", exist_ok=True)
    with open("/root/blog-briefs/%s-brief.md" % slug, "w") as f:
        f.write("# Content Brief: %s\n\n%s\n\n---\nGenerated: %s" % (topic, brief, time.strftime("%Y-%m-%d %H:%M")))
    
    print("\n" + "="*60)
    print("BRIEF SAVED")
    print("="*60)
    print(brief[:2000])
    print("="*60)
    
    # Phase 2: Write
    content, component_name, blog_slug = write_blog_post(topic, brief, links)
    
    # Save blog file
 # Save blog file
    blog_file = "%s/src/pages/blog/%s.jsx" % (REPO_DIR, component_name)
    with open(blog_file, "w") as f:
        f.write(content)
    
    log("[WRITE] Saved: %s" % blog_file)
    
    # Phase 3: Deploy
    if add_to_app(blog_slug, component_name):
        log("[DEPLOY] Route added")
    
    # Extract from brief for listing
    title_full = extract_from_brief(brief, "Titulo")
    description_brief = extract_from_brief(brief, "Meta Description")
    reading = "12 min"
    
    if add_to_listing(blog_slug, title_full[:80], description_brief[:160], "Meta Ads", time.strftime("%d %b %Y"), reading):
        log("[DEPLOY] Added to listing")
    
    deploy_url = deploy_to_cloudflare()
    
    if deploy_url:
        verify_deploy(deploy_url, blog_slug)
        send_telegram_full(topic, brief, deploy_url, blog_slug)
    
    log("[DONE] Pipeline complete!")

if __name__ == "__main__":
    main()