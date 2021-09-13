<template>
  <CBadge :color="getColor">
    {{ $t(status) }}
  </CBadge>
</template>

<script>
export default {
  props: {
    status: {
      type: String,
      required: true,
      validator: function (value) {
        return ["verified", "unverified", "disabled"].indexOf(value) !== -1;
      },
    },
  },
  computed: {
    getColor() {
      switch (this.status) {
        case "verified":
          return "success";
        case "unverified":
          return "danger";
        default:
          return "secondary";
      }
    },
  },
};
</script>