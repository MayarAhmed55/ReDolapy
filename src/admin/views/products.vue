<template>
  <div class="products-management-view">
    <section class="filters-strip">
      <div class="filters-inner-layout">
        <div class="options-dropdown">
          <div class="image-clip">
            <div class="vector-arrow"></div>
          </div>
          <div class="dropdown-text-container">
            <span class="dropdown-label">All Stores</span>
          </div>
        </div>

        <div class="options-dropdown">
          <div class="image-clip">
            <div class="vector-arrow"></div>
          </div>
          <div class="dropdown-text-container">
            <span class="dropdown-label">category</span>
          </div>
        </div>

        <div class="utilities-group">
          <button class="btn-square-util">
            <div class="icon-wrap-18">
              <img src="../../assets/Icon (15).svg" />
            </div>
          </button>
          <button class="btn-text-util">
            <span class="util-text">Clear filters</span>
          </button>
        </div>
      </div>
    </section>

    <main class="content-workspace">
      <div class="data-table-wrapper">
        <div class="table-header-strip">
          <div class="table-row-layout">
            <div class="cell cell-product-info">
              <span class="th-text">Product</span>
            </div>
            <div class="cell cell-store-location">
              <span class="th-text">Store & CATEGORY</span>
            </div>
            <div class="cell cell-season">
              <span class="th-text">Season</span>
            </div>
            <div class="cell cell-sku">
              <span class="th-text">TRY-ON</span>
            </div>
            <div class="cell cell-stock">
              <span class="th-text-center">Status</span>
            </div>
            <div class="cell cell-price">
              <span class="th-text">Price</span>
            </div>
            <div class="cell cell-actions">
              <span class="th-text">Action</span>
            </div>
          </div>
        </div>

        <div class="table-body-container">
          <div v-if="loading" class="table-data-row">
            <div
              class="data-cell"
              style="padding: 24px; width: 100%; justify-content: center"
            >
              <span class="info-secondary-text">Loading products…</span>
            </div>
          </div>

          <div
            v-else-if="paginatedProducts.length === 0"
            class="table-data-row"
          >
            <div
              class="data-cell"
              style="padding: 24px; width: 100%; justify-content: center"
            >
              <span class="info-secondary-text">No products found.</span>
            </div>
          </div>

          <div
            v-else
            v-for="product in paginatedProducts"
            :key="product._id"
            class="table-data-row"
          >
            <div class="data-cell cell-product-info row-layout-align">
              <div class="product-img-bg">
                <img
                  v-if="product.images && product.images[0]"
                  :src="product.images[0]"
                  :alt="product.name"
                  class="asset-img-placeholder"
                  style="object-fit: cover"
                />
                <div v-else class="asset-img-placeholder"></div>
              </div>
              <div class="meta-stack">
                <span class="meta-title-text">{{ product.name }}</span>
                <span class="meta-mono-text">{{ productCode(product) }}</span>
              </div>
            </div>
            <div class="data-cell cell-store-location stack-layout-align">
              <div class="info-stack-wrapper">
                <span class="info-primary-text">{{
                  product.store_id?.name || "—"
                }}</span>
              </div>
              <div class="info-stack-wrapper">
                <span class="info-secondary-text">{{ product.category }}</span>
              </div>
            </div>
            <div class="data-cell cell-season gap-layout-align">
              <span class="season-badge season-active">
                {{
                  product.season_tags?.length
                    ? product.season_tags.join(", ")
                    : "All Season"
                }}
              </span>
            </div>
            <div class="data-cell cell-sku sku-align">
              <img
                v-if="product.try_on_enabled"
                src="../../assets/Overlay.svg"
                alt="true"
              />

              <img v-else src="../../assets/Icon (26).svg" alt="false" />
            </div>
            <div class="data-cell cell-stock stock-align">
              <div v-if="product.try_on_enabled" class="tryons-pill">
                <div class="tryons-dot"></div>
              </div>
              <div v-else class="tryons-empty"></div>
            </div>
            <div class="data-cell cell-price price-align">
              <div class="price-stack">
                <span class="price-amount">{{
                  formatPrice(product.price)
                }}</span>
                <span class="price-currency">{{ product.currency }}</span>
              </div>
            </div>
            <div class="data-cell cell-actions actions-align">
              <button
                class="action-btn"
                aria-label="Edit"
                @click="goToEdit(product._id)"
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
                aria-label="Delete"
                @click="handleDelete(product._id)"
              >
                <img src="../../assets/Icon (36).svg" alt="Delete" class="icon-sm" />
              </button>
            </div>
          </div>
        </div>
        <!-- /table-body-container -->
      </div>
      <!-- /data-table-wrapper -->

      <!-- Pagination -->
      <div class="pagination-footer">
        <span class="pagination-info">
          Showing {{ showingStart }}–{{ showingEnd }} of
          {{ products.length }} products
        </span>
        <div class="pagination-controls">
          <button
            class="page-btn page-arrow"
            :disabled="currentPage === 1"
            @click="goToPage(currentPage - 1)"
          >
            &#8249;
          </button>

          <template v-for="(page, idx) in visiblePages" :key="idx">
            <span v-if="page === '...'" class="page-sep">…</span>
            <button
              v-else
              class="page-btn"
              :class="{ 'page-active': page === currentPage }"
              @click="goToPage(page)"
            >
              {{ page }}
            </button>
          </template>

          <button
            class="page-btn page-arrow"
            :disabled="currentPage === totalPages"
            @click="goToPage(currentPage + 1)"
          >
            &#8250;
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getProducts, deletProduct } from "../../services/services"; // adjust this import path to match your project structure

