# HUD Lots 8–14 — Responsive, motion, catalog expansion

> Stacked on `feat/hud-lot-7-site`. One implementer agent per lot. PR `base` = previous lot branch.

**Order:** A (sheet) → B (motion) → C (missing HUD Forge blocks).

## Global constraints

- Repo: `/hdd/dev/chatondearu/cda`
- `modules/design-system/app/components/hud/` + colocated `*.story.vue`
- `<script setup lang="ts">` + typed Props
- Uno semantic tokens only; `lint:colors` must pass via `nix develop -c pnpm --filter @chatondearu/design-system lint:colors`
- Histoire titles: `HUD / HudName` — server at `http://localhost:6006/`
- Conventional Commits; one commit per lot preferred
- Update `modules/design-system/README.md` HUD inventory when adding components
- Do not implement later lots in the same agent run

---

## Lot 8 — Sheet responsive + layout audit

**Branch:** `feat/hud-lot-8-sheet-responsive`  
**PR base:** `feat/hud-lot-7-site`

### Goals

Fix `HudSheet` collapse / overlap on small viewports; harden stories.

### `HudSheet` requirements

1. Sheet root must have a stable minimum size:
   - default `min-h-[min(100dvh,720px)]` (or equivalent Uno) when used as overlay frame
   - accept optional `minHeightClass?: string` prop to override
2. Responsive layout:
   - **`md+`**: keep absolute corner slots (`tl`/`tr`/`bl`/`br`) + centered `center`
   - **`<md`**: stack slots in document order (`tl` → `tr` → `center` → `bl` → `br`) in a vertical flex column with gaps; no absolute overlap
3. Prevent story clipping: story wrappers use `overflow-auto` (not `overflow-hidden`) unless intentionally demoing crop
4. Corner slot wrappers: `max-w-full` + allow shrink so dense composites don’t blow horizontal layout
5. Optional prop `layout?: 'auto' | 'overlay' | 'stack'` — default `auto` (breakpoint behavior above); `overlay` forces absolute; `stack` forces column

### Also

- Update `HudSheet.story.vue` with a **Narrow** variant (constrain width ~360px) proving stack mode
- Quick pass: ensure composite stories (`HudTelemetryCluster`, `HudCornerStack`, `HudDiagPanel`) don’t rely on fixed widths that break `<md` (add `w-full max-w-*` where needed)
- No new decorative components in this lot

---

## Lot 9 — Motion system + Histoire global toggle

**Branch:** `feat/hud-lot-9-motion`  
**PR base:** `feat/hud-lot-8-sheet-responsive`

### Goals

Global HUD animation switch (on by default in Histoire), respected by animated HUD pieces; respect `prefers-reduced-motion`.

### Deliverables

1. `modules/design-system/app/composables/useHudMotion.ts`
   - Source of truth: class on `document.documentElement`: `hud-motion` (on) vs absence / `hud-motion-off` (off)
   - Persist preference in `localStorage` key `cda-hud-motion` (`'on' | 'off'`)
   - API: `{ enabled: Ref<boolean>, setEnabled(v: boolean), toggle() }`
   - When `window.matchMedia('(prefers-reduced-motion: reduce)')` matches, treat as disabled unless user explicitly forces on (document choice in composable comment: **prefer: reduced-motion always wins**)
2. CSS in `modules/design-system/app/assets/css/design-system.css`:
   - Under `:root.hud-motion` expose motion-friendly rules / keyframes for HUD
   - Under `:root:not(.hud-motion)`, `:root.hud-motion-off`, and `@media (prefers-reduced-motion: reduce)`: kill HUD animations (`animation: none`, `transition: none` on `.hud-motion-target` or similar)
3. Histoire wiring in `histoire.setup.ts`:
   - Apply stored motion preference on boot (like theme sync)
   - Inject a small persistent toggle control in the Histoire UI (floating control bottom-right of sandbox OR toolbar-adjacent button) labeled `HUD MOTION` / `MOTION OFF` — must work globally across stories
4. Animate at least these components when motion enabled (subtle, clinical — no glow):
   - `HudMeterBar` — fill width transition
   - `HudLogStream` — optional staggered fade/slide of lines (CSS only)
   - `HudScanBuffer` — subtle vertical scroll or blink cursor line
   - `HudTargetLock` — pulse border opacity when `locked`
   - `HudCrosshair` — slow rotate or breathe on `brackets`/`dot` (keep `circle` subtle)
   - `HudBarcodeStrip` — optional shimmer / scan sweep via transform
