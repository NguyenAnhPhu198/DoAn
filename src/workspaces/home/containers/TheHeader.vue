<template>
  <CHeader class="home-header" with-subheader>
    <div class="header-top mx-3 mx-md-4">
      <CHeaderNav class="mr-auto d-md-none">
        <CHeaderBrand to="/">
          <CIcon :src="`${assets_url}/logo.png`" height="20" alt="Logo" />
        </CHeaderBrand>
      </CHeaderNav>
      <CHeaderNav class="mr-md-auto">
        <TheHeaderDropdownLang />
      </CHeaderNav>
      <CHeaderNav>
        <TheHeaderDropdownAccnt />
      </CHeaderNav>
    </div>
    <CSubheader class="flex-nowrap scroll-hidden">
      <CHeaderBrand class="ml-4 pl-1 d-sm-down-none" to="/">
        <CIcon :src="`${assets_url}/logo.png`" height="48" alt="Logo" />
      </CHeaderBrand>
      <slot name="prepend"></slot>
      <CHeaderNav class="mx-auto" style="overflow-x: auto">
        <SMessageMarket name="Tomoni market" to="/" icon="logo-sm" />
        <SMessageMarket
          name="Y!Auction"
          to="/market/y-auction"
          icon="logo-yauction-sm"
        />
        <SMessageMarket
          name="Y!Shopping"
          to="/market/y-shopping"
          icon="logo-yshopping-sm"
        />
        <SMessageMarket
          name="Rakuten"
          to="/market/rakuten"
          icon="logo-rakuten-sm"
        />
        <SMessageMarket
          name="Amazon"
          to="/market/amazon"
          icon="logo-amazon-sm"
        />
      </CHeaderNav>
      <CHeaderNav class="mr-2 mr-md-4">
        <TheHeaderDropdownCart class="px-3 px-lg-4" />
        <CNavItem v-if="meID" class="c-vr" />
        <TheHeaderDropdownOrders class="px-3 px-lg-4" />
      </CHeaderNav>
    </CSubheader>
  </CHeader>
</template>

<script>
import TheHeaderDropdownAccnt from "./TheHeaderDropdownAccnt";
import TheHeaderDropdownOrders from "./TheHeaderDropdownOrders";
import TheHeaderDropdownCart from "./TheHeaderDropdownCart";
import TheHeaderDropdownLang from "@/containers/TheHeaderDropdownLang";

export default {
  name: "TheHeader",
  components: {
    TheHeaderDropdownAccnt,
    TheHeaderDropdownOrders,
    TheHeaderDropdownCart,
    TheHeaderDropdownLang,
  },
  data() {
    return {
      assets_url: process.env.VUE_APP_ASSETS_URL,
    };
  },
};
</script>

<style lang="css" scoped>
.home-header .c-subheader {
  height: 70px;
}

.home-header .header-top {
  width: 100%;
  display: flex;
}

.home-header .header-top .c-header-nav {
  min-height: 35px;
  height: 35px;
}
</style>
