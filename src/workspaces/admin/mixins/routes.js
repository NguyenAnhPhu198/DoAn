const Users = () => import("../views/users/Index");
const User = () => import("../views/users/Detail");
const Dashboard = () => import('../views/Dashboard')
export default [
  {
    path: 'dashboard',
    name: 'Dashboard',
    component: Dashboard,
  },
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
