import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import tableRouter from './table/index'
import formRouter from './form/form'
import treeRouter from './tree/index'

Vue.use(VueRouter)

const routes = [
  ...tableRouter,
  ...formRouter,
  ...treeRouter,
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/test',
    name: 'test22',
    component: ()=>import('@/views/test.vue')
  },
  {
    path: '/tree',
    name: 'tree',
    component: () => import('../views/yl-tree.vue')
  },
  {
    path: '/child-sync',
    name: 'child-sync',
    component: () => import('../views/child-sync/A.vue')
  },
  {
    path:'/params-type',
    name:'params-type',
    component: ()=>import('@/views/params-type/demo.vue')
  },
  {
    path:'/parent',
    name:'params-type2',
    component: ()=>import('@/views/parent/demo.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
