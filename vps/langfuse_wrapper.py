#!/usr/bin/env python3
"""
DayByDay Langfuse Agent Instrumentation Wrapper
Wraps every agent run with Langfuse tracing for LLM observability.
Usage: python3 langfuse_wrapper.py <agent_name> <log_file> <run_id> [status] [duration]
"""
import sys
import json
import time
import urllib.request
import base64
from datetime import datetime, timezone

# Langfuse config — public URL so VPS host can reach it
LANGFUSE_HOST = "https://llm.daybydayconsulting.com"
LANGFUSE_PUBLIC_KEY = "CxO5KnOrKA7aWa4iQ13frgJWXU3lbWH4"
LANGFUSE_SECRET_KEY = "sk-lf-daybyday-2026-secret"

def now_iso():
    return datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%M:%S.000Z')

def send_to_langfuse(batch):
    auth = base64.b64encode(f"{LANGFUSE_PUBLIC_KEY}:{LANGFUSE_SECRET_KEY}".encode()).decode()
    url = f"{LANGFUSE_HOST}/api/public/ingestion"
    payload = json.dumps({"batch": batch}).encode()
    req = urllib.request.Request(
        url, data=payload,
        headers={"Content-Type": "application/json", "Authorization": f"Basic {auth}"}
    )
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            return resp.status
    except Exception as e:
        print(f"[langfuse] Warning: {e}", file=sys.stderr)
        return None

def parse_log_tail(log_file, lines=30):
    try:
        with open(log_file, 'r') as f:
            content = f.readlines()
        return "".join(content[-lines:]).strip()[:3000]
    except:
        return "Log unavailable"

if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("Usage: langfuse_wrapper.py <agent_name> <log_file> <run_id> [status] [duration]")
        sys.exit(1)

    agent_name = sys.argv[1]
    log_file   = sys.argv[2]
    run_id     = sys.argv[3]
    status     = sys.argv[4] if len(sys.argv) > 4 else "success"
    duration   = int(sys.argv[5]) if len(sys.argv) > 5 else 0

    trace_id = f"agent-{agent_name}-{run_id}-{int(time.time())}"
    gen_id   = f"gen-{trace_id}"
    ts       = now_iso()

    output_text = parse_log_tail(log_file)
    level = "ERROR" if status == "failed" else "DEFAULT"

    batch = [
        {
            "id": trace_id,
            "type": "trace-create",
            "timestamp": ts,
            "body": {
                "id": trace_id,
                "name": agent_name,
                "userId": "daybyday-vps",
                "sessionId": f"session-{datetime.now(timezone.utc).strftime('%Y-%m-%d')}",
                "metadata": {
                    "run_id": run_id,
                    "duration_seconds": duration,
                    "status": status,
                    "log_file": log_file
                },
                "tags": ["agent", "vps", agent_name, status]
            }
        },
        {
            "id": gen_id,
            "type": "generation-create",
            "timestamp": ts,
            "body": {
                "id": gen_id,
                "traceId": trace_id,
                "name": f"{agent_name}-run",
                "model": "claude-sonnet-4-6",
                "input": {"skill": agent_name, "run_id": run_id},
                "output": output_text,
                "level": level,
                "statusMessage": output_text[:500] if status == "failed" else None,
                "metadata": {
                    "duration_seconds": duration,
                    "status": status
                },
                "endTime": ts
            }
        }
    ]

    result = send_to_langfuse(batch)
    if result:
        print(f"[langfuse] Trace sent: {trace_id} | Agent: {agent_name} | Status: {status} | Duration: {duration}s | HTTP: {result}")
    else:
        print(f"[langfuse] Trace queued locally (Langfuse unreachable) | Agent: {agent_name}")
