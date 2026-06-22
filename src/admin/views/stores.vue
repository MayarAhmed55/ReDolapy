<template>
  <div class="stores-page">
    <!-- Content Area -->
    <main class="content">
      <!-- Page Header -->
      <div class="page-header">
        <div>
          <h1 class="page-title">Stores</h1>
          <p class="page-subtitle">
            Manage and monitor all connected storefronts across your platform.
          </p>
        </div>
      </div>

      <!-- Toolbar -->
      <div class="toolbar">
        <div class="toolbar-left">
          <!-- Search -->
          <div
            class="flex flex-col items-start p-0 isolate flex-1 h-[42px] relative"
          >
            <input
              type="text"
              placeholder="Filter by name..."
              class="box-border flex flex-row justify-start items-start pt-[11px] pb-[11px] pr-[16px] pl-[40px] w-full h-[42px] bg-[#FAF8FF] border border-[#C3C5D7] rounded-[8px] self-stretch font-['Geist sans'] font-normal text-[14px] leading-[18px] text-[#6B7280] placeholder-[#6B7280] focus:outline-none"
            />

            <div
              class="absolute left-[12px] top-[34%] bottom-[26.19%] w-[15px] flex flex-col items-start p-0 pointer-events-none"
            >
              <img
                src="../../assets/icon (27).svg"
                class="w-[15px] h-[13.33px]"
              />
            </div>
          </div>

          <!-- Status filter -->
          <div class="select-wrap bg-[#FAF8FF]">
            <select v-model="statusFilter" class="status-select">
              <option value="">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <svg
              class="select-chevron"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
        </div>

        <div class="toolbar-right">
          <button class="btn-icon-only bg-[#FAF8FF]" aria-label="Filter">
            <img src="../../assets/Icon (15).svg" />
          </button>
          <button class="btn-text-link">clear filters</button>
        </div>
      </div>

      <!-- Table -->
      <div class="table-card">
        <div class="table-scroll">
          <table class="store-table">
            <thead class="border-b-1 border-gray-300 py-[2.5rem] bg-[#FAF8FF]">
              <tr>
                <th>Store & Logo</th>
                <th>Website</th>
                <th>DISCOUNT code & percent</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="loading">
                <td colspan="5" class="empty-state-cell">Loading stores…</td>
              </tr>

              <tr v-else-if="paginatedStores.length === 0">
                <td colspan="5" class="empty-state-cell">No stores found.</td>
              </tr>

              <tr
                class="border-b-1 border-gray-300 py-[2.5rem]"
                v-else
                v-for="store in paginatedStores"
                :key="store.id"
              >
                <!-- Store Name -->
                <td>
                  <div class="store-name-cell">
                    <div class="store-logo-box">
                      <img
                        v-if="store.logoUrl"
                        :src="store.logoUrl"
                        :alt="store.name"
                        class="store-logo-img"
                      />
                      <div
                        v-else
                        class="store-logo-placeholder"
                        :style="{ background: store.logoColor }"
                      >
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
                  <a
                    :href="store.websiteUrl"
                    class="store-link"
                    target="_blank"
                  >
                    {{ store.domain }}
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      class="icon-xs"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                      />
                    </svg>
                  </a>
                </td>

                <!-- Active Campaign -->
                <td>
                  <div class="campaign-cell">
                    <div class="campaign-top">
                      <span
                        :class="[
                          'discount-badge',
                          store.discountType === 'sale'
                            ? 'badge-green'
                            : 'badge-gray',
                        ]"
                      >
                        {{ store.discountCode }}
                      </span>
                      <span class="campaign-discount-val">{{
                        store.discountValue
                      }}</span>
                    </div>
                    <div class="campaign-name">{{ store.campaignName }}</div>
                  </div>
                </td>

                <!-- Status -->
                <td>
                  <span
                    :class="[
                      'status-pill',
                      store.is_active ? 'pill-inactive' : 'pill-active',
                    ]"
                  >
                    <span
                      :class="[
                        'pill-dot',
                        store.is_active ? 'dot-inactive' : 'dot-active',
                      ]"
                    ></span>

                    {{ store.is_active ? "InActive" : "active" }}
                  </span>
                </td>

                <!-- Actions -->
                <td>
                  <div class="actions-cell">
                    <button
                      class="action-btn"
                      aria-label="Edit"
                      @click="goToEdit(store.id)"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.5"
                        class="icon-sm"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </button>
                    <button
                      class="action-btn"
                      aria-label="More options"
                      @click="handleDelete(store.id)"
                    >
                      <img
                        src="../../assets/Icon (36).svg"
                        class="icon-sm"
                        alt="More options"
                      />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination Footer -->
        <div class="pagination-footer">
          <span class="pagination-info">
            Showing {{ showingStart }}–{{ showingEnd }} of
            {{ filteredStores.length }} stores
          </span>
          <div class="pagination-controls">
            <button
              class="page-btn"
              :class="{ 'page-btn--disabled': currentPage === 1 }"
              :disabled="currentPage === 1"
              aria-label="Previous"
              @click="goToPage(currentPage - 1)"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                class="icon-xs"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>

            <template v-for="(page, idx) in visiblePages" :key="idx">
              <span v-if="page === '...'" class="page-ellipsis">…</span>
              <button
                v-else
                class="page-btn"
                :class="{ 'page-btn--active': page === currentPage }"
                @click="goToPage(page)"
              >
                {{ page }}
              </button>
            </template>

            <button
              class="page-btn"
              :class="{ 'page-btn--disabled': currentPage === totalPages }"
              :disabled="currentPage === totalPages"
              aria-label="Next"
              @click="goToPage(currentPage + 1)"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                class="icon-xs"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { getStores, deleteStore } from "../../services/services"; // adjust this import path to match your project structure
