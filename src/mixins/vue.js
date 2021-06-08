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
      return lodash.hasAll(this.flattenPermissions, permissions)
    },

    /**
     * Check has any permissions
     * 
     * @param  {...any} permissions 
     * @returns 
     */
    hasAnyPermissions: function (...permissions) {
      return lodash.hasAny(this.flattenPermissions, permissions)
    },
  },

  computed: {
    ...mapGetters({
      flattenPermissions: 'auth.flatten_permissions',
    }),
  },
}