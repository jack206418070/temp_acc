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
    dir: 'public/images'
  },

  nitro: {
    prerender: {
      failOnError: false,
      crawlLinks: true,
      routes: ['/'],
    },
    // preset: 'node-server',
    preset: 'vercel',
    // publicAssets: [
    //   {
    //     dir: 'public',
    //     baseURL: '/',  // 🚀 確保靜態資源可以從 `/` 讀取
    //     maxAge: 31536000
    //   }
    // ],
    // prerender: {
    //   failOnError: false,
    //   crawlLinks: true,
    //   routes: ['/'],
    // },
    // preset: 'static',
    // output: {
    //   publicDir: 'dist' // 告訴 Nuxt 輸出到 `dist`
    // }
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