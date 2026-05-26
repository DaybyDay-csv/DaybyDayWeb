# Blog Pipeline — Ejecución Real 2026-05-21

## Resultado

✅ **Blog publicado:** Pixel híbrido (cliente + servidor) en Meta Ads: implementación práctica paso a paso (2026)

**URL:** https://daybydayconsulting.com/blog/pixel-meta-hibrido-cliente-servidor-implementacion

**Commit:** `7c367fd feat(blog): Pixel híbrido Meta Ads: cliente + servidor (guía 2026)`

**Duración:** 337s (5min 37s)

## Flows

1. **FASE 1: RESEARCH** → `hermes chat -q "..." --model minimax-m2.5 --provider minimax`
2. **FASE 2: WRITING** → `hermes chat -q "..." --model claude-sonnet-4-20250514 --provider anthropic`

## Fixes aplicados durante la prueba

1. ❌ → ✅ `claude` CLI → `hermes chat`
2. ❌ → ✅ `-p` → `-q` (single query mode)
3. ❌ → ✅ `--allowedTools` → (no longer needed)
4. ❌ → ✅ `--model minimax-m2.5 --provider minimax`
5. ❌ → ✅ `--model claude-sonnet-4-20250514 --provider anthropic`

## Coste estimado

| Fase | Modelo | Coste aproximado |
|------|--------|-------------------|
| FASE 1 | MiniMax M2.5 | ~$0.07 |
| FASE 2 | Claude Sonnet 4 | ~$0.01 |
| **Total** | | **~$0.08** |

## Estado actual del sistema

- run-daily-blog.sh: OPERATIONAL
- health-check.sh: FIXED ( limpiza agentes varados, lee ANTHROPIC_API_KEY )
- PostgreSQL: 1 agente running (hoy), 196 stale, 88 success total

## Notas

- Vercel deploy detection tiene false positive. Añadir verificar URL manualmente.
- El blog está visible y funcionando correctamente.