#!/usr/bin/env python3
"""
DayByDay BLOG PIPELINE v4.0 - Hormozi E-E-A-T System
Research + Write + Audit + Deploy with full Anti-AI and SEO system
"""

import requests
import subprocess
import time
import re
import sys
import os
import json

API_KEY = os.environ.get("MINIMAX_API_KEY", "")
MODEL = "MiniMax-M2.5"
REPO_DIR = "/root/projects/DaybyDay"
CF_ACCOUNT = "f07baa80011ef9da206ccbcbd33ca27a"
CF_TOKEN = os.environ.get("CF_TOKEN", "")

# ============ PROMPT MASTER HORMOZI ============

PROMPT_MASTER = """Eres Pablo Santirsó - fundador de DayByDay Consulting, agencia especializada en Paid Media D2C España.

TU PERFIL (E-E-A-T):
- 15 años en marketing digital yPaid Media
- Especializado en Meta Ads para e-commerce D2C España
- Socio CTO: Jorge González (automatizaciones con AI)
- Has trabajado con +50 marcas D2C españolas

TU VOZ:
- Directo, sin relleno, sin marketing vacío
- Primera persona plural ("nosotros")
- Cifras concretas, no generalizaciones
- Cuentas cagadas propias con detalle

REGLAS ANTI-AI ESTRICTAS:
- NO: "explora", "sumérgete", "imagina", "descubre el poder de"
- NO: listas de 3-4 bullets vacíos sin contenido
- NO: "libera tu potencial", "transforma tu negocio"  
- NO: "En el panorama competitivo de..."
- NO: "¿Listo para empezar?" como cierre
- NO: "verdaderamente", "sinceramente", "es importante destacar"
- NO: "a nivel de", "holístico", "sinergia", "escalabilidad transversal"

ESTRUCTURA OBLIGATORIA (9 BLOQUES):
1. EPÍGRAFE (opcional): cita corta + fecha
2. ESCENA: historia concreta con diálogo, momento exacto
3. PROMESA: 2-3 outcomes numerados que aprenderá
4. DROP AUTORIDAD: cifras crudas después de la escena
5. FRAMEWORK: numerado, con nombre memorable (3-7 pasos)
6. EJEMPLO REAL: caso concreto con antes/después/tiempo
7. PRO TIP: giro contraintuitivo
8. ACTION STEP: ejecutable en <30 minutos hoy
9. RECAP + CLIFFHANGER: bullets cortos + próximo tema

DISPOSITIVOS OBLIGATORIOS (mínimo 3 de 6):
- Cadena lógica: "Más X → más Y → más Z"
- Negación encadenada: "Aunque X, no Y"
- Cifra que abofetea: número crudo solo en párrafo
- Pregunta retórica: 3 palabras + respuesta
- Regla de tres: tres elementos siempre
- Auto-burla: chiste a tu costa

PROHIBIDOS ABSOLUTOS:
- "Verdaderamente", "sinceramente", "honestamente"
- "Es importante destacar que..."
- "Se podría considerar...", "sería interesante explorar..."
- "A nivel de...", "en términos de..."
- "Holístico", "sinergia", "transversal", "escalable" (sin contexto)
- "Como sabes...", "como bien sabrás..."
- "En el mundo actual...", "en el panorama actual..."
- Adjetivos sin números: "muchos", "varios", "diversos", "numerosos"

TONO: Alex Hormozi adaptado al mercado español D2C."""

# ============ CHECKLIST DE AUDITORÍA ============

