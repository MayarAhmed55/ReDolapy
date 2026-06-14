<template>
  <div>
    <nav class="relative bg-(--primary-bgc)">
      <div class="mx-auto flex h-14 sm:h-16 items-center justify-between gap-4 px-1 sm:px-2">
        <router-link to="/" class="shrink-0">
          <img src="../assets/Logo.png" alt="Redolapy" class="h-7 sm:h-8 w-auto" />
        </router-link>

        <div class="hidden lg:flex flex-1 items-center justify-center gap-6 xl:gap-10">
          <template v-for="link in navLinks" :key="link.to">
            <a v-if="link.hash" :href="link.hash" class="nav-link-item text-sm xl:text-base"
              @click="onHashLinkClick($event, link.hash)">
              {{ link.label }}
            </a>
            <router-link v-else :to="link.to" class="nav-link-item text-sm xl:text-base">
              {{ link.label }}
            </router-link>
          </template>
        </div>

        <div class="hidden lg:flex items-center gap-2 xl:gap-3 shrink-0">
          <LangSwitcher />

          <template v-if="!isLoggedIn">
            <button class="signBttns" id="logIn" @click="openModal('login')">
              {{ $t("nav.login") }}
            </button>
            <button class="signBttns" id="signUp" @click="openModal('signup')">
              {{ $t("nav.signup") }}
            </button>
          </template>

          <div v-else class="flex items-center gap-2 px-3 py-1.5 rounded-md bg-gray-50 border border-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-5 h-5 text-gray-600">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
            <span class="text-sm font-medium text-gray-700">{{ userFullName }}</span>
            <button @click="handleLogout" class="ml-1 text-xs text-red-500 hover:underline">
              Logout
            </button>
          </div>
        </div>

        <button type="button"
          class="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-(--Primary-Text-color) hover:bg-black/5 transition-colors"
          :aria-expanded="mobileOpen" aria-label="Open menu" @click="openMobileMenu">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="size-6"
            aria-hidden="true">
            <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>
    </nav>

    <Teleport to="body">
      <Transition name="mobile-overlay">
        <div v-if="mobileOpen" class="fixed inset-0 z-50 lg:hidden" @keydown.escape="closeMobileMenu">
          <div class="absolute inset-0 bg-black/40" aria-hidden="true" @click="closeMobileMenu" />

          <Transition name="mobile-drawer">
            <aside v-if="mobileOpen"
              class="absolute inset-y-0 right-0 w-[78%] max-w-xs bg-white flex flex-col shadow-xl" role="dialog"
              aria-modal="true" aria-label="Navigation menu">
              <div class="flex items-center justify-between px-5 pt-5 pb-4 border-b border-gray-100">
                <router-link to="/" @click="closeMobileMenu">
                  <img src="../assets/Logo.png" alt="Redolapy" class="h-7 w-auto" />
                </router-link>
                <button type="button"
                  class="p-1.5 text-(--Primary-Text-color) hover:bg-gray-50 rounded-md transition-colors"
                  aria-label="Close menu" @click="closeMobileMenu">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="size-6"
                    aria-hidden="true">
                    <path d="M6 18 18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </button>
              </div>

              <nav class="flex-1 overflow-y-auto px-5 py-6">
                <template v-for="(link, i) in navLinks" :key="link.to">
                  <a v-if="link.hash" :href="link.hash"
                    class="mobile-nav-link block py-3 text-base text-(--Primary-Text-color)"
                    @click="onHashLinkClick($event, link.hash)">
                    {{ link.mobileLabel || link.label }}
                  </a>
                  <router-link v-else :to="link.to"
                    class="mobile-nav-link block py-3 text-base text-(--Primary-Text-color)"
                    :class="{ 'font-bold': i === 0 }" @click="closeMobileMenu">
                    {{ link.mobileLabel || link.label }}
                  </router-link>
                </template>
              </nav>

              <div class="flex flex-col gap-3 px-5 pb-6 pt-4 border-t border-gray-100">
                <LangSwitcher full-width />

                <template v-if="!isLoggedIn">
                  <button class="mobile-auth-btn mobile-auth-btn--login w-full"
                    @click="openModal('login'); closeMobileMenu()">
                    {{ $t("nav.login") }}
                  </button>
                  <button class="mobile-auth-btn mobile-auth-btn--signup w-full"
                    @click="openModal('signup'); closeMobileMenu()">
                    {{ $t("nav.signup") }}
                  </button>
                </template>

                <div v-else
                  class="flex items-center justify-between p-2.5 rounded-md bg-gray-50 border border-gray-100">
                  <div class="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" class="w-6 h-6 text-gray-600">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                    <span class="text-sm font-medium text-gray-700 max-w-[140px] truncate">{{ userFullName }}</span>
                  </div>
                  <button @click="handleLogout(); closeMobileMenu()" class="text-xs text-red-500 hover:underline">
                    Logout
                  </button>
                </div>
              </div>
            </aside>
          </Transition>
        </div>
      </Transition>

      <AuthModal :open="sharedAuthOpen" :mode="sharedAuthMode" @close="sharedAuthOpen = false" @switch-mode="switchMode"
        @login-success="checkUserSession" />
    </Teleport>
  </div>
</template>

