export default [
  {
    path: "/admin",
    component: () => import("../admin/dashboardLayout.vue"),
    redirect: "/admin/dashboard",   // ← add this
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    },
    children: [
      {
        path: "dashboard",
        component: () => import("../admin/views/dashboard.vue"),
        meta: { requiresAuth: true }
      },
      {
        path: "stores",
        component:()=>import("../admin/views/stores.vue")
      },
      {
        path:"products",
        component:()=>import("../admin/views/products.vue"),
        meta: { requiresAuth: true }
      },
      {
        path:"promotions",
        component:()=>import("../admin/views/promotions.vue"),
        meta: { requiresAuth: true }
      },
      {
        path :"notifications",
        component:()=>import("../admin/views/notification.vue"),
        meta: { requiresAuth: true }
      },
      {
        path: "emailCenter",
        component:()=>import("../admin/views/emailCenter.vue"),
        meta: { requiresAuth: true }
      },
       {
        path: "API",
        component:()=>import("../admin/views/APIMangement.vue"),
        meta: { requiresAuth: true }
      },
      {
        path: "setttings",
        component:()=>import("../admin/views/setttings.vue"),
        meta: { requiresAuth: true }
      },
      {
        path:"users",
        component:()=>import("../admin/views/users.vue"),
        meta: { requiresAuth: true }
      }
    ]
  },
];