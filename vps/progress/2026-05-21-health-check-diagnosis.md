# Health Check - Diagnóstico 2026-05-21

## Problema root cause

health-check.sh tiene lógica antigua que mezcla:
1. Verificación de `claudeAiOauth` (expiresAt) de credentials.json
2. Lectura de `ANTHROPIC_API_KEY` desde .env

El script asume que el sistema usa Claude como API primaria, pero desde hace semanas
el sistema usa MiniMax como primary (modelo activo) y Claude solo para FASE 2.

Cuando el health check detecta "expired" + "no API key" → muestra la alerta.

PERO: Los blogs se publican correctamente porque run-daily-blog.sh tiene su propia
lógica de API keys y no depende del health check.

## Errores 401 en Telegram reports

Los 401 vienen de intentos del health-check de hacer llamadas a Claude API
sin tener la key correctamente configurada en el entorno del script.

## 29 agentes bloqueados

Necesito investigar más. Posibles causas:
- Hermès se reinició y perdió estado de agentes
- Los agentes están esperando respuesta de un modelo que no responde
- Timeout en llamadas a MiniMax (rate limits)

## Siguiente paso
- Revisar estado de agentes en Hermes
- Ver logs de health-check en /root/logs/
- Actualizar health-check.sh para reflejar arquitectura MiniMax-first