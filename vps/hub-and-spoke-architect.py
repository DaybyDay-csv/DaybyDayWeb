#!/usr/bin/env python3
"""
hub-and-spoke-architect.py — Topical hub-and-spoke SEO restructuring.

For each blog cluster, identifies or creates a pillar (hub) article,
maps spoke articles, and generates interlinking recommendations.

Usage:
  python3 /root/scripts/hub-and-spoke-architect.py --cluster meta-ads-roas
  python3 /root/scripts/hub-and-spoke-architect.py --all-clusters
  python3 /root/scripts/hub-and-spoke-architect.py --audit
  python3 /root/scripts/hub-and-spoke-architect.py --inject-hubs  # add hub links to all spokes
"""

import argparse
import json
import os
import re
import sys
from collections import defaultdict

BLOG_DIR = "/root/projects/DaybyDay/src/pages/blog"
STATE_FILE = "/root/projects/DaybyDay/seo-plan/hub-spoke-state.json"

# Pre-defined topical clusters with pillar candidates
# Pillar = broadest, most comprehensive article in the cluster
CLUSTERS = {
    "meta-ads-roas": {
        "pillar": "como-mejorar-roas-meta-ads-7-palancas",
        "spokes": [
            "buen-roas-por-nicho-benchmarks-2026",
            "caso-exito-ecommerce-d2c-roas-meta-ads",
            "margen-contribucion-vs-roas-ecommerce",
            "escalar-campanas-meta-ads-sin-romper-roas",
            "benchmark-roas-sector-espana-2026",
        ],
        "description": "ROAS optimization and profitability"
    },
    "meta-ads-creative-testing": {
        "pillar": "creative-testing-meta-ads",
        "spokes": [
            "ab-testing-meta-ads-que-testar-primero",
            "ad-fatigue-meta-ads-rotacion-creativa",
            "framework-hipotesis-creatividades-meta-ads",
            "meta-ads-creative-testing-2026-d2c",
        ],
        "description": "Creative testing and iteration frameworks"
    },
    "tracking-attribution": {
        "pillar": "server-side-tracking-shopify-conversions-api",
        "spokes": [
            "guia-api-conversiones-meta-ads-shopify",
            "pixel-meta-hibrido-cliente-servidor",
            "pixel-meta-hibrido-cliente-servidor-implementacion",
            "modelos-atribucion-ecommerce-d2c",
            "cbo-vs-abo-meta-ads-2026-d2c",
            "ga4-meta-ads-eventos-custom-d2c",
            "ios-atribucion-meta-ads-2026-d2c",
            "incrementality-testing-meta-ads-d2c",
        ],
        "description": "Tracking, attribution, and server-side setup"
    },
    "ecommerce-growth": {
        "pillar": "escalar-ecommerce-d2c-100k-1m-paid-media",
        "spokes": [
            "aumentar-aov-ecommerce-d2c-palancas",
            "escalar-campanas-meta-ads-sin-romper-roas",
            "decision-cuando-subir-precio-d2c",
            "customer-journey-d2c",
            "suscripciones-ecommerce-ltv-cac-d2c",
            "cac-vs-ltv-ecommerce-escalable",
        ],
        "description": "eCommerce scaling and unit economics"
    },
    "meta-ads-campaign-management": {
        "pillar": "guia-meta-ads-ecommerce-d2c-espana-2026",
        "spokes": [
            "ad-fatigue-meta-ads-rotacion-creativa",
            "automatizaciones-reglas-meta-ads-manager",
            "estrategias-puja-meta-ads",
            "cbo-vs-abo-meta-ads-2026-d2c",
        ],
        "description": "Campaign management and bidding strategies"
    },
    "agency": {
        "pillar": "elegir-agencia-meta-ads",
        "spokes": [
            "agencia-paid-media-vs-generalista",
            "agencia-vs-inhouse",
            "como-elegir-agencia-meta-ads-ecommerce",
            "cuanto-cobra-media-buyer",
            "cuanto-cuesta-agencia-paid-media",
            "media-buyer-vs-agencia",
            "growth-partner-vs-agencia-paid-media",
            "senales-agencia-no-rinde",
        ],
        "description": "Agency selection and engagement"
    },
    "ai-automation": {
        "pillar": "automatizacion-marketing",
        "spokes": [
            "automatizacion-paid-media-proximos-24-meses",
            "ai-proof-skills-founder-d2c-2027",
            "que-no-automatiza-ia-d2c",
            "tareas-automatizar",
            "ia-marketing-digital",
            "moat-real-d2c-era-ia",
        ],
        "description": "AI and marketing automation"
    },
    "paid-media-general": {
        "pillar": "que-es-paid-media",
        "spokes": [
            "que-es-un-media-buyer",
            "estado-paid-media-d2c-espana-2026",
            "paid-media-generalista",
        ],
        "description": "Paid media fundamentals"
    },
    "meta-ads-audiences": {
        "pillar": "audiencias-lookalike-meta-alta-calidad",
        "spokes": [
            "retargeting-meta-ads-ecommerce-2026",
            "remarketing-dinamico-ecommerce-guia-practica",
        ],
        "description": "Audience targeting and remarketing"
    },
    "meta-ads-shopping-dpa": {
        "pillar": "advantage-plus-shopping-cuando-usarlo-no",
        "spokes": [
            "dynamic-product-ads-meta-shopify",
            "performance-max-ecommerce-d2c-cuando-usar",
        ],
        "description": "Shopping ads and dynamic product ads"
    },
    "roas-metrics": {
        "pillar": "metricas-meta-ads-importantes-ecommerce",
        "spokes": [
            "roas",
            "cpa",
            "cac-blended-vs-cac-canal-ecommerce",
            "marketing-mix-modeling-ecommerce-d2c",
            "cohort-analysis-ecommerce-d2c",
        ],
        "description": "KPIs and measurement frameworks"
    },
    "full-funnel": {
        "pillar": "estrategia-full-funnel-d2c",
        "spokes": [
            "full-funnel-meta-ads",
            "adquisicion-vs-retencion-paid-media-d2c",
            "combinar-google-ads-meta-ads-d2c",
        ],
        "description": "Full-funnel strategy and multi-channel"
    },
}


