<template>
  <CSidebar
    :minimize="minimize"
    unfoldable
    :fixed="false"
    :show="show"
    colorScheme="light"
    @update:show="
      (value) => $store.commit('sidebar.set', ['sidebar_show', value])
    "
  >
    <CRenderFunction flat :contentToRender="navStructure" />
  </CSidebar>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "TheSidebar",
  watch: {
    permission_ids: function () {
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

<style lang="css" scoped>
@media (min-width: 1025px) {
  .c-sidebar {
    width: 100%;
  }
}
.c-sidebar.c-sidebar-light {
  border-right: none;
}
</style>