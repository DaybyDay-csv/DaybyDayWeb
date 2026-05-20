# HERMES — Data Schemas Reference

> Single source of truth for the shapes Hermes reads and writes. MiniMax MUST follow these schemas exactly. Deviation = silent corruption.

---

## 1. `seo-plan/estado.json`

```jsonc
{
  "last_updated": "2026-05-20T03:25:39.588924",   // ISO datetime
  "current_week": "...",
  "current_phase": "...",
  "site": "https://www.daybydayconsulting.com",
  "repo": "https://github.com/DaybyDay-csv/DaybyDayWeb.git",
  "blog_path": "src/pages/blog/",
  "blog_route_prefix": "/blog/",
  "blog_index_file": "src/pages/BlogPage.jsx",
  "app_routes_file": "src/App.jsx",
  "sitemap_file": "public/sitemap.xml",
  "llms_txt_file": "public/llms.txt",
  "completed_tasks": [...],                       // legacy
  "published_posts": [                            // append-only, written by update-routes.js
    {
      "slug": "kebab-slug",
      "title": "Full title",
      "taskId": "T0XX",
      "date": "2026-05-21",
      "keyword": "primary keyword"
    }
  ],
  "phases": [...],
  "cluster5": [...],
  "tasks": [
    {
      "id": "T041",                               // unique, sortable
      "status": "pending|published|skipped",
      "type": "article",
      "title": "human-readable title",
      "keyword": "primary keyword for SEO",
      "slug": "kebab-case-slug",
      "cluster": "paid-media-foundations",
      "volume": "100-500",                        // monthly search volume range
      "priority": "low|medium|high",
      "blog_score": 80,                           // 0-100 priority score
      "source": "curated|gsc|competitor",
      "created_by": "sync-topic-to-estado",
      "created_at": "2026-05-20T03:25:39.588924",

      // Added by update-routes.js when published:
      "published_at": "2026-05-21T07:42:18.000Z",
      "published_slug": "kebab-case-slug"
    }
  ]
}
```

**Mutation rules:**
- `tasks[].status` flips `pending` → `published` exactly once.
- `published_posts` is append-only; never delete entries.
- `last_updated` refresh on every mutation.

---

## 2. `seo-plan/keyword_priorities.json`

```jsonc
{
  "last_updated": "2026-04-27T...",
  "priorities": [
    {
      "keyword": "meta ads ecommerce españa",
      "volume": "400-800",
      "priority": "high|medium|low",
      "intent": "informational|commercial|transactional",
      "cluster": "paid-media-foundations",
      "blog_score": 95,
      "gsc_position": 14.2,                       // optional, set by Analyst
      "gsc_clicks_7d": 0                          // optional, set by Analyst
    }
  ],
  "content_gaps_priority": [...]                  // legacy
}
```

**Mutation rules:**
- Only Analyst writes here.
- Boost `priority` to `high` when GSC quickwin (position 4-10, clicks >= 5) matches a keyword.

---

## 3. `src/App.jsx` — Route insertion contract

Two markers, both REQUIRED:

```jsx
// Block 1: imports
import PixelMetaHibridoClienteServidorPage from "./pages/blog/PixelMetaHibridoClienteServidorPage";
// HERMES_IMPORTS_END — Do not remove. hermes/scripts/update-routes.js inserts new blog imports above this line.
import NotFoundPage from "./pages/NotFoundPage";

// Block 2: routes
        <Route path="/blog/pixel-meta-hibrido-cliente-servidor-implementacion" element={<PixelMetaHibridoClienteServidorPage openCalendly={openCalendly} />} />
        {/* HERMES_ROUTES_END — Do not remove. hermes/scripts/update-routes.js inserts new blog routes above this line. */}
        <Route path="*" element={<NotFoundPage />} />
```

**Insertion pattern (handled by update-routes.js):**
- New import inserted ABOVE `// HERMES_IMPORTS_END`. Format: `import ComponentName from "./pages/blog/ComponentName";`
- New Route inserted ABOVE `{/* HERMES_ROUTES_END ... */}`. Format: `<Route path="/blog/slug" element={<ComponentName openCalendly={openCalendly} />} />`
- `openCalendly` prop is REQUIRED.

---

## 4. `src/pages/BlogPage.jsx` — Card insertion contract

```jsx
const posts = [
  // HERMES_POSTS_START — Do not remove. hermes/scripts/update-routes.js inserts new post entries below this line.
  {
    slug: "pixel-meta-hibrido-cliente-servidor-implementacion",
    title: "...",
    excerpt: "...",
    category: "Tracking",
    date: "19 may 2026",         // Spanish month abbreviation
    readingTime: "13 min",
  },
  // ... more entries
];
```

