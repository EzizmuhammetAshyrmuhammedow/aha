// app.config.ts
export default defineAppConfig({
    // Configure Quasar's Vue plugin (with HMR support)
    nuxtQuasar: {
        dark: true,
        brand: {
          primary: '#1976d2',
          secondary: '#26A69A',
          accent: '#9C27B0',

          dark: '#1d1d1d',
          'dark-page': '#121212',

          positive: '#21BA45',
          negative: '#C10015',
          info: '#31CCEC',
          warning: '#F2C037',
        },
    }
})
