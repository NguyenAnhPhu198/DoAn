export default {
  props: {
    size: {
      type: String,
      required: false,
      default: "sm",
    },
    variant: {
      type: String,
      required: false,
      default: "ghost",
    },
    options: {
      type: Object,
      required: false,
    }
  },
}