const router = useRouter();
const products = ref([]);
const loading = ref(false);

const currentPage = ref(1);
const itemsPerPage = 6;

const totalPages = computed(() =>
  Math.max(1, Math.ceil(products.value.length / itemsPerPage)),
);

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return products.value.slice(start, start + itemsPerPage);
});

const showingStart = computed(() =>
  products.value.length === 0 ? 0 : (currentPage.value - 1) * itemsPerPage + 1,
);

const showingEnd = computed(() =>
  Math.min(currentPage.value * itemsPerPage, products.value.length),
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

function productCode(product) {
  return `#${product._id.slice(-6).toUpperCase()}`;
}

function formatPrice(price) {
  if (typeof price !== "number") return "";
  return `$${price.toFixed(2)}`;
}

async function fetchProducts() {
  loading.value = true;
  try {
    const res = await getProducts();
    products.value = res.data;
  } catch (err) {
    console.error("Failed to fetch products:", err);
  } finally {
    loading.value = false;
  }
}

async function handleDelete(id) {
  if (!id) {
    console.error("handleDelete called without a valid id", id);
    return;
  }
  if (!confirm("Are you sure you want to delete this product?")) return;

  try {
    await deletProduct(id);
    products.value = products.value.filter((p) => p._id !== id);

    // If deleting the last item on a page pushes currentPage out of range, step back
    if (
      currentPage.value > totalPages.value &&
      currentPage.value > 1
    ) {
      currentPage.value = totalPages.value;
    }
  } catch (err) {
    console.error("Failed to delete product:", err);
  }
}

function goToEdit(id) {
  if (!id) {
    console.error("goToEdit called without a valid id", id);
    return;
  }
  router.push(`/admin/addProduct/${id}`);
}

onMounted(fetchProducts);
</script>

<style scoped>
/* Root View Base Structure */
.products-management-view {
  position: relative;
  width: 100%;
  font-family: "Geist", sans-serif;
  min-height: 1024px;
  background: linear-gradient(0deg, #faf8ff, #faf8ff), #ffffff;
  box-sizing: border-box;
  padding: 0 40px; /* Provides balancing room where sidebar was ignored */
}

/* Header Action Layout Elements */
.header-controls {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 40px 0px 16px 0px;
  height: 104px;
  box-sizing: border-box;
}

.search-bg-border {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 16px;
  width: 412px;
  height: 48px;
  background: #edeeef;
  border: 1px solid #c3c5d7;
  border-radius: 16px;
  box-sizing: border-box;
}

.icon-container-13 {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  width: 13.5px;
  height: 13.5px;
}

.icon-search {
  width: 13.5px;
  height: 13.5px;
  background: #434654;
  display: inline-block;
}

.input-margin {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px 0px 0px 8px;
  width: 365.5px;
  height: 36px;
  flex-grow: 1;
}

.input-inner {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 9px 12px;
  width: 357.5px;
  height: 36px;
  box-sizing: border-box;
}

.search-input {
  width: 100%;
  border: none;
  background: transparent;
  outline: none;
  font-family: "Geist", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: #191b23;
}

.search-input::placeholder {
  color: #6b7280;
}

.action-group {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 16px;
  width: 257.5px;
  height: 32px;
}

.btn-primary {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 20px;
  gap: 8px;
  width: 130.5px;
  height: 32px;
  background: #1550d3;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
}

.icon-container-10 {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  width: 10.5px;
  height: 10.5px;
}

.icon-plus {
  width: 10.5px;
  height: 10.5px;
  background: #ffffff;
  display: inline-block;
}

.btn-text {
  width: 72px;
  height: 16px;
  font-family: "Geist", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.24px;
  color: #ffffff;
}

.vertical-border-margin {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px 0px 0px 16px;
  width: 111px;
  height: 20px;
}

.vertical-border-box {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 0px 0px 16px;
  gap: 12px;
  width: 95px;
  height: 20px;
  border-left: 1px solid #c3c5d7;
}

.icon-btn {
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
}

.icon-btn i {
  display: block;
  background: #434654;
}

.icon-btn .icon-action-1 {
  width: 16px;
  height: 20px;
}
.icon-btn .icon-action-2 {
  width: 20px;
  height: 16px;
}
.icon-btn .icon-action-3 {
  width: 18px;
  height: 18px;
}

/* Filter Configuration Strip styles */
.filters-strip {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 0px;
  gap: 10px;
  height: 64px;
  box-sizing: border-box;
  margin-top: 40px;
}

.filters-inner-layout {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 23px;
  width: 100%;
  height: 44px;
}

.options-dropdown {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 16px;
  isolation: isolate;
  width: 192px;
  height: 42px;
  background: #faf8ff;
  border: 1px solid #c3c5d7;
  border-radius: 8px;
  position: relative;
  cursor: pointer;
}

.image-clip {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 10.5px 9px 10.5px 162px;
  position: absolute;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  z-index: 0;
}

.vector-arrow {
  width: 21px;
  height: 21px;
  position: relative;
}

.vector-arrow::after {
  content: "";
  position: absolute;
  left: 30%;
  right: 30%;
  top: 39.99%;
  bottom: 40.01%;
  border: 1.575px solid #6b7280;
}

.dropdown-text-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  width: 158px;
  height: 20px;
  flex-grow: 1;
  z-index: 1;
}

.dropdown-label {
  width: 158px;
  height: 20px;
  font-family: "Geist", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  display: flex;
  align-items: center;
  color: #191b23;
}

.utilities-group {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 8px;
  width: 157.56px;
  height: 44px;
}

.btn-square-util {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  width: 44px;
  height: 44px;
  background: #e7e7f2;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}

.icon-wrap-18 {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  padding: 0px;
  width: 18px;
  height: 12px;
}

.btn-text-util {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 16px;
  width: 105.56px;
  height: 36px;
  border-radius: 8px;
  background: transparent;
  border: none;
  cursor: pointer;
}

.util-text {
  width: 73.56px;
  height: 16px;
  font-family: "Geist", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.24px;
  color: #1550d3;
}

/* Main Table Board Construction styling */
.content-workspace {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 54px;
  width: 100%;
  height: 690px;
  margin-top: 94px;
}

.data-table-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  isolation: isolate;
  width: 100%;
  height: 580px;
}

.table-header-strip {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0px;
  width: 100%;
  height: 48px;
  background: #e7e7f2;
  z-index: 1;
}

.table-row-layout {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0px;
  margin: 0 auto;
  width: 100%;
  height: 48px;
}

/* Grid Cells Architecture mapping dimensional values */
.cell {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
  margin: 0 auto;
  height: 48px;
  box-sizing: border-box;
}

.cell-product-info {
  width: 255px;
}
.cell-store-location {
  width: 189px;
}
.cell-season {
  width: 185px;
}
.cell-sku {
  width: 122.28px;
}
.cell-stock {
  width: 89.27px;
  align-items: center;
}
.cell-price {
  width: 151.45px;
}
.cell-actions {
  width: 96px;
  align-items: flex-end;
  padding-right: 24px;
}

.th-text {
  font-family: "Geist", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  display: flex;
  align-items: center;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: #737686;
  white-space: nowrap;
}

.th-text-center {
  background: transparent;
  font-family: "Geist", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: #737686;
}

/* Body rows style structure rules */
.table-body-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  width: 100%;
  height: 532px;
  z-index: 0;
}

