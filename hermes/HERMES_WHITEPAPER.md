# HERMES v2 — Production Whitepaper for Autonomous Execution by MiniMax 2.7

> **Reader contract:** This document is the single source of truth for MiniMax 2.7 running in YOLO mode to bring the DayByDay automated SEO blog pipeline to production. Every step has cause, why, solution, action, verify, rollback. Execute phases in order. Do not skip. State lives on disk under `/root/projects/DaybyDay/hermes/state/`.

**Owner:** DayByDay Consulting (Pablo Santirsó + Jorge González)
**Repo:** https://github.com/DaybyDay-csv/DaybyDayWeb.git
**Working dir:** `/root/projects/DaybyDay/`
**Execution model:** MiniMax 2.7 (cheap per-token) for LLM phases, pure shell/Python for deterministic phases.
**North star KPI:** #1 organic Google for "agencia paid media España", "media buying D2C", "Meta Ads D2C ecommerce". Concrete proxy: 3-5 high-quality posts/week published, prerendered, indexed, no failed deploys.

---

## 0. EXECUTION CONTRACT FOR MINIMAX 2.7

> **Status note (2026-05-20):** All pre-bake work from sections 1-7 is **DONE on disk**. Skim sections 0-2 + 8, then jump to "POST-PREBAKE NEXT STEPS" at the bottom. Most artifacts already exist.

MiniMax operates this system in **two paths** depending on which API keys are present in `/root/.env`:

### PATH A (default, ACTIVE — no extra keys required)
MiniMax-running-in-YOLO IS the LLM. When a phase script needs reasoning (Strategist, Researcher, Writer, Improver) it calls `/root/scripts/minimax_call.sh` which returns **exit code 64** and writes a Path-A sentinel JSON to the output file. MiniMax must then:
1. Read the system prompt file (`hermes/prompts/<phase>.md`)
2. Read the user prompt file (the sentinel points to it)
3. Produce the JSON or JSX output **directly in its own session**
4. Write it to the output path the sentinel specifies
5. Re-invoke `hermes/scripts/orchestrator.sh` to continue the state machine

Path A is cheap because MiniMax-as-orchestrator already has the conversation context loaded — no extra API call needed.

### PATH B (unlocks when keys present)
Set `MINIMAX_API_KEY` and (optionally) `BRAVE_API_KEY` in `/root/.env`. Then `minimax_call.sh` curls the MiniMax API directly and `brave_search.sh` returns real search results. State machine works identically — phase scripts don't care which path. Path B enables headless cron operation without MiniMax-as-orchestrator in the loop.

**Other modes considered, decision:**
- Sub-agent LLM calls via raw API → only Path B; not available until keys added.

Every phase MUST:
- Be **idempotent** (re-running same phase with same state = no-op or same result).
- Write a **phase output file** to `hermes/state/` before exiting.
- Return exit code: `0`=ok, `42`=quota/rate-limit (retry later), `30`=dirty-state-halt, any other non-zero = unrecoverable, alert via Telegram.

**YOLO guardrails (hard rules MiniMax must never violate):**
- ❌ Never delete files outside `/root/projects/DaybyDay/` and `/root/logs/` and `/root/.claude/scheduled-tasks/`.
- ❌ Never `rm -rf` anything without an explicit allowlist check.
- ❌ Never `git push --force` to `main`.
- ❌ Never commit files matching `*.env`, `*.bak`, `node_modules/`, `dist/`.
- ❌ Never modify `package.json`, `vite.config.js`, `tailwind.config.js`, `src/components/`, `src/layouts/`, `src/styles/`.
- ✅ Only write blog content under `src/pages/blog/`.
- ✅ Only mutate routing/state via the deterministic scripts built in Phase 2 (`update-routes.js`, `mutate-estado.py`).

---

## 1. ROOT CAUSE TABLE — cause → why → solution

Use this as the master tracker. Each row maps to one Phase below.

| # | Cause | Why it happens | Solution | Phase |
|---|-------|----------------|----------|-------|
| C1 | Monolithic `claude -p` call doing strategy+research+writing+publish in one shot | `run-daily-blog.sh:77-80` injects 455-line SKILL.md as system prompt and asks model to do everything sequentially in one session | Split into 6 sub-agents with separate API calls. Each does ONE thing. Orchestrator owns state machine. | P3 |
| C2 | 19 rate-limit retries on 2026-05-20 burned ~250k tokens redoing the same task | No idempotency key. Every retry restarts from scratch. No `quota_reset_at` parsing. | State machine reads `state/current.json` on entry. Phase exits `42` on rate-limit → orchestrator sleeps until reset, resumes same phase. | P3 |
| C3 | SKILL.md = 455 lines, ~11k tokens, injected every run, much is positioning prose and duplicates | Author kept appending rules instead of refactoring. No token caching enabled. | Split into 6 slim agent prompts (≤40 lines each). Move positioning to `branding.json`. Use MiniMax prompt caching headers. | P2, P5 |
| C4 | Build fails on raw `<` in JSX text ("audiencias `<2M` usuarios") | LLM-written content can introduce unescaped angle brackets when discussing comparisons | Pre-commit JSX-safety check (`jsx-safe-check.py`) that regex-fails the commit. | P4 |
| C5 | Commit with `<<<<<<< HEAD` merge marker in `src/App.jsx` | `git pull --rebase` inside the runner hits conflict, agent didn't notice, committed conflicted file | Pre-commit hook scans for conflict markers. Runner stops merging into main; uses preview branch + GitHub Action for promotion. | P4 |
| C6 | `EADDRINUSE :::4173` on prerender | `scripts/prerender.mjs:60` hardcodes `PORT=4173` with no port-availability check. Previous run leaked the http server. | Replace fixed port with `get-port` OR `fuser -k 4173/tcp` in Publisher before invocation. | P4 |
| C7 | `vercel.json` rewrite excludes `/blog/*` from SPA fallback | If prerender fails, the post URL serves no HTML for crawlers | Add `/blog/*` fallback rule. Decouple build vs prerender exit codes. | P4 |
| C8 | `VERCEL_TOKEN` plaintext in `run-daily-blog.sh:3` | Quick hack never moved to env file | Rotate token, move to `/root/.env`, every script does `set -a && source /root/.env && set +a`. Add git-history scan. | P1 |
| C9 | Worktrees `epic-pasteur` + `pivot-growth` permanently dirty (`.bak` files, modified `.gitignore`) | No cleanup step in runner. Stale files block `git pull --rebase`. | `*.bak` and `*~` go in root `.gitignore`. Pre-run guard `git status --porcelain` halts if dirty. | P1 |
| C10 | `system-improver` skill missing — `ls /root/.claude/scheduled-tasks/system-improver/` returns nothing | Skill was referenced by cron but never created | Create the Improver agent prompt + cron. Reads 7d `agent_runs`, proposes patch PR. | P6 |
| C11 | `keyword_priorities.json` last updated 2026-04-27 | No feedback from GSC fetch into priorities | Analyst phase runs daily, mutates `keyword_priorities.json.priority` based on GSC quick-wins (pos 4-10, clicks>5). | P5 |
| C12 | `agent_runs` Postgres table is write-only — no agent ever reads its own history | Logging was added for humans, not for model self-awareness | Improver phase reads last 7d. Add `phase, input_tokens, output_tokens, cache_hit_rate, error_class` columns. | P6 |
| C13 | WebSearch budget enforced only in prose ("máximo 3") | Natural-language constraints get ignored under pressure | Hard code via `--allowedTools` per agent AND `langfuse_wrapper.py` aborts phase if budget breached. | P3 |
| C14 | No daily token budget gauge | When usage explodes from retry storms nobody notices until cron next day | Cumulative daily input tokens written to `state/budget-<DATE>.json`. Telegram alert at 80% of cap. | P6 |
| C15 | Vercel deploys merge `claude/epic-pasteur` → `main` from inside runner, conflicting on unrelated files | Shortcut to skip PR review | Use Vercel preview on `claude/epic-pasteur`. Promotion to `main` via GitHub Action only after green build + lighthouse ≥85. | P4, P7 |

---

## 2. SYSTEM ARCHITECTURE (Hermes v2)

### 2.1 Directory layout (final state)

```
/root/projects/DaybyDay/
├── hermes/
│   ├── HERMES_WHITEPAPER.md      ← this file
│   ├── branding.json             ← Pablo/Jorge positioning (300 tok), Writer-only
│   ├── checklist.json            ← GEO/AEO checklist keys
│   ├── examples-pool.json        ← ad-hoc rotational examples
│   ├── template.jsx              ← golden blog template
│   ├── prompts/
│   │   ├── strategist.md         ← ≤40 lines
│   │   ├── researcher.md         ← ≤40 lines
│   │   ├── writer.md             ← ≤40 lines
│   │   ├── improver.md           ← ≤40 lines
│   │   └── publisher.md          ← (shell-only, no LLM, doc reference)
│   ├── state/
│   │   ├── current.json          ← {phase, task_id, run_id, started_at, retries}
│   │   ├── plan-<DATE>.json
│   │   ├── research-<DATE>.json
│   │   ├── budget-<DATE>.json
│   │   └── lock                  ← flock file
│   └── scripts/
│       ├── orchestrator.sh       ← main state machine
│       ├── strategist.sh
│       ├── researcher.sh
│       ├── writer.sh
│       ├── publisher.sh
│       ├── analyst.sh
│       ├── improver.sh
│       ├── update-routes.js      ← deterministic JSX/JSON edits
│       ├── mutate-estado.py
│       ├── jsx-safe-check.py
│       └── verify-blog.sh
└── ... (existing repo)
```

