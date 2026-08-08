# @chatondearu/design-system

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
- `app/components/ui/*`: application UI components.
- `app/components/hud/*`: micro-graphic HUD primitives (decorative density).
- `app/composables/useSystemData.ts`: starter data contracts and mock content.
- `app/composables/useThemeMode.ts`: single source for theme mode state, persistence, and html class toggling.
- `app/composables/useHudSeed.ts`: deterministic seed hashing/PRNG helpers for HUD noise components (`HudAsciiBlock`, `HudBarcodeStrip`, `HudWaveform`).
- `app/composables/useHudMotion.ts`: single source for the global HUD animation switch (`hud-motion` / `hud-motion-off` html class, `localStorage['cda-hud-motion']`); `prefers-reduced-motion` always wins.

## Theme Guardrails

- Never use hardcoded colors in UI components (`#...`, `black`, `white`, custom rgb/rgba).
- Prefer semantic utilities only (`text-primary`, `bg-surface_container`, `border-outline_variant/20`, etc.).
- If a new color is needed, add/update token variables in `design-system.css` first, then expose through `uno.config.ts`.
- Run `pnpm --filter @chatondearu/design-system lint:colors` to enforce the rule automatically.

## Install in a Nuxt app

In the app `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  extends: ['../design-system'],
})
```

## Histoire

Interactive playground for UI primitives:

```bash
pnpm --filter @chatondearu/design-system story:dev
# or from repo root:
pnpm story:dev
```

A floating **HUD MOTION** / **MOTION OFF** control sits bottom-right of the Histoire sandbox. It toggles
the global `useHudMotion` switch (persisted in `localStorage['cda-hud-motion']`) across every story —
same mechanism as the dark/light sync. See `HUD / Motion` for a live demo strip. OS-level
`prefers-reduced-motion` always overrides it back off.

## V1 Component Inventory

- Foundations: `UiPageFrame`, `UiSectionHeader`, `UiDotGridOverlay`
- HUD (micro-graphics): `HudNoiseLabel`, `HudRefCode`, `HudCornerMarks`, `HudCrosshair`, `HudStatusLine`, `HudLogStream`, `HudMeterBar`, `HudCodeReadout`, `HudCompass`, `HudReticle`, `HudTargetLock`, `HudBadge`, `HudSerialBlock`, `HudAccessBanner`, `HudOrgLabel`, `HudAsciiBlock`, `HudScanBuffer`, `HudBarcodeStrip`
- HUD (composites): `HudTelemetryCluster`, `HudCornerStack`, `HudDiagPanel`
- HUD (sheet): `HudSheet`
- HUD (motion): global `useHudMotion` switch wired into `HudMeterBar`, `HudLogStream`, `HudScanBuffer`, `HudTargetLock`, `HudCrosshair`, `HudBarcodeStrip`, `HudPulseReadout` — see `HUD / Motion` story
- HUD (gauges): `HudRingGauge`, `HudSegmentedBar`, `HudDualBus`
- HUD (signal): `HudWaveform`, `HudRadarRing`, `HudTickLadder`
- HUD (data readouts): `HudCoordReadout`, `HudAngleReadout`, `HudPacketLoss`, `HudPulseReadout`
- HUD (marks & stamps): `HudWarningPlate`, `HudChecksumStamp`, `HudBuildStamp`, `HudHotZone`
- Actions and Inputs: `UiButton`, `UiCommandInput`, `UiStatusChip`
- Navigation: `UiTopBar`, `UiSideNav`, `UiMobileDockNav`, `UiFooterLinks`
- Content Modules: `UiHeroCommand`, `UiTimeline`, `UiTimelineItem`, `UiArchiveCard`, `UiCassetteDeck`, `UiProgressReadout`
- Overlay and Feedback: `UiGlassDiagnosticPanel`, `UiSystemBadge`