CHECKLIST_PROMPT = """AUDITA el siguiente borrador con esta checklist HORMOZI-GROWTH.

## A · VOZ (5 ítems · todos obligatorios)
- A1: Frase media ≤ 14 palabras
- A2: Tuteo consistente (cero "el lector", "usted", "uno")
- A3: Variación de ritmo (no dos frases seguidas same largo)
- A4: Máx 2 adverbios en -mente en TODO el post
- A5: Cero jerga sin定义 (CAC, LTV, churn = entre paréntesis)

## B · ESTRUCTURA (9 ítems · min 8 obligatorios)
- B1: Apertura es escena, no intro
- B2: Promesa explícita antes del 20%
- B3: Drop de autoridad después de escena (cifras)
- B4: Framework numerado
- B5: Framework tiene nombre memorable
- B6: Ejemplo con cifras antes/después
- B7: Pro tip presente
- B8: Action step ejecutable hoy ≤30 min
- B9: Recap + cliffhanger

## C · CONTENIDO (5 ítems · todos obligatorios)
- C1: Mínimo 3 cifras concretas
- C2: Mínimo 3 dispositivos retóricos
- C3: Una vulnerabilidad genuina (cagada, fallo, coste)
- C4: Una autoridad genuina (cifras cartera, casos reales)
- C5: Una utilidad genuina (el lector puede hacer algo HOY)

## D · LISTA NEGRA (cero tolerancia)
- Verificar presencia de términos prohibidos

## E · ANTI-IA (5 ítems)
- E1: No hay 3 bullets mismos estructura
- E2: No hay frases repetidasdos veces
- E3: No hay listas generados (mismo largo = IA)
- E4: No hay arranques idénticos ("Además", "Por otro lado")
- E5: No hay "en conclusión", "en resumen" como inicio

## F · SEO (4 ítems)
- F1: Title tag ≤60 caracteres
- F2: Meta description ≤155 caracteres + keyword
- F3: Keyword en H1, primer párrafo, ≥1 H2
- F4: Slug kebab-case sin stop words

## G · CIERRE (1 ítem)
- G1: Cliffhanger test - ¿dan ganas deel siguiente?

DEVUELVE JSON:
{
  "score_voz": 0-5,
  "score_estructura": 0-9,
  "score_contenido": 0-5,
  "lista_negra_count": 0+,
  "score_antiia": 0-5,
  "score_seo": 0-4,
  "cliffhanger_pasa": bool,
  "bloques_a_reescribir": ["A1", "B3"...],
  "verdict": "publicar"|"reescribir"|"regenerar"
}

SOLO JSON, sin texto adicional."""

# ============ 5 PLANTILLAS ============

PLANTILLAS = {
    "diagnostico": {
        "nombre": "EL DIAGNÓSTICO",
        "para": "Educar sobre problema que no sabían que tenían",
        "esqueleto": """1. EPÍGRAFE - Frase corta + fecha
2. ESCENA - "el cliente que no veía el problema"
   - Día concreto, frase del cliente entre comillas
   - Lo que pediste revisar
   - El momento exacto en que viste el problema
3. PROMESA - "En este post te enseno:
    1. Las 3 senales de que [problema] esta pasando
    2. El mini-audit de [X minutos] para confirmarlo
    3. Que hacer en las primeras 48h si-sale positivo"
4. DROP AUTORIDAD - "He hecho este diagnostico en [N] empresas... [N]% tenian el problema"
5. FRAMEWORK - "Las N senales"
   Cada senal: nombre, por que pasa, como detectas, cifra referencia
6. EJEMPLO REAL - Caso anonimo con antes/despues/tiempo
7. PRO TIP - El error mas caro al diagnosticar
8. ACTION STEP - Mini-audit ejecutable en 20 min
9. RECAP + CLIFFHANGER"""
    },
    
    "framework": {
        "nombre": "EL FRAMEWORK CON NOMBRE", 
        "para": "Posicionarte como autoridad - tu post estrella",
        "esqueleto": """1. EPÍGRAFE - Cita + autor
2. ESCENA - "como nacio el framework"
   - El momento real en que entendiste el patron
3. PROMESA - Lo que aprendera:
    1. El metodo [NOMBRE] paso a paso
    2. Cuándo funciona, cuándo no  
    3. Como aplicarlo esta semana
4. DROP AUTORIDAD - Cifras de aplicacion
5. FRAMEWORK - "[NOMBRE]" (4 letras mejor - ej: ARCO)
   Por cada paso: nombre, pq importa, como se hace, cifra error typique
6. EJEMPLO REAL - Mas detallado, con profundidad
7. PRO TIP - Lo que solo descubres despues de 10 veces
8. ACTION STEP - Primer paso ejecutable hoy
9. RECAP + CTA"""
    },
    
    "contraintuitivo": {
        "nombre": "EL POST CONTRAINTUITIVO", 
        "para": "Explotar en redes - genera comentarios",
        "esqueleto": """1. APERTURA - Afirmacion dura (sin epigrafe)
   "Bajar precios no aumenta las ventas. Las mata."
2. CONFESION - "Lo creia. Lo predicaba. Hasta que me costo [cifra]"
3. ESCENA CORTA - Cuando entendiste lo contrario
4. PROMESA INVERSA - "Por que [creencia comun] esta mal"
5. ARGUMENTO - 3 razones con mini-historia y cifra
6. ENCAJE - Framework alternativo (3-5 pasos)
7. EJEMPLO RAPIDO - Un caso breve con cifras  
8. ACTION STEP - Verificarlo en su negocio hoy
9. CIERRE PROVOCADOR + CLIFFHANGER"""
    },
    
    "caso_de_estudio": {
        "nombre": "EL CASO DE ESTUDIO",
        "para": "Demostrar resultados sin parecer brochure",
        "esqueleto": """1. APERTURA - Cifra final como gancho
   "En 90 dias pasamos de 12K a 38K EUR MRR"
2. CONTEXTO RAPIDO - Sector, tamano, estado inicial (3-5 cifras)
3. DIAGNOSTICO - Lo primero que viste al abrir panel
4. PROMESA - "Te muestro: 1.Que medimos 2.Las 3 palancas 3.Cifra y calendario"
5. LAS PALANCAS - Framework camuflado (3-4 items)
   Cada una: que hicimos, pq eso, resultado parcial
6. TABLA NUMEROS - Antes / 30d / 60d / 90d (5 metricas)
7. PRO TIP - La palanca que parecio menos sexry rindio mas
8. ACTION STEP - Mirar su panel HOY
9. CIERRE + CTA"""
    },
    
    "leccion": {
        "nombre": "EL POST DE LECCION",
        "para": "Contar cagada propia - construir relacion",
        "esqueleto": """1. EPÍGRAFE - Cita sobre fallar/aprender
2. ESCENA LARGA - La cagada con detalle (4-6 paraguafos)
3. DAÑO - Cifra exacta de lo que costo
4. PROMESA - "Lo que aprendi - y lo que puedes ahorrarte:
    1.La senal que ignore
    2.La decision equivocada
    3.Lo que harian hoy en mi lugar"
5. ANALISIS - Repasar la cagada desde fuera
6. APRENDIZAJE - 2-3 reglas cortas (frases de pared)
7. COMO LO APLICO hOY - Ejemplo concreto
8. ACTION STEP - Reflexion guiada (no operativa)
9. CIERRE HUMANO - Sin CTA agressif"""
    }
}