### 2.2 Agent table

| Agent | Trigger | Inputs (read) | Outputs (write) | Tools/Runtime | Model | Max tok | Idempotency key |
|-------|---------|---------------|-----------------|---------------|-------|---------|-----------------|
| Strategist | cron 04:30 UTC L-V | estado.json (top5 pending), keyword_priorities (top10), gsc-daily.json | `hermes/state/plan-<DATE>.json` | curl MiniMax API | minimax-2.7-text-01 | 4k | `task_id+date` |
| Researcher | after Strategist | plan-<DATE>.json | `hermes/state/research-<DATE>.json` | curl MiniMax API + WebSearch (3) + WebFetch (2) | minimax-2.7-text-01 | 6k | `task_id` |
| Writer | after Researcher | plan + research + branding.json + template.jsx | `src/pages/blog/<Slug>Page.jsx` | curl MiniMax API | minimax-2.7-text-01 | 15k | content sha |
| Publisher | after Writer | new JSX + estado.json | edits 5 files, builds, commits, pushes | **pure shell, NO LLM** | n/a | n/a | commit sha |
| Analyst | cron 06:00 UTC daily | GSC API, Lighthouse, agent_runs | gsc-daily.json + mutates keyword_priorities | **pure Python, NO LLM** | n/a | n/a | run date |
| Improver | cron Sun 03:00 UTC | last 7d agent_runs + build logs | `hermes/state/improvement-<WEEK>.md` + PR | curl MiniMax API | minimax-2.7-text-01 | 8k | ISO week |

### 2.3 Orchestrator state machine

```
                    ┌──────────────────────────────────────────┐
                    │                  IDLE                    │ ← entrypoint each run
                    └────────────────────┬─────────────────────┘
                                         ▼
                                   [Strategist]
                                         │
                              success ───┼─── exit 42 (rate-limit) → sleep, retry same phase
                                         ▼
                                    PLANNED ─────────► fail (3x) → ALERT, IDLE
                                         │
                                         ▼
                                   [Researcher]
                                         │
                                         ▼
                                  RESEARCHED
                                         │
                                         ▼
                                    [Writer]
                                         │
                                         ▼
                                    WRITTEN
                                         │
                                         ▼
                                   [Publisher]   (shell only)
                                         │
                                         ▼
                                   PUBLISHED
                                         │
                                         ▼
                                    [Analyst]    (shell only, async)
                                         │
                                         ▼
                                        IDLE
```

- State persisted in `hermes/state/current.json` after every transition.
- `flock /var/lock/hermes.lock` wraps the orchestrator. Two crons cannot collide.
- On entry: if `state.phase != IDLE`, resume from that phase.
- On `exit 42`: parse `quota_reset_at` from stderr, write to state, schedule retry via `at` command.
- On `exit 30`: halt and alert (dirty git state, missing dependency, etc.).

---

## 3. IMPLEMENTATION PHASES (execute in order)

> Each phase has: **CAUSE** addressed, **ACTION** (commands to run), **VERIFY** (must exit 0), **ROLLBACK** (if verify fails).

### PHASE 1 — Security & Hygiene (30 min, BLOCKER for everything)

Addresses: **C8, C9**.

**1.1 Rotate Vercel token**

CAUSE: Plaintext `VERCEL_TOKEN` in `run-daily-blog.sh:3`.
WHY: World-readable file + risk of leak in `git log` if ever committed.
SOLUTION: Generate new token in Vercel dashboard, store in `/root/.env`, scrub from scripts.

ACTION:
```bash
# Step 1: Verify token not in git history
cd /root/projects/DaybyDay
git log --all -S "vcp_37LqDbmC3CUN" --oneline | head -5
# If any results → CRITICAL: rewrite history with git-filter-repo (manual decision)

# Step 2: Append rotated token to /root/.env
# (MiniMax: prompt operator via Telegram for new token if not provided)
# Format:
# export VERCEL_TOKEN="<new-token>"
# export VERCEL_ORG_ID="<org-id>"
# export VERCEL_PROJECT_ID="<project-id>"

# Step 3: Remove hardcoded token from runner
sed -i.bak '/^export VERCEL_TOKEN=/d' /root/scripts/run-daily-blog.sh

# Step 4: Inject env-sourcing line at top
sed -i '2i set -a && source /root/.env && set +a' /root/scripts/run-daily-blog.sh
```

VERIFY:
```bash
! grep -q 'VERCEL_TOKEN="vcp_' /root/scripts/run-daily-blog.sh \
  && grep -q 'source /root/.env' /root/scripts/run-daily-blog.sh \
  && [ -n "$(grep VERCEL_TOKEN /root/.env)" ] \
  && echo OK
```

ROLLBACK: `cp /root/scripts/run-daily-blog.sh.bak /root/scripts/run-daily-blog.sh`.

**1.2 Worktree gitignore**

CAUSE: `.bak` files and uncommitted `.gitignore` modifications block rebases.
WHY: Runner adds `relatedPosts.json.bak` etc., never cleans them, next `git pull` conflicts.
SOLUTION: Append patterns to root `.gitignore` + commit + add pre-run dirty-state guard.

ACTION:
```bash
cd /root/projects/DaybyDay
cat >> .gitignore <<'EOF'

# Hermes hygiene
*.bak
*~
.claude/worktrees/*/node_modules/
hermes/state/*
!hermes/state/.gitkeep
EOF
mkdir -p hermes/state && touch hermes/state/.gitkeep
git add .gitignore hermes/state/.gitkeep
git commit -m "chore(hermes): gitignore .bak files and state dir"
```

VERIFY:
```bash
cd /root/projects/DaybyDay
git status --porcelain | grep -v '^??.*\.bak$' | wc -l  # must be 0
```

**1.3 Stale worktree cleanup**

ACTION:
```bash
cd /root/projects/DaybyDay/.claude/worktrees/epic-pasteur
git restore --staged . && git checkout -- .
find . -name '*.bak' -delete
cd /root/projects/DaybyDay/.claude/worktrees/pivot-growth
git restore --staged . && git checkout -- .
```

VERIFY: `git -C <worktree> status --porcelain | wc -l` → 0 for each.

---

### PHASE 2 — Hermes skeleton & config files (45 min)

Addresses: **C3** (token bloat refactor).

**2.1 Extract branding from old SKILL.md**

Read `/root/.claude/scheduled-tasks/daybyday-daily-blog/SKILL.md` lines 282-354. Convert prose to JSON.

ACTION: Create `/root/projects/DaybyDay/hermes/branding.json`:
```json
{
  "company": "DayByDay Consulting",
  "positioning": "Agencia paid media especialista en D2C eCommerce España",
  "partners": [
    {
      "name": "Pablo Santirsó",
      "role": "Founder · Paid Media, Estrategia & Operaciones",
      "lead_for": "paid media, Meta Ads, atribución, estrategia",
      "linkedin": "https://es.linkedin.com/in/pablo-santirso-perez"
    },
    {
      "name": "Jorge González",
      "role": "Partner · CTO · Automations & Agentic AI",
      "lead_for": "tech ad-hoc, automation, agentic AI, integraciones",
      "linkedin": "https://www.linkedin.com/in/jorge-gonz%C3%A1lez-p%C3%A9rez-4091541b6/"
    }
  ],
  "differentiators": [
    "Partnership senior — el cliente habla con founder + CTO, sin account managers",
    "Una conversación, dos cabezas — paid + tech en la misma reunión, sin handoffs",
    "Sin sesgo cruzado — Pablo imagina, Jorge filtra viabilidad técnica",
    "Soluciones ad-hoc (SDD/PDD) — no playbooks genéricos",
    "+156% ROAS en 90 días — caso real D2C",
    "Garantía paid media: sin mejora en 90 días → auditoría sin coste"
  ],
  "icp_paid_media": "eCommerce D2C España, >5K€/mes Meta Ads, <50 empleados, >500K€/año facturación",
  "icp_tech": "B2B + B2C, agentic AI, RPA, integración cloud Azure, dashboards custom",
  "cta_primary": "https://calendly.com/daybydayconsulting/discovery",
  "contact_email": "contact@daybydayconsulting.com",
  "site": "https://www.daybydayconsulting.com"
}
```

**2.2 Quality checklist**

ACTION: Create `/root/projects/DaybyDay/hermes/checklist.json`:
```json
{
  "seo": [
    "keyword in <title> (50-60 chars)",
    "keyword in <meta name='description'> (140-160 chars)",
    "keyword in H1 verbatim",
    "keyword in first <strong> of first paragraph",
    "3+ H2 sections, ≥1 H3 per H2",
    "≥1 table or comparison list",
    "5 FAQs with FAQPage JSON-LD schema"
  ],
  "geo": [
    "Direct answer in first 60 words (for AI Overview citation)",
    "Stat with source citation in first 200 words",
    "Brand mention ('DayByDay Consulting') in conclusion",
    "Author block with Pablo or Jorge schema.org/Person markup"
  ],
  "technical": [
    "NO raw < or > in JSX text (use &lt; / &gt; or wrap in {})",
    "NO conflict markers (<<<<<<<, =======, >>>>>>>)",
    "NO TODO/FIXME comments",
    "JSX prop quotes consistent",
    "Imports match BlogPostLayout pattern",
    "Component name matches slug PascalCase + 'Page'"
  ],
  "content": [
    "1000-1500 words target",
    "Spanish, second person plural informal ('vosotros' avoided, neutral 'tú' or impersonal)",
    "Real numbers with year and source — no invented stats",
    "≥1 internal link to pillar page",
    "≥2 internal links to related spokes",
    "≥1 external authority link (Meta/Google/Statista/IAB)",
    "CTA to calendly at end"
  ]
}
```

