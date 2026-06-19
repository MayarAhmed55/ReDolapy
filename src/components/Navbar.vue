<template>
  <div>
    <nav class="relative bg-(--primary-bgc)">
      <div
        class="mx-auto flex h-14 sm:h-16 items-center justify-between gap-4 px-1 sm:px-2"
      >
        <router-link to="/" class="shrink-0">
          <img
            :src="adaptiveHeroImage"
            alt="Redolapy"
            class="h-7 sm:h-8 w-auto"
          />
          <!-- <img src="../assets/Logo Dark mode.png" alt="Redolapy" class=" hidden dark:block h-7 sm:h-8 w-auto" /> -->
        </router-link>

        <div
          class="hidden lg:flex flex-1 items-center justify-center gap-6 xl:gap-10"
        >
          <template v-for="link in navLinks" :key="link.to">
            <a
              v-if="link.hash"
              :href="link.hash"
              class="nav-link-item text-sm xl:text-base PrimaryTxt"
              @click="onHashLinkClick($event, link.hash)"
            >
              {{ link.label }}
            </a>
            <router-link
              v-else
              :to="link.to"
              class="nav-link-item text-sm xl:text-base PrimaryTxt"
            >
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

          <div v-else class="relative" v-click-outside="closeUserDropdown">
            <button
              @click="userDropdownOpen = !userDropdownOpen"
              class="flex items-center gap-2 px-3 py-1.5 rounded-md bg-gray-50 dark:bg-[#0d0d0d] border border-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              :aria-expanded="userDropdownOpen"
              aria-haspopup="true"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5 PrimaryTxt"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
              <span
                class="text-sm font-medium PrimaryTxt max-w-[120px] truncate"
                >{{ userFullName }}</span
              >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="w-3.5 h-3.5 text-gray-500 dark:text-white transition-transform duration-200"
                :class="{ 'rotate-180': userDropdownOpen }"
                PrimaryTxt
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>

            <Transition name="dropdown">
              <div v-if="userDropdownOpen"
                class="profile-dropdown-menu absolute mt-2 bg-white dark:bg-black rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden text-right"
                :class="$i18n.locale === 'ar' ? 'left-0' : 'right-0'" role="menu">
                <div class="user-email-row">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-4 h-4 text-gray-400">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                  <span class="email-text">{{ userEmail }}</span>
                </div>

                <div class="dropdown-item-row PrimaryTxt ">
                  <div class="item-leading PrimaryTxt">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" class="w-5 h-5 ">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                    </svg>
                    <span class="item-title PrimaryTxt">Notifications</span>
                  </div>
                  <button @click="toggleNotifications" class="toggle-switch"
                    :class="{ 'toggle-active': notificationsEnabled }">
                    <span class="toggle-circle"></span>
                  </button>
                </div>

                <div class="dropdown-item-row PrimaryTxt">
                  <div class="item-leading PrimaryTxt">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" class="w-5 h-5 ">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M12 3v1.5m0 15V21m9-9h-1.5m-13.5 0H3m16.364-6.364l-1.06 1.06m-11.314 11.314l-1.06 1.06m11.314 0l-1.06-1.06m-11.314-11.314l-1.06-1.06M12 7.25a4.75 4.75 0 1 0 0 9.5 4.75 4.75 0 0 0 0-9.5z" />
                    </svg>
                    <span class="item-title PrimaryTxt">Theme</span>
                  </div>
                  <button @click="toggleTheme" class="toggle-switch" :class="{ 'toggle-active': isDarkMode }">
                    <span class="toggle-circle"></span>
                  </button>
                </div>

                <div class="relative w-full">
                  <div class="dropdown-item-row PrimaryTxt cursor-pointer flex justify-between items-center"
                    @click="languageDropdownOpen = !languageDropdownOpen">
                    <div class="item-leading PrimaryTxt flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-5 h-5 ">
                        <path stroke-linecap="round" stroke-linejoin="round"
                          d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138A44.26 44.26 0 0115.5 12m-2 1.157a26.792 26.792 0 01-1.884 4.354" />
                      </svg>
                      <span class="item-title PrimaryTxt">Language</span>
                    </div>

                    <div class="flex items-center gap-1">
                      <span class="text-sm font-medium  uppercase">{{ $i18n.locale }}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                        stroke="currentColor" class="w-3.5 h-3.5  transition-transform duration-200" :class="{
                          'rotate-180': languageDropdownOpen,
                          'rotate-90': !languageDropdownOpen,
                        }">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </div>
                  </div>

                  <Transition name="sub-dropdown">
                    <div v-if="languageDropdownOpen"
                      class="language-sub-menu absolute right-2 left-2 bg-gray-50 rounded-lg border border-gray-100 py-1 z-50 shadow-inner">
                      <button @click="setLanguage('en')" class="lang-option-btn"
                        :class="{ 'active-lang': $i18n.locale === 'en' }">
                        <span>English (EN)</span>
                        <svg v-if="$i18n.locale === 'en'" xmlns="http://www.w3.org/2000/svg" fill="none"
                          viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 text-green-600">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </button>

                      <button @click="setLanguage('ar')" class="lang-option-btn text-right"
                        :class="{ 'active-lang': $i18n.locale === 'ar' }">
                        <span>العربية (AR)</span>
                        <svg v-if="$i18n.locale === 'ar'" xmlns="http://www.w3.org/2000/svg" fill="none"
                          viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 text-green-600">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </button>
                    </div>
                  </Transition>
                </div>

                <div class="dropdown-item-row PrimaryTxt">
                  <div class="item-leading PrimaryTxt">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" class="w-5 h-5 ">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-6 15h9" />
                    </svg>
                    <span class="item-title PrimaryTxt font-normal">Mobile App</span>
                  </div>
                  <span class="text-sm font-normal" :class="hasMobileApp ? 'text-green-500' : 'text-gray-400'">
                    {{ hasMobileApp ? "Installed" : "Not Installed" }}
                  </span>
                </div>

                <router-link to="/wardrobe" class="dropdown-item-row PrimaryTxt cursor-pointer" role="menuitem"
                  @click="closeUserDropdown">
                  <div class="item-leading PrimaryTxt">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" class="w-5 h-5 ">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M20.25 14.15v4.25c0 .621-.504 1.125-1.125 1.125H4.875A1.125 1.125 0 013.75 18.4V14.15m16.5 0c0-1.243-1.007-2.25-2.25-2.25H6c-1.243 0-2.25 1.007-2.25 2.25m16.5 0V6.3c0-.621-.504-1.125-1.125-1.125H4.875A1.125 1.125 0 003.75 6.3v7.85m16.5 0V5.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25v8.65" />
                    </svg>
                    <span class="item-title PrimaryTxt font-normal">My Wardrobe</span>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                    stroke="currentColor" class="w-4 h-4 ">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </router-link>

                <router-link to="/wardrobe" class="dropdown-item-row PrimaryTxt cursor-pointer" role="menuitem"
                  @click="closeUserDropdown">
                  <div class="item-leading PrimaryTxt">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                      class="lucide lucide-check-check-icon lucide-check-check">
                      <path d="M18 6 7 17l-5-5" />
                      <path d="m22 10-7.5 7.5L13 16" />
                    </svg>
                    <span class="item-title PrimaryTxt font-normal">My Matchings</span>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                    stroke="currentColor" class="w-4 h-4 ">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </router-link>

   <router-link to="/pricing" class="dropdown-item-row PrimaryTxt cursor-pointer" role="menuitem"
                  @click="closeUserDropdown">
                  <div class="item-leading PrimaryTxt">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                      class="lucide lucide-receipt-text-icon lucide-receipt-text">
                      <path d="M13 16H8" />
                      <path d="M14 8H8" />
                      <path d="M16 12H8" />
                      <path
                        d="M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z" />
                    </svg>
                    <span class="item-title PrimaryTxt font-normal">Current Plan</span>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                    stroke="currentColor" class="w-4 h-4 ">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </router-link>


              
                <div class="cards-block-wrapper">
                 

                  <router-link to="/wishlist"
                    class="feature-card bg-[rgba(64,185,255,0.1)] dark:bg-[rgba(64,185,255,1)]  cursor-pointer"
                    @click="closeUserDropdown">
                    <div class="card-icon-container">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-5 h-5 text-gray-600">
                        <path stroke-linecap="round" stroke-linejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                      </svg>
                    </div>
                    <div class="card-details">
                      <span class="card-title">Wishlist</span>
                      <span class="card-desc">View your saved items</span>
                    </div>
                  </router-link>
                </div>

                <div class="edit-profile-warber w-full">
                  <router-link :to="`/Profile/${userId}`"
                    class="edit-profile-btn bg-white dark:bg-[#0d0d0d] cursor-pointer" @click="closeUserDropdown">
                    <span>Edit Profile</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                      stroke="currentColor" class="w-4 h-4 flex">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                  </router-link>
                </div>

                <div class="logout-footer border-t border-gray-50 flex justify-end pb-2">
                  <button @click="
                    handleLogout();
                  userDropdownOpen = false;
                  " class="logout-action-btn" role="menuitem">
                    <span class="logout-text">Log out</span>
                    <span class="logout-icon-box">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                        stroke="currentColor" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round"
                          d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 00 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </Transition>
          </div>

          <Notificationdropdown v-if="isLoggedIn" />

          <button
            @click="toggleThemeNavBtn"
            type="button"
            class="p-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-gray-700 dark:text-zinc-300 transition-all duration-200 hover:scale-105"
            :aria-label="isDark ? $t('nav.theme_light') : $t('nav.theme_dark')"
          >
            <span v-if="isDark" class="text-yellow-500">
              <SunMedium></SunMedium>
            </span>
            <span v-else class="text-indigo-600">
              <Moon></Moon>
            </span>
          </button>
        </div>

        <div class="lg:hidden flex items-center gap-2 shrink-0">
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-md p-2 text-(--Primary-Text-color) hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            :aria-expanded="mobileOpen"
            aria-label="Open menu"
            @click="openMobileMenu"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              class="size-6"
              aria-hidden="true"
            >
              <path
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>

          <button
            @click="toggleThemeNavBtn"
            type="button"
            class="p-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-gray-700 dark:text-zinc-300 transition-all duration-200 hover:scale-105"
            :aria-label="isDark ? $t('nav.theme_light') : $t('nav.theme_dark')"
          >
            <span v-if="isDark" class="text-yellow-500">
              <SunMedium></SunMedium>
            </span>
            <span v-else class="text-indigo-600">
              <Moon></Moon>
            </span>
          </button>
        </div>
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
              class="mobile-drawer absolute inset-y-0 w-[78%] max-w-xs flex flex-col shadow-xl"
              :class="$i18n.locale === 'ar' ? 'left-0' : 'right-0'"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              <div
                class="flex items-center justify-between px-5 pt-5 pb-4 border-b border-gray-100 dark:border-zinc-800"
              >
                <router-link to="/" @click="closeMobileMenu">
                  <img
                    :src="adaptiveHeroImage"
                    alt="Redolapy"
                    class="h-7 w-auto"
                  />
                </router-link>
                <button
                  type="button"
                  class="p-1.5 text-(--Primary-Text-color) hover:bg-gray-50 dark:hover:bg-zinc-800 rounded-md transition-colors"
                  aria-label="Close menu"
                  @click="closeMobileMenu"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    class="size-6"
                    aria-hidden="true"
                  >
                    <path
                      d="M6 18 18 6M6 6l12 12"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              </div>

              <nav class="flex-1 overflow-y-auto px-5 py-6">
                <Notificationdropdown />
                <template v-for="(link, i) in navLinks" :key="link.to">
                  <a
                    v-if="link.hash"
                    :href="link.hash"
                    class="mobile-nav-link block py-3 text-base text-(--Primary-Text-color)"
                    @click="onHashLinkClick($event, link.hash)"
                  >
                    {{ link.mobileLabel || link.label }}
                  </a>
                  <router-link
                    v-else
                    :to="link.to"
                    class="mobile-nav-link block py-3 text-base text-(--Primary-Text-color)"
                    :class="{ 'font-bold': i === 0 }"
                    @click="closeMobileMenu"
                  >
                    {{ link.mobileLabel || link.label }}
                  </router-link>
                </template>
              </nav>

              <div
                class="flex flex-col gap-3 px-5 pb-6 pt-4 border-t border-gray-100 dark:border-zinc-800"
              >
                <LangSwitcher full-width />

                <template v-if="!isLoggedIn">
                  <button
                    class="mobile-auth-btn mobile-auth-btn--login w-full"
                    @click="
                      openModal('login');
                      closeMobileMenu();
                    "
                  >
                    {{ $t("nav.login") }}
                  </button>
                  <button
                    class="mobile-auth-btn mobile-auth-btn--signup w-full"
                    @click="
                      openModal('signup');
                      closeMobileMenu();
                    "
                  >
                    {{ $t("nav.signup") }}
                  </button>
                </template>

                <div
                  v-else
                  class="rounded-md border border-gray-100 dark:border-zinc-800 overflow-hidden"
                >
                  <button
                    @click="mobileUserExpanded = !mobileUserExpanded"
                    class="w-full flex items-center justify-between p-2.5 bg-gray-50 dark:bg-zinc-900 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                  >
                    <div class="flex items-center gap-2 min-w-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-5 h-5 text-gray-600 shrink-0"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                      <span
                        class="text-sm font-medium text-(--Primary-Text-color) truncate min-w-0"
                        >{{ userFullName }}</span
                      >
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      class="w-3.5 h-3.5 text-gray-500 transition-transform duration-200 shrink-0 ms-2"
                      :class="{ 'rotate-180': mobileUserExpanded }"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </button>
                  <Transition name="accordion">
                    <div
                      v-if="mobileUserExpanded"
                      class="mobile-drawer-panel border-t border-gray-100 dark:border-zinc-800 divide-y divide-gray-50 dark:divide-zinc-800"
                    >
                      <!-- Email -->
                      <div class="flex items-center gap-2 px-4 py-2.5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-4 h-4 text-gray-400 shrink-0"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                          />
                        </svg>
                        <span class="text-sm text-gray-500 truncate min-w-0">{{
                          userEmail
                        }}</span>
                      </div>

                      <!-- Notifications -->
                      <div
                        class="flex items-center justify-between px-4 py-2.5"
                      >
                        <div class="flex items-center gap-2.5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-4 h-4 text-gray-500 shrink-0"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                            />
                          </svg>
                          <span
                            class="text-sm font-medium text-(--Primary-Text-color)"
                            >Notifications</span
                          >
                        </div>
                        <button
                          @click="toggleNotifications"
                          class="toggle-switch"
                          :class="{ 'toggle-active': notificationsEnabled }"
                        >
                          <span class="toggle-circle"></span>
                        </button>
                      </div>

                      <!-- Theme -->
                      <div
                        class="flex items-center justify-between px-4 py-2.5"
                      >
                        <div class="flex items-center gap-2.5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-4 h-4 text-gray-500 shrink-0"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M12 3v1.5m0 15V21m9-9h-1.5m-13.5 0H3m16.364-6.364l-1.06 1.06m-11.314 11.314l-1.06 1.06m11.314 0l-1.06-1.06m-11.314-11.314l-1.06-1.06M12 7.25a4.75 4.75 0 1 0 0 9.5 4.75 4.75 0 0 0 0-9.5z"
                            />
                          </svg>
                          <span
                            class="text-sm font-medium text-(--Primary-Text-color)"
                            >Theme</span
                          >
                        </div>
                        <button
                          @click="toggleTheme"
                          class="toggle-switch"
                          :class="{ 'toggle-active': isDarkMode }"
                        >
                          <span class="toggle-circle"></span>
                        </button>
                      </div>

                      <!-- Language -->
                      <div class="relative">
                        <div
                          class="flex items-center justify-between px-4 py-2.5 cursor-pointer"
                          @click="languageDropdownOpen = !languageDropdownOpen"
                        >
                          <div class="flex items-center gap-2.5">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="w-4 h-4 text-gray-500 shrink-0"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138A44.26 44.26 0 0115.5 12m-2 1.157a26.792 26.792 0 01-1.884 4.354"
                              />
                            </svg>
                            <span
                              class="text-sm font-medium text-(--Primary-Text-color)"
                              >Language</span
                            >
                          </div>
                          <div class="flex items-center gap-1">
                            <span class="text-xs font-medium uppercase">{{
                              $i18n.locale
                            }}</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="2"
                              stroke="currentColor"
                              class="w-3 h-3 text-gray-500 transition-transform duration-200"
                              :class="{
                                'rotate-90': !languageDropdownOpen,
                                'rotate-180': languageDropdownOpen,
                              }"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M8.25 4.5l7.5 7.5-7.5 7.5"
                              />
                            </svg>
                          </div>
                        </div>
                        <Transition name="sub-dropdown">
                          <div
                            v-if="languageDropdownOpen"
                            class="mx-3 mb-1 bg-gray-50 rounded-lg border border-gray-100 py-1"
                          >
                            <button
                              @click="setLanguage('en')"
                              class="lang-option-btn"
                              :class="{ 'active-lang': $i18n.locale === 'en' }"
                            >
                              <span>English (EN)</span>
                              <svg
                                v-if="$i18n.locale === 'en'"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="2"
                                stroke="currentColor"
                                class="w-4 h-4 text-green-600"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M4.5 12.75l6 6 9-13.5"
                                />
                              </svg>
                            </button>
                            <button
                              @click="setLanguage('ar')"
                              class="lang-option-btn text-right"
                              :class="{ 'active-lang': $i18n.locale === 'ar' }"
                            >
                              <span>العربية (AR)</span>
                              <svg
                                v-if="$i18n.locale === 'ar'"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="2"
                                stroke="currentColor"
                                class="w-4 h-4 text-green-600"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M4.5 12.75l6 6 9-13.5"
                                />
                              </svg>
                            </button>
                          </div>
                        </Transition>
                      </div>

                      <!-- Mobile App -->
                      <div
                        class="flex items-center justify-between px-4 py-2.5"
                      >
                        <div class="flex items-center gap-2.5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-4 h-4 text-gray-700 shrink-0"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-6 15h9"
                            />
                          </svg>
                          <span
                            class="text-sm font-medium text-(--Primary-Text-color) PrimaryTxt"
                            >Mobile App</span
                          >
                        </div>
                        <span
                          class="text-xs"
                          :class="
                            hasMobileApp ? 'text-green-500' : 'text-gray-400'
                          "
                        >
                          {{
                            hasMobileApp
                              ? $t("nav.appStatus.installed")
                              : $t("nav.appStatus.notInstalled")
                          }}
                        </span>
                      </div>

                      <router-link
                        to="/wardrobe"
                        class="flex items-center justify-between px-4 py-2.5 cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
                        @click="closeMobileMenu"
                      >
                        <div class="flex items-center gap-2.5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-4 h-4 text-gray-700 shrink-0"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M20.25 14.15v4.25c0 .621-.504 1.125-1.125 1.125H4.875A1.125 1.125 0 013.75 18.4V14.15m16.5 0c0-1.243-1.007-2.25-2.25-2.25H6c-1.243 0-2.25 1.007-2.25 2.25m16.5 0V6.3c0-.621-.504-1.125-1.125-1.125H4.875A1.125 1.125 0 003.75 6.3v7.85m16.5 0V5.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25v8.65"
                            />
                          </svg>
                          <span
                            class="text-sm font-medium text-(--Primary-Text-color)"
                            >My Wardrobe</span
                          >
                        </div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="2"
                          stroke="currentColor"
                          class="w-3.5 h-3.5 text-gray-700 shrink-0"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M8.25 4.5l7.5 7.5-7.5 7.5"
                          />
                        </svg>
                      </router-link>

                      <!-- Feature Cards -->
                      <div class="px-3 py-2.5 flex flex-col gap-2">
                        <div
                          class="feature-card bg-[rgba(64,185,255,0.1)] dark:bg-[rgba(64,185,255,1)] cursor-pointer"
                        >
                          <div class="card-icon-container">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="w-5 h-5 text-gray-600"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                              />
                            </svg>
                          </div>
                          <div class="card-details">
                            <span class="card-title">Payment Methods</span>
                            <span class="card-desc"
                              >Manage your payment options</span
                            >
                          </div>
                        </div>
                        <router-link
                          to="/wishlist"
                          class="feature-card bg-[rgba(64,185,255,0.1)] dark:bg-[rgba(64,185,255,1)] cursor-pointer"
                          @click="closeMobileMenu"
                        >
                          <div class="card-icon-container">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="w-5 h-5 text-gray-600"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                              />
                            </svg>
                          </div>
                          <div class="card-details">
                            <span class="card-title">Wishlist</span>
                            <span class="card-desc">View your saved items</span>
                          </div>
                        </router-link>
                      </div>

                      <!-- Edit Profile -->
                      <div class="px-3 py-2.5">
                        <router-link
                          :to="`/Profile/${userId}`"
                          class="edit-profile-btn cursor-pointer"
                          @click="closeMobileMenu"
                        >
                          <span>Edit Profile</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                            class="w-4 h-4"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                            />
                          </svg>
                        </router-link>
                      </div>

                      <!-- Log out -->
                      <div
                        class="px-3 py-2 flex justify-end border-t border-gray-50"
                      >
                        <button
                          @click="
                            handleLogout();
                            closeMobileMenu();
                          "
                          class="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer"
                        >
                          <span class="logout-text">Log out</span>
                          <span class="logout-icon-box">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="2"
                              stroke="currentColor"
                              class="w-4 h-4"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 00 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
                              />
                            </svg>
                          </span>
                        </button>
                      </div>
                    </div>
                  </Transition>
                </div>
              </div>
            </aside>
          </Transition>
        </div>
      </Transition>

      <AuthModal
        :open="sharedAuthOpen"
        :mode="sharedAuthMode"
        @close="sharedAuthOpen = false"
        @switch-mode="switchMode"
        @login-success="checkUserSession"
      />
    </Teleport>
  </div>
