<template>
  <CButton
    color="info"
    :variant="variant"
    :size="size"
    v-c-tooltip="{
      content: 'Save',
    }"
    @click="$emit('click')"
  >
    <CIcon name="cil-check" />
  </CButton>
</template>

<script>
import mixin from "./mixin";

export default {
  mixins: [mixin],
};
</script>