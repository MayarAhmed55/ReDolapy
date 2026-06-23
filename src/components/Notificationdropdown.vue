<template>
  <div class="notification-wrapper rounded-xl border border-gray-200 dark:border-zinc-700  bg-white dark:bg-zinc-900 text-gray-700 dark:text-zinc-300 transition-all duration-200 hover:scale-105" ref="wrapperRef">
    <!-- Bell Button -->
    <button
      type="button"
      class="notification-trigger bg-[#fefefe] dark:bg-[gray] "
      :aria-label="`Notifications${unreadCount ? ` (${unreadCount} unread)` : ''}`"
      @click="toggleDropdown"
    >
      <!-- Bell Icon (mirrored per spec: scaleX(-1)) -->
      <svg
        class="bell-icon PrimaryTxt"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style="transform: scaleX(-1)"
      >
        <path
          d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M13.73 21a2 2 0 0 1-3.46 0"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

      <!-- Red dot — only visible when there are unread notifications -->
      <span
        v-if="unreadCount > 0"
        class="notification-badge"
        aria-hidden="true"
      >
        {{ unreadCount > 9 ? "9+" : unreadCount }}
      </span>
    </button>

    <!-- Dropdown Panel -->
    <Transition name="dropdown">
      <div
        v-if="isOpen"
        class="notification-dropdown bg-[#fefefe] dark:bg-[#0d0d0d] "
        :class="isRTL ? 'open-left' : 'open-right'"
        role="menu"
        aria-label="Notifications"
      >
        <!-- Header -->
        <div class="dropdown-header">
          <span class="dropdown-title PrimaryTxt">Notifications</span>
          <button
            v-if="notifications.length > 0"
            class="delete-notification"
            @click="deleteNotification"
          >
            Delete
          </button>
          <button
            v-if="unreadCount > 0"
            type="button"
            class="mark-all-btn"
            @click="markAllRead"
          >
            Mark all read
          </button>
        </div>

        <!-- Notification List -->
        <!-- Loading -->
        <div v-if="isLoading" class="status-state">
          <svg class="spin" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#E9EBEF" stroke-width="3" />
            <path
              d="M12 2a10 10 0 0 1 10 10"
              stroke="#40B9FF"
              stroke-width="3"
              stroke-linecap="round"
            />
          </svg>
          <p>Loading...</p>
        </div>

        <!-- Error -->
        <div v-else-if="fetchError" class="status-state error-state">
          <svg viewBox="0 0 24 24" fill="none" class="empty-icon">
            <path
              d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <p>{{ fetchError }}</p>
          <button type="button" class="retry-btn" @click="fetchNotifications">
            Retry
          </button>
        </div>

        <ul v-else class="notification-list bg-white dark:bg-[#0d0d0d]" role="list">
          <li v-if="notifications.length === 0" class="empty-state">
            <svg class="empty-icon" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M13.73 21a2 2 0 0 1-3.46 0"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p>You're all caught up!</p>
          </li>

          <li
            v-for="notif in notifications"
            :key="notif.id"
            class="notification-item bg-white dark:bg-[#0d0d0d]"
            :class="{ 'is-unread': !notif.read }"
            role="menuitem"
          >
            <!-- Unread dot -->
            <span
              class="unread-dot"
              :class="{ visible: !notif.read }"
              aria-hidden="true"
            />

            <div class="notif-body">
              <p class="notif-title PrimaryTxt" v-if="notif.title">{{ notif.title }}</p>
              <p class="notif-message">{{ notif.message }}</p>
              <div class="notif-footer">
                <span class="notif-time">{{ notif.time }}</span>
                <button
                  v-if="!notif.read"
                  type="button"
                  class="mark-read-btn"
                  :disabled="notif.markingRead"
                  @click.stop="markRead(notif.id)"
                >
                  <svg
                    v-if="notif.markingRead"
                    class="btn-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="#C4C4CF"
                      stroke-width="3"
                    />
                    <path
                      d="M12 2a10 10 0 0 1 10 10"
                      stroke="#40B9FF"
                      stroke-width="3"
                      stroke-linecap="round"
                    />
                  </svg>
                  <span v-else>Mark as read</span>
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useI18n } from "vue-i18n";
import {
  getNotifications,
  markAsReadAll,
  markAsRead,
  deletAllNotifications,
  getAdminReplies,
} from "../services/services";

