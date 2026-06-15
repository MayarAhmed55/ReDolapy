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
import { isAuthModalOpen, triggerLoginModal } from "../authState.js";
import adminRoutes from "./adminRoutes.js";
import { getUserById } from "../services/services.js";

// ── Fetch role live from the server ───────────────────────────────────────
const getUser = () => JSON.parse(localStorage.getItem("user") || "{}");

async function fetchUserRole() {
  const user = getUser();
  const id = user.id || user._id;
  if (!id) return null;
  try {
    const res = await getUserById(id);
    return res.data?.user?.role ?? null;
  } catch {
    return null;
  }
}

const userRoutes = [
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
    path: "/Profile/:id",
    component: () => import("../views/Profile.vue"),
    meta: { requiresAuth: true },
  },
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
  routes: [...userRoutes, ...adminRoutes],
});

// ── Navigation guard ───────────────────────────────────────────────────────
router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem("token");

  // 1. Not logged in — show login modal and block navigation
  if (to.meta.requiresAuth && !token) {
    triggerLoginModal();
    return next(false);
  }

  // 2. Admin-only route — fetch role live and guard access
  if (to.meta.requiresAdmin) {
    const role = await fetchUserRole();
    if (role !== "admin") return next("/");
  }

  // 3. Logged-in user hitting "/" — check if admin and redirect to dashboard
  if (to.path === "/" && token) {
    const role = await fetchUserRole();
    if (role === "admin") return next("/admin");
  }

  next();
});

export default router;
