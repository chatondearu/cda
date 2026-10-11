# PLAN-50 — Community profile dashboard after login

- **Status**: ready
- **PRD**: [[../prd/PRD-50-account-community-dashboard|PRD-50]]
- **GitHub**: [#50](https://github.com/chatondearu/cda/issues/50)
- **Date**: 2026-10-11

## Summary

Upgrade `/account` into a Clinical Diagnostic community hub: linked identities, read-only clan summary, and CTAs to clan/lab/cassette/timeline.

## Constraints (from ADRs)

| ADR | Constraint |
| --- | ---------- |
| _(none yet)_ | Uno semantic tokens; DS UI components; Nix verify; community session ≠ CV grant |

## Scope

### In scope

- Enrich `modules/app/app/pages/account.vue` (+ server/API as needed for profiles/clans)
- Identity from Better Auth session + `profiles`
- Read-only clan membership summary
- CTAs + i18n fr/en/zh/ja

### Out of scope

See PRD / issue #50.

## Technical approach

Branch `feat/50-account-community-dashboard` from `dev`. Prefer isolated clone `/tmp/cda-50` if primary worktree contested. Size: M. Use existing DS (`UiSectionHeader`, `UiButton`, HUD readouts sparingly). Add thin server route if profile/clan join needs DB.

## Tasks

- [x] Claim #50; board → In progress
- [x] Load profile + provider accounts for current session
- [x] Render identity + clan summary (empty state OK)
- [x] Add CTAs (clan/lab/cassette/timeline) — placeholder routes OK if #51/#52 land after
- [x] i18n fr/en/zh/ja
- [x] `nix develop -c pnpm check:ci`
- [ ] Systematic review; PR `Closes #50` → `dev`; board → In review; CI green; do not merge

## Test plan

- [x] Anonymous `/account` → login redirect (auth middleware unchanged)
- [x] Logged-in dashboard shows identity + CTAs
- [ ] Remote CI green

## Verification

- [x] Lint / typecheck per AGENTS.md