const { locale } = useI18n();
const isRTL = computed(() => locale.value === "ar");

// ── State ──────────────────────────────────────────────────────────────────
const isOpen = ref(false);
const wrapperRef = ref(null);
const notifications = ref([]);
const isLoading = ref(false);
const fetchError = ref(null);
const serverUnreadCount = ref(0);

// Admin-reply emails have no backend "read"/"delete" state yet, so once the
// user marks one read or deletes it locally, we remember its id here and
// filter it out of every future fetch — otherwise the next poll re-adds it.
const DISMISSED_EMAILS_KEY = "dismissedAdminEmailIds";
const dismissedEmailIds = ref(loadDismissedEmailIds());

function loadDismissedEmailIds() {
  try {
    const raw = localStorage.getItem(DISMISSED_EMAILS_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

function persistDismissedEmailIds() {
  try {
    localStorage.setItem(
      DISMISSED_EMAILS_KEY,
      JSON.stringify([...dismissedEmailIds.value]),
    );
  } catch {
    // ignore storage errors (e.g. private browsing quota)
  }
}

function dismissEmail(id) {
  dismissedEmailIds.value.add(id);
  persistDismissedEmailIds();
}

function dismissEmails(ids) {
  ids.forEach((id) => dismissedEmailIds.value.add(id));
  persistDismissedEmailIds();
}

// ── Computed ───────────────────────────────────────────────────────────────
// Use server unreadCount for the badge; fall back to local count
const unreadCount = computed(() =>
  serverUnreadCount.value !== null
    ? serverUnreadCount.value
    : notifications.value.filter((n) => !n.read).length,
);
let notificationInterval;

onMounted(() => {
  fetchNotifications();
  document.addEventListener("mousedown", handleOutsideClick);

  notificationInterval = setInterval(() => {
    if (!isOpen.value) {
      fetchNotifications();
    }
  }, 3000);
});

onBeforeUnmount(() => {
  clearInterval(notificationInterval);
  document.removeEventListener("mousedown", handleOutsideClick);
});
// ── Helpers ────────────────────────────────────────────────────────────────
function formatTime(dateStr) {
  if (!dateStr) return "";
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hr ago`;
  const days = Math.floor(hrs / 24);
  if (days === 1) return "Yesterday";
  return `${days} days ago`;
}

function normalise(item) {
  return {
    id: item._id,
    message: item.body,
    title: item.title,
    type: item.type,
    time: formatTime(item.createdAt),
    rawTime: item.createdAt,
    read: item.read ?? false,
    markingRead: false,
  };
}

function normaliseEmail(item) {
  return {
    id: item._id,
    title: item.subject,
    message: item.message,
    type: "admin_email",
    time: formatTime(item.created_at),
    rawTime: item.created_at,
    read: item.isRead ?? false,
    markingRead: false,
  };
}

// ── Fetch ──────────────────────────────────────────────────────────────────
async function fetchNotifications() {
  if (isLoading.value) return;

  isLoading.value = true;
  fetchError.value = null;

  try {
    const notificationRes = await getNotifications();
    const adminRepliesRes = await getAdminReplies();

    const { notifications: raw, unreadCount: serverCount } =
      notificationRes.data;

    const normalNotifs = (raw ?? []).map(normalise);

    const emailNotifs = (adminRepliesRes.data?.emails ?? [])
      .map(normaliseEmail)
      .filter((n) => !dismissedEmailIds.value.has(n.id));

    // Merge both sources, newest first
    notifications.value = [...normalNotifs, ...emailNotifs].sort(
      (a, b) => new Date(b.rawTime || 0) - new Date(a.rawTime || 0),
    );

    const unreadEmails = emailNotifs.filter((n) => !n.read).length;

    serverUnreadCount.value =
      (serverCount ?? normalNotifs.filter((n) => !n.read).length) +
      unreadEmails;
  } catch (err) {
    fetchError.value = "Failed to load notifications.";
    console.error("[NotificationDropdown]", err);
  } finally {
    isLoading.value = false;
  }
}
// ── Methods ────────────────────────────────────────────────────────────────
function toggleDropdown() {
  isOpen.value = !isOpen.value;
  if (isOpen.value) fetchNotifications();
}

async function markRead(id) {
  const notif = notifications.value.find((n) => n.id === id);
  if (!notif || notif.read) return;

  // Optimistic UI — disable the button immediately
  notif.markingRead = true;

  try {
    if (notif.type === "admin_email") {
      // No backend endpoint yet — remember it locally so it stays hidden
      dismissEmail(id);
    } else {
      await markAsRead(id);
    }
    if (serverUnreadCount.value > 0) serverUnreadCount.value--;
    // Remove it from the list now that it's read
    notifications.value = notifications.value.filter((n) => n.id !== id);
  } catch (err) {
    console.error("[NotificationDropdown] markAsRead failed", err);
    notif.markingRead = false;
  }
}

async function markAllRead() {
  const previous = notifications.value;

  // Backend only marks regular notifications as read — remember the admin
  // emails locally so they don't reappear on the next poll.
  const emailIds = previous
    .filter((n) => n.type === "admin_email")
    .map((n) => n.id);
  dismissEmails(emailIds);

  // Optimistic clear — list and badge disappear immediately
  notifications.value = [];
  serverUnreadCount.value = 0;

  try {
    await markAsReadAll();
  } catch (err) {
    console.error("[NotificationDropdown] markAsReadAll failed", err);
    // Roll back if the request didn't actually go through
    notifications.value = previous;
    serverUnreadCount.value = previous.filter((n) => !n.read).length;
  }
}
const deleteNotification = async () => {
  if (notifications.value.length === 0) return;

  // Backend delete only removes regular notifications — remember the admin
  // emails locally so they don't reappear on the next poll.
  const previous = notifications.value;
  const emailIds = previous
    .filter((n) => n.type === "admin_email")
    .map((n) => n.id);
  dismissEmails(emailIds);

  // Optimistic clear — list and Delete button disappear immediately
  notifications.value = [];
  serverUnreadCount.value = 0;

  try {
    await deletAllNotifications();
  } catch (err) {
    console.error("[NotificationDropdown] deletAllNotifications failed", err);
    // Roll back if the delete didn't actually go through
    notifications.value = previous;
    serverUnreadCount.value = previous.filter((n) => !n.read).length;
  }
};

// Close on outside click
function handleOutsideClick(e) {
  if (wrapperRef.value && !wrapperRef.value.contains(e.target)) {
    isOpen.value = false;
  }
}
</script>

<style scoped>
/* ── Wrapper ──────────────────────────────────────────────────────────── */
.notification-wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
}

/* ── Trigger Button ───────────────────────────────────────────────────── */
.notification-trigger {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  border-radius: 50%;
  cursor: pointer;
  color: #121826;
  transition: background 0.15s;
}
.notification-trigger:hover {
  /* background: #f1f5f9; */
}

.bell-icon {
  width: 22px;
  height: 22px;
}

/* ── Red Badge ────────────────────────────────────────────────────────── */
.notification-badge {
  position: absolute;
  top: 4px;
  right: 4px;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  background: #ff8a3d;
  color: #fff;
  font-size: 9px;
  font-weight: 700;
  line-height: 16px;
  border-radius: 999px;
  text-align: center;
  pointer-events: none;
  /* keeps it on top */
  z-index: 1;
}

/* ── Dropdown Panel ───────────────────────────────────────────────────── */
.notification-dropdown {
  position: fixed;
  top: 60px;
  width: min(320px, calc(100vw - 16px));
  /* background: #fefefefe; */
  border: 1px solid #e9ebef;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  z-index: 1000;
}

/* LTR: anchor to right edge of viewport */
.notification-dropdown.open-right {
  right: 8px;
  left: auto;
}

/* RTL: anchor to left edge of viewport */
.notification-dropdown.open-left {
  left: 8px;
  right: auto;
}

/* ── Header ───────────────────────────────────────────────────────────── */
.dropdown-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 18px 12px;
  border-bottom: 1px solid #e9ebef;
}
.dropdown-title {
  font-size: 15px;
  font-weight: 600;
  /* color: #0a0a0a; */
}
.mark-all-btn {
  background: none;
  border: none;
  font-size: 12px;
  font-weight: 500;
  color: #40b9ff;
  cursor: pointer;
  padding: 0;
  transition: opacity 0.15s;
}
.mark-all-btn:hover {
  opacity: 0.75;
}
.delete-notification {
  background: none;
  border: none;
  font-size: 12px;
  font-weight: 500;
  color: #b00020;
  cursor: pointer;
  padding: 0;
  transition: opacity 0.15s;
}
.delete-notification:hover {
  opacity: 0.75;
}

/* ── List ─────────────────────────────────────────────────────────────── */
.notification-list {
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 320px;
  overflow-y: auto;
}
.notification-list::-webkit-scrollbar {
  width: 4px;
}
.notification-list::-webkit-scrollbar-thumb {
  /* background: #e9ebef; */
  border-radius: 4px;
}

/* ── Empty State ──────────────────────────────────────────────────────── */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 36px 16px;
  color: #717182;
  font-size: 13px;
}
.empty-icon {
  width: 32px;
  height: 32px;
  color: #c4c4cf;
}

/* ── Notification Item ────────────────────────────────────────────────── */
.notification-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 14px 18px;
  cursor: pointer;
  border-bottom: 1px solid #f1f5f9;
  transition: background 0.12s;
}
.notification-item:last-child {
  border-bottom: none;
}
.notification-item:hover {
  /* background: #f9fafb; */
}
.notification-item.is-unread {
  /* background: #f0faff; */
}
.notification-item.is-unread:hover {
  /* background: #e5f6ff; */
}

.unread-dot {
  flex-shrink: 0;
  margin-top: 5px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: transparent;
  transition: background 0.15s;
}
.unread-dot.visible {
  background: #40b9ff;
}

.notif-body {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  min-width: 0;
}
.notif-title {
  font-size: 13px;
  font-weight: 600;
  /* color: #0a0a0a; */
  margin: 0;
}
.notif-message {
  font-size: 12px;
  color: #717182;
  line-height: 1.45;
  margin: 0;
}
.notif-time {
  font-size: 11px;
  color: #717182;
}

/* ── Dropdown Animation ───────────────────────────────────────────────── */
.dropdown-enter-active,
.dropdown-leave-active {
  transition:
    opacity 0.18s ease,
    transform 0.18s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

/* ── Loading / Error State ────────────────────────────────────────────── */
.status-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 36px 16px;
  color: #717182;
  font-size: 13px;
}
.status-state svg {
  width: 32px;
  height: 32px;
}
.error-state {
  color: #d4183d;
}
.retry-btn {
  margin-top: 4px;
  background: none;
  border: 1px solid #d4183d;
  color: #d4183d;
  border-radius: 8px;
  padding: 4px 12px;
  font-size: 12px;
  cursor: pointer;
  transition: background 0.15s;
}
.retry-btn:hover {
  background: #fff5f5;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
.spin {
  animation: spin 0.9s linear infinite;
}

/* ── Per-item Mark as Read ────────────────────────────────────────────── */
.notif-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-top: 2px;
}
.mark-read-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  padding: 0;
  font-size: 11px;
  font-weight: 500;
  color: #40b9ff;
  cursor: pointer;
  white-space: nowrap;
  transition: opacity 0.15s;
  flex-shrink: 0;
}
.mark-read-btn:hover:not(:disabled) {
  opacity: 0.7;
}
.mark-read-btn:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
.btn-spin {
  width: 12px;
  height: 12px;
  animation: spin 0.9s linear infinite;
}
</style>