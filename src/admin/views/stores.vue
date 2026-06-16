<template>
  <div class="stores-page">
    <!-- Content Area -->
    <main class="content">
      <!-- Page Header -->
      <div class="page-header">
        <div>
          <h1 class="page-title">Stores</h1>
          <p class="page-subtitle">Manage and monitor all connected storefronts across your platform.</p>
        </div>
      </div>

      <!-- Toolbar -->
      <div class="toolbar">
        <div class="toolbar-left">
          <!-- Search -->
          <div class="search-wrap">
            <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="11" cy="11" r="7" /><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35" />
            </svg>
            <input type="text" v-model="searchQuery" placeholder="Filter by name..." class="search-input" />
          </div>

          <!-- Status filter -->
          <div class="select-wrap">
            <select v-model="statusFilter" class="status-select">
              <option value="">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <svg class="select-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
        </div>

        <div class="toolbar-right">
          <button class="btn-icon-only" aria-label="Filter">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="icon-sm">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
            </svg>
          </button>
          <button class="btn-text-link">+ Add New Store</button>
        </div>
      </div>

      <!-- Table -->
      <div class="table-card">
        <div class="table-scroll">
          <table class="store-table">
            <thead>
              <tr>
                <th>Store Name</th>
                <th>Domain</th>
                <th>Active Campaign</th>
                <th>Total Orders</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="store in filteredStores" :key="store.id">
                <!-- Store Name -->
                <td>
                  <div class="store-name-cell">
                    <div class="store-logo-box">
                      <div class="store-logo-placeholder" :style="{ background: store.logoColor }">
                        {{ store.name.charAt(0) }}
                      </div>
                    </div>
                    <div>
                      <div class="store-name">{{ store.name }}</div>
                      <div class="store-id">{{ store.storeId }}</div>
                    </div>
                  </div>
                </td>

                <!-- Domain -->
                <td>
                  <a :href="'https://' + store.domain" class="store-link" target="_blank">
                    {{ store.domain }}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon-xs">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </a>
                </td>

                <!-- Active Campaign -->
                <td>
                  <div class="campaign-cell">
                    <div class="campaign-top">
                      <span :class="['discount-badge', store.discountType === 'sale' ? 'badge-green' : 'badge-gray']">
                        {{ store.discountCode }}
                      </span>
                      <span class="campaign-discount-val">{{ store.discountValue }}</span>
                    </div>
                    <div class="campaign-name">{{ store.campaignName }}</div>
                  </div>
                </td>

                <!-- Total Orders -->
                <td>
                  <div class="orders-cell">
                    <span class="orders-count">{{ store.orders.toLocaleString() }}</span>
                    <div class="orders-bar-track">
                      <div class="orders-bar-fill" :style="{ width: store.orderPct + '%' }"></div>
                    </div>
                  </div>
                </td>

                <!-- Status -->
                <td>
                  <span :class="['status-pill', store.status === 'Active' ? 'pill-active' : 'pill-inactive']">
                    <span class="pill-dot"></span>
                    {{ store.status }}
                  </span>
                </td>

                <!-- Actions -->
                <td>
                  <div class="actions-cell">
                    <button class="action-btn" aria-label="Edit">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="icon-sm">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                      </svg>
                    </button>
                    <button class="action-btn" aria-label="More options">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="icon-sm">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination Footer -->
        <div class="pagination-footer">
          <span class="pagination-info">Showing 1–6 of 48 stores</span>
          <div class="pagination-controls">
            <button class="page-btn page-btn--disabled" disabled aria-label="Previous">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon-xs">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button class="page-btn page-btn--active">1</button>
            <button class="page-btn">2</button>
            <button class="page-btn">3</button>
            <span class="page-ellipsis">…</span>
            <button class="page-btn">10</button>
            <button class="page-btn" aria-label="Next">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon-xs">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')
const statusFilter = ref('')

