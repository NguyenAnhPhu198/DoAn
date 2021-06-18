<template>
  <Message :content="content" size="small" noTranslate />
</template>

<script>
import Message from "../Message.vue";
export default {
  components: {
    Message,
  },
  props: {
    content: {
      type: String,
      required: false,
    },
  },
};
</script>