</template>

<script>
import Logo from "../assets/Logo.png";
import LogoDark from "../assets/Logo Dark mode.png";
import LogoDark2 from "../assets/Logo Dark mode2.png";
import { SunMedium, Moon } from "@lucide/vue";

import LangSwitcher from "./LangSwitcher.vue";
import AuthModal from "./modal.vue";
import { isAuthModalOpen, authModalMode } from "../authState.js";
import { notifications, darkMode, getUserById } from "../services/services.js";
import { ref } from "vue";
import Notificationdropdown from "./Notificationdropdown.vue";

export default {
  name: "Navbar",
  components: {
    LangSwitcher,
    AuthModal,
    Notificationdropdown,
    SunMedium,
    Moon,
  },
  directives: {
    "click-outside": {
      mounted(el, binding) {
        el._clickOutside = (e) => {
          if (!el.contains(e.target)) binding.value(e);
        };
        document.addEventListener("click", el._clickOutside);
      },
      unmounted(el) {
        document.removeEventListener("click", el._clickOutside);
      },
    },
  },
  data() {
    return {
      isDark: false,
      mobileOpen: false,
      userDropdownOpen: false,
      mobileUserExpanded: false,
      languageDropdownOpen: false,
      notificationsEnabled: (() => {
        try {
          return (
            JSON.parse(localStorage.getItem("user"))?.notifications ?? false
          );
        } catch {
          return false;
        }
      })(),
      isDarkMode: (() => {
        try {
          return JSON.parse(localStorage.getItem("user"))?.darkMode ?? false;
        } catch {
          return false;
        }
      })(),
      hasMobileApp: (() => {
        try {
          return (
            JSON.parse(localStorage.getItem("user"))?.has_mobile_app ?? false
          );
        } catch {
          return false;
        }
      })(),
      user: null,
    };
  },
  setup() {
    const sharedAuthOpen = isAuthModalOpen;
    const sharedAuthMode = authModalMode;
    const userEmail = ref(
      JSON.parse(localStorage.getItem("user"))?.email || "",
    );
    console.log(userEmail);

    function openModal(mode) {
      sharedAuthMode.value = mode;
      sharedAuthOpen.value = true;
    }

    function switchMode(mode) {
      sharedAuthMode.value = mode;
    }

    return { sharedAuthOpen, sharedAuthMode, userEmail, openModal, switchMode };
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
    toggleThemeNavBtn() {
      this.isDark = !this.isDark;

      if (this.isDark) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    },
    setLanguage(lang) {
      // this.$i18n.locale = lang; // تغيير لغة التطبيق
      localStorage.setItem("user-lang", lang); // حفظ خيار المستخدم بالمتصفح
      location.reload();
    },
    async toggleNotifications() {
      const newVal = !this.notificationsEnabled;
      this.notificationsEnabled = newVal;
      try {
        await notifications(newVal);
        const { data } = await getUserById(this.userId);
        const u = data.user;
        const userData = {
          first_name: u.profile.first_name,
          last_name: u.profile.last_name,
          email: u.email,
          id: u._id,
          userImage: u.userImage,
          language: u.settings.language,
          avatars: u.avatars,
          darkMode: u.darkMode,
          has_mobile_app: u.settings.has_mobile_app,
          gender: u.profile.gender,
          date_of_birth: u.profile.date_of_birth,
          notifications: u.settings.notifications_enabled,
          role: u.role,
        };
        localStorage.setItem("user", JSON.stringify(userData));
        this.notificationsEnabled = userData.notifications ?? newVal;
      } catch (e) {
        this.notificationsEnabled = !newVal;
        console.error("Failed to update notifications setting:", e);
      }
    },
    async toggleTheme() {
      const newVal = !this.isDarkMode;
      this.isDarkMode = newVal;
      try {
        await darkMode(newVal);
        const { data } = await getUserById(this.userId);
        const u = data.user;
        const userData = {
          first_name: u.profile.first_name,
          last_name: u.profile.last_name,
          email: u.email,
          id: u._id,
          userImage: u.userImage,
          language: u.settings.language,
          avatars: u.avatars,
          darkMode: u.darkMode,
          has_mobile_app: u.settings.has_mobile_app,
          gender: u.profile.gender,
          date_of_birth: u.profile.date_of_birth,
          notifications: u.settings.notifications_enabled,
          role: u.role,
        };
        localStorage.setItem("user", JSON.stringify(userData));
        this.isDarkMode = userData.darkMode ?? newVal;
    
      } catch (e) {
        this.isDarkMode = !newVal;
        console.error("Failed to update dark mode setting:", e);
      }
    },
    closeUserDropdown() {
      this.userDropdownOpen = false;
    },
    openMobileMenu() {
      this.mobileOpen = true;
    },
    closeMobileMenu() {
      this.mobileOpen = false;
      this.mobileUserExpanded = false;
    },
    navigateAndClose(path) {
      this.closeMobileMenu();
      this.$router.push(path);
    },
    onHashLinkClick(event, hash) {
      event.preventDefault();
      this.closeMobileMenu();
      const scrollToHash = () => {
        document
          .querySelector(hash)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      };
      if (this.$route.path !== "/") {
        this.$router.push("/").then(() => {
          this.$nextTick(scrollToHash);
        });
      } else {
        scrollToHash();
      }
    },
    handleLogout() {
      // 1. Purge data infrastructure completely
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("_id");
      this.user = null;

      // 2. Clear state dynamically or force synchronization execution
      if (this.$route.meta.requiresAuth) {
        // If on a private route, force them home and refresh the canvas configuration instances
        this.$router.push("/").then(() => {
          window.location.reload();
        });
      } else {
        // If already on a public page (e.g., Home), refresh right here to update the navbar text values instantly
        window.location.reload();
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
  },
  computed: {
    navLinks() {
      return [
        {
          to: "/",
          label: this.$t("nav.features"),
          mobileLabel: this.$t("nav.features"),
        },
        {
          to: "/TryOn",
          label: this.$t("nav.tryOn"),
          mobileLabel: this.$t("nav.tryOn"),
        },
        { to: "/Recycle", label: this.$t("nav.recycle") },
        {
          to: "/#PricingSection",
          label: this.$t("nav.pricing"),
          hash: "#PricingSection",
        },
        { to: "/AboutPage", label: this.$t("nav.about") },
        { to: "/ContactUS", label: this.$t("nav.contact_us") },
      ];
    },
    userEmail() {
      return JSON.parse(localStorage.getItem("user"))?.email || "";
    },
    isLoggedIn() {
      return !!this.user;
    },
    userId() {
      return this.user?.id || this.user?._id || "";
    },
    userFullName() {
      if (!this.user) return "";
      // Google OAuth payload uses firstName/lastName
      const first =
        this.user.firstName ||
        this.user.first_name ||
        this.user.given_name ||
        "";
      const last =
        this.user.lastName ||
        this.user.last_name ||
        this.user.family_name ||
        "";
      if (first || last) return `${first} ${last}`.trim();
      if (this.user.name) return this.user.name;
      if (this.user.displayName) return this.user.displayName;
      return "User";
    },
    adaptiveHeroImage() {
      return this.isDark ? LogoDark2 : Logo;
    },
  },
  mounted() {
    this.checkUserSession();
    const savedTheme = localStorage.getItem("theme");

    // 2. If it's 'dark', or if they haven't chosen yet but their system prefers dark mode
    if (
      savedTheme === "dark" ||
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      this.isDark = true;
      document.documentElement.classList.add("dark");
    } else {
      this.isDark = false;
      document.documentElement.classList.remove("dark");
    }
  },
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
  background-color: var(--primary-bgc);
  border-color: var(--Secondary-Brand-color);
  color: var(--Secondary-Brand-color);
}

#signUp {
  background: var(--Gradient-bgc);
  padding: 0.4em 1.4em;
  border: none;
  color: white;
  background: var(--Gradient-bgc);
  padding: 0.4em 1.4em;
  border: none;
  color: white;
}

.nav-link-item {
  position: relative;
  text-decoration: none;
  /* color: #1e293b; */
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
  background-color: var(--card-surface);
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

:root[dir="rtl"] .mobile-drawer-enter-from,
:root[dir="rtl"] .mobile-drawer-leave-to {
  transform: translateX(-100%);
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

.accordion-enter-active,
.accordion-leave-active {
  transition:
    max-height 0.25s ease,
    opacity 0.2s ease;
  overflow: hidden;
  max-height: 700px;
}

.accordion-enter-from,
.accordion-leave-to {
  max-height: 0;
  opacity: 0;
}

.profile-dropdown-menu {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 18px 8px;
  gap: 12px;
  width: min(411px, calc(100vw - 24px));
  max-height: calc(100svh - 80px);
  overflow-y: auto;
}

/* 1. حقل الإيميل */
.user-email-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 7px 8px 7px 12px;
  gap: 8px;
  width: 100%;
  min-height: 28px;
  align-self: stretch;
  overflow: hidden;
}

.user-email-row .email-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
}

.email-text {
  font-family: "Inter", sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #717182;
}

/* الصفوف العادية للقائمة */
.dropdown-item-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 7px 10px;
  width: 100%;
  min-height: 38px;
  /* background: #ffffff; */
  align-self: stretch;
}

