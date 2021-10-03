const Home = () => import('../views/Home')
const MarketTomoni = () => import('../views/MarketTomoni')

export default [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/markets/tomoni',
    name: 'Tomoni market',
    component: MarketTomoni,
  },
]