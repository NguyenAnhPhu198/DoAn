<template>
  <div
    class="c-app"
    :class="{ 'c-dark-theme': $store.state.sidebar.sidebar_dark_mode }"
  >
    <CWrapper>
      <TheHeader>
        <template #prepend>
          <CToggler
            in-header
            class="d-lg-none"
            @click="$store.commit('sidebar.toggle_mobile')"
          />
        </template>
      </TheHeader>
      <div class="c-body">
        <main class="c-main">
          <CContainer fluid class="container-customer">
            <CRow>
              <CCol md="3">
                <TheSidebar />
              </CCol>
              <CCol col="12" lg="9">
                <transition name="fade" mode="out-in">
                  <router-view :key="$route.path"></router-view>
                </transition>
              </CCol>
            </CRow>
          </CContainer>
        </main>
      </div>
      <TheFooter />
    </CWrapper>
  </div>
</template>

<script>
import TheHeader from "../../home/containers/TheHeader.vue";
import TheFooter from "@/containers/TheFooter";
import navItems from "../mixins/nav";
import modules from "../store";
import Vue from "vue";
import mixin from "../mixins/component";
import authenMixin from "@/core/components/mixins/authentication";
import registerStoreMixin from "@/core/components/mixins/registerStore";
import TheSidebar from "./TheSidebar.vue";

Vue.mixin(mixin);

export default {
  name: "TheCustomerContainer",
  mixins: [authenMixin, registerStoreMixin],
  components: {
    TheHeader,
    TheFooter,
    TheSidebar,
  },
  storeModules: modules,
  created() {
    this.$store.dispatch("nav.set", navItems);
    this.$store.dispatch("auth.addresses.fetch");
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
.container-customer {
  @import "../assets/scss/style";
}
</style>
