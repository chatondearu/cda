# HUD component family — Design Spec

Date: 2026-08-08  
Status: approved (conversation) — pending implementation  
Inspiration: [HUD Forge](https://hudforge.net/) (micro-graphic blocks / sheets / builder vocabulary)  
Branch base: `dev` (Histoire playground already present)

## Goal

Add an intentional **HUD** section to `@chatondearu/design-system`:

1. Reusable Vue components (`Hud*`) for dense clinical / micro-graphic UI.
2. Decorative density on the site via those components (not ad-hoc markup).
3. Full Histoire coverage (`HUD / …` stories), verified against a local `story:dev` instance while building.

## Non-goals

- Cloning HUD Forge’s Generator / Studio / motion-tracking tools.
- Shipping ~144 static SVG blocks as the primary API.
- A separate npm package for HUD (kept inside `modules/design-system`).
- Soft neon glows or untokenized colors.
- Site-wide redesign in the first implementation lots (site wiring is a late sub-project).

## Decisions

| Topic | Choice |
|-------|--------|
| Architecture | `Hud*` family inside `@chatondearu/design-system` |
| Path | `modules/design-system/app/components/hud/` |
| Visual intent | Dense HUD Forge–like micro-graphics, **as named DS components** |
| Tokens | Same Logical Machine CSS vars + Uno semantic utilities |
| Existing micro UI | Migrate micro-elements from `Ui*` → `Hud*` |
| Playground | Histoire groups: `HUD / <Name>` |
| Delivery | Multiple sub-projects; parallel agents **after** foundation (lot 0) |
| Verification | Local Histoire (`http://localhost:6006`) kept running during implementation |

## Relationship to DESIGN.md

`design-system/DESIGN.md` “no decorative fluff / no soft glows” remains the guardrail against **uncontrolled** generative UI (e.g. Stitch dumps).

It does **not** forbid a deliberate decorative family. New decorative pieces must be:

- Named `Hud*` components in the design-system package
- Token-only styling (`lint:colors`)
- Documented with Histoire stories

## Architecture

```text
modules/design-system/
  app/components/
    ui/          # Application UI (buttons, nav, cards, inputs…)
    hud/         # Micro-graphic / decorative HUD primitives & composites
  *.story.vue    # Colocated next to each component
```

### Naming

- Prefix: `Hud` + PascalCase purpose (`HudCornerMarks`, `HudStatusLine`, …).
- Nuxt auto-import via layer `components/` (same as `Ui*`).
- Histoire title pattern: `HUD / HudCornerMarks`.

### Props & style contract

- `<script setup lang="ts">` + typed `Props` (`defineProps<Props>()`).
- Uno semantic tokens only; no hardcoded colors.
- Prefer presentational props (`label`, `value`, `status`, `seed`) over fetching data.
- Optional `seed` / mock helpers for generative-looking noise (deterministic when seeded).
- Composables for shared fake telemetry live under `app/composables/` (e.g. `useHudNoise.ts`) only when reused by 2+ components.

### Composition layers

1. **Primitives** — single-purpose glyphs / labels / marks.
2. **Blocks** — small composed readouts (status line, log stream, compass).
3. **Composites** — drop-in panels assembling several blocks.
4. **Sheet** — full-frame / overlay container positioning composites (site or demo use).

## Migration (`Ui*` → `Hud*`)

### Move to `hud/` (lot 0)

| From | To |
|------|----|
| `UiNoiseLabel` | `HudNoiseLabel` |
| `UiRefCode` | `HudRefCode` |
| `UiCornerMarks` | `HudCornerMarks` |
| `UiEmptyCrosshair` | `HudCrosshair` (rename clarifies variants later) |

### Stay in `ui/` (application / status chrome)

- `UiStatusChip`, `UiSystemBadge`, `UiProgressReadout` — keep for now; HUD-specific variants may appear later under `Hud*` if the visual language diverges.
- Foundations that are layout chrome (`UiPageFrame`, `UiDotGridOverlay`, `UiSectionHeader`) stay `Ui*`.

### App update

Update call sites under `modules/app` that use migrated components (`UiCornerMarks`, `UiRefCode`, `UiEmptyCrosshair`, …) to `Hud*`.

No long-lived deprecated aliases unless a consumer outside this monorepo appears (none today).

## Sub-projects

| Lot | Name | Deliverables | Depends on |
|-----|------|--------------|------------|
| **0** | Foundation | `hud/` folder, migrate 4 components + stories, README inventory, Histoire group convention | — |
| **1** | Readouts | `HudStatusLine`, `HudLogStream` (`T+000`), `HudMeterBar`, `HudCodeReadout` + stories | 0 |
| **2** | Spatial | `HudCrosshair` variants, `HudCompass`, `HudReticle`, `HudTargetLock` + stories | 0 |
| **3** | Identity | `HudBadge`, `HudSerialBlock`, `HudAccessBanner`, `HudOrgLabel` + stories | 0 |
| **4** | Noise | `HudAsciiBlock`, `HudScanBuffer`, `HudBarcodeStrip` + stories | 0 |
| **5** | Composites | 3–5 panels (e.g. `HudTelemetryCluster`, `HudCornerStack`, `HudDiagPanel`) composing 1–4 | 1–4 |
| **6** | Sheet | `HudSheet` / overlay frame for composing panels | 5 |
| **7** | Site décor | Wire selected HUD pieces into `@chatondearu/app` pages for density | 0+ (prefer after 5) |

Lots **1–4** may run as parallel agents after lot 0 lands.  
Lots **5–7** stay sequential relative to their dependencies.

### Agent rules (when dispatching)

- One agent per lot (or per component family inside a lot if files do not collide).
- Must add colocated `*.story.vue` with useful variants + Histoire controls.
- Must not introduce hardcoded colors; run `pnpm --filter @chatondearu/design-system lint:colors`.
- Must verify visually against local Histoire at `http://localhost:6006/`.
- Must not rewrite unrelated `Ui*` application components.

## Histoire workflow

- Dev command: `nix develop -c pnpm --filter @chatondearu/design-system story:dev`
- Default URL: `http://localhost:6006/`
- Keep instance running during HUD implementation; HMR should pick up new `*.story.vue` files.
- Theme: existing Histoire dark/light sync to `html.dark` / `html.light`.

## Catalog vocabulary (HUD Forge → CDA)

Map of inspiration → intended components (not a 1:1 port of every block):

| HUD Forge vibe | CDA component(s) |
|----------------|------------------|
| Corner brackets / frame marks | `HudCornerMarks` |
| REF / SN / badge codes | `HudRefCode`, `HudSerialBlock`, `HudBadge` |
| Micro labels / multilingual noise | `HudNoiseLabel`, `HudAsciiBlock` |
| Crosshair / lock-on | `HudCrosshair`, `HudReticle`, `HudTargetLock` |
| Power / capacity / sync meters | `HudMeterBar` |
| Status lines / access banners | `HudStatusLine`, `HudAccessBanner` |
| Timed log (`T+000 …`) | `HudLogStream` |
| Compass NESW | `HudCompass` |
| Dense sheet layout | `HudSheet` + composites |

## Error handling & SSR

- Components are presentational; no network I/O.
- Avoid `window` / `document` except inside `onMounted` (or use Nuxt-safe APIs) for any animated / random noise.
- Seeded randomness must be deterministic on SSR when `seed` is provided (same markup client/server).

## Testing / verification

1. Histoire lists new stories under `HUD / …`.
2. Dark/light toggle keeps tokens correct.
3. `nix develop -c pnpm --filter @chatondearu/design-system lint:colors` passes.
4. `nix develop -c pnpm --filter @chatondearu/app typecheck` passes after migrations.
5. Spot-check migrated pages that previously used `UiCornerMarks` / `UiRefCode` / `UiEmptyCrosshair`.

## Success criteria

- Clear split: `Ui*` = app chrome / interaction; `Hud*` = micro-graphic density.
- At least lot 0 + one block lot (1–4) shipped with stories before site décor (lot 7).
- No hardcoded color regressions.
- Designers/devs can browse and compose HUD pieces in Histoire without opening the main app.

## Out of scope follow-ups

- Generative “roll a sheet” seed explorer UI (could be a future Histoire story or internal tool).
- Video motion tracking / MediaPipe studio.
- Export to SVG / After Effects JSX.
