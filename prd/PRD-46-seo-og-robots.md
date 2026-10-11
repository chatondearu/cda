# PRD-46 — Replace OG placeholders and restore robots/home meta

- **Status**: approved
- **GitHub**: [#46](https://github.com/chatondearu/cda/issues/46)
- **Date**: 2026-10-09
- **Tags**: #portal #p0
- **Parent epic**: [#41](https://github.com/chatondearu/cda/issues/41)

## Problem

Fix broken social/SEO metadata so Discord/Twitch shares and crawlers see real titles, descriptions, and robots policy.

## Goals

- [ ] Replace literal [og:*] placeholders on contact.vue and timeline.vue
- [ ] Add proper useSeoMeta on public home
- [ ] Fill public/robots.txt with explicit policy
- [ ] Real default OG image or documented temporary safe meta
- [ ] Align twitter/og fields with i18n copy

## Non-goals

See issue #46 Out of scope.

## Requirements

### Functional

- [ ] Replace literal [og:*] placeholders on contact.vue and timeline.vue
- [ ] Add proper useSeoMeta on public home
- [ ] Fill public/robots.txt with explicit policy
- [ ] Real default OG image or documented temporary safe meta
- [ ] Align twitter/og fields with i18n copy

### Non-functional

- [ ] `nix develop -c pnpm check:ci` green
- [ ] CI green on PR; do not merge without human

## Related project memory

- Epic: #41 P0 portal safety
- Dual-mode: public showcase + Twitch community gateway + separate CV host

## Implementation pointer

`plans/PLAN-46-seo-og-robots.md`
