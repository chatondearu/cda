# @chatondearu/design-system-nuxt

Nuxt layer for the `Logical Machine` design system.

## Goals

- Provide a reusable visual foundation for Nuxt apps.
- Centralize UI primitives with strict clinical diagnostic styling.
- Keep components unstyled-first with Reka-UI interactions and UnoCSS utilities.

## UnoCSS

- Authoritative config: `uno.config.ts` (theme tokens from `design-system/code.html`, presets, shortcuts).
- The app re-exports the same config as `modules/app/uno.config.ts` so `@unocss/eslint-plugin` resolves from the app package root.

## Structure

- `app/assets/css/design-system.css`: Material Symbols base class, scanline, layout resets (no color grid — use Uno `ds-dot-bg` / `UiPageFrame`).
- `app/components/ui/*`: v1 UI components.
- `app/composables/useSystemData.ts`: starter data contracts and mock content.

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
