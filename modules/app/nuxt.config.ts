import process from 'node:process'

export default defineNuxtConfig({
  extends: ['../design-system-nuxt'],
  runtimeConfig: {
    public: {
      /** Canonical primary site URL — set with NUXT_PUBLIC_SITE_URL */
      siteUrl: 'https://chatondearu.fr',
      /** Dedicated host used for the CV access gateway — set with NUXT_PUBLIC_ME_HOST */
      meHost: 'rlienard.fr',
      /** Set via NUXT_PUBLIC_CAREER_* — keep real values in .env (gitignored), not in repo */
      careerFullName: '',
      careerEmail: '',
      careerPhone: '',
      careerLocation: '',
      /** Umami — NUXT_PUBLIC_UMAMI_*; omit or leave empty to disable tracking */
      umamiScriptUrl: '',
      umamiWebsiteId: '',
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
