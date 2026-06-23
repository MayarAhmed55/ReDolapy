<template>
  <header class="dash-header">
    <div class="header-controls">
      <component v-if="route.meta.navbarButton" :is="route.meta.navbarButton" />
      <button
        type="button"
        class="ctrl-btn"
        aria-label="Action 1"
        @click="router.push('/admin/notifications')"
      >
        <img src="../../assets/Icon (10).svg" alt="" />
      </button>
      <button
        type="button"
        class="ctrl-btn"
        aria-label="Action 2"
        @click="router.push('/admin/emailCenter')"
      >
        <img src="../../assets/Icon (11).svg" alt="" />
      </button>
      <!-- <button type="button" class="ctrl-btn" aria-label="Action 3">
        <img src="../../assets/Icon (12).svg" alt="" />
      </button> -->

      <div class="vertical-divider"></div>

      <div class="profile-menu-wrapper" ref="profileMenuRef">
        <div
          class="mini-profile"
          role="button"
          tabindex="0"
          aria-label="Profile menu"
          aria-haspopup="true"
          :aria-expanded="isProfileMenuOpen"
          @click="toggleProfileMenu"
          @keydown.enter.prevent="toggleProfileMenu"
          @keydown.space.prevent="toggleProfileMenu"
        >
          <div class="avatar-initials">DA</div>
          <img src="../../assets/Icon (13).svg" alt="" />
        </div>

        <transition name="dropdown-fade">
          <div v-if="isProfileMenuOpen" class="profile-dropdown" role="menu">
            <button
              type="button"
              class="profile-dropdown-item"
              role="menuitem"
              @click="logout"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Logout
            </button>
          </div>
        </transition>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const isProfileMenuOpen = ref(false);
const profileMenuRef = ref(null);

function toggleProfileMenu() {
  isProfileMenuOpen.value = !isProfileMenuOpen.value;
}

function closeProfileMenu() {
  isProfileMenuOpen.value = false;
}

function handleClickOutside(event) {
  if (profileMenuRef.value && !profileMenuRef.value.contains(event.target)) {
    closeProfileMenu();
  }
}

function logout() {
  localStorage.removeItem("_id");
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  closeProfileMenu();
  router.push("/");
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>
.dash-header {
  width: 100%;
  height: 110px;
  flex-shrink: 0;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: #ffffff;
  font-family: "Geist", sans-serif;
  box-sizing: border-box;
  border-bottom: 1px solid #edeeef;
}

.search-icon-img {
  width: 13.5px;
  height: 13.5px;
  flex-shrink: 0;
}

.search-input {
  width: 100%;
  border: none;
  background: transparent;
  font-family: "Geist", sans-serif;
  font-size: 14px;
  line-height: 18px;
  color: #191b23;
}

.search-input::placeholder {
  color: #6b7280;
}

.search-input:focus {
  outline: none;
}

/* --- Pill-style page action buttons (left of header-actions) --- */
.pill-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* --- Page Action Button (left of header-controls) --- */
.header-actions {
  display: flex;
  align-items: center;
}

.add-action-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  height: 40px;
  padding: 0 16px;
  background: #3c6bed;
  border: none;
  border-radius: 8px;
  color: #ffffff;
  font-family: "Geist", sans-serif;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s;
}

.add-action-btn:hover {
  background: #2f56c4;
}

.add-action-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

/* --- Right Side Controls --- */
.header-controls {
  display: flex;
  align-items: center;
  gap: 16px;
  height: 36px;
  margin-left: auto;
}

.ctrl-btn {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  border-radius: 6px;
  transition: background 0.2s;
}

.ctrl-btn:hover {
  background: rgba(0, 0, 0, 0.05);
}

.ctrl-btn img {
  display: block;
}

.vertical-divider {
  width: 1px;
  height: 32px;
  background: #c3c5d7;
}

/* --- Profile --- */
.mini-profile {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  height: 32px;
}

.avatar-initials {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  background: #3c6bed;
  border-radius: 50%;
  font-family: "Geist", sans-serif;
  font-weight: 700;
  font-size: 12px;
  color: #ffffff;
  text-transform: uppercase;
}

.profile-menu-wrapper {
  position: relative;
}

.profile-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 160px;
  background: #ffffff;
  border: 1px solid #edeeef;
  border-radius: 10px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.08);
  padding: 6px;
  z-index: 50;
}

.profile-dropdown-item {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 10px 12px;
  background: none;
  border: none;
  border-radius: 6px;
  font-family: "Geist", sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: #ba1a1a;
  cursor: pointer;
  text-align: left;
  transition: background 0.2s;
}

.profile-dropdown-item:hover {
  background: rgba(186, 26, 26, 0.08);
}

.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.dropdown-fade-enter-from,
.dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>