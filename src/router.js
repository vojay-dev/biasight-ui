import {createRouter, createWebHistory} from 'vue-router'
import Home from './components/Home.vue'
import Analyze from "./components/Analyze.vue";
import Init from "./components/Init.vue";


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
]


const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
