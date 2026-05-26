# Progress — 2026-05-21 Tarde

## Estado del sistema

### Orchestrator
- current.json: `{"phase":"IDLE","task_id":null,"retries":0}`
- IDLE — sin tareas activas

### Blog publicados HOY (2026-05-21)
- T042: `cbo-vs-abo-meta-ads-2026-cual-gana-en-ecommerce-espana` ✓
- T043: `ga4-meta-server-side-tracking-shopify-sin-dolores-de-cabeza` ✓
- T044: en proceso o pendiente

### Health check alerts explicadas

| Alerta | Causa |
|--------|-------|
| `❌ Claude auth expired — necesitas API key` | health-check.sh verificaba expiresAt de claudeAiOauth en credentials.json, no sabía de ANTHROPIC_API_KEY |
| `⚠️ 29 agentes bloqueados en running > 2h` | No confirmado — puede ser false positive de la query PostgreSQL |
| `📬 No home channel is set for Telegram` | Hermes no tiene home channel configurado — benigno |
| `❌ Non-retryable error (HTTP 401)` | health-check intentaba llamada a API de Claude sin API key |

### Fix aplicado
- health-check.sh: `API_KEY=$(grep ...)` → `API_KEY="${ANTHROPIC_API_KEY:-}"`
- Ahora el script lee correctamente la variable del entorno

### Archivo stuck
- plan-2026-05-21.json.stuck + research-2026-05-21.json.stuck — tareas de ayer
- Verificar si hay trabajo real pendiente

## Scripts críticos
- `/root/scripts/run-daily-blog.sh` — OPERATIONAL (12,911 bytes, actualizado)
- `/root/scripts/health-check.sh` — FIXED
- `/root/scripts/vps-watchdog.sh` — perlu investigating

## Notas
- Blog pipeline usa MiniMax M2.5 (FASE 1) + Claude Sonnet 4 (FASE 2)
- Coste estimado por run: ~$0.08
- ANTHROPIC_API_KEY ya en /root/.env