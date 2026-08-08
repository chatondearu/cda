# HUD Lot 0 — Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create the `Hud*` family folder, migrate four micro-graphic components out of `Ui*`, update consumers, and expose them under Histoire group `HUD / …`.

**Architecture:** Presentational Vue SFCs live in `modules/design-system/app/components/hud/`. Nuxt layer auto-import keeps the same usage as `Ui*`. Stories are colocated `*.story.vue`. App and remaining `Ui*` composites switch to `Hud*` names with no deprecated aliases.

**Tech Stack:** Nuxt 4 layer `@chatondearu/design-system`, Vue 3 `<script setup lang="ts">`, UnoCSS semantic tokens, Histoire (`story:dev` on `http://localhost:6006/`).

**Spec:** `docs/superpowers/specs/2026-08-08-hud-design-system-design.md`

## Global Constraints

- Commands run via `nix develop -c …` from repo root (NixOS / flake).
- No hardcoded colors in Vue (`#…`, `black`, `white`, raw rgb/rgba); use Uno tokens only.
- Components: composable `<script setup lang="ts">` + typed `Props` (Anthony Fu / project style).
- User-facing copy in app stays i18n; HUD primitives take string props only.
- Keep local Histoire running: `nix develop -c pnpm --filter @chatondearu/design-system story:dev` → `http://localhost:6006/`.
- Conventional Commits for each task commit.
- Do not start lots 1–7 in this plan.

---

## File map (lot 0)

| Action | Path |
|--------|------|
| Create | `modules/design-system/app/components/hud/HudNoiseLabel.vue` |
| Create | `modules/design-system/app/components/hud/HudNoiseLabel.story.vue` |
| Create | `modules/design-system/app/components/hud/HudRefCode.vue` |
| Create | `modules/design-system/app/components/hud/HudRefCode.story.vue` |
| Create | `modules/design-system/app/components/hud/HudCornerMarks.vue` |
| Create | `modules/design-system/app/components/hud/HudCornerMarks.story.vue` |
| Create | `modules/design-system/app/components/hud/HudCrosshair.vue` |
| Create | `modules/design-system/app/components/hud/HudCrosshair.story.vue` |
| Modify | `modules/design-system/app/components/ui/UiArchiveCard.vue` |
| Modify | `modules/app/app/pages/archive/[slug].vue` |
| Modify | `modules/app/app/pages/timeline.vue` |
| Modify | `modules/app/app/pages/timeline/[slug].vue` |
| Modify | `modules/app/app/pages/rx-quiet/catnip-buffer/career/[slug].vue` |
| Modify | `modules/app/app/pages/cda-lab/index.vue` |
| Modify | `modules/design-system/README.md` |
| Modify | `doc/design-system-v1.md` |
| Delete | `modules/design-system/app/components/ui/UiNoiseLabel.vue` |
| Delete | `modules/design-system/app/components/ui/UiNoiseLabel.story.vue` |
| Delete | `modules/design-system/app/components/ui/UiRefCode.vue` |
| Delete | `modules/design-system/app/components/ui/UiRefCode.story.vue` |
| Delete | `modules/design-system/app/components/ui/UiCornerMarks.vue` |
| Delete | `modules/design-system/app/components/ui/UiCornerMarks.story.vue` |
| Delete | `modules/design-system/app/components/ui/UiEmptyCrosshair.vue` |

---

### Task 1: Add `HudNoiseLabel` + story

**Files:**
- Create: `modules/design-system/app/components/hud/HudNoiseLabel.vue`
- Create: `modules/design-system/app/components/hud/HudNoiseLabel.story.vue`
- Keep (until Task 5): `modules/design-system/app/components/ui/UiNoiseLabel.vue`

**Interfaces:**
- Consumes: none
- Produces: `HudNoiseLabel` with `Props { label: string }`

- [ ] **Step 1: Create the component**

```vue
<script setup lang="ts">
interface Props {
  label: string
}

defineProps<Props>()
</script>

<template>
  <span class="text-[10px] uppercase tracking-[0.24em] text-primary/35">{{ label }}</span>
</template>
```

