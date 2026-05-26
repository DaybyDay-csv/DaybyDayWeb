#!/usr/bin/env python3
"""
sync-topic-to-estado.py — Converts topic_research.py output to estado.json task format.
Runs after topic_research.py inside run-daily-blog.sh pre-hook.
Writes pending tasks to /root/projects/DaybyDay/seo-plan/estado.json.

Schema understood:
  published_posts: [slug_str, ...]
  tasks: [{id, status, type, title, keyword, slug, volume, ...}]
  completed_tasks: [str slug, ...]  (legacy, str not dict)
  last_updated: str ISO datetime
"""
import json
import sys
from pathlib import Path
from datetime import datetime

STATE_FILE = Path("/root/logs/topic-research/state.json")
ESTADO_FILE = Path("/root/projects/DaybyDay/seo-plan/estado.json")

def slug_to_keyword(slug):
    return slug.replace("-", " ")

def load_estado():
    with open(ESTADO_FILE) as f:
        return json.load(f)

def save_estado(estado):
    with open(ESTADO_FILE, "w") as f:
        json.dump(estado, f, indent=2, ensure_ascii=False, default=str)

def sync():
    if not STATE_FILE.exists():
        print("No topic_research state file — skipping sync")
        return

    with open(STATE_FILE) as f:
        state = json.load(f)

    topics = state.get("topics", [])
    topics_by_slug = {t.get("slug", ""): t for t in topics if t.get("slug")}

    estado = load_estado()

    # Build sets of what already exists
    published = set(estado.get("published_posts", []))
    completed_slugs = set(estado.get("completed_tasks", []))  # legacy: list of str slugs
    pending_slugs = {t.get("slug") for t in estado.get("tasks", []) if t.get("status") == "pending"}
    all_existing = published | completed_slugs | pending_slugs

    new_tasks = []
    new_task_id = 1
    for t in estado.get("tasks", []):
        try:
            tid = int(t.get("id", "T0")[1:])
            new_task_id = max(new_task_id, tid + 1)
        except:
            pass

    added = 0
    for slug, topic in topics_by_slug.items():
        if slug in all_existing:
            continue

        cluster = topic.get("cluster", "general")
        score = topic.get("blog_score", 50)

        new_tasks.append({
            "id": f"T{new_task_id:03d}",
            "status": "pending",
            "type": "article",
            "title": topic.get("title", ""),
            "keyword": slug_to_keyword(slug),
            "slug": slug,
            "cluster": cluster,
            "volume": "100-500",
            "priority": "medium",
            "blog_score": score,
            "source": topic.get("source", "topic_research"),
            "created_by": "sync-topic-to-estado",
            "created_at": datetime.now().isoformat(),
        })
        new_task_id += 1
        added += 1

    if new_tasks:
        estado.setdefault("tasks", []).extend(new_tasks)
        estado["last_updated"] = datetime.now().isoformat()
        save_estado(estado)
        print(f"Added {added} new pending tasks → estado.json ({len(estado['tasks'])} total tasks, {len([t for t in estado['tasks'] if t.get('status')=='pending'])} pending)")
        for t in new_tasks[:5]:
            print(f"  {t['id']}: {t['title'][:65]} (score={t['blog_score']:.0f})")
        if added > 5:
            print(f"  ... and {added - 5} more")
    else:
        print("No new topics — all topic research slugs already in published or tasks")

if __name__ == "__main__":
    sync()