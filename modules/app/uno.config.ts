import { defineConfig, presetIcons, presetTypography, presetUno, presetWebFonts, transformerDirectives, transformerVariantGroup } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons(),
    presetTypography(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: 'Space Grotesk',
        mono: 'Space Grotesk',
      },
    }),
  ],
  theme: {
    colors: {
      surface: '#131313',
      surface_container_lowest: '#0e0e0e',
      surface_container_highest: '#353534',
      primary_amber: '#ffba20',
      primary_amber_soft: '#ffdca1',
      outline: '#ffba20',
    },
  },
  shortcuts: [
    [
      'ui-surface',
      'bg-surface text-primary_amber_soft font-sans antialiased',
    ],
    [
      'ui-panel',
      'bg-surface_container_highest text-primary_amber_soft px-4 py-3',
    ],
    [
      'ui-micro',
      'text-[0.6875rem] leading-5 uppercase tracking-wide',
    ],
    [
      'ui-heading',
      'uppercase tracking-[-0.02em] font-700',
    ],
    [
      'ui-ghost-border',
      'border border-outline/15',
    ],
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
