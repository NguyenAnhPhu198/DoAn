export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    show: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      required: false,
    },
    creating: {
      type: Boolean,
      default: false,
    },
  },
};