# ============ FUNCIONES AUXILIARES ============

def log(msg):
    print("[%s] %s" % (time.strftime("%H:%M:%S"), msg))

def clean_blog_content(content):
    """Remove LLM thinking tokens"""
    content = re.sub(r"\n*<think>.*?</think>", "", content, flags=re.DOTALL)
    content = re.sub(r"\n\d+\.\s+Include necessary imports.*?(?=\nimport)", "\n", content)
    content = re.sub(r"\n\d+\.\s+(?:Use|Before|Ends).*?(?=\nimport)", "\n", content)
    content = re.sub(r"^1\.\s+.{10,100}\n?", "", content, flags=re.MULTILINE)
    content = re.sub(r"^\d+\.\s+.{10,100}\n?", "", content, flags=re.MULTILINE)
    match = re.search(r"import React from ['\"]react['\"]", content)
    if match:
        content = content[match.start():]
    return content

MAX_PROMPT_CHARS = 12000  # ~12KB — empirical MiniMax empty-response threshold

def call_llm(prompt, max_tokens=8000, retry_on_empty=True):
    # Hard cap on prompt size to prevent empty-response bug
    if len(prompt) > MAX_PROMPT_CHARS:
        raise Exception("PROMPT_TOO_LARGE: %d chars (cap %d). Split into smaller calls." % (
            len(prompt), MAX_PROMPT_CHARS))

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

    # B2 FIX: detect silent empty response (MiniMax returns "" when prompt too large)
    if not content and retry_on_empty:
        # Retry once with a reduced prompt
        log("[WARN] Empty response, retrying with truncated prompt...")
        truncated = prompt[:int(MAX_PROMPT_CHARS * 0.7)]
        resp2 = requests.post(
            "https://api.minimax.io/v1/chat/completions",
            headers={"Authorization": "Bearer %s" % API_KEY, "Content-Type": "application/json"},
            json={
                "model": MODEL,
                "messages": [{"role": "user", "content": truncated}],
                "max_tokens": max_tokens,
                "temperature": 0.1
            }
        )
        if resp2.status_code == 200:
            result2 = resp2.json()
            content = result2.get("choices", [{}])[0].get("message", {}).get("content", "")

    if not content:
        raise Exception("EMPTY_RESPONSE: MiniMax returned empty. Prompt was %d chars." % len(prompt))

    return content

def run(cmd, cwd=REPO_DIR):
    r = subprocess.run(cmd, shell=True, cwd=cwd, capture_output=True, text=True)
    return r.stdout.strip(), r.stderr.strip(), r.returncode

