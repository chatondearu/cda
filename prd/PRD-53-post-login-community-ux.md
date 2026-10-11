# PRD-53 — Post-login community UX and i18n copy

- **Status**: approved
- **GitHub**: [#53](https://github.com/chatondearu/cda/issues/53)
- **Date**: 2026-10-11
- **Tags**: #portal #p1 #community #auth
- **Parent epic**: [#42](https://github.com/chatondearu/cda/issues/42)

## Problem

After OAuth login, users often return to `/` with little community framing. Settings/session chrome still reads like a generic account.

## Goals

- [ ] Sensible default post-login destination (`/account` or community home)
- [ ] Settings menu / topbar reflect community session clearly
- [ ] Community-oriented i18n (fr/en/zh/ja)
- [ ] Preserve open-redirect sanitization

## Non-goals

- OAuth provider hardening (shipped in P0)
- Clan feature implementation (#51)

## Requirements

### Functional

- [ ] Fresh login without `redirect` lands in community context (prefer `/account`)
- [ ] Copy distinguishes community session from CV host
- [ ] Existing `redirect` query still honored when safe

### Non-functional

- [ ] `nix develop -c pnpm check:ci` green
- [ ] CI green on PR; do not merge without human

## Related project memory

- Epic: #42
- Depends on #50 destination page existing or landing gracefully

## Implementation pointer

`plans/PLAN-53-post-login-community-ux.md`
