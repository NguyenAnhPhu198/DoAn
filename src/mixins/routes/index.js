import protectedRoutes from './protected'
import publicRoutes from './public'

export default [
  {
    path: '/',
    redirect: '/dashboard',
    name: 'Home',
    component: () => import('@/containers/TheContainer'),
    meta: {
      authRequired: true,
    },
    children: protectedRoutes,
  },
  ...publicRoutes,
]