5. Story `HUD / Motion` documenting the toggle + demo strip of animated pieces
6. README note under Histoire section about the global motion toggle

---

## Lot 10 — Gauges catalog

**Branch:** `feat/hud-lot-10-gauges`  
**PR base:** `feat/hud-lot-9-motion`

| Component | Props (min) | Notes |
|-----------|-------------|-------|
| `HudRingGauge` | `value: number`, `label?: string`, `max?: number` (default 100) | Circular arc via SVG/CSS, token stroke, no glow |
| `HudSegmentedBar` | `segments: number`, `active: number`, `label?: string` | T1…Tn style cells |
| `HudDualBus` | `left: { label: string, value: string }`, `right: { label: string, value: string }` | Dual voltage/bus readout |

Stories + README. Wire `hud-motion-target` transitions if natural.

---

## Lot 11 — Signal catalog

**Branch:** `feat/hud-lot-11-signal`  
**PR base:** `feat/hud-lot-10-gauges`

| Component | Props | Notes |
|-----------|-------|-------|
| `HudWaveform` | `seed?: string`, `bars?: number` | Seeded bar/polyline waveform |
| `HudRadarRing` | `rings?: number`, `blipAngle?: number` | Concentric rings + blip |
| `HudTickLadder` | `active?: number`, `total?: number` (default 5) | Vertical/horizontal T1–T5 markers |

Use `useHudSeed` where seeding helps. Motion-aware optional sweep on radar/waveform.

---

## Lot 12 — Data readouts catalog

**Branch:** `feat/hud-lot-12-data`  
**PR base:** `feat/hud-lot-11-signal`

| Component | Props | Notes |
|-----------|-------|-------|
| `HudCoordReadout` | `x: string \| number`, `y: string \| number`, `z?: string \| number` | XYZ cluster |
| `HudAngleReadout` | `degrees: number`, `label?: string` | θ / heading-style |
| `HudPacketLoss` | `percent: number`, `label?: string` | Loss readout with tone by threshold |
| `HudPulseReadout` | `bpm: number`, `label?: string` | BPM / pulse |

---

## Lot 13 — Marks & stamps catalog

**Branch:** `feat/hud-lot-13-marks`  
**PR base:** `feat/hud-lot-12-data`

| Component | Props | Notes |
|-----------|-------|-------|
| `HudWarningPlate` | `level?: 'caution' \| 'warning' \| 'critical'`, `text: string` | Hard plate, token colors |
| `HudChecksumStamp` | `ok?: boolean`, `code?: string` | CHECKSUM VERIFIED / FAILED |
| `HudBuildStamp` | `rev?: string`, `build?: string` | REV / BUILD micro stamp |
| `HudHotZone` | `label?: string`, `active?: boolean` | HOT ZONE / RESTRICTED band |

---

## Lot 14 — Structure catalog

**Branch:** `feat/hud-lot-14-structure`  
**PR base:** `feat/hud-lot-13-marks`

| Component | Props | Notes |
|-----------|-------|-------|
| `HudNodeGraph` | `nodes: { id: string, label: string }[]`, `activeId?: string` | LINK–NODE–CORE style horizontal graph |
| `HudBracketFrame` | `variant?: 'corners' \| 'chevrons' \| 'rails'`, default slot | Frame variants beyond `HudCornerMarks` |
| `HudConduit` | `orientation?: 'h' \| 'v'`, `label?: string` | Thin data conduit line with optional label |

Optional composite story `HUD / ForgeSheetDemo` assembling gauges+signal+marks inside `HudSheet` for a dense HUD Forge–like sheet (mobile stack must still work).

---

## PR stacking table

| Lot | Branch | PR base |
|-----|--------|---------|
| 8 | `feat/hud-lot-8-sheet-responsive` | `feat/hud-lot-7-site` |
| 9 | `feat/hud-lot-9-motion` | `feat/hud-lot-8-sheet-responsive` |
| 10 | `feat/hud-lot-10-gauges` | `feat/hud-lot-9-motion` |
| 11 | `feat/hud-lot-11-signal` | `feat/hud-lot-10-gauges` |
| 12 | `feat/hud-lot-12-data` | `feat/hud-lot-11-signal` |
| 13 | `feat/hud-lot-13-marks` | `feat/hud-lot-12-data` |
| 14 | `feat/hud-lot-14-structure` | `feat/hud-lot-13-marks` |