def slug_to_filename(slug):
    """Convert a URL slug to its JSX filename."""
    # Handle both kebab-case and CamelCase slug formats
    if "-" in slug:
        return f"{slug}Page.jsx"
    # CamelCase: add spaces before capitals, then convert
    words = re.findall('[A-Z][a-z]+|[a-z]+', slug)
    kebab = "-".join(w.lower() for w in words)
    return f"{kebab}Page.jsx"


def get_post_title(slug, blog_dir=BLOG_DIR):
    """Extract title from a blog post file."""
    fname = slug_to_filename(slug)
    path = os.path.join(blog_dir, fname)
    if not os.path.exists(path):
        # Try direct search
        for f in os.listdir(blog_dir):
            if f.replace('Page.jsx', '').lower() == slug.lower():
                path = os.path.join(blog_dir, f)
                break
    if not os.path.exists(path):
        return None
    content = open(path, errors='replace').read()
    m = re.search(r'export\s+const\s+metadata\s*=\s*\{[^}]*title:\s*["\']([^"\']+)', content)
    return m.group(1).strip() if m else None


def get_existing_links(slug, blog_dir=BLOG_DIR):
    """Get existing internal blog links from a post."""
    fname = slug_to_filename(slug)
    path = os.path.join(blog_dir, fname)
    if not os.path.exists(path):
        return []
    content = open(path, errors='replace').read()
    return re.findall(r'<Link[^>]+to=["\']/blog/([^"\']+)["\']', content)


def audit(args):
    """Audit current hub-and-spoke compliance."""
    print("=== HUB-AND-SPOKE AUDIT ===\n")
    
    all_issues = []
    
    for cluster_id, cluster in CLUSTERS.items():
        pillar = cluster["pillar"]
        spokes = cluster["spokes"]
        
        # Check pillar exists
        pillar_file = slug_to_filename(pillar)
        pillar_path = os.path.join(BLOG_DIR, pillar_file)
        if not os.path.exists(pillar_path):
            all_issues.append(f"  [MISSING] Pillar '{pillar}' ({pillar_file}) not found")
            continue
        
        # Check each spoke links TO the pillar
        for spoke in spokes:
            spoke_file = slug_to_filename(spoke)
            spoke_path = os.path.join(BLOG_DIR, spoke_file)
            if not os.path.exists(spoke_path):
                all_issues.append(f"  [MISSING] Spoke '{spoke}' ({spoke_file}) not found")
                continue
            
            existing = get_existing_links(spoke)
            if pillar not in existing:
                spoke_title = get_post_title(spoke)
                pillar_title = get_post_title(pillar)
                all_issues.append(f"  [NO LINK] '{spoke_title or spoke}' → pillar '{pillar_title or pillar}'")
        
        # Check pillar links TO some spokes (hub behavior)
        pillar_links = get_existing_links(pillar)
        linked_spokes = [s for s in spokes if s in pillar_links]
        if len(linked_spokes) < min(3, len(spokes)):
            pillar_title = get_post_title(pillar)
            print(f"CLUSTER {cluster_id}: pillar '{pillar_title or pillar}' links to {len(linked_spokes)}/{len(spokes)} spokes")
            print(f"  Cluster: {cluster['description']}")
    
    if all_issues:
        print(f"\nISSUES ({len(all_issues)}):")
        for issue in all_issues:
            print(issue)
    else:
        print("No issues found — all spokes link to their pillars.")
    
    return all_issues