import { useRouter } from 'vue-router'

const router = useRouter()
const searchQuery = ref("");
const statusFilter = ref("");
const loading = ref(false);

const stores = ref([]);

const currentPage = ref(1);
const itemsPerPage = 6;

function extractDomain(url) {
  try {
    return new URL(url).hostname;
  } catch {
    return url || "";
  }
}
function goToEdit(id) {
  if (!id) {
    console.error("goToEdit called without a valid id", id);
    return;
  }
  router.push(`/admin/addStore/${id}`);
}
const handleDelete = async (id) => {
  try {
    await deleteStore(id);
    stores.value = stores.value.filter((store) => store.id !== id);
  } catch (error) {
    console.error("Failed to delete store:", error);
    // e.g. show error toast
  }
};
function storeCode(id) {
  return `STR-${id.slice(-6).toUpperCase()}`;
}

async function fetchStores() {
  loading.value = true;
  try {
    const res = await getStores();
    stores.value = res.data.map((s) => ({
      id: s._id,
      storeId: storeCode(s._id),
      name: s.name,
      logoUrl: s.logo_url,
      logoColor: "#e5e7eb", // fallback swatch if a store has no logo_url
      domain: extractDomain(s.website_url),
      websiteUrl: s.website_url,
      discountCode: s.discount_code || "-",
      discountType: s.discount_percent ? "sale" : "none",
      discountValue: s.discount_percent ? `${s.discount_percent}%` : "0%",
      campaignName: s.discount_code
        ? "Active Discount Code"
        : "No Active Codes",
      status: s.is_active ? "Active" : "Inactive",
    }));
  } catch (err) {
    console.error("Failed to fetch stores:", err);
  } finally {
    loading.value = false;
  }
}

onMounted(fetchStores);

const filteredStores = computed(() =>
  stores.value.filter((s) => {
    const matchesSearch = s.name
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase());
    const matchesStatus =
      !statusFilter.value || s.status.toLowerCase() === statusFilter.value;
    return matchesSearch && matchesStatus;
  }),
);

// Reset to page 1 whenever the filtered set changes shape
watch([searchQuery, statusFilter], () => {
  currentPage.value = 1;
});

const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredStores.value.length / itemsPerPage)),
);

const paginatedStores = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredStores.value.slice(start, start + itemsPerPage);
});

const showingStart = computed(() =>
  filteredStores.value.length === 0
    ? 0
    : (currentPage.value - 1) * itemsPerPage + 1,
);

const showingEnd = computed(() =>
  Math.min(currentPage.value * itemsPerPage, filteredStores.value.length),
);

