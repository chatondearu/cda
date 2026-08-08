# Histoire + rename design-system Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rename `@chatondearu/design-system-nuxt` to `@chatondearu/design-system` and host Histoire stories for foundations + actions with dark/light sync.

**Architecture:** Histoire runs inside the Nuxt layer package with `@histoire/plugin-nuxt`. Theme toolbar syncs `html.dark` / `html.light`. A Histoire-only stub provides `useLocalePath` so `UiButton` stories work without `@nuxtjs/i18n`.

**Tech Stack:** Nuxt 4 layer, Histoire, `@histoire/plugin-vue`, `@histoire/plugin-nuxt`, UnoCSS, pnpm workspace

## Global Constraints

- Package name: `@chatondearu/design-system`
- Folder: `modules/design-system` (do not touch root `design-system/` docs)
- Theme: sync Histoire color scheme to both `dark` and `light` classes on `document.documentElement`
- No hardcoded colors in Vue components (existing lint rule)
- Run Node/pnpm via `nix develop -c …`
- Story lot: UiPageFrame, UiSectionHeader, UiRefCode, UiNoiseLabel, UiCornerMarks, UiDotGridOverlay, UiButton, UiCommandInput, UiStatusChip

---

### Task 1: Rename module + update references

**Files:**
- Rename: `modules/design-system-nuxt/` → `modules/design-system/`
- Modify: `modules/design-system/package.json` (name)
- Modify: `modules/design-system/README.md`
- Modify: `modules/app/package.json`, `modules/app/nuxt.config.ts`, `modules/app/uno.config.ts`
- Modify: `modules/app/app/composables/useArchiveContent.ts`, `useCareerTimeline.ts`, `useStreamerTimeline.ts`
- Modify: `modules/app/app/utils/careerPdf.ts`
- Modify: root `package.json`, `AGENTS.md`, `design-system/DESIGN-LIGHT.md`
- Regenerate: `pnpm-lock.yaml` via install

**Interfaces:**
- Produces: workspace package `@chatondearu/design-system` at `modules/design-system`

- [ ] **Step 1: Rename directory and package name**

```bash
git mv modules/design-system-nuxt modules/design-system
```

Set `"name": "@chatondearu/design-system"` in `modules/design-system/package.json`. Update README titles/filters/`extends` path.

- [ ] **Step 2: Update all consumers**

Replace `design-system-nuxt` → `design-system` and `@chatondearu/design-system-nuxt` → `@chatondearu/design-system` in listed files. Add root script `"story:dev": "pnpm --filter @chatondearu/design-system story:dev"` (story scripts added in Task 2; placeholder OK if missing until Task 2).

- [ ] **Step 3: Install and verify app still resolves**

```bash
nix develop -c pnpm install
nix develop -c pnpm --filter @chatondearu/app typecheck
```

Expected: typecheck passes (or only pre-existing unrelated errors).

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "refactor(design-system): rename design-system-nuxt to design-system"
```

---

### Task 2: Histoire scaffold + theme sync + locale stub

**Files:**
- Create: `modules/design-system/histoire.config.ts`
- Create: `modules/design-system/histoire.setup.ts`
- Create: `modules/design-system/modules/histoire-stubs/index.ts` (Nuxt module, HISTOIRE-only)
- Modify: `modules/design-system/nuxt.config.ts` (register stub module when `process.env.HISTOIRE`)
- Modify: `modules/design-system/package.json` (deps + story scripts)

**Interfaces:**
- Consumes: existing `nuxt.config.ts`, `useThemeMode` class contract
- Produces: `story:dev` runnable; `useLocalePath(): (path: string) => string` under Histoire

- [ ] **Step 1: Add dependencies and scripts**

Match Nuxt/Vue versions from `modules/app/package.json`. Add:

```json
"scripts": {
  "story:dev": "histoire dev",
  "story:build": "histoire build",
  "story:preview": "histoire preview"
},
"devDependencies": {
  "@histoire/plugin-nuxt": "...",
  "@histoire/plugin-vue": "...",
  "histoire": "...",
  "nuxt": "<same as app>",
  "vue": "<same as app>"
}
```

- [ ] **Step 2: Add histoire.config.ts**

```ts
import { HstNuxt } from '@histoire/plugin-nuxt'
import { HstVue } from '@histoire/plugin-vue'
import { defineConfig } from 'histoire'

export default defineConfig({
  plugins: [HstVue(), HstNuxt()],
  setupFile: '/histoire.setup.ts',
  theme: {
    title: 'CDA Design System',
    defaultColorScheme: 'dark',
    storeColorScheme: true,
  },
})
```

- [ ] **Step 3: Add histoire.setup.ts theme sync**

Use `defineSetupVue3` from `@histoire/plugin-vue` and `isDark` from `histoire/client` (or MutationObserver / poll on `document.documentElement.classList` for Histoire’s `dark` class). Apply:

- dark → `classList.add('dark'); classList.remove('light')`
- light → `classList.add('light'); classList.remove('dark')`

Also ensure CSS from the layer is loaded (HstNuxt should pull `nuxt.config` css; verify).

- [ ] **Step 4: HISTOIRE-only useLocalePath stub**

Nuxt module registered only when `process.env.HISTOIRE` is truthy; adds auto-import composable returning identity path mapper. Must not override app i18n when running `@chatondearu/app`.

- [ ] **Step 5: Install and smoke-run**

```bash
nix develop -c pnpm install
nix develop -c pnpm --filter @chatondearu/design-system story:dev
```

Expected: Histoire boots (even with zero stories).

- [ ] **Step 6: Commit**

```bash
git commit -m "feat(design-system): scaffold Histoire with theme sync"
```

---

### Task 3: Stories for foundations + actions

**Files:**
- Create: `modules/design-system/app/components/ui/UiPageFrame.story.vue`
- Create: `modules/design-system/app/components/ui/UiSectionHeader.story.vue`
- Create: `modules/design-system/app/components/ui/UiRefCode.story.vue`
- Create: `modules/design-system/app/components/ui/UiNoiseLabel.story.vue`
- Create: `modules/design-system/app/components/ui/UiCornerMarks.story.vue`
- Create: `modules/design-system/app/components/ui/UiDotGridOverlay.story.vue`
- Create: `modules/design-system/app/components/ui/UiButton.story.vue`
- Create: `modules/design-system/app/components/ui/UiCommandInput.story.vue`
- Create: `modules/design-system/app/components/ui/UiStatusChip.story.vue`

**Interfaces:**
- Consumes: existing UI components and their props
- Produces: 9 browsable stories under `Foundations / …` and `Actions / …`

- [ ] **Step 1: Write foundation stories** with titles `Foundations / <Name>`, minimal variants + controls where props exist
- [ ] **Step 2: Write action stories** including `UiButton` button + link variants and `HstSelect` for `variant`
- [ ] **Step 3: Verify in Histoire** all 9 appear; toggle dark/light updates tokens
- [ ] **Step 4: Commit**

```bash
git commit -m "feat(design-system): add Histoire stories for foundations and actions"
```

---

### Task 4: Final verification + docs polish

**Files:**
- Modify: `modules/design-system/README.md` (Histoire section)
- Modify: root `package.json` `story:dev` if not already present

- [ ] **Step 1: Run verification checklist from spec**
- [ ] **Step 2: Update README with story commands**
- [ ] **Step 3: Commit docs if needed**

```bash
git commit -m "docs(design-system): document Histoire story commands"
```
