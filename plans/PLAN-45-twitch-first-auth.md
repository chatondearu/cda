# PLAN-45 — Twitch-first community auth hardening

- **Status**: ready
- **PRD**: [[../prd/PRD-45-twitch-first-auth|PRD-45]]
- **GitHub**: [#45](https://github.com/chatondearu/cda/issues/45)
- **Date**: 2026-10-09

## Summary

Harden Better Auth for a streamer community gateway: Twitch as primary identity, reduce abuse surface, keep Discord optional.

## Constraints (from ADRs)

| ADR | Constraint |
| --- | ---------- |
| _(none)_ | Clinical Diagnostic UI; Uno tokens; Nix verify; no invent product decisions |

## Scope

### In scope

- [ ] Prefer Twitch-first signup/login UX (email/password secondary or gated)
- [ ] Configure trustedOrigins / cookie hardening for production hosts
- [ ] Add rate-limiting / abuse guards around /api/auth (or document Better Auth built-ins)
- [ ] Pin better-auth if still floating
- [ ] Document community auth model in doc/auth-better-auth.md

### Out of scope

See issue #45.

## Technical approach

Work on branch `feat/45-twitch-first-auth` or `fix/45-twitch-first-auth` from up-to-date `feat/hud-lot-24-forge-demo` (or `main` if HUD stack already merged). Prefer isolated clone under `/tmp/cda-45` if primary worktree is contested. PR base: same integration branch the HUD stack targets (`feat/hud-lot-24-forge-demo` unless instructed otherwise). Size: M.

## Tasks

- [ ] Claim #45; board → In progress
- [ ] Prefer Twitch-first signup/login UX (email/password secondary or gated)
- [ ] Configure trustedOrigins / cookie hardening for production hosts
- [ ] Add rate-limiting / abuse guards around /api/auth (or document Better Auth built-ins)
- [ ] Pin better-auth if still floating
- [ ] Document community auth model in doc/auth-better-auth.md
- [ ] `nix develop -c pnpm check:ci`
- [ ] Systematic review (Critical/Important fixed)
- [ ] Open PR `Closes #45`; board → In review
- [ ] Watch CI until green; do not merge

## Test plan

- [ ] Acceptance criteria from issue #45
- [ ] `nix develop -c pnpm check:ci`
- [ ] Remote CI green

## Verification

- [ ] Lint / typecheck per AGENTS.md
- [ ] Docs updated when behavior changes