**2.3 Examples pool**

ACTION: Create `/root/projects/DaybyDay/hermes/examples-pool.json` with 6-8 anonymized client snippets (one per article rotation). Format:
```json
{
  "examples": [
    {"sector": "moda", "stat": "+156% ROAS en 90 días", "context": "D2C moda femenina, escalado de 8K€/mes a 24K€/mes Meta Ads sin pérdida de eficiencia"},
    {"sector": "belleza", "stat": "CPA bajó 38%", "context": "Marca cosmética natural, segmentación lookalike sobre clientes top-20% LTV"}
  ]
}
```
(MiniMax: populate with 6-8 real-or-plausible examples from existing blog posts. Read 3 random posts under `src/pages/blog/` for tone.)

**2.4 Golden template**

ACTION: Copy the most recent successful blog post as `hermes/template.jsx`. Replace its concrete content with `{{PLACEHOLDER}}` tokens:
```bash
LATEST=$(ls -t /root/projects/DaybyDay/src/pages/blog/*Page.jsx | head -1)
cp "$LATEST" /root/projects/DaybyDay/hermes/template.jsx
# Then MiniMax edits the copy to replace title/H1/sections with placeholders like {{TITLE}}, {{KEYWORD}}, {{FAQS}}, {{TABLE_ROWS}}
```

VERIFY (Phase 2 overall):
```bash
test -f /root/projects/DaybyDay/hermes/branding.json && \
test -f /root/projects/DaybyDay/hermes/checklist.json && \
test -f /root/projects/DaybyDay/hermes/examples-pool.json && \
test -f /root/projects/DaybyDay/hermes/template.jsx && \
python3 -c "import json; [json.load(open(f'/root/projects/DaybyDay/hermes/{f}.json')) for f in ['branding','checklist','examples-pool']]" && \
echo OK
```

---

### PHASE 3 — Agent prompts + LLM wrapper (1 hour)

Addresses: **C1, C2, C13**.

**3.1 MiniMax API wrapper**

CAUSE: Need a uniform interface so every agent calls MiniMax the same way with budget enforcement.
SOLUTION: One script, one signature.

ACTION: Create `/root/scripts/minimax_call.sh`:
```bash
#!/bin/bash
# Usage: minimax_call.sh <system_prompt_file> <user_prompt_file> <max_tokens> <output_file>
# Reads MINIMAX_API_KEY from /root/.env
# Writes raw response text to <output_file>
# Exit codes: 0 ok, 42 rate-limited, 1 other error
set -euo pipefail
set -a && source /root/.env && set +a

SYS_FILE="$1"; USR_FILE="$2"; MAX_TOK="$3"; OUT_FILE="$4"
TRACE_ID="hermes-$(date +%Y%m%d-%H%M%S)-$$"

SYS=$(jq -Rs . < "$SYS_FILE")
USR=$(jq -Rs . < "$USR_FILE")

PAYLOAD=$(cat <<EOF
{
  "model": "minimax-text-01",
  "max_tokens": ${MAX_TOK},
  "temperature": 0.4,
  "messages": [
    {"role": "system", "content": ${SYS}},
    {"role": "user",   "content": ${USR}}
  ]
}
EOF
)

HTTP_CODE=$(curl -s -o /tmp/mm-${TRACE_ID}.json -w "%{http_code}" \
  -X POST "https://api.minimax.chat/v1/text/chatcompletion_v2" \
  -H "Authorization: Bearer ${MINIMAX_API_KEY}" \
  -H "Content-Type: application/json" \
  -d "$PAYLOAD")

if [ "$HTTP_CODE" = "429" ]; then
  echo "RATE_LIMIT $(date)" >&2
  cat /tmp/mm-${TRACE_ID}.json >&2
  exit 42
elif [ "$HTTP_CODE" != "200" ]; then
  echo "MINIMAX_ERROR $HTTP_CODE" >&2
  cat /tmp/mm-${TRACE_ID}.json >&2
  exit 1
fi

# Extract content
jq -r '.choices[0].message.content' /tmp/mm-${TRACE_ID}.json > "$OUT_FILE"

# Log token usage
IN_TOK=$(jq -r '.usage.prompt_tokens // 0' /tmp/mm-${TRACE_ID}.json)
OUT_TOK=$(jq -r '.usage.completion_tokens // 0' /tmp/mm-${TRACE_ID}.json)
BUDGET_FILE="/root/projects/DaybyDay/hermes/state/budget-$(date +%Y-%m-%d).json"
python3 - <<PYEOF
import json, os
p = "${BUDGET_FILE}"
d = json.load(open(p)) if os.path.exists(p) else {"in":0,"out":0,"calls":0}
d["in"]  += ${IN_TOK}
d["out"] += ${OUT_TOK}
d["calls"] += 1
json.dump(d, open(p,"w"))
PYEOF

# Cleanup
rm -f /tmp/mm-${TRACE_ID}.json
exit 0
```

Make executable: `chmod +x /root/scripts/minimax_call.sh`.

VERIFY:
```bash
echo "You are a test." > /tmp/sys.txt
echo "Reply with exactly: PONG" > /tmp/usr.txt
/root/scripts/minimax_call.sh /tmp/sys.txt /tmp/usr.txt 50 /tmp/out.txt
grep -i PONG /tmp/out.txt
```

**3.2 Strategist prompt**

ACTION: Write `/root/projects/DaybyDay/hermes/prompts/strategist.md`:
```
You pick ONE blog topic for today. Output ONLY valid JSON, no prose, no markdown fences.

INPUT (in user message):
- top5_pending: array of pending tasks from estado.json (id, title, keyword, slug, cluster, priority, blog_score)
- top10_keywords: array from keyword_priorities.json
- gsc_quickwins: array of {query, position, clicks, impressions} for queries at position 4-10 with clicks>=5

RULES:
1. Pick the lowest-id pending article from top5_pending with priority in [high, medium].
2. If a gsc_quickwin keyword matches a pending task's keyword (case-insensitive substring), boost that task.
3. Generate 5 FAQ questions specific to the keyword and Spanish D2C eCommerce context.
4. Suggest 2-3 internal-link slugs from published_posts that are topically adjacent.

OUTPUT JSON SCHEMA:
{
  "task_id": "T0XX",
  "title": "...",
  "slug": "...",
  "keyword": "...",
  "cluster": "...",
  "target_words": 1200,
  "faqs": ["Q1?","Q2?","Q3?","Q4?","Q5?"],
  "internal_link_slugs": ["slug-a","slug-b"],
  "rationale": "1 sentence why this task today"
}
```

**3.3 Researcher prompt**

ACTION: Write `/root/projects/DaybyDay/hermes/prompts/researcher.md`:
```
Gather 3 verified stats for the given keyword. Output ONLY valid JSON.

INPUT (user message): {task_id, keyword, title}

PROCESS:
- Use web search up to 3 times. Use web fetch up to 2 times.
- Stop as soon as you have 3 valid citations.
- Required source mix:
  1 from Meta or Google (official ads platform docs/blog)
  1 from a research org (Statista, IAB Spain, IAB Europe, eMarketer)
  1 operational (industry blog with concrete D2C/eCommerce data, Spain preferred)

VALIDATION:
- Every citation MUST include verifiable URL, year (2024-2026), and exact quoted stat text.
- Never invent. If you cannot find 3 valid, return what you have with "verified":false marker.

OUTPUT JSON:
{
  "task_id": "...",
  "citations": [
    {"url":"...","source":"...","year":"2025","stat":"...","quote":"...","verified":true},
    ...
  ],
  "search_queries_used": ["q1","q2"],
  "fetched_urls": ["u1"]
}
```

Note: MiniMax 2.7 does not have native WebSearch tool. Build a thin wrapper using a Brave Search API or SerpAPI key (operator provides). See Phase 3.5.

**3.4 Writer prompt**

