# Blog Pipeline — Progreso Día 2026-05-19/20

## Última actualización: 2026-05-20 08:35 UTC

---

## 🔄 Migration activa: Claude Code CLI → MiniMax via Hermes

**Estado: EN CURSO — Bloqueador identificado**

El pipeline de blog posting usa `claude -p "$FULL_PROMPT"` para generar posts. El CLI de Claude Code devuelve **401 Authentication Error** — el token OAuth de `claude.ai` está stale/expired. Esto provoca que el script re-ejecute en loop infinito.

**Solución en curso:** ejecutar el pipeline usando MiniMax M2.7 directamente via Hermes (ya tiene API key configurada). Los scripts de topic research, deploy, IndexNow y Telegram ya funcionan — solo la capa de generación de contenido necesita migrar de `claude -p` al modelo MiniMax.

---

## 0. HERMES System Prompt — Estado actual del Goal

### 0.1 Propósito
`HERMES` es el **autonomous SEO content engine** de Day by Day Consulting. Dueño del ciclo completo: topic discovery → research → writing → optimization → interlinking → indexing → deploy → measurement → audit → iteration.

### 0.2 North Star
Maximizar posicionamiento orgánico en **4 superficies**:
| Surface | Signal principal |
|---------|-----------------|
| **SEO** | Search Console + GA4 |
| **GEO** | Citations en AI-generated answers (ChatGPT, Perplexity) |
| **AEO** | Featured snippets, People Also Ask, voice |
| **AVO/Agentic** | Machine-readability para AI agents |

### 0.3 Pipeline completo (10 etapas)

```
Stage 0 — System Review         → Audit stack completo (cron, skills, GSC, GA4, Lighthouse, IndexNow, Telegram)
Stage 1 — Topic Discovery       → GSC gap, Reddit, PAA, Autocomplete, AnswerThePublic, Firecrawl
Stage 2 — Research & Sources   → Verificar cada link (no 404s, autoridad real)
Stage 3 — Writing              → SEO + GEO + AEO + AVO optimizado
Stage 4 — On-page Optimization → Schema Article + FAQ, meta, slugs, alt text
Stage 5 — Interlinking         → Exactamente 2 links internos contextuales por post
Stage 6 — Indexing             → llms.txt + sitemap + IndexNow
Stage 7 — Deploy               → Vercel + verificar live URL
Stage 8 — Measurement          → GSC + GA4: impressions, clicks, position, CTR
Stage 9 — Audit                → Lighthouse (performance, SEO, accessibility) + report Telegram
Stage 10 — Iteration           → Prompt Hatching: refinar prompts con datos reales
```

### 0.4 Quality Bar
- [x] Tone human, warm, easy to read
- [x] Readability score ≈ 100
- [x] Optimizado para SEO + GEO + AEO + AVO
- [x] Estructura: headings, scannable, snippet-ready Q&A
- [ ] Exactly 2 contextual internal links (interlinking pendiente de automatizar en nuevos posts)
- [x] External links verificados live
- [x] Schema / structured data
- [x] Editorial line respetada
- [x] Indexed (llms.txt, sitemap, IndexNow) y deployeado

### 0.5 Autonomy & Escalation
- Stop solo para: missing credentials, irreversible risk, strategy ambiguity, repeated tool failure
- **Blocker actual:** `claude -p` → 401. Necesita migrar a MiniMax via Hermes.

---

## 1. Estado del sistema (Stage 0 audit)

