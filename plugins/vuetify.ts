import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default defineNuxtPlugin(nuxtApp => {
  const theme = {
    dark: false,
    colors: {
      'background': '#FFFFFF',
      'surface': '#FFFFFF',
      'primary': '#18A0E8',
      'primary-darken-1': '#1870B8',
      'secondary': '#03DAC6',
      'secondary-darken-1': '#018786',
      'error': '#B00020',
      'info': '#2196F3',
      'success': '#4CAF50',
      'warning': '#FB8C00',
    }
  }

  const vuetify = createVuetify({
    components,
    directives,
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
      }
    },
    theme: {
      defaultTheme: 'theme',
      themes: {
        theme,
      }
    },
  })

  nuxtApp.vueApp.use(vuetify)
})