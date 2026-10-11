# PLAN-52 — Populate cda_lab and define cassette community role

- **Status**: in-review
- **PRD**: [[../prd/PRD-52-cda-lab-cassette-community|PRD-52]]
- **GitHub**: [#52](https://github.com/chatondearu/cda/issues/52)
- **Date**: 2026-10-11

## Summary

Ship real `cda_lab` capsules and give `/cassette` a defined community purpose with i18n/SEO.

## Constraints (from ADRs)

| ADR | Constraint |
| --- | ---------- |
| _(none yet)_ | Nuxt Content collections; Clinical Diagnostic UI; Nix verify |

## Scope

### In scope

- Content entries + `/cda-lab` query wiring
- Cassette role + chrome/SEO/i18n
- Replace stub empty-state when content exists

### Out of scope

See PRD.

## Technical approach

Branch `feat/52-cda-lab-cassette-community` from `dev`. Size: M. Parallel-safe vs #50/#51 if paths stay under content/pages lab/cassette.

## Tasks

- [x] Claim #52; board → In progress
- [x] Author initial cda_lab markdown
- [x] Wire page to `queryCollection('cda_lab')`
- [x] Expand cassette page purpose + i18n/SEO
- [x] `nix develop -c pnpm check:ci`; PR `Closes #52`; CI green; do not merge

## Test plan

- [x] `/cda-lab` lists capsules
- [x] `/cassette` not a stub
- [ ] Remote CI green

## Verification

- [x] Lint / typecheck per AGENTS.md
