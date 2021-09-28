<template>
  <CButton
    v-bind="options"
    color="dark"
    :variant="variant"
    :size="size"
    @click="$emit('click')"
    v-c-tooltip="{ content: 'Close' }"
  >
    <CIcon name="cil-arrow-left" />
  </CButton>
</template>

<script>
import mixin from "./mixin";

export default {
  mixins: [mixin],
};
</script>