.table-data-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 16px 0px 0px;
  width: 100%;
  height: 88.5px;
  box-sizing: border-box;
  margin: -1px 0px;
  border-bottom: 1px solid #e2e1ed;
}

.data-cell {
  display: flex;
  margin: 0 auto;
  height: 88.5px;
  box-sizing: border-box;
}

.row-layout-align {
  flex-direction: row;
  align-items: center;
  padding: 0px 0px 0px 16px;
  gap: 6px;
  width: 264.83px;
}

.product-img-bg {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0px;
  width: 56px;
  height: 56px;
  background: #e2e1ed;
  border-radius: 8px;
  overflow: hidden;
}

.asset-img-placeholder {
  width: 56px;
  height: 56px;
  background-color: #c3c5d7;
  align-self: stretch;
}

.meta-stack {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  width: 138.36px;
  height: 32px;
}

.meta-title-text {
  font-family: "Geist", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  display: flex;
  align-items: center;
  letter-spacing: 0.24px;
  color: #191b23;
}

.meta-mono-text {
  font-family: "Geist", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  display: flex;
  align-items: center;
  color: #434654;
}

.stack-layout-align {
  flex-direction: column;
  align-items: flex-start;
  padding: 26px 16px 26.5px 32px;
  width: 190.47px;
}

