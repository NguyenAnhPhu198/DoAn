<template>
  <CButton
    class="py-0"
    color="secondary"
    variant="ghost"
    :size="size"
    @click="$emit('click')"
    v-c-tooltip="{ content: 'Close' }"
  >
    <CIcon name="cil-arrow-left" :size="size" />
  </CButton>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      required: false,
      default: "sm",
    },
  },
};
</script>