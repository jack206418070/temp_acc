// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  build: {
    transpile: ['sweetalert2']  // 添加這行
  },
  modules: [
    '@pinia/nuxt',
    {
      autoImports: [
        'defineStore',
        ['defineStore', 'definePiniaStore'],
      ],
    },
  ],

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
        {
          src: 'https://www.googletagmanager.com/gtag/js?id=G-5EVH3D8JX4',
          async: true,
        },
        {
          children: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-5EVH3D8JX4');
          `,
          type: 'text/javascript'
        }
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
    sri: false,
    headers: {
      contentSecurityPolicy: {
        // 'default-src': ["'self'"],
        'script-src': [
          "'self'",
          "'unsafe-inline'",  // 僅在你確實需要 inline script 時使用
          // "'strict-dynamic'",
          // 如果你有外部 script 如 bootstrap
        ],
        'style-src': ["'self'", "'unsafe-inline'"],
        'img-src': ["'self'", "data:", "blob:"],
        // 'font-src': ["'self'", "data:"],
        'connect-src': ["'self'"],
        'object-src': ["'none'"],
        'base-uri': ["'self'"],
        // 'form-action': ["'self'"]
      },
      // xFrameOptions: 'DENY',
      // xContentTypeOptions: 'nosniff',
      // strictTransportSecurity: {
      //   maxAge: 15552000,
      //   includeSubdomains: true,
      //   preload: true
      // }
      strictTransportSecurity: false
      
    }
  },

  // Per route
  // routeRules: {
  //   '/custom-route': {
  //     security: {
  //       headers: {
  //         contentSecurityPolicy: {
  //           'script-src': "'self' 'strict-dynamic' 'nonce-${nonce}'",
  //           'frame-ancestors': ["'none'"],
  //           'object-src': ["'none'"],
  //           'base-uri': ["'self'"]
  //         },
  //       },
  //     },
  //   },
  //   '/assets/**': {
  //     headers: {
  //       'X-Content-Type-Options': 'nosniff',
  //       'Content-Type': 'application/javascript; charset=utf-8'
  //     }
  //   },
  //   '/': {
  //     headers: {
  //       'X-Content-Type-Options': 'nosniff',
  //       'Content-Type': 'application/javascript; charset=utf-8'
  //     }
  //   }
  // },

  image: {
    provider: 'static',
    dir: 'public/images'
  },

  nitro: {
    headers: {
      'x-powered-by': '',
      'etag': '',
      'strict-transport-security': '',
      'x-dns-prefetch-control': '',
      'x-download-options': '',
      'x-permitted-cross-domain-policies': '',
      'permissions-policy': '',
      'cross-origin-embedder-policy': '',
      'cross-origin-opener-policy': '',
      'cross-origin-resource-policy': '',
      'origin-agent-cluster': '',
      'referrer-policy': '',
      'cache-control': ''
    },
    etag: false,
    compressPublicAssets: false, // 可選，避免產生 vary
    prerender: {
      failOnError: false,
      crawlLinks: true,
      routes: ['/'],
    },
    preset: 'node-server',
    // preset: 'vercel',
    // preset: 'static',
    // output: {
    //   dir: './dist',
    //   publicDir: './dist'
    // },
    output: {
      dir: './.output',
      publicDir: './.output/public'
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
          'Content-Type': 'application/javascript; charset=utf-8'
        }
      },
      '/api/**': {
        security: {
          xssValidator: false
        }
      }
    },
    externals: {
      external: ['canvas']
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
    "~/assets/scss/style.scss",
    "~/assets/css/responsive.css",
    "~/assets/scss/admin.scss"
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
    css: {
      preprocessorOptions: {
        scss: {
          quietDeps: true,  // 添加這個選項來抑制 Bootstrap 的警告
          additionalData: '@use "sass:math";'

        }
      }
    }
  }
})