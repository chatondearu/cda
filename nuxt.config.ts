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
    'nuxt-studio',
  ],

  css: [
    '~/app/assets/css/global.css',
  ],
})
