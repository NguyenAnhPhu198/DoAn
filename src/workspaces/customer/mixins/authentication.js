export default {
  computed: {
    auth() {
      return this.$store.getters["auth.me"];
    },
  },
  created() {
    this.$store.dispatch("auth.me");
  },
}