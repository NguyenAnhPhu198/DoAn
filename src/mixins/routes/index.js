import homeRoutes from '@/workspaces/home/mixins/routes'
import customerRoutes from '@/workspaces/customer/mixins/routes'
import purchaseRoutes from '@/workspaces/purchase/mixins/routes'
import saleRoutes from '@/workspaces/sale/mixins/routes'

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
    path: '/customer',
    name: 'Customer',
    component: () => import('@/workspaces/customer/containers/TheContainer'),
    meta: {
      authRequired: true,
    },
    children: customerRoutes,
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
  {
    path: '/sale',
    redirect: '/sale/dashboard',
    name: 'Sale',
    component: () => import('@/workspaces/sale/containers/TheContainer'),
    meta: {
      authRequired: true,
    },
    children: saleRoutes,
  },
]