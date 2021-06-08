export default [
  {
    _name: "CSidebarNavTitle",
    _children: ["Purchase"],
    any_permissions: ['orders.purchase.index']
  },
  {
    _name: "CSidebarNavItem",
    name: "Purchases",
    to: "/purchases",
    icon: "cil-library-books",
    permissions: ['orders.purchase.index'],
  },
]