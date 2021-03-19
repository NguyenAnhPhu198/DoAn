import Vue from "vue";
import Vuex from "vuex";

import sidebar from "./sidebar.module";
import nav from "./nav.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    sidebar,
    nav,
  }
});
