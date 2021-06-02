<template>
  <div></div>
</template>

<script>
import initServicesStore from "@/config/initStore";

export default {
  name: "InitStore",
  computed: {
    authId() {
      return this.$store.getters["auth.user"].id;
    },
  },
  methods: {
    initStore() {
      // init core store
      this.$store.dispatch("auth.flatten_permissions.fetch");
      this.$store.dispatch("auth.roles.fetch");
      this.$store.dispatch("auth.user_statuses.fetch");
      // ...

      // init service store
      initServicesStore.forEach((resource) => {
        this.$store.dispatch(resource + ".fetch");
      });
    },
  },
  watch: {
    immediate: true,
    authId(newId) {
      if (newId) {
        this.initStore();
        //
      }
    },
  },
};
</script>