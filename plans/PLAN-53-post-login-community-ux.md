# PLAN-53 — Post-login community UX and i18n copy

- **Status**: ready
- **PRD**: [[../prd/PRD-53-post-login-community-ux|PRD-53]]
- **GitHub**: [#53](https://github.com/chatondearu/cda/issues/53)
- **Date**: 2026-10-11

## Summary

Default OAuth/email login into community context (`/account`) and refresh session chrome copy.

## Constraints (from ADRs)

| ADR | Constraint |
| --- | ---------- |
| _(none yet)_ | Keep redirect sanitization; Twitch-first login from P0 |

## Scope

### In scope

- Default callbackURL → `/account` (localized)
- Settings/topbar community session framing
- i18n strings

### Out of scope

See PRD.

## Technical approach

Branch `feat/53-post-login-community-ux` from `dev`. Prefer after or with #50 so destination is meaningful. Size: S. Touch `login.vue`, `AppSettingsMenu.vue`, global i18n.

## Tasks

- [x] Claim #53; board → In progress
- [x] Default post-login destination
- [x] Session chrome copy
- [x] i18n fr/en/zh/ja
- [x] Preserve safe `redirect` query
- [ ] `nix develop -c pnpm check:ci`; PR `Closes #53`; CI green; do not merge

## Test plan

- [x] Login without redirect → `/account`
- [x] Login with `?redirect=/timeline` → timeline
- [ ] Remote CI green

## Verification

- [ ] Lint / typecheck per AGENTS.md
