#!/usr/bin/env python3
"""
Context Compressor — inspired by MemGPT memory consolidation.
Runs before each agent execution to minimize token usage.
Usage: compress-context.py <agent_name>
Returns compressed context as JSON.
"""
import sys, json, subprocess, re

def get_db(sql):
    result = subprocess.run(
        ['docker','exec','daybyday-postgres','psql','-U','daybyday','-d','daybyday','-t','-c', sql],
        capture_output=True, text=True
    )
    return result.stdout.strip()

def compress_memory(agent_name):
    """Compress multiple memory items into a dense summary."""
    raw = get_db(f"""
        SELECT memory_type, title, content FROM agent_memory 
        WHERE agent_name='{agent_name}' 
        ORDER BY confidence DESC, created_at DESC LIMIT 10
    """)
    if not raw or raw == '(0 rows)': return ''
    
    items = []
    for line in raw.split('\n'):
        line = line.strip()
        if '|' in line and line and not line.startswith('-'):
            parts = [p.strip() for p in line.split('|')]
            if len(parts) >= 3:
                items.append(f"[{parts[0]}] {parts[1]}: {parts[2]}")
    
    # Compress: keep first 80 chars of each, max 5 items (MemGPT style)
    compressed = []
    for item in items[:5]:
        compressed.append(item[:150])
    return '\n'.join(compressed)

def compress_feedback(agent_name):
    """Keep only actionable feedback, last 3 items, ultra-compressed."""
    raw = get_db(f"""
        SELECT COALESCE(label,''), COALESCE(comment,'') FROM agent_feedback 
        WHERE agent_name='{agent_name}' AND rating <= 3
        AND created_at > NOW()-INTERVAL '14 days'
        ORDER BY created_at DESC LIMIT 3
    """)
    if not raw or raw == '(0 rows)': return ''
    
    feedback = []
    for line in raw.split('\n'):
        line = line.strip()
        if '|' in line and line and not line.startswith('-'):
            parts = [p.strip() for p in line.split('|')]
            if any(p for p in parts):
                feedback.append(f"FIX: {' | '.join(p for p in parts if p)[:120]}")
    return '\n'.join(feedback)

def get_last_run_summary(agent_name):
    """Get ultra-brief last run context — Reflexion-style."""
    raw = get_db(f"""
        SELECT status, duration_seconds, summary FROM agent_runs 
        WHERE agent_name='{agent_name}' AND status != 'running'
        ORDER BY started_at DESC LIMIT 1
    """)
    if not raw or raw == '(0 rows)': return ''
    
    for line in raw.split('\n'):
        line = line.strip()
        if '|' in line and not line.startswith('-'):
            parts = [p.strip() for p in line.split('|')]
            status = parts[0] if parts else '?'
            summary = parts[2][:200] if len(parts) > 2 else ''
            return f"LAST RUN: {status}. {summary}"
    return ''

if __name__ == '__main__':
    agent_name = sys.argv[1] if len(sys.argv) > 1 else ''
    if not agent_name:
        print(json.dumps({'memory':'','feedback':'','last_run':''}))
        sys.exit(0)
    
    result = {
        'memory': compress_memory(agent_name),
        'feedback': compress_feedback(agent_name),
        'last_run': get_last_run_summary(agent_name)
    }
    print(json.dumps(result))
