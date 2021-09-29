<template>
  <CHeader class="home-header" with-subheader>
    <div class="header-top mx-3 mx-md-4">
      <CHeaderNav class="mr-auto d-md-none">
        <CHeaderBrand to="/">
          <CIcon
            src="https://tomoniglobal-dev.s3.ap-northeast-1.amazonaws.com/public/logo.png"
            height="20"
            alt="Logo"
          />
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
      <CHeaderBrand class="mr-auto ml-4 pl-1 d-sm-down-none" to="/">
        <CIcon
          src="https://tomoniglobal-dev.s3.ap-northeast-1.amazonaws.com/public/logo.png"
          height="48"
          alt="Logo"
        />
      </CHeaderBrand>
      <slot name="prepend"></slot>
      <CHeaderNav class="ml-auto" style="overflow-x: auto">
        <CNavItem>
          <CHeaderNavLink to="/" exact>
            <TMessage content="Home" noWrap uppercase />
          </CHeaderNavLink>
        </CNavItem>
        <CNavItem>
          <CHeaderNavLink to="/services" exact>
            <TMessage content="Services" noWrap uppercase />
          </CHeaderNavLink>
        </CNavItem>
        <CNavItem>
          <CHeaderNavLink to="/pricing" exact>
            <TMessage content="Pricing" noWrap uppercase />
          </CHeaderNavLink>
        </CNavItem>
        <CNavItem>
          <CHeaderNavLink to="/policies" exact>
            <TMessage content="Policies" noWrap uppercase />
          </CHeaderNavLink>
        </CNavItem>
      </CHeaderNav>
      <CHeaderNav class="mr-2 mr-md-4">
        <CNavItem class="c-vr" />
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
