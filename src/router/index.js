import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login'
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    meta: {layout: 'empty'},
    component: ()=>import('../views/Login')
  },
  {
    path: '/categories',
    name: 'categories',
    meta: {layout: 'main'},
    component: ()=>import('../views/Categories')
  },
  {
    path: '/detail-record',
    name: 'detail-record',
    meta: {layout: 'main'},
    component: ()=>import('../views/DetailRecord')
  },
  {
    path: '/history',
    name: 'history',
    meta: {layout: 'main'},
    component: ()=>import('../views/History')
  },
  {
    path: '/planning',
    name: 'planning',
    meta: {layout: 'main'},
    component: ()=>import('../views/Planning')
  },
  {
    path: '/profile',
    name: 'profile',
    meta: {layout: 'main'},
    component: ()=>import('../views/Profile')
  },
  {
    path: '/record',
    name: 'record',
    meta: {layout: 'main'},
    component: ()=>import('../views/Record')
  },
  {
    path: '/register',
    name: 'register',
    meta: {layout: 'empty'},
    component: ()=>import('../views/Register')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
