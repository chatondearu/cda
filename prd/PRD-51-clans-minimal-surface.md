# PRD-51 — Minimal clan surface on existing schema

- **Status**: approved
- **GitHub**: [#51](https://github.com/chatondearu/cda/issues/51)
- **Date**: 2026-10-11
- **Tags**: #portal #p1 #community
- **Parent epic**: [#42](https://github.com/chatondearu/cda/issues/42)

## Problem

Clan tables exist in `@chatondearu/db` but there is no product surface for members to see clans.

## Goals

- [ ] List clans (public or member-visible as appropriate)
- [ ] Show current user clan status
- [ ] Wire to existing schema without new migrations unless strictly required
- [ ] Empty/loading states in HUD / Clinical Diagnostic language
- [ ] i18n for UI chrome

## Non-goals

- Purchase flows beyond display of access flags
- Full rewards/events admin
- Firestore re-import

## Requirements

### Functional

- [ ] At least one clan list/detail route against DB data
- [ ] Account hub (#50) can deep-link into it
- [ ] Empty states when DB has no clans / no membership

### Non-functional

- [ ] `nix develop -c pnpm check:ci` green
- [ ] CI green on PR; do not merge without human

## Related project memory

- Epic: #42
- Coordinate with #50 CTAs

## Implementation pointer

`plans/PLAN-51-clans-minimal-surface.md`
