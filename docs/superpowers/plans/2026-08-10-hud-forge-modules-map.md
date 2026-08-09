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
| densebar | `HudDenseBar` | Covered (Lot 18) |
| qrcode | `HudQrCode` | Covered (Lot 18) |
| blockart | `HudBlockArt` | Covered (Lot 18) |

Lot 18 gap fill complete — `HudDenseBar` (multi-row seeded density strip), `HudQrCode` (pure-SVG seeded
matrix with QR-style finder patterns, from `payload` or `seed`), `HudBlockArt` (seeded, optionally
mirrored identicon-style block grid via `useHudSeed`) added to close remaining CODES density gaps (no
further CODES Forge ids outstanding).

## ICONS

| Forge id | Hud component | Status |
|----------|---------------|--------|
| icon (geometric) | `HudIcon` | Covered (Lot 19) |
| glyph (abstract mark) | `HudGlyph` | Covered (Lot 19) |
| iconlabel | `HudIconLabel` | Covered (Lot 19) |

Lot 19 gap fill complete — `HudIcon` (geometric SVG primitive: diamond, chevron, hash, triangle, cross,
ring — deliberately not a Material Symbols icon set), `HudGlyph` (abstract sigil/rune/circuit/node/fracture
line-art marks), `HudIconLabel` (bracket label row composing a `HudIcon` with a label/value pair) added to
close the ICONS density gap (no further ICONS Forge ids outstanding).

## CHARTS

| Forge id | Hud component | Status |
|----------|---------------|--------|
| waveform | `HudWaveform` | Covered |
| donut | `HudRingGauge` | Covered |
| pulse/ecg | `HudPulseReadout` | Covered |
| sparkline | `HudSparkline` | Covered (Lot 20) |
| graph | `HudGraph` | Covered (Lot 20) |
| histogram | `HudHistogram` | Covered (Lot 20) |
| spectrum | `HudSpectrum` | Covered (Lot 20) |
| oscilloscope | `HudOscilloscope` | Covered (Lot 20) |
| scatter | `HudScatter` | Covered (Lot 20) |
| gantt | `HudGantt` | Covered (Lot 20) |
| ecg (trace) | `HudEcg` | Covered (Lot 20) |

Lot 20 gap fill complete — `HudSparkline` (compact SVG line trace with fill/marker options),
`HudGraph` (gridded SVG line + area chart with label caption), `HudHistogram` (bell-biased seeded bar
distribution), `HudSpectrum` (segmented tri-tone equalizer columns), `HudOscilloscope` (gridded scope
trace centered on a baseline), `HudScatter` (seeded SVG point cloud with outlier tone), `HudGantt`
(seeded horizontal timeline tracks), `HudEcg` (fixed PQRST cycle trace with seeded per-beat jitter and
bpm-driven sweep, distinct from `HudPulseReadout`'s single blip) added to close remaining CHARTS density
gaps (no further CHARTS Forge ids outstanding).

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
| angle/protractor | `HudAngleReadout`, `HudProtractor` | Covered |
| reticle | `HudReticle` | Covered |
| tickladder | `HudTickLadder` | Covered |
| conduit | `HudConduit` | Covered |
| arrow/vector | `HudArrow` | Covered (Lot 21) |
| measure/caliper | `HudMeasure` | Covered (Lot 21) |
| axis/gimbal | `HudAxis` | Covered (Lot 21) |
| scope | `HudScope` | Covered (Lot 21) |
| radialburst | `HudRadialBurst` | Covered (Lot 21) |
| knobs | `HudKnobs` | Covered (Lot 21) |
| orbit | `HudOrbit` | Covered (Lot 21) |

Lot 21 gap fill complete — `HudArrow` (rotating bearing/vector pointer), `HudMeasure` (ruler/caliper strip
with tick marks and a sliding value marker), `HudAxis` (dual-axis gimbal position indicator), `HudScope`
(scope-view reticle: crosshair + mil-dots + optional rotating outer ring), `HudProtractor` (full-circle
degree dial, distinct from the compact `HudAngleReadout` widget), `HudRadialBurst` (radiating spoke burst
with an optional highlighted/pulsing bearing spoke), `HudKnobs` (row of elevation/windage-style adjustment
dials), `HudOrbit` (concentric rings with nodes that can revolve, duration scaling per ring) added to close
remaining AIMING density gaps (no further AIMING Forge ids outstanding).

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