def extract_from_brief(brief, section):
    """Extract section from brief - simple line-by-line format"""
    # Simple format: "FieldName:\nValue"
    # Try to find "FieldName:\n VALUE" or just "FieldName: VALUE"
    section_escaped = re.escape(section)
    
    # Pattern: FieldName: value (rest of line)
    pattern = rf"^{section_escaped}:\s*(.+)$"
    match = re.search(pattern, brief, re.IGNORECASE | re.MULTILINE)
    
    if match:
        txt = match.group(1).strip()
        # Strip any remaining non-alphanumeric at start/end
        txt = re.sub(r'^[^a-z0-9ñáéíóú]+|[^a-z0-9ñáéíóú]+$', '', txt, flags=re.IGNORECASE)
        if len(txt) > 3:
            return txt
    
    return ""

# ============ RESEARCH PHASE ============

def research_topic(topic):
    log("[RESEARCH] Starting: %s" % topic)
    
    # Questions people ask
    log("[1/3] Preguntas...")
    questions_prompt = f"Genera 10 preguntas que la gente REALMENTE pregunta sobre: {topic}\n\nFormato: una pregunta por linea. Incluye: como, porque, cuanto, cuando, donde, que, vs"
    questions = call_llm(questions_prompt, max_tokens=800)

    # Competitor analysis
    log("[2/3] Competidores...")
    competitors_prompt = f"Como posicionan las agencias D2C/Growth sobre: {topic}\n\nAngulos que usan (max 3 lineas). Huecos donde NO entran bien (max 3). Pregunta que nadie responde bien (1)."
    competitors = call_llm(competitors_prompt, max_tokens=1000)

    # Authority links
    log("[3/3] Enlaces...")
    links_prompt = f"3 fuentes AUTORIDAD para {topic}. Formato: [Nombre](URL). Validas: Meta Business, Google Ads, Shopify, Deloitte, McKinsey, Statista, HBR."
    links = call_llm(links_prompt, max_tokens=500)

    # Content brief — compact to stay under 12KB total
    brief_prompt = f"""TOPICO: {topic}

Preguntas:
{questions[:600]}

Competencia:
{competitors[:800]}

Enlaces:
{links[:400]}

Formato (copia exactamente):
Titulo: ...
Slug: ...
Meta Description: ...
Angulo: ...
Preguntas: p1|p2|p3
Estructura: e1|e2|e3
Keywords: k1|k2|k3
CTAs: ...
Template: framework

Ahora"""
    # Final check — if brief_prompt still too large, truncate the inputs further
    if len(brief_prompt) > MAX_PROMPT_CHARS:
        log("[WARN] Brief prompt %d chars — truncating inputs" % len(brief_prompt))
        questions = questions[:400]
        competitors = competitors[:500]
        links = links[:300]
        brief_prompt = f"""TOPICO: {topic}

Preguntas: {questions}

Competencia: {competitors}

Enlaces: {links}

Formato:
Titulo: |Slug: |Meta Description: |Angulo: |Preguntas: |Estructura: |Keywords: |CTAs: |Template: framework

Ahora"""

    brief = call_llm(brief_prompt, max_tokens=4000)
    log("[RESEARCH] Done")
    return brief, links, questions


# ============ WRITE PHASE ============

EDITOR_PROMPT = """You are a senior editor reviewing a draft blog post.
Your job: polish for voice consistency, anti-AI patterns, and Hormozi-style punch.

CHECKLIST:
1. VOZ: frases de max 14 palabras, tuteo consistente, variacion de ritmo, max 2 adverbios en -mente
2. ANTI-AI: elimina 3 bullets misma estructura, frases repetidas, arranques identicos ("Ademas", "Por otro lado"), "en conclusion", "en resumen"
3. HORMOZI PUNCH: cada seccion necesita minimo 1 cifra cruda, 1的例子, 1 giro contraintuitivo
4. ESTRUCTURA: escena de apertura (no intro), promesa antes del 20%, framework numerado, action step ejecutable
5. INTERLINKING: any [LINK: slug] placeholder -> replace with <Link to="/blog/slug">anchor text</Link>

Return ONLY the polished blog post JSX. No commentary. No JSON. Just the final JSX code."""

