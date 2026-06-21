<template>
  <div class="notifications-page">
    <!-- Page Header -->
    <section class="page-header">
      <div class="page-title-group">
        <h1 class="page-title">Notifications</h1>
        <p class="page-subtitle">
          Manage and monitor all system and user-facing notifications.
        </p>
      </div>
    </section>

    <!-- Notification Table Card -->
    <div class="notif-card">
      <!-- Card Header -->
      <div class="card-header">
        <span class="card-title">Notification Center</span>
      </div>

      <!-- Table -->
      <div class="notif-table">
        <!-- Header Row -->
        <div class="t-header">
          <div class="th th-title">Title</div>
          <div class="th th-message">Body</div>
          <div class="th th-read">Read</div>
          <div class="th th-sent">Created At</div>
          <div class="th th-action"></div>
        </div>

        <!-- Body -->
        <div class="t-body">

          <div v-if="loading" class="t-empty">Loading notifications…</div>
          <div v-else-if="notifications.length === 0" class="t-empty">No notifications found.</div>

          <div
            v-for="notif in notifications"
            :key="notif._id"
            class="t-row"
            :class="{ 'row-unread': !notif.read }"
          >
            <!-- Title -->
            <div class="td td-title">
              <span class="type-label">{{ notif.title }}</span>
            </div>

            <!-- Body -->
            <div class="td td-message">{{ notif.body }}</div>

            <!-- Read status -->
            <div class="td td-read">
              <span class="read-badge" :class="notif.read ? 'badge-read' : 'badge-unread'">
                {{ notif.read ? 'Read' : 'Unread' }}
              </span>
            </div>

            <!-- Created At -->
            <div class="td td-sent">
              <span>{{ notif.dateLabel }}</span>
              <span>{{ notif.timeLabel }}</span>
            </div>

            <!-- Action -->
            <div class="td td-action">
              <button class="action-btn">
                <span class="dots-icon"></span>
              </button>
            </div>
          </div>

        </div>
      </div>

      <!-- Footer / Pagination -->
      <div class="card-footer">
        <span class="footer-info">Showing {{ notifications.length }} of {{ totalCount }} notifications</span>
        <div class="footer-nav">
          <button class="nav-btn" :disabled="currentPage === 1" @click="prevPage">&#8249;</button>
          <button class="nav-btn" :disabled="currentPage >= totalPages" @click="nextPage">&#8250;</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllNotifications } from '../../services/services';

const PAGE_SIZE = 10;

function formatDate(iso) {
  if (!iso) return { dateLabel: '—', timeLabel: '' };
  const d = new Date(iso);
  return {
    dateLabel: d.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' }),
    timeLabel: d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };
}

function mapNotification(raw) {
  const { dateLabel, timeLabel } = formatDate(raw.createdAt);
  return {
    _id:       raw._id,
    title:     raw.title     ?? '—',
    body:      raw.body      ?? '—',
    read:      raw.read      ?? false,
    dateLabel,
    timeLabel,
  };
}

export default {
  name: 'Notifications',

  data() {
    return {
      allNotifications: [],
      totalCount:       0,
      currentPage:      1,
      loading:          false,
    };
  },

  computed: {
    totalPages() {
      return Math.max(1, Math.ceil(this.allNotifications.length / PAGE_SIZE));
    },
    notifications() {
      const start = (this.currentPage - 1) * PAGE_SIZE;
      return this.allNotifications.slice(start, start + PAGE_SIZE);
    },
  },

  methods: {
    async fetchNotifications() {
      this.loading = true;
      try {
        const res  = await getAllNotifications();
        const body = res.data;
        const raw  = Array.isArray(body) ? body : (body.notifications ?? body.data ?? []);
        this.allNotifications = raw.map(mapNotification);
        this.totalCount       = this.allNotifications.length;
      } catch (err) {
        console.error('Failed to fetch notifications', err);
      } finally {
        this.loading = false;
      }
    },

    prevPage() { if (this.currentPage > 1)              this.currentPage--; },
    nextPage() { if (this.currentPage < this.totalPages) this.currentPage++; },
  },

  mounted() {
    this.fetchNotifications();
  },
};
</script>

<style scoped>
.notifications-page {
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 32px 24px;
  width: 100%;
  font-family: "Geist", sans-serif;
  color: #191b23;
}

/* ── Page Header ── */
.page-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
}

