# Blog Pipeline — Progreso Día 2026-05-20 (actualizado 2026-05-20 00:10 UTC)

## Última actualización: 2026-05-20 00:10 UTC

---

## 🔴 3 BLOQUEADORES CRÍTICOS — requieren acción

### B1. Skill path equivocado
- **Script usa:** `/root/.claude/scheduled-tasks/daybyday-daily-blog/SKILL.md` → **stub 22KB**
- **Skill real:** `/root/.hermes/skills/blog-pipeline/blog-pipeline/SKILL.md` → **48KB**
- **Impacto:** El agente recibe contenido incompleto, no tiene las referencias correctas
- **Fix:** Cambiar `SKILL_PATH` en `run-daily-blog.sh` línea ~50

### B2. MiniMax empty response en prompts largos
- **Síntoma:** `⚠️ Empty response from model — retrying (3/3)` → `❌ Model returned no content`
- **Trigger:** prompts >20KB chars causar respuesta vacía en MiniMax M2.7
- **Impacto:** Hermes escribe logs pero no produce output → no genera blog post
- **Fix O1 (rápida):** truncar prompt a <15KB (cortar skill content, pasar refs en lugar de contenido)
- **Fix O2 (completa):** migrar a skill + tool-calling con execute_code

### B3. Prerender port 4173 conflict
- **Síntoma:** `EADDRINUSE: address already in use :::4173`
- **Causa:** `prerender.mjs` deja proceso huérfano en puerto 4173 entre runs
- **Impacto:** Build nunca completa → deploy nunca sucede
- **Fix:** `fuser -k 4173/tcp` al inicio del script + trap en background process

---

## ✅ FIXES APLICADOS (esta sesión)

### Fix 1: Variable expansion en `run-daily-blog.sh`
- **Problema:** `\$` antes de variables en heredoc FULL_PROMPT → `hermes chat` recibía literales `${TRACK}`
- **Líneas afectadas:** 161-169
- **Fix:** `\$` → `$` (6 variables)
- **Verificado:** prompt con topic expande correctamente

