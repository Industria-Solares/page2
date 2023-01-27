export default defineNuxtConfig({
  app: {
    baseURL: '/',
    // baseURL: '/page2',
  },
  css: ['vuetify/lib/styles/main.sass'],
  build: {
    transpile: ['vuetify'],
  },
  vite: {},
  ssr: false,
})