.page-title-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.page-title {
  font-size: 32px;
  font-weight: 600;
  line-height: 40px;
  letter-spacing: -0.64px;
  color: #191b23;
  margin: 0;
}

.page-subtitle {
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: #434654;
  margin: 0;
}

/* ── Notification Card ── */
.notif-card {
  display: flex;
  flex-direction: column;
  background: #faf8ff;
  border: 1px solid #c3c5d7;
  border-radius: 12px;
  overflow: hidden;
}

.card-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  background: #ffffff;
  border-bottom: 1px solid #c3c5d7;
}

.card-title {
  font-size: 20px;
  font-weight: 700;
  line-height: 28px;
  letter-spacing: -0.2px;
  color: #191b23;
}

/* ── Table ── */
.notif-table {
  display: flex;
  flex-direction: column;
  overflow-x: auto;
}

.t-header {
  display: flex;
  flex-direction: row;
  background: #f3f3fe;
}

.th {
  padding: 24px;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0.24px;
  color: #434654;
  border-bottom: 1px solid #c3c5d7;
  white-space: nowrap;
  box-sizing: border-box;
}

.th-title {
  width: 180px;
  flex-shrink: 0;
}
.th-message {
  flex: 1;
}
.th-read {
  width: 100px;
  flex-shrink: 0;
}
.th-sent {
  width: 150px;
  flex-shrink: 0;
}
.th-action {
  width: 64px;
  flex-shrink: 0;
}

/* ── Body rows ── */
.t-body {
  display: flex;
  flex-direction: column;
}

.t-empty {
  padding: 40px;
  text-align: center;
  font-size: 14px;
  color: #99a1af;
  background: #ffffff;
}

.t-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid #c3c5d7;
  min-height: 73px;
  background: #ffffff;
  transition: background 0.15s;
  box-sizing: border-box;
}

.t-row.row-unread {
  background: #f5f6ff;
  border-left: 3px solid #1550d3;
}

.t-row:last-child {
  border-bottom: none;
}

.t-row:hover {
  background: #f9f9fc;
}

.t-row:hover .action-btn {
  opacity: 1;
}

/* ── Cells ── */
.td {
  padding: 16px 24px;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: #434654;
  display: flex;
  align-items: center;
  box-sizing: border-box;
}

.td-title {
  width: 180px;
  flex-shrink: 0;
}

.type-label {
  font-size: 12px;
  font-weight: 700;
  line-height: 16px;
  letter-spacing: 0.24px;
  color: #191b23;
}

.td-message {
  flex: 1;
  color: #434654;
}

.td-read {
  width: 100px;
  flex-shrink: 0;
}

.read-badge {
  font-size: 11px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 999px;
}

.badge-read {
  background: #e6f4ef;
  color: #006c49;
}

.badge-unread {
  background: #e8edfc;
  color: #1550d3;
}

.td-sent {
  width: 150px;
  flex-shrink: 0;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
}

.td-action {
  width: 64px;
  flex-shrink: 0;
  justify-content: flex-end;
}

/* ── Action button ── */
.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: none;
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  opacity: 0;
  transition:
    opacity 0.15s,
    background 0.15s;
}

.action-btn:hover {
  background: #f0f0f8;
}

.dots-icon {
  width: 4px;
  height: 16px;
  background: #737686;
  display: block;
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 16'%3E%3Ccircle cx='2' cy='2' r='1.5' fill='currentColor'/%3E%3Ccircle cx='2' cy='8' r='1.5' fill='currentColor'/%3E%3Ccircle cx='2' cy='14' r='1.5' fill='currentColor'/%3E%3C/svg%3E");
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 16'%3E%3Ccircle cx='2' cy='2' r='1.5' fill='currentColor'/%3E%3Ccircle cx='2' cy='8' r='1.5' fill='currentColor'/%3E%3Ccircle cx='2' cy='14' r='1.5' fill='currentColor'/%3E%3C/svg%3E");
  mask-size: contain;
  mask-repeat: no-repeat;
  mask-position: center;
}

/* ── Footer / Pagination ── */
.card-footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  border-top: 1px solid #c3c5d7;
}

.footer-info {
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: #434654;
}

.footer-nav {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
}

.nav-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 30px;
  background: none;
  border: 1px solid #c3c5d7;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  color: #191b23;
  transition: background 0.15s;
}

.nav-btn:hover {
  background: #f0f0f8;
}

.nav-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>