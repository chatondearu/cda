# HUD Lots 15–24 — Forge Modules parity (categories + gaps)

> Stacked on `feat/hud-lot-14-structure`. One implementer agent per lot. PR `base` = previous lot branch.
> Plan: HUD Forge Modules parity (do not edit the Cursor plan file).

## Global constraints

- Repo: `/hdd/dev/chatondearu/cda`
- `<script setup lang="ts">` + typed Props; Uno tokens only
- `nix develop -c pnpm --filter @chatondearu/design-system lint:colors`
- Histoire: `HUD / {GROUP} / HudName` (GROUP ∈ TEXT|BOXES|CODES|ICONS|CHARTS|AIMING|SPECIMEN|TACTICAL|COMPOSITES)
- Forge group `HUD` → folder `aiming/`, Histoire `HUD / AIMING / …`
- Conventional Commits; one commit per lot preferred
- Update README inventory by category when adding/moving components
- No IMAGE/photo. Do not implement later lots in the same run.
- Motion: reuse `useHudMotion` / `.hud-motion-target` where natural

## Folder layout (target)

```text
modules/design-system/app/components/hud/
  text/ boxes/ codes/ icons/ charts/ aiming/ specimen/ tactical/
  composites/
```

## Nuxt

In `modules/design-system/nuxt.config.ts`, register hud components with `pathPrefix: false` so nested `HudHeader.vue` stays `HudHeader`.

## Existing → Forge mapping (move in lot 15)

| Forge id | Hud component | Folder |
|----------|---------------|--------|
| label | HudNoiseLabel, HudOrgLabel | text |
| hexcode | HudCodeReadout | text |
| termlog | HudLogStream | text |
| statusbox | HudStatusLine, HudAccessBanner | boxes |
| cornerbox | HudCornerMarks, HudBracketFrame | boxes |
| lockon | HudTargetLock | boxes / aiming (prefer aiming for TargetLock; CornerMarks→boxes) |
| barcode | HudBarcodeStrip | codes |
| noise | HudAsciiBlock, HudScanBuffer | codes |
| dotgrid | keep UiDotGridOverlay in ui/ (document as covered by Ui*) | — |
| waveform | HudWaveform | charts |
| donut | HudRingGauge | charts |
| crosshair | HudCrosshair | aiming |
| compass | HudCompass | aiming |
| rangerings | HudRadarRing | aiming |
| hazard | HudWarningPlate | aiming |
| nodelink | HudNodeGraph | aiming |
| certmark | HudChecksumStamp, HudBuildStamp | specimen |
| progress | HudMeterBar, HudSegmentedBar, HudProgressReadout-related Hud meters | specimen (meters) or charts — put MeterBar/SegmentedBar/DualBus in specimen if Forge progress, else charts; **put meters in specimen** as progress family + keep RingGauge in charts as donut |
| geocoord | HudCoordReadout | specimen |
| angle/protractor | HudAngleReadout | aiming |
| pulse/ecg-ish | HudPulseReadout | charts |
| packet | HudPacketLoss | specimen or data — put in specimen |
| serial/badge/org | HudSerialBlock, HudBadge | boxes or text — **boxes** for badge/serial, org→text |
| hotzone | HudHotZone | tactical |
| reticle | HudReticle | aiming |
| tickladder | HudTickLadder | aiming |
| conduit | HudConduit | aiming |
| composites | HudTelemetryCluster, HudCornerStack, HudDiagPanel, HudSheet, ForgeSheetDemo | composites |
| motion story | HudMotion.story | composites or root — move to composites |

Also move: HudStatusLine→boxes, HudAccessBanner→boxes, HudRefCode→text, HudLogStream→text, HudCodeReadout→text, HudBig* etc.

## Lot 15 — Categories reorg

- Create folders; `git mv` existing files
- Retitle all stories to `HUD / {GROUP} / Name`
- Nuxt pathPrefix false
- Write `docs/superpowers/plans/2026-08-10-hud-forge-modules-map.md` with full Forge↔Hud table (covered + missing)
- README inventory by category
- Verify auto-import names unchanged for app pages
- Commit + leave branch ready for PR base `feat/hud-lot-14-structure`

## Lots 16–23 — gap fills

As in the approved plan (TEXT, BOXES, CODES, ICONS, CHARTS, AIMING, SPECIMEN, TACTICAL). Each component + story. Token-only. Seeded SSR-safe where generative.

## Lot 24 — Catalog demo

- Refresh ForgeSheetDemo with new modules
- Add `HUD / Catalog` story (index by group)
- Final README

## PR stacking

| Lot | Branch | PR base |
|-----|--------|---------|
| 15 | feat/hud-lot-15-categories | feat/hud-lot-14-structure |
| 16 | feat/hud-lot-16-text | feat/hud-lot-15-categories |
| 17 | feat/hud-lot-17-boxes | feat/hud-lot-16-text |
| 18 | feat/hud-lot-18-codes | feat/hud-lot-17-boxes |
| 19 | feat/hud-lot-19-icons | feat/hud-lot-18-codes |
| 20 | feat/hud-lot-20-charts | feat/hud-lot-19-icons |
| 21 | feat/hud-lot-21-aiming | feat/hud-lot-20-charts |
| 22 | feat/hud-lot-22-specimen | feat/hud-lot-21-aiming |
| 23 | feat/hud-lot-23-tactical | feat/hud-lot-22-specimen |
| 24 | feat/hud-lot-24-forge-demo | feat/hud-lot-23-tactical |
