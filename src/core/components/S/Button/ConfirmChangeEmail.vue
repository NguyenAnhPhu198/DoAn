<template>
  <CButton :color="color" @click="$emit('click')">
    {{ $t(content) }}
  </CButton>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      required: false,
    },
    content: {
      type: String,
      required: false,
    },
  },
};
</script>