- [ ] **Step 2: Create the Histoire story**

```vue
<script setup lang="ts">
import HudNoiseLabel from './HudNoiseLabel.vue'

const state = reactive({
  label: 'Signal noise',
})
</script>

<template>
  <Story title="HUD / HudNoiseLabel">
    <Variant title="Default">
      <div class="bg-background p-8">
        <HudNoiseLabel :label="state.label" />
      </div>

      <template #controls>
        <HstText
          v-model="state.label"
          title="Label"
        />
      </template>
    </Variant>
  </Story>
</template>
```

- [ ] **Step 3: Verify in Histoire + lint colors**

Run:

```bash
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:6006/
nix develop -c pnpm --filter @chatondearu/design-system lint:colors
```

Expected:
- HTTP `200` (if Histoire is down, start it with `nix develop -c pnpm --filter @chatondearu/design-system story:dev`)
- Story sidebar shows `HUD / HudNoiseLabel`
- `lint:colors` exits 0

- [ ] **Step 4: Commit**

```bash
git add \
  modules/design-system/app/components/hud/HudNoiseLabel.vue \
  modules/design-system/app/components/hud/HudNoiseLabel.story.vue
git commit -m "$(cat <<'EOF'
feat(design-system): add HudNoiseLabel primitive

Start the HUD component family with the migrated noise label and Histoire story.
EOF
)"
```

---

### Task 2: Add `HudRefCode` + story

**Files:**
- Create: `modules/design-system/app/components/hud/HudRefCode.vue`
- Create: `modules/design-system/app/components/hud/HudRefCode.story.vue`

**Interfaces:**
- Consumes: none
- Produces: `HudRefCode` with `Props { code: string; tone?: 'muted' | 'emphasis' }` (default `muted`)

- [ ] **Step 1: Create the component**

```vue
<script setup lang="ts">
interface Props {
  code: string
  tone?: 'muted' | 'emphasis'
}

withDefaults(defineProps<Props>(), {
  tone: 'muted',
})
</script>

<template>
  <span
    class="font-mono text-[10px] uppercase tracking-widest"
    :class="tone === 'emphasis' ? 'text-primary' : 'text-primary/40'"
  >{{ code }}</span>
</template>
```

- [ ] **Step 2: Create the Histoire story**

```vue
<script setup lang="ts">
import HudRefCode from './HudRefCode.vue'

const state = reactive({
  code: 'REF.CDA.001',
  tone: 'muted' as 'muted' | 'emphasis',
})
</script>

<template>
  <Story title="HUD / HudRefCode">
    <Variant title="Default">
      <div class="bg-background p-8">
        <HudRefCode
          :code="state.code"
          :tone="state.tone"
        />
      </div>

      <template #controls>
        <HstText
          v-model="state.code"
          title="Code"
        />
        <HstSelect
          v-model="state.tone"
          title="Tone"
          :options="{ muted: 'muted', emphasis: 'emphasis' }"
        />
      </template>
    </Variant>
  </Story>
</template>
```

- [ ] **Step 3: Verify**

Run:

```bash
nix develop -c pnpm --filter @chatondearu/design-system lint:colors
```

Expected: exit 0; Histoire lists `HUD / HudRefCode` with muted/emphasis control.

- [ ] **Step 4: Commit**

```bash
git add \
  modules/design-system/app/components/hud/HudRefCode.vue \
  modules/design-system/app/components/hud/HudRefCode.story.vue
git commit -m "$(cat <<'EOF'
feat(design-system): add HudRefCode primitive

Migrate reference-code micro-label into the HUD family with Histoire controls.
EOF
)"
```

---

### Task 3: Add `HudCornerMarks` + story

**Files:**
- Create: `modules/design-system/app/components/hud/HudCornerMarks.vue`
- Create: `modules/design-system/app/components/hud/HudCornerMarks.story.vue`

**Interfaces:**
- Consumes: none
- Produces: `HudCornerMarks` (no props; absolute inset corner brackets for a `relative` parent)

