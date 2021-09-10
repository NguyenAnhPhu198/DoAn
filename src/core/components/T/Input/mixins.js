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
  methods: {
    getLabel() {
      return this.$t(this.label) || "...";
    }
  }
};
