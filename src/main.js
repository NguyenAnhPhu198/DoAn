import 'core-js/stable'
import 'regenerator-runtime/runtime'
import Vue from 'vue'
import App from './App'
import core, { options } from '@/core'
import mixin from './mixins/component'

core.init()

import '@/core/components'

Vue.mixin(mixin);

new Vue({
  el: '#app',
  template: '<App/>',
  ...options,
  components: {
    App
  }
})