### Fix 2: JSX `>` en 7 archivos de blog (nuevos)
- **Archivos:** `ChecklistAuditoriaCampanasPage.jsx`, `CuantoCobraMediaBuyerPage.jsx`, `PerformanceMaxVsMetaAdsEspanaPage.jsx`, `QueEsUnMediaBuyerPage.jsx`, `QueNoAutomatizaIaD2cPage.jsx`, `RetargetingMetaAdsEcommerce2026Page.jsx`, `SenalesAgenciaNoRindePage.jsx`
- **Fix:** `&gt;` en líneas de contenido JSX (entre tags, no strings JS)
- **Estado:** git checkout --` applied (restored from git, fix no persisted)

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
| **AVO / Agentic** | Machine-readability para AI agents |

### 0.3 Pipeline completo (10 etapas)
```
Stage 0 — System Review         → Audit stack completo (cron, skills, GSC, GA4, Lighthouse, IndexNow, Telegram)
Stage 1 — Topic Discovery       → GSC gap, Reddit, PAA, Autocomplete, Firecrawl
Stage 2 — Research & Sources    → Verificar cada link (no 404s, autoridad real)
Stage 3 — Writing              → SEO + GEO + AEO + AVO optimizado
Stage 4 — On-page Optimization → Schema Article + FAQ, meta, slugs, alt text
Stage 5 — Interlinking         → Exactly 2 contextual internal links per post
Stage 6 — Indexing             → llms.txt + sitemap + IndexNow
Stage 7 — Deploy               → Vercel + verificar live URL
Stage 8 — Measurement          → GSC + GA4: impressions, clicks, position, CTR
Stage 9 — Audit                → Lighthouse (performance, SEO, accessibility) + report Telegram
Stage 10 — Iteration           → Prompt Hatching: refinar prompts con datos reales
```

---

## 1. Estado del sistema (Stage 0 audit)

| Componente | Estado | Detalle |
|-----------|--------|---------|
| **Repo** | ✅ | `DaybyDay-csv/DaybyDayWeb`, main branch |
| **Vercel project** | ✅ | `daybyday-web-owga` (prj_VzqOEKj4W0pxaAUOOG6gJ3sU9hTX) |
| **GitHub connection** | ✅ | Conectado a `DaybyDay-csv/DaybyDayWeb`, branch `main` |
| **Cronjobs activos** | ✅ | 6 cronjobs verificados |
| **Skill principal** | 🚨 | **WRONG PATH** — stub 22KB en lugar de real 48KB |
| **GSC API** | ✅ | `/root/.hermes/gsc_token.json` — funcionando |
| **GA4 API** | ✅ | `/root/.hermes/ga4_token.json` + credentials — listo |
| **Lighthouse** | ✅ | v13.3.0 en `/root/.npm-global/bin/lighthouse` |
| **IndexNow** | ✅ | Bing + Yandex via `prerender.mjs` — funcionando |
| **Telegram notification** | ✅ | Configurado |
| **llms.txt + sitemap** | ✅ | Auto-generados |
| **topic_research.py** | ✅ | 30 topics pending, 8 published |
| **prompt_hatching.py** | ✅ | Variant A: 28 posts, Variant B: 0 posts |
| **`run-daily-blog.sh`** | ⚠️ | Variable expansion fixed, pero skill path wrong |
| **Generación de contenido** | 🚨 | **BLOQUEADO** — MiniMax empty response + skill path wrong |
| **Prerender port** | 🚨 | 4173 conflict — build no completa |

---

## 2. Progreso del día (2026-05-19 → 2026-05-20)

### 2.1 Fix variable expansion ✅
- `run-daily-blog.sh` líneas 161-169: `\$` → `$` para 6 variables
- Prompt ahora expande correctamente en hermes chat

### 2.2 JSX `>` en 7 archivos ⚠️
- 7 posts tienen `>` en texto JSX que necesitan `&gt;`
- Fix script preparado pero no persistido (revertido a git)
- Verificar con: `grep -rn 'agencia de publicidad está rindiendo\|media buyer.*1500' src/pages/blog/`

### 2.3 Prerender port conflict ⚠️
- Puerto 4173 queda ocupado entre runs
- Fix: `fuser -k 4173/tcp` al inicio del script

---

## 3. 🚨 Bloqueadores activos

### B1 — Skill path equivocado
**Archivo:** `run-daily-blog.sh` línea ~50
```bash
# ACTUAL (WRONG):
SKILL_PATH="/root/.claude/scheduled-tasks/daybyday-daily-blog/SKILL.md"

