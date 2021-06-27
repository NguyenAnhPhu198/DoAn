<template>
  <CButton
    class="py-0"
    color="info"
    variant="ghost"
    :size="size"
    @click="$emit('click')"
    v-c-tooltip="{ content: 'Edit' }"
    shape="pill"
  >
    <CIcon name="cil-pencil" size="sm" />
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