.info-stack-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  width: 142.47px;
}

.info-stack-wrapper:first-child {
  height: 20px;
}
.info-stack-wrapper:last-child {
  height: 16px;
}

.info-primary-text {
  font-family: "Geist", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  display: flex;
  align-items: center;
  color: #191b23;
}

.info-secondary-text {
  font-family: "Geist", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  display: flex;
  align-items: center;
  letter-spacing: 0.24px;
  color: #737686;
}

.gap-layout-align {
  flex-direction: row;
  align-items: center;
  padding: 0px 0px 0px 42px;
  gap: 6px;
  width: 203.89px;
}

/* Season badge */
.season-badge {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 4px;
  font-family: "Geist", sans-serif;
  font-weight: 700;
  font-size: 10px;
  line-height: 13px;
  text-transform: uppercase;
  white-space: nowrap;
}
.season-active {
  background: #6ffbbe;
  color: #005236;
}

/* SKU cell */
.sku-align {
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 16px;
  width: 122.28px;
}
.sku-text {
  font-family: "Geist", sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #434654;
  white-space: nowrap;
}

/* Stock / try-ons cell */
.stock-align {
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
  width: 89.27px;
}
.tryons-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
  background: rgba(21, 80, 211, 0.1);
  border-radius: 9999px;
}
.tryons-dot {
  width: 15.75px;
  height: 15.75px;
  background: #1550d3;
  border-radius: 50%;
}
.tryons-empty {
  width: 10.5px;
  height: 10.5px;
  background: #c3c5d7;
  border-radius: 50%;
}

/* Price cell */
.price-align {
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 16px;
  width: 151.45px;
}
.price-stack {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.price-amount {
  font-family: "Geist", sans-serif;
  font-weight: 700;
  font-size: 16px;
  line-height: 21px;
  color: #191b23;
}
.price-currency {
  font-family: "Geist", sans-serif;
  font-weight: 400;
  font-size: 10px;
  line-height: 13px;
  color: #737686;
}

/* Actions cell */
.actions-align {
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;
  padding: 0 16px;
  width: 96px;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  border: none;
  border-radius: 8px;
  background: transparent;
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.action-btn:hover {
  background: #e7e7f2;
}

.action-btn:focus-visible {
  outline: 2px solid #1550d3;
  outline-offset: 1px;
}

.icon-sm {
  width: 18px;
  height: 18px;
  color: #434654;
  transition: color 0.15s ease;
}

.action-btn:hover .icon-sm {
  color: #1550d3;
}

/* Subtle row hover for the whole table */
.table-data-row:hover {
  background-color: #faf8ff;
}

/* Pagination footer */
.pagination-footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  height: 56px;
  width: 100%;
  background: #ffffff;
  border: 1px solid #c3c5d7;
  border-top: none;
  box-sizing: border-box;
}
.pagination-info {
  font-family: "Geist", sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #434654;
}
.pagination-controls {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
}
.page-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  border: none;
  background: transparent;
  font-family: "Geist", sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #191b23;
  cursor: pointer;
}
.page-btn:hover {
  background: #f0f0f8;
}
.page-btn:disabled {
  color: #c3c5d7;
  cursor: not-allowed;
}
.page-btn:disabled:hover {
  background: transparent;
}
.page-active {
  background: #1550d3;
  color: #ffffff;
  font-weight: 700;
}
.page-arrow {
  color: #434654;
  font-size: 16px;
}
.page-sep {
  font-size: 16px;
  color: #737686;
  padding: 0 4px;
}
</style>