import process from 'node:process'

export default defineNuxtConfig({
  extends: ['../design-system-nuxt'],
  modules: [
    '@nuxt/content',
    ...(process.env.NODE_ENV === 'development' ? ['nuxt-studio'] : []),
  ],
  app: {
    head: {
      title: 'THE LAB // LOGICAL MACHINE',
    },
  },
  content: {
    experimental: {
      sqliteConnector: 'native',
    },
  },
  compatibilityDate: '2026-04-16',
})
