import Vuex from "vuex";
import Vue from 'vue'

import sidebar from "./sidebar";
import nav from "./nav";
import auth from "./auth";
import toasts from "./toasts";
import errors from "./errors";
import modules from '@/store'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    sidebar,
    nav,
    auth,
    toasts,
    errors,
    ...modules,
  }
});
