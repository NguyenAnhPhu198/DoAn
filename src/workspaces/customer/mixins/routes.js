const UserInfo = () => import('../views/UserInfo')
const Orders = () => import('../views/Orders')
const Address = () => import('../views/Address')

export default [
  {
    path: '/',
    name: 'User info',
    component: UserInfo,
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