// Builds a compact page list like [1, "...", 4, 5, 6, "...", 12]
const visiblePages = computed(() => {
  const total = totalPages.value;
  const current = currentPage.value;
  const delta = 1;
  const pages = [];

  for (
    let i = Math.max(2, current - delta);
    i <= Math.min(total - 1, current + delta);
    i++
  ) {
    pages.push(i);
  }

  if (current - delta > 2) pages.unshift("...");
  if (current + delta < total - 1) pages.push("...");

  pages.unshift(1);
  if (total > 1) pages.push(total);

  return pages;
});

function goToPage(page) {
  if (page === "..." || page < 1 || page > totalPages.value) return;
  currentPage.value = page;
}
</script>

<style scoped>
/* ─── Tokens ─────────────────────────────────────────── */
:root {
  --bg: #faf8ff;
  --surface: #ffffff;
  --border: rgba(195, 197, 215, 0.3);
  --border-solid: #c3c5d7;
  --blue: #1550d3;
  --blue-light: #f3f3fe;
  --text-primary: #191b23;
  --text-secondary: #434654;
  --text-muted: #737686;
  --text-placeholder: #6b7280;
  --green-bg: rgba(108, 248, 187, 0.2);
  --green-border: rgba(0, 108, 73, 0.2);
  --green-text: #006c49;
  --inactive-bg: #e7e7f2;
  --inactive-dot: #737686;
  --inactive-text: #434654;
  --radius-card: 12px;
  --radius-btn: 8px;
  --font-geist: "Geist", "Inter", system-ui, sans-serif;
  --font-mono: "Geist Mono", "JetBrains Mono", monospace;
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

.btn-add-store:hover {
  background: #1240b5;
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

.icon-btn:hover {
  background: var(--blue-light);
}

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

.search-input::placeholder {
  color: var(--text-placeholder);
}
.search-input:focus {
  border-color: var(--blue);
  box-shadow: 0 0 0 3px rgba(21, 80, 211, 0.1);
}

.select-wrap {
  position: relative;
  flex-shrink: 0;

  border: 1px solid #c3c5d7;
  border-radius: 5px;
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

.status-select:focus {
  border-color: var(--blue);
}

.select-chevron {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 14px;
  height: 14px;
  color: #6b7280;
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

  border: 1px solid #c3c5d7;
  border-radius: 5px;

  cursor: pointer;
}

.btn-icon-only:hover {
  background: #ddddf0;
}
.btn-text-link {
  background: none;
  color: blue;
  border: none;
  font-family: var(--font-geist);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.24px;
  cursor: pointer;
  white-space: nowrap;
  padding: 0 4px;
}

.btn-text-link:hover {
  text-decoration: underline;
  cursor: pointer;
  text-decoration: underline;
}

/* ─── Table Card ─────────────────────────────────────── */
.table-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.table-scroll {
  overflow-x: auto;
}

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

.store-table tbody tr:first-child {
  border-top: none;
}
.store-table tbody tr:hover {
  background: #fafafe;
}

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
  border: 1px solid rgba(195, 197, 215, 0.5);
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

.store-logo-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 6px;
  box-sizing: border-box;
}

.empty-state-cell {
  padding: 32px 24px;
  text-align: center;
  color: var(--text-secondary);
  font-size: 14px;
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

.store-link:hover {
  text-decoration: underline;
}

/* ─── Campaign Cell ──────────────────────────────────── */
.campaign-cell {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

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
  color: #00714d;
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
.status-pill {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px 12px;
  gap: 6px;
  height: 26px;
  border-radius: 9999px;
  width: fit-content;
}

.pill-dot {
  width: 6px;
  height: 6px;
  border-radius: 9999px;
}

.pill-active {
  background: rgba(108, 248, 187, 0.2);
  border: 1px solid rgba(0, 108, 73, 0.2);
  color: #006c49;
}

.dot-active {
  background: #006c49;
}

.pill-inactive {
  background: #e7e7f2;
  border: 1px solid rgba(195, 197, 215, 0.3);
  color: #434654;
}

.dot-inactive {
  background: #737686;
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
  background-color: #faf8ff;
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
.icon-xs {
  width: 10px;
  height: 10px;
}
.icon-sm {
  width: 16px;
  height: 16px;
}
.icon-md {
  width: 18px;
  height: 18px;
}
</style>