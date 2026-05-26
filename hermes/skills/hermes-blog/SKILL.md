---
name: hermes-blog
description: Ejecuta el blog pipeline Hermes v4 — un articulo SEO diarias de forma autonoma.
---

## Resumen

Este skill ejecuta el blog pipeline v4 de forma determinista. Esta disenado para ser llamado por cron o por un agente Hermes.

## Pipeline

El entrypoint es `/root/scripts/run-hermes-blog.sh`. Este script:

1. **Selecciona tema**: Lee `seo-plan/estado.json` y pick el primer topic con `status=pending`.
2. **Genera contenido**: Invoca `vps/blog-pipeline-v4.py` con el topic como argumento.
3. **Publica**: Hace git add + commit + push a main. Netlify auto-deploya.
4. **Marca como published**: Actualiza `estado.json` con el nuevo slug.
5. **Notifica**: Envia resumen via Telegram.

## Fases del pipeline v4

1. **Research** (3 llamadas MiniMax): preguntas + competidores + enlaces autoridad
2. **Brief**: MiniMax genera titulo, slug, angulo, estructura, keywords, template
3. **Write** (6 llamadas MiniMax section-by-section): evita el bug de prompt >12KB
4. **Audit**: Checklist Hormozi (voz, estructura, contenido, anti-AI, SEO)
5. **Deploy**: anade ruta + listado + sitemap + CF Pages deploy + verify
6. **Notify**: Telegram con scores del audit

## Llamada directa

```bash
# Dry-run (solo selecciona tema, no ejecuta)
/root/scripts/run-hermes-blog.sh --dry-run

# ProducciÃ³n (ejecuta pipeline completo)
/root/scripts/run-hermes-blog.sh
```

## Parametros de emergencia

- `FORCE_TOPIC="tu tema"`: fuerza un tema especifico ignorando estado.json
- `SKIP_AUDIT=1`: salta el audit (no recomendado)
- `DRY_RUN=1`: solo selecciona tema, no publica

## CÃ³digos de salida

- `0`: exito (artículo publicado o ya existía)
- `42`: rate-limit MiniMax (reintentar en siguiente tick)
- `43`: balance insuficiente MiniMax
- `30`: git sucio (halt — resolver antes de continuar)
- `1`: error general

## Bugs corregidos (2026-05-26)

- B2: prompts >12KB ahora lanzan excepcion + reintento con truncation
- B3: port 4173 se libera con `fuser -k` antes de prerender
- Section-by-section writing: 6 llamadas x 2KB en vez de 1 llamada x 20KB
