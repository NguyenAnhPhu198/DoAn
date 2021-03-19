import Vue from 'vue'
import router from './router'
import store from './store'
import i18n from "./services/i18n"
import CoreuiVuePro from '@coreui/vue-pro'
// import CoreuiVuePro from '../node_modules/@coreui/vue-pro/src/index.js'
import { iconsSet as icons } from '@/assets/icons/icons.js'

export const options = {
  router,
  store,
  i18n,
  //CIcon component documentation: https://coreui.io/vue/docs/components/icon
  icons,
}

export default {
  init() {
    Vue.config.performance = true
    Vue.use(CoreuiVuePro)
    Vue.prototype.$log = console.log.bind(console)

  }
}