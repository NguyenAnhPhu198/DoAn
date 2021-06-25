const Purchases = () => import('@/views/purchases/Index')
const Purchase = () => import('@/views/purchases/Detail')

export default [
  {
    path: '/purchases',
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
]