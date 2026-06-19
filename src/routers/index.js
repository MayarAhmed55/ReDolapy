import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import Recycle from "../views/Recycle.vue";
import LogIn from "../views/LogIn.vue";
import SignUp from "../views/SignUp.vue";
import AboutPage from "../views/AboutPage.vue";
import Brands from "../views/Brands.vue";
import AboutRecycle from "../views/AboutRecycle.vue";
import TryOn from "../views/TryOn.vue";
import UserWardrobe from "../views/userWardrobe.vue";
import Pricing from "../views/pricing.vue";
import AboutTryon from "../views/AboutTryon.vue";
import Profile from "../views/Profile.vue";
import Wardrobe from '../views/Wardrobe.vue'
import WardrobeDetails from '../views/WardrobeDetails.vue'
import Recommendation from '../views/Recommendation.vue'
import Matching from '../views/Matching.vue'
import Wishlist from '../views/Wishlist.vue'
import Avatar from '../views/Avatar.vue'
import {isAuthModalOpen, triggerLoginModal} from '../authState.js';
import ContactUs from "../views/ContactUs.vue";
import UserCurrentPlan from "../views/UserCurrentPlan.vue";
import adminRoutes from "./adminRoutes.js";
const routes = [
  { path: "/", component: HomePage },
  { path: "/login", component: LogIn },
  { path: "/SignUp", component: SignUp },
  { path: "/AboutPage", component: AboutPage },
  { path: "/Brands", component: Brands },
  { path: "/AboutRecycle", component: AboutRecycle },
  { path: "/AboutTryon", component: AboutTryon },
  { path: "/Recycle", component: Recycle, meta: { requiresAuth: true } },
  { path: "/TryOn", component: TryOn, meta: { requiresAuth: true } },
  { path: "/pricing", component: Pricing, meta: { requiresAuth: true } },
  { path: "/userWardrobe", component: UserWardrobe },
  {
    path: '/wardrobe/:id',
    component: WardrobeDetails,
    props: true,
    meta: { requiresAuth: true },
  },
  { path: '/wardrobe', component: Wardrobe, meta: { requiresAuth: true } },
  {
    path: '/productDetails/:analysisId',
    redirect: (to) => (to.query.itemId ? `/wardrobe/${to.query.itemId}` : '/wardrobe'),
  },
  { path: '/Recommendation', component: Recommendation, meta: { requiresAuth: true } },
  { path: '/recommendation', redirect: '/Recommendation' },
  { path: '/Matching', component: Matching, meta: { requiresAuth: true } },
  { path: '/matching', redirect: '/Matching' },
  { path: '/wordrobe', redirect: '/wardrobe' },
  { path: '/Wishlist', component: Wishlist },
  { path: '/wishlist', redirect: '/Wishlist' },
  { path: '/Avatar', component: Avatar },
  { path: "/Profile/:id", component: Profile, meta: { requiresAuth: true } },
    { path: "/ContactUs", component: ContactUs },
    { path: "/UserCurrentPlan", component: UserCurrentPlan },

  {
    path: "/Profile",
    redirect: () => {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const id = user.id || user._id;
      return id ? `/Profile/${id}` : "/";
    },
  },
  {
    path: "/auth/callback",
    component: () => import("../views/GoogleCallback.vue"),
    meta: { layout: "blank" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: [...routes, ...adminRoutes],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0 }
  },
});
const getUserRole = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  return user.role ?? null;
};

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  const role = getUserRole();

  // Walk the full matched chain so child routes inherit parent meta
  const requiresAdmin = to.matched.some((r) => r.meta?.requiresAdmin);
  const requiresAuth = to.matched.some((r) => r.meta?.requiresAuth);

  // 1. Any /admin route — must be logged in AND have admin role
  if (requiresAdmin && (!token || role !== "admin")) {
    triggerLoginModal();
    return next(false);
  }

  // 2. Any other protected route — must be logged in
  if (requiresAuth && !token) {
    triggerLoginModal();
    return next(false);
  }

  // 3. Logged-in admin hitting "/" — redirect to dashboard
  if (to.path === "/" && token && role === "admin") {
    return next("/admin");
  }

  next();
});

export default router;