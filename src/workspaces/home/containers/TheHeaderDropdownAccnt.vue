<template>
  <CDropdown
    v-if="meID"
    inNav
    class="c-header-nav-items"
    placement="bottom-end"
    add-menu-classes="pt-0"
  >
    <template #toggler>
      <CHeaderNavLink>
        <CIcon class="text-info" name="cil-user" /> {{ meID }}
      </CHeaderNavLink>
    </template>
    <CDropdownHeader tag="div" class="text-center" color="light">
      <strong>Workspaces</strong>
    </CDropdownHeader>
    <CDropdownItem to="/customer" exact> Account </CDropdownItem>
    <CDropdownItem to="/sale" exact> Sale </CDropdownItem>
    <CDropdownItem to="/purchase" exact> Purchase </CDropdownItem>
    <CDropdownItem to="/accounting" exact> Accounting </CDropdownItem>
    <CDropdownItem to="/warehouse" exact> Warehouse </CDropdownItem>
    <CDropdownDivider />
    <CDropdownItem @click="showIdToken">
      <CIcon class="text-info" name="cil-key" /> Get ID Token
    </CDropdownItem>
    <CDropdownItem @click="logout">
      <CIcon class="text-danger" name="cil-lock-locked" /> Logout
    </CDropdownItem>
  </CDropdown>
  <CHeaderNavLink v-else to="/login" exact>
    <CIcon name="cil-user" /> Login
  </CHeaderNavLink>
</template>

<script>
export default {
  name: "TheHeaderDropdownAccnt",
  data() {
    return {
      itemsCount: 42,
    };
  },
  methods: {
    showIdToken() {
      this.$store.dispatch("auth.me.idtoken.toast");
    },
    logout() {
      this.$store.dispatch("auth.logout").then(() => {
        this.$redirect.toLogin();
      });
    },
  },
};
</script>

<style scoped>
.c-icon {
  margin-right: 0.3rem;
}
</style>