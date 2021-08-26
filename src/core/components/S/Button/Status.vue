<template>
  <CButton
    :color="color"
    variant="outline"
    size="sm"
    class="ml-1"
    @click="$emit('click')"
    :disabled="disabled"
  >
    <TMessage :content="name" noTranslate />
  </CButton>
</template>

<script>
import TMessage from "@/core/components/T/Message.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    TMessage,
  },
  props: {
    id: {
      type: String,
      required: false,
    },
    noTranslate: {
      type: Boolean,
      required: false,
      default: true,
    },
    disabled: {
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
        return this.id;
      }
      return status.name;
    },
    color() {
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