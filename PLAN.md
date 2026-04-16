# PROJECT SPECIFICATION & EXECUTION PLAN (`PLAN.md`)

## 1. PROJECT OVERVIEW
Build a developer showcase website acting as a personal "Lab" and archive. The core philosophy is to highlight a "tinkerer" (touche-à-tout) profile where unfinished side-projects are presented as technical experiments rather than failures. 

## 2. AESTHETIC & VIBE
* **Theme:** Cassette Futurism / 90s Retro-tech.
* **Inspirations:** Ghost in the Shell, Cowboy Bebop, Alien (retro-sci-fi).
* **UI Characteristics:** Deep space/obsidian backgrounds, bright neon accents (terminal green, amber, cyan), hard borders, CRT scanline overlays, monospace typography for UI elements, and a stylized "spaceship console" feel.
* **Easter Egg:** A hidden or lateral retro Walkman audio player interface.

## 3. TECH STACK & ARCHITECTURE
* **Framework:** Nuxt (Strictly Nuxt 4 Compatibility Mode).
* **Styling:** UnoCSS.
* **Content Management:** Nuxt Content v2 (ready for Nuxt Studio).
* **Directory Structure:** Must use the Nuxt 4 `app/` directory structure for all frontend logic.

```text
/
├── app/
│   ├── assets/
│   │   └── css/global.css
│   ├── components/
│   │   ├── layout/
│   │   └── ui/
│   ├── layouts/
│   │   └── default.vue
│   ├── pages/
│   │   ├── index.vue
│   │   ├── about.vue
│   │   └── lab/
│   │       ├── index.vue
│   │       └── [...slug].vue
│   └── app.vue
├── content/
│   ├── lab/
│   └── about.md
├── public/
├── nuxt.config.ts
├── uno.config.ts
└── PLAN.md
```

## 4. DESIGN SYSTEM (UnoCSS)
* **Fonts:** `VT323` (Monospace for UI/Headers), `Inter` (Sans-serif for reading text).
* **Colors:** * Space Black: `#0a0a0b`
    * Retro Green: `#00ff41`
    * Retro Amber: `#ffb000`
    * Retro Cyan: `#00f3ff`
* **Custom Utilities:** Need shortcuts for `terminal-window` (hard borders, neon glow) and `crt-scanlines` (subtle background pattern).

## 5. CONTENT SCHEMA (Nuxt Content)
Files in `/content/lab/` must follow this markdown frontmatter structure to allow Nuxt Studio editing:

```yaml
title: 'PROJECT_NAME'
description: 'Short objective or experiment goal.'
status: 'INCOMPLETE' # Options: ARCHIVED, INCOMPLETE, ACTIVE
tech_stack: ['Tech1', 'Tech2']
date: 'YYYY-MM-DD'
```

---

## AGENT TODO LIST (STRICT EXECUTION ORDER)

### Phase 1: Core Setup
* Initialize Nuxt project and enforce `compatibilityVersion: 4` in `nuxt.config.ts`.
* Install and configure `@nuxt/content`, `@unocss/nuxt`, and `@nuxt/studio` modules.
* Create the Nuxt 4 `app/` directory and move `app.vue` inside it.
* Configure `uno.config.ts` with the Google fonts (`VT323`, `Inter`) and the custom color palette mentioned in section 4.

### Phase 2: Layout & Global Styling
* Create `app/assets/css/global.css` to apply the dark `#0a0a0b` background globally and add a CSS-only CRT scanline overlay effect.
* Create `app/layouts/default.vue` containing a retro spaceship console navigation bar (Tabs: LOGS, THE LAB, CONTACT).
* Ensure the layout wraps all pages with a terminal-like container.

### Phase 3: Page Routing & UI Components
* Create `app/pages/index.vue` with a typewriter animation effect for the introduction text: "WELCOME TO THE LAB... INITIALIZING...".
* Create `app/components/ui/TerminalWindow.vue` as a slot-based wrapper with glowing borders to display content blocks.
* Create `app/pages/about.vue` to display a raw, data-driven timeline of experiences.

### Phase 4: Nuxt Content Integration (The Lab)
* Create `content/lab/01-test-signal.md` using the exact YAML frontmatter from Section 5.
* Create `app/pages/lab/index.vue` to fetch and list all markdown files from `/content/lab`, styling them as data folders or capsules showing their `status` and `tech_stack`.
* Create `app/pages/lab/[...slug].vue` to render the individual markdown content using `<ContentDoc />`.

### Phase 5: The Easter Egg
* Create `app/components/ui/RetroWalkman.vue`.
* Build a visual-only UI (for now) of a neon cassette player with Play/Stop buttons.
* Dock this component to the bottom-right or side panel of `default.vue`.