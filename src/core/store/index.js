import Vue from "vue";
import Vuex from "vuex";

import sidebar from "./sidebar";
import nav from "./nav";
import auth from "./auth";
import toasts from "./toasts";
import errors from "./errors";
import users from "./auth/users";
import roles from "./auth/roles";
import user_statuses from "./auth/user_statuses";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    sidebar,
    nav,
    auth,
    toasts,
    errors,
    users,
    roles,
    user_statuses,
  }
});