ACTION: Write `/root/projects/DaybyDay/hermes/prompts/writer.md`:
```
Write ONE Spanish blog post as a complete React JSX component. Output ONLY the JSX file content, nothing else (no fences, no commentary).

INPUT (user message contains):
- PLAN: full strategist output JSON
- RESEARCH: full researcher output JSON
- BRANDING: hermes/branding.json content
- CHECKLIST: hermes/checklist.json content
- TEMPLATE: full hermes/template.jsx content with placeholders

RULES:
1. Use TEMPLATE structure exactly. Replace placeholders only. Do NOT introduce new imports or new components.
2. Target 1000-1500 words of body text.
3. Keyword: in <title>, meta description, H1 verbatim, first paragraph wrapped in <strong>.
4. FAQs: render the 5 from PLAN. Include FAQPage JSON-LD schema (already in template — populate it).
5. Citations: insert all 3 from RESEARCH inline as <a href> with rel="nofollow noopener" target="_blank". Include the year and source name in the prose.
6. Internal links: use the slugs from PLAN.internal_link_slugs. Path format: /blog/<slug>
7. Differentiators: weave 1-2 from BRANDING.differentiators naturally — never as a sales blob.
8. Final section: CTA to BRANDING.cta_primary.
9. Author block: pick Pablo (paid media topics) or Jorge (automation/tech topics) from BRANDING.partners. Include schema.org Person markup.

HARD CONSTRAINTS (build will fail otherwise):
- NO raw "<" or ">" in JSX text content. Use &lt; / &gt; or wrap in {"<2M"} JSX expression.
- NO conflict markers (<<<<<<<, =======, >>>>>>>).
- NO TODO/FIXME comments.
- Component name = PascalCase(slug) + "Page". Must match filename.
- Default export the component.

OUTPUT: complete .jsx file content, ready to write to disk.
```

**3.5 Search wrapper (for Researcher)**

CAUSE: MiniMax has no native WebSearch.
SOLUTION: Brave Search API wrapper. Free tier 2000 queries/month.

ACTION: Create `/root/scripts/brave_search.sh`:
```bash
#!/bin/bash
# Usage: brave_search.sh "query" -> prints top 5 results as JSON
set -euo pipefail
set -a && source /root/.env && set +a
QUERY=$(python3 -c "import urllib.parse, sys; print(urllib.parse.quote(sys.argv[1]))" "$1")
curl -s "https://api.search.brave.com/res/v1/web/search?q=${QUERY}&count=5&country=es&search_lang=es" \
  -H "X-Subscription-Token: ${BRAVE_API_KEY}" \
  | jq '{results: [.web.results[] | {url, title, description}]}'
```
Operator must add `BRAVE_API_KEY` to `/root/.env`.

VERIFY:
```bash
/root/scripts/brave_search.sh "meta ads ecommerce españa 2026" | jq '.results | length'  # > 0
```

---

### PHASE 4 — Build-safety, deploy-safety, deterministic Publisher (1.5 hours)

Addresses: **C4, C5, C6, C7, C15**.

**4.1 JSX safety check**

ACTION: Create `/root/projects/DaybyDay/hermes/scripts/jsx-safe-check.py`:
```python
#!/usr/bin/env python3
"""Fails if a JSX file has unsafe content."""
import re, sys, pathlib

PATTERNS = [
    (r'<{7}|>{7}|={7}', 'Conflict marker'),
    (r'TODO|FIXME|XXX', 'TODO/FIXME comment'),
    # Raw "<" or ">" in JSX text node — heuristic: > followed by space and a digit, or < followed by digit, outside braces
    (r'>\s*<\d', 'Suspect raw < before digit in text'),
    (r'[^{=]<\d', 'Raw < before digit outside JSX expression'),
]

errors = []
for path in sys.argv[1:]:
    content = pathlib.Path(path).read_text(encoding='utf-8')
    for pat, msg in PATTERNS:
        for m in re.finditer(pat, content):
            line = content[:m.start()].count('\n') + 1
            errors.append(f"{path}:{line}: {msg}: {m.group(0)!r}")

if errors:
    print("\n".join(errors), file=sys.stderr)
    sys.exit(1)
print("jsx-safe-check: OK")
```

VERIFY:
```bash
echo 'export default function X(){ return (<div>audiencias <2M usuarios</div>); }' > /tmp/bad.jsx
! python3 /root/projects/DaybyDay/hermes/scripts/jsx-safe-check.py /tmp/bad.jsx  # should exit 1
echo 'export default function X(){ return (<div>audiencias &lt;2M usuarios</div>); }' > /tmp/good.jsx
python3 /root/projects/DaybyDay/hermes/scripts/jsx-safe-check.py /tmp/good.jsx  # exit 0
```

**4.2 Conflict-marker pre-commit hook**

ACTION:
```bash
cat > /root/projects/DaybyDay/.git/hooks/pre-commit <<'EOF'
#!/bin/bash
# Reject conflict markers
if git diff --cached -G '^<{7}|^>{7}|^={7}' --name-only | grep -q .; then
  echo "ERROR: conflict markers in staged files" >&2
  exit 1
fi
# Reject .env / .bak / secrets
BAD=$(git diff --cached --name-only | grep -E '\.(env|bak|pem)$|VERCEL_TOKEN|API_KEY' || true)
if [ -n "$BAD" ]; then
  echo "ERROR: refuse to commit secrets/.bak files: $BAD" >&2
  exit 1
fi
exit 0
EOF
chmod +x /root/projects/DaybyDay/.git/hooks/pre-commit
```

VERIFY: stage a fake conflict file and check `git commit` fails.

**4.3 Fix prerender port collision**

ACTION: Patch `scripts/prerender.mjs` to use `get-port`:
```bash
cd /root/projects/DaybyDay
npm install --no-save get-port@7
```
Edit `scripts/prerender.mjs`:
```js
// Replace:
const PORT = 4173;
// With:
import getPort from "get-port";
const PORT = await getPort({port: [4173, 4174, 4175, 4176, 4177]});
```
Also add to Publisher: `fuser -k 4173/tcp 4174/tcp 4175/tcp 4176/tcp 4177/tcp || true` before build.

VERIFY: run `npm run build` twice back-to-back; second run must succeed.

**4.4 Vercel rewrite fallback**

ACTION: Edit `/root/projects/DaybyDay/vercel.json` — add `/blog/*` fallback rewrite AFTER existing rewrites:
```json
{
  "rewrites": [
    {
      "source": "/((?!.*\\.).*)",
      "has": [{ "type": "host", "value": "www.daybydayconsulting.com" }],
      "destination": "/index.html"
    },
    {
      "source": "/((?!blog/|assets/|images/|\\.).*)",
      "destination": "/index.html"
    },
    {
      "source": "/blog/:slug",
      "destination": "/blog/:slug/index.html"
    }
  ]
}
```

**4.5 Deterministic route updater**

CAUSE: Writer must not touch `App.jsx`, `BlogPage.jsx`, `sitemap.xml`, `llms.txt`, `estado.json` — these are surgical edits LLMs get wrong.
SOLUTION: One Node script does it deterministically given a slug.

ACTION: Create `/root/projects/DaybyDay/hermes/scripts/update-routes.js`:
```javascript
#!/usr/bin/env node
/**
 * Usage: node update-routes.js --slug <slug> --title <title> --component <PascalName>
 * Mutates: src/App.jsx, src/pages/BlogPage.jsx, public/sitemap.xml, public/llms.txt, seo-plan/estado.json
 */
import fs from "node:fs";
import path from "node:path";

const args = Object.fromEntries(process.argv.slice(2).reduce((acc, x, i, arr) => {
  if (x.startsWith("--")) acc.push([x.slice(2), arr[i+1]]);
  return acc;
}, []));

const ROOT = "/root/projects/DaybyDay";
const { slug, title, component, taskId, keyword } = args;
const today = new Date().toISOString().slice(0,10);

// 1. App.jsx — add Route + lazy import
const appPath = path.join(ROOT, "src/App.jsx");
let app = fs.readFileSync(appPath, "utf8");
if (!app.includes(`/blog/${slug}`)) {
  // Find marker for lazy imports and routes (assume sorted block markers exist)
  const importLine = `const ${component} = lazy(() => import("./pages/blog/${component}.jsx"));`;
  const routeLine = `        <Route path="/blog/${slug}" element={<Suspense fallback={null}><${component} /></Suspense>} />`;
  app = app.replace(/(\/\/ HERMES_LAZY_IMPORTS_END)/, `${importLine}\n$1`);
  app = app.replace(/(\{\/\* HERMES_ROUTES_END \*\/\})/, `${routeLine}\n        $1`);
  fs.writeFileSync(appPath, app);
}

// 2. BlogPage.jsx — add card entry
const blogIdxPath = path.join(ROOT, "src/pages/BlogPage.jsx");
let idx = fs.readFileSync(blogIdxPath, "utf8");
if (!idx.includes(`slug: "${slug}"`)) {
  const entry = `  { slug: "${slug}", title: "${title.replace(/"/g,'\\"')}", date: "${today}" },`;
  idx = idx.replace(/(\/\/ HERMES_POSTS_END)/, `${entry}\n$1`);
  fs.writeFileSync(blogIdxPath, idx);
}

// 3. sitemap.xml
const smPath = path.join(ROOT, "public/sitemap.xml");
let sm = fs.readFileSync(smPath, "utf8");
const url = `https://www.daybydayconsulting.com/blog/${slug}`;
if (!sm.includes(url)) {
  const block = `  <url><loc>${url}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>\n`;
  sm = sm.replace(/<\/urlset>/, `${block}</urlset>`);
  fs.writeFileSync(smPath, sm);
}

// 4. llms.txt
const llmsPath = path.join(ROOT, "public/llms.txt");
let llms = fs.readFileSync(llmsPath, "utf8");
if (!llms.includes(`/blog/${slug}`)) {
  llms += `\n- [${title}](${url})`;
  fs.writeFileSync(llmsPath, llms);
}

