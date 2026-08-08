# Histoire + rename design-system — Design Spec

Date: 2026-08-08  
Status: approved (conversation) — pending implementation plan

## Goal

1. Rename the Nuxt design-system layer from `design-system-nuxt` to `design-system`.
2. Add Histoire inside that module as an interactive playground for a first subset of UI components, with a global dark/light toggle aligned to the design-system theme contract.

## Non-goals

- Redesigning existing UI components
- Stories for navigation, content modules, or overlay components in this lot
- Visual regression CI or production hosting of the Histoire static build
- Renaming or moving the root docs folder `design-system/` (DESIGN.md, code.html, etc.)

## Decisions

| Topic | Choice |
|-------|--------|
| Architecture | Histoire lives **inside** the design-system package (not a separate playground app, not in `@chatondearu/app`) |
| Story scope | Foundations + Actions (full inventory below) |
| Theme UX | Histoire toolbar color-scheme switch, synced to `html.dark` / `html.light` |
| Package name | `@chatondearu/design-system` |
| Folder | `modules/design-system` |

## Rename

### Package & path

- Directory: `modules/design-system-nuxt` → `modules/design-system`
- Package name: `@chatondearu/design-system-nuxt` → `@chatondearu/design-system`

### References to update

- `modules/app/nuxt.config.ts` — `extends: ['../design-system']`
- `modules/app/package.json` — workspace dependency
- `modules/app/uno.config.ts` — re-export path
- Relative type imports in app composables/utils that point at `design-system-nuxt`
- Root `package.json` scripts (`lint:colors`, new `story:dev`)
- `modules/design-system/README.md` (formerly design-system-nuxt)
- `AGENTS.md` path references
- Design docs that mention the old module path (`design-system/DESIGN-LIGHT.md`, etc.)

Root `design-system/` (visual/source-of-truth docs) stays as-is; it does not conflict with `modules/design-system`.

## Histoire setup

### Dependencies (devDependencies of `@chatondearu/design-system`)

- `histoire`
- `@histoire/plugin-vue`
- `@histoire/plugin-nuxt`

### Config files

- `modules/design-system/histoire.config.ts`
  - Plugins: `HstVue()`, `HstNuxt()`
  - Theme: title `CDA Design System`, `defaultColorScheme: 'dark'`, `storeColorScheme: true`, color-scheme switch visible
- `modules/design-system/histoire.setup.ts`
  - Ensure design-system CSS / Uno path works in the sandbox
  - Sync Histoire dark mode → documentElement classes:
    - dark → add `dark`, remove `light`
    - light → add `light`, remove `dark`
  - This matches `useThemeMode` contract (both classes, not only `dark`)

### Scripts

Package `@chatondearu/design-system`:

```json
{
  "story:dev": "histoire dev",
  "story:build": "histoire build",
  "story:preview": "histoire preview"
}
```

Root workspace (convenience):

```json
{
  "story:dev": "pnpm --filter @chatondearu/design-system story:dev"
}
```

Also rename existing root filter usages from `@chatondearu/design-system-nuxt` to `@chatondearu/design-system`.

## Stories (lot 1)

Colocated `*.story.vue` next to components under `app/components/ui/`.

### Foundations

- `UiPageFrame`
- `UiSectionHeader`
- `UiRefCode`
- `UiNoiseLabel`
- `UiCornerMarks`
- `UiDotGridOverlay`

### Actions & inputs

- `UiButton`
- `UiCommandInput`
- `UiStatusChip`

### Story conventions

- Grouped titles: `Foundations / UiSectionHeader`, `Actions / UiButton`, etc.
- Useful variants + Histoire controls (`HstText`, `HstSelect`, …) for key props
- `UiButton`: cover both button and link modes

## Runtime mocks

The design-system layer does not ship `@nuxtjs/i18n`. `UiButton` uses `useLocalePath()`.

- Provide a minimal stub so stories do not crash: `useLocalePath` → identity (`path => path`)
- Prefer a tiny Nuxt plugin/module local to the design-system package used when Histoire boots, or equivalent setup in `histoire.setup.ts`
- `@histoire/plugin-nuxt` supplies Nuxt runtime pieces such as `NuxtLink`

No other app-only composables are required for this story lot.

## Verification

1. `nix develop -c pnpm install` (lockfile updated)
2. `nix develop -c pnpm --filter @chatondearu/design-system story:dev` starts and lists all 9 stories
3. Toolbar dark/light toggles `dark` / `light` on `<html>`
4. `nix develop -c pnpm --filter @chatondearu/app typecheck` passes after rename
5. `nix develop -c pnpm lint:colors` still works against the renamed package

## Success criteria

- Consumers extend `../design-system` and depend on `@chatondearu/design-system`
- Designers/devs can browse foundations + actions in Histoire with correct tokens in dark and light
- No hardcoded color regressions introduced in Vue components (existing lint rule remains the guardrail)
