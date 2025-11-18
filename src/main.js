import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import Toast, { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'


import App from './App.vue'
import router from './router'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(Toast, {
  position: POSITION.TOP_RIGHT,
})
app.use(router)

app.mount('#app')