<template>
  <CBadge :color="getColor">
    {{ $t(getType) }}
  </CBadge>
</template>

<script>
export default {
  props: {
    type: {
      type: Boolean,
      required: false,
    },
  },
  computed: {
    getColor(){
      return this.type ? "success" : "danger";
    },
    getType() {
      return this.type ? "Email verified" : "Email unverified";
    },
  },
};
</script>