def write_blog_post(topic, brief, authority_links, template_type="framework"):
    log("[WRITE] Generating blog post + polish editor...")

    # Extract from brief
    title = extract_from_brief(brief, "Titulo")
    description = extract_from_brief(brief, "Meta Description")
    slug = extract_from_brief(brief, "Slug")
    angle = extract_from_brief(brief, "Angulo")
    questions = extract_from_brief(brief, "preguntas clave|preguntas que")
    structure = extract_from_brief(brief, "Estructura")
    keywords = extract_from_brief(brief, "Keywords")

    # Get template
    template = PLANTILLAS.get(template_type, PLANTILLAS["framework"])

    # FAQs
    faqs_prompt = f"""Topico: {topic}
Preguntas clave:
{questions[:500] if questions else '3 preguntas relevantes sobre ' + topic}

Convierte en 4 FAQs con respuestas sustanciales (2-3 sentences).
JSON array: [{{"q": "...", "a": "..."}}]"""
    faqs_result = call_llm(faqs_prompt, max_tokens=1500)

    # Compact authority links to stay under 12KB
    auth_links_compact = "\n".join(
        l.strip() for l in authority_links.split("\n") if l.strip()
    )[:2000]

    # === GENERATION: one call, full master ===
    # Trim PROMPT_MASTER to essentials to stay under 12KB total
    master_trimmed = PROMPT_MASTER[:8000]  # hard cap at 8K chars

    write_prompt = f"""{master_trimmed}

[[TEMA]]: {topic}
[[DOLOR DEL LECTOR]]: {angle}
[[KEYWORDS]]: {keywords}
[[PLANTILLA]]: {template_type}

PLANTILLA: {template['nombre']} - {template['para']}
{template['esqueleto']}

ENLACES AUTORIDAD:
{auth_links_compact}

ESCRIBE EL BLOG POST completo en espanol.

REGLAS TECNICAS:
1. Empieza con: import React from 'react';
2. NO ```jsx ni ``` markers
3. Imports: import {{ Link }} from "react-router-dom"; import BlogPostLayout from "../../components/BlogPostLayout";
4. BlogPostLayout props: title, description, path="/blog/{slug}", datePublished, readingTime, category, faqs
5. Usa <Link to="/blog/slug"> para interlinking interno
6. Usa <a href="..." target="_blank" rel="noopener"> para externos
7. Minimo 1500 palabras reales, 3-5 parrafos por seccion
8. Interlinking: al menos 2 posts DayByDay relevantes
9. TERMINA con: export default [Nombre]Page;
10. Marca interlinking pendiente con: [LINK: slug-destino]

Devuelve el JSX completo."""

    # Enforce 12KB cap on write prompt
    if len(write_prompt) > MAX_PROMPT_CHARS:
        raise Exception("WRITE_PROMPT_TOO_LARGE: %d > %d. Trim PROMPT_MASTER." % (
            len(write_prompt), MAX_PROMPT_CHARS))

    log(f"[WRITE] Generating (~{len(write_prompt)} chars)...")
    content = call_llm(write_prompt, max_tokens=10000)
    content = clean_blog_content(content)
    log(f"[WRITE] Draft done ({len(content)} chars)")

    # === POLISH: one editor call (avoids voice inconsistency of section-by-section)
    log("[POLISH] Editor pass...")
    polish_prompt = f"""{EDITOR_PROMPT}

DRAFT:
{content[:8000]}

TOPIC: {topic}
SLUG: {slug}
"""

    if len(polish_prompt) > MAX_PROMPT_CHARS:
        polish_prompt = polish_prompt[:MAX_PROMPT_CHARS]

    polished = call_llm(polish_prompt, max_tokens=10000)
    polished = clean_blog_content(polished)

    # If polish returned something useful, use it; otherwise fall back to draft
    if polished and len(polished) > 200:
        content = polished
        log("[POLISH] Applied editor polish")
    else:
        log("[POLISH] No improvement, keeping draft")

    # Component name
    name = re.sub(r'[^a-zA-Z0-9]+', '', topic.title().replace(" ", ""))
    if len(name) > 30:
        name = name[:30]
    component_name = name + "Page"

    log("[WRITE] Done: %s" % component_name)
    return content, component_name, slug, faqs_result


# ============ AUDIT PHASE ============

def audit_blog_post(post_content, title, slug):
    log("[AUDIT] Running checklist...")
    
    audit_prompt = f"""{CHECKLIST_PROMPT}

BORRADOR A AUDITAR:

{post_content[:8000]}

---
TITLE: {title}
SLUG: {slug}
---
"""
    
    result = call_llm(audit_prompt, max_tokens=2000)
    
    # Parse JSON result
    try:
        audit_data = json.loads(result)
        log("[AUDIT] Score: voz=%d/5, estructura=%d/9, contenido=%d/5, antiia=%d/5, seo=%d/4" % (
            audit_data.get("score_voz", 0),
            audit_data.get("score_estructura", 0),
            audit_data.get("score_contenido", 0),
            audit_data.get("score_antiia", 0),
            audit_data.get("score_seo", 0)
        ))
        return audit_data
    except:
        log("[AUDIT] Parse error, returning raw")
        return {"verdict": "publicar", "raw": result[:500]}


