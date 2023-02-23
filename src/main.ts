import { createPinia } from 'pinia'
import { apolloClient } from './apollo-client'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { h, provide, createApp } from 'vue'
import App from './App.vue'

import './assets/main.css'

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App)
})

app.use(createPinia())

app.mount('#app')
