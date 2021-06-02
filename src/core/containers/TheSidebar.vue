<template>
  <CSidebar
    :minimize="minimize"
    unfoldable
    :show="show"
    @update:show="
      (value) => $store.commit('sidebar.set', ['sidebar_show', value])
    "
  >
    <CSidebarBrand class="d-md-down-none" to="/">
      <CIcon
        class="c-sidebar-brand-full"
        name="logo"
        size="custom-size"
        :height="35"
        viewBox="0 0 642 134"
      />
      <CIcon
        class="c-sidebar-brand-minimized"
        name="logo"
        size="custom-size"
        :height="35"
        viewBox="0 0 110 134"
      />
    </CSidebarBrand>
    <CRenderFunction flat :contentToRender="navStructure" />
    <CSidebarMinimizer
      class="c-d-md-down-none"
      @click.native="$store.commit('sidebar.toggle', 'sidebar_minimize')"
    />
  </CSidebar>
</template>

<script>
import items from "./nav";
import { mapGetters } from "vuex";

export default {
  name: "TheSidebar",
  created() {
    this.$store.dispatch("nav.set", items);
  },
  watch: {
    flattenPermissions: function () {
      this.$store.dispatch("nav.available.refresh");
    },
  },
  computed: {
    ...mapGetters({
      navStructure: "nav.structure",
    }),
    show() {
      return this.$store.state.sidebar.sidebar_show;
    },
    minimize() {
      return this.$store.state.sidebar.sidebar_minimize;
    },
  },
};
</script>