// 5. estado.json — mark task published
const estPath = path.join(ROOT, "seo-plan/estado.json");
const est = JSON.parse(fs.readFileSync(estPath, "utf8"));
const t = est.tasks.find(x => x.id === taskId);
if (t) {
  t.status = "published";
  t.published_at = new Date().toISOString();
  t.published_slug = slug;
}
est.published_posts = est.published_posts || [];
if (!est.published_posts.find(p => p.slug === slug)) {
  est.published_posts.push({ slug, title, taskId, date: today, keyword });
}
est.last_updated = new Date().toISOString();
fs.writeFileSync(estPath, JSON.stringify(est, null, 2));

console.log(`update-routes OK: ${slug}`);
```

Requires markers in `App.jsx` and `BlogPage.jsx`. ACTION:
```bash
# One-time: insert markers if not present
cd /root/projects/DaybyDay
grep -q 'HERMES_LAZY_IMPORTS_END' src/App.jsx || \
  sed -i '/^const [A-Z][a-zA-Z]*Page = lazy/a\\/\/ HERMES_LAZY_IMPORTS_END' src/App.jsx | head -1
# Similarly for routes block — MiniMax inspects file and places markers in correct spots
```
(MiniMax: read `src/App.jsx`, identify the last lazy-import line and last `<Route path="/blog/..."` line, insert the two markers after them, commit.)

VERIFY:
```bash
node /root/projects/DaybyDay/hermes/scripts/update-routes.js \
  --slug "test-slug" --title "Test" --component "TestPage" --taskId "T999" --keyword "test"
grep -q 'test-slug' /root/projects/DaybyDay/public/sitemap.xml
# Then revert: git restore src/App.jsx src/pages/BlogPage.jsx public/sitemap.xml public/llms.txt seo-plan/estado.json
```

---

### PHASE 5 — Phase scripts (orchestrator + 6 agents) (2 hours)

**5.1 Orchestrator**

ACTION: Create `/root/projects/DaybyDay/hermes/scripts/orchestrator.sh`:
```bash
#!/bin/bash
set -euo pipefail
set -a && source /root/.env && set +a

HERMES=/root/projects/DaybyDay/hermes
STATE=$HERMES/state/current.json
LOCK=/var/lock/hermes.lock
DATE=$(date +%Y-%m-%d)
LOG=/var/log/daybyday/hermes-$DATE.log
mkdir -p /var/log/daybyday $HERMES/state

exec 200>$LOCK
flock -n 200 || { echo "[$(date)] another orchestrator running" >> $LOG; exit 0; }

log() { echo "[$(date '+%F %T')] $*" | tee -a $LOG; }

# Pre-flight: dirty git check
cd /root/projects/DaybyDay
if [ -n "$(git status --porcelain | grep -v '^??.*\.bak$')" ]; then
  log "HALT 30: dirty git state"
  /root/scripts/notify.sh "Hermes halt: dirty git state" || true
  exit 30
fi

# Load or init state
[ -f $STATE ] || echo '{"phase":"IDLE","task_id":null,"run_id":null,"retries":0}' > $STATE
PHASE=$(jq -r .phase $STATE)
log "Resume phase=$PHASE"

run_phase() {
  local name=$1 cmd=$2
  log "→ $name"
  if $cmd >>$LOG 2>&1; then
    log "✓ $name"
    return 0
  else
    local code=$?
    log "✗ $name (exit $code)"
    if [ $code -eq 42 ]; then
      RETRIES=$(jq -r .retries $STATE)
      if [ $RETRIES -ge 3 ]; then
        log "HALT: max retries"
        /root/scripts/notify.sh "Hermes max retries on $name" || true
        exit 1
      fi
      jq ".retries = .retries + 1" $STATE > $STATE.tmp && mv $STATE.tmp $STATE
      log "rate-limit, exit clean for cron retry"
      exit 0
    fi
    /root/scripts/notify.sh "Hermes failed on $name (code $code)" || true
    exit $code
  fi
}

case $PHASE in
  IDLE|FAILED)
    RUN_ID="hermes-$(date +%Y%m%d-%H%M%S)"
    jq ".phase=\"PLANNING\" | .run_id=\"$RUN_ID\" | .retries=0" $STATE > $STATE.tmp && mv $STATE.tmp $STATE
    run_phase "Strategist" "$HERMES/scripts/strategist.sh"
    jq '.phase="PLANNED"' $STATE > $STATE.tmp && mv $STATE.tmp $STATE
    ;&
  PLANNED)
    run_phase "Researcher" "$HERMES/scripts/researcher.sh"
    jq '.phase="RESEARCHED"' $STATE > $STATE.tmp && mv $STATE.tmp $STATE
    ;&
  RESEARCHED)
    run_phase "Writer" "$HERMES/scripts/writer.sh"
    jq '.phase="WRITTEN"' $STATE > $STATE.tmp && mv $STATE.tmp $STATE
    ;&
  WRITTEN)
    run_phase "Publisher" "$HERMES/scripts/publisher.sh"
    jq '.phase="PUBLISHED"' $STATE > $STATE.tmp && mv $STATE.tmp $STATE
    ;&
  PUBLISHED)
    run_phase "Analyst" "$HERMES/scripts/analyst.sh"
    jq '.phase="IDLE" | .task_id=null | .retries=0' $STATE > $STATE.tmp && mv $STATE.tmp $STATE
    ;;
  *)
    log "Unknown phase $PHASE, resetting to IDLE"
    jq '.phase="IDLE"' $STATE > $STATE.tmp && mv $STATE.tmp $STATE
    ;;
esac

log "✓ run complete"
```

**5.2 Strategist script**

ACTION: `/root/projects/DaybyDay/hermes/scripts/strategist.sh`:
```bash
#!/bin/bash
set -euo pipefail
HERMES=/root/projects/DaybyDay/hermes
REPO=/root/projects/DaybyDay
DATE=$(date +%Y-%m-%d)
OUT=$HERMES/state/plan-$DATE.json
[ -f $OUT ] && echo "plan exists, skip" && exit 0

# Build user prompt: top5 pending + top10 keywords + gsc quickwins
USR=$(mktemp)
jq '{
  top5_pending: ([.tasks[] | select(.status=="pending" and .type=="article")] | sort_by(.id)[:5]),
  published_posts: .published_posts
}' $REPO/seo-plan/estado.json > $USR.a

jq '.priorities[:10]' $REPO/seo-plan/keyword_priorities.json > $USR.b 2>/dev/null || echo '[]' > $USR.b

[ -f $HERMES/state/gsc-daily.json ] && cp $HERMES/state/gsc-daily.json $USR.c || echo '[]' > $USR.c

python3 - <<EOF > $USR
import json
print(json.dumps({
  "top5_pending": json.load(open("$USR.a"))["top5_pending"],
  "published_posts": json.load(open("$USR.a"))["published_posts"],
  "top10_keywords": json.load(open("$USR.b")),
  "gsc_quickwins": json.load(open("$USR.c"))
}, ensure_ascii=False, indent=2))
EOF
rm -f $USR.a $USR.b $USR.c

/root/scripts/minimax_call.sh \
  $HERMES/prompts/strategist.md \
  $USR \
  4000 \
  $OUT.raw

# Validate JSON
python3 -c "import json,sys; d=json.load(open('$OUT.raw')); assert all(k in d for k in ['task_id','title','slug','keyword','faqs']); json.dump(d, open('$OUT','w'))"
rm -f $OUT.raw $USR

# Update state with task_id
TASK_ID=$(jq -r .task_id $OUT)
jq ".task_id=\"$TASK_ID\"" $HERMES/state/current.json > $HERMES/state/current.json.tmp \
  && mv $HERMES/state/current.json.tmp $HERMES/state/current.json
echo "Strategist OK task=$TASK_ID"
```

**5.3 Researcher script**

ACTION: `/root/projects/DaybyDay/hermes/scripts/researcher.sh`:
```bash
#!/bin/bash
set -euo pipefail
HERMES=/root/projects/DaybyDay/hermes
DATE=$(date +%Y-%m-%d)
PLAN=$HERMES/state/plan-$DATE.json
OUT=$HERMES/state/research-$DATE.json
[ -f $OUT ] && echo "research exists, skip" && exit 0

# Pre-fetch 3 search results to ground the LLM
KEYWORD=$(jq -r .keyword $PLAN)
SEARCH_RESULTS=$(/root/scripts/brave_search.sh "$KEYWORD 2026 españa estadísticas" || echo '{}')

USR=$(mktemp)
python3 - <<EOF > $USR
import json
plan = json.load(open("$PLAN"))
search = json.loads('''$SEARCH_RESULTS''')
print(json.dumps({
  "task_id": plan["task_id"],
  "keyword": plan["keyword"],
  "title": plan["title"],
  "search_results": search.get("results", [])
}, ensure_ascii=False, indent=2))
EOF

/root/scripts/minimax_call.sh \
  $HERMES/prompts/researcher.md \
  $USR \
  6000 \
  $OUT.raw

python3 -c "import json; d=json.load(open('$OUT.raw')); assert 'citations' in d and len(d['citations'])>=2; json.dump(d, open('$OUT','w'))"
rm -f $OUT.raw $USR
echo "Researcher OK"
```

**5.4 Writer script**

ACTION: `/root/projects/DaybyDay/hermes/scripts/writer.sh`:
```bash
#!/bin/bash
set -euo pipefail
HERMES=/root/projects/DaybyDay/hermes
REPO=/root/projects/DaybyDay
DATE=$(date +%Y-%m-%d)
PLAN=$HERMES/state/plan-$DATE.json
RESEARCH=$HERMES/state/research-$DATE.json

