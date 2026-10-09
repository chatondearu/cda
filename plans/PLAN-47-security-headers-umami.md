# PLAN-47 — HTTP security headers and Umami privacy posture

- **Status**: ready
- **PRD**: [[../prd/PRD-47-security-headers-umami|PRD-47]]
- **GitHub**: [#47](https://github.com/chatondearu/cda/issues/47)
- **Date**: 2026-10-09

## Summary

Add baseline HTTP security headers and clarify privacy/consent when Umami may be enabled.

## Constraints (from ADRs)

| ADR | Constraint |
| --- | ---------- |
| _(none)_ | Clinical Diagnostic UI; Uno tokens; Nix verify; no invent product decisions |

## Scope

### In scope

- [x] Introduce CSP / frameguard / referrer / HSTS-ready headers (Nitro middleware; no nuxt-security dep)
- [x] Keep headers compatible with Content, auth callbacks, Umami script URL
- [x] Document Umami consent; minimal privacy notice or gate if keys set
- [x] Note CV/community host header differences if needed

### Out of scope

See issue #47.

## Technical approach

Work on branch `feat/47-security-headers-umami` from `feat/hud-lot-24-forge-demo`, with `fix/46-seo-og-robots` merged for routeRules/meta compat. Isolated clone `/tmp/cda-47`. PR base: `feat/hud-lot-24-forge-demo`. Size: M.

Implementation notes:

- Headers: `server/middleware/02-security-headers.ts` (dynamic CSP + HSTS on HTTPS only).
- Umami gate: `useUmamiConsent` + `AppUmamiConsentNotice`; script only after `granted`.
- Docs: `doc/security-headers.md` (CV vs community host table).

## Tasks

- [x] Claim #47; board → In progress
- [x] Introduce CSP / frameguard / referrer / HSTS-ready headers
- [x] Keep headers compatible with Content, auth callbacks, Umami script URL
- [x] Document Umami consent; minimal privacy notice or gate if keys set
- [x] Note CV/community host header differences if needed
- [ ] `nix develop -c pnpm check:ci`
- [ ] Systematic review (Critical/Important fixed)
- [ ] Open PR `Closes #47`; board → In review
- [ ] Watch CI until green; do not merge

## Test plan

- [ ] Acceptance criteria from issue #47
- [ ] `nix develop -c pnpm check:ci`
- [ ] Remote CI green

## Verification

- [ ] Lint / typecheck per AGENTS.md
- [x] Docs updated when behavior changes
