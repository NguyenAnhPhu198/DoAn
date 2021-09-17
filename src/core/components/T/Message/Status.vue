<template>
  <CBadge v-if="!noBadge" :color="color">
    <TMessage :content="name" :noTranslate="noTranslate" />
  </CBadge>
  <TMessage v-else :content="name" :noTranslate="noTranslate" />
</template>

<script>
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
    statuses: {
      type: Array,
      required: true,
    },
    color: {
      type: String,
      required: false,
    },
  },
  computed: {
    name() {
      const status = this.lodash.find(this.statuses, { id: this.id });
      if (!status) {
        return this.id;
      }
      return status.name;
    },
  },
};
</script>