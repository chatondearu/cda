# PRD-54 — Fix me-host gate i18n keys

- **Status**: approved
- **GitHub**: [#54](https://github.com/chatondearu/cda/issues/54)
- **Date**: 2026-10-11
- **Tags**: #portal #p1 #i18n
- **Parent epic**: [#42](https://github.com/chatondearu/cda/issues/42)

## Problem

`UiMeAccessGate` may resolve `home.meSeoDescription` / hard-coded EN strings outside the correct i18n scope.

## Goals

- [x] Move keys to global locales and/or local `<i18n>` on the gate
- [x] Localize hard-coded EN strings (`IDENTITY_GATE`, `ACCESS_REQUEST`)
- [x] Verify me-host layout renders translated description

## Non-goals

- CV auth protection (shipped in #48) — only i18n polish here

## Requirements

### Functional

- [x] No raw i18n key shown on me-host
- [x] fr/en/zh/ja covered

### Non-functional

- [x] `nix develop -c pnpm check:ci` green
- [ ] CI green on PR; do not merge without human

## Related project memory

- Epic: #42
- May partially overlap #48 `UiMeAccessGate` work — verify before rework

## Implementation pointer

`plans/PLAN-54-me-host-i18n-gate.md`