const stores = ref([
  {
    id: 1,
    name: 'Vogue Boutique',
    storeId: 'STR-0041',
    logoColor: '#e9d5ff',
    domain: 'vogueboutique.co',
    discountCode: 'SALE20',
    discountType: 'sale',
    discountValue: '20%',
    campaignName: 'Storewide Season Sale',
    orders: 12402,
    orderPct: 75,
    status: 'Active',
  },
  {
    id: 2,
    name: 'Urban Loft',
    storeId: 'STR-0038',
    logoColor: '#fde68a',
    domain: 'urbanloft.store',
    discountCode: 'INFL15',
    discountType: 'sale',
    discountValue: '15%',
    campaignName: 'Influencer Campaign',
    orders: 3890,
    orderPct: 40,
    status: 'Inactive',
  },
  {
    id: 3,
    name: 'Celestia',
    storeId: 'STR-0035',
    logoColor: '#bfdbfe',
    domain: 'celestia.fashion',
    discountCode: 'FLASH',
    discountType: 'sale',
    discountValue: '30%',
    campaignName: 'Flash Weekend Drop',
    orders: 7201,
    orderPct: 60,
    status: 'Active',
  },
  {
    id: 4,
    name: 'Marble & Oak',
    storeId: 'STR-0031',
    logoColor: '#d1fae5',
    domain: 'marbleoak.com',
    discountCode: 'INFL15',
    discountType: 'sale',
    discountValue: '15%',
    campaignName: 'Influencer Campaign',
    orders: 4105,
    orderPct: 35,
    status: 'Inactive',
  },
  {
    id: 5,
    name: 'Ethereal Silk',
    storeId: 'STR-0027',
    logoColor: '#fce7f3',
    domain: 'etherealsilk.co',
    discountCode: '-',
    discountType: 'none',
    discountValue: '0',
    campaignName: 'No Active Codes',
    orders: 850,
    orderPct: 15,
    status: 'Active',
  },
  {
    id: 6,
    name: 'Noir Studio',
    storeId: 'STR-0019',
    logoColor: '#e5e7eb',
    domain: 'noirstudio.io',
    discountCode: '-',
    discountType: 'none',
    discountValue: '0',
    campaignName: 'No Active Codes',
    orders: 620,
    orderPct: 10,
    status: 'Active',
  },
])

const filteredStores = computed(() =>
  stores.value.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesStatus = !statusFilter.value || s.status.toLowerCase() === statusFilter.value
    return matchesSearch && matchesStatus
  })
)
</script>

<style scoped>
/* ─── Tokens ─────────────────────────────────────────── */
:root {
  --bg: #FAF8FF;
  --surface: #FFFFFF;
  --border: rgba(195, 197, 215, 0.3);
  --border-solid: #C3C5D7;
  --blue: #1550D3;
  --blue-light: #F3F3FE;
  --text-primary: #191B23;
  --text-secondary: #434654;
  --text-muted: #737686;
  --text-placeholder: #6B7280;
  --green-bg: rgba(108, 248, 187, 0.2);
  --green-border: rgba(0, 108, 73, 0.2);
  --green-text: #006C49;
  --inactive-bg: #E7E7F2;
  --inactive-dot: #737686;
  --inactive-text: #434654;
  --radius-card: 12px;
  --radius-btn: 8px;
  --font-geist: 'Geist', 'Inter', system-ui, sans-serif;
  --font-mono: 'Geist Mono', 'JetBrains Mono', monospace;
}

/* ─── Page Shell ─────────────────────────────────────── */
.stores-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--bg);
  font-family: var(--font-geist);
  color: var(--text-primary);
}

/* ─── Top Bar ────────────────────────────────────────── */
.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 80px 0 32px;
  height: 64px;
  background: var(--surface);
  border-bottom: 1px solid var(--border-solid);
  gap: 24px;
  flex-shrink: 0;
}

.topbar-search {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #EDEEEF;
  border: 1px solid var(--border-solid);
  border-radius: 16px;
  padding: 8px 16px;
  width: 412px;
  max-width: 100%;
}

.topbar-search-icon {
  width: 14px;
  height: 14px;
  color: var(--text-secondary);
  flex-shrink: 0;
}

.topbar-input {
  border: none;
  background: transparent;
  outline: none;
  font-family: var(--font-geist);
  font-size: 14px;
  color: var(--text-primary);
  width: 100%;
}

