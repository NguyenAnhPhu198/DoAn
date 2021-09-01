const UserInfo = () => import('../views/UserInfo')
const Orders = () => import('../views/Orders')
const Address = () => import('../views/Address')
const Cart = () => import('../views/Cart')

export default [
  {
    path: '/',
    name: 'User info',
    component: UserInfo,
  },
  {
    path: 'cart',
    name: 'Cart',
    component: Cart,
  },
  {
    path: 'orders',
    name: 'Orders',
    component: Orders,
  },
  {
    path: 'address',
    name: 'Address',
    component: Address,
  },
]