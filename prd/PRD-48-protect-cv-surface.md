# PRD-48 — Protect CV surface beyond path obscurity

- **Status**: approved
- **GitHub**: [#48](https://github.com/chatondearu/cda/issues/48)
- **Date**: 2026-10-09
- **Tags**: #portal #p0
- **Parent epic**: [#41](https://github.com/chatondearu/cda/issues/41)

## Problem

Protect career CV routes so PII is not only security-through-obscurity; keep community login separate from CV grant.

## Goals

- [ ] Require auth and/or one-time token / allowlist for CV access
- [ ] Keep noindex headers
- [ ] Review NUXT_PUBLIC_CAREER_* exposure; minimize client PII
- [ ] Community Twitch login must not auto-unlock CV unless intended
- [ ] Fix me-host gate i18n (UiMeAccessGate / home.meSeoDescription)

## Non-goals

See issue #48 Out of scope.

## Requirements

### Functional

- [ ] Require auth and/or one-time token / allowlist for CV access
- [ ] Keep noindex headers
- [ ] Review NUXT_PUBLIC_CAREER_* exposure; minimize client PII
- [ ] Community Twitch login must not auto-unlock CV unless intended
- [ ] Fix me-host gate i18n (UiMeAccessGate / home.meSeoDescription)

### Non-functional

- [ ] `nix develop -c pnpm check:ci` green
- [ ] CI green on PR; do not merge without human

## Related project memory

- Epic: #41 P0 portal safety
- Dual-mode: public showcase + Twitch community gateway + separate CV host

## Implementation pointer

`plans/PLAN-48-protect-cv-surface.md`
