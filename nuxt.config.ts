export default defineNuxtConfig({
  app: {
    baseURL: '/',
    // baseURL: '/page2',
  },
  css: ['vuetify/lib/styles/main.sass', '@mdi/font/css/materialdesignicons.css' ],
  build: {
    transpile: ['vuetify'],
  },
  vite: {},
  ssr: false,
})
