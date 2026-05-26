# Agents bloqueados — Resolución 2026-05-21

## Hallazgo

29 agentes con `status='running'` tapi进了. Eran jobs de blog que nunca completaron 
su workflow (probablemente por MiniMax API errors o timeouts).

| Status | Cantidad |
|--------|----------|
| running | 1 (actual) |
| stale | 168 |
| timeout | 21 |
| failed | 26 |
| success | 88 |

## Fix aplicado

```sql
UPDATE agent_runs SET status='stale' 
WHERE status='running' AND started_at < NOW() - INTERVAL '24 hours';
```

28 filas actualizadas de `running` → `stale`.

## Recomendación

El health check debería hacer esta limpieza automáticamente para evita false positives.
También podría agregar un cleaner automático para runs >24h.

Próximo paso: actualizar health-check.sh para limpiar antes de contar.