.topbar-input::placeholder { color: var(--text-placeholder); }

.topbar-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.btn-add-store {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 20px;
  background: var(--blue);
  color: #fff;
  border: none;
  border-radius: 9999px;
  font-family: var(--font-geist);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.24px;
  cursor: pointer;
  white-space: nowrap;
}

.btn-add-store:hover { background: #1240b5; }

.topbar-icon-group {
  display: flex;
  align-items: center;
  gap: 4px;
  padding-left: 16px;
  border-left: 1px solid var(--border-solid);
}

.icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: transparent;
  border: none;
  border-radius: 6px;
  color: var(--text-secondary);
  cursor: pointer;
}

.icon-btn:hover { background: var(--blue-light); }

/* ─── Content ────────────────────────────────────────── */
.content {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px 32px;
  overflow-y: auto;
}

/* ─── Page Header ────────────────────────────────────── */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.page-title {
  font-size: 32px;
  font-weight: 700;
  line-height: 40px;
  letter-spacing: -0.64px;
  color: var(--text-primary);
  margin: 0 0 4px;
}

.page-subtitle {
  font-size: 14px;
  font-weight: 400;
  color: var(--text-secondary);
  margin: 0;
}

/* ─── Toolbar ────────────────────────────────────────── */
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.toolbar-left {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.search-wrap {
  position: relative;
  flex: 1;
  max-width: 480px;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 15px;
  height: 15px;
  color: #737686;
  pointer-events: none;
}

.search-input {
  width: 100%;
  box-sizing: border-box;
  padding: 11px 16px 11px 38px;
  background: var(--bg);
  border: 1px solid var(--border-solid);
  border-radius: var(--radius-btn);
  font-family: var(--font-geist);
  font-size: 14px;
  color: var(--text-primary);
  outline: none;
}

.search-input::placeholder { color: var(--text-placeholder); }
.search-input:focus { border-color: var(--blue); box-shadow: 0 0 0 3px rgba(21,80,211,0.1); }

.select-wrap {
  position: relative;
  flex-shrink: 0;
}

.status-select {
  appearance: none;
  padding: 10px 36px 10px 16px;
  background: var(--bg);
  border: 1px solid var(--border-solid);
  border-radius: var(--radius-btn);
  font-family: var(--font-geist);
  font-size: 14px;
  color: var(--text-primary);
  cursor: pointer;
  outline: none;
  min-width: 160px;
}

.status-select:focus { border-color: var(--blue); }

.select-chevron {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 14px;
  height: 14px;
  color: #6B7280;
  pointer-events: none;
}

.toolbar-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-icon-only {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: #E7E7F2;
  border: none;
  border-radius: var(--radius-btn);
  color: var(--text-secondary);
  cursor: pointer;
}

.btn-icon-only:hover { background: #ddddf0; }

.btn-text-link {
  background: none;
  border: none;
  font-family: var(--font-geist);
  font-size: 12px;
  font-weight: 500;
  color: var(--blue);
  letter-spacing: 0.24px;
  cursor: pointer;
  white-space: nowrap;
  padding: 0 4px;
}

.btn-text-link:hover { text-decoration: underline; }

/* ─── Table Card ─────────────────────────────────────── */
.table-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  box-shadow: 0px 1px 2px rgba(0,0,0,0.05);
  overflow: hidden;
}

.table-scroll { overflow-x: auto; }

.store-table {
  width: 100%;
  border-collapse: collapse;
}

.store-table thead tr {
  background: var(--blue-light);
  border-bottom: 1px solid var(--border-solid);
}

.store-table th {
  padding: 16px 24px;
  font-family: var(--font-geist);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: var(--text-secondary);
  text-align: left;
  white-space: nowrap;
}

.store-table tbody tr {
  border-top: 1px solid var(--border);
  transition: background 0.1s;
}

.store-table tbody tr:first-child { border-top: none; }
.store-table tbody tr:hover { background: #fafafe; }

.store-table td {
  padding: 20px 24px;
  font-size: 14px;
  vertical-align: middle;
}

/* ─── Store Name Cell ────────────────────────────────── */
.store-name-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}

.store-logo-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid rgba(195,197,215,0.5);
  border-radius: 8px;
  background: var(--bg);
  flex-shrink: 0;
  overflow: hidden;
}

