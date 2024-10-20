import {createRouter, createWebHistory} from 'vue-router'
import Home from './components/Home.vue'
import Analyze from './components/Analyze.vue'
import Init from './components/Init.vue'
import About from './components/About.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/init',
    name: 'Init',
    component: Init
  },
  {
    path: '/analyze/:uri',
    name: 'Analyze',
    component: Analyze,
    props: true
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
]


const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
