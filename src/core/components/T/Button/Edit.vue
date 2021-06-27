<template>
  <CButton
    class="py-0"
    color="info"
    variant="ghost"
    :size="size"
    @click="$emit('click')"
    v-c-tooltip="{ content: 'Edit', appendToBody: true }"
  >
    <CIcon name="cil-pencil" :size="size" />
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