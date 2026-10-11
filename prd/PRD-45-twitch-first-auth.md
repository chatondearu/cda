# PRD-45 — Twitch-first community auth hardening

- **Status**: approved
- **GitHub**: [#45](https://github.com/chatondearu/cda/issues/45)
- **Date**: 2026-10-09
- **Tags**: #portal #p0
- **Parent epic**: [#41](https://github.com/chatondearu/cda/issues/41)

## Problem

Harden Better Auth for a streamer community gateway: Twitch as primary identity, reduce abuse surface, keep Discord optional.

## Goals

- [ ] Prefer Twitch-first signup/login UX (email/password secondary or gated)
- [ ] Configure trustedOrigins / cookie hardening for production hosts
- [ ] Add rate-limiting / abuse guards around /api/auth (or document Better Auth built-ins)
- [ ] Pin better-auth if still floating
- [ ] Document community auth model in doc/auth-better-auth.md

## Non-goals

See issue #45 Out of scope.

## Requirements

### Functional

- [ ] Prefer Twitch-first signup/login UX (email/password secondary or gated)
- [ ] Configure trustedOrigins / cookie hardening for production hosts
- [ ] Add rate-limiting / abuse guards around /api/auth (or document Better Auth built-ins)
- [ ] Pin better-auth if still floating
- [ ] Document community auth model in doc/auth-better-auth.md

### Non-functional

- [ ] `nix develop -c pnpm check:ci` green
- [ ] CI green on PR; do not merge without human

## Related project memory

- Epic: #41 P0 portal safety
- Dual-mode: public showcase + Twitch community gateway + separate CV host

## Implementation pointer

`plans/PLAN-45-twitch-first-auth.md`
