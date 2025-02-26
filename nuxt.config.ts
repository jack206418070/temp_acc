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
          src: "/js/bootstrap.bundle.min.js",
          integrity: "sha256-CDOy6cOibCWEdsRiZuaHf8dSGGJRYuBGC+mjoJimHGw="
        },
      ],
    }
  },

  security: {
    ssg: {
      meta: true,
      hashScripts: false,
      hashStyles: false,
      exportToPresets: true
    },
    sri: true,
    headers: {
      contentSecurityPolicy: {
        'script-src': process.env.NODE_ENV === 'production' 
          ? [
              "'self'",
              "'strict-dynamic'",
              "'nonce-${nonce}'",
            ]
          : ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        'img-src': ["'self'", "data:", "blob:"],
        'style-src': ["'self'", "'unsafe-inline'"],
        'default-src': ["'self'"],
        'connect-src': ["'self'"],
        'frame-ancestors': ["'none'"],
        'object-src': ["'none'"],
        'base-uri': ["'self'"]
      },
      xContentTypeOptions: 'nosniff',
      strictTransportSecurity: {
        maxAge: 15552000,        // 180 天
        includeSubdomains: true, // 包含所有子域名
        preload: true           // 加入瀏覽器預載清單
      }
    }
  },

  // Per route
  routeRules: {
    '/custom-route': {
      security: {
        headers: {
          contentSecurityPolicy: {
            'script-src': "'self' 'strict-dynamic' 'nonce-${nonce}'"
          },
        },
      },
    },
    '/assets/**': {
      headers: {
        'X-Content-Type-Options': 'nosniff',
        'Content-Type': 'application/json; charset=utf-8'
      }
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
    // preset: 'vercel',
    preset: 'static',
    output: {
      dir: './dist',
      publicDir: './dist'
    },
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
    ],
    routeRules: {
      '/assets/**': {
        headers: {
          'X-Content-Type-Options': 'nosniff',
          'Content-Type': 'application/json; charset=utf-8'
        }
      }
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

  vite: {
    build: {
      rollupOptions: {
        external: ['sweetalert2']
      }
    }
  }
})