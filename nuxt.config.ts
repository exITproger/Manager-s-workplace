// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxt/icon', '@nuxtjs/color-mode', '@pinia/nuxt'],
  imports: {
    dirs: ['stores'], 
  },
  css: ['~/assets/css/main.css']
})
