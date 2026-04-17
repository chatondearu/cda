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
      background: '#131313',
      surface: '#131313',
      surface_dim: '#131313',
      surface_bright: '#3a3939',
      surface_variant: '#353534',
      surface_container: '#201f1f',
      surface_container_low: '#1c1b1b',
      surface_container_lowest: '#0e0e0e',
      surface_container_high: '#2a2a2a',
      surface_container_highest: '#353534',
      primary: '#ffdca1',
      on_primary: '#412d00',
      primary_container: '#ffb800',
      on_primary_container: '#6b4c00',
      primary_fixed: '#ffdea8',
      primary_fixed_dim: '#ffba20',
      on_primary_fixed: '#271900',
      secondary: '#e1c28f',
      on_secondary: '#402d07',
      secondary_container: '#5b461e',
      on_secondary_container: '#d2b482',
      on_surface: '#e5e2e1',
      on_surface_variant: '#d5c4ab',
      on_background: '#e5e2e1',
      outline: '#9e8f78',
      outline_variant: '#514532',
      error: '#ffb4ab',
      error_container: '#93000a',
      on_error: '#690005',
      on_error_container: '#ffdad6',
      inverse_surface: '#e5e2e1',
      inverse_on_surface: '#313030',
      inverse_primary: '#7c5800',
      tertiary: '#ffdabf',
      on_tertiary: '#4d2600',
      tertiary_container: '#ffb579',
      on_tertiary_container: '#7d4200',
      // Legacy aliases (existing app shortcuts / components)
      primary_amber: '#ffba20',
      primary_amber_soft: '#ffdca1',
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
      'bg-[radial-gradient(#ffba20_0.5px,transparent_0.5px)] [background-size:24px_24px]',
    ],
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