.item-leading {
  display: flex;
  align-items: center;
  gap: 12px;
}

.item-title {
  font-family: "Inter", sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
}

/* أزرار التبديل الـ Switches */
.toggle-switch {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1px;
  width: 43px;
  height: 18px;
  background: #030213;
  border-radius: 9999px;
  position: relative;
  transition: background-color 0.2s ease;
}

.toggle-circle {
  width: 16px;
  height: 16px;
  background: #ffffff;
  border-radius: 50%;
  position: absolute;
  left: 1px;
  transition: transform 0.2s ease;
  top: 1px;
  /* يضمن توسيط الدائرة عمودياً */
  transform: translateX(0);
  /* نقطة البداية الافتراضية */
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  /* أنيميشن الحركة السلسة */
}

/* عند تفعيل المفتاح: يتغير لون الخلفية للأخضر المعتمد في الـ Figma الخاص بك */
.toggle-switch.toggle-active {
  background: #8ed321;
}

/* عند تفعيل المفتاح: تنزلق الدائرة لليمين بمقدار مسافة العرض المتبقية */
.toggle-switch.toggle-active .toggle-circle {
  transform: translateX(25px);
}

.toggle-active .toggle-circle {
  transform: translateX(25px);
}

/* الكروت الملونة للميزات */
.cards-block-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 17px;
  width: 100%;
}

