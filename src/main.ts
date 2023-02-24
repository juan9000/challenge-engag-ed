import { h, createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'

import './assets/reset.css'
import './assets/main.css'

const app = createApp({
  render: () => h(App)
})

app.use(createPinia())
app.use(router)
app.mount('#app')
