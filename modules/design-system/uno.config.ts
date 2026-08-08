import {
  defineConfig,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

/**
 * Color tokens from design-system/code.html (Tailwind extend.colors).
 * Use utilities: text-primary, bg-surface-container-lowest, border-primary/10, etc.
 */
export default defineConfig({
  dark: 'class',
  presets: [
    presetUno(),
    presetIcons(),
    presetTypography(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: 'Space Grotesk:300,400,500,700,900',
        mono: 'Space Grotesk:400,500,700',
      },
    }),
  ],
  theme: {
    colors: {
      background: 'rgb(var(--background) / <alpha-value>)',
      surface: 'rgb(var(--surface) / <alpha-value>)',
      surface_dim: 'rgb(var(--surface-dim) / <alpha-value>)',
      surface_bright: 'rgb(var(--surface-bright) / <alpha-value>)',
      surface_variant: 'rgb(var(--surface-variant) / <alpha-value>)',
      surface_container: 'rgb(var(--surface-container) / <alpha-value>)',
      surface_container_low: 'rgb(var(--surface-container-low) / <alpha-value>)',
      surface_container_lowest: 'rgb(var(--surface-container-lowest) / <alpha-value>)',
      surface_container_high: 'rgb(var(--surface-container-high) / <alpha-value>)',
      surface_container_highest: 'rgb(var(--surface-container-highest) / <alpha-value>)',
      primary: 'rgb(var(--primary) / <alpha-value>)',
      on_primary: 'rgb(var(--on-primary) / <alpha-value>)',
      primary_container: 'rgb(var(--primary-container) / <alpha-value>)',
      on_primary_container: 'rgb(var(--on-primary-container) / <alpha-value>)',
      primary_fixed: 'rgb(var(--primary-fixed) / <alpha-value>)',
      primary_fixed_dim: 'rgb(var(--primary-fixed-dim) / <alpha-value>)',
      on_primary_fixed: 'rgb(var(--on-primary-fixed) / <alpha-value>)',
      secondary: 'rgb(var(--secondary) / <alpha-value>)',
      on_secondary: 'rgb(var(--on-secondary) / <alpha-value>)',
      secondary_container: 'rgb(var(--secondary-container) / <alpha-value>)',
      on_secondary_container: 'rgb(var(--on-secondary-container) / <alpha-value>)',
      on_surface: 'rgb(var(--on-surface) / <alpha-value>)',
      on_surface_variant: 'rgb(var(--on-surface-variant) / <alpha-value>)',
      on_background: 'rgb(var(--on-background) / <alpha-value>)',
      outline: 'rgb(var(--outline) / <alpha-value>)',
      outline_variant: 'rgb(var(--outline-variant) / <alpha-value>)',
      error: 'rgb(var(--error) / <alpha-value>)',
      error_container: 'rgb(var(--error-container) / <alpha-value>)',
      on_error: 'rgb(var(--on-error) / <alpha-value>)',
      on_error_container: 'rgb(var(--on-error-container) / <alpha-value>)',
      inverse_surface: 'rgb(var(--inverse-surface) / <alpha-value>)',
      inverse_on_surface: 'rgb(var(--inverse-on-surface) / <alpha-value>)',
      inverse_primary: 'rgb(var(--inverse-primary) / <alpha-value>)',
      tertiary: 'rgb(var(--tertiary) / <alpha-value>)',
      on_tertiary: 'rgb(var(--on-tertiary) / <alpha-value>)',
      tertiary_container: 'rgb(var(--tertiary-container) / <alpha-value>)',
      on_tertiary_container: 'rgb(var(--on-tertiary-container) / <alpha-value>)',
      // Legacy aliases (existing app shortcuts / components)
      primary_amber: 'rgb(var(--primary-fixed-dim) / <alpha-value>)',
      primary_amber_soft: 'rgb(var(--primary) / <alpha-value>)',
    },
    borderRadius: {
      DEFAULT: '0px',
      lg: '0px',
      xl: '0px',
    },
  },
  shortcuts: [
    [
      'ui-surface',
      'bg-surface text-primary font-sans antialiased selection:bg-primary_fixed_dim selection:text-background',
    ],
    [
      'ui-panel',
      'bg-surface_container_highest text-primary px-4 py-3',
    ],
    [
      'ui-micro',
      'text-[0.6875rem] leading-5 uppercase tracking-wide font-sans',
    ],
    [
      'ui-heading',
      'uppercase tracking-[-0.02em] font-700 font-sans',
    ],
    [
      'ui-ghost-border',
      'border border-primary/10',
    ],
    [
      'ds-dot-bg',
      'bg-[radial-gradient(rgb(var(--primary-fixed-dim))_0.5px,transparent_0.5px)] [background-size:24px_24px]',
    ],
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
