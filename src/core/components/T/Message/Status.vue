<template>
  <CBadge v-if="!noBadge" :color="getBadge" :noTranslate="noTranslate">
    <TMessage :content="name" />
  </CBadge>
  <TMessage v-else :content="name" />
</template>

<script>
import { mapGetters } from "vuex";
import TMessage from "../Message.vue";

export default {
  components: {
    TMessage,
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
    noTranslate: {
      type: Boolean,
      required: false,
      default: true,
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