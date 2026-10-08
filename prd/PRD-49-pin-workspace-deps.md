# PRD-49 — Pin floating latest workspace dependencies

- **Status**: approved
- **GitHub**: [#49](https://github.com/chatondearu/cda/issues/49)
- **Date**: 2026-10-08
- **Tags**: #infra #deps
- **Parent epic**: [#41](https://github.com/chatondearu/cda/issues/41) (P0 portal safety)

## Problem

Several workspace `package.json` files use `"latest"` ranges (`vue`, `husky`, `better-auth`, drizzle stack, eslint packages, `reka-ui`). Builds are non-reproducible and the lockfile already resolves **two Vue versions** (`3.5.32` and `3.5.41`). The community portal + showcase stack needs deterministic installs for CI and Coolify deploys.

## Goals

- [ ] Eliminate `"latest"` from workspace package manifests (except explicitly justified exceptions)
- [ ] Single Vue version across app + design-system
- [ ] Keep Node `>=24 <25` and pnpm `>=10.33.0 <11` engines aligned
- [ ] `pnpm install --frozen-lockfile` + `nix develop -c pnpm check:ci` green

## Non-goals

- Major framework upgrades beyond pinning current resolved versions
- Auth Twitch-first / SEO / security headers / CV work (other P0 children)
- Adding a blocking `pnpm audit` CI gate (optional note only)

## Users & scenarios

| Persona | Scenario |
| ------- | -------- |
| Maintainer / agent | Fresh clone installs identical deps on CI and local Nix shell |
| Deploy pipeline | Docker build with `--frozen-lockfile` does not surprise-bump packages |

## Requirements

### Functional

- [ ] Pin versions in root, `@chatondearu/app`, `@chatondearu/db`, `@chatondearu/design-system`, `@chatondearu/eslint-config`
- [ ] Refresh `pnpm-lock.yaml` after pins
- [ ] Resolve dual Vue to one version (prefer the higher currently used, `3.5.41`, unless check:ci forces otherwise)

### Non-functional

- [ ] No product UI changes
- [ ] Conventional commit on worker branch; PR `Closes #49`

## Related project memory

- ADRs: _(none yet)_
- Epic: #41 P0 portal safety foundation

## Open questions

_(none — scope is mechanical pinning)_

## Success metrics

- Zero `"latest"` string in workspace `package.json` files
- One Vue version in `pnpm list -r vue`
- CI green on the PR

## Implementation pointer

`plans/PLAN-49-pin-workspace-deps.md`
