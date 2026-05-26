#!/usr/bin/env python3
"""
Blog Pipeline - MiniMax M2.5 Direct API
Uso: python3 blog-generate.py "<topic>" "<slug>" [categoria]
"""
import sys, json, subprocess, re, os, datetime
from pathlib import Path

API_KEY = open("/root/.env").read().split('MINIMAX_API_KEY=')[1].split('\n')[0].strip('" \n')
PROJECT_DIR = Path("/root/projects/DaybyDay")

def api_call(prompt, max_tokens=3500):
    import urllib.request, urllib.error
    payload = json.dumps({
        "model": "MiniMax-M2.5",
        "max_tokens": max_tokens,
        "temperature": 0.7,
        "messages": [
            {"role": "system", "content": "Eres copywriter SEO experto para ecommerce D2C español. Tono directo, sin corporativismo."},
            {"role": "user", "content": prompt}
        ]
    }).encode()
    req = urllib.request.Request(
        "https://api.minimax.io/v1/chat/completions",
        data=payload,
        headers={"Authorization": "Bearer " + API_KEY, "Content-Type": "application/json"},
        method="POST"
    )
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            data = json.loads(r.read())
            content = data["choices"][0]["message"]["content"]
            content = re.sub(r'<think>.*?</think>', '', content, flags=re.DOTALL)
            return content
    except urllib.error.HTTPError as e:
        body = e.read().decode()
        print("API ERROR " + str(e.code) + ": " + body[:500], file=sys.stderr)
        sys.exit(1)

def slug_to_pagename(slug):
    return ''.join(p.capitalize() for p in slug.split('-'))

def verify_links(links):
    missing = []
    for link in links:
        slug = link['slug']
        name_candidate = slug.replace('-', '').title() + 'Page.jsx'
        page_file = PROJECT_DIR / "src" / "pages" / "blog" / name_candidate
        if not page_file.exists():
            sitemap = (PROJECT_DIR / "public" / "sitemap.xml").read_text()
            if ("/blog/" + slug) not in sitemap:
                missing.append(slug)
    return missing

def generate_blog_content(topic, slug, category):
    existing = [
        "que-es-roas-meta-ads", "meta-ads-vs-google-ads", "como-reducir-cpa-ecommerce",
        "estrategias-puja-meta-ads", "escalar-meta-ads", "ugc-meta-ads",
        "remarketing-dinamico-ecommerce-guia-practica", "audiencias-lookalike-meta-alta-calidad",
        "ab-testing-meta-ads-que-testar-primero", "creative-testing-meta-ads",
        "automatizaciones-reglas-meta-ads-manager", "cro-landing-page-meta-ads-d2c",
        "metricas-meta-ads-importantes-ecommerce", "server-side-tracking-shopify-conversions-api"
    ]
    prompt = (
        "Genera contenido para post SEO. Tema: " + topic + "\n"
        "REGLAS: sin > ni < ni entidades HTML. Minimo 900 palabras. "
        "Solo texto espanol, sin codigo.\n"
        "7 secciones H2 de minimo 120 palabras. 5 FAQs de minimo 80 palabras.\n"
        "Incluir 3-5 enlaces internos: " + " ".join(existing) + "\n"
        "Un enlace externo a developers.facebook.com o shopify.com/docs\n"
        "Formato enlaces internos: [texto](/blog/SLUG)\n"
        "Formato enlace externo: [texto](https://...)\n"
    )
    content = api_call(prompt)
    if not content or len(content) < 500:
        print("ERROR: Contenido vacio", file=sys.stderr)
        sys.exit(1)
    return content

def parse_content(content):
    lines = content.split('\n')
    sections = []
    current = {"title": "Introduccion", "content": ""}
    faqs = []
    in_faq = False
    faq_buf = {"q": "", "a": ""}

    for line in lines:
        line = line.strip()
        if not line or line.startswith('---'):
            continue
        if line.startswith('## '):
            if current["content"]:
                sections.append(current)
            title = re.sub(r'^\d+\.\s*', '', line[3:].strip())
            title = re.sub(r'^Error\s+\d+:\s*', '', title, flags=re.IGNORECASE)
            current = {"title": title, "content": ""}
        elif line.startswith('### ') or (in_faq and line and not line.startswith('##')):
            if in_faq and faq_buf["q"]:
                faqs.append(faq_buf)
                faq_buf = {"q": "", "a": ""}
            in_faq = True
            clean_q = line.lstrip('#').strip()
            faq_buf["q"] = clean_q
        elif in_faq:
            if faq_buf["a"]:
                faq_buf["a"] += " " + line
            else:
                faq_buf["a"] = line
        elif current["content"]:
            current["content"] += " " + line
        else:
            current["content"] = line

    if current["content"]:
        sections.append(current)
    if faq_buf["q"]:
        faqs.append(faq_buf)

    title_match = re.search(r'^#\s+(.+)$', content, re.MULTILINE)
    title = title_match.group(1).strip() if title_match else "Post"
    desc_match = re.search(r'^#\s+.+\n\n+(.{100,200}?)(?:\n|$)', content, re.MULTILINE)
    description = desc_match.group(1).strip() if desc_match else title[:160]

    internal_links = re.findall(r'\[([^\]]+)\]\(/blog/([^)]+)\)', content)
    seen = set()
    unique_links = []
    for text, s in internal_links:
        if s not in seen:
            seen.add(s)
            unique_links.append({"text": text, "slug": s})

    external_links = []
    for m in re.finditer(r'\[([^\]]+)\]\((https?://[^)]+)\)', content):
        if m.group(2).startswith('http'):
            external_links.append({"text": m.group(1), "url": m.group(2)})

    return {
        "title": title,
        "description": description[:155] + "...",
        "sections": sections[:7],
        "faqs": [{"q": f["q"], "a": f["a"][:400]} for f in faqs[:5]],
        "internal_links": unique_links[:5],
        "external_links": external_links[:2],
    }

