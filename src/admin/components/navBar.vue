<template>
  <header class="dash-header">
    <div class="header-controls">
      <component v-if="route.meta.navbarButton" :is="route.meta.navbarButton" />
      <button type="button" class="ctrl-btn" aria-label="Action 1">
        <img src="../../assets/Icon (10).svg" alt="" />
      </button>
      <button type="button" class="ctrl-btn" aria-label="Action 2">
        <img src="../../assets/Icon (11).svg" alt="" />
      </button>
      <button type="button" class="ctrl-btn" aria-label="Action 3">
        <img src="../../assets/Icon (12).svg" alt="" />
      </button>

      <div class="vertical-divider"></div>

      <div
        class="mini-profile"
        role="button"
        tabindex="0"
        aria-label="Profile menu"
      >
        <div class="avatar-initials">DA</div>
        <img src="../../assets/Icon (13).svg" alt="" />
      </div>
    </div>
  </header>
</template>

<script setup>
import { useRoute } from "vue-router";
const route = useRoute();
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
</style>
