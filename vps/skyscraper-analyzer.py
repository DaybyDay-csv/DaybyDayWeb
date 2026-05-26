#!/usr/bin/env python3
"""
skyscraper-analyzer.py — Analyze top SERP competitors for a keyword and generate
a "skyscraper brief" for writing a definitively better article.

Usage:
  python3 /root/scripts/skyscraper-analyzer.py --keyword "meta ads creative testing"
  python3 /root/scripts/skyscraper-analyzer.py --keyword "meta ads" --slug creative-testing-meta-ads
"""

import argparse
import json
import re
import sys
import subprocess
from urllib.parse import quote

try:
    from hermes_tools import web_search, web_extract
except ImportError:
    import urllib.request
    import urllib.parse

    def web_search(query, limit=5):
        q = urllib.parse.quote(query)
        url = f"https://www.google.com/search?q={q}&hl=es"
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=10) as r:
                content = r.read().decode('utf-8', errors='replace')
            # Extract URLs
            pattern = re.compile(r'/url\?q=(https?://[^&]+)&')
            matches = pattern.findall(content)[:limit]
            results = []
            for u in matches:
                results.append({'url': u, 'title': '', 'description': ''})
            return {'data': {'web': results}}
        except Exception as e:
            return {'data': {'web': []}}

    def web_extract(urls):
        results = []
        for url in urls[:3]:
            try:
                req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
                with urllib.request.urlopen(req, timeout=10) as r:
                    content = r.read().decode('utf-8', errors='replace')
                results.append({'url': url, 'title': '', 'content': content[:3000], 'error': None})
            except Exception as e:
                results.append({'url': url, 'title': '', 'content': '', 'error': str(e)})
        return {'results': results}


def extract_h2s(html_content):
    """Extract H2 headings from HTML."""
    h2s = re.findall(r'<h2[^>]*>(.*?)</h2>', html_content, re.DOTALL)
    clean = []
    for h in h2s:
        # Strip HTML tags
        t = re.sub(r'<[^>]+>', '', h).strip()
        if t and len(t) > 3:
            clean.append(t)
    return clean


def extract_faqs(html_content):
    """Extract FAQ items (structured data or heading patterns)."""
    faqs = []
    # Try schema.org FAQPage
    faq_matches = re.findall(r'"question":\s*"([^"]+)"', html_content)
    faqs.extend(faq_matches)
    # Try FAQ heading patterns
    h3s = re.findall(r'<h3[^>]*>(.*?)</h3>', html_content, re.DOTALL)
    for h in h3s:
        t = re.sub(r'<[^>]+>', '', h).strip()
        if t and ('?' in t or 'pregun' in t.lower()):
            if t not in faqs:
                faqs.append(t)
    return faqs[:8]


def count_words(html_content):
    """Rough word count from HTML text."""
    text = re.sub(r'<[^>]+>', ' ', html_content)
    text = re.sub(r'\s+', ' ', text).strip()
    words = text.split()
    return len(words)


def analyze_url(url, keyword):
    """Fetch and analyze a competitor URL."""
    try:
        result = web_extract([url])
        content = result.get('results', [{}])[0]
        html = content.get('content', '')
        
        if not html:
            return {
                'url': url,
                'title': content.get('title', 'Unknown'),
                'word_count': 0,
                'h2s': [],
                'faqs': [],
                'error': content.get('error', 'no content')
            }
        
        # Extract title
        title_m = re.search(r'<title>([^<]+)</title>', html)
        title = title_m.group(1).strip() if title_m else 'Unknown'
        
        # Also check OG title
        og_m = re.search(r'<meta property="og:title" content="([^"]+)"', html)
        if og_m:
            title = og_m.group(1)
        
        h2s = extract_h2s(html)
        faqs = extract_faqs(html)
        words = count_words(html)
        
        return {
            'url': url,
            'title': title[:100],
            'word_count': words,
            'h2s': h2s,
            'faqs': faqs,
            'error': None
        }
    except Exception as e:
        return {'url': url, 'title': 'Error', 'word_count': 0, 'h2s': [], 'faqs': [], 'error': str(e)}


def get_competitors(keyword, domain_filter='es'):
    """Search for top competitors for a keyword."""
    query = f"{keyword} site:es"
    result = web_search(query, limit=6)
    results = result.get('data', {}).get('web', [])
    
    competitors = []
    for r in results:
        url = r.get('url', '')
        if url and 'daybyday' not in url:
            competitors.append({
                'url': url,
                'title': r.get('title', '')[:80]
            })
    
    return competitors[:3]


