export default [
  {
    path: '/a',
    name: 'a-test',
    component: () => import('@/views/test/A.vue')
  },
  {
    path: '/b',
    name: 'b-test',
    component: () => import('@/views/test/B.vue')
  },
  {
    path: '/c',
    name: 'c-test',
    component: () => import('@/views/test/C.vue')
  }
]