import { mapGetters } from "vuex";
import lodash from '@/core/plugins/lodash';

export default {
  methods: {
    hasPermissions: function (...permissions) {
      return lodash.hasAll(this.flattenPermissions, permissions)
    },
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