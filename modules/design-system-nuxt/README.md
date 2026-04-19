# @chatondearu/design-system-nuxt

Nuxt layer for the `CDA_LAB` / Logical Machine design system (CDA: ChatonDeAru).

## Goals

- Provide a reusable visual foundation for Nuxt apps.
- Centralize UI primitives with strict clinical diagnostic styling.
- Keep components unstyled-first with Reka-UI interactions and UnoCSS utilities.

## UnoCSS

- Authoritative config: `uno.config.ts` (theme tokens from `design-system/code.html`, presets, shortcuts).
- The app re-exports the same config as `modules/app/uno.config.ts` so `@unocss/eslint-plugin` resolves from the app package root.
- Color mapping is token-driven only: `theme.colors` uses `rgb(var(--token) / <alpha-value>)` and does not carry hardcoded hex values.
- Dark/light mode uses `dark: 'class'` and root classes (`dark`/`light`) that switch CSS variables globally.

## Structure

- `app/assets/css/design-system.css`: Material Symbols base class, scanline, layout resets, and root theme variables (`:root.dark` / `:root.light`).
- `app/components/ui/*`: v1 UI components.
- `app/composables/useSystemData.ts`: starter data contracts and mock content.
- `app/composables/useThemeMode.ts`: single source for theme mode state, persistence, and html class toggling.

## Theme Guardrails

- Never use hardcoded colors in UI components (`#...`, `black`, `white`, custom rgb/rgba).
- Prefer semantic utilities only (`text-primary`, `bg-surface_container`, `border-outline_variant/20`, etc.).
- If a new color is needed, add/update token variables in `design-system.css` first, then expose through `uno.config.ts`.
- Run `pnpm --filter @chatondearu/design-system-nuxt lint:colors` to enforce the rule automatically.

## Install in a Nuxt app

In the app `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  extends: ['../design-system-nuxt'],
})
```

## V1 Component Inventory

- Foundations: `UiPageFrame`, `UiSectionHeader`, `UiRefCode`, `UiNoiseLabel`, `UiCornerMarks`, `UiDotGridOverlay`
- Actions and Inputs: `UiButton`, `UiCommandInput`, `UiStatusChip`
- Navigation: `UiTopBar`, `UiSideNav`, `UiMobileDockNav`, `UiFooterLinks`
- Content Modules: `UiHeroCommand`, `UiTimeline`, `UiTimelineItem`, `UiArchiveCard`, `UiCassetteDeck`, `UiProgressReadout`
- Overlay and Feedback: `UiGlassDiagnosticPanel`, `UiEmptyCrosshair`, `UiSystemBadge`
