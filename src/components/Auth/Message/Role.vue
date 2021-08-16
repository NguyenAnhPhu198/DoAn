<template>
  <TLink :id="id" resource="roles" :content="name" />
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    id: {
      type: String,
      required: false,
    },
  },
  computed: {
    ...mapGetters({
      roles: "auth.roles.list",
    }),
    name() {
      const status = this.lodash.find(this.roles, { id: this.id });
      if (!status) {
        return this.id;
      }
      return status.name;
    },
  },
};
</script>