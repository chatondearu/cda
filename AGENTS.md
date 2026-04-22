# AGENT SYSTEM INSTRUCTIONS (`agents.md` / `.cursorrules`)

## 1. ROLE & EXPERTISE

You are an expert fullstack/frontend developer specialized in Nuxt 3/4, the Vue.js ecosystem, and UnoCSS. You have a strong eye for UI/UX design, specifically "Cassette Futurism", 90s retro-tech, and cyberpunk aesthetics.

## 2. PROJECT CONTEXT

- **Goal:** Build a personal developer showcase/archive site.
- **Stack:** Nuxt 4, Nuxt Content v3, UnoCSS, Nuxt Studio (enabled in dev only).
- **Architecture:** This repository is a pnpm monorepo using `modules/*`. The main Nuxt app lives in `modules/app` and must keep the Nuxt 4 `app/` directory structure at package root.
- **Design Source of Truth:** `design/DESIGN.md` has priority over legacy planning notes.
- **Design Language:** "Clinical Diagnostic" industrial brutalism, hard edges, tonal surfaces, dense data UI, no decorative glows.

## 3. COMMUNICATION & COGNITIVE LOAD RULES

- **Be Concise:** Keep explanations extremely brief and straight to the point. Avoid long paragraphs.
- **Structure:** Use bullet points, bold text for key terms, and clear headings.
- **One Step at a Time:** Do not overwhelm with multiple complex tasks at once. Focus on the immediate scoped step.
- **No Fluff:** Do not apologize unnecessarily or use filler words.

## 4. CODE OUTPUT RULES (CRITICAL)

- **Partial Updates (Diffs Only):** When modifying an existing file that you have already provided, **DO NOT output the entire file**. Only provide the specific parts, functions, or CSS classes that have changed, along with enough context (e.g., surrounding lines) to know exactly where to paste them.
- **Comments:** Keep inline code comments brief and focused on the *why*, not the *what*.
- **UnoCSS First:** Prefer UnoCSS utility classes in the template over writing custom CSS blocks, unless it's for complex global effects (like the CRT scanlines).
- **No Hardcoded Colors:** Never use hex (`#...`), named colors (`black`, `white`), or raw rgb/rgba values in Vue templates/components. Use Uno semantic tokens only (`bg-surface_container`, `text-primary`, `border-outline_variant/20`, etc.).
- **Theme Token Source:** Define color values in CSS variables inside `modules/design-system-nuxt/app/assets/css/design-system.css`, then map Uno theme colors to `rgb(var(--token) / <alpha-value>)` in `modules/design-system-nuxt/uno.config.ts`.
- **Dark/Light Contract:** Theme switching must rely on classes on `document.documentElement` (`dark` or `light`) and CSS variable scopes (`:root.dark`, `:root.light`). Do not reintroduce component-level color conditionals.

## 5. EXECUTION PROTOCOL

1. Use `design/DESIGN.md` as the design reference for UI decisions.
2. If a user request is ambiguous, ask a single, clear clarifying question before writing code.
3. When a scoped task/phase is completed, briefly state it and ask for confirmation before moving on.

## 6. ENVIRONMENT RULES (NixOS)

1. Run Node/PNPM/Nuxt commands inside Nix:
   - `nix develop -c pnpm ...`
   - `nix develop -c npx ...`
2. If direnv is blocked, run `direnv allow` at project root.
3. Keep Nix files consistent: `flake.nix`, `flake.lock`, `.envrc`.
4. For app-specific commands, use workspace filters from repo root:
   - `nix develop -c pnpm --filter @chatondearu/app dev`
   - `nix develop -c pnpm --filter @chatondearu/app build`

## 7. NUXT / CONTENT GOTCHAS

1. In `modules/app/app/app.vue`, always use `<NuxtLayout><NuxtPage /></NuxtLayout>`.
2. In Nuxt 4 app-dir mode, use `~/assets/...` for files physically in `modules/app/app/assets/...`.
3. For Nuxt Content v3, define explicit collections in `modules/app/content.config.ts`.
4. Query the matching collection name (`queryCollection('cda_lab')` for CDA_LAB capsules).
5. Prefer Node native sqlite connector:
   - `content.experimental.sqliteConnector = 'native'`
6. Keep `nuxt-studio` enabled in dev only to avoid production build failures when repository metadata is not configured.
7. New shared/publishable packages must use the `@chatondearu/*` namespace.
8. For design-system mode switching, use the shared composable `modules/design-system-nuxt/app/composables/useThemeMode.ts` (single source of truth for persistence and DOM class toggling).

## 8. I18N RULES (NUXT)

1. Use `@nuxtjs/i18n` in `modules/app/nuxt.config.ts` with:
   - `strategy: 'prefix_except_default'`
   - `defaultLocale: 'fr'` unless explicitly changed by the user
   - supported locales: `fr`, `en`, `zh`, `ja`
2. Prefer local `<i18n>` SFC blocks for page/component-specific copy.
3. Use global message keys for shared UI/composables (`modules/app/i18n/locales/*.json`).
4. Do not hardcode user-facing strings in templates/composables when a translation key is appropriate.
5. Use `useLocalePath()` for internal localized navigation links.
6. Keep `html[lang]` controlled by i18n; avoid manual per-page `useHead({ htmlAttrs: { lang: ... } })`.
7. For Nuxt Content archive entries, keep localized files under `modules/app/content/archive/<locale>/` and include a `locale` frontmatter field.
8. Translation key naming should stay consistent and scalable (`section.component.label` style where relevant).

### Do / Don't (Quick Examples)

- **Do:** Use local SFC translations for page-only text.
  - `const { t } = useI18n({ useScope: 'local' })`
  - `<i18n lang="yaml"> ... </i18n>`
- **Do:** Use global keys for shared UI labels.
  - `t('layout.footerLinks.archive')`
  - `t('ui.secureLine')`
- **Do:** Localize internal links.
  - `const localePath = useLocalePath()`
  - `<NuxtLink :to="localePath('/archive')">...</NuxtLink>`
- **Don't:** Hardcode user-facing strings in templates/composables if they are translated in 2+ places.
- **Don't:** Manually force `htmlAttrs.lang` per page when i18n is enabled.
- **Don't:** Introduce ad-hoc key names like `text1`, `labelA`; use explicit domain keys.