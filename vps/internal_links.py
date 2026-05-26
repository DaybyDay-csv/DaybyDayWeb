#!/usr/bin/env python3
"""
internal_links.py — Build topical authority clusters via semantic internal linking.
Clusters aligned with DayByDay's Growth Partner positioning.
Adds contextual <Link> references within article body.
"""
import json, re, os, sys
from pathlib import Path

BLOG_DIR = Path("/root/projects/DaybyDay/src/pages/blog")

def slug_to_filename(slug):
    """Convert kebab-case slug to CamelCase Page filename."""
    parts = slug.split("-")
    camel = "".join(p.capitalize() for p in parts)
    return BLOG_DIR / f"{camel}Page.jsx"


# Cluster definitions — Growth Partner positioning at center
CLUSTERS = {
    "growth-partner": {
        "pillar": "growth-partner-vs-agencia-paid-media",
        "label": "Growth Partner",
        "posts": [
            "growth-partner-vs-agencia-paid-media",
            "moat-real-d2c-era-ia",
            "que-no-automatiza-ia-d2c",
            "juicio-cross-funcional-founder-d2c",
            "rol-media-buyer-2027",
            "metodologia-daybyday",
        ],
    },
    "scaling-metrics": {
        "pillar": "cac-vs-ltv-ecommerce-escalable",
        "label": "Unit Economics & Scaling",
        "posts": [
            "cac-vs-ltv-ecommerce-escalable",
            "cac-blended-vs-cac-canal-ecommerce",
            "cohort-analysis-ecommerce-d2c",
            "suscripciones-ecommerce-ltv-cac-d2c",
            "margen-contribucion-vs-roas-ecommerce",
            "aumentar-aov-ecommerce-d2c-palancas",
            "decision-cuando-subir-precio-d2c",
            "customer-journey-d2c-primer-impacto-repeticion",
            "email-marketing-meta-ads-ltv-d2c",
        ],
    },
    "paid-ads-execution": {
        "pillar": "guia-meta-ads-ecommerce-d2c-espana-2026",
        "label": "Meta Ads Execution",
        "posts": [
            "guia-meta-ads-ecommerce-d2c-espana-2026",
            "ab-testing-meta-ads-que-testar-primero",
            "creative-testing-meta-ads",
            "cuanto-invertir-meta-ads-calculadora",
            "presupuesto-minimo-meta-ads-ecommerce",
            "cbo-vs-abo-meta-ads-2026-d2c",
            "advantage-plus-shopping-cuando-usarlo-no",
            "remarketing-dinamico-ecommerce-guia-practica",
            "retargeting-meta-ads-ecommerce-2026",
            "cro-landing-page-meta-ads-d2c",
            "caso-exito-ecommerce-d2c-roas-meta-ads",
            "buen-roas-por-nicho-benchmarks-2026",
            "benchmark-roas-sector-espana-2026",
            "como-mejorar-roas-meta-ads-7-palancas",
            "escalar-campanas-meta-ads-sin-romper-roas",
            "escalar-ecommerce-d2c-100k-1m-paid-media",
            "escalar-meta-ads",
            "audiencias-lookalike-meta-alta-calidad",
            "ad-fatigue-meta-ads-rotacion-creativa",
            "combinar-google-ads-meta-ads-d2c",
            "performance-max-vs-meta-ads-espana",
            "performance-max-ecommerce-d2c-cuando-usar",
            "tiktok-ads-ecommerce-d2c-espana-2026",
            "por-que-anuncios-meta-no-convierten",
            "black-friday-meta-ads-d2c-preparacion",
        ],
    },
    "ai-automation": {
        "pillar": "ai-proof-skills-founder-d2c-2027",
        "label": "AI & Automation",
        "posts": [
            "ai-proof-skills-founder-d2c-2027",
            "automatizacion-paid-media-proximos-24-meses",
            "automatizaciones-reglas-meta-ads-manager",
            "ia-marketing-digital",
            "automatizacion-marketing",
            "tareas-automatizar",
            "server-side-tracking-shopify-conversions-api",
            "ios-atribucion-meta-ads-2026-d2c",
            "guia-api-conversiones-meta-shopify",
            "ga4-meta-ads-eventos-custom-d2c",
            "pixel-meta-hibrido-cliente-servidor",
            "pixel-meta-hibrido-cliente-servidor-implementacion",
        ],
    },
    "agency-selection": {
        "pillar": "como-elegir-agencia-meta-ads-ecommerce",
        "label": "Agency & Team Selection",
        "posts": [
            "como-elegir-agencia-meta-ads-ecommerce",
            "agencia-paid-media-vs-generalista",
            "agencia-vs-inhouse",
            "senales-agencia-no-rinde",
            "checklist-auditoria-campanas-paid-media",
            "cuanto-cuesta-agencia-paid-media",
            "cuanto-cobra-media-buyer",
            "media-buyer-vs-agencia",
            "top-agencias-marketing",
            "mejores-agencias-paid-media",
            "que-es-un-media-buyer",
            "preguntas-contratar-agencia-paid-media",
        ],
    },
}

