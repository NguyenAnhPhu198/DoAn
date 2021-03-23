const Login = () => import('@/core/views/authenticate/Login')

export default [
  {
    path: '/login',
    name: 'Pages',
    component: Login,
  },
]