const Users = () => import('../views/users/Index')
// const Orders = () => import('../views/Orders')
// const Address = () => import('../views/Address')
// const Cart = () => import('../views/Cart')

export default [
  {
    path: '/',
    name: 'Users',
    component: Users,
  },

]
