// src/main.js
import { createApp } from 'vue'
import App from './App.vue'

// Keep Bootstrap styles
import 'bootstrap/dist/css/bootstrap.min.css'

// Import PrimeVue config and theme
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura' // Aura theme from @primeuix/themes

// Import PrimeIcons (optional, used by PrimeVue components)
import 'primeicons/primeicons.css'

// Create Vue application
const app = createApp(App)

// Enable PrimeVue with the selected theme
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})

app.mount('#app')
