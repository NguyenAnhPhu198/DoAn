<template>
  <CButton
    v-bind="options"
    color="primary"
    :variant="variant"
    :size="size"
    @click="$emit('click')"
  >
    <CIcon name="cil-magnifying-glass" />
  </CButton>
</template>

<script>
import mixin from "./mixin";

export default {
  mixins: [mixin],
};
</script>