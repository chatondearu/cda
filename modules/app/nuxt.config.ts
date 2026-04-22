import process from 'node:process'

export default defineNuxtConfig({
  extends: ['../design-system-nuxt'],
  runtimeConfig: {
    public: {
      /** Canonical primary site URL — set with NUXT_PUBLIC_SITE_URL */
      siteUrl: 'https://chatondearu.fr',
      /**
       * Hostnames that redirect to siteUrl with /en when the path has no locale prefix.
       * Comma-separated, no scheme (e.g. chatondearu.com,www.chatondearu.com).
       * Set with NUXT_PUBLIC_REDIRECT_HOSTS_EN (Coolify env).
       */
      redirectHostsEn: '',
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
    '@nuxtjs/i18n',
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
  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'fr',
    langDir: 'locales',
    locales: [
      { code: 'fr', language: 'fr-FR', file: 'fr.json', name: 'Francais' },
      { code: 'en', language: 'en-US', file: 'en.json', name: 'English' },
      { code: 'zh', language: 'zh-CN', file: 'zh.json', name: 'Chinese' },
      { code: 'ja', language: 'ja-JP', file: 'ja.json', name: 'Japanese' },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'cda_locale',
      redirectOn: 'root',
      alwaysRedirect: false,
      fallbackLocale: 'fr',
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
