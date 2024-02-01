import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import  PokeDexView  from "@/views/PokeDexView.vue";
import  PokeDetail  from "@/views/PokeDetail.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path:'/',
    name: 'home',
    component: PokeDexView
  },
  {
    path:'/pokemon/:id',
    name: 'PokeDetail',
    component: PokeDetail
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
