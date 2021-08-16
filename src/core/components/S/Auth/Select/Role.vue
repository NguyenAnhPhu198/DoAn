<template>
  <CSelect
    :key="key"
    :options="lodash.normalizeCSelect(list)"
    :value="value"
    @update:value="$emit('update:value', $event.id)"
    @change="$emit('change')"
    class="m-0"
  />
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: "",
    },
    prepend: {
      type: Array,
      required: false,
      default: function () {
        return [{ id: "", name: "(All)" }];
      },
    },
  },
  data() {
    return {
      key: "cselectkey",
    };
  },
  watch: {
    value(value) {
      if (!value) {
        this.key = this.lodash.random(10000, 100000);
      }
    },
  },
  computed: {
    list() {
      return [
        ...this.prepend,
        ...this.$store.getters["auth.roles.list"],
      ];
    },
  },
};
</script>