def build_jsx(data, page_name, slug, category):
    today = datetime.date.today().isoformat()

    # FAQs array
    faqs_lines = []
    for f in data["faqs"]:
        q_esc = f["q"].replace('\\', '\\\\').replace('"', '\\"')
        a_esc = f["a"].replace('\\', '\\\\').replace('"', '\\"')
        faqs_lines.append('    { q: "' + q_esc + '", a: "' + a_esc + '" }')
    faqs_code = ",\n".join(faqs_lines)

    # Sections
    sections_parts = []
    for s in data["sections"][1:]:
        title_esc = s["title"].replace('\\', '\\\\').replace('"', '\\"')
        paras = [p.strip() for p in re.split(r'(?<=[.!?])\s+', s["content"]) if p.strip()]
        paras_esc = [p.replace('\\', '\\\\').replace('"', '\\"') for p in paras]
        para_block = '<p className="text-white/70 leading-relaxed mb-5">' + '</p>\n      <p className="text-white/70 leading-relaxed mb-5">'.join(paras_esc) + '</p>'
        sections_parts.append('    <h2 className="text-2xl font-black mt-10 mb-4">' + title_esc + '</h2>\n      ' + para_block)
    sections_code = "\n\n".join(sections_parts)

    # Internal links
    links_parts = []
    for l in data["internal_links"]:
        ltext = l["text"].replace('\\', '\\\\').replace('"', '\\"')
        links_parts.append('<Link key="' + l["slug"] + '" to="/blog/' + l["slug"] + '" className="text-[#de0015] hover:underline">' + ltext + '</Link>')
    links_html = " ".join(links_parts)

    # External links
    ext_parts = []
    for l in data["external_links"]:
        ltext = l["text"].replace('\\', '\\\\').replace('"', '\\"')
        ext_parts.append('<a href="' + l["url"] + '" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">' + ltext + '</a>')
    ext_html = ""
    if ext_parts:
        ext_html = ('\n      <p className="text-white/60 text-sm mt-3 mb-1">Recursos externos:</p>\n'
                    '      <div className="flex flex-wrap gap-3 text-sm">\n        ' + " ".join(ext_parts) + '\n      </div>')

    title_esc = data["title"].replace('\\', '\\\\').replace('"', '\\"')
    desc_esc = data["description"].replace('\\', '\\\\').replace('"', '\\"')
    intro_esc = data["sections"][0]["content"][:400].replace('\\', '\\\\').replace('"', '\\"')

    jsx_lines = [
        'import { Link } from "react-router-dom";',
        'import BlogPostLayout from "../../components/BlogPostLayout";',
        '',
        'const faqs = [',
        faqs_code,
        '];',
        '',
        'const ' + page_name + ' = ({ openCalendly }) => (',
        '  <BlogPostLayout',
        '    title="' + title_esc + '"',
        '    description="' + desc_esc + '"',
        '    slug="' + slug + '"',
        '    datePublished="' + today + '"',
        '    dateModified="' + today + '"',
        '    readingTime="6 min"',
        '    category="' + category + '"',
        '    keywords={[]}',
        '    faqs={faqs}',
        '    openCalendly={openCalendly}',
        '  >',
        '    <p className="text-white/70 leading-relaxed mb-5">',
        '      ' + intro_esc + '...',
        '    </p>',
        '',
        sections_code,
        '',
        '    <h2 className="text-2xl font-black mt-10 mb-4">Preguntas frecuentes</h2>',
        '    <div className="space-y-4 mb-8">',
        '      {faqs.map((f, i) => (',
        '        <div key={i} className="border-l-2 border-[#de0015] pl-4">',
        '          <p className="text-white font-semibold mb-2">{f.q}</p>',
        '          <p className="text-white/60 text-sm">{f.a}</p>',
        '        </div>',
        '      ))}',
        '    </div>',
        '    <p className="text-white/70 leading-relaxed mb-5">',
        '      Si quieres profundizar en como optimizar tus campanhas de Meta Ads con datos reales,',
        '      en DayByDay Consulting hacemos auditorias gratuitas de tu cuenta. Agenda un discovery call',
        '      y te mostramos exactamente que esta fallando y como solucionarlo.',
        '    </p>',
        '    <div className="mt-8 p-4 bg-white/5 rounded-lg">',
        '      <p className="text-white/60 text-sm mb-3">Enlaces internos mencionados:</p>',
        '      <div className="flex flex-wrap gap-3 text-sm">',
        '        ' + links_html,
        '      </div>' + ext_html,
        '    </div>',
        '  </BlogPostLayout>',
        ');',
        '',
        'export default ' + page_name + ';',
        ''
    ]
    return '\n'.join(jsx_lines)

