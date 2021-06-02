const Login = () => import('@/core/views/authenticate/Login')
const Page404 = () => import('@/core/views/pages/Page404')

export default [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '*',
    name: 'Not found',
    component: Page404,
  },
]