<template>
  <CBadge :color="getColor">
    {{ $t(getStatus) }}
  </CBadge>
</template>

<script>
export default {
  props: {
    status: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  computed: {
    getColor() {
      return this.status ? "success" : "danger";
    },
    getStatus() {
      return this.status ? "verified" : "unverified";
    },
  },
};
</script>