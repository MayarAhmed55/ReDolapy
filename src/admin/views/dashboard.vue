<template>
  <div class="dashboard">

    <!-- Page Header -->
    <section class="page-header">
      <div class="page-title-group">
        <h2 class="page-title">Welcome Back!</h2>
        <p class="page-subtitle">Here is a summary representation across global system activity matrix data.</p>
      </div>
      <button type="button" class="filter-btn">
        <img src="../../../assets/Icon (15).svg" alt="" class="filter-icon" />
        <span>Filter View</span>
      </button>
    </section>

    <!-- Stats Cards Row -->
    <section class="stats-row">

      <div class="stat-card">
        <div class="stat-card-top">
          <div class="stat-icon-wrap blue">
            <img src="../../../assets/Icon (15).svg" alt="" />
          </div>
          <span class="stat-badge positive">+12.4%</span>
        </div>
        <p class="stat-label">Total Stores</p>
        <span class="stat-value">128</span>
      </div>

      <div class="stat-card">
        <div class="stat-card-top">
          <div class="stat-icon-wrap green">
            <img src="../../../assets/Icon (16).svg" alt="" />
          </div>
          <span class="stat-badge positive">+8.2%</span>
        </div>
        <p class="stat-label">Total Products</p>
        <span class="stat-value">42,904</span>
      </div>

      <div class="stat-card">
        <div class="stat-card-top">
          <div class="stat-icon-wrap amber">
            <img src="../../../assets/Icon (17).svg" alt="" />
          </div>
          <span class="stat-badge neutral">Steady</span>
        </div>
        <p class="stat-label">Try-On Times</p>
        <span class="stat-value">85</span>
      </div>

      <div class="stat-card">
        <div class="stat-card-top">
          <div class="stat-icon-wrap amber">
            <img src="../../../assets/Icon (18).svg" alt="" />
          </div>
          <span class="stat-badge neutral">Optimal</span>
        </div>
        <p class="stat-label">Recycle Times</p>
        <span class="stat-value">85</span>
      </div>

      <!-- Figma Metric 4: Monthly Revenue (red icon, $0) -->
      <div class="stat-card">
        <div class="stat-card-top">
          <div class="stat-icon-wrap red">
            <img src="../../../assets/Icon (19).svg" alt="" />
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
            <span class="activity-metric-label">Platform Usage</span>
          </div>
          <div class="progress-bar-wrap">
            <div class="progress-track">
              <div class="progress-fill" style="width: 79.98%;"></div>
            </div>
          </div>
          <span class="activity-value">79.98%</span>
        </div>
      </div>

      <!-- Card 2: Avg Session -->
      <div class="activity-card">
        <div class="activity-inner">
          <div class="activity-header-row">
            <span class="activity-metric-label">Avg Session</span>
            <img src="../../../assets/Icon (20).svg" alt="" class="activity-icon" />
          </div>
          <span class="activity-value">N/A</span>
        </div>
      </div>

    </section>

    <!-- Bottom Row: Quick Actions + Top Categories -->
    <section class="bottom-row">

      <!-- Quick Actions -->
      <div class="quick-actions-card">
        <h3 class="panel-heading white">Quick Actions</h3>
        <div class="actions-grid">
          <button type="button" class="action-btn">
            <img src="../../../assets/Icon (21).svg" alt="" class="action-icon" />
            <span>New Store</span>
          </button>
          <button type="button" class="action-btn">
            <img src="../../../assets/Icon (22).svg" alt="" class="action-icon" />
            <span>Add Product</span>
          </button>
          <button type="button" class="action-btn">
            <img src="../../../assets/Icon (23).svg" alt="" class="action-icon" />
            <span>Reports</span>
          </button>
          <button type="button" class="action-btn">
            <img src="../../../assets/Icon (24).svg" alt="" class="action-icon" />
            <span>Manage Users</span>
          </button>
        </div>
      </div>

      <!-- Top Categories -->
      <div class="categories-card">
        <h3 class="panel-heading dark">Top Categories</h3>
        <div class="categories-body">
          <!-- Donut chart placeholder -->
          <div class="donut-wrap">
            <div class="donut">
              <span class="donut-label">36%</span>
            </div>
          </div>
          <!-- Legend -->
          <ul class="category-legend">
            <li class="legend-item">
              <span class="legend-dot" style="background: #1550D3;"></span>
              <span class="legend-text">Luxury Footwear</span>
            </li>
            <li class="legend-item">
              <span class="legend-dot" style="background: #006C49;"></span>
              <span class="legend-text">Streetwear</span>
            </li>
            <li class="legend-item">
              <span class="legend-dot" style="background: #E2E1ED;"></span>
              <span class="legend-text">Ready-to-wear</span>
            </li>
          </ul>
        </div>
      </div>

    </section>

  </div>
</template>

<script>
export default {
  name: "Dashboard",
};
</script>

<style scoped>
/* ─── Base ─────────────────────────────────────────────── */
.dashboard {
  width: 100%;
  font-family: 'Geist', sans-serif;
  color: #191B23;
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
  color: #191B23;
  margin: 0;
}

.page-subtitle {
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: #434654;
  margin: 0;
}

.filter-btn {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  height: 34px;
  background: #FAF8FF;
  border: 1px solid #C3C5D7;
  border-radius: 8px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  font-family: 'Geist', sans-serif;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.24px;
  color: #191B23;
  transition: background 0.2s;
}

.filter-btn:hover { background: #f0eeff; }

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
  background: #FAF8FF;
  border: 1px solid #C3C5D7;
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

.stat-icon-wrap img { width: 20px; height: 20px; display: block; }

.stat-icon-wrap.blue  { background: rgba(21, 80, 211, 0.1); }
.stat-icon-wrap.green { background: rgba(0, 108, 73, 0.1); }
.stat-icon-wrap.amber { background: rgba(130, 81, 0, 0.1); }
.stat-icon-wrap.red   { background: rgba(186, 26, 26, 0.1); }

.stat-badge {
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0.24px;
}

.stat-badge.positive { color: #006C49; }
.stat-badge.neutral  { color: #434654; }

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
  color: #191B23;
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
  background: #FAF8FF;
  border: 1px solid #C3C5D7;
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
  background: #1550D3;
  border-radius: 9999px;
}

.activity-value {
  font-size: 20px;
  font-weight: 500;
  line-height: 28px;
  letter-spacing: -0.2px;
  color: #191B23;
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

.panel-heading.white { color: #FFFFFF; }
.panel-heading.dark  { color: #191B23; }

/* ─── Quick Actions ─────────────────────────────────────── */
.quick-actions-card {
  flex: 1;
  min-height: 310px;
  padding: 24px;
  background: #3C6BED;
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
  font-family: 'Geist', sans-serif;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0.24px;
  color: #FFFFFF;
  transition: background 0.2s;
}

.action-btn:hover { background: rgba(255, 255, 255, 0.18); }

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
  background: #FFFFFF;
  border: 2px solid #D5D9DE;
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

/* Donut — CSS-only ring; swap for a real chart library when ready */
.donut-wrap {
  flex-shrink: 0;
}

.donut {
  width: 124px;
  height: 124px;
  border-radius: 50%;
  border: 16px solid #1550D3;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.donut-label {
  font-size: 12px;
  font-weight: 700;
  line-height: 16px;
  letter-spacing: 0.24px;
  color: #191B23;
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
  color: #191B23;
}
</style>