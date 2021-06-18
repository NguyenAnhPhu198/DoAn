<template>
  <CButton
    color="info"
    variant="ghost"
    size="sm"
    v-c-tooltip="tooltipOption()"
    @click="$emit('click')"
  >
    <CIcon name="cil-clear-all" />
  </CButton>
</template>

<script>
export default {
  props: {
    tooltip: {
      type: String,
      required: false,
      default: "Reset filter",
    },
  },
  methods: {
    tooltipOption() {
      return {
        content: this.tooltip,
        appendToBody: true,
      };
    },
  },
};
</script>