- [ ] **Step 1: Create the component**

```vue
<template>
  <span class="pointer-events-none absolute inset-0">
    <span class="absolute left-0 top-0 h-2 w-2 border-l-2 border-t-2 border-primary" />
    <span class="absolute right-0 top-0 h-2 w-2 border-r-2 border-t-2 border-primary" />
    <span class="absolute bottom-0 left-0 h-2 w-2 border-b-2 border-l-2 border-primary" />
    <span class="absolute bottom-0 right-0 h-2 w-2 border-b-2 border-r-2 border-primary" />
  </span>
</template>
```

- [ ] **Step 2: Create the Histoire story**

```vue
<script setup lang="ts">
import HudCornerMarks from './HudCornerMarks.vue'
</script>

<template>
  <Story title="HUD / HudCornerMarks">
    <Variant title="Default">
      <div class="bg-background p-8">
        <div class="relative h-32 w-64 border border-outline_variant/20">
          <HudCornerMarks />
        </div>
      </div>
    </Variant>
  </Story>
</template>
```

- [ ] **Step 3: Verify**

Run:

```bash
nix develop -c pnpm --filter @chatondearu/design-system lint:colors
```

Expected: exit 0; story shows four corner marks on the demo box.

- [ ] **Step 4: Commit**

```bash
git add \
  modules/design-system/app/components/hud/HudCornerMarks.vue \
  modules/design-system/app/components/hud/HudCornerMarks.story.vue
git commit -m "$(cat <<'EOF'
feat(design-system): add HudCornerMarks primitive

Move priority-zone corner brackets into the HUD component family.
EOF
)"
```

---

### Task 4: Add `HudCrosshair` + story (from `UiEmptyCrosshair`)

**Files:**
- Create: `modules/design-system/app/components/hud/HudCrosshair.vue`
- Create: `modules/design-system/app/components/hud/HudCrosshair.story.vue`

**Interfaces:**
- Consumes: none
- Produces: `HudCrosshair` (no props in lot 0; lot 2 may add `variant`)

- [ ] **Step 1: Create the component**

Copy behavior from `UiEmptyCrosshair.vue` unchanged (visual parity for rename):

```vue
<template>
  <div class="flex h-full w-full items-center justify-center">
    <div class="relative h-14 w-14 rounded-full border border-primary_fixed_dim/35">
      <span class="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-primary_fixed_dim/25" />
      <span class="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-primary_fixed_dim/25" />
    </div>
  </div>
</template>
```

- [ ] **Step 2: Create the Histoire story**

```vue
<script setup lang="ts">
import HudCrosshair from './HudCrosshair.vue'
</script>

<template>
  <Story title="HUD / HudCrosshair">
    <Variant title="Default">
      <div class="bg-background p-8">
        <div class="h-40 border border-outline_variant/20">
          <HudCrosshair />
        </div>
      </div>
    </Variant>
  </Story>
</template>
```

- [ ] **Step 3: Verify**

Run:

```bash
nix develop -c pnpm --filter @chatondearu/design-system lint:colors
```

Expected: exit 0; `HUD / HudCrosshair` visible in Histoire.

- [ ] **Step 4: Commit**

```bash
git add \
  modules/design-system/app/components/hud/HudCrosshair.vue \
  modules/design-system/app/components/hud/HudCrosshair.story.vue
git commit -m "$(cat <<'EOF'
feat(design-system): add HudCrosshair primitive

Rename empty-state crosshair into the HUD family with a Histoire story.
EOF
)"
```

---

### Task 5: Retarget consumers and delete old `Ui*` files

