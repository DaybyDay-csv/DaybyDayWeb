#!/usr/bin/env python3
"""
DayByDay BLOG RESEARCH MODULE v1.0
Researches topics via: Reddit, Quora, AnswerThePublic, Google Trends, competitor analysis
Outputs: keyword opportunities, gap analysis, content angles, authority links to cite
"""

import requests
import json
import time
import re
import sys
import os

API_KEY = "sk-cp-coe8mqQVc96sCuRUl3su_wFRaMr9lveb9hdg6D9ne4bJHRY-_l-HjYjU9mQwsr2eWVhYtlj86yC3f_m0XjfGGiiQGU4UZx17be_aoVnO7vpC-o3gWHXpL4w"
MODEL = "MiniMax-M2.5"

def log(msg):
    print("[%s] %s" % (time.strftime("%H:%M:%S"), msg))

def call_llm(prompt, max_tokens=4000):
    resp = requests.post(
        "https://api.minimax.io/v1/chat/completions",
        headers={"Authorization": "Bearer %s" % API_KEY, "Content-Type": "application/json"},
        json={
            "model": MODEL,
            "messages": [{"role": "user", "content": prompt}],
            "max_tokens": max_tokens,
            "temperature": 0.3
        }
    )
    if resp.status_code != 200:
        return {"error": resp.text[:200]}
    result = resp.json()
    content = result.get("choices", [{}])[0].get("message", {}).get("content", "")
    # Clean thinking tags
    content = content.replace("", "").replace("<", "")
    return content

def search_answer_the_public(topic):
    log("[AnswerThePublic] Researching: %s" % topic)
    prompt = f"""Eres un researcher de marketing digital para eCommerce D2C en España.
Topico: {topic}

Genera 15-20 preguntas que la gente REALMENTE pregunta sobre este tema en Google.
Formatos validos:
- Preguntas con como, porque, cuanto, cuando, donde, que
- Comparaciones: vs, versus
- Listas: mejor, top, guia, estrategia

Solo dame las preguntas, una por linea, sin numeros ni bullets."""
    result = call_llm(prompt, max_tokens=1500)
    return result

def analyze_competitors(topic):
    log("[Competitors] Analyzing: %s" % topic)
    prompt = f"""Analiza como las principales agencias de marketing D2C y growth posicionan sus contenidos sobre: {topic}

Agencias a analizar:
- Growth Partners (growthpartner.io)
- LP Agency (lpagency.io)
- Clerk (clerk.io)
- Outbound (outbound.io)

Para cada una, identifica:
1. ANGULO PRINCIPAL: Como posicionan el tema
2. KEYWORDS: Que palabras clave usan
3. FORMATO: Que tipo de contenido
4. TONO: Como escriben

Ahora analiza el topico: {topic}

Resumen de:
- Que angulos YA estan cogidos por competidores
- Donde hay HUECOS que podemos ocupar
- Que preguntas NO estan siendo respondidas"""
    result = call_llm(prompt, max_tokens=2000)
    return result

def find_authority_links(topic):
    log("[Authority Links] Finding for: %s" % topic)
    prompt = f"""Eres un link builder para contenido SEO de marketing digital.

Topico del blog: {topic}

Busca fuentes de AUTORIDAD que podemos citar:
- Documentacion oficial: Meta Business Help Center, Google Ads Help
- Estudios/informes: Deloitte, McKinsey, eMarketer, Statista
- Platforms tecnicos: Shopify Blog, WooCommerce, Stripe
- Thought leaders reconocidos

Dame 5-7 enlaces reales y verificables con:
- URL completa
- Motivo por el que es buena fuente para CITAR
- Anchor text sugerido

Ejemplo:
Meta Advantage+ Shopping: https://www.facebook.com/business/help/2474381473309153 - Guia oficial de Meta sobre Advantage+

Solo enlaces de fuentes con alta autoridad. No blogs de agencias."""
    result = call_llm(prompt, max_tokens=2000)
    return result

def generate_content_brief(topic):
    log("[Content Brief] Generating for: %s" % topic)
    
    log("[Research] Starting research phase...")
    
    questions = search_answer_the_public(topic)
    competitors = analyze_competitors(topic)
    authority_links = find_authority_links(topic)
    
    brief_prompt = f"""Eres un content strategist para DayByDay Consulting - agencia de paid media y growth para eCommerce D2C en Espana.

TOPICO: {topic}

INVESTIGACION REALIZADA:

Preguntas que la gente hace:
{questions}

ANALISIS DE COMPETIDORES:
{competitors}

ENLACES DE AUTORIDAD PARA CITAR:
{authority_links}

Genera un CONTENT BRIEF completo para un blog post de marketing digital.

El blog post debe:
1. Responder las preguntas REALES que la gente hace
2. Posicionarse en un HUECO que los competidores no cubren bien
3. Citar fuentes de autoridad para dar credibilidad
4. Estar optimizado para SEO pero escrito para humanos

FORMATO DEL BRIEF:

## Titulo (H1)
## Meta Description (max 160 chars)
## Slug para URL
## Angulo unico (como nos diferenciamos de competidores)
## 3-5 preguntas clave que el post debe responder
## Estructura del post (secciones con H2/H3)
## Puntos clave a cubrir en cada seccion
## Enlaces de autoridad a citar
## Keywords target (primarias + secundarias)
## CTAs recomendados

El tono debe ser: directo, sin relleno, basado en datos y experiencia real."""
    
    result = call_llm(brief_prompt, max_tokens=4000)
    return result

def main():
    if len(sys.argv) < 2:
        print("Usage: python3 blog-research.py '<topic>'")
        print("Example: python3 blog-research.py 'meta ads ecommerce 2026'")
        sys.exit(1)
    
    topic = sys.argv[1]
    log("[START] Researching topic: %s" % topic)
    
    brief = generate_content_brief(topic)
    
    print("\n" + "="*60)
    print("CONTENT BRIEF")
    print("="*60)
    print(brief)
    print("="*60)
    
    slug = re.sub(r'[^a-z0-9]+', '-', topic.lower()).strip('-')
    os.makedirs("/root/blog-briefs", exist_ok=True)
    filename = "/root/blog-briefs/%s-brief.md" % slug
    with open(filename, "w") as f:
        f.write("# Content Brief: %s\n\n" % topic)
        f.write(brief)
        f.write("\n\n---\nGenerated: %s" % time.strftime("%Y-%m-%d %H:%M"))
    
    log("[DONE] Brief saved to: %s" % filename)

if __name__ == "__main__":
    main()