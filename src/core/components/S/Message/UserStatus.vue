<template>
  <TMessageStatus
    :id="id"
    :statuses="statuses"
    :color="getBadge"
    :noTranslate="false"
  />
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
      validator: function (value) {
        return ["verified", "unverified", "disabled"].indexOf(value) !== -1;
      },
    },
  },
  computed: {
    statuses() {
      return [
        { id: "unverified", name: "Unverified" },
        { id: "verified", name: "Verified" },
        { id: "disabled", name: "Disabled" },
      ];
    },
    getBadge() {
      switch (this.id) {
        case "unverified":
          return "warning";
        case "verified":
          return "success";
        case "disabled":
          return "danger";
        default:
          return "secondary";
      }
    },
  },
};
</script>