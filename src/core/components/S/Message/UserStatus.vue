<template>
  <CBadge v-if="!disabled" :color="getColor">
    {{ $t(getStatus) }}
  </CBadge>
</template>

<script>
export default {
  props: {
    status: {
      type: Boolean,
      required: false,
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    getColor(){
      return this.status ? "success" : "danger";
    },
    getStatus() {
      return this.status ? "Verified" : "Disabled";
    },
  },
};
</script>