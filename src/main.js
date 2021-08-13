import 'core-js/stable'
import 'regenerator-runtime/runtime'
import Vue from 'vue'
import App from './App'
import core, { options } from '@/core'

core.init()

import '@/core/components'
import '@/components'

new Vue({
  el: '#app',
  template: '<App/>',
  ...options,
  components: {
    App
  }
})
