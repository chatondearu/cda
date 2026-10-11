# PRD-52 — Populate cda_lab and define cassette community role

- **Status**: approved
- **GitHub**: [#52](https://github.com/chatondearu/cda/issues/52)
- **Date**: 2026-10-11
- **Tags**: #portal #p1 #community #content
- **Parent epic**: [#42](https://github.com/chatondearu/cda/issues/42)

## Problem

`/cda-lab` and `/cassette` are stubs/empty; community narrative has nowhere to land.

## Goals

- [ ] Add initial `cda_lab` content matching `content.config.ts`
- [ ] Wire `/cda-lab` to `queryCollection('cda_lab')`
- [ ] Define cassette page role (voice archives / live lore) + i18n chrome
- [ ] Replace pure stub empty-state once content exists
- [ ] Align copy with streamer community narrative

## Non-goals

- Full audio player backend
- New HUD Forge lots

## Requirements

### Functional

- [ ] `/cda-lab` lists real capsules
- [ ] `/cassette` has purpose, SEO, and i18n beyond a thin wrapper
- [ ] Account hub can link to these surfaces

### Non-functional

- [ ] `nix develop -c pnpm check:ci` green
- [ ] CI green on PR; do not merge without human

## Related project memory

- Epic: #42
- Nuxt Content collection `cda_lab`

## Implementation pointer

`plans/PLAN-52-cda-lab-cassette-community.md`
