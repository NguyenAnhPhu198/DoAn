export default [
  {
    _name: "CSidebarNavItem",
    name: "Dashboard",
    to: "/sale/dashboard",
    icon: "cil-speedometer",
    badge: {
      color: "primary",
      text: "NEW",
    },
  },
  {
    _name: "CSidebarNavTitle",
    _children: ["Orders"],
    any_permissions: ['orders.index']
  },
  {
    _name: "CSidebarNavItem",
    name: "Retail",
    to: "/order/orders/retail",
    icon: "cil-library-books",
    permissions: ['orders.retail.index'],
  },
  {
    _name: "CSidebarNavItem",
    name: "Wholesale",
    to: "/order/orders/wholesale",
    icon: "cil-library-books",
    permissions: ['orders.wholesale.index'],
  },
  {
    _name: "CSidebarNavItem",
    name: "Shipment",
    to: "/order/orders/shipment",
    icon: "cil-library-books",
    permissions: ['orders.shipment.index'],
  },
]