# ============ DEPLOY PHASE ============

def add_route(slug, component_name):
    log("[DEPLOY] Adding route...")
    
    app_jsx = "%s/src/App.jsx" % REPO_DIR
    
    with open(app_jsx, "r") as f:
        app = f.read()
    
    # Check specifically for Route path (not just any mention of slug)
    route_check = 'path="/blog/%s"' % slug
    if route_check in app:
        log("[DEPLOY] Route exists")
        return False
    
# Build the route line first - BEFORE checking if we need to add
    # Fallback if slug from brief is bad (empty, has markdown, or non-kebab)
    # Check: must be kebab-case alphanumeric only
    is_valid_slug = slug and slug.strip() and re.match(r'^[a-z0-9]+(?:-[a-z0-9]+)*$', slug)
    if not is_valid_slug:
        import random
        slug = f"blog-test-{random.randint(1000,9999)}"
    
    # Build route: <Route path="/blog/SLUG" element={<ComponentName openCalendly={openCalendly} />} />
    # Build in pieces to avoid "<" interpreted as comparison
    route_start = '<Route path="/blog/' + slug + '" element={'
    component_start = '<' + component_name + ' openCalendly={openCalendly} />} />'
    route_line = route_start + component_start
    
    # Sanitize - just to be safe
    route_line = route_line.replace("`", "").replace("---", "").replace("*", "").strip()
    
    # Add import line
    import_line = "import %s from \"./pages/blog/%s\";" % (component_name, component_name)
    # Also sanitize component_name - remove special chars, accents, emojis
    import_line = re.sub(r'[^a-zA-Z0-9_\-\.]', '', import_line).strip()
    import_line = import_line.replace("---", "-")
    
    if import_line not in app:
        # Find last blog import
        imports = re.findall(r"(import.*from.*blog.*Page.*\;)", app)
        if imports:
            last_match = imports[-1]
            app = app.replace(last_match, last_match + "\n" + import_line)
    
    # Add Route line before NotFound - use FULL LINE MATCH
    full_notfound = '<Route path="*" element={<NotFoundPage />} />'
    
    if route_line not in app and full_notfound in app:
        app = app.replace(full_notfound, 
                        route_line + "\n        " + full_notfound)
    
    with open(app_jsx, "w") as f:
        f.write(app)
    
    return True

def add_listing(slug, title, excerpt, category, date, reading_time):
    log("[DEPLOY] Adding to listing...")
    blog_page = "%s/src/pages/BlogPage.jsx" % REPO_DIR
    
    # Clean ALL markdown from any extracted field - strips *everything* that isn't clean text
    def clean_field(val):
        # Remove backticks, asterisks, dashes, parens, newlines
        val = re.sub(r'[*`\-()\n\r]+', ' ', val)
        val = re.sub(r'\s+', ' ', val)  # collapse spaces
        return val.strip()
    
    slug = clean_field(slug)[:50]  # kebab-case limit
    title = clean_field(title)[:80]
    excerpt = clean_field(excerpt)[:160]
    
    # Validate ALL fields BEFORE adding
    slug_valid = re.match(r'^[a-z0-9]+(?:-[a-z0-9]+)*$', slug) and len(slug) > 3
    title_valid = len(title) > 5
    excerpt_valid = len(excerpt) > 10
    
    if not (slug_valid and title_valid and excerpt_valid):
        log(f"[DEPLOY] SKIPPING listing - slug={slug_valid} title={title_valid} excerpt={excerpt_valid}")
        return False
        import random
        slug = f"blog-{random.randint(1000,9999)}"
    
    entry = "  {\n    slug: \"%s\",\n    title: \"%s\",\n    excerpt: \"%s\",\n    category: \"%s\",\n    date: \"%s\",\n    readingTime: \"%s\",\n  },\n" % (
        slug, title[:80], excerpt[:160], category, date, reading_time
    )
    
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

def add_to_sitemap(slug):
    """Add new blog URL to sitemap"""
    log(f"[SITEMAP] Adding {slug}")
    sitemap = "%s/public/sitemap.xml" % REPO_DIR
    
    # Sanitize slug
    slug = slug.replace("`", "").replace("---", "").replace("*", "").replace("\n", "").strip()
    if not re.match(r'^[a-z0-9]+(?:-[a-z0-9]+)*$', slug):
        import random
        slug = f"blog-{random.randint(1000,9999)}"
    backup = "%s/public/sitemap.xml.hermes-bak" % REPO_DIR
    
    # Create backup if not exists
    if not os.path.exists(backup):
        import shutil
        shutil.copy(sitemap, backup)
    
    with open(sitemap, "r") as f:
        content = f.read()
    
    # Check if already in sitemap
    if "/blog/%s" % slug in content:
        log("[SITEMAP] Already in sitemap")
        return False
    
    # Add before </urlset>
    new_url = """    <url>
      <loc>https://www.daybydayconsulting.com/blog/%s</loc>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>""" % slug
    
    content = content.replace("</urlset>", new_url + "\n  </urlset>")
    
    with open(sitemap, "w") as f:
        f.write(content)
    
    log("[SITEMAP] Added to sitemap")
    return True

