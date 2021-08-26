<template>
  <CButton
    color="primary"
    :variant="variant"
    :size="size"
    @click="$emit('click')"
    v-c-tooltip="{ content: 'Distribute', appendToBody: true }"
  >
    <CIcon name="cil-timeline" />
  </CButton>
</template>

<script>
import mixin from "@/core/components/T/Button/mixin";

export default {
  mixins: [mixin],
};
</script>