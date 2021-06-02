const Login = () => import('@/core/views/authenticate/Login')
const Register = () => import('@/core/views/authenticate/Register')
const Page404 = () => import('@/core/views/pages/Page404')

export default [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '*',
    name: 'Not found',
    component: Page404,
  },
]