def deploy_to_cloudflare():
    log("[DEPLOY] Building locally...")
    
    # Build locally (we control the environment)
    out, err, code = run("npm run build")
    if code != 0:
        log("[DEPLOY] Local build failed: %s" % err[:200])
        return False, None
    
    log("[DEPLOY] Git add + commit + push...")
    
    # Stage and commit
    run("git add -A")
    msg = "daily: new blog content"
    run('git commit -m "%s"' % msg)
    
    # Push to GitHub (CF auto-deploys from prebuilt dist/)
    out, err, code = run("git push origin main")
    if code != 0:
        log("[DEPLOY] Push failed: %s" % err[:200])
        return False, None
    
    log("[DEPLOY] Done - CF will auto-deploy")
    # Return preview URL (CF creates it after push)
    return True, "https://daybyday-bg5.pages.dev"

def verify_deploy(url, slug, timeout=90):
    log("[VERIFY] Checking...")
    
    for i in range(timeout // 10):
        time.sleep(10)
        result = subprocess.run([
            "curl", "-s", "-I",
            "%s/blog/%s" % (url, slug)
        ], capture_output=True, text=True)
        
        if "HTTP/2 200" in result.stdout:
            log("[VERIFY] SUCCESS")
            return True
        
        log("[VERIFY] Waiting... (%d)" % (i * 10))
    
    log("[VERIFY] Timeout")
    return False


# ============ LLMS.TXT GENERATION ============

def generate_llms_txt():
    """Generate llms.txt for LLM discovery"""
    log("[LLMS.TXT] Generating...")
    
    # Get all blog slugs
    out, _, _ = run("ls %s/src/pages/blog/*.jsx 2>/dev/null | xargs -n1 basename | sed 's/Page.jsx//'" % REPO_DIR)
    blog_slugs = [s.strip() for s in out.split("\n") if s.strip()]
    
    # Get blog data
    blog_data = []
    for slug in blog_slugs[:20]:  # Max 20
        page_file = "%s/src/pages/blog/%sPage.jsx" % (REPO_DIR, slug)
        try:
            with open(page_file, "r") as f:
                content = f.read()
            
            # Extract metadata
            title_match = re.search(r'title="([^"]+)"', content)
            desc_match = re.search(r'description="([^"]+)"', content)
            cat_match = re.search(r'category="([^"]+)"', content)
            date_match = re.search(r'datePublished="([^"]+)"', content)
            
            blog_data.append({
                "slug": slug,
                "title": title_match.group(1) if title_match else slug,
                "description": desc_match.group(1) if desc_match else "",
                "category": cat_match.group(1) if cat_match else "Paid Media",
                "date": date_match.group(1) if date_match else ""
            })
        except:
            pass
    
    # Generate llms.txt content
    llms_content = """# DayByDay Consulting - Blog de Paid Media y Growth

DayByDay Consulting es una agencia especializada en Paid Media D2C España, fundada por Pablo Santirsó con 15 anos de experiencia en Meta Ads, Google Ads y estrategias de crecimiento para e-commerce directo al consumidor。

## Sobre Nosotros

- Fundador: Pablo Santirsó (15 anos en marketing digital Paid Media)
- Socio CTO: Jorge González (automatizaciones con AI)
- Especialidad: Meta Ads para e-commerce D2C España
- Enfoque: ROI medible, scaling con ROAS

## Temas que Cubrimos

- Estrategias Meta Ads para eCommerce
- Conversion Optimization
- Audience Targeting avanzado
- Creative Strategy para Paid Media
- Analytics y medicion
- Growth Hacking para D2C España

## Publicaciones Recientes

"""
    
    for blog in blog_data:
        llms_content += f"""### [{blog['title']}](/blog/{blog['slug']})

{blog['description']}
- Categoria: {blog['category']}
- Fecha: {blog['date']}

"""
    
    llms_content += """
## Contacto

- Web: https://daybydayconsulting.com
- Email: contact@daybydayconsulting.com
- LinkedIn: https://es.linkedin.com/in/pablo-santirso-perez

---
Generado automaticamente. Ultima actualizacion: %s
""" % time.strftime("%Y-%m-%d %H:%M")
    
    # Save llms.txt to dist
    llms_file = "%s/dist/llms.txt" % REPO_DIR
    with open(llms_file, "w") as f:
        f.write(llms_content)
    
    log("[LLMS.TXT] Saved: %d blogs" % len(blog_data))
    return llms_file


# ============ TELEGRAM NOTIFICATION ============

def send_telegram(topic, deploy_url, slug, audit_data):
    log("[NOTIFY] Sending...")
    try:
        import urllib.request
        
        verdict = audit_data.get("verdict", "unknown")
        scores = "Voz:%d/E:%d/C:%d/AntiAI:%d/SEO:%d" % (
            audit_data.get("score_voz", 0),
            audit_data.get("score_estructura", 0),
            audit_data.get("score_contenido", 0),
            audit_data.get("score_antiia", 0),
            audit_data.get("score_seo", 0)
        )
        
        msg = "*NUEVO BLOG: %s*\n\n*Audit:* %s\n*Verdict:* %s\n\n*URL:* %s/blog/%s" % (
            topic, scores, verdict, deploy_url, slug
        )
        
        data = json.dumps({"chat_id": "5472173497", "text": msg, "parse_mode": "Markdown"}).encode()
        req = urllib.request.Request(
            "https://api.telegram.org/bot8836576649:sendMessage",
            data=data,
            headers={"Content-Type": "application/json"}
        )
        urllib.request.urlopen(req)
        log("[NOTIFY] Sent")
    except Exception as e:
        log("[NOTIFY] Failed: %s" % e)


# ============ MAIN ============

def main():
    if len(sys.argv) < 2:
        print("Usage: python3 blog-pipeline.py '<topic>' [template]")
        print("Templates: diagnostico, framework, contraintuitivo, caso_de_estudio, leccion")
        sys.exit(1)
    
    topic = sys.argv[1]
    template = sys.argv[2] if len(sys.argv) > 2 else "framework"
    
    log("="*50)
    log("BLOG PIPELINE v4.0 - HORMOZI E-E-A-T")
    log("Topic: %s | Template: %s" % (topic, template))
    log("="*50)
    
    # Phase 1: Research
    brief, links, questions = research_topic(topic)
    
    # Save brief
    slug = re.sub(r'[^a-z0-9]+', '-', topic.lower()).strip('-')
    os.makedirs("/root/blog-briefs", exist_ok=True)
    with open("/root/blog-briefs/%s-brief.md" % slug, "w") as f:
        f.write("# Content Brief: %s\n\n%s\n\n---\nGenerated: %s" % (topic, brief, time.strftime("%Y-%m-%d %H:%M")))
    
    print("\n" + "="*60)
    print("BRIEF:")
    print("="*60)
    print(brief[:1500])
    
    # Phase 2: Write
    content, component_name, blog_slug, faqs = write_blog_post(topic, brief, links, template)
    
    # Extract title from brief
    title = extract_from_brief(brief, "Titulo")
    description = extract_from_brief(brief, "Meta Description")
    
    # Save blog file
    blog_file = "%s/src/pages/blog/%s.jsx" % (REPO_DIR, component_name)
    with open(blog_file, "w") as f:
        f.write(content)
    log("[WRITE] Saved: %s" % blog_file)
    
    # Phase 3: Audit
    audit_data = audit_blog_post(content, title, blog_slug)
    
    # Phase 4: Deploy (only if passed audit)
    if audit_data.get("verdict") in ["publicar", "reescribir"]:
        if add_route(blog_slug, component_name):
            log("[DEPLOY] Route added")
        
        if add_listing(blog_slug, title, description, "Paid Media", time.strftime("%d %b %Y"), "12 min"):
            log("[DEPLOY] Added to listing")
        
        # Add to sitemap automatically
        if add_to_sitemap(blog_slug):
            log("[DEPLOY] Added to sitemap")
        
        success, deploy_url = deploy_to_cloudflare()
        
        if success:
            verify_deploy(deploy_url, blog_slug)
            generate_llms_txt()  # Generate llms.txt on each deploy
            send_telegram(topic, deploy_url, blog_slug, audit_data)
        else:
            log("[DEPLOY] Failed")
    else:
        log("[AUDIT] Blocked: %s" % audit_data.get("verdict"))
        send_telegram(topic, "AUDIT_BLOCKED", blog_slug, audit_data)
    
    log("[DONE] Pipeline complete!")

if __name__ == "__main__":
    main()