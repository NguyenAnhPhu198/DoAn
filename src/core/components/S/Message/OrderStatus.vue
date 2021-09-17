<template>
  <TMessageStatus :id="id" :statuses="statuses" :color="getBadge" />
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
      statuses: "order.statuses.list",
    }),
    getBadge() {
      switch (this.id) {
        case "Newish":
          return "dark";
        case "Paid":
        case "Finish":
          return "success";
        case "OutOfStock":
        case "Cancelled":
          return "danger";
        default:
          return "warning";
      }
    },
  },
};
</script>