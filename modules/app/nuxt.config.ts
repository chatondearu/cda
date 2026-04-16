// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4
  },

  modules: [
    '@unocss/nuxt',
    '@nuxt/content',
    ...(process.dev ? ['nuxt-studio'] : []),
  ],

  content: {
    experimental: {
      sqliteConnector: 'native',
    },
  },

  css: [
    '~/assets/css/global.css',
  ],
})
