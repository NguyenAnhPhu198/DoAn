const Login = () => import('@/core/views/authenticate/Login')
const ForgotPassword = () => import('@/core/views/authenticate/ForgotPassword')
const Page404 = () => import('@/core/views/pages/Page404')

export default [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/forgot-password',
    name: 'Forgot password',
    component: ForgotPassword,
  },
  {
    path: '*',
    name: 'Not found',
    component: Page404,
  },
]