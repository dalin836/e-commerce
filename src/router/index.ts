import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../Views/HomeView.vue'
import ProductView from '../Views/ProductView.vue'
import CategoryView from '@/Views/CategoryView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
     {
    path: "/",
    name: "home",
    component: HomeView
  },
  {
    path: "/product/:id",
    name: "productDetail",
    component: ProductView
  },
  {
    path: "/category/:id",
    name: "category",
    component:CategoryView
  }
  ],
})

export default router
