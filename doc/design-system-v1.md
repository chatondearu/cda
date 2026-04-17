# Design System V1 - Logical Machine

## Visual Rules

- All key labels and section titles are uppercase and tracking-heavy.
- Hard edges only: no rounded corners for structural UI.
- Depth is expressed with tonal containers, not shadows.
- Accent lines are functional only and reserved for data guidance.
- Dot-grid texture is allowed as low-opacity environmental noise.

## Tokens

- `--cda-bg`: base viewport background.
- `--cda-surface-*`: tonal stacking levels.
- `--cda-primary` and `--cda-primary-strong`: active highlights and critical indicators.
- `--cda-outline` and `--cda-outline-variant`: separators and ghost borders.
- `--cda-on-*`: foreground text contrast.

## Component API (V1)

### Foundations

- `UiPageFrame`: global shell wrapper and ambient grid.
- `UiSectionHeader`: section title and optional reference code.
- `UiRefCode`: mono micro-label for references.
- `UiNoiseLabel`: non-critical metadata traces.
- `UiCornerMarks`: module corner markers for priority zones.
- `UiDotGridOverlay`: reusable background noise layer.

### Actions and Inputs

- `UiButton`
  - props: `variant` (`primary|secondary|tertiary`), `as` (`button|a`), `href`
- `UiCommandInput`
  - props: `label`, `modelValue`
  - emits: `update:modelValue`
- `UiStatusChip`
  - props: `status` (`NOM|CRIT|STBY`)

### Navigation

- `UiTopBar`: mission status line in fixed top header.
- `UiSideNav`: desktop navigation rail.
- `UiMobileDockNav`: mobile bottom dock.
- `UiFooterLinks`: command links and endpoint metadata.

### Content Modules

- `UiHeroCommand`: hero mission statement with command actions.
- `UiTimeline` and `UiTimelineItem`: timeline readout modules.
- `UiArchiveCard`: project capsule card.
- `UiCassetteDeck`: cassette interface and transport controls.
- `UiProgressReadout`: linear machine progress display.

### Overlay and Feedback

- `UiGlassDiagnosticPanel`: blur-backed diagnostics using Reka-UI tabs.
- `UiEmptyCrosshair`: empty-state target marker.
- `UiSystemBadge`: compact system key-value indicator.

## Accessibility Baseline

- All critical interactions stay keyboard reachable.
- Reka-UI primitives provide baseline focus and ARIA behavior.
- Color is not the only status indicator: textual states are always present.

## App Integration

- Extend layer from `modules/app/nuxt.config.ts`.
- Compose layout with `UiTopBar + UiSideNav + UiMobileDockNav`.
- Build routes:
  - `/`
  - `/timeline`
  - `/archive`
  - `/archive/[slug]`
  - `/lab`
  - `/cassette`
  - `/system/diag`
