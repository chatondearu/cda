# PLAN-49 — Pin floating latest workspace dependencies

- **Status**: in-progress
- **PRD**: [[../prd/PRD-49-pin-workspace-deps|PRD-49]]
- **GitHub**: [#49](https://github.com/chatondearu/cda/issues/49)
- **Date**: 2026-10-08

## Summary

Replace `"latest"` dependency ranges with concrete versions from the current lockfile resolution, unify Vue across the monorepo, and verify with frozen install + `check:ci`.

## Constraints (from ADRs)

| ADR | Constraint |
| --- | ---------- |
| _(none matched)_ | Keep Node 24 / pnpm 10.33 engines; do not bump Nuxt major |

Do not violate accepted ADRs without superseding them.

## Scope

### In scope

- Pin packages currently on `"latest"`:
  - root: `husky` → `9.1.7`
  - `modules/app`: `better-auth` → `1.6.9`, `vue` → `3.5.41`
  - `modules/db`: `drizzle-orm` → `0.45.2`, `pg` → `8.20.0`, `drizzle-kit` → `0.31.10`, `tsx` → `4.21.0`, `typescript` → `6.0.3`, `@types/node` → `25.6.0`, `@types/pg` → `8.20.0`
  - `modules/design-system`: `reka-ui` → `2.10.1`, `vue` → `3.5.41`
  - `modules/eslint-config`: `@antfu/eslint-config` → `8.2.0`, `@unocss/eslint-plugin` → `66.6.8`
- Run `pnpm install` and commit lockfile changes if any
- Confirm single Vue version

### Out of scope

- Auth / SEO / security / CV P0 issues
- Enabling Histoire beta pin changes beyond vue/reka already listed
- Blocking audit CI job (optional comment in PR body only)

## Technical approach

1. Edit each workspace `package.json` (no app feature code).
2. `nix develop -c pnpm install`
3. `nix develop -c pnpm check:ci` (+ `pnpm db:typecheck` if not covered)
4. Open PR from worktree branch `chore/49-pin-workspace-deps`

## Tasks

- [x] Claim #49; move board → In progress
- [x] Pin all `"latest"` entries listed above
- [ ] `pnpm install`; ensure lockfile consistent
- [ ] Verify single Vue via `pnpm list -r vue --depth 0`
- [ ] `nix develop -c pnpm check:ci`
- [ ] Systematic review (deps-only PR)
- [ ] Open PR `Closes #49`; board → In review
- [ ] Watch CI until green

## Risks & mitigations

| Risk | Mitigation |
| ---- | ---------- |
| Pin breaks typecheck (typescript 6) | Already resolved in lockfile; if CI fails, pin to last green or adjust |
| Dual Vue persists via transitive | Use pnpm overrides only if necessary after list check |

## Test plan

- [ ] `rg '"latest"' --glob '**/package.json'` → no hits in workspace packages
- [ ] `nix develop -c pnpm install --frozen-lockfile`
- [ ] `nix develop -c pnpm check:ci`
- [ ] `nix develop -c pnpm db:typecheck`

## Verification

- [ ] Lint / typecheck per project conventions
- [ ] Remote CI green on PR (do not merge)
- [ ] Update foam / ADR only if a new pinning policy decision is recorded
