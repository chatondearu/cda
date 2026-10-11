# PRD-50 — Community profile dashboard after login

- **Status**: approved
- **GitHub**: [#50](https://github.com/chatondearu/cda/issues/50)
- **Date**: 2026-10-11
- **Tags**: #portal #p1 #community
- **Parent epic**: [#42](https://github.com/chatondearu/cda/issues/42)

## Problem

`/account` is a minimal session readout (name/email/logout). Logged-in community members need a clear hub: identity links, clan summary, and CTAs into community surfaces.

## Goals

- [ ] Show linked Twitch/Discord identity from Better Auth + `profiles`
- [ ] Surface clan membership summary if present (read-only OK)
- [ ] Clear CTAs to community areas (clan, lab, cassette, timeline)
- [ ] Localized copy (fr/en/zh/ja) for community context
- [ ] Keep Clinical Diagnostic UI (Uno tokens / DS components; no generic settings dump)

## Non-goals

- Full profile editor
- Clan admin tools
- CV grant UX (separate from community session)

## Users & scenarios

| Persona | Scenario |
| ------- | -------- |
| Twitch viewer (logged in) | Opens `/account` and sees identity + where to go next in the community |
| Anonymous | Still redirected to `/login?redirect=/account` |

## Requirements

### Functional

- [ ] Enrich `/account` beyond name/email with provider identity and profile fields available today
- [ ] Read-only clan membership summary when data exists
- [ ] CTAs to planned/existing community routes (deep-link ready for #51/#52)
- [ ] fr/en/zh/ja copy for new strings

### Non-functional

- [ ] `nix develop -c pnpm check:ci` green
- [ ] CI green on PR; do not merge without human
- [ ] Auth middleware remains required

## Related project memory

- Epic: #42 P1 first community surface
- Dual-mode: public showcase + Twitch community gateway (CV host stays separate)
- Depends on shipped P0 auth (#45) and existing `/account` middleware

## Open questions

1. Default post-login landing remains `#53` — this PRD owns the destination page content, not the redirect wiring.

## Success metrics

- Logged-in user understands they are in a community hub, not a blank SaaS account page.

## Implementation pointer

`plans/PLAN-50-account-community-dashboard.md`