SLUG_TO_CLUSTERS = {}
for cid, cluster in CLUSTERS.items():
    for post in cluster["posts"]:
        SLUG_TO_CLUSTERS.setdefault(post, []).append(cid)


ANCHOR_TEXT = {
    "growth-partner-vs-agencia-paid-media": ("growth partner", "frente a agencia tradicional"),
    "moat-real-d2c-era-ia": ("moat real en D2C en la era IA", "ventaja sostenible"),
    "que-no-automatiza-ia-d2c": ("lo que la IA no automatiza", "criterio humano indispensable"),
    "juicio-cross-funcional-founder-d2c": ("juicio cross-funcional del founder", "decisiones que la IA no toma"),
    "rol-media-buyer-2027": ("rol del media buyer en 2027", "human judgment como ventaja"),
    "metodologia-daybyday": ("metodología DayByDay", "cómo aplicamos growth partner"),
    "cac-vs-ltv-ecommerce-escalable": ("CAC vs LTV", "la métrica que determina si escala de verdad"),
    "cac-blended-vs-cac-canal-ecommerce": ("CAC por canal", "coste real de adquisición por fuente"),
    "cohort-analysis-ecommerce-d2c": ("análisis de cohorte en D2C", "datos para decidir con rigor"),
    "suscripciones-ecommerce-ltv-cac-d2c": ("modelo de suscripciones D2C", "LTV y recurrencia"),
    "margen-contribucion-vs-roas-ecommerce": ("margen de contribución", "la métrica que importa más que ROAS"),
    "aumentar-aov-ecommerce-d2c-palancas": ("cómo aumentar AOV", "palancas para subir ticket medio"),
    "guia-meta-ads-ecommerce-d2c-espana-2026": ("guía completa de Meta Ads para D2C", "estrategia integral"),
    "ab-testing-meta-ads-que-testar-primero": ("A/B testing en Meta Ads", "qué testear primero con rigor"),
    "creative-testing-meta-ads": ("creative testing de Meta Ads", "framework para testear creatividades"),
    "cuanto-invertir-meta-ads-calculadora": ("cuánto invertir en Meta Ads", "presupuesto según tu fase"),
    "presupuesto-minimo-meta-ads-ecommerce": ("presupuesto mínimo Meta Ads", "cuánto necesitas para que funcione"),
    "cbo-vs-abo-meta-ads-2026-d2c": ("CBO vs ABO en Meta Ads", "qué estructura funciona mejor en 2026"),
    "advantage-plus-shopping-cuando-usarlo-no": (" Advantage+ Shopping", "cuándo sí y cuándo no"),
    "remarketing-dinamico-ecommerce-guia-practica": ("remarketing dinámico", "cómo activar el producto correcto"),
    "retargeting-meta-ads-ecommerce-2026": ("retargeting en Meta Ads", "best practices actualizadas"),
    "cro-landing-page-meta-ads-d2c": ("CRO para landing page de Meta Ads", "optimizar conversión desde el anuncio"),
    "caso-exito-ecommerce-d2c-roas-meta-ads": ("caso de éxito ROAS D2C", "resultado real con metodología"),
    "benchmark-roas-sector-espana-2026": ("benchmark de ROAS por sector", "a qué aspirar en tu nicho"),
    "como-mejorar-roas-meta-ads-7-palancas": ("7 palancas para mejorar ROAS", "framework completo"),
    "escalar-campanas-meta-ads-sin-romper-roas": ("escalar sin romper ROAS", "protocolo de escalado"),
    "ai-proof-skills-founder-d2c-2027": ("AI proof skills para founders", "qué capacidades necesitas en 2027"),
    "automatizacion-paid-media-proximos-24-meses": ("automatización de paid media", "qué viene en 24 meses"),
    "automatizaciones-reglas-meta-ads-manager": ("automatizaciones en Meta Ads Manager", "reglas que ahorran tiempo"),
    "ia-marketing-digital": ("IA en marketing digital", "aplicaciones prácticas para D2C"),
    "como-elegir-agencia-meta-ads-ecommerce": ("cómo elegir agencia de Meta Ads", "criterios para evaluar"),
    "agencia-vs-inhouse": ("agencia vs equipo interno", "pros, contras y cuándo cada uno"),
    "senales-agencia-no-rinde": ("señales de que tu agencia no rinde", "cómo detectar el problema"),
    "checklist-auditoria-campanas-paid-media": ("checklist de auditoría", "qué revisar en tus campañas"),
    "decision-cuando-subir-precio-d2c": ("cuándo subir precios en D2C", "señal de que es el momento"),
    "email-marketing-meta-ads-ltv-d2c": ("email marketing para LTV", "cómo combinar con Meta Ads"),
    "ad-fatigue-meta-ads-rotacion-creativa": ("ad fatigue en Meta Ads", "cómo evitar la rotación"),
    "combinar-google-ads-meta-ads-d2c": ("combinar Google Ads y Meta Ads", "estrategia cross-channel cross-platform"),
    "performance-max-vs-meta-ads-espana": ("Performance Max vs Meta Ads", "cuándo usar cada uno"),
    "tiktok-ads-ecommerce-d2c-espana-2026": ("TikTok Ads para D2C España", "oportunidad en 2026"),
    "por-que-anuncios-meta-no-convierten": ("por qué tus anuncios no convierten", "diagnóstico sistemático"),
    "black-friday-meta-ads-d2c-preparacion": ("preparación Black Friday Meta Ads", "checklist para actuar"),
    "customer-journey-d2c-primer-impacto-repeticion": ("customer journey D2C", "del primer impacto a la repetición de compra"),
    "pixel-meta-hibrido-cliente-servidor": ("pixel híbrido Meta Ads", "client-side + server-side para máxima cobertura"),
    "pixel-meta-hibrido-cliente-servidor-implementacion": ("implementación del pixel híbrido", "paso a paso client + server"),
}


