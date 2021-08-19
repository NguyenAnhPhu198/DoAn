import homeRoutes from '@/workspaces/home/mixins/routes'
import purchaseRoutes from '@/workspaces/purchase/mixins/routes'

export default [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/workspaces/home/containers/TheContainer'),
    meta: {
      authRequired: false,
    },
    children: homeRoutes,
  },
  {
    path: '/purchase',
    redirect: '/purchase/dashboard',
    name: 'Purchase',
    component: () => import('@/workspaces/purchase/containers/TheContainer'),
    meta: {
      authRequired: true,
    },
    children: purchaseRoutes,
  },
]