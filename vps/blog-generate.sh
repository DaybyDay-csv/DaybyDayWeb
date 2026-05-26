#!/bin/bash
# Blog Pipeline - MiniMax M2.5 Direct API (sin hermes)
# Uso: ./blog-generate.sh "<topic>" "<slug>" [category]
# Ejemplo: ./blog-generate.sh "Errores pixel Meta en Shopify" "errores-pixel-meta-shopify" "Tecnología"

set -euo pipefail

API_KEY=$(grep MINIMAX_API_KEY /root/.env | cut -d'=' -f2 | tr -d '"')
PROJECT_DIR="/root/projects/DaybyDay"

TOPIC="${1:-}"
SLUG="${2:-}"
CATEGORY="${3:-Estrategia}"

if [ -z "$TOPIC" ] || [ -z "$SLUG" ]; then
    echo "Uso: $0 <topic> <slug> [categoria]"
    exit 1
fi

# Page name from slug: "errores-pixel-meta-shopify" -> "ErroresPixelMetaShopifyPage"
PAGE_NAME=$(echo "$SLUG" | sed 's/-//g' | sed 's/^\(.\)/\U\1/')
PAGE_FILE="$PROJECT_DIR/src/pages/blog/${PAGE_NAME}Page.jsx"

echo "=== BLOG PIPELINE: $TOPIC ==="
echo "Slug: $SLUG"
echo "Category: $CATEGORY"
echo ""

# Verificar que no exista ya
if [ -f "$PAGE_FILE" ]; then
    echo "ERROR: Ya existe $PAGE_FILE"
    exit 1
fi

# 1. Generar contenido con MiniMax (API directa, sin hermes)
echo "[1/8] Generando contenido con MiniMax-M2.5..."

PROMPT="Post SEO para DayByDay Consulting. Tema: $TOPIC. Slug: $SLUG. Categoria: $CATEGORY.

REGLAS ESTRICTAS:
- Solo contenido en español, tono directo, sin corporativismo
- NO usar simbolos > ni < ni &gt; ni &lt; ni entities HTML
- NO inventar datos falsos ni porcentajes随口
- Minimo 900 palabras de contenido real
- Solo texto, SIN codigo, SIN markdown de codigo, SIN backticks

ESTRUCTURA DEL POST:
1. Parrafo de apertura (hook impactante, 2-3 frases)
2. Seccion 1: H2 con minimo 120 palabras
3. Seccion 2: H2 con minimo 120 palabras
4. Seccion 3: H2 con minimo 120 palabras
5. Seccion 4: H2 con minimo 120 palabras
6. Seccion 5: H2 con minimo 120 palabras
7. Seccion 6: H2 con minimo 120 palabras
8. Seccion 7: H2 con minimo 120 palabras
9. FAQ: 5 preguntas con respuestas detalladas
10. CTA final

ENLACES INTERNOS (OBLIGATORIOS):
Incluir 3-5 enlaces internos a posts reales del blog. Usar slugs existentes de esta lista:
- que-es-roas-meta-ads
- meta-ads-vs-google-ads
- como-reducir-cpa-ecommerce
- estrategias-puja-meta-ads
- escalar-meta-ads
- ugc-meta-ads
- remarketing-dinamico-ecommerce-guia-practica
- audiencias-lookalike-meta-alta-calidad
- ab-testing-meta-ads-que-testar-primero
- creative-testing-meta-ads
- automatizaciones-reglas-meta-ads-manager
- cro-landing-page-meta-ads-d2c
- avantage-plus-shopping-cuando-usarlo-no
- metricas-meta-ads-importantes-ecommerce

ENLACES EXTERNOS (OBLIGATORARIOS):
Incluir 1-2 enlaces externos reales a:
- https://developers.facebook.com/docs/meta-pixel
- https://www.shopify.com/es/docs/channels/facebook
- https://business.facebook.com/business/news/updates
- https://www.facebook.com/business/help/475538133218131

