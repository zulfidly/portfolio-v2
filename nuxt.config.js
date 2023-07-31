// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@nuxtjs/tailwindcss',
        '@formkit/nuxt',
        '@pinia/nuxt',
        '@vueuse/nuxt',
    ],
    css: [
        '/assets/myStyle.css',
    ],
    app: {
        pageTransition: { name: 'page', mode: 'out-in' }
    },
    pinia: {
        autoImports: [
          // automatically imports `defineStore`
          'defineStore', // don't have to include import { defineStore } from 'pinia' anymore
          ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
        ],
      },
})

