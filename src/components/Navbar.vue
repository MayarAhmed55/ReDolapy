<template>
    <div>
        <nav class="relative bg-(--primary-bgc)">
            <div class="mx-auto flex h-14 sm:h-16 items-center justify-between gap-4 px-1 sm:px-2">

                <router-link to="/" class="shrink-0">
                    <img src="../assets/Logo.png" alt="Redolapy" class="h-7 sm:h-8 w-auto" />
                </router-link>

                <div class="hidden lg:flex flex-1 items-center justify-center gap-6 xl:gap-10">
                    <router-link
                        v-for="link in navLinks"
                        :key="link.to"
                        :to="link.to"
                        class="nav-link-item text-sm xl:text-base"
                    >
                        {{ link.label }}
                    </router-link>
                </div>

                <div class="hidden lg:flex items-center gap-2 xl:gap-3 shrink-0">
                    <LangSwitcher />
                    <button class="signBttns" id="logIn" @click="$router.push('/login')">Login</button>
                    <button class="signBttns" id="signUp" @click="$router.push('/SignUp')">Sign up</button>
                </div>

                <button
                    type="button"
                    class="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-(--Primary-Text-color) hover:bg-black/5 transition-colors"
                    :aria-expanded="mobileOpen"
                    aria-label="Open menu"
                    @click="openMobileMenu"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="size-6" aria-hidden="true">
                        <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
            </div>
        </nav>

        <Teleport to="body">
            <Transition name="mobile-overlay">
                <div
                    v-if="mobileOpen"
                    class="fixed inset-0 z-50 lg:hidden"
                    @keydown.escape="closeMobileMenu"
                >
                    <div
                        class="absolute inset-0 bg-black/40"
                        aria-hidden="true"
                        @click="closeMobileMenu"
                    />

                    <Transition name="mobile-drawer">
                        <aside
                            v-if="mobileOpen"
                            class="absolute inset-y-0 right-0 w-[78%] max-w-xs bg-white flex flex-col shadow-xl"
                            role="dialog"
                            aria-modal="true"
                            aria-label="Navigation menu"
                        >
                            <div class="flex items-center justify-between px-5 pt-5 pb-4 border-b border-gray-100">
                                <router-link to="/" @click="closeMobileMenu">
                                    <img src="../assets/Logo.png" alt="Redolapy" class="h-7 w-auto" />
                                </router-link>
                                <button
                                    type="button"
                                    class="p-1.5 text-(--Primary-Text-color) hover:bg-gray-50 rounded-md transition-colors"
                                    aria-label="Close menu"
                                    @click="closeMobileMenu"
                                >
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="size-6" aria-hidden="true">
                                        <path d="M6 18 18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </button>
                            </div>

                            <nav class="flex-1 overflow-y-auto px-5 py-6">
                                <router-link
                                    v-for="(link, i) in navLinks"
                                    :key="link.to"
                                    :to="link.to"
                                    class="mobile-nav-link block py-3 text-base text-(--Primary-Text-color)"
                                    :class="{ 'font-bold': i === 0 }"
                                    @click="closeMobileMenu"
                                >
                                    {{ link.mobileLabel || link.label }}
                                </router-link>
                            </nav>

                            <div class="px-5 pb-6 pt-4 border-t border-gray-100 space-y-3">
                                <LangSwitcher full-width />
                                <button
                                    class="mobile-auth-btn mobile-auth-btn--login w-full"
                                    @click="navigateAndClose('/login')"
                                >
                                    Login
                                </button>
                                <button
                                    class="mobile-auth-btn mobile-auth-btn--signup w-full"
                                    @click="navigateAndClose('/SignUp')"
                                >
                                    Sign-up
                                </button>
                            </div>
                        </aside>
                    </Transition>
                </div>
            </Transition>
        </Teleport>
    </div>
</template>

<script>
import LangSwitcher from './LangSwitcher.vue';

export default {
    name: 'Navbar',
    components: {
        LangSwitcher,
    },
    data() {
        return {
            mobileOpen: false,
            navLinks: [
                { to: '/', label: 'Home', mobileLabel: 'Features' },
                { to: '/TryOn', label: 'TryOn', mobileLabel: 'Try-On' },
                { to: '/Recycle', label: 'Recycle' },
                { to: '/Pricing', label: 'Pricing' },
                { to: '/AboutPage', label: 'About' },
            ],
        };
    },
    watch: {
        mobileOpen(open) {
            document.body.style.overflow = open ? 'hidden' : '';
        },
        '$route'() {
            this.closeMobileMenu();
        },
    },
    beforeUnmount() {
        document.body.style.overflow = '';
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
    },
};
</script>

<style scoped>
@import '../assets/Style.css';

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
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: #8ED321;
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
