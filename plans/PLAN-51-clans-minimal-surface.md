# PLAN-51 — Minimal clan surface on existing schema

- **Status**: ready
- **PRD**: [[../prd/PRD-51-clans-minimal-surface|PRD-51]]
- **GitHub**: [#51](https://github.com/chatondearu/cda/issues/51)
- **Date**: 2026-10-11

## Summary

Expose a minimal clans UI on existing Drizzle clan tables; deep-linkable from `/account`.

## Constraints (from ADRs)

| ADR | Constraint |
| --- | ---------- |
| _(none yet)_ | Prefer no migrations; Clinical Diagnostic UI; Nix verify |

## Scope

### In scope

- Clan list (+ optional detail)
- Current user membership status
- Empty/loading HUD-language states
- i18n chrome

### Out of scope

See PRD.

## Technical approach

Branch `feat/51-clans-minimal-surface` from `dev` (or after #50 if CTA paths need alignment). Size: L. Server routes reading `@chatondearu/db` clans/profiles.

## Tasks

- [x] Claim #51; board → In progress
- [x] Map schema → API/page
- [x] Build list (+ detail if cheap)
- [x] Membership status for current user
- [x] Empty/loading states + i18n
- [x] Link from account hub
- [ ] `nix develop -c pnpm check:ci`; PR `Closes #51`; CI green; do not merge

## Test plan

- [x] Page works with local DB data / empty DB
- [x] Account deep-link works
- [ ] Remote CI green

## Verification

- [x] Lint / typecheck per AGENTS.md
