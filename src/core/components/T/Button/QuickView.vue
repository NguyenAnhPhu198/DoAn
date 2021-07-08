<template>
  <CButton
    color="info"
    :variant="variant"
    :size="size"
    @click="$emit('click')"
    v-c-tooltip="{ content: 'Quick view', appendToBody: true }"
  >
    <CIcon name="cil-fullscreen" />
  </CButton>
</template>

<script>
import mixin from "./mixin";

export default {
  mixins: [mixin],
};
</script>