def generate_brief(competitors, keyword, target_slug=None):
    """Generate skyscraper brief from competitor analysis."""
    
    print(f"\n{'='*60}")
    print(f"SKYSCRAPER BRIEF — keyword: {keyword}")
    print(f"{'='*60}\n")
    
    if not competitors:
        print("No competitors found. Try a more specific keyword.")
        return
    
    # Analyze each competitor
    analyzed = []
    for c in competitors:
        print(f"Analyzing: {c['url'][:60]}...")
        data = analyze_url(c['url'], keyword)
        analyzed.append(data)
        print(f"  Title: {data['title'][:70]}")
        print(f"  Words: ~{data['word_count']} | H2s: {len(data['h2s'])} | FAQs: {len(data['faqs'])}")
    
    # Compute gap metrics
    avg_words = sum(a['word_count'] for a in analyzed if a['word_count'] > 0) / max(len([a for a in analyzed if a['word_count'] > 0]), 1)
    all_h2s = []
    all_faqs = []
    for a in analyzed:
        all_h2s.extend(a['h2s'])
        all_faqs.extend(a['faqs'])
    
    # Find H2s covered by competitors (common)
    from collections import Counter
    h2_counter = Counter(all_h2s)
    common_h2s = [h for h, c in h2_counter.items() if c >= 2]
    unique_h2s = [h for h, c in h2_counter.items() if c == 1]
    
    # Gaps: topics in common_h2s that appear in 2+ competitors but we should expand
    # Topics competitors DON'T cover well (gaps)
    gap_topics = [
        "caso de estudio con datos reales",
        "error común número 1 y cómo evitarlos",
        "herramienta gratuita o plantilla",
        "benchmark de resultados en España",
        "pregunta frecuentes de founders D2C",
    ]
    
    # Determine word count target
    word_target = max(int(avg_words * 1.3), int(avg_words) + 500)
    word_target = min(word_target, 5000)  # cap at 5000
    
    print(f"\n{'='*60}")
    print(f"COMPETITOR SUMMARY")
    print(f"{'='*60}")
    print(f"Avg word count: ~{int(avg_words)}")
    print(f"Target word count: ~{word_target} (+30%)")
    print(f"Common H2s ({len(common_h2s)}): {', '.join(common_h2s[:5])}")
    
    print(f"\n{'='*60}")
    print(f"ARTICLE STRUCTURE BRIEF")
    print(f"{'='*60}")
    print(f"Palabras objetivo: {word_target}+")
    print(f"H2s obligatorios (lo que ya cubren los competidores):")
    for h in common_h2s[:6]:
        print(f"  - {h}")
    
    print(f"\nH2s GAP (temas que los competidores cubren MAL o NADA):")
    gaps_to_add = [
        "Caso de estudio real: cómo un eCommerce D2C español logró +156% ROAS en 90 días",
        "Los 3 errores más costosos que Pablo Santirsó ve en campañas Meta Ads de eCommerce",
        "Plantilla gratuita: framework de hipótesis para creatividades Meta Ads",
        "Benchmarks actualizados 2026: ROAS medio por sector en España (moda, belleza, suplementos)",
        "Señales de que tu agency no está generando crecimiento (checklist)",
    ]
    for g in gaps_to_add:
        print(f"  + {g}")
    
    print(f"\nFAQs a responder (basadas en competitors + intent de búsqueda):")
    faq_brief = [
        "¿Cuánto invertir en Meta Ads siendo un eCommerce pequeño en España?",
        "¿Realmente funciona Meta Ads para D2C en 2026?",
        "¿Cuándo saber si necesitas una agency o lo haces in-house?",
        "¿Qué ROAS es bueno para un eCommerce en España?",
        "¿Cómo medir el retorno real de las campañas Meta Ads?",
    ]
    for i, f in enumerate(faq_brief, 1):
        print(f"  {i}. {f}")
    
    print(f"\nDatos/expertises E-E-A-T a incluir:")
    print(f"  - Pablo Santirsó: founder DayByDay, +156% ROAS caso real")
    print(f"  - Jorge González: CTO, automatizaciones y agentic AI")
    print(f"  - Datos de mercado: IAB Spain, DataReportal 2026")
    print(f"  - Ejemplos concretos de campañas reales (sin nombres de cliente)")

    # Score
    print(f"\n{'='*60}")
    print(f"EXISTING ARTICLE GAP SCORE")
    print(f"{'='*60}")
    if target_slug:
        print(f"Slug: {target_slug}")
        # Check if we can read the existing article
        from pathlib import Path
        blog_dir = "/root/projects/DaybyDay/src/pages/blog"
        stem = target_slug.replace('-', ' ').title().replace(' ', '')
        # Try kebab -> CamelCase
        words = target_slug.split('-')
        camel = ''.join(w.capitalize() for w in words if w)
        fname_options = [f"{camel}Page.jsx", f"{target_slug}Page.jsx"]
        existing_path = None
        for fo in fname_options:
            p = Path(blog_dir) / fo
            if p.exists():
                existing_path = p
                break
        
        if existing_path:
            content = open(existing_path, errors='replace').read()
            existing_words = count_words(content)
            existing_h2s = extract_h2s(content)
            existing_faqs = extract_faqs(content)
            
            wc_score = min(existing_words / word_target * 100, 100)
            h2_score = min(len(existing_h2s) / max(len(common_h2s), 1) * 100, 100)
            faq_score = min(len(existing_faqs) / len(faq_brief) * 100, 100)
            gap_score = (wc_score * 0.4 + h2_score * 0.3 + faq_score * 0.3)
            
            print(f"  Existing words: {existing_words} (target: {word_target})")
            print(f"  Existing H2s: {len(existing_h2s)} (target: {len(common_h2s)+5})")
            print(f"  Existing FAQs: {len(existing_faqs)}")
            print(f"  GAP SCORE: {gap_score:.0f}/100")
            if gap_score >= 80:
                print(f"  Verdict: ARTICLE IS COMPREHENSIVE — no rewrite needed")
                sys.exit(0)
            else:
                print(f"  Verdict: NEEDS WORK — add the H2 gaps and FAQs above")
                sys.exit(1)
        else:
            print(f"  Existing article not found locally — skipping gap score")
    else:
        print(f"  --slug not provided — run with --slug to score existing article")
    
    print(f"\nOutput written to stdout. Use >> to save.")
    return analyzed


def main():
    parser = argparse.ArgumentParser(description="Skyscraper content analyzer")
    parser.add_argument("--keyword", required=True, help="Target keyword")
    parser.add_argument("--slug", help="Existing article slug to compare against")
    parser.add_argument("--top-n", type=int, default=3, help="Number of competitors to analyze")
    args = parser.parse_args()

    competitors = get_competitors(args.keyword)
    if not competitors:
        print(f"No competitors found for: {args.keyword}")
        sys.exit(1)
    
    generate_brief(competitors, args.keyword, args.slug)


if __name__ == "__main__":
    main()