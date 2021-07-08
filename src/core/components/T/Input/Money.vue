<template>
  <MaskedInput
    class="form-control"
    :value="input"
    :mask="lodash.moneyMask({ noSymbol: true })"
    :guide="false"
    @input="setValue"
    placeholder="0"
  />
</template>

<script>
import MaskedInput from "vue-text-mask";

export default {
  components: {
    MaskedInput,
  },
  props: {
    value: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  computed: {
    input() {
      return this.value ? this.value.toString() : "";
    },
  },
  methods: {
    setValue(value) {
      this.$emit(
        "update:value",
        Number.parseFloat(this.lodash.replace(value, /[^0-9.]/g, "")) || 0
      );
    },
  },
};
</script>