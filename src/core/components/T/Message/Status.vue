<template>
  <CBadge v-if="!noBadge" :color="getBadge">
    <Message :content="name" />
  </CBadge>
  <Message v-else :content="name" />
</template>

<script>
import { mapGetters } from "vuex";
import Message from "../Message.vue";

export default {
  components: {
    Message,
  },
  props: {
    id: {
      type: String,
      required: false,
    },
    noBadge: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    ...mapGetters({
      statuses: "order.statuses.list",
    }),
    name() {
      const status = this.lodash.find(this.statuses, { id: this.id });
      if (!status) {
        return null;
      }
      return status.name;
    },
    getBadge() {
      switch (this.id) {
        case "Newish":
          return "secondary";
        case "Finish":
          return "success";
        case "Cancelled":
          return "danger";
        default:
          return "warning";
      }
    },
  },
};
</script>