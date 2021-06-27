<template>
  <CButton
    class="py-0"
    color="danger"
    variant="ghost"
    :size="size"
    @click="$emit('click')"
    v-c-tooltip="{ content: 'Delete' }"
    shape="pill"
  >
    <CIcon name="cil-delete" size="sm" />
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