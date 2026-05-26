#!/bin/bash
export PATH=/usr/local/bin:/usr/bin:/bin
set -a; source /root/.env; set +a
# DayByDay — System Improver — Sundays 3:00 AM UTC
# Detects regressions and self-heals where possible
cd /root
hermes run system-improver --output-format compact 2>&1 | head -50