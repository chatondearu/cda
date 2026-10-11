# PLAN-54 — Fix me-host gate i18n keys

- **Status**: in-progress
- **PRD**: [[../prd/PRD-54-me-host-i18n-gate|PRD-54]]
- **GitHub**: [#54](https://github.com/chatondearu/cda/issues/54)
- **Date**: 2026-10-11

## Summary

Fix `UiMeAccessGate` i18n scope and hard-coded EN title strings on me-host.

## Constraints (from ADRs)

| ADR | Constraint |
| --- | ---------- |
| _(none yet)_ | Prefer local SFC i18n; verify overlap with #48 changes |

## Scope

### In scope

- Gate keys + hard-coded EN localization
- Verify me-host translated description

### Out of scope

See PRD.

## Technical approach

Branch `fix/54-me-host-i18n-gate` from `dev`. Size: XS. Inspect current `UiMeAccessGate.vue` first — close as already done if #48 fully fixed it.

## Tasks

- [x] Claim #54; board → In progress
- [x] Audit gate i18n vs #48 result
- [x] Fix remaining keys/strings or document no-op + close
- [ ] `nix develop -c pnpm check:ci`; PR `Closes #54` (or comment + close if N/A); CI green; do not merge

## Test plan

- [x] Me-host shows no raw keys
- [x] fr/en/zh/ja smoke
- [ ] Remote CI green

## Verification

- [x] Lint / typecheck per AGENTS.md
