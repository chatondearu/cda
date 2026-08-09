# HUD Forge Modules Map — Lot 15 output

> Produced by Lot 15 (Categories reorg). Source: `2026-08-10-hud-lots-15-24-stacked.md` (existing → Forge
> mapping table + Global constraints). IMAGE/photo Forge modules are explicitly out of scope for the whole
> HUD Lots 15–24 stack.

Folder layout (`modules/design-system/app/components/hud/`):

```text
text/ boxes/ codes/ icons/ charts/ aiming/ specimen/ tactical/ composites/
```

## Legend

- **Covered** — a Hud* component already implements the Forge module.
- **Missing** — no Hud* component yet; candidate for the matching gap-fill lot (16–23).

## TEXT

| Forge id | Hud component | Status |
|----------|---------------|--------|
| label | `HudNoiseLabel`, `HudOrgLabel` | Covered |
| hexcode | `HudCodeReadout` | Covered |
| termlog | `HudLogStream` | Covered |
| refcode | `HudRefCode` | Covered |
| header | `HudHeader` | Covered (Lot 16) |
| bignum | `HudBigNum` | Covered (Lot 16) |
| kanji/glyph | `HudKanji` | Covered (Lot 16) |
| bracketword | `HudBracketWord` | Covered (Lot 16) |
| letterchips | `HudLetterChips` | Covered (Lot 16) |
| circletext | `HudCircleText` | Covered (Lot 16) |

Lot 16 gap fill complete — `HudHeader`, `HudBigNum`, `HudKanji`, `HudBracketWord`, `HudLetterChips`,
`HudCircleText` added to close remaining TEXT density gaps (no further TEXT Forge ids outstanding).

## BOXES

| Forge id | Hud component | Status |
|----------|---------------|--------|
| statusbox | `HudStatusLine`, `HudAccessBanner`, `HudStatusBox` | Covered |
| cornerbox | `HudCornerMarks`, `HudBracketFrame` | Covered |
| serial/badge | `HudSerialBlock`, `HudBadge` | Covered |
| table | `HudTable` | Covered (Lot 17) |
| chips | `HudChips` | Covered (Lot 17) |
| labelbox | `HudLabelBox` | Covered (Lot 17) |

Lot 17 gap fill complete — `HudStatusBox` (bordered status panel with metric rows), `HudTable` (dense
micro table), `HudChips` (bracket-style status chip row), `HudLabelBox` (notched label/value field) added
to close remaining BOXES density gaps.

## CODES

| Forge id | Hud component | Status |
|----------|---------------|--------|
| barcode | `HudBarcodeStrip` | Covered |
| noise | `HudAsciiBlock`, `HudScanBuffer` | Covered |

Gap-fill candidates: TBD in Lot 18.

## ICONS

| Forge id | Hud component | Status |
|----------|---------------|--------|
| — | — | Missing (no Hud* component yet) |

The `icons/` folder is created empty in Lot 15 (structure only). Full gap-fill is Lot 19.

## CHARTS

| Forge id | Hud component | Status |
|----------|---------------|--------|
| waveform | `HudWaveform` | Covered |
| donut | `HudRingGauge` | Covered |
| pulse/ecg | `HudPulseReadout` | Covered |

Gap-fill candidates: TBD in Lot 20.

## AIMING

Forge group `HUD` → folder `aiming/`, Histoire `HUD / AIMING / …`.

| Forge id | Hud component | Status |
|----------|---------------|--------|
| lockon | `HudTargetLock` | Covered |
| crosshair | `HudCrosshair` | Covered |
| compass | `HudCompass` | Covered |
| rangerings | `HudRadarRing` | Covered |
| hazard | `HudWarningPlate` | Covered |
| nodelink | `HudNodeGraph` | Covered |
| angle/protractor | `HudAngleReadout` | Covered |
| reticle | `HudReticle` | Covered |
| tickladder | `HudTickLadder` | Covered |
| conduit | `HudConduit` | Covered |

Gap-fill candidates: TBD in Lot 21.

## SPECIMEN

| Forge id | Hud component | Status |
|----------|---------------|--------|
| certmark | `HudChecksumStamp`, `HudBuildStamp` | Covered |
| progress | `HudMeterBar`, `HudSegmentedBar`, `HudDualBus` | Covered |
| geocoord | `HudCoordReadout` | Covered |
| packet | `HudPacketLoss` | Covered |

Gap-fill candidates: TBD in Lot 22.

## TACTICAL

| Forge id | Hud component | Status |
|----------|---------------|--------|
| hotzone | `HudHotZone` | Covered |

Gap-fill candidates: TBD in Lot 23.

## COMPOSITES (cross-category assemblies)

| Forge id | Hud component | Status |
|----------|---------------|--------|
| composites | `HudTelemetryCluster`, `HudCornerStack`, `HudDiagPanel`, `HudSheet`, `ForgeSheetDemo` | Covered |
| motion demo | `HudMotion.story` (story-only, no dedicated `.vue`) | Covered |

Refreshed in Lot 24 (`ForgeSheetDemo` update + `HUD / Catalog` index story).

## Out of scope

| Forge id | Reason |
|----------|--------|
| dotgrid | Covered by `UiDotGridOverlay` in `ui/` — not a Hud* component, documented here for completeness. |
| IMAGE / photo | Explicitly excluded from the whole HUD Lots 15–24 stack (Global constraints). |

## Ambiguous placement decisions (documented per brief §2)

- **`HudTargetLock`** (`lockon`): placed in `aiming/` (not `boxes/`) — target-lock/lock-on semantics fit the
  aiming family better than a generic box primitive.
- **`HudCornerMarks`**: kept in `boxes/` (cornerbox family) rather than `aiming/`, per the brief's explicit
  disambiguation.
- **`HudMeterBar` / `HudSegmentedBar` / `HudDualBus`** (`progress`): placed in `specimen/` as the "progress
  family", while `HudRingGauge` (`donut`) stays in `charts/`, per the brief's explicit disambiguation.
- **`HudSerialBlock` / `HudBadge`** (`serial/badge/org`): placed in `boxes/`; `HudOrgLabel` (the `org` half)
  placed in `text/`.
- **`HudPacketLoss`** (`packet`): placed in `specimen/` (data-readout family) rather than a dedicated
  `data/` folder, since no such folder exists in the target layout.
- **`HudMotion.story.vue`**: has no dedicated `.vue` component (cross-cutting motion demo strip); moved to
  `composites/` alongside `ForgeSheetDemo.story.vue`.
