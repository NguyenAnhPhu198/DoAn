import { mapGetters } from "vuex";
import lodash from '@/core/plugins/lodash';

export default {
  methods: {
    /**
     * Check has all permissions
     * 
     * @param  {...any} permissions 
     * @returns {Boolean}
     */
    hasPermissions: function (...permissions) {
      return lodash.hasAll(this.permission_ids, permissions)
    },

    /**
     * Check has any permissions
     * 
     * @param  {...any} permissions 
     * @returns 
     */
    hasAnyPermissions: function (...permissions) {
      return lodash.hasAny(this.permission_ids, permissions)
    },

    /**
     * 
     * @param {String} mode 
     * @returns 
     */
    visiableOn(mode) {
      return process.env.NODE_ENV == mode
    },
  },

  computed: {
    ...mapGetters({
      permission_ids: 'auth.me.permission_ids',
    }),
    meID() {
      return this.$store.getters["auth.me.id"];
    },
  },
}