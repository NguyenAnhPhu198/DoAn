import Vue from 'vue'
import router from './router'
import store from './store'
import i18n from "./plugins/i18n"
import CoreuiVuePro from '@coreui/vue-pro'
// import CoreuiVuePro from '../node_modules/@coreui/vue-pro/src/index.js'
import { iconsSet as icons } from '@/assets/icons/icons.js'
import VueLodash from 'vue-lodash'
import lodash from './plugins/lodash'
import VueI18n from 'vue-i18n'

export const options = {
  router,
  store,
  //CIcon component documentation: https://coreui.io/vue/docs/components/icon
  icons,
  i18n,
}

export default {
  init() {
    Vue.config.performance = true
    Vue.use(CoreuiVuePro)
    Vue.prototype.$log = console.log.bind(console)

    Vue.use(VueLodash, { lodash: lodash })
    Vue.use(VueI18n)

  }
}