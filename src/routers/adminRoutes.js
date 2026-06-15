export default [
  {
    path: "/admin",
    component: () => import("../admin/dashboardLayout.vue"),
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
];