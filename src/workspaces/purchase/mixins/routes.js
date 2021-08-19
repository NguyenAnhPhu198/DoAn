const Dashboard = () => import('../views/Dashboard')
const Purchases = () => import('../views/purchases/Index')
const Purchase = () => import('../views/purchases/Detail')
const Users = () => import('../views/users/Index')

export default [
  {
    path: 'dashboard',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: 'purchases',
    meta: { label: 'Purchases' },
    component: {
      render(c) { return c('router-view') }
    },
    children: [
      {
        path: '',
        name: 'Purchases',
        component: Purchases
      },
      {
        path: ':id',
        meta: {
          label: 'Purchase Detail'
        },
        name: 'Purchase',
        component: Purchase
      }
    ]
  },
  {
    path: 'users',
    meta: { label: 'Users' },
    component: {
      render(c) { return c('router-view') }
    },
    children: [
      {
        path: '',
        name: 'Users',
        component: Users
      },
    ]
  },
]