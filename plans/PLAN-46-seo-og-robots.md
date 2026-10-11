# PLAN-46 — Replace OG placeholders and restore robots/home meta

- **Status**: ready
- **PRD**: [[../prd/PRD-46-seo-og-robots|PRD-46]]
- **GitHub**: [#46](https://github.com/chatondearu/cda/issues/46)
- **Date**: 2026-10-09

## Summary

Fix broken social/SEO metadata so Discord/Twitch shares and crawlers see real titles, descriptions, and robots policy.

## Constraints (from ADRs)

| ADR | Constraint |
| --- | ---------- |
| _(none)_ | Clinical Diagnostic UI; Uno tokens; Nix verify; no invent product decisions |

## Scope

### In scope

- [ ] Replace literal [og:*] placeholders on contact.vue and timeline.vue
- [ ] Add proper useSeoMeta on public home
- [ ] Fill public/robots.txt with explicit policy
- [ ] Real default OG image or documented temporary safe meta
- [ ] Align twitter/og fields with i18n copy

### Out of scope

See issue #46.

## Technical approach

Work on branch `feat/46-seo-og-robots` or `fix/46-seo-og-robots` from up-to-date `feat/hud-lot-24-forge-demo` (or `main` if HUD stack already merged). Prefer isolated clone under `/tmp/cda-46` if primary worktree is contested. PR base: same integration branch the HUD stack targets (`feat/hud-lot-24-forge-demo` unless instructed otherwise). Size: S.

## Tasks

- [ ] Claim #46; board → In progress
- [ ] Replace literal [og:*] placeholders on contact.vue and timeline.vue
- [ ] Add proper useSeoMeta on public home
- [ ] Fill public/robots.txt with explicit policy
- [ ] Real default OG image or documented temporary safe meta
- [ ] Align twitter/og fields with i18n copy
- [ ] `nix develop -c pnpm check:ci`
- [ ] Systematic review (Critical/Important fixed)
- [ ] Open PR `Closes #46`; board → In review
- [ ] Watch CI until green; do not merge

## Test plan

- [ ] Acceptance criteria from issue #46
- [ ] `nix develop -c pnpm check:ci`
- [ ] Remote CI green

## Verification

- [ ] Lint / typecheck per AGENTS.md
- [ ] Docs updated when behavior changes