| Componente | Estado | Detalle |
|-----------|--------|---------|
| **Repo** | ✅ | `DaybyDay-csv/DaybyDayWeb`, main branch |
| **Vercel project** | ✅ | `daybyday-web-owga` (prj_VzqOEKj4W0pxaAUOOG6gJ3sU9hTX) |
| **GitHub connection** | ✅ | Conectado a `DaybyDay-csv/DaybyDayWeb`, branch `main` |
| **Cronjobs activos** | ✅ | 6 cronjobs verificados (L-V 8am, Lun 6am, 6:30am, 7am) |
| **Skills instaladas** | ✅ | 11 skills en `/root/.claude/scheduled-tasks/` |
| **Skill principal** | ✅ | `daybyday-daily-blog` (~430 líneas, 8 fases) |
| **GSC API** | ✅ | `/root/.hermes/gsc_token.json` + credentials — funcionando |
| **GA4 API** | ✅ | `/root/.hermes/ga4_token.json` + credentials — listo |
| **Lighthouse** | ✅ | v13.3.0 en `/root/.npm-global/bin/lighthouse` |
| **IndexNow** | ✅ | Bing + Yandex via `prerender.mjs` — funcionando |
| **Telegram notification** | ✅ | Configurado |
| **llms.txt** | ✅ | Generado automáticamente |
| **sitemap.xml** | ✅ | Auto-generado |
| **topic_research.py** | ⚠️ | Funcionando pero sin Reddit (403), Firecrawl ok (117 topics) |
| **prompt_hatching.py** | ✅ | Variant A: 28 posts, Variant B: 0 posts |
| **`run-daily-blog.sh`** | ⚠️ | Funciona hasta la llamada al modelo — luego 401 |
| **Generación de contenido** | 🚨 | **BLOQUEADO** — `claude -p` → 401 auth error |

---

## 2. Progreso del día (2026-05-19 → 2026-05-20)

### 2.1 Fix crítico: Duplicate slug ✅
- `PixelMetaHibridoClienteServidorPage.jsx` tenía `slug` duplicado con el de implementación
- Corregido → commit `59eead3` → merge → push `d330fd5`

### 2.2 Sistema relatedPosts data-driven ✅
- 3 posts nuevos integrados: `customer-journey-d2c-primer-impacto-repeticion`, `pixel-meta-hibrido-cliente-servidor`, `pixel-meta-hibrido-cliente-servidor-implementacion`
- `relatedPosts.json`: 14 → 17 entries

### 2.3 External links de autoridad ✅
| Post | Links |
|------|-------|
| CustomerJourneyD2c | DataReportal 2025, Statista 2025, Shopify, Klaviyo |
| PixelMetaHibridoClienteServidor | Incognia, Flurry Analytics, Meta for Developers |
| PixelMetaHibridoImplementacion | Meta Dev, Flurry Analytics, Privacy Sandbox |

### 2.4 Fix masivo de build: `>` en JS strings ✅
- **Problema:** `>` dentro de strings JS (faqs, table cells) rompen JSX parsing de esbuild
- **41 archivos afectados** con `>70%`, `>30%`, `>10K€` dentro de `a:"..."`, `s:"..."`, `r:"..."`
- **Fix:** `\u003e` unicode escape
- **Build:** ✅ 189 modules, 12.57s — antes timeout a los 120s
- **Commits:** `4196759` (external links) + `78a330e` (41 JSX files) + `991d97e` (doc)

### 2.5 Topic research con Firecrawl ✅
- `topic_research.py` integrado con **Firecrawl** → 117 topics descubiertos
- Fuentes activas: GSC gap (90d), Google Autocomplete (26 seeds ES), curated D2C España (30 topics), Firecrawl web scraping
- Reddit: 403 (bloqueado)
- AnswerThePublic: paywall
- `/root/logs/topic-research/state.json`: 32+ topics con scores

### 2.6 Prompt Hatching ✅
- Variant A: 28 posts (mean 34.0) — todos los posts existentes
- Variant B: 0 posts — **el siguiente post arrancará B** para test A/B
- Sistema de análisis estadístico listo (mínimo 6 posts B para evaluar)

---

## 3. 🚨 Bloqueador: Migración `claude -p` → MiniMax

### 3.1 Diagnóstico
```
run-daily-blog.sh → claude -p "$FULL_PROMPT" --allowedTools ... → 401 Authentication Error
```

