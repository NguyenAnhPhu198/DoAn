<template>
  <div></div>
</template>

<script>
import initServicesStore from "@/mixins/initStore";

export default {
  name: "InitStore",
  computed: {
    authId() {
      return this.$store.getters["auth.me.id"];
    },
  },
  methods: {
    initStore() {
      // init core store
      // this.$store.dispatch("auth.roles.fetch");
      // ...

      // init service store
      initServicesStore.forEach((resource) => {
        this.$store.dispatch(resource + ".fetch");
      });
    },
  },
  watch: {
    authId: {
      immediate: true,
      handler(newId) {
        if (newId) {
          this.initStore();
          //
        }
      },
    },
  },
};
</script>