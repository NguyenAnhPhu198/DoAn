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
    <CSubheader class="header-mid flex-nowrap scroll-hidden">
      <CHeaderBrand class="ml-4 pl-1 d-sm-down-none" to="/">
        <CIcon :src="`${assets_url}/logo.png`" height="48" alt="Logo" />
      </CHeaderBrand>
      <slot name="prepend"></slot>
      <CHeaderNav class="mx-auto" style="overflow-x: auto">
        <SSearchProduct style="width: 50vw" :options="markets" />
      </CHeaderNav>
      <CHeaderNav class="mr-2 mr-md-4">
        <TheHeaderDropdownCart class="px-3 px-lg-4" />
        <CNavItem v-if="meID" class="c-vr" />
        <TheHeaderDropdownOrders class="px-3 px-lg-4" />
      </CHeaderNav>
    </CSubheader>
    <CSubheader class="header-end flex-nowrap scroll-hidden">
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
      markets: [
        {
          value: "tomoni",
          label: "Tomoni Market",
          placeholder: "Name or jancode of product you want to search",
          default: true,
        },
        {
          value: "yshopping",
          label: "Y! Shopping",
          placeholder: "Link or name of product you want to search",
        },
        {
          value: "yaction",
          label: "Y! Auction",
          placeholder: "Link or name of product you want to search",
        },
        {
          value: "rakuten",
          label: "Rakuten",
          placeholder: "Link or name of product you want to search",
        },
      ],
    };
  },
};
</script>

<style lang="css" scoped>
.c-subheader,
.c-header-nav {
  min-height: auto;
}

.home-header .header-mid {
  height: 70px;
}

.home-header .header-end {
  height: 45px;
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