.store-logo-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
  color: var(--text-primary);
}

.store-name {
  font-weight: 700;
  font-size: 14px;
  color: var(--text-primary);
  line-height: 1.3;
}

.store-id {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-secondary);
  letter-spacing: 0.24px;
  margin-top: 2px;
}

/* ─── Domain Link ────────────────────────────────────── */
.store-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: var(--blue);
  font-size: 14px;
  text-decoration: none;
}

.store-link:hover { text-decoration: underline; }

/* ─── Campaign Cell ──────────────────────────────────── */
.campaign-cell { display: flex; flex-direction: column; gap: 4px; }

.campaign-top {
  display: flex;
  align-items: center;
  gap: 8px;
}

.discount-badge {
  font-family: var(--font-mono);
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 4px;
}

.badge-green {
  background: var(--green-bg);
  border: 1px solid var(--green-border);
  color: #00714D;
}

.badge-gray {
  background: var(--inactive-bg);
  border: 1px solid var(--border);
  color: var(--text-muted);
}

.campaign-discount-val {
  font-size: 12px;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: 0.24px;
}

.campaign-name {
  font-size: 11px;
  color: var(--text-secondary);
  line-height: 1.4;
}

/* ─── Orders Cell ────────────────────────────────────── */
.orders-cell { display: flex; flex-direction: column; gap: 6px; }

.orders-count {
  font-weight: 700;
  font-size: 14px;
  color: var(--text-primary);
}

.orders-bar-track {
  width: 96px;
  height: 4px;
  background: #EDEDF8;
  border-radius: 9999px;
  overflow: hidden;
}

.orders-bar-fill {
  height: 100%;
  background: var(--blue);
  border-radius: 9999px;
  transition: width 0.4s ease;
}

/* ─── Status Pill ────────────────────────────────────── */
.status-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.24px;
  white-space: nowrap;
}

.pill-active {
  background: var(--green-bg);
  border: 1px solid var(--green-border);
  color: var(--green-text);
}

.pill-active .pill-dot { background: var(--green-text); }

.pill-inactive {
  background: var(--inactive-bg);
  border: 1px solid var(--border);
  color: var(--inactive-text);
}

.pill-inactive .pill-dot { background: var(--inactive-dot); }

.pill-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}

/* ─── Actions Cell ───────────────────────────────────── */
.actions-cell {
  display: flex;
  align-items: center;
  gap: 4px;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  background: transparent;
  border: none;
  border-radius: 6px;
  color: var(--text-muted);
  cursor: pointer;
}

.action-btn:hover {
  background: var(--blue-light);
  color: var(--blue);
}

/* ─── Pagination ─────────────────────────────────────── */
.pagination-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background: var(--blue-light);
  border-top: 1px solid var(--border-solid);
}

.pagination-info {
  font-size: 12px;
  font-weight: 500;
  color: var(--text-secondary);
  letter-spacing: 0.24px;
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 4px;
}

.page-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: transparent;
  border: none;
  border-radius: var(--radius-btn);
  font-family: var(--font-geist);
  font-size: 12px;
  font-weight: 500;
  color: var(--text-secondary);
  cursor: pointer;
  letter-spacing: 0.24px;
}

.page-btn:hover:not(.page-btn--active):not(.page-btn--disabled) {
  background: var(--border);
}

.page-btn--active {
  background: var(--blue);
  color: #fff;
  cursor: default;
}

.page-btn--disabled {
  opacity: 0.3;
  cursor: default;
}

.page-ellipsis {
  font-size: 16px;
  color: var(--text-muted);
  padding: 0 4px;
  line-height: 1;
}

/* ─── Icon helpers ───────────────────────────────────── */
.icon-xs { width: 10px; height: 10px; }
.icon-sm { width: 16px; height: 16px; }
.icon-md { width: 18px; height: 18px; }
</style>