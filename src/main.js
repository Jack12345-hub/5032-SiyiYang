// src/main.js
import 'bootstrap/dist/css/bootstrap.min.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import App from './App.vue'

// ✔ import the router you created in src/router/index.js
import router from './router'

// PrimeVue
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura' // <-- correct package name

const app = createApp(App)

// enable PrimeVue theme
app.use(PrimeVue, { theme: { preset: Aura } })

// ✔ register router
app.use(router)

// mount
app.mount('#app')
