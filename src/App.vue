<template>
  <div>
    <router-view></router-view>
    <Toast />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="scss">
// Import core styles for this application
@import "@/core/assets/scss/style";
// Import main styles for this application
@import "@/assets/scss/style";
</style>
