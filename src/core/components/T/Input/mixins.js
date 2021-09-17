export default {
  props: {
    value: {
      type: [String, Number],
      required: false,
    },
    inputOptions: {
      type: Object,
      required: false,
    },
    placeholder: {
      type: String,
      required: false
    },
    label: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      input: this.value,
    }
  },
  methods: {
    getLabel() {
      if (this.label) {
        return this.$t(this.label) || "...";
      }
      return null;
    },
    setInput(input) {
      this.$emit('update:value', input)
      this.input = input;
    },
  },
};
