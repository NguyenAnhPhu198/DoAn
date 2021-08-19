export default {
  computed: {
    meID() {
      return this.$store.getters["auth.me.id"];
    },
  },
  beforeMount() {
    this.$watch('meID', (newId) => {
      this.onMeChanged(newId);
    }, { immediate: true })
  },
  methods: {
    onMeChanged(id) {
      console.log(id + ' logged in');
    }
  }
}