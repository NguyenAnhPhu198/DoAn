<template>
  <TMessage :content="getContent()" color="muted" size="small" italic>
    <template #suffix v-if="slug">
      {{ `- [${slug}]` }}
    </template>
  </TMessage>
</template>

<script>
import TMessage from "../Message.vue";

export default {
  components: {
    TMessage,
  },
  props: {
    slug: {
      type: [String, Number],
      required: false,
    },
    color: {
      type: String,
      required: false,
      default: "muted",
    },
  },
  methods: {
    getContent() {
      if (!this.slug) {
        return "Empty";
      }
      return "Not found";
    },
  },
};
</script>