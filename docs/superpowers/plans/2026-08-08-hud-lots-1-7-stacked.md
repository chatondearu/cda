# HUD Lots 1–7 — Stacked delivery brief

> One implementer agent per lot. Each lot = feature branch stacked on the previous lot branch + PR (`base` = previous branch). Base of stack: `feat/hud-lot-0-foundation` → `dev`.

**Spec:** `docs/superpowers/specs/2026-08-08-hud-design-system-design.md`

## Global constraints (every lot)

- Work in `/hdd/dev/chatondearu/cda` on the lot’s feature branch.
- Components: `modules/design-system/app/components/hud/Hud*.vue` + colocated `Hud*.story.vue`.
- `<script setup lang="ts">` + typed `Props`; Anthony Fu / project style.
- Uno semantic tokens only; no hardcoded colors.
- Histoire titles: `HUD / HudName`.
- Commands: `nix develop -c pnpm --filter @chatondearu/design-system lint:colors` (must pass).
- Histoire: `http://localhost:6006/` (keep running).
- Conventional Commits; prefer **one commit per lot** (or few logical commits).
- Update `modules/design-system/README.md` HUD inventory line for new components.
- Do not touch unrelated `Ui*` app chrome. Do not implement later lots.
- Presentational only; seeded helpers must be SSR-deterministic when `seed` is set.

---

## Lot 1 — Readouts (`feat/hud-lot-1-readouts`, base: `feat/hud-lot-0-foundation`)

| Component | Props | Behavior |
|-----------|-------|----------|
| `HudStatusLine` | `label: string`, `status?: 'active' \| 'standby' \| 'offline' \| 'pending' \| 'locked'` (default `active`) | One line: `STATUS > {STATUS}` style uppercase micro text; status token colors via primary/error/secondary opacities |
| `HudLogStream` | `entries: string[]` OR `lines?: { t: string, message: string }[]` | Prefer `lines` with `{ t: string, message: string }[]`; render `T+{t} {message}` stacked, mono `text-[10px] text-primary/50` |
| `HudMeterBar` | `label: string`, `value: string`, `progress: number` | Compact meter (similar density to progress readout but thinner HUD chrome): label/value row + bar `bg-primary` fill clamped 0–100 |
| `HudCodeReadout` | `code: string`, `prefix?: string` (default `'0X'`) | Shows hex/code style `PREFIX+CODE` mono muted |

Stories: controls for key props; demo defaults that look dense/clinical.

---

## Lot 2 — Spatial (`feat/hud-lot-2-spatial`, base: lot 1)

| Component | Props | Behavior |
|-----------|-------|----------|
| `HudCrosshair` | add optional `variant?: 'circle' \| 'brackets' \| 'dot'` (default `circle` = current look) | Keep default identical to lot 0; add 2 alternate geometries, still token borders |
| `HudCompass` | `heading: number` (0–359), `label?: string` | NESW ticks + numeric heading degrees |
| `HudReticle` | `size?: 'sm' \| 'md'` (default `md`) | Square reticle with center gap (no soft glow) |
| `HudTargetLock` | `locked?: boolean` (default `false`), `label?: string` | Frame + LOCK ON / ACQUIRING text |

Update existing `HudCrosshair.story.vue` with variant control.

---

## Lot 3 — Identity (`feat/hud-lot-3-identity`, base: lot 2)

| Component | Props | Behavior |
|-----------|-------|----------|
| `HudBadge` | `id: string`, `label?: string` | `BADGE {id}` micro block |
| `HudSerialBlock` | `serial: string`, `caption?: string` | `SN {serial}` mono block |
| `HudAccessBanner` | `granted: boolean`, `detail?: string` | ACCESS GRANTED / DENIED banner strip |
| `HudOrgLabel` | `name: string`, `meta?: string` | Org/division uppercase label + optional meta |

---

## Lot 4 — Noise (`feat/hud-lot-4-noise`, base: lot 3)

| Component | Props | Behavior |
|-----------|-------|----------|
| `HudAsciiBlock` | `seed?: string`, `rows?: number` (default 4), `cols?: number` (default 24) | Deterministic ASCII/block noise from seed (same SSR/client) |
| `HudScanBuffer` | `lines: string[]` | Scroll-looking buffer of system lines (static list, no window) |
| `HudBarcodeStrip` | `seed?: string`, `bars?: number` (default 32) | Vertical bar strip from seeded widths; mono “barcode” vibe |

Add tiny `useHudSeed` or local pure functions in each file if shared logic is small — prefer a single `modules/design-system/app/composables/useHudSeed.ts` exporting `hashSeed(seed: string): number` and `seededUnit(n: number, i: number): number` if reused by 2+ components.

---

## Lot 5 — Composites (`feat/hud-lot-5-composites`, base: lot 4)

Build **3** panels that compose existing Hud* primitives (import relative or rely on auto-import):

1. `HudTelemetryCluster` — meter + status line + code readout
2. `HudCornerStack` — relative frame with `HudCornerMarks` + org label + serial
3. `HudDiagPanel` — access banner + log stream + optional ascii block

Props: accept the nested data needed (typed interfaces). Stories show realistic dense demos.

---

## Lot 6 — Sheet (`feat/hud-lot-6-sheet`, base: lot 5)

| Component | Props | Behavior |
|-----------|-------|----------|
| `HudSheet` | slots: `default`, optional named `tl`/`tr`/`bl`/`br`/`center`; `label?: string` | Full-frame relative overlay container (`absolute inset-0` or `min-h` demo), positions corner slots + center; optional sheet label |

Story: dark void with composites in corners.

---

## Lot 7 — Site décor (`feat/hud-lot-7-site`, base: lot 6)

Wire **light** decorative usage into `@chatondearu/app` on 1–2 existing pages (e.g. `cda-lab/index.vue` empty state, `system/diag.vue`) using Hud composites/primitives. Keep i18n for user-facing copy; HUD noise strings can be props literals. Do not redesign whole pages.

---

## PR stacking

| Lot | Branch | PR base |
|-----|--------|---------|
| 0 | `feat/hud-lot-0-foundation` | `dev` |
| 1 | `feat/hud-lot-1-readouts` | `feat/hud-lot-0-foundation` |
| 2 | `feat/hud-lot-2-spatial` | `feat/hud-lot-1-readouts` |
| 3 | `feat/hud-lot-3-identity` | `feat/hud-lot-2-spatial` |
| 4 | `feat/hud-lot-4-noise` | `feat/hud-lot-3-identity` |
| 5 | `feat/hud-lot-5-composites` | `feat/hud-lot-4-noise` |
| 6 | `feat/hud-lot-6-sheet` | `feat/hud-lot-5-composites` |
| 7 | `feat/hud-lot-7-site` | `feat/hud-lot-6-sheet` |
