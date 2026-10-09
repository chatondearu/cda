# PLAN-48 — Protect CV surface beyond path obscurity

- **Status**: ready
- **PRD**: [[../prd/PRD-48-protect-cv-surface|PRD-48]]
- **GitHub**: [#48](https://github.com/chatondearu/cda/issues/48)
- **Date**: 2026-10-09

## Summary

Protect career CV routes so PII is not only security-through-obscurity; keep community login separate from CV grant.

## Constraints (from ADRs)

| ADR | Constraint |
| --- | ---------- |
| _(none)_ | Clinical Diagnostic UI; Uno tokens; Nix verify; no invent product decisions |

## Scope

### In scope

- [ ] Require auth and/or one-time token / allowlist for CV access
- [ ] Keep noindex headers
- [ ] Review NUXT_PUBLIC_CAREER_* exposure; minimize client PII
- [ ] Community Twitch login must not auto-unlock CV unless intended
- [ ] Fix me-host gate i18n (UiMeAccessGate / home.meSeoDescription)

### Out of scope

See issue #48.

## Technical approach

Work on branch `feat/48-protect-cv-surface` or `fix/48-protect-cv-surface` from up-to-date `feat/hud-lot-24-forge-demo` (or `main` if HUD stack already merged). Prefer isolated clone under `/tmp/cda-48` if primary worktree is contested. PR base: same integration branch the HUD stack targets (`feat/hud-lot-24-forge-demo` unless instructed otherwise). Size: M.

## Tasks

- [ ] Claim #48; board → In progress
- [ ] Require auth and/or one-time token / allowlist for CV access
- [ ] Keep noindex headers
- [ ] Review NUXT_PUBLIC_CAREER_* exposure; minimize client PII
- [ ] Community Twitch login must not auto-unlock CV unless intended
- [ ] Fix me-host gate i18n (UiMeAccessGate / home.meSeoDescription)
- [ ] `nix develop -c pnpm check:ci`
- [ ] Systematic review (Critical/Important fixed)
- [ ] Open PR `Closes #48`; board → In review
- [ ] Watch CI until green; do not merge

## Test plan

- [ ] Acceptance criteria from issue #48
- [ ] `nix develop -c pnpm check:ci`
- [ ] Remote CI green

## Verification

- [ ] Lint / typecheck per AGENTS.md
- [ ] Docs updated when behavior changes