**Insertion pattern:**
- New entry inserted IMMEDIATELY AFTER the `// HERMES_POSTS_START` line (top of array = newest first).
- The marker comment is preserved by re-inserting it in the replacement.
- `date` is Spanish format: `D mmm YYYY` (e.g. `21 may 2026`).
- `readingTime` includes ` min` suffix.

---

## 5. `public/sitemap.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://www.daybydayconsulting.com/</loc>...</url>
  ...
  <url><loc>https://www.daybydayconsulting.com/blog/SLUG</loc><lastmod>YYYY-MM-DD</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>
</urlset>
```

**Insertion:** new `<url>...</url>` block inserted immediately before `</urlset>`.

---

## 6. `public/llms.txt`

Plain markdown list. Append one line per new post:

```markdown
- [Title](https://www.daybydayconsulting.com/blog/slug)
```

---

## 7. `hermes/state/current.json`

```jsonc
{
  "phase": "IDLE|PLANNING|PLANNED|RESEARCHING|RESEARCHED|WRITING|WRITTEN|PUBLISHING|PUBLISHED|ANALYZING|FAILED",
  "task_id": "T041",                 // null when IDLE
  "run_id": "hermes-20260521-074218",
  "started_at": "2026-05-21T07:42:18Z",
  "retries": 0,
  "last_error": null                 // {phase, code, message, timestamp}
}
```

---

## 8. `hermes/state/plan-<DATE>.json`

Output of Strategist phase.

```jsonc
{
  "task_id": "T041",
  "title": "Cómo empezar con Meta Ads en 2026 siendo eCommerce España",
  "slug": "como-empezar-con-meta-ads-en-2026-siendo-ecommerce-espana",
  "keyword": "como empezar con meta ads en 2026 siendo ecommerce espana",
  "cluster": "paid-media-foundations",
  "category": "Paid Media",
  "target_words": 1200,
  "reading_time": 9,
  "lead_partner": "pablo",          // "pablo" or "jorge", drives author attribution
  "faqs": [
    "¿Cuánto presupuesto mínimo necesito para empezar con Meta Ads siendo eCommerce D2C en España?",
    "¿Cuánto tiempo tardan los anuncios de Meta en aprender y empezar a dar resultados?",
    "..."
  ],
  "internal_link_slugs": [
    "guia-meta-ads-ecommerce-d2c-espana-2026",
    "estado-paid-media-d2c-espana-2026",
    "cuanto-invertir-meta-ads-calculadora"
  ],
  "example_id": "ex_moda_roas_156", // from examples-pool.json
  "rationale": "T041 is lowest-id pending with priority>=medium; GSC shows the keyword at position 17 with growing impressions — clear opportunity for new BOFU content."
}
```

---

## 9. `hermes/state/research-<DATE>.json`

Output of Researcher phase.

```jsonc
{
  "task_id": "T041",
  "keyword": "como empezar con meta ads en 2026 siendo ecommerce espana",
  "citations": [
    {
      "url": "https://www.facebook.com/business/news/...",
      "source": "Meta for Business",
      "year": "2025",
      "stat": "El 71% de los compradores españoles descubrieron una marca nueva en Meta en los últimos 12 meses.",
      "quote": "Exact quoted passage if available.",
      "verified": true
    },
    { ... },
    { ... }
  ],
  "search_queries_used": ["q1", "q2"],
  "fetched_urls": ["u1"]
}
```

Required: ≥3 citations, mix of (Meta/Google official) + (research org Statista/IAB/eMarketer) + (operational blog).

---

## 10. `hermes/state/budget-<DATE>.json`

```jsonc
{
  "in": 12500,        // cumulative input tokens today
  "out": 8400,        // cumulative output tokens today
  "calls": 4,
  "phases": {
    "strategist": {"in": 1500, "out": 600, "calls": 1},
    "researcher": {"in": 2000, "out": 1500, "calls": 1},
    "writer":     {"in": 4000, "out": 9000, "calls": 1}
  }
}
```

Cap: 200_000 input tokens/day. Alert at 80%.

---

## 11. Component name <-> Slug conversion

Bidirectional, deterministic:

```
slug:      "como-empezar-con-meta-ads-en-2026-siendo-ecommerce-espana"
component: "ComoEmpezarConMetaAdsEn2026SiendoEcommerceEspanaPage"
filename:  "ComoEmpezarConMetaAdsEn2026SiendoEcommerceEspanaPage.jsx"
route:     "/blog/como-empezar-con-meta-ads-en-2026-siendo-ecommerce-espana"
```

Algorithm: split slug on `-`, capitalize each part, concat, append `Page`. Numbers and accents pass through unchanged (slug is already ASCII).

---

## 12. Exit codes (Hermes contract)

| Code | Meaning |
|------|---------|
| 0 | OK |
| 1 | unrecoverable error |
| 10 | npm run build failed |
| 11 | jsx-safe-check failed |
| 12 | conflict markers staged |
| 30 | dirty git state (halt) |
| 42 | rate-limited (retry safe) |