<script>
import LangSwitcher from "./LangSwitcher.vue";
import AuthModal from "./modal.vue";
import { isAuthModalOpen, authModalMode } from "../authState.js";

export default {
  name: "Navbar",
  components: {
    LangSwitcher,
    AuthModal,
  },
  data() {
    return {
      mobileOpen: false,
      user: null,
      navLinks: [
        { to: "/", label: "Home", mobileLabel: "Features" },
        { to: "/TryOn", label: "TryOn", mobileLabel: "Try-On" },
        { to: "/Recycle", label: "Recycle" },
        { to: "/#PricingSection", label: "Pricing", hash: "#PricingSection" },
        { to: "/AboutPage", label: "About" },
      ],
    };
  },
  setup() {
    const sharedAuthOpen = isAuthModalOpen;
    const sharedAuthMode = authModalMode;

    function openModal(mode) {
      sharedAuthMode.value = mode;
      sharedAuthOpen.value = true;
    }

    function switchMode(mode) {
      sharedAuthMode.value = mode;
    }

    return { sharedAuthOpen, sharedAuthMode, openModal, switchMode };
  },
  watch: {
    mobileOpen(open) {
      document.body.style.overflow = open ? "hidden" : "";
    },
    $route() {
      this.closeMobileMenu();
    },
  },
  beforeUnmount() {
    document.body.style.overflow = "";
  },
  methods: {
    openMobileMenu() {
      this.mobileOpen = true;
    },
    closeMobileMenu() {
      this.mobileOpen = false;
    },
    navigateAndClose(path) {
      this.closeMobileMenu();
      this.$router.push(path);
    },
    handleLogout() {
      localStorage.removeItem("user");
      localStorage.removeItem("token")
      localStorage.removeItem("_id")
      this.user = null;
      if (this.$route.meta.requiresAuth) {
        this.$router.push("/");
      }
    },
    checkUserSession() {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          this.user = JSON.parse(storedUser);
        } catch (e) {
          this.user = null;
        }
      } else {
        this.user = null;
      }
    },
    onHashLinkClick(e, hash) {
      e.preventDefault();
      this.closeMobileMenu();
      const sectionId = hash.replace("#", "");
      if (this.$route.path === "/") {
        document
          .getElementById(sectionId)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      this.$router.push({ path: "/", hash }).then(() => {
        this.$nextTick(() => {
          document
            .getElementById(sectionId)
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      });
    },
  },
  computed: {
    isLoggedIn() {
      return !!this.user;
    },
    userFullName() {
      if (!this.user) return "";
      // Google OAuth payload uses firstName/lastName
      const first = this.user.firstName || this.user.first_name || this.user.given_name || "";
      const last = this.user.lastName || this.user.last_name || this.user.family_name || "";
      if (first || last) return `${first} ${last}`.trim();
      if (this.user.name) return this.user.name;
      if (this.user.displayName) return this.user.displayName;
      return "User";
    }
  },
  mounted() {
    this.checkUserSession();
  }
};
</script>

<style scoped>
@import "../assets/Style.css";

.signBttns {
  border: 0.1em solid;
  border-radius: 0.5em;
  padding: 0.3em 1.2em;
  font-weight: var(--Semi-Bold);
  cursor: pointer;
  font-size: 0.875rem;
  white-space: nowrap;
}

#logIn {
  background-color: var(--primary-bgc);
  border-color: var(--Secondary-Brand-color);
  color: var(--Secondary-Brand-color);
}

#signUp {
  background: var(--Gradient-bgc);
  padding: 0.4em 1.4em;
  border: none;
  color: white;
}

.nav-link-item {
  position: relative;
  text-decoration: none;
  color: #1e293b;
  font-weight: 500;
  padding: 0.5rem 0;
  white-space: nowrap;
}

.nav-link-item::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: #8ed321;
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 0.3s ease-out;
}

.nav-link-item:hover::after,
.nav-link-item.router-link-active::after {
  transform: scaleX(1);
}

.mobile-nav-link {
  text-decoration: none;
  transition: color 0.2s;
}

.mobile-nav-link:hover {
  color: var(--Secondary-Brand-color);
}

.mobile-auth-btn {
  border-radius: 9999px;
  padding: 0.75rem 1.5rem;
  font-weight: var(--Semi-Bold);
  font-size: 0.9375rem;
  cursor: pointer;
  transition: opacity 0.2s;
  text-align: center;
}

.mobile-auth-btn:hover {
  opacity: 0.9;
}

.mobile-auth-btn--login {
  background-color: white;
  border: 1.5px solid var(--Secondary-Brand-color);
  color: var(--Secondary-Brand-color);
}

.mobile-auth-btn--signup {
  background: var(--Gradient-bgc);
  border: none;
  color: white;
}

.mobile-overlay-enter-active,
.mobile-overlay-leave-active {
  transition: opacity 0.25s ease;
}

.mobile-overlay-enter-from,
.mobile-overlay-leave-to {
  opacity: 0;
}

.mobile-drawer-enter-active,
.mobile-drawer-leave-active {
  transition: transform 0.3s ease;
}

.mobile-drawer-enter-from,
.mobile-drawer-leave-to {
  transform: translateX(100%);
}
</style>