.feature-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 7px 8px;
  gap: 20px;
  width: 100%;
  min-height: 58px;
  /* background: rgba(64, 185, 255, 0.1); */
  border-radius: 16px;
  align-self: stretch;
}

.card-icon-container {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-details {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.card-title {
  font-family: "Inter", sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #1e1e24;
}

.card-desc {
  font-family: "Inter", sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #717182;
}

/* زر تعديل الحساب الإنشائي الأخضر */
.edit-profile-btn {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 7px 10px;
  gap: 8px;
  width: 100%;
  min-height: 50px;
  border: 1px solid #8ed321;
  border-radius: 10px;
  /* background: #ffffff; */
  color: #a6e22e;
  font-family: "Inter", sans-serif;
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
}

.edit-profile-btn:hover {
  background: rgba(142, 211, 33, 0.05);
  transform: scale(0.95) !important;
}

/* تسجيل الخروج البرتقالي السفلي */
.logout-footer {
  width: 100%;
}

.logout-action-btn {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px 12px;
  gap: 10px;
  width: 122px;
  height: 40px;
  background: transparent;
  border: none;
  cursor: pointer;
}

.logout-text {
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 32px;
  color: #ff8a3d;
}

.logout-icon-box {
  color: #ff8a3d;
  display: flex;
  align-items: center;
}

/* حركات الإنيميشن للمنيو */
.dropdown-enter-active,
.dropdown-leave-active {
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.language-sub-menu {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-top: 2px;
}

/* أزرار اختيار اللغة */
.lang-option-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 8px 16px;
  font-family: "Inter", "Roboto", sans-serif;
  font-size: 14px;
  color: #1e1e24;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.lang-option-btn:hover {
  background-color: rgba(64, 185, 255, 0.08);
  /* خلفية خفيفة متناسقة مع كروت الدفع */
  border-radius: 6px;
}

/* نمط اللغة النشطة حالياً */
.lang-option-btn.active-lang {
  font-weight: 600;
  color: #8ed321;
  /* لون البراند الأخضر لديك */
}

/* أنيميشن القائمة الفرعية */
.sub-dropdown-enter-active,
.sub-dropdown-leave-active {
  transition: all 0.2s ease-out;
}

.sub-dropdown-enter-from,
.sub-dropdown-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

.edit-profile-warber:hover {
  scale: 1.08;
}

.mobile-drawer {
  background: var(--primary-bgc);
  color: var(--Primary-Text-color);
}

.mobile-drawer-panel {
  background: var(--card-surface);
}
</style>
