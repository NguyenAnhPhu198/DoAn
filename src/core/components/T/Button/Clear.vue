<template>
  <CButton
    v-bind="options"
    color="primary"
    :variant="variant"
    :size="size"
    v-c-tooltip="{
      content: 'Clear',
      appendToBody: true,
    }"
    @click="$emit('click')"
  >
    <CIcon name="cil-clear-all" />
  </CButton>
</template>

<script>
import mixin from "./mixin";

export default {
  mixins: [mixin],
};
</script>