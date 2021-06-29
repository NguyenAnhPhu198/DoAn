<template>
  <MaskedInput
    class="form-control"
    v-model="input"
    :mask="lodash.moneyMask({ currency: 'JPY', noSymbol: true })"
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
  data() {
    return {
      input: this.value ? this.value.toString() : "",
    };
  },
  methods: {
    setValue(value) {
      this.$emit(
        "input",
        Number.parseFloat(this.lodash.replace(value, /[^0-9.]/g, "")) || 0
      );
    },
  },
};
</script>