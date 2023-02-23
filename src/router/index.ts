import { createRouter, createWebHistory, type RouteRecordRaw} from 'vue-router'

import Home from '../views/Home.vue'
import Character from '../views/Character.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Rick and Morty',
    component: Home
  },
  {
    path: '/character/:id',
    name: 'character',
    component: Character
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router