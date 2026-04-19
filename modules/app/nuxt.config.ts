import process from 'node:process'

export default defineNuxtConfig({
  extends: ['../design-system-nuxt'],
  runtimeConfig: {
    public: {
      /** Set via NUXT_PUBLIC_CAREER_* — keep real values in .env (gitignored), not in repo */
      careerFullName: '',
      careerEmail: '',
      careerPhone: '',
      careerLocation: '',
    },
  },
  modules: [
    '@nuxt/content',
    ...(process.env.NODE_ENV === 'development' ? ['nuxt-studio'] : []),
  ],
  css: ['~/assets/css/global.css'],
  app: {
    head: {
      title: 'CDA_LAB // LOGICAL MACHINE',
    },
  },
  content: {
    experimental: {
      sqliteConnector: 'native',
    },
  },
  compatibilityDate: '2026-04-16',
  routeRules: {
    '/rx-quiet/catnip-buffer/career': {
      headers: {
        'x-robots-tag': 'noindex, nofollow',
      },
    },
  },
})
