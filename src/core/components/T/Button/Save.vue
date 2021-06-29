<template>
  <CButton
    color="info"
    variant="ghost"
    :size="size"
    v-c-tooltip="{
      content: 'Save',
    }"
    @click="$emit('click')"
  >
    <CIcon name="cil-check" />
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