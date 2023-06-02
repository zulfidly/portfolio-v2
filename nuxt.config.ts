// https://nuxt.com/docs/api/configuration/nuxt-config


export default defineNuxtConfig({
    // ssr: true,
    modules: [
        '@nuxtjs/tailwindcss',
        '@formkit/nuxt',
    ],
    css: [
        '/assets/myStyle.css',
    ],
    app: {
        pageTransition: { name: 'page', mode: 'out-in' }
    },
});

