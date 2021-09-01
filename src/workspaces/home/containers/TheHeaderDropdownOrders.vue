<template>
  <CDropdown
    v-if="meID"
    :caret="false"
    placement="bottom-end"
    in-nav
    class="c-header-nav-item mx-2"
    add-menu-classes="pt-0"
  >
    <template #toggler>
      <CHeaderNavLink>
        <CIcon size="lg" name="cil-description" />
        <CBadge shape="pill" color="info">{{ itemsCount }}</CBadge>
      </CHeaderNavLink>
    </template>
    <CDropdownHeader tag="div" class="text-center bg-light">
      <strong>You have {{ itemsCount }} incomplete orders</strong>
    </CDropdownHeader>

    <SCardOrder v-for="i in itemsCount" :key="i" :id="i" />

    <CDropdownItem to="/customer/orders" exact class="text-center border-top">
      View all orders
    </CDropdownItem>
  </CDropdown>
</template>
<script>
export default {
  name: "TheHeaderDropdownTasks",
  data() {
    return { itemsCount: 3 };
  },
};
</script>
