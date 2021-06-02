export default [
  {
    _name: "CSidebarNavTitle",
    _children: ["Auth"],
    any_permissions: ['users.index']
  },
  {
    _name: "CSidebarNavItem",
    name: "Users",
    to: "/users",
    icon: "cil-people",
    permissions: ['users.index'],
  },
]