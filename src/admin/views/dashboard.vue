<template>
  <div class="dashboard">
    <!-- Page Header -->
    <section class="page-header">
      <div class="page-title-group">
        <h2 class="page-title">Welcome Back!</h2>
        <p class="page-subtitle">
          Here is a summary representation across global system activity matrix
          data.
        </p>
      </div>
    </section>

    <!-- Stats Cards Row -->
    <section class="stats-row">
      <div class="stat-card">
        <div class="stat-card-top">
          <div class="stat-icon-wrap blue">
            <img src="../../assets/Icon (16).svg" alt="" />
          </div>
        </div>
        <p class="stat-label">Total Stores</p>
        <span class="stat-value">{{ storesCount }}</span>
      </div>

      <div class="stat-card">
        <div class="stat-card-top">
          <div class="stat-icon-wrap green">
            <img src="../../assets/Icon (18).svg" alt="" />
          </div>
        </div>
        <p class="stat-label">Total Products</p>
        <span class="stat-value">{{ productsCount }}</span>
      </div>

      <div class="stat-card">
        <div class="stat-card-top">
          <div class="stat-icon-wrap amber">
            <img src="../../assets/Icon (19).svg" alt="" />
          </div>
          <span class="stat-badge neutral">Enabled</span>
        </div>
        <p class="stat-label">Try-On</p>
        <span class="stat-value">{{ tryOnEnabled }}</span>
      </div>

      <div class="stat-card">
        <div class="stat-card-top">
          <div class="stat-icon-wrap amber">
            <img src="../../assets/Icon (19).svg" alt="" />
          </div>
          <span class="stat-badge neutral">Optimal</span>
        </div>
        <p class="stat-label">Recycle Times</p>
        <span class="stat-value">{{ recycleCount }}</span>
      </div>

      <!-- Figma Metric 4: Monthly Revenue (red icon, $0) -->
      <div class="stat-card">
        <div class="stat-card-top">
          <div class="stat-icon-wrap red">
            <img src="../../assets/Icon (20).svg" alt="" />
          </div>
          <span class="stat-badge positive">Active</span>
        </div>
        <p class="stat-label">Monthly Revenue</p>
        <span class="stat-value">$0</span>
      </div>
    </section>

    <!-- Activity / Progress Bars Row -->
    <section class="activity-row">
      <!-- Card 1: Platform Usage -->
      <div class="activity-card">
        <div class="activity-inner">
          <div class="activity-header-row">
            <span class="activity-metric-label">Active products</span>
          </div>

          <div class="progress-bar-wrap">
            <div class="progress-track">
              <div
                class="progress-fill"
                :style="{ width: (activeProducts / productsCount) * 100 + '%' }"
              ></div>
            </div>
          </div>

          <span class="activity-value">{{ activeProducts }}</span>
        </div>
      </div>

      <!-- Card 2: Avg Session -->
      <div class="activity-card">
        <div class="activity-inner">
          <div class="activity-header-row">
            <span class="activity-metric-label">Total Users</span>
            <img
              src="../../assets/Icon (22).svg"
              alt=""
              class="activity-icon"
            />
          </div>
          <span class="activity-value">{{ userCount }}</span>
        </div>
      </div>
    </section>

    <!-- Bottom Row: Quick Actions + Top Categories -->
    <section class="bottom-row">
      <!-- Quick Actions -->
      <div class="quick-actions-card">
        <h3 class="panel-heading white">Quick Actions</h3>
        <div class="actions-grid">
          <router-link to="/admin/addStore" class="action-btn">
            <img src="../../assets/Icon (21).svg" alt="" class="action-icon" />
            <span>Add Store</span>
          </router-link>
          <router-link to="/admin/addProduct" type="button" class="action-btn">
            <img src="../../assets/Icon (23).svg" alt="" class="action-icon" />
            <span>Add Product</span>
          </router-link>
          <router-link to="/admin/API" class="action-btn">
            <img src="../../assets/Icon (24).svg" alt="" class="action-icon" />
            <span>API Key</span>
          </router-link>
          <router-link to="/admin/sendNotifications" class="action-btn">
            <img src="../../assets/Icon (25).svg" alt="" class="action-icon" />
            <span>Notify Users</span>
          </router-link>
        </div>
      </div>

      <!-- Top Categories -->
      <div class="categories-card">
        <h3 class="panel-heading dark">Top Categories</h3>
        <div class="categories-body">
          <!-- Donut chart -->
          <div class="donut-wrap">
            <div class="donut-canvas-wrap">
              <canvas ref="donutCanvas" width="124" height="124"></canvas>
              <span class="donut-center-label">{{ topCategoryPct }}%</span>
            </div>
          </div>
          <!-- Legend -->
          <ul class="category-legend">
            <li
              v-for="(item, i) in categoryLegend"
              :key="item.label"
              class="legend-item"
            >
              <span class="legend-dot" :style="{ background: CATEGORY_COLORS[i % CATEGORY_COLORS.length] }"></span>
              <span class="legend-text">{{ item.label }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { getStores, getProducts, getAllUsers } from "../../services/services";
import Chart from "chart.js/auto";

const CATEGORY_COLORS = ["#1550d3", "#006c49", "#e2e1ed", "#d85a30", "#7f77dd", "#1d9e75"];

export default {
  name: "Dashboard",
  data() {
    return {
      storesCount: 0,
      productsCount: 0,
      userCount: 0,
      activeProducts: 0,
      tryOnEnabled: 0,
      recycleCount: 0,
      categoryLegend: [],
      topCategoryPct: 0,
      CATEGORY_COLORS,
      _donutChart: null,
    };
  },

  methods: {
    async fetchStoresCount() {
      try {
        const res = await getStores();
        this.storesCount = res.data.length;
      } catch (err) {
        console.error("Failed to fetch stores:", err);
      }
    },
    async fetchProductsCount() {
      try {
        const res = await getProducts();
        this.productsCount = res.data.length;
      } catch (err) {
        console.error("Failed to fetch stores:", err);
      }
    },
    async fetchUsers() {
      try {
        const res = await getAllUsers();
        this.userCount = res.data.length;
      } catch (err) {
        console.log("failed to fetch users", err);
      }
    },
    async fetchActiveProducts() {
      try {
        const { data } = await getProducts();

        this.activeProducts = data.filter(
          (product) => product.is_active === true,
        ).length;
      } catch (err) {
        console.log("failed to get the active products", err);
        this.activeProducts = 0;
      }
    },
    async fetchTryOnEnabled() {
      try {
        const { data } = await getProducts();
        this.tryOnEnabled = data.filter(
          (pordcut) => pordcut.try_on_enabled === true,
        ).length;
      } catch (err) {
        console.log("failed to fetch enabled try-on items");
      }
    },
    async fetchRecycleTimes() {
      try {
        const { data } = await getAllUsers();

        this.recycleCount = data.reduce(
          (count, user) => count + user.latestTryOn.length,
          0,
        );
      } catch (err) {
        console.log("faild to get the try on count", err);
      }
    },
    async fetchCategories() {
      try {
        const { data } = await getProducts();

        const counts = {};
        data.forEach((product) => {
          const cat = product.category || "Unknown";
          counts[cat] = (counts[cat] || 0) + 1;
        });

        const labels = Object.keys(counts);
        const values = Object.values(counts);
        const total = values.reduce((a, b) => a + b, 0);

        this.categoryLegend = labels.map((label, i) => ({ label, value: values[i] }));

        const topIndex = values.indexOf(Math.max(...values));
        this.topCategoryPct = total > 0 ? Math.round((values[topIndex] / total) * 100) : 0;

        this.$nextTick(() => {
          this.renderDonut(labels, values);
        });
      } catch (err) {
        console.log("failed to get the category data", err);
      }
    },
    renderDonut(labels, values) {
      const canvas = this.$refs.donutCanvas;
      if (!canvas) return;

      if (this._donutChart) {
        this._donutChart.destroy();
      }

      this._donutChart = new Chart(canvas, {
        type: "doughnut",
        data: {
          labels,
          datasets: [
            {
              data: values,
              backgroundColor: labels.map(
                (_, i) => CATEGORY_COLORS[i % CATEGORY_COLORS.length]
              ),
              borderWidth: 0,
            },
          ],
        },
        options: {
          cutout: "70%",
          plugins: { legend: { display: false }, tooltip: { enabled: false } },
          responsive: false,
        },
      });
    },
  },

  mounted() {
    this.fetchStoresCount();
    this.fetchProductsCount();
    this.fetchUsers();
    this.fetchActiveProducts();
    this.fetchTryOnEnabled();
    this.fetchRecycleTimes();
    this.fetchCategories();
  },
};
</script>

<style scoped>
/* ─── Base ─────────────────────────────────────────────── */
.dashboard {
  width: 100%;
  font-family: "Geist", sans-serif;
  color: #191b23;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* ─── Page Header ───────────────────────────────────────── */
.page-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
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

.filter-btn:hover {
  background: #f0eeff;
}

.filter-icon {
  width: 10.5px;
  height: 11.67px;
}

/* ─── Stats Row ─────────────────────────────────────────── */
.stats-row {
  display: flex;
  flex-direction: row;
  gap: 16px;
  flex-wrap: wrap;
}

.stat-card {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  min-width: 180px;
  height: 160px;
  padding: 24px;
  background: #faf8ff;
  border: 1px solid #c3c5d7;
  border-radius: 12px;
  box-sizing: border-box;
}

.stat-card-top {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.stat-icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  padding: 8px;
  box-sizing: border-box;
  flex-shrink: 0;
}

.stat-icon-wrap img {
  width: 20px;
  height: 20px;
  display: block;
}

.stat-icon-wrap.blue {
  background: rgba(21, 80, 211, 0.1);
}
.stat-icon-wrap.green {
  background: rgba(0, 108, 73, 0.1);
}
.stat-icon-wrap.amber {
  background: rgba(130, 81, 0, 0.1);
}
.stat-icon-wrap.red {
  background: rgba(186, 26, 26, 0.1);
}

.stat-badge {
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0.24px;
}

.stat-badge.positive {
  color: #006c49;
}
.stat-badge.neutral {
  color: #434654;
}

.stat-label {
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0.24px;
  color: #434654;
  margin: 0;
}

.stat-value {
  font-size: 32px;
  font-weight: 600;
  line-height: 40px;
  letter-spacing: -0.64px;
  color: #191b23;
}

/* ─── Activity / Progress Row ───────────────────────────── */
.activity-row {
  display: flex;
  flex-direction: row;
  gap: 26px;
}

.activity-card {
  flex: 1;
  height: 78px;
  padding: 16px 24px;
  background: #faf8ff;
  border: 1px solid #c3c5d7;
  border-radius: 12px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}

.activity-inner {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

.activity-header-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.activity-metric-label {
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0.24px;
  color: #434654;
}

.activity-icon {
  width: 22px;
  height: 16px;
}

.progress-bar-wrap {
  width: 100%;
}

.progress-track {
  width: 100%;
  height: 4px;
  background: rgba(60, 107, 237, 0.2);
  border-radius: 9999px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #1550d3;
  border-radius: 9999px;
}

.activity-value {
  font-size: 20px;
  font-weight: 500;
  line-height: 28px;
  letter-spacing: -0.2px;
  color: #191b23;
}

/* ─── Bottom Row ────────────────────────────────────────── */
.bottom-row {
  display: flex;
  flex-direction: row;
  gap: 26px;
}

/* Shared panel heading */
.panel-heading {
  font-size: 20px;
  font-weight: 500;
  line-height: 28px;
  letter-spacing: -0.2px;
  margin: 0 0 16px 0;
}

.panel-heading.white {
  color: #ffffff;
}
.panel-heading.dark {
  color: #191b23;
}

/* ─── Quick Actions ─────────────────────────────────────── */
.quick-actions-card {
  flex: 1;
  min-height: 310px;
  padding: 24px;
  background: #3c6bed;
  border-radius: 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.actions-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  flex: 1;
}

.action-btn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-family: "Geist", sans-serif;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0.24px;
  color: #ffffff;
  transition: background 0.2s;
}

.action-btn:hover {
  background: rgba(255, 255, 255, 0.18);
}

.action-icon {
  width: 22px;
  height: 22px;
  display: block;
}

/* ─── Top Categories ────────────────────────────────────── */
.categories-card {
  flex: 1;
  min-height: 310px;
  padding: 24px;
  background: #ffffff;
  border: 2px solid #d5d9de;
  border-radius: 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.categories-body {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 32px;
  flex: 1;
}

/* Donut */
.donut-wrap {
  flex-shrink: 0;
}

.donut-canvas-wrap {
  position: relative;
  width: 124px;
  height: 124px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.donut-canvas-wrap canvas {
  position: absolute;
  top: 0;
  left: 0;
}

.donut-center-label {
  position: relative;
  z-index: 1;
  font-size: 14px;
  font-weight: 700;
  color: #191b23;
  pointer-events: none;
}

/* Legend */
.category-legend {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.legend-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
}

.legend-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
}

.legend-text {
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0.24px;
  color: #191b23;
}
</style>