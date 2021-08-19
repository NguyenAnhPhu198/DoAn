<template>
  <div
    class="c-app"
    :class="{ 'c-dark-theme': $store.state.sidebar.sidebar_dark_mode }"
  >
    <TheSidebar />
    <TheAside />
    <CWrapper>
      <TheHeader />
      <div class="c-body">
        <main class="c-main">
          <CContainer fluid class="container-sale">
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
import TheSidebar from "@/containers/TheSidebar";
import TheHeader from "@/containers/TheHeader";
import TheFooter from "@/containers/TheFooter";
import TheAside from "@/containers/TheAside";
import navItems from "../mixins/nav";
import modules from "../store";
import Vue from "vue";
import mixin from "../mixins/component";
import authenMixin from "@/core/components/mixins/authentication";
import registerStoreMixin from "@/core/components/mixins/registerStore";

Vue.mixin(mixin);

export default {
  name: "TheSaleContainer",
  mixins: [authenMixin, registerStoreMixin],
  components: {
    TheSidebar,
    TheHeader,
    TheFooter,
    TheAside,
  },
  storeModules: modules,
  created() {
    this.$store.dispatch("nav.set", navItems);
  },
  methods: {
    onMeChanged() {},
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
.container-sale {
  @import "../assets/scss/style";
}
</style>
