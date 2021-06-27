<template>
  <CButton
    color="info"
    variant="ghost"
    :size="size"
    v-c-tooltip="{
      content: 'Clear',
      appendToBody: true,
    }"
    @click="$emit('click')"
  >
    <CIcon name="cil-clear-all" />
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