**Files:**
- Modify: `modules/design-system/app/components/ui/UiArchiveCard.vue`
- Modify: `modules/app/app/pages/archive/[slug].vue`
- Modify: `modules/app/app/pages/timeline.vue`
- Modify: `modules/app/app/pages/timeline/[slug].vue`
- Modify: `modules/app/app/pages/rx-quiet/catnip-buffer/career/[slug].vue`
- Modify: `modules/app/app/pages/cda-lab/index.vue`
- Delete: `modules/design-system/app/components/ui/UiNoiseLabel.vue`
- Delete: `modules/design-system/app/components/ui/UiNoiseLabel.story.vue`
- Delete: `modules/design-system/app/components/ui/UiRefCode.vue`
- Delete: `modules/design-system/app/components/ui/UiRefCode.story.vue`
- Delete: `modules/design-system/app/components/ui/UiCornerMarks.vue`
- Delete: `modules/design-system/app/components/ui/UiCornerMarks.story.vue`
- Delete: `modules/design-system/app/components/ui/UiEmptyCrosshair.vue`

**Interfaces:**
- Consumes: `HudCornerMarks`, `HudRefCode`, `HudCrosshair` from Tasks 2–4
- Produces: no remaining references to `UiNoiseLabel`, `UiRefCode`, `UiCornerMarks`, `UiEmptyCrosshair` in `modules/`

- [ ] **Step 1: Update `UiArchiveCard.vue` tags**

Replace:

```vue
    <UiCornerMarks />
    <div class="mb-4 flex items-start justify-between">
      <UiRefCode :code="item.capsule" />
```

with:

```vue
    <HudCornerMarks />
    <div class="mb-4 flex items-start justify-between">
      <HudRefCode :code="item.capsule" />
```

and:

```vue
      <UiRefCode
        tone="emphasis"
        :code="`TECH: ${item.tech}`"
      />
```

with:

```vue
      <HudRefCode
        tone="emphasis"
        :code="`TECH: ${item.tech}`"
      />
```

- [ ] **Step 2: Update app pages**

In each file, replace tags:

| File | Old | New |
|------|-----|-----|
| `modules/app/app/pages/archive/[slug].vue` | `UiCornerMarks`, `UiRefCode` | `HudCornerMarks`, `HudRefCode` |
| `modules/app/app/pages/timeline.vue` | `UiCornerMarks` | `HudCornerMarks` |
| `modules/app/app/pages/timeline/[slug].vue` | `UiCornerMarks` | `HudCornerMarks` |
| `modules/app/app/pages/rx-quiet/catnip-buffer/career/[slug].vue` | `UiCornerMarks` | `HudCornerMarks` |
| `modules/app/app/pages/cda-lab/index.vue` | `UiEmptyCrosshair` | `HudCrosshair` |

Exact `cda-lab` change:

```vue
      <HudCrosshair />
```

Exact archive detail change (all three tags):

```vue
      <HudCornerMarks />
      ...
        <HudRefCode :code="currentItem.capsule" />
        <HudRefCode
          tone="emphasis"
          :code="`TECH: ${currentItem.tech}`"
        />
```

- [ ] **Step 3: Delete obsolete `Ui*` component + story files**

```bash
rm \
  modules/design-system/app/components/ui/UiNoiseLabel.vue \
  modules/design-system/app/components/ui/UiNoiseLabel.story.vue \
  modules/design-system/app/components/ui/UiRefCode.vue \
  modules/design-system/app/components/ui/UiRefCode.story.vue \
  modules/design-system/app/components/ui/UiCornerMarks.vue \
  modules/design-system/app/components/ui/UiCornerMarks.story.vue \
  modules/design-system/app/components/ui/UiEmptyCrosshair.vue
```

- [ ] **Step 4: Grep for leftovers**

Run:

```bash
rg -n 'UiNoiseLabel|UiRefCode|UiCornerMarks|UiEmptyCrosshair' modules --glob '*.{vue,ts}'
```

Expected: no matches under `modules/` (docs under `docs/` / `doc/` updated in Task 6 may still mention old names until then).

- [ ] **Step 5: Typecheck + lint**

Run:

```bash
nix develop -c pnpm --filter @chatondearu/design-system lint:colors
nix develop -c pnpm --filter @chatondearu/app typecheck
```

Expected: both exit 0.

- [ ] **Step 6: Verify Histoire**

