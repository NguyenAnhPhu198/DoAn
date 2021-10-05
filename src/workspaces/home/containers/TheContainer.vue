<template>
  <div
    class="c-app"
    :class="{ 'c-dark-theme': $store.state.sidebar.sidebar_dark_mode }"
  >
    <CWrapper>
      <TheHeader />
      <div class="c-body">
        <main class="c-main">
          <CContainer fluid class="container-home">
            <transition name="fade" mode="out-in">
              <router-view :key="$route.path"></router-view>
            </transition>
          </CContainer>
        </main>
      </div>
      <TheFooter />
    </CWrapper>
  </div>
</template>

<script>
import TheHeader from "./TheHeader";
import TheFooter from "@/containers/TheFooter";
import navItems from "../mixins/nav";
import modules from "../store";
import Vue from "vue";
import mixin from "../mixins/component";
import authenMixin from "@/core/components/mixins/authentication";
import registerStoreMixin from "@/core/components/mixins/registerStore";

Vue.mixin(mixin);

export default {
  name: "TheHomeContainer",
  mixins: [authenMixin, registerStoreMixin],
  components: {
    TheHeader,
    TheFooter,
  },
  storeModules: modules,
  created() {
    this.$store.dispatch("nav.set", navItems);
    this.$store.dispatch("product.suggest_products.fetch.if-first-time");
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

<style lang="scss">
// Import main styles for this container
.container-home {
  max-width: 1400px;
  @import "../assets/scss/style";
}
</style>
