// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [[
    '@pinia/nuxt',
    {
      autoImports: [
        'defineStore',
        ['defineStore', 'definePiniaStore'],
      ],
    },
  ], 'nuxt-security'],

  app: {
    baseURL: process.env.NODE_ENV === 'production' ? '/' : '/',
    // buildAssetsDir: '/aaa/',
    buildAssetsDir: '/assets/',
    head: {
      title: "多元陪伴照顧服務試辦計畫",
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      script: [
        {
          src: "https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.3/js/bootstrap.bundle.min.js",
        },
      ],
    }
  },
  
  security: {
    ssg: {
      meta: true, // Enables CSP as a meta tag in SSG mode
      hashScripts: true, // Enables CSP hash support for scripts in SSG mode
      hashStyles: false, // Disables CSP hash support for styles in SSG mode (recommended)
      exportToPresets: true // Export security headers to Nitro presets
    },
    sri: true,
    headers: {
      contentSecurityPolicy: {
        'script-src': [
          "'strict-dynamic'", // Modify with your custom CSP sources
          // The nonce-{{nonce}} placeholder is not required and will be ignored in SSG mode
        ]
      }
    }
  },

  // Per route
  routeRules: {
    '/custom-route': {
      security: {
        ssg: false,
        sri: false,
        headers: {
          contentSecurityPolicy: {
            'script-src': "self 'unsafe-inline'"
          },
        },
      },
    }
  },

  image: {
    provider: 'static',
   
  },

  nitro: {
    prerender: {
      failOnError: false,
      crawlLinks: true,
      routes: ['/'],
    },
    preset: 'node-server',
    // prerender: {
    //   failOnError: false,
    //   crawlLinks: true,
    //   routes: ['/'],
    // },
    // preset: 'static',
    output: {
      publicDir: 'dist' // 告訴 Nuxt 輸出到 `dist`
    }
  },
  serverHandlers: [
    {
      route: '/api',
      handler: '~/server/index.js',
    },
  ],
  experimental: {
    payloadExtraction: false
  },

  generate: {
    fallback: '404.html'
  },

  css: [
    "bootstrap/scss/bootstrap.scss",
    "swiper/css/bundle",
    "@/assets/scss/style.scss",
    "@/assets/css/responsive.css",
  ],

  compatibilityDate: '2025-02-20',
})