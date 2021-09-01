export default [
  {
    _name: "CSidebarNavItem",
    name: "User info",
    to: "/customer",
    icon: "cil-user",
  },
  {
    _name: "CSidebarNavItem",
    name: "Orders",
    to: "/customer/orders",
    icon: "cil-library-books",
    badge: {
      color: "primary",
      text: "1",
    },
  },
  {
    _name: "CSidebarNavItem",
    name: "Address",
    to: "/customer/address",
    icon: "cil-map",
  },
]