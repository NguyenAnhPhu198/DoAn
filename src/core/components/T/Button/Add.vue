<template>
  <CButton
    v-bind="options"
    color="info"
    :variant="variant"
    :size="size"
    @click="$emit('click')"
    v-c-tooltip="{ content: 'Add', appendToBody: true }"
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