SLUG=$(jq -r .slug $PLAN)
TITLE=$(jq -r .title $PLAN)
COMPONENT=$(python3 -c "import sys; s=sys.argv[1]; print(''.join(p.capitalize() for p in s.split('-'))+'Page')" "$SLUG")
JSX_PATH=$REPO/src/pages/blog/${COMPONENT}.jsx

[ -f $JSX_PATH ] && echo "JSX exists, skip" && exit 0

USR=$(mktemp)
python3 - <<EOF > $USR
import json
out = {
  "PLAN": json.load(open("$PLAN")),
  "RESEARCH": json.load(open("$RESEARCH")),
  "BRANDING": json.load(open("$HERMES/branding.json")),
  "CHECKLIST": json.load(open("$HERMES/checklist.json")),
  "TEMPLATE": open("$HERMES/template.jsx").read(),
  "COMPONENT_NAME": "$COMPONENT"
}
print(json.dumps(out, ensure_ascii=False, indent=2))
EOF

/root/scripts/minimax_call.sh \
  $HERMES/prompts/writer.md \
  $USR \
  15000 \
  $JSX_PATH

rm -f $USR

# Run safety check
python3 $HERMES/scripts/jsx-safe-check.py $JSX_PATH || {
  echo "JSX safety check failed, deleting"
  rm -f $JSX_PATH
  exit 1
}
echo "Writer OK $JSX_PATH"
```

**5.5 Publisher script (NO LLM)**

ACTION: `/root/projects/DaybyDay/hermes/scripts/publisher.sh`:
```bash
#!/bin/bash
set -euo pipefail
set -a && source /root/.env && set +a
HERMES=/root/projects/DaybyDay/hermes
REPO=/root/projects/DaybyDay
DATE=$(date +%Y-%m-%d)
PLAN=$HERMES/state/plan-$DATE.json

cd $REPO
SLUG=$(jq -r .slug $PLAN)
TITLE=$(jq -r .title $PLAN)
KEYWORD=$(jq -r .keyword $PLAN)
TASK_ID=$(jq -r .task_id $PLAN)
COMPONENT=$(python3 -c "import sys; s=sys.argv[1]; print(''.join(p.capitalize() for p in s.split('-'))+'Page')" "$SLUG")

# 1. Update routes deterministically
node $HERMES/scripts/update-routes.js \
  --slug "$SLUG" --title "$TITLE" --component "$COMPONENT" \
  --taskId "$TASK_ID" --keyword "$KEYWORD"

# 2. Kill any leftover prerender ports
fuser -k 4173/tcp 4174/tcp 4175/tcp 4176/tcp 4177/tcp 2>/dev/null || true

# 3. Build (vite + prerender)
npm run build || exit 10

# 4. JSX safety on all blog pages
python3 $HERMES/scripts/jsx-safe-check.py src/pages/blog/${COMPONENT}.jsx || exit 11

# 5. Commit
git add src/pages/blog/${COMPONENT}.jsx src/App.jsx src/pages/BlogPage.jsx \
        public/sitemap.xml public/llms.txt seo-plan/estado.json
git diff --cached -G '^<{7}|^>{7}|^={7}' --name-only | grep -q . && exit 12
RUN_ID=$(jq -r .run_id $HERMES/state/current.json)
git commit -m "feat(blog): ${SLUG} — keyword: ${KEYWORD} [task=${TASK_ID}] [run=${RUN_ID}]"

# 6. Push to preview branch
git push origin claude/epic-pasteur

# 7. Trigger Vercel deploy via API (preview)
curl -s -X POST "https://api.vercel.com/v13/deployments" \
  -H "Authorization: Bearer ${VERCEL_TOKEN}" \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"daybydayweb\",\"gitSource\":{\"type\":\"github\",\"ref\":\"claude/epic-pasteur\",\"repoId\":\"DaybyDay-csv/DaybyDayWeb\"}}" \
  | jq -r '.url' > $HERMES/state/last-preview-url.txt

# 8. Submit to IndexNow once URL is live (poll)
URL="https://www.daybydayconsulting.com/blog/${SLUG}"
for i in 1 2 3 4 5; do
  sleep 60
  if curl -fsI "$URL" >/dev/null 2>&1; then
    /root/scripts/indexnow-submit.sh "$URL" || true
    break
  fi
done

echo "Publisher OK $SLUG"
```

Note on production promotion: Phase 7 covers GitHub Action that promotes `claude/epic-pasteur` → `main` after preview build + lighthouse pass.

**5.6 Analyst script (NO LLM)**

ACTION: `/root/projects/DaybyDay/hermes/scripts/analyst.sh`:
```bash
#!/bin/bash
set -euo pipefail
HERMES=/root/projects/DaybyDay/hermes
# Fetch GSC data
python3 /root/scripts/gsc_fetch.py --days 7 --output $HERMES/state/gsc-daily.json || true
# Update keyword priorities based on quick-wins
python3 - <<'EOF'
import json, pathlib
gsc_path = "/root/projects/DaybyDay/hermes/state/gsc-daily.json"
kp_path  = "/root/projects/DaybyDay/seo-plan/keyword_priorities.json"
try:
    gsc = json.load(open(gsc_path))
    kp  = json.load(open(kp_path))
except FileNotFoundError:
    raise SystemExit(0)
boosted = 0
qwins = {r["query"].lower() for r in gsc if 4 <= r.get("position",99) <= 10 and r.get("clicks",0) >= 5}
for p in kp.get("priorities", []):
    if p["keyword"].lower() in qwins and p.get("priority") != "high":
        p["priority"] = "high"
        boosted += 1
kp["last_updated"] = __import__("datetime").datetime.utcnow().isoformat()
json.dump(kp, open(kp_path, "w"), ensure_ascii=False, indent=2)
print(f"boosted {boosted} keywords")
EOF
# Daily lighthouse on last published blog
SLUG=$(jq -r '.published_posts[-1].slug' /root/projects/DaybyDay/seo-plan/estado.json)
/root/scripts/lighthouse-audit.sh "https://www.daybydayconsulting.com/blog/$SLUG" \
  > $HERMES/state/lighthouse-$(date +%Y-%m-%d).json || true
echo "Analyst OK"
```

**5.7 Permissions**

```bash
chmod +x /root/projects/DaybyDay/hermes/scripts/*.sh
chmod +x /root/projects/DaybyDay/hermes/scripts/*.py
chmod +x /root/projects/DaybyDay/hermes/scripts/*.js
chmod +x /root/scripts/minimax_call.sh /root/scripts/brave_search.sh
```

VERIFY (Phase 5 dry-run):
```bash
# Dry run with state forced to IDLE on a test task
echo '{"phase":"IDLE","task_id":null,"run_id":null,"retries":0}' > /root/projects/DaybyDay/hermes/state/current.json
/root/projects/DaybyDay/hermes/scripts/orchestrator.sh
# Check state advanced
jq .phase /root/projects/DaybyDay/hermes/state/current.json  # expect IDLE (full loop completed) or PUBLISHED
ls /root/projects/DaybyDay/hermes/state/  # expect plan-*, research-*, gsc-daily.json
```

---

### PHASE 6 — Self-improvement loop + observability (1 hour)

Addresses: **C10, C11, C12, C14**.

**6.1 Postgres schema upgrade**

ACTION:
```bash
docker exec daybyday-postgres psql -U daybyday -d daybyday -c "
ALTER TABLE agent_runs ADD COLUMN IF NOT EXISTS phase TEXT;
ALTER TABLE agent_runs ADD COLUMN IF NOT EXISTS input_tokens INTEGER;
ALTER TABLE agent_runs ADD COLUMN IF NOT EXISTS output_tokens INTEGER;
ALTER TABLE agent_runs ADD COLUMN IF NOT EXISTS cache_hit_rate REAL;
ALTER TABLE agent_runs ADD COLUMN IF NOT EXISTS error_class TEXT;
ALTER TABLE agent_runs ADD COLUMN IF NOT EXISTS run_id TEXT;
"
```

Each phase script appends a row at start (`status='running'`) and updates at end with tokens + error_class.

**6.2 Token budget gauge**

ACTION: Create `/root/projects/DaybyDay/hermes/scripts/budget-watch.sh`:
```bash
#!/bin/bash
DATE=$(date +%Y-%m-%d)
F=/root/projects/DaybyDay/hermes/state/budget-$DATE.json
[ -f $F ] || exit 0
IN=$(jq .in $F)
DAILY_CAP=200000
PCT=$(( IN * 100 / DAILY_CAP ))
if [ $PCT -ge 80 ]; then
  /root/scripts/notify.sh "Hermes token budget at ${PCT}% ($IN / $DAILY_CAP)"
fi
```
Cron: every 30 minutes during business hours.

**6.3 Improver agent**

ACTION: Create `/root/projects/DaybyDay/hermes/scripts/improver.sh` + prompt `improver.md`.

`improver.md`:
```
You audit Hermes' last 7 days of agent runs. Output a JSON report.

INPUT (user): {agent_runs_last_7d, build_log_excerpts, top_error_classes, published_count, failed_count}

ANALYZE:
- What error_class is most common?
- Which phase fails most often?
- Are there token spikes correlated with retries?
- Are published posts ranking? (Compare with gsc_daily quick-wins improvements)

OUTPUT JSON:
{
  "week": "ISO-week",
  "summary": "3 sentences",
  "top_issues": [{"issue":"...","frequency":N,"suggested_fix":"..."}],
  "prompt_tweaks": [{"file":"hermes/prompts/<name>.md","line_or_section":"...","change":"..."}],
  "config_tweaks": [{"file":"...","change":"..."}]
}
```

`improver.sh` writes the report to `hermes/state/improvement-<WEEK>.md`, then opens a GitHub Issue via `gh issue create` summarizing for human review. **Improver does NOT auto-apply changes — humans approve.**

VERIFY:
```bash
/root/projects/DaybyDay/hermes/scripts/improver.sh
ls /root/projects/DaybyDay/hermes/state/improvement-*.md | head -1
```

---

### PHASE 7 — Cron + GitHub Action for production promotion (45 min)

Addresses: **C15**.

**7.1 Cron schedule**

ACTION: `crontab -e` (root):
```cron
# Hermes daily blog (Mon/Wed/Fri 05:00 UTC = 06:00/07:00 Spain)
0 5 * * 1,3,5 /root/projects/DaybyDay/hermes/scripts/orchestrator.sh

# Analyst (every day 06:00 UTC, even when no blog scheduled)
0 6 * * * /root/projects/DaybyDay/hermes/scripts/analyst.sh

# Budget watcher (every 30 min business hours)
*/30 7-22 * * * /root/projects/DaybyDay/hermes/scripts/budget-watch.sh

