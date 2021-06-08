<template>
  <CPagination
    align="center"
    :pages="paginate.last"
    :active-page.sync="paginate.current"
    @update:activePage="pageChange"
  />
</template>

<script>
export default {
  props: {
    store: {
      type: String,
      required: true,
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler(route) {
        if (route.query && route.query.page) {
          this.$store.dispatch(
            `${this.store}.change-page`,
            Number(route.query.page)
          );
        } else {
          this.$store.dispatch(`${this.store}.fetch.if-first-time`);
        }
      },
    },
  },
  computed: {
    paginate() {
      return this.$store.getters[this.store + ".paginate"];
    },
  },
  methods: {
    pageChange(val) {
      this.$router.push({ query: { page: val } });
    },
  },
};
</script>
