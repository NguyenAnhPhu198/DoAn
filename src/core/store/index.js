import Vue from "vue";
import Vuex from "vuex";

import sidebar from "./sidebar";
import nav from "./nav";
import auth from "./auth";
import toasts from "./toasts";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    sidebar,
    nav,
    auth,
    toasts,
  }
});
