import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default defineNuxtPlugin(nuxtApp => {
  const lightTheme = {
    dark: false,
    colors: {
      'background': '#FFFFFF',
      'surface': '#FFFFFF',
      'primary': '#6200EE',
      'primary-darken-1': '#3700B3',
      'secondary': '#03DAC6',
      'secondary-darken-1': '#018786',
      'error': '#B00020',
      'info': '#2196F3',
      'success': '#4CAF50',
      'warning': '#FB8C00',
    }
  }

  const darkTheme = {
    dark: true,
    colors: {
      'background': '#121212',
      'surface': '#121212',
      'primary': '#BB86FC',
      'primary-darken-1': '#3700B3',
      'secondary': '#03DAC6',
      'secondary-darken-1': '#018786',
      'error': '#CF6679',
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
      defaultTheme: 'lightTheme',
      themes: {
        lightTheme,
        darkTheme,
      }
    },
  })

  nuxtApp.vueApp.use(vuetify)
})