# Improver (Sunday 03:00 UTC)
0 3 * * 0 /root/projects/DaybyDay/hermes/scripts/improver.sh

# Resume hook (every hour): if state != IDLE for >60min, resume
0 * * * * /root/projects/DaybyDay/hermes/scripts/orchestrator.sh
```

**7.2 GitHub Action: promote preview to main**

ACTION: Create `/root/projects/DaybyDay/.github/workflows/promote-hermes.yml`:
```yaml
name: Promote Hermes Preview to Main
on:
  push:
    branches: [claude/epic-pasteur]
jobs:
  promote:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          ref: claude/epic-pasteur
          fetch-depth: 0
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npm run build
      - name: Lighthouse
        run: |
          npm install -g @lhci/cli
          lhci autorun --collect.url=http://localhost:4173 --assert.assertions.performance=0.85 --assert.assertions.seo=0.95 || exit 1
      - name: Merge to main
        env: { GH_TOKEN: ${{ secrets.GH_PROMOTE_TOKEN }} }
        run: |
          git config user.name "hermes-bot"
          git config user.email "hermes@daybydayconsulting.com"
          git checkout main
          git pull origin main
          git merge --ff-only claude/epic-pasteur || git merge --no-ff claude/epic-pasteur -m "merge(hermes): promote preview"
          git push origin main
```

Vercel auto-deploys `main` to production.

VERIFY: push a dummy commit to `claude/epic-pasteur`, watch action run, check `main` advances only when lighthouse passes.

---

## 4. TOKEN OPTIMIZATION STRATEGY

### 4.1 Per-call budget caps (hard, enforced by `minimax_call.sh` parameter)

| Phase | max_tokens (input cap soft, output cap hard) | Expected actual input | Expected output |
|-------|----------------------------------------------|------------------------|------------------|
| Strategist | 4,000 | ~1.5k | ~600 |
| Researcher | 6,000 | ~2k | ~1.5k |
| Writer | 15,000 | ~4k | ~9k |
| Improver | 8,000 | ~3k | ~2k |
| Publisher | 0 (no LLM) | — | — |
| Analyst | 0 (no LLM) | — | — |

**Per-blog total:** ~7.5k input + ~11k output = ~18.5k tokens. With MiniMax pricing (~$0.20/M input, $1.10/M output as of public pricing), that is ~$0.014 per blog.

**Per day (3 blogs/week avg, ~12 blogs/month):** ~$0.17/month at full load.

### 4.2 Prompt caching

MiniMax 2.7 supports prompt caching via `cache_control` header. Make every system prompt under each agent **stable across runs** (no date interpolation in system prompt; date goes in user prompt). Cache TTL covers a full orchestrator run.

### 4.3 No-LLM phases save the most

Publisher + Analyst do zero LLM work. Together they are ~40% of the old monolithic prompt's effort. Free win.

### 4.4 Search budget

- Researcher: 3 web searches max, 2 web fetches max (enforced in script: only one `brave_search.sh` call passed in input).
- Improver: 0 searches.

### 4.5 Daily kill-switch

`budget-watch.sh` alerts at 80% of 200k tokens/day. At 100% the orchestrator skips on resume (`current.json.daily_freeze=true`). Manual unfreeze.

---

## 5. ACCEPTANCE CRITERIA (Definition of "Live in Production")

MiniMax declares success only when ALL of these are true:

1. ✅ `/root/.env` contains `VERCEL_TOKEN`, `MINIMAX_API_KEY`, `BRAVE_API_KEY`, `GSC_REFRESH_TOKEN` and no script has plaintext secrets.
2. ✅ `git -C /root/projects/DaybyDay status --porcelain | grep -v '^??.*\.bak$'` returns empty.
3. ✅ All 12 files exist:
   - `hermes/branding.json`, `hermes/checklist.json`, `hermes/examples-pool.json`, `hermes/template.jsx`
   - `hermes/prompts/{strategist,researcher,writer,improver}.md`
   - `hermes/scripts/{orchestrator,strategist,researcher,writer,publisher,analyst,improver}.sh`
   - `hermes/scripts/{update-routes.js, jsx-safe-check.py}`
4. ✅ Pre-commit hook installed and rejects conflict markers.
5. ✅ Prerender uses `get-port`, no EADDRINUSE possible.
6. ✅ `vercel.json` has `/blog/:slug` fallback.
7. ✅ Postgres schema has new columns (`phase`, `input_tokens`, `output_tokens`, `error_class`, `run_id`).
8. ✅ Cron entries installed (5 lines).
9. ✅ GitHub Action `promote-hermes.yml` exists and ran green at least once.
10. ✅ **Dry-run produced a real blog post**: pick a test task, run orchestrator end-to-end, verify the post is live at `https://www.daybydayconsulting.com/blog/<slug>` AND in `/sitemap.xml` AND lighthouse SEO ≥95.
11. ✅ `agent_runs` table has at least 1 row per phase from the dry run.
12. ✅ Telegram notification fired on dry-run completion.
13. ✅ `daily-blog` (old monolithic) cron disabled: `crontab -l | grep -v 'run-daily-blog.sh' | crontab -`.

---

## 6. FAILURE RECOVERY PLAYBOOK

| Symptom | Likely cause | Recovery |
|---------|--------------|----------|
| Orchestrator exits 30 | Dirty git state | `git -C /root/projects/DaybyDay status` → restore or stash. Re-run. |
| Phase exits 42 | MiniMax rate limit | Wait — next cron resumes same phase from state. |
| Phase exits 10 | `npm run build` failed | Inspect `/var/log/daybyday/hermes-<DATE>.log`, fix JSX, re-run orchestrator (resumes at PUBLISHER). |
| Phase exits 11 | JSX safety check failed | Writer output corrupted. Delete JSX file. Reset state to RESEARCHED. Re-run. |
| Phase exits 12 | Conflict markers in staged files | `git restore --staged .`, `git checkout -- src/App.jsx`, reset state to WRITTEN. Re-run. |
| Vercel deploy not visible | API call failed silently | Inspect `last-preview-url.txt`. Manually `vercel --token $VERCEL_TOKEN deploy --prebuilt`. |
| Lighthouse fails in GitHub Action | Performance regression | Action does not promote to main. Inspect, fix, push again. Preview stays on `epic-pasteur`. |
| Two orchestrators tried to run | `flock` blocked second | Normal; second exits cleanly. |
| Improver report says "stagnant rankings" | Topic strategy issue | Human review of `improvement-<WEEK>.md`. Pivot keyword list. |

---

## 7. WHY THIS WORKS (theory of the change)

1. **Decomposition beats monolith.** Each agent has ONE job, sees ONLY its inputs, fails ONLY for one reason. Debugging is local.
2. **State on disk = restartability.** Crash, rate-limit, reboot — orchestrator picks up where it left off. No replayed token cost.
3. **Determinism where possible.** Publisher and Analyst use zero LLM calls. The hardest-to-LLM-correctly work (routing, sitemap, JSON mutation) is plain code.
4. **Hard caps in code, not prose.** WebSearch limit enforced by passing only N results. Tokens capped by `max_tokens` parameter. Tools restricted per agent.
5. **Self-improvement is review-gated.** Improver opens an Issue; humans approve prompt tweaks. No silent drift.
6. **Production promotion is gated.** GitHub Action + lighthouse threshold protect `main`. Preview branch is the LLM's playground.

---

## 8. SEQUENCE OF EXECUTION (the checklist MiniMax follows top-to-bottom)