def inject_hubs(args):
    """Add hub (pillar) links to all spoke articles that are missing them."""
    print("=== INJECTING HUB LINKS INTO SPOKES ===\n")
    
    changes = []
    
    for cluster_id, cluster in CLUSTERS.items():
        pillar = cluster["pillar"]
        pillar_title = get_post_title(pillar) or pillar
        
        for spoke in cluster["spokes"]:
            fname = slug_to_filename(spoke)
            path = os.path.join(BLOG_DIR, fname)
            if not os.path.exists(path):
                print(f"  SKIP {spoke}: file not found")
                continue
            
            content = open(path, errors='replace').read()
            existing = get_existing_links(spoke)
            
            if pillar in existing:
                continue  # already links to pillar
            
            # Find a good insertion point: after the first paragraph or in a related section
            # We look for a <p> tag to insert a paragraph with a link after it
            spoke_title = get_post_title(spoke) or spoke
            
            # Insert link paragraph before the first FaqSection or at end of intro
            # Pattern: find </p> after roughly the first 2 paragraphs
            insert_text = f'<p>Si quieres profundizar, consulta nuestra guía completa sobre <Link to="/blog/{pillar}">{pillar_title}</Link>.</p>'
            
            # Try to insert after the 2nd </p> in the main content
            p_count = content.count('</p>')
            if p_count >= 2:
                # Find second </p>
                parts = content.split('</p>', 2)
                if len(parts) >= 3:
                    new_content = parts[0] + '</p>' + parts[1] + '</p>\n            {insert_text}' + parts[2]
                else:
                    new_content = None
            else:
                new_content = None
            
            if new_content and new_content != content:
                with open(path, 'w') as f:
                    f.write(new_content)
                changes.append(f"  + {spoke} → /blog/{pillar}")
            else:
                # Append before closing return or at file end
                print(f"  DEFER {spoke}: complex insertion needed")
    
    print(f"\n{len(changes)} spoke→pillar links added:")
    for c in changes:
        print(c)
    
    if changes:
        print(f"\nWrote {len(changes)} files. Commit and push manually.")
    
    return changes


def cluster_report(args):
    """Print a full topical cluster report."""
    print("=== TOPICAL CLUSTER MAP ===\n")
    
    for cluster_id, cluster in sorted(CLUSTERS.items()):
        pillar = cluster["pillar"]
        pillar_title = get_post_title(pillar) or pillar
        spokes = cluster["spokes"]
        
        print(f"CLUSTER: {cluster_id}")
        print(f"  Description: {cluster['description']}")
        print(f"  PILLAR ({len(spokes)} spokes): {pillar_title} (/blog/{pillar})")
        
        # Check existing links to pillar
        existing_incoming = []
        for spoke in spokes:
            if get_existing_links(spoke):
                pass
        
        for spoke in spokes[:5]:
            spoke_title = get_post_title(spoke) or spoke
            spoke_links = get_existing_links(spoke)
            has_pillar_link = pillar in spoke_links
            print(f"    {'✓' if has_pillar_link else '✗'} {spoke_title} (/blog/{spoke})")
        if len(spokes) > 5:
            print(f"    ... +{len(spokes)-5} more")
        print()


def main():
    parser = argparse.ArgumentParser(description="Hub-and-spoke SEO architect")
    parser.add_argument("--cluster", help="Specific cluster to analyze")
    parser.add_argument("--all-clusters", action="store_true", help="Full cluster report")
    parser.add_argument("--audit", action="store_true", help="Audit link compliance")
    parser.add_argument("--inject-hubs", action="store_true", help="Add pillar links to all spokes")
    parser.add_argument("--dry-run", action="store_true", help="Don't write files")
    args = parser.parse_args()

    if args.all_clusters or args.cluster:
        cluster_report(args)
    elif args.audit:
        issues = audit(args)
        sys.exit(0 if not issues else 1)
    elif args.inject_hubs:
        changes = inject_hubs(args)
        sys.exit(0)
    else:
        parser.print_help()


if __name__ == "__main__":
    main()