Cada enlace interno debe tener sentido contextual (no forzado).
Los enlaces internos se escriben como: [texto del enlace](/blog/SLUG)
Los enlaces externos como: [texto](https://...)"

RESPONSE=$(curl -s -X POST "https://api.minimax.io/v1/chat/completions" \
  -H "Authorization: Bearer PLACEHOLDER
  -H "Content-Type: application/json" \
  -d "$(cat <<EOF
{
  "model": "MiniMax-M2.5",
  "max_tokens": 3500,
  "temperature": 0.7,
  "messages": [
    {"role": "system", "content": "Eres copywriter SEO experto para ecommerce D2C español."},
    {"role": "user", "content": $(echo "$PROMPT" | python3 -c "import sys,json; print(json.dumps(sys.stdin.read()))")}
  ]
}
EOF
)")

# Extraer contenido limpio (quitar thinking tags)
CONTENT=$(echo "$RESPONSE" | python3 -c "
import sys,json,re
try:
    d=json.load(sys.stdin)
    c = d.get('choices',[{}])[0].get('message',{}).get('content','')
    # Remove thinking blocks
    c = re.sub(r'<think>.*?</think>', '', c, flags=re.DOTALL)
    # Remove any remaining HTML tags
    c = re.sub(r'<[^>]+>', '', c)
    print(c)
except Exception as e:
    print(f'ERROR: {e}', file=sys.stderr)
    sys.exit(1)
")

if [ -z "$CONTENT" ] || [ ${#CONTENT} -lt 500 ]; then
    echo "ERROR: Contenido vacio o muy corto"
    echo "Response: $(echo $RESPONSE | head -c 500)"
    exit 1
fi

echo "[2/8] Contenido generado (${#CONTENT} chars)"

# 3. Generar JSX
echo "[3/8] Generando JSX..."
node -e "
const content = \`$CONTENT\`;
const slug = '$SLUG';
const topic = '$TOPIC';
const category = '$CATEGORY';
const pageName = '$PAGE_NAME';

// Extract title (first H1)
const titleMatch = content.match(/^#\s+(.+)$/m);
const title = titleMatch ? titleMatch[1].trim() : topic;

// Extract description from first paragraphs (first 160 chars of main content)
const cleanContent = content.replace(/^#.*$/gm, '').replace(/^---.*$/gm, '').trim();
const description = cleanContent.slice(0, 160).replace(/\s+\S*$/, '') + '...';

// Extract H2 sections
const sections = [];
const h2Regex = /^##\s+(.+)$/gm;
let match;
while ((match = h2Regex.exec(content)) !== null) {
    const start = match.index + match[0].length;
    const end = content.indexOf('\n##', start) !== -1 ? content.indexOf('\n##', start) : content.length;
    const sectionTitle = match[1].trim();
    const sectionContent = content.slice(start, end).trim();
    sections.push({ title: sectionTitle, content: sectionContent });
}

// Extract FAQs (look for question patterns)
const faqMatches = content.match(/###?\s+[^?\n]+\??[\s\S]*?(?=(?:###|\n\n[A-Z]|$))/g) || [];
const faqs = faqMatches.slice(0, 6).map(f => {
    const lines = f.split('\n').filter(l => l.trim());
    const q = lines[0].replace(/^#+\s+/, '').trim();
    const a = lines.slice(1).join(' ').trim();
    return { q, a: a.slice(0, 300) };
});

// Extract links
const internalLinks = [];
const linkRegex = /\[([^\]]+)\]\(\/blog\/([^)]+)\)/g;
while ((match = linkRegex.exec(content)) !== null) {
    internalLinks.push({ text: match[1], slug: match[2] });
}

// Extract external links
const externalLinks = [];
const extLinkRegex = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g;
while ((match = extLinkRegex.exec(content)) !== null) {
    if (match[2].startsWith('http')) {
        externalLinks.push({ text: match[1], url: match[2] });
    }
}

// Count words
const wordCount = cleanContent.split(/\s+/).length;

console.log(JSON.stringify({
    title, description, slug, category, wordCount,
    sections: sections.slice(0, 7),
    faqs: faqs.slice(0, 5),
    internalLinks: internalLinks.slice(0, 5),
    externalLinks: externalLinks.slice(0, 2)
}, null, 2));
" > /tmp/blog-data.json

if [ ! -s /tmp/blog-data.json ]; then
    echo "ERROR: Fallo al generar datos del blog"
    exit 1
fi

# 4. Crear archivo JSX
echo "[4/8] Creando archivo JSX..."
PAGE_FILE="$PROJECT_DIR/src/pages/blog/${PAGE_NAME}Page.jsx"

# Generate JSX with node
node -e "
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('/tmp/blog-data.json', 'utf8'));

// Build FAQs array
const faqsCode = data.faqs.map((f, i) => \`  {
    q: \"\${f.q.replace(/\"/g, '\\\"')}\",
    a: \"\${f.a.replace(/\"/g, '\\\"')}\",
  }\`).join(',\n');

// Build sections content
const sectionsCode = data.sections.map(s => \`
    <h2 className=\"text-2xl font-black mt-10 mb-4\">\${s.title}</h2>
    <p className=\"text-white/70 leading-relaxed mb-5\">
      \${s.content.replace(/\n\n+/g, '</p>\n    <p className=\"text-white/70 leading-relaxed mb-5\">').replace(/\"/g, '\\\"')}
    </p>\`).join('');

// Build internal links
const internalLinksCode = data.internalLinks.map(l => \`[\${l.text}](/blog/\${l.slug})\`).join(' | ');
// eslint-disable-next-line
const externalLinksCode = data.externalLinks.map(l => \`[\${l.text}](\${l.url})\`).join(' | ');

const today = new Date().toISOString().split('T')[0];

const jsx = \`import { Link } from \"react-router-dom\";
import BlogPostLayout from \"../../components/BlogPostLayout\";

const faqs = [
\${faqsCode}
];

const \${data.pageName} = ({ openCalendly }) => (
  <BlogPostLayout
    title=\"\${data.title.replace(/\"/g, '\\\"')}\"
    description=\"\${data.description.replace(/\"/g, '\\\"')}\"
    slug=\"\${data.slug}\"
    datePublished=\"\${today}\"
    dateModified=\"\${today}\"
    readingTime=\"6 min\"
    category=\"\${data.category}\"
    keywords={[]}
    faqs={faqs}
    openCalendly={openCalendly}
  >
    <p className=\"text-white/70 leading-relaxed mb-5\">
      \${data.sections[0] ? data.sections[0].content.slice(0, 300) : ''}...
    </p>
\${sectionsCode}
    <h2 className=\"text-2xl font-black mt-10 mb-4\">Preguntas frecuentes</h2>
    <div className=\"space-y-4 mb-8">
      \${data.faqs.map(f => \`
      <div className=\"border-l-2 border-[#de0015] pl-4\">
        <p className=\"text-white font-semibold mb-2\">\${f.q}</p>
        <p className=\"text-white/60 text-sm\">\${f.a}</p>
      </div>\`).join('')}
    </div>
    <p className=\"text-white/70 leading-relaxed mb-5\">
      Si quieres profundizar en cómo optimizar tus campañas de Meta Ads con datos reales,
      en DayByDay Consulting hacemos auditorías gratuitas de tu cuenta. Agenda un discovery call
      y te mostramos exactamente qué está fallando y cómo solucionarlo.
    </p>
    <div className=\"mt-8 p-4 bg-white/5 rounded-lg\">
      <p className=\"text-white/60 text-sm mb-3\">Enlaces internos mencionados:</p>
      <div className=\"flex flex-wrap gap-3 text-sm\">
        \${data.internalLinks.map(l => \`<Link key=\"\${l.slug}\" to=\"/blog/\${l.slug}\" className=\"text-[#de0015] hover:underline\">\${l.text}</Link>\`).join(' ')}
      </div>
      \${data.externalLinks.length > 0 ? \`
      <p className=\"text-white/60 text-sm mt-3 mb-1\">Recursos externos:</p>
      <div className=\"flex flex-wrap gap-3 text-sm\">
        \${data.externalLinks.map(l => \`<a href=\"\${l.url}\" target=\"_blank\" rel=\"noopener noreferrer\" className=\"text-blue-400 hover:underline\">\${l.text}</a>\`).join(' ')}
      </div>\` : ''}
    </div>
  </BlogPostLayout>
);

export default \${data.pageName};
\`;

fs.writeFileSync('$PAGE_FILE', jsx);
console.log('Created: $PAGE_FILE');
"
