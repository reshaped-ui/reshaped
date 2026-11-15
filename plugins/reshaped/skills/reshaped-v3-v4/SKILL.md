---
name: reshaped-v3-v4
description: Migrates apps from Reshaped v3 to v4 breaking API changes. Use when the user asks to upgrade to v4, fix breaking changes, or migrate deprecated Reshaped APIs.
---

# Reshaped v3 to v4 Migration

Apply documented and safe migrations from Reshaped v3 to v4 with minimal edits and explicit reporting.

## Scope and inputs

- Canonical migration recipes live in `changes/*.md` in this skill directory.
- Each file in `changes/*.md` represents one breaking-change topic.
- Follow documented migration paths from those files first; if there is no automated migration path available and you don't have a high confidence solution – don't edit the code and add this case to the migration report.
- Prefer deterministic, low-risk edits over broad refactors.

## Operating rules

1. Confirm migration scope
   - Identify which package(s), app(s), or folders should be migrated.
   - If scope is unclear, ask a focused clarifying question before editing.

2. Build an ordered migration checklist
   - List all available files in `changes/*.md`.
   - Process them one by one in a stable order (for example: alphabetical by filename).
   - For each change file, determine whether it applies to the target scope.

3. Apply migrations conservatively
   - Use exact symbol/prop matching when possible.
   - Keep behavior unchanged unless the migration doc requires behavior changes.
   - Avoid unrelated cleanup while migrating.
   - Preserve user-authored custom logic and styling intent.

4. Validate after batches of edits
   - Run local checks relevant to the repo (typecheck, lint, tests, build, or targeted checks).
   - If a migration introduces uncertainty, stop and verify before continuing.

5. Report outcomes explicitly
   - Produce a migration report after edits.
   - Include per-migration status, component counts, confidence, and manual actions.

## Per-change execution loop

For each migration file in `changes/*.md`:

1. Read the migration file fully.
2. Extract:
   - Trigger pattern (what old API usage to find).
   - Target pattern (what v4 usage should replace it).
   - Constraints, caveats, and exceptions.
3. Search the scoped codebase for matches.
4. Classify each match:
   - Safe automated migration.
   - Requires contextual/manual decision.
   - Not applicable/false positive.
5. Apply changes for safe matches.
6. Record report data for this migration, even when no matches were found.

## Confidence model

Use these confidence levels in the report:

- `high`: mechanical replacement with unambiguous mapping and local validation passes.
- `medium`: mapping is mostly clear but depends on component context, composition, or styling intent.
- `low`: migration path is incomplete, risky, or requires product/UX intent to resolve.

For every `medium` or `low` item, include exact code locations that need review.

## Required migration report

Create a report file in the workspace root named:

- `reshaped-v3-v4-migration-report.md`

Report format:

```markdown
# Reshaped v3 -> v4 Migration Report

## Scope

- Target: <folders/packages migrated>
- Date: <YYYY-MM-DD>

## Migration Results

### <migration name from file>

- Status: `completed` | `partial` | `not-applicable` | `blocked`
- Components updated: <number>
- Confidence: `high` | `medium` | `low`
- Medium/low review locations:
  - `<path>:<line>` - <why review is needed>
- Notes: <key decisions, caveats>
- Manual steps (if any):
  - <required human follow-up>

<!-- Repeat for every changes/*.md file -->

## Summary

- Total migrations processed: <number>
- Completed: <number>
- Partial: <number>
- Not applicable: <number>
- Blocked: <number>
- Total components updated: <number>
```

## Handling missing automated paths

If a change file has no safe automated migration path:

- Mark status as `blocked` or `partial` (depending on progress).
- Explain why automation is unsafe or impossible.
- Provide concrete manual remediation steps.
- Include precise locations for manual edits.

## Communication style

- Be explicit and audit-friendly.
- Prefer short, factual notes over long explanations.
- Distinguish clearly between applied changes and recommendations.
