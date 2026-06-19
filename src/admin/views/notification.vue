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
          <div class="th th-type">Type</div>
          <div class="th th-message">Message</div>
          <div class="th th-channel">Channel</div>
          <div class="th th-sent">Sent</div>
          <div class="th th-action"></div>
        </div>

        <!-- Body -->
        <div class="t-body">
          <div class="t-row">
            <div class="td td-type">
              <span class="type-label">Order Update</span>
            </div>
            <div class="td td-message">
              Your order #ORD-4821 has been shipped and is on its way to the
              Milan Flagship store.
            </div>
            <div class="td td-channel">
              <span class="channel-icon channel-email"></span>Email
            </div>
            <div class="td td-sent">
              <span>Jun 14</span><span>9:42 AM</span>
            </div>
            <div class="td td-action">
              <button class="action-btn">
                <span class="dots-icon"></span>
              </button>
            </div>
          </div>

          <div class="t-row">
            <div class="td td-type">
              <span class="type-label">Low Stock Alert</span>
            </div>
            <div class="td td-message">
              Velvet Oxford Brogue (SKU-00412) is below the minimum stock
              threshold at Milan Flagship.
            </div>
            <div class="td td-channel">
              <span class="channel-icon channel-inapp"></span>In-App
            </div>
            <div class="td td-sent">
              <span>Jun 14</span><span>8:15 AM</span>
            </div>
            <div class="td td-action">
              <button class="action-btn">
                <span class="dots-icon"></span>
              </button>
            </div>
          </div>

          <div class="t-row">
            <div class="td td-type">
              <span class="type-label">New User</span>
            </div>
            <div class="td td-message">
              A new Global Admin account was created for hassan@redolapy.com.
            </div>
            <div class="td td-channel">
              <span class="channel-icon channel-email"></span>Email
            </div>
            <div class="td td-sent">
              <span>Jun 13</span><span>3:07 PM</span>
            </div>
            <div class="td td-action">
              <button class="action-btn">
                <span class="dots-icon"></span>
              </button>
            </div>
          </div>

          <div class="t-row">
            <div class="td td-type">
              <span class="type-label">Try-On Activity</span>
            </div>
            <div class="td td-message">
              85 virtual try-ons completed in the last 24 hours across all
              active stores.
            </div>
            <div class="td td-channel">
              <span class="channel-icon channel-inapp"></span>In-App
            </div>
            <div class="td td-sent">
              <span>Jun 13</span><span>12:00 PM</span>
            </div>
            <div class="td td-action">
              <button class="action-btn">
                <span class="dots-icon"></span>
              </button>
            </div>
          </div>

          <div class="t-row">
            <div class="td td-type">
              <span class="type-label">Store Review</span>
            </div>
            <div class="td td-message">
              London Flagship has been flagged for compliance review. Action
              required before Jun 20.
            </div>
            <div class="td td-channel">
              <span class="channel-icon channel-inapp"></span>In-App
            </div>
            <div class="td td-sent">
              <span>Jun 12</span><span>11:30 AM</span>
            </div>
            <div class="td td-action">
              <button class="action-btn">
                <span class="dots-icon"></span>
              </button>
            </div>
          </div>

          <div class="t-row">
            <div class="td td-type">
              <span class="type-label">Revenue Alert</span>
            </div>
            <div class="td td-message">
              Monthly revenue for Paris Boutique dropped below the baseline
              target for June 2025.
            </div>
            <div class="td td-channel">
              <span class="channel-icon channel-email"></span>Email
            </div>
            <div class="td td-sent">
              <span>Jun 12</span><span>9:00 AM</span>
            </div>
            <div class="td td-action">
              <button class="action-btn">
                <span class="dots-icon"></span>
              </button>
            </div>
          </div>

          <div class="t-row">
            <div class="td td-type">
              <span class="type-label">Season Launch</span>
            </div>
            <div class="td td-message">
              SS 2025 collection is now live on all store channels. 42,904
              products published.
            </div>
            <div class="td td-channel">
              <span class="channel-icon channel-inapp"></span>In-App
            </div>
            <div class="td td-sent">
              <span>Jun 11</span><span>8:00 AM</span>
            </div>
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
        <span class="footer-info">Showing 1–7 of 128 notifications</span>
        <div class="footer-nav">
          <button class="nav-btn" disabled>&#8249;</button>
          <button class="nav-btn">&#8250;</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Notifications",
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

.th-type {
  width: 160px;
  flex-shrink: 0;
}
.th-message {
  flex: 1;
}
.th-channel {
  width: 120px;
  flex-shrink: 0;
}
.th-sent {
  width: 110px;
  flex-shrink: 0;
}
.th-action {
  width: 88px;
  flex-shrink: 0;
}

/* ── Body rows ── */
.t-body {
  display: flex;
  flex-direction: column;
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

.td-type {
  width: 160px;
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

.td-channel {
  width: 120px;
  flex-shrink: 0;
  gap: 8px;
}

.td-sent {
  width: 110px;
  flex-shrink: 0;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
}

.td-action {
  width: 88px;
  flex-shrink: 0;
  justify-content: flex-end;
}

/* ── Channel icons ── */
.channel-icon {
  width: 15px;
  height: 15px;
  background: #434654;
  flex-shrink: 0;
  display: inline-block;
  mask-size: contain;
  mask-repeat: no-repeat;
  mask-position: center;
  -webkit-mask-size: contain;
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center;
}

.channel-email {
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Crect x='2' y='4' width='20' height='16' rx='2'/%3E%3Cpath d='m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7'/%3E%3C/svg%3E");
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Crect x='2' y='4' width='20' height='16' rx='2'/%3E%3Cpath d='m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7'/%3E%3C/svg%3E");
}

.channel-inapp {
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9'/%3E%3Cpath d='M13.73 21a2 2 0 0 1-3.46 0'/%3E%3C/svg%3E");
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9'/%3E%3Cpath d='M13.73 21a2 2 0 0 1-3.46 0'/%3E%3C/svg%3E");
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
