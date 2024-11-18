// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: true,
    compatibilityDate: '2024-04-03',
    devtools: {enabled: true},
    modules: ['nuxt-quasar-ui', '@pinia/nuxt',],
    routeRules: {
        '/api/auth/**': {
            cors: true,
        },
    },
})