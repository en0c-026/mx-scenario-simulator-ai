/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  defaults: {
    global: {
      elevation: 0
    },
    VSelect: {
      variant: "outlined",
      rounded: 0,
      
      hideDetails: true,
      density: "compact"
    },
    VTextField: {
      variant: "outlined",
      rounded: 0,
      
      hideDetails: true,
      density: "compact"
    },
    VBtn: {
      rounded: 0
    }
  },
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#1867C0',
          secondary: '#5CBBF6',
        },
      },
    },
  },
})