```
[ ] P1.1 Rotate VERCEL_TOKEN, move to /root/.env, scrub run-daily-blog.sh
[ ] P1.2 Update .gitignore, commit
[ ] P1.3 Clean worktrees epic-pasteur + pivot-growth
[ ] P2.1 Write hermes/branding.json
[ ] P2.2 Write hermes/checklist.json
[ ] P2.3 Write hermes/examples-pool.json (read 3 random blogs for tone)
[ ] P2.4 Copy latest blog → hermes/template.jsx, replace content with placeholders
[ ] P3.1 Write /root/scripts/minimax_call.sh + chmod +x + ping test
[ ] P3.2 Write hermes/prompts/strategist.md
[ ] P3.3 Write hermes/prompts/researcher.md
[ ] P3.4 Write hermes/prompts/writer.md
[ ] P3.5 Write /root/scripts/brave_search.sh + test
[ ] P4.1 Write hermes/scripts/jsx-safe-check.py + self-test
[ ] P4.2 Install .git/hooks/pre-commit
[ ] P4.3 Patch scripts/prerender.mjs to use get-port (npm install --no-save get-port)
[ ] P4.4 Patch vercel.json (add /blog/:slug fallback)
[ ] P4.5 Insert HERMES markers in src/App.jsx, src/pages/BlogPage.jsx
[ ] P4.5 Write hermes/scripts/update-routes.js + test on fake slug then revert
[ ] P5.1 Write hermes/scripts/orchestrator.sh
[ ] P5.2 Write hermes/scripts/strategist.sh
[ ] P5.3 Write hermes/scripts/researcher.sh
[ ] P5.4 Write hermes/scripts/writer.sh
[ ] P5.5 Write hermes/scripts/publisher.sh
[ ] P5.6 Write hermes/scripts/analyst.sh
[ ] P5.7 chmod +x all scripts
[ ] P5.X Dry run orchestrator on a test task → confirm phase advances
[ ] P6.1 Apply Postgres schema upgrade
[ ] P6.2 Write hermes/scripts/budget-watch.sh
[ ] P6.3 Write hermes/prompts/improver.md + hermes/scripts/improver.sh
[ ] P7.1 Install crontab entries; disable old run-daily-blog cron
[ ] P7.2 Commit + push .github/workflows/promote-hermes.yml
[ ] P7.3 End-to-end production run: pick T041, run orchestrator, verify live post + lighthouse
[ ] P7.4 Telegram "Hermes live" message
```

When the last box is checked, Hermes v2 is in production. From there, the system runs itself: cron triggers Mon/Wed/Fri, Analyst feeds GSC back daily, Improver reports weekly, humans approve drift.

---

## 9. APPENDIX — Quick reference

### File paths

| What | Path |
|------|------|
| Whitepaper (this) | `/root/projects/DaybyDay/hermes/HERMES_WHITEPAPER.md` |
| State dir | `/root/projects/DaybyDay/hermes/state/` |
| Scripts | `/root/projects/DaybyDay/hermes/scripts/` |
| Prompts | `/root/projects/DaybyDay/hermes/prompts/` |
| Config JSON | `/root/projects/DaybyDay/hermes/*.json` |
| Wrappers | `/root/scripts/minimax_call.sh`, `/root/scripts/brave_search.sh` |
| Logs | `/var/log/daybyday/hermes-<DATE>.log` |
| Env | `/root/.env` |

### Env variables required in /root/.env

```
export VERCEL_TOKEN="..."
export VERCEL_ORG_ID="..."
export VERCEL_PROJECT_ID="..."
export MINIMAX_API_KEY="..."
export MINIMAX_GROUP_ID="..."     # if MiniMax requires it
export BRAVE_API_KEY="..."
export GSC_REFRESH_TOKEN="..."
export TELEGRAM_BOT_TOKEN="..."
export TELEGRAM_CHAT_ID="..."
export GITHUB_TOKEN="..."         # for gh CLI used by Improver
```

### Exit codes (memorize)

```
0  ok
1  unrecoverable
10 build failed
11 jsx safety failed
12 conflict markers staged
30 dirty git state
42 rate-limited (retry safe)
```

### Telegram notification helper (already exists)

`/root/scripts/notify.sh "message"` — used throughout for alerts.

---

---

## 10. POST-PREBAKE NEXT STEPS (2026-05-20 status)

Pre-bake by Claude on 2026-05-20 completed the following deterministic work. **MiniMax should skip these on first run**, they are already done:

### Already on disk (do NOT recreate)

```
hermes/
├── HERMES_WHITEPAPER.md          ← this file
├── SCHEMAS.md                    ← READ THIS SECOND, contains data shapes
├── branding.json                 ← Writer-only config
├── checklist.json                ← Quality gates
├── examples-pool.json            ← 8 anonymized client snippets
├── template.jsx                  ← Golden blog skeleton with {{PLACEHOLDER}} tokens
├── prompts/
│   ├── strategist.md             ← ≤40 lines, slim
│   ├── researcher.md             ← ≤40 lines
│   ├── writer.md                 ← ≤40 lines
│   ├── publisher.md              ← doc-only, no LLM
│   └── improver.md               ← weekly review
├── scripts/
│   ├── orchestrator.sh           ← state machine, flock, exit-code disciplined
│   ├── strategist.sh             ← builds input, calls LLM, validates JSON
│   ├── researcher.sh             ← Brave (optional) + LLM
│   ├── writer.sh                 ← LLM + jsx-safe-check
│   ├── publisher.sh              ← pure shell, no LLM
│   ├── analyst.sh                ← pure Python, no LLM
│   ├── preflight.sh              ← validates env before any run
│   ├── dry-run.sh                ← fixture-based pipeline test, auto-revert
│   ├── jsx-safe-check.py         ← rejects raw <,>, conflict markers, TODOs, placeholders
│   └── update-routes.js          ← deterministic 5-file mutation
├── state/                        ← gitignored, written at runtime
└── fixtures/
    ├── plan-sample.json
    ├── research-sample.json
    └── writer-output-sample.jsx
```

Plus, applied to the repo:
- `src/App.jsx` — has `HERMES_IMPORTS_END` and `HERMES_ROUTES_END` markers
- `src/pages/BlogPage.jsx` — has `HERMES_POSTS_START` marker
- `.gitignore` — `*.bak`, `*.hermes-bak`, `hermes/state/*` (except .gitkeep), worktree node_modules
- `.git/hooks/pre-commit` — rejects conflict markers, secret patterns, `.env`/`.bak` files, runs jsx-safe-check on staged blog JSX

Plus, system-level:
- `/root/scripts/minimax_call.sh` — Path A/B selector
- `/root/scripts/brave_search.sh` — graceful no-key fallback
- `/root/.claude/scheduled-tasks/system-improver/SKILL.md` — stub pointing to Hermes Improver
- Crontab — old `run-daily-blog.sh` and `run-blog-pivot-retry.sh` lines commented with `# HERMES_V2_DISABLED:` prefix. Backup at `/root/crontab.backup.<timestamp>`.

### Smoke-test results (2026-05-20)
- `hermes/scripts/preflight.sh` → exit 0 (37 pass, 3 expected warnings for Path B keys + dirty worktree from new files)
- `npx vite build` in repo → exit 0, dist/ built successfully — markers do NOT break parser
- Two pre-existing raw `>` patterns surfaced in `Ga4MetaAdsEventosCustomD2cPage.jsx` (esbuild warning, non-fatal). `jsx-safe-check.py` will catch this pattern in new Writer output.

### What MiniMax actually needs to do on first launch

1. **Read these three files first, in this order:**
   - `hermes/HERMES_WHITEPAPER.md` (you are reading it)
   - `hermes/SCHEMAS.md`
   - `hermes/prompts/strategist.md` + `researcher.md` + `writer.md`

2. **Run preflight:**
   ```bash
   /root/projects/DaybyDay/hermes/scripts/preflight.sh
   ```
   Must exit 0. Resolve any FAIL before proceeding.

3. **Run dry-run (no tokens spent):**
   ```bash
   /root/projects/DaybyDay/hermes/scripts/dry-run.sh
   ```
   Must exit 0. Auto-reverts worktree on completion.

4. **First real run (Path A):**
   ```bash
   /root/projects/DaybyDay/hermes/scripts/orchestrator.sh
   ```
   Will hit Strategist → exit 64 (Path A sentinel). MiniMax then reads `hermes/state/plan-<DATE>.json.raw` sentinel, reads `hermes/prompts/strategist.md`, reads the user-prompt file the sentinel points to, generates the plan JSON, writes it to `hermes/state/plan-<DATE>.json`, then re-runs orchestrator. Repeat for Researcher and Writer phases. Publisher and Analyst are pure shell, no MiniMax intervention.

5. **Before first git push, REVIEW with human.** Do NOT set `HERMES_AUTOPUSH=1` until first commit is reviewed and approved.

6. **After first successful run**: confirm Vercel preview deploys correctly on `claude/epic-pasteur` branch. Confirm new post URL renders and lighthouse SEO ≥95. Then user opens PR to `main`.

### Deferred (Phase 6/7 of original whitepaper)

- Postgres schema upgrade for `agent_runs` extended columns
- GitHub Action `promote-hermes.yml`
- Cron entries for hermes orchestrator (manual run only until first 3 posts succeed)
- Token budget gauge cron
- Improver weekly cron
- VERCEL_TOKEN rotation (user said "rotate later")

These are documented above. When ready, MiniMax can implement them as Phase 6/7 of the original whitepaper steps.

---

**End of whitepaper. MiniMax 2.7: begin execution at Section 10 step 1.**
