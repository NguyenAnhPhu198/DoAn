import Vue from 'vue'
import Router from 'vue-router'

import defaultProtectedRoutes from './protected'
import defaultPublicRoutes from './public'

import protectedRoutes from '@/config/routes/protected'
import publicRoutes from '@/config/routes/public'

Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: '/dashboard',
    name: 'Home',
    component: () => import('@/core/containers/TheContainer'),
    children: [
      ...defaultProtectedRoutes,
      ...protectedRoutes,
    ]
  },
  ...defaultPublicRoutes,
  ...publicRoutes,
]

export default new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: routes,
})
