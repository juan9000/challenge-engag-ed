import { DefaultApolloClient } from '@vue/apollo-composable'
import { apolloClient } from './apollo-client'
import { h, provide, createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'

import './assets/main.css'

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App)
})

app.use(createPinia())
app.use(router)
app.mount('#app')
