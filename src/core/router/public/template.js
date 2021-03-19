const Page404 = () => import('@/core/views/pages/Page404')
const Page500 = () => import('@/core/views/pages/Page500')
const Login = () => import('@/core/views/pages/Login')
const Register = () => import('@/core/views/pages/Register')

export default [
  {
    path: '/pages',
    redirect: '/pages/404',
    name: 'Pages',
    component: {
      render(c) { return c('router-view') }
    },
    children: [
      {
        path: '404',
        name: 'Page404',
        component: Page404
      },
      {
        path: '500',
        name: 'Page500',
        component: Page500
      },
      {
        path: 'login',
        name: 'Login',
        component: Login
      },
      {
        path: 'register',
        name: 'Register',
        component: Register
      }
    ]
  }
]