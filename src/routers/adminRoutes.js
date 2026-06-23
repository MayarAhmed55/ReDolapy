import AddStoreButton from "../admin/components/addStorebtnr.vue";
import AddnotificationButton from "../admin/components/addNotificatiobBTN.vue";
import AddProductButton from "../admin/components/addProduct.vue";
import AddApiKeyButton from "../admin/components/addAPIKeybtn.vue";
export default [
  {
    path: "/admin",
    component: () => import("../admin/dashboardLayout.vue"),
    redirect: "/admin/dashboard", // ← add this
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    },
    children: [
      {
        path: "dashboard",
        component: () => import("../admin/views/dashboard.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "stores",
        component: () => import("../admin/views/stores.vue"),
        meta: { requiresAuth: true, navbarButton: AddStoreButton },
      },
      {
        path: "products",
        component: () => import("../admin/views/products.vue"),
        meta: { requiresAuth: true, navbarButton: AddProductButton },
      },
      {
        path: "promotions",
        component: () => import("../admin/views/promotions.vue"),
        meta: { requiresAuth: true, navbarButton: AddnotificationButton },
      },
      {
        path: "notifications",
        component: () => import("../admin/views/notification.vue"),
        meta: { requiresAuth: true, navbarButton: AddnotificationButton },
      },
      {
        path: "emailCenter",
        component: () => import("../admin/views/emailCenter.vue"),
        meta: { requiresAuth: true, navbarButton: AddnotificationButton },
      },
      {
        path: "API",
        component: () => import("../admin/views/APIMangement.vue"),
        meta: { requiresAuth: true, navbarButton: AddApiKeyButton },
      },
      {
        path: "setttings",
        component: () => import("../admin/views/setttings.vue"),
        meta: { requiresAuth: true, navbarButton: AddnotificationButton },
      },
      {
        path: "users",
        component: () => import("../admin/views/users.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "addProduct/:id?",
        name: "AddProduct",
        component: () => import("../admin/views/addProduct.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "addStore/:id?",
        name: "AddStore",
        component: () => import("../admin/views/addStore.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "editUser/:id?",
        name: "EditUserPage",
        component: () => import("../admin/views/editeUser.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "editeKey/:id?",
        name: "EditAPIKey",
        component: () => import("../admin/views/Editapikey.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "sendNotifications",
        component: () => import("../admin/views/sendNotifications.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "emailCenter/reply/:id?",
        name: "ReplyEmail",
        component: () => import("../admin/views/replyEmail.vue"),
        meta: { requiresAuth: true },
      },
    
    ],
  },
];