Confirm sidebar:
- Present: `HUD / HudNoiseLabel`, `HUD / HudRefCode`, `HUD / HudCornerMarks`, `HUD / HudCrosshair`
- Absent: `Foundations / UiNoiseLabel`, `Foundations / UiRefCode`, `Foundations / UiCornerMarks`

- [ ] **Step 7: Commit**

```bash
git add -A modules/design-system/app/components modules/app/app/pages
git commit -m "$(cat <<'EOF'
refactor(design-system): switch consumers to Hud* primitives

Retarget app pages and UiArchiveCard, then remove migrated Ui* micro-components.
EOF
)"
```

---

### Task 6: Update design-system docs inventory

**Files:**
- Modify: `modules/design-system/README.md`
- Modify: `doc/design-system-v1.md`

**Interfaces:**
- Consumes: final `Hud*` names from Tasks 1–4
- Produces: docs that list HUD inventory separately from UI

- [ ] **Step 1: Update README inventory section**

Replace the V1 inventory block with:

```markdown
## V1 Component Inventory

- Foundations: `UiPageFrame`, `UiSectionHeader`, `UiDotGridOverlay`
- HUD (micro-graphics): `HudNoiseLabel`, `HudRefCode`, `HudCornerMarks`, `HudCrosshair`
- Actions and Inputs: `UiButton`, `UiCommandInput`, `UiStatusChip`
- Navigation: `UiTopBar`, `UiSideNav`, `UiMobileDockNav`, `UiFooterLinks`
- Content Modules: `UiHeroCommand`, `UiTimeline`, `UiTimelineItem`, `UiArchiveCard`, `UiCassetteDeck`, `UiProgressReadout`
- Overlay and Feedback: `UiGlassDiagnosticPanel`, `UiSystemBadge`
```

Also extend Structure bullet:

```markdown
- `app/components/ui/*`: application UI components.
- `app/components/hud/*`: micro-graphic HUD primitives (decorative density).
```

- [ ] **Step 2: Update `doc/design-system-v1.md`**

Move the four entries out of foundations/overlay into a HUD section:

```markdown
### HUD

- `HudRefCode`: mono micro-label for references.
- `HudNoiseLabel`: non-critical metadata traces.
- `HudCornerMarks`: module corner markers for priority zones.
- `HudCrosshair`: empty-state target marker.
```

Remove the old `UiRefCode` / `UiNoiseLabel` / `UiCornerMarks` / `UiEmptyCrosshair` bullets.

- [ ] **Step 3: Commit**

```bash
git add modules/design-system/README.md doc/design-system-v1.md
git commit -m "$(cat <<'EOF'
docs(design-system): document Hud* inventory after lot 0 migration

Keep README and v1 docs aligned with the HUD component family split.
EOF
)"
```

---

## Lot 0 done checklist

- [ ] `modules/design-system/app/components/hud/` has 4 components + 4 stories
- [ ] No `UiNoiseLabel|UiRefCode|UiCornerMarks|UiEmptyCrosshair` under `modules/**/*.{vue,ts}`
- [ ] Histoire serves four `HUD /` stories at `http://localhost:6006/`
- [ ] `lint:colors` and app `typecheck` pass

## Follow-up plans (not in this file)

After lot 0 merges/lands, write separate plans:

1. `2026-08-08-hud-lot-1-readouts.md` — `HudStatusLine`, `HudLogStream`, `HudMeterBar`, `HudCodeReadout`
2. `2026-08-08-hud-lot-2-spatial.md` — crosshair variants, `HudCompass`, `HudReticle`, `HudTargetLock`
3. `2026-08-08-hud-lot-3-identity.md` — `HudBadge`, `HudSerialBlock`, `HudAccessBanner`, `HudOrgLabel`
4. `2026-08-08-hud-lot-4-noise.md` — `HudAsciiBlock`, `HudScanBuffer`, `HudBarcodeStrip`
5. Lots 5–7 — composites, sheet, site décor (sequential)

Lots 1–4 can run as parallel agents once lot 0 is complete.
