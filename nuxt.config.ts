// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@nuxtjs/seo',
    '@nuxt/fonts',
    '@nuxt/image',
    '@vite-pwa/nuxt',
    '@vueuse/nuxt',
  ],

  // ── App ──────────────────────────────────────────────────
  app: {
    head: {
      htmlAttrs: { dir: 'ltr' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      ],
    },
  },

  // ── CSS ──────────────────────────────────────────────────
  css: ['~/assets/css/main.css'],

  // ── Runtime Config ───────────────────────────────────────
  runtimeConfig: {
    supabaseUrl: process.env.SUPABASE_URL || '',
    supabaseServiceKey: process.env.SUPABASE_SERVICE_KEY || '',
    resendApiKey: process.env.RESEND_API_KEY || '',
    public: {
      supabaseUrl: process.env.NUXT_PUBLIC_SUPABASE_URL || '',
      supabaseAnonKey: process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY || '',
      calendlyUrl: process.env.NUXT_PUBLIC_CALENDLY_URL || 'https://calendly.com',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://producktive.pl',
    },
  },

  // ── i18n ─────────────────────────────────────────────────
  i18n: {
    locales: [
      {
        code: 'pl',
        language: 'pl-PL',
        name: 'Polski',
        file: 'pl.json',
      },
      {
        code: 'en',
        language: 'en-US',
        name: 'English',
        file: 'en.json',
      },
    ],
    defaultLocale: 'pl',
    strategy: 'prefix_except_default',
    lazy: true,
    langDir: 'locales',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_lang',
      redirectOn: 'root',
      alwaysRedirect: false,
      fallbackLocale: 'pl',
    },
    bundle: {
      optimizeTranslationDirective: true,
    },
  },

  // ── SEO (@nuxtjs/seo) ───────────────────────────────────
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://producktive.pl',
    name: 'Producktive',
    description: 'Tworzę strony, sklepy i produkty cyfrowe, które pracują na Twój biznes. Gdańsk i okolice.',
    defaultLocale: 'pl',
  },

  ogImage: { enabled: false }, // Disabled for now until screenshots are ready

  schemaOrg: {
    identity: {
      type: 'LocalBusiness',
      name: 'Producktive',
      url: 'https://producktive.pl',
      description: 'Tworzenie stron internetowych, landing pages i blogów dla małych firm. Gdańsk, Trójmiasto.',
      address: {
        addressLocality: 'Gdańsk',
        addressRegion: 'Pomorskie',
        addressCountry: 'PL',
      },
      areaServed: [
        { type: 'City', name: 'Gdańsk' },
        { type: 'City', name: 'Gdynia' },
        { type: 'City', name: 'Sopot' },
        { type: 'State', name: 'Pomorskie' },
      ],
      sameAs: [
        'https://linkedin.com/in/producktive',
        'https://github.com/producktive',
      ],
      email: 'kontakt@producktive.pl',
      priceRange: '$$',
    },
  },

  // ── Fonts (self-hosted, no Google CDN) ───────────────────
  fonts: {
    families: [
      { name: 'Plus Jakarta Sans', weights: [400, 600, 700, 800], provider: 'bunny' },
      { name: 'Inter', weights: [400, 500, 600], provider: 'bunny' },
      { name: 'DM Mono', weights: [400, 500], provider: 'bunny' },
    ],
  },

  // ── Image optimization ──────────────────────────────────
  image: {
    quality: 80,
    format: ['webp', 'avif'],
  },

  // ── PWA ──────────────────────────────────────────────────
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Producktive — Strony & Produkty Cyfrowe',
      short_name: 'Producktive',
      description: 'Tworzę strony i produkty cyfrowe, które pracują na Twój biznes.',
      theme_color: '#0F0F1A',
      background_color: '#0F0F1A',
      display: 'standalone',
      lang: 'pl',
      icons: [
        { src: '/pwa-192x192.png', sizes: '192x192', type: 'image/png' },
        { src: '/pwa-512x512.png', sizes: '512x512', type: 'image/png' },
        { src: '/pwa-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
      ],
    },
    workbox: {
      navigateFallback: undefined,
      globPatterns: ['**/*.{js,css,html,png,jpg,svg,webp,avif,woff2}'],
      // Large portfolio/hero images are excluded from precache (>2 MB SW limit).
      // They are fetched directly or cached at runtime.
      globIgnores: [
        '**/producktive-glass*',
        '**/site-miralive*',
        '**/site-neksuspng*',
        '**/site-producktive*',
      ],
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/fonts\.bunny\.net\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'bunny-fonts-cache',
            expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
            cacheableResponse: { statuses: [0, 200] },
          },
        },
      ],
    },
    client: {
      installPrompt: true,
    },
  },

  // ── Nitro (server) ──────────────────────────────────────
  nitro: {
    preset: 'vercel',
    compressPublicAssets: true,
  },

  // ── Experimental ────────────────────────────────────────
  experimental: {
    payloadExtraction: true,
  },

  // ── TypeScript ──────────────────────────────────────────
  typescript: {
    strict: true,
  },
})
