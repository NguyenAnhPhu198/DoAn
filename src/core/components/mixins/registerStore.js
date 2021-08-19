export default {
  storeModules: [],
  created() {
    this.registerStoreModules();
  },
  methods: {
    registerStoreModules() {
      this.lodash.each(this.$options.storeModules, (store, key) => {
        this.$store.registerModule(key, store);
      });
    },
  },
  destroyed() {
    this.lodash.each(this.$options.storeModules, (store, key) => {
      this.$store.unregisterModule(key);
    });
  },
}