# CORRECTO:
SKILL_PATH="/root/.hermes/skills/blog-pipeline/blog-pipeline/SKILL.md"
```
El stub skill (22KB) no tiene las referencias actualizadas del blog-pipeline skill (48KB).

### B2 — MiniMax empty response
**Síntoma:** prompts >20KB → model returns empty after 3 retries
**Solución O1 (rápida):** truncate skill content a <15KB en el prompt
**Solución O2 (completa):** usar skill como tool reference en lugar de inline content

### B3 — Prerender port conflict
**Archivo:** `run-daily-blog.sh` — añadir antes del build gate:
```bash
# Kill stale prerender processes
fuser -k 4173/tcp 2>/dev/null || true
sleep 2
```

---

## 4. Pipeline run-daily-blog.sh — Arquitectura actual

```
1. git pull (main) + worktree branch fix
2. PostgreSQL: acquire run_id
3. topic_research.py --pick --state  → topic + slug + cluster
4. hermes chat -q "$(cat prompt_file)" --model MiniMax-M2.7  → genera post
5. npm run build (PRE-MERGE GATE)
6. verify-blog-links.sh
7. Lighthouse audit
8. Prompt Hatching (variant toggle)
9. git commit + push branch
10. git merge + push main (→ Vercel deploy)
11. IndexNow submission
12. Telegram notification
13. PostgreSQL: mark status
```

**Sepultura:** pasos 4 (skill path + empty response) + 5 (port conflict) + prerender.

---

## 5. Stats blog

| Métrica | Valor |
|---------|-------|
| Posts en sitemap | **79** |
| Posts published (sitemap + domain serving) | **79** |
| Posts en topic queue pending | **30** |
| Posts en topic queue published | **8** |
| relatedPosts.json entries | 17 |
| Prompt Hatching Variant A | 28 posts |
| Prompt Hatching Variant B | 0 posts |
| Lighthouse audit reports | 17 |
| PG runs: success | 88 |
| PG runs: failed | 26 |
| PG runs: running (stale) | 0 (cleaned) |

---

## 6. Topics pendientes

**Alta prioridad (top of queue):**
1. `como-empezar-con-meta-ads-en-2026-siendo-ecommerce-espana` (score 80) — **NEXT POST**
2. `cbo-vs-abo-meta-ads-2026-cual-gana-en-ecommerce-espana` (score 80)
3. `ga4-meta-server-side-tracking-shopify-sin-dolores-de-cabeza` (score 80)
4. `que-es-el-roas-en-meta-ads` (GSC quick win, pos 6.7, CTR 0%)

---

## 7. Cronjobs activos

| Job | Schedule | Track | Función | Estado |
|-----|----------|-------|---------|--------|
| `daybyday-daily-blog-current` | 0 9 * * 1-5 | current | Pipeline D2C | ⚠️ Bloqueado (B1+B2) |
| `daybyday-daily-blog-pivot` | 0 14 * * 1-5 | pivot | Pipeline Growth | ⚠️ Bloqueado (B1+B2) |
| `daybyday-topic-research` | 0 6 * * 1 | — | Topic discovery | ✅ Funcionando |
| `daybyday-weekly-lighthouse` | 30 6 * * 1 | — | Lighthouse audit | ✅ Programado |
| `daybyday-weekly-seo-report` | 0 7 * * 1 | — | GSC + report | ✅ Programado |
| `daybyday-geo-monitor` | 0 6 * * 1 | — | GEO/AVO/AEO | ✅ Programado |

---

## 8. Scripts del sistema

| Script | Función | Estado |
|--------|---------|--------|
| `/root/scripts/run-daily-blog.sh` | Pipeline completo | ⚠️ Skill path + port conflict |
| `/root/scripts/topic_research.py` | Topic discovery: GSC + Autocomplete + Firecrawl | ✅ |
| `/root/scripts/internal_links.py` | Interlinking clusters | ✅ |
| `/root/scripts/inject_related_posts.py` | Inject relatedPosts en JSX | ✅ |
| `/root/scripts/lighthouse-audit.sh` | Lighthouse v13.3.0 | ✅ |
| `/root/scripts/gsc_fetch.py` | GSC API | ✅ |
| `/root/scripts/ga4_events.py` | GA4 Measurement Protocol | ✅ |
| `/root/scripts/prompt_hatching.py` | Prompt A/B testing | ✅ |
| `/root/scripts/prerender.mjs` | IndexNow + sitemap refresh | ✅ Port conflict |
| `/root/scripts/verify-blog-links.sh` | External link verification | ✅ |

---

## 9. Pendiente para la próxima sesión

### Crítico (blocking — resolver en este orden)
1. [ ] Fix skill path en `run-daily-blog.sh` → apuntar a skill real de 48KB
2. [ ] Fix MiniMax empty response: truncar prompt o usar skill como tool reference
3. [ ] Fix prerender port conflict: `fuser -k 4173/tcp` al inicio del script

### Alto
- [ ] Ejecutar pipeline completo — primer post Variant B
- [ ] JSX `>` en 7 archivos: verificar y fixear antes de próximo deploy
- [ ] Lighthouse audit post-deploy

### Medio
- [ ] Populate topic queue con más GSC quick wins
- [ ] Verificar que los 7 archivos con `>` en JSX no rompen el build actual
- [ ] Limpiar stale worktree changes (`git checkout --`)

---

## 10. Referencias

- System prompt HERMES: sección 0 de este doc
- Estado topics: `/root/logs/topic-research/state.json`
- Hatching state: `/root/logs/hatching/hatching-state.json`
- Skill real: `/root/.hermes/skills/blog-pipeline/blog-pipeline/SKILL.md` (48KB)
- Skill stub: `/root/.claude/scheduled-tasks/daybyday-daily-blog/SKILL.md` (22KB)
- Blog progreso: `/root/projects/DaybyDay/blog-progreso-2026-05-20.md`
- Logs: `/var/log/daybyday/blog-*.log`, `/root/logs/blog-*.log`