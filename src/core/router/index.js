import Vue from "vue";
import Router from "vue-router";
import store from "../store";
import redirect from "@/core/plugins/redirect";

import defaultPublicRoutes from "./public";
import serviceRoutes from "@/mixins/routes";

Vue.use(Router);

const routes = [...serviceRoutes, ...defaultPublicRoutes];

const router = new Router({
  mode: "hash", // https://router.vuejs.org/api/#mode
  linkActiveClass: "open active",
  scrollBehavior: () => ({ y: 0 }),
  routes: routes
});

// Before each route evaluates...
router.beforeEach((routeTo, routeFrom, next) => {
  /*
   * Check if auth is required on this route
   * (including nested routes).
   */
  const authRequired = routeTo.matched.some(route => route.meta.authRequired);
  const verifyRequired = routeTo.matched.some(
    route => route.meta.verifyRequired
  );
  // If auth isn't required for the route, just continue.
  if (!authRequired) {
    return next();
  }

  if (authRequired) {
    if (verifyRequired) {
      store.dispatch("auth.verify").then(() => {
        return next();
      })
        .catch(error => {
          store.dispatch("errors.push", { error, notify: true });
          redirect.toLogin();
        });
    } else {
      store.dispatch("auth.authenticated").then(() => {
        return next();
      })
        .catch(error => {
          store.dispatch("errors.push", { error, notify: true });
          redirect.toLogin();
        });
    }
  }
});

router.afterEach(to => {
  /**
   *
   */
  store.dispatch("auth.authenticate");

  /*
   * Use next tick to handle router history correctly
   * see: https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
   */
  Vue.nextTick(() => {
    document.title =
      process.env.VUE_APP_NAME + " - " + (to.meta.title || to.name);
  });
});

export default router;