def update_app_jsx(page_name, slug):
    app = (PROJECT_DIR / "src" / "App.jsx").read_text()
    imp = 'import ' + page_name + ' from "./pages/blog/' + page_name + 'Page";'
    route = '        <Route path="/blog/' + slug + '" element={<' + page_name + 'Page openCalendly={openCalendly} />} />'
    if imp in app:
        print("  WARN: import ya existe en App.jsx")
        return
    last_imp = app.rfind('import ')
    last_imp_end = app.find('\n', last_imp)
    app = app[:last_imp_end+1] + '\n' + imp + app[last_imp_end+1:]
    last_route = app.rfind('<Route path="/blog/')
    last_route_end = app.find('\n', app.find('>', last_route)) + 1
    app = app[:last_route_end] + '\n' + route + app[last_route_end:]
    (PROJECT_DIR / "src" / "App.jsx").write_text(app)
    print("  App.jsx actualizado")

def update_sitemap(slug):
    sitemap = (PROJECT_DIR / "public" / "sitemap.xml").read_text()
    today = datetime.date.today().isoformat()
    new_entry = '\n  <url>\n    <loc>https://daybydayconsulting.com/blog/' + slug + '/</loc>\n    <lastmod>' + today + '</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>'
    if ('/blog/' + slug + '/') in sitemap:
        print("  WARN: " + slug + " ya en sitemap")
        return
    sitemap = sitemap.replace('</urlset>', new_entry + '\n</urlset>')
    (PROJECT_DIR / "public" / "sitemap.xml").write_text(sitemap)
    print("  sitemap.xml actualizado")

def update_estado(slug):
    estado = json.loads((PROJECT_DIR / "seo-plan" / "estado.json").read_text())
    estado.setdefault("published_posts", []).append(slug)
    estado["last_updated"] = datetime.datetime.now(datetime.timezone.utc).isoformat()
    (PROJECT_DIR / "seo-plan" / "estado.json").write_text(json.dumps(estado, indent=2, ensure_ascii=False) + '\n')
    print("  estado.json actualizado (" + str(len(estado["published_posts"])) + " posts)")

def main():
    if len(sys.argv) < 3:
        print("Uso: blog-generate.py <topic> <slug> [categoria]")
        sys.exit(1)
    topic = sys.argv[1]
    slug = sys.argv[2]
    category = sys.argv[3] if len(sys.argv) > 3 else "Estrategia"
    page_name = slug_to_pagename(slug)
    page_file = PROJECT_DIR / "src" / "pages" / "blog" / (page_name + "Page.jsx")

    print("=== BLOG PIPELINE ===")
    print("Topic: " + topic)
    print("Slug: " + slug)
    print("")

    if page_file.exists():
        print("ERROR: Ya existe " + str(page_file))
        sys.exit(1)

    print("[1/7] Generando contenido...")
    content = generate_blog_content(topic, slug, category)
    print("  OK (" + str(len(content)) + " chars)")

    print("[2/7] Parseando...")
    data = parse_content(content)
    print("  Title: " + data["title"][:60])
    print("  Sections: " + str(len(data["sections"])) + ", FAQs: " + str(len(data["faqs"])))

    print("[3/7] Verificando enlaces...")
    missing = verify_links(data["internal_links"])
    if missing:
        print("  WARN: slugs inexistentes: " + str(missing))
    else:
        print("  OK: " + str(len(data["internal_links"])) + " enlaces internos verificados")

    print("[4/7] Generando JSX...")
    jsx = build_jsx(data, page_name, slug, category)
    page_file.write_text(jsx)
    print("  " + str(page_file))

    print("[5/7] Actualizando App.jsx, sitemap, estado...")
    update_app_jsx(page_name, slug)
    update_sitemap(slug)
    update_estado(slug)

    print("[6/6] Git commit + push...")
    # Work from main project dir directly (it IS a worktree for main)
    os.chdir(PROJECT_DIR)
    subprocess.run(["git", "add", "-A"], check=True)
    diff = subprocess.run(["git", "diff", "--cached", "--stat"], capture_output=True, text=True)
    print("  Cambios: " + diff.stdout.strip())
    subprocess.run(["git", "commit", "-m", "feat(blog): " + topic + " -- keyword: " + slug], check=True)
    subprocess.run(["git", "push", "origin", "main"], check=True)
    print("  Push OK")

    print("")
    print("=== DONE ===")
    print("Post: https://daybydayconsulting.com/blog/" + slug + "/")
    print("Vercel desplegara automaticamente desde GitHub (~1-2 min)")

if __name__ == "__main__":
    main()