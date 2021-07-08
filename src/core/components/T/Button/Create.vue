<template>
  <CButton
    color="info"
    :variant="variant"
    :size="size"
    @click="$emit('click')"
    v-c-tooltip="{ content: 'Create', appendToBody: true }"
  >
    <CIcon name="cil-plus" />
  </CButton>
</template>

<script>
import mixin from "./mixin";

export default {
  mixins: [mixin],
};
</script>