import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/About.vue')
  },
  {
    path: '/short-link',
    name: 'short-link',
    component: () => import('@/views/ShortLink.vue')
  },
  {
    path: '/quotes',
    name: 'quotes',
    component: () => import('@/views/Quotes.vue')
  },
  {
    path: '/currency-converter',
    name: 'currency-converter',
    component: () => import('@/views/CurrencyConverter.vue')
  },
  {
    path: '/yt-downloader',
    name: 'yt-downloader',
    component: () => import('@/views/YTDownloader.vue')
  },
  {
    path: '/covid-stats',
    name: 'covid-stats',
    component: () => import('@/views/CovidStats.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
