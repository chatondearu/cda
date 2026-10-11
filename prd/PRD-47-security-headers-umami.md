# PRD-47 — HTTP security headers and Umami privacy posture

- **Status**: approved
- **GitHub**: [#47](https://github.com/chatondearu/cda/issues/47)
- **Date**: 2026-10-09
- **Tags**: #portal #p0
- **Parent epic**: [#41](https://github.com/chatondearu/cda/issues/41)

## Problem

Add baseline HTTP security headers and clarify privacy/consent when Umami may be enabled.

## Goals

- [ ] Introduce CSP / frameguard / referrer / HSTS-ready headers (nuxt-security or Nitro routeRules)
- [ ] Keep headers compatible with Content, auth callbacks, Umami script URL
- [ ] Document Umami consent; minimal privacy notice or gate if keys set
- [ ] Note CV/community host header differences if needed

## Non-goals

See issue #47 Out of scope.

## Requirements

### Functional

- [ ] Introduce CSP / frameguard / referrer / HSTS-ready headers (nuxt-security or Nitro routeRules)
- [ ] Keep headers compatible with Content, auth callbacks, Umami script URL
- [ ] Document Umami consent; minimal privacy notice or gate if keys set
- [ ] Note CV/community host header differences if needed

### Non-functional

- [ ] `nix develop -c pnpm check:ci` green
- [ ] CI green on PR; do not merge without human

## Related project memory

- Epic: #41 P0 portal safety
- Dual-mode: public showcase + Twitch community gateway + separate CV host

## Implementation pointer

`plans/PLAN-47-security-headers-umami.md`
