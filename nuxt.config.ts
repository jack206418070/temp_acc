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
    // buildAssetsDir: '/assets/',
    head: {
      title: "多元陪伴照顧服務試辦計畫",
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      script: [
        {
          src: "/js/bootstrap.bundle.min.js",
          integrity: "sha256-CDOy6cOibCWEdsRiZuaHf8dSGGJRYuBGC+mjoJimHGw="
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
        'script-src': process.env.NODE_ENV === 'production' 
          ? [
              "'self'",
              "'strict-dynamic'",
              "'sha256-CDOy6cOibCWEdsRiZuaHf8dSGGJRYuBGC+mjoJimHGw='"
              // 其他必要的腳本來源...
            ]
          : ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        'img-src': ["'self'", "data:", "blob:"],
        'style-src': ["'self'", "'unsafe-inline'"],
        'default-src': ["'self'"],
        'connect-src': ["'self'"],
        'frame-ancestors': ["'none'"],
        'object-src': ["'none'"],
        'base-uri': ["'self'"]
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
            'script-src': "'self' 'unsafe-inline' 'sha256-CDOy6cOibCWEdsRiZuaHf8dSGGJRYuBGC+mjoJimHGw='"
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
    preset: 'node-server',
    // preset: 'vercel',
    storage: {
      uploads: {
        driver: 'fs',
        base: './public/uploads'
      }
    },
    publicAssets: [
      {
        dir: 'public',
        baseURL: '/',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      }
    ]
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
    "@/assets/scss/admin.scss"
  ],

  compatibilityDate: '2025-02-20',

  runtimeConfig: {
    // 將會從環境變數中獲取
    jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  },

  // 添加 cookie 配置
  cookieControl: {
    cookies: {
      necessary: [
        {
          name: 'auth_token',
          description: '用於用戶身份驗證的令牌',
          tokens: ['auth_token']
        }
      ]
    }
  },
})