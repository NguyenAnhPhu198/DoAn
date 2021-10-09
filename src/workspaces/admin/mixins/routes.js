const Users = () => import("../views/users/Index");
const User = () => import("../views/users/Detail");

export default [
  {
    path: "users",
    meta: { label: "Users" },
    component: {
      render(c) {
        return c("router-view");
      }
    },
    children: [
      {
        path: "",
        name: "Users",
        component: Users
      },
      {
        path: ":id",
        meta: {
          label: "User Detail"
        },
        name: "User Detail",
        component: User
      }
    ]
  }
];
