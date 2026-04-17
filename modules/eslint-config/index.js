import antfu from '@antfu/eslint-config'
import unocss from '@unocss/eslint-plugin'

export default antfu(
  {
    type: 'app',
    vue: true,
    typescript: true,
    stylistic: {
      semi: false,
      quotes: 'single',
      indent: 2,
    },
    ignores: [
      '**/.nuxt/**',
      '**/.output/**',
      '**/dist/**',
      '**/coverage/**',
    ],
  },
  {
    name: 'chatondearu/unocss',
    files: ['**/*.{vue,ts,tsx,js,jsx,html}'],
    plugins: {
      '@unocss': unocss,
    },
    rules: {
      '@unocss/order': 'warn',
      '@unocss/order-attributify': 'warn',
    },
  },
)
