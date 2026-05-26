---
name: system-improver
description: Weekly review of Hermes v2 pipeline. Reads last 7d of agent_runs, build logs, GSC diff. Produces improvement-<WEEK>.md report.
---

# system-improver — Hermes v2 Weekly Review

This skill is a thin shim. The real implementation is in the Hermes pipeline at:

- Script: `/root/projects/DaybyDay/hermes/scripts/improver.sh`
- Prompt: `/root/projects/DaybyDay/hermes/prompts/improver.md`
- Output: `/root/projects/DaybyDay/hermes/state/improvement-<ISO_WEEK>.md`

## Invocation

When triggered (cron Sunday 03:00 UTC via `/root/scripts/run-system-improver.sh`), this skill:

1. Reads the last 7 days of agent runs from postgres `agent_runs` table (if available) or `/var/log/daybyday/hermes-*.log`.
2. Aggregates error_class counts, token usage, success/failure ratios, GSC ranking diff.
3. Invokes the Improver LLM phase with `hermes/prompts/improver.md`.
4. Writes the JSON + human summary to `hermes/state/improvement-<WEEK>.md`.
5. Opens a GitHub Issue (via `gh issue create`) tagging Pablo + Jorge for review.

## Important

- This skill does NOT auto-apply changes to prompts or config.
- All suggested fixes are review-gated. Humans approve before merge.
- See `hermes/HERMES_WHITEPAPER.md` section 2.2 for the agent table and section 5 for the Improver script spec.

## Status

Stub created 2026-05-20. Full implementation pending Phase 6 of whitepaper rollout.
