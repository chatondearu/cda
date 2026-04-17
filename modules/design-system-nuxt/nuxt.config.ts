import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const currentDir = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
  modules: ['@unocss/nuxt'],
  unocss: {
    configFile: join(currentDir, 'uno.config.ts'),
  },
  css: [join(currentDir, './app/assets/css/design-system.css'), '@unocss/reset/tailwind.css'],
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0',
        },
      ],
    },
  },
  compatibilityDate: '2026-04-16',
})
