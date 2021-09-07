<template>
  <div>
    <UserInfoDetail />
    <ChangePassword />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ChangePassword from "./components/ChangePassword.vue";
import UserInfoDetail from "./components/UserInfoDetail.vue";
export default {
  components: {
    UserInfoDetail,
    ChangePassword,
  },
  computed: {
    ...mapGetters({
      auth: "auth.me",
    }),
  },
};
</script>

<style lang="css" scoped>
</style>