El CLI de Claude Code (`/root/.claude/bin/claude`) tiene OAuth válido en `claude.ai` pero el API key subyacente está stale. Por eso:
1. Git pull ✓
2. PostgreSQL INSERT ✓
3. Topic selection ✓
4. `claude -p` → **401** ✗
5. Script re-ejecuta desde inicio → **loop infinito**

### 3.2 Solución requerida
Migrar la capa de generación de contenido del script para usar **MiniMax M2.7** via Hermes. Opciones:

**Opción A (rápida):** Modificar `run-daily-blog.sh` para usar `hermes model minimax/MiniMax-2.7` o `hermes chat` en vez de `claude -p`

**Opción B (completa):** Reescribir la skill `daybyday-daily-blog` para operar dentro de la sesión de Hermes Agent en vez de llamar un CLI externo

### 3.3 Componentes que YA funcionan
- topic_research.py ✅
- Git operations ✅
- Vercel deploy via API ✅
- IndexNow (Bing + Yandex) ✅
- Telegram notifications ✅
- PostgreSQL state tracking ✅
- `prerender.mjs` ✅
- Lighthouse audit ✅
- GSC + GA4 fetch ✅

### 3.4 Componentes que necesitan MiniMax
- Generación del contenido del post (prompt → markdown/JSX)
- Research en vivo del topic (incorporado al prompt)

---

## 4. Pipeline run-daily-blog.sh — Arquitectura actual

```
1. git pull (main)
2. PostgreSQL: acquire run_id
3. topic_research.py --pick --state  → topic + slug + cluster
4. [BLOQUEADO] claude -p "$FULL_PROMPT" --allowedTools ...  → genera post
5. git add + commit (topic slug)
6. git push origin main
7. Vercel deploy polling
8. prerender.mjs → IndexNow (Bing + Yandex)
9. Lighthouse audit
10. Telegram report
11. PostgreSQL: mark published
12. prompt_hatching.py --record
```

**Sepultura:** paso 4. El resto funciona.

---

## 5. Historial de sesiones (progress tracking)

| Sesión | Fecha | Duración | Lo que se hizo |
|--------|-------|----------|----------------|
| `20260519_181022_567e69` | 19 May 01:18pm | ~21 min | Setup HERMES system prompt, 10-stage pipeline, Stage 0 audit, topic_research.py con Firecrawl, 117 topics |
| `20260519_184058_b5daee` | 19 May 02:10pm | ~7 min | Resume sesión anterior, verificación status |
| `20260519_185855_931592` | 19 May 02:57pm | ~29 min | Pipeline completo ejecutado, `claude -p` → 401, diagnóstico completo del blocker |
| `20260519_190118_a3a280` | 19 May 03:01pm | ~8 min | Sesión corta, confirmación estado |
| `20260519_190320_652a81` | 19 May 03:03pm | ~5 min | Sesión corta |
| `20260519_193508_ed7792` | 19 May 03:31pm | ~140 min | **Esta sesión** — fix duplicate slug, relatedPosts, external links, 41 JSX files `\u003e`, build exitoso, doc actualizado |
| `cron_2958dff26772` | 19 May 09:12pm | ~10 min | Cronjob L-V orchestrator, sin blog posting |

**Sesiones anteriores (antes de hoy):**
| Sesión | Fecha | Lo que se hizo |
|--------|-------|----------------|
| `20260519_151340_b71ea2` | 19 May 01:34pm | Fix JSX entity `>` en 10 archivos, `.vercelignore`, verify 200 en producción |
| `20260519_125349_22b589` | 19 May 10:53am | Setup initial, run-daily-blog.sh con topic_research, cronjob updates |
| `20260519_...` | 19 May morning | Sesiones morning — topic research, curated topics, cronjob setup |

---

## 6. Stats blog

| Métrica | Valor |
|---------|-------|
| Posts publicados | **78** |
| Posts en relatedPosts.json | **17** (de 87 en src/pages/blog) |
| Clusters en internal_links.py | 9 clusters, 17 entries |
| Posts con external links >0 | ~70 |
| Posts con data-driven relatedPosts | 17 (resto pendiente) |
| Topics en cola (topic_research) | 32+ |
| Prompt Hatching Variant A | 28 posts |
| Prompt Hatching Variant B | 0 posts (próximo post = B) |

