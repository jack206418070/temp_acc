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
        },
        {
          children: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5LRLKWQD');
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
      contentSecurityPolicy: false, // CSP 由 IIS web.config 單一來源管理(見 spec §1.3/§4.4)
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
    preset: 'iis-node', // IIS + iisnode(對應正式部署)；web.config 由 deploy/ 經 copy-webconfig 覆蓋進 .output
    // preset: 'node-server',
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
        },
        headers: {
          'cache-control': 'no-store'
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