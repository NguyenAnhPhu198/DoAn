<template>
  <CHeader with-subheader>
    <CRow class="w-100">
      <CCol md="4" lg="3" class="d-sm-down-none text-center align-self-center">
        <CHeaderBrand class="mx-auto" to="/">
          <CIcon name="logo" height="48" alt="Logo" />
        </CHeaderBrand>
      </CCol>
      <CCol sm="12" md="8" lg="9" class="pl-4">
        <CRow>
          <CHeaderNav class="pl-2">
            <slot name="prepend"></slot>
          </CHeaderNav>
          <CHeaderNav class="mr-auto" />
          <CHeaderNav>
            <TheHeaderDropdownLang class="px-3" />
            <TheHeaderDropdownCart class="px-3" />
            <TheHeaderDropdownOrders class="px-3" />
            <TheHeaderDropdownAccnt class="px-3" />
          </CHeaderNav>
        </CRow>
        <CRow>
          <CSubheader>
            <CHeaderNav class="mr-auto" style="overflow-x: auto">
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
          </CSubheader>
        </CRow>
      </CCol>
    </CRow>
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
::-webkit-scrollbar {
  height: 1px;
}
</style>
