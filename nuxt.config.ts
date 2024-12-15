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
  ], "@nuxt/icon"],

  app: {
    head: {
      title: "Babun - Business & Finance Vue nuxt 3 Template",
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      script: [
        {
          src: "https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.3/js/bootstrap.bundle.min.js",
        }
      ],
      link: [
        { rel: 'preload', as: 'image', href: 'https://static.wixstatic.com/media/73d1df_f3c663fb863a4842a3705174c9fcec4f~mv2.jpg/v1/fill/w_574,h_314,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/og-image.jpg' },
        { rel: 'preload', as: 'image', href: 'https://static.wixstatic.com/media/73d1df_46b332b8860a4dfcbaf380ec70ebd4e7~mv2.jpg/v1/fill/w_574,h_314,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/og-image%20(1).jpg' },
        { rel: 'preload', as: 'image', href: 'https://static.wixstatic.com/media/73d1df_a92e62c7aaec445c99af1db66f0b79ce~mv2.png/v1/fill/w_574,h_314,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/%E6%9C%AA%E5%91%BD%E5%90%8D%E8%A8%AD%E8%A8%88%20(9).png' },
        { rel: 'preload', as: 'image', href: 'https://static.wixstatic.com/media/73d1df_2bfb581f0e9c468bbd3c7084e8e598c7~mv2.png/v1/fill/w_574,h_314,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/%E6%9C%AA%E5%91%BD%E5%90%8D%E8%A8%AD%E8%A8%88%20(10).png' },
        { rel: 'preload', as: 'image', href: 'https://static.wixstatic.com/media/73d1df_f4f6286abc514cb9978b1bbefd87cd7c~mv2.png/v1/fill/w_574,h_314,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/%E6%9C%AA%E5%91%BD%E5%90%8D%E8%A8%AD%E8%A8%88%20(11).png' }
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },

  css: [
    "bootstrap/scss/bootstrap.scss",
    "swiper/css/bundle",
    "@/assets/scss/style.scss",
    "@/assets/css/responsive.css",
  ],

  compatibilityDate: "2024-10-01",
})