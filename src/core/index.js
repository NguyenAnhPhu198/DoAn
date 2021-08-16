import Vue from 'vue'
import router from './router'
import store from './store'
import i18n from "./plugins/i18n"
import CoreuiVuePro from '@coreui/vue-pro'
// import CoreuiVuePro from '../node_modules/@coreui/vue-pro/src/index.js'
import { iconsSet as icons } from '@/assets/icons/icons.js'
import mixin from "./components/mixin"
import firebaseAuth from './services/firebase/auth'
import redirect from './plugins/redirect'
import tomoni from './services/tomoni'
import lodash from './plugins/lodash'
import VueLodash from 'vue-lodash'

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

    Vue.mixin(mixin);

    Vue.use({
      install(Vue) {
        Vue.prototype.$redirect = redirect;
      }
    });

    Vue.use({
      install(Vue) {
        Vue.prototype.$tomoni = tomoni;
      }
    });

    Vue.use({
      install(Vue) {
        Vue.prototype.$auth = firebaseAuth;
      }
    });
  }
}