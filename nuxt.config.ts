// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/helmet',
    [
      '@pinia/nuxt',
      {
        autoImports: [
          'defineStore',
          ['defineStore', 'definePiniaStore'],
        ],
      },
    ],
  ],

  app: {
    baseURL: process.env.NODE_ENV === 'production' ? '/' : '/',
    // buildAssetsDir: '/aaa/',
    buildAssetsDir: '/assets/',
    head: {
      title: "多元陪伴照顧服務試辦計畫",
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        {
          'http-equiv': 'Content-Security-Policy',
          content: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com; img-src 'self' data: https:; font-src 'self' https:; connect-src 'self';"
        },
        {
          'http-equiv': 'Permissions-Policy',
          content: "accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=(), interest-cohort=()"
        }
      ],
      script: [
        {
          src: "https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.3/js/bootstrap.bundle.min.js",
        },
      ],
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

  helmet: {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://cdnjs.cloudflare.com"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"],
        imgSrc: ["'self'", "data:", "https:"],
        fontSrc: ["'self'", "https:"],
        connectSrc: ["'self'"]
      }
    }
  }
})