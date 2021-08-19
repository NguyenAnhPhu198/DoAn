export default [
  {
    _name: "CSidebarNavItem",
    name: "Dashboard",
    to: "/purchase/dashboard",
    icon: "cil-speedometer",
    badge: {
      color: "primary",
      text: "NEW",
    },
  },
  {
    _name: "CSidebarNavTitle",
    _children: ["Purchase"],
    any_permissions: ['orders.purchase.index']
  },
  {
    _name: "CSidebarNavItem",
    name: "Purchases",
    to: "/purchase/purchases",
    icon: "cil-library-books",
    permissions: ['orders.purchase.index'],
  },
  {
    _name: "CSidebarNavTitle",
    _children: ["Auth"],
    any_permissions: ['users.index'],
  },
  {
    _name: "CSidebarNavItem",
    name: "Users",
    to: "/purchase/users",
    icon: "cil-people",
    permissions: ['users.index'],
  },
]