def get_existing_links(content):
    return set(re.findall(r'<Link to="/blog/([^"]+)"', content))


def add_contextual_links(content, slug, verbose=False):
    """Add cluster links as contextual inline references."""
    if slug not in SLUG_TO_CLUSTERS:
        return content, []

    existing = get_existing_links(content)
    added = []

    for cluster_id in SLUG_TO_CLUSTERS[slug]:
        cluster = CLUSTERS[cluster_id]
        for other_slug in cluster["posts"]:
            if other_slug == slug or other_slug in existing:
                continue

            anchor_words, ctx = ANCHOR_TEXT.get(other_slug, (other_slug.replace("-", " "), ""))
            link = f'<Link to="/blog/{other_slug}" className="text-white font-semibold hover:text-white/80">{anchor_words}</Link>'

            # Find a paragraph to insert into — look for natural insertion points
            # Strategy: find paragraphs that mention related concept words
            keywords = other_slug.replace("-", " ").split()[:3]
            pattern = r'(<p[^>]*>(?:(?!</p>|<Link).)*?)(\s+)(</p>)'

            inserted = False
            for m in re.finditer(pattern, content, re.DOTALL):
                para_before = m.group(1)
                # Skip if already has this link or other cluster links
                if other_slug in para_before or '</Link>' not in para_before[-50:]:
                    continue
                # Find a sentence break near end of paragraph to add inline reference
                text_part = para_before
                # Insert before the last sentence if there's a long enough paragraph
                if len(text_part) > 100:
                    new_para = text_part.rstrip() + f" {link}."
                    content = content[:m.start(1)] + new_para + m.group(3) + content[m.end():]
                    inserted = True
                    break

            if inserted:
                added.append(other_slug)
                existing.add(other_slug)

    return content, added


def process_all():
    results = []
    for cluster_id, cluster in CLUSTERS.items():
        for slug in cluster["posts"]:
            path = slug_to_filename(slug)
            if not path.exists():
                results.append({"slug": slug, "status": "file_not_found"})
                continue

            content = path.read_text()
            existing_before = len(get_existing_links(content))
            content, added = add_contextual_links(content, slug)
            existing_after = len(get_existing_links(content))

            if added:
                path.write_text(content)
                results.append({
                    "slug": slug,
                    "status": "updated",
                    "links_added": added,
                    "total_links": existing_after,
                })
            else:
                results.append({
                    "slug": slug,
                    "status": "no_change",
                    "total_links": existing_before,
                })

    return results


if __name__ == "__main__":
    dry_run = "--dry-run" in sys.argv
    verbose = "--verbose" in sys.argv or "-v" in sys.argv

    results = process_all()
    updated = [r for r in results if r["status"] == "updated"]
    not_found = [r for r in results if r["status"] == "file_not_found"]

    print(f"=== Internal Linking Report ===")
    print(f"Updated: {len(updated)} | No change: {len([r for r in results if r['status'] == 'no_change'])} | Not found: {len(not_found)}")

    if verbose or not dry_run:
        for r in updated:
            print(f"  ✅ {r['slug']}: +{len(r['links_added'])} links → {r['links_added']}")

    if not_found:
        print(f"\n  Not found ({len(not_found)}): {[r['slug'] for r in not_found[:10]]}")

    if dry_run:
        print("\n(Dry run — no files written)")