export default [
  {
    _name: "CSidebarNavItem",
    name: "Dashboard",
    to: "/admin/dashboard",
    icon: "cil-speedometer",
    badge: {
      color: "primary",
      text: "NEW",
    },
  },
  {
    _name: "CSidebarNavTitle",
    _children: ["Users"],
    any_permissions: ['users.index'],
  },
  {
    _name: "CSidebarNavItem",
    name: "Users",
    to: "/admin/users",
    icon: "cil-people",
    permissions: ['users.index'],
  },
]
