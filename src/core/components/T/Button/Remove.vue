<template>
  <CButton
    color="danger"
    :variant="variant"
    :size="size"
    @click="$emit('click')"
    v-c-tooltip="{ content: 'Delete', appendToBody: true }"
  >
    <CIcon name="cil-delete" />
  </CButton>
</template>

<script>
import mixin from "./mixin";

export default {
  mixins: [mixin],
};
</script>