---

## 7. Topics pendientes (topic queue)

**Alta prioridad:**
- Quick wins GSC: `que es el roas en meta ads` (pos 6.7, CTR 0%, score 80)
- `consultora marketing mix modeling` (pos 13.6, score 70)
- `cbo vs abo meta ads 2026` (curated, score 80)

**Pendiente ejecutar tras migración MiniMax:**
1. `como-empezar-con-meta-ads-en-2026-siendo-ecommerce-espana` (score 80) — **primer post Variant B**
2. `cbo-vs-abo-meta-ads-2026-cual-gana-en-ecommerce-espana` (score 80)
3. `ga4-meta-server-side-tracking-shopify-sin-dolores-de-cabeza` (score 80)

---

## 8. Vercel deploys

| SHA | Mensaje | Estado |
|-----|---------|--------|
| `d330fd5` | Merge branch 'claude/epic-pasteur' | ✅ READY |
| `4196759` | fix: external links + 41 JSX files | ✅ READY |
| `78a330e` | fix: 41 JSX files `\u003e` unicode escape | ✅ READY |
| `991d97e` | docs: blog pipeline progreso 2026-05-20 | ✅ READY |

---

## 9. Scripts del sistema

| Script | Función | Estado |
|--------|---------|--------|
| `/root/scripts/topic_research.py` | Research topics: GSC + Autocomplete + Firecrawl + curated | ✅ |
| `/root/scripts/run-daily-blog.sh` | Pipeline completo de blog posting | ⚠️ Bloqueado en paso 4 (`claude -p`) |
| `/root/scripts/internal_links.py` | Interlinking clusters | ✅ Actualizado |
| `/root/scripts/inject_related_posts.py` | Inject relatedPosts en JSX | ✅ Listo |
| `/root/scripts/lighthouse-audit.sh` | Lighthouse v13.3.0 | ✅ Listo |
| `/root/scripts/gsc_fetch.py` | GSC API | ✅ Funcionando |
| `/root/scripts/ga4_events.py` | GA4 Measurement Protocol | ✅ Listo |
| `/root/scripts/prompt_hatching.py` | Prompt A/B testing | ✅ Listo |
| `/root/scripts/prerender.mjs` | IndexNow + sitemap refresh | ✅ Funcionando |

---

## 10. Pendiente para la próxima sesión

### Crítico (blocking)
- [ ] **Migrar `claude -p` → MiniMax via Hermes** en `run-daily-blog.sh` o skill `daybyday-daily-blog`

### Alto
- [ ] Ejecutar pipeline completo con el topic top de la cola
- [ ] Primer post Variant B (Prompt Hatching)
- [ ] Lighthouse audit post-deploy (3 posts publicados)

### Medio
- [ ] Populate topic queue con GSC quick wins (pos 4-10, CTR bajo)
- [ ] Automatizar Lighthouse + GSC en `run-daily-blog.sh` (post-deploy hook)
- [ ] Limpiar hardcoded related posts en CustomerJourneyD2c (líneas 232-251)

### Bajo
- [ ] Reddit access (OAuth o scraper alternativo)
- [ ] SerpAPI para PAA reales
- [ ] 41 archivos con `\u003e` → verificar renderizado en浏览器

---

## 11. Referencias

- System prompt HERMES completo: arriba en sección 0
- Doc de progreso: `/root/projects/DaybyDay/blog-progreso-2026-05-20.md`
- Estado topics: `/root/logs/topic-research/state.json`
- Hatching state: `/root/logs/hatching/hatching-state.json`
- Logs: `/root/logs/blog-2026-05-19.log`, `/root/logs/orchestrator-2026-05-19.log`
- Skill blog-pipeline: `/root/.hermes/skills/blog-pipeline/`