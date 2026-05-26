#!/bin/bash
export PATH=/usr/local/bin:/usr/bin:/bin
set -a; source /root/.env; set +a
# DayByDay — Client Acquisition Orchestrator
# Mon-Fri 7:00 UTC (8:00 Spain)
cd /root
hermes run client-acquisition-orchestrator --output-format compact