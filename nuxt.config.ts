// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: process.env.NODE_ENV !== 'production' },
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

  // 安全配置
  security: {
    ssg: {
      meta: false, // 隱藏構建元數據
      hashScripts: false,
      hashStyles: false,
      exportToPresets: true
    },
    sri: false,
    headers: {
      contentSecurityPolicy: {
        'script-src': [
          "'self'",
          "'unsafe-inline'",
          "https://www.googletagmanager.com",
          "https://www.google-analytics.com"
        ],
        'style-src': ["'self'", "'unsafe-inline'"],
        'img-src': ["'self'", "data:", "blob:"],
        'connect-src': ["'self'", "https://www.google-analytics.com"],
        'object-src': ["'none'"],
        'base-uri': ["'self'"],
        'frame-ancestors': ["'none'"]
      },
      xFrameOptions: 'DENY',
      xContentTypeOptions: 'nosniff',
      strictTransportSecurity: {
        maxAge: 31536000,
        includeSubdomains: true
      },
      referrerPolicy: 'strict-origin-when-cross-origin'
    }
  },

  // 路由規則
  routeRules: {
    // 阻止存取敏感目錄
    '/_nuxt/builds/**': { 
      headers: { 
        'X-Robots-Tag': 'noindex, nofollow',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    }
  },

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

  image: {
    provider: 'static',
    dir: 'public/images'
  },

  nitro: {
    // 生產環境隱藏錯誤詳情
    experimental: {
      wasm: false
    },
    // 移除可能洩露資訊的標頭並加強安全防護
    headers: {
      'x-powered-by': '', // 隱藏技術棧資訊
      'server': '', // 隱藏伺服器資訊
      'x-nuxt-version': '', // 隱藏Nuxt版本
      // HTTP Request Smuggling 防護標頭
      'Connection': 'close', // 強制關閉連線，防止連線重用攻擊
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    },
    // HTTP 請求限制
    maxChunkSize: 1048576, // 1MB chunk size limit
    // 關閉不必要的功能
    compressPublicAssets: true,
    minify: process.env.NODE_ENV === 'production',
    
    // 路由規則 - 加強安全性
    routeRules: {
      // API路由安全設定
      '/api/**': {
        headers: {
          'X-Content-Type-Options': 'nosniff',
          'X-Frame-Options': 'DENY',
          'X-XSS-Protection': '1; mode=block',
          'Referrer-Policy': 'strict-origin-when-cross-origin'
        },
        security: {
          xssValidator: false // 避免XSS檢查誤判
        }
      },
      // 靜態資源安全設定
      '/assets/**': {
        headers: {
          'X-Content-Type-Options': 'nosniff',
          'Cache-Control': 'public, max-age=31536000, immutable'
        }
      },
      // 上傳文件安全設定
      '/uploads/**': {
        headers: {
          'X-Content-Type-Options': 'nosniff',
          'X-Frame-Options': 'DENY',
          'Content-Disposition': 'attachment' // 強制下載，防止執行
        }
      },
      // 404 頁面處理
      '/notfound': { 
        headers: { 'X-Robots-Tag': 'noindex' }
      }
    },
    
    prerender: {
      failOnError: false,
      crawlLinks: true,
      routes: ['/'],
    },
    preset: 'node-server',
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
    externals: {
      external: ['canvas']
    },
    
    // 錯誤處理配置
    errorHandler: '~/server/api/error-handler.ts'
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
    fallback: true
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

  // 添加 cookie 配置 - 安全設定
  ssr: true,
  
  // 全域 Cookie 安全設定
  runtimeConfig: {
    // 將會從環境變數中獲取
    jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
    public: {
      // 公開的運行時配置
    }
  },
  
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
  },

  // 實驗性功能配置
  ...(process.env.NODE_ENV === 'production' && {
    // 生產環境關閉source map避免洩露原始碼
    sourcemap: {
      server: false,
      client: false
    }
  })
})