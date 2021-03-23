import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import redirects from '../redirects'

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
    meta: {
      authRequired: true,
    },
    children: [
      ...defaultProtectedRoutes,
      ...protectedRoutes,
    ]
  },
  ...defaultPublicRoutes,
  ...publicRoutes,
]

const router = new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: routes,
})

// Before each route evaluates...
router.beforeEach((routeTo, routeFrom, next) => {
  /*
   * Check if auth is required on this route
   * (including nested routes).
   */
  const authRequired = routeTo.matched.some((route) => route.meta.authRequired)

  // If auth isn't required for the route, just continue.
  if (!authRequired) return next()

  // If authenticated, just continue.
  if (!store.getters['auth.authenticated']) redirects.auth.toLogin()

  Promise.all([store.dispatch('auth.verify')]).then(next())
  // next()
})

router.afterEach((to) => {
  /*
   * Use next tick to handle router history correctly
   * see: https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
   */
  Vue.nextTick(() => {
    document.title = process.env.VUE_APP_NAME + ' - ' + (to.meta.title || to.name);
  });
});

export default router