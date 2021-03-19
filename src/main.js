import 'core-js/stable'
import Vue from 'vue'
import App from './App'
import core, { options } from '@/core'

core.init()

new Vue({
  el: '#app',
  template: '<App/>',
  ...options,
  components: {
    App
  }
})
