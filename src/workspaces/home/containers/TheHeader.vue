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
          <CHeaderNav class="mr-auto">
            <CHeaderNavItem class="px-3">
              <CHeaderNavLink to="/" exact> Home </CHeaderNavLink>
            </CHeaderNavItem>
            <CHeaderNavItem class="px-3">
              <CHeaderNavLink to="/services" exact> Services </CHeaderNavLink>
            </CHeaderNavItem>
            <CHeaderNavItem class="px-3">
              <CHeaderNavLink to="/pricing" exact> Pricing </CHeaderNavLink>
            </CHeaderNavItem>
            <CHeaderNavItem class="px-3">
              <CHeaderNavLink to="/policies" exact> Policies </CHeaderNavLink>
            </CHeaderNavItem>
          </CHeaderNav>
          <CHeaderNav>
            <TheHeaderDropdownTasks class="px-3" />
            <TheHeaderDropdownAccnt class="px-3" />
          </CHeaderNav>

          <CSubheader class="px-2">
            <CToggler
              in-header
              class="d-lg-none"
              @click="$store.commit('sidebar.toggle_mobile')"
            />
            <CToggler
              in-header
              class="d-md-down-none"
              @click="$store.commit('sidebar.toggle_desktop')"
            />
          </CSubheader>
        </CRow>
      </CCol>
    </CRow>
  </CHeader>
</template>

<script>
import TheHeaderDropdownAccnt from "./TheHeaderDropdownAccnt";
import TheHeaderDropdownTasks from "./TheHeaderDropdownTasks";

export default {
  name: "TheHeader",
  components: {
    TheHeaderDropdownAccnt,
    TheHeaderDropdownTasks,
  },
};
</script>
