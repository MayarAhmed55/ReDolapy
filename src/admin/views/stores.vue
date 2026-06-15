<template>
  <div class="stores-view">
    <header class="page-header">
      <div class="page-title-group">
        <h2 class="page-title">Stores</h2>
        <p class="page-subtitle">Manage global storefront instances, localized configurations, and integrated promo active statuses.</p>
      </div>
      
      <div class="view-toggle-bg">
        <button type="button" class="toggle-btn active-state">
          <span class="btn-text">All Stores</span>
        </button>
        <button type="button" class="toggle-btn">
          <span class="btn-text">Active Only</span>
        </button>
      </div>
    </header>

    <section class="filter-frame">
      <div class="search-input-wrapper">
        <div class="input-inner">
          <img src="../../assets/checkIcon (3).svg" class="search-icon" alt="Filter search" />
          <input 
            type="text" 
            class="filter-field" 
            placeholder="Filter by name..." 
            aria-label="Filter stores by name"
          />
        </div>
      </div>

      <div class="dropdown-wrapper">
        <div class="dropdown-trigger">
          <span class="dropdown-text">All Statuses</span>
          <div class="vector-arrow"></div>
        </div>
      </div>

      <div class="action-buttons-group">
        <button type="button" class="layout-grid-btn">
          <div class="grid-icon-bar"></div>
        </button>
        <button type="button" class="primary-add-btn">
          <span class="add-btn-text">Add Store</span>
        </button>
      </div>
    </section>

    <section class="table-container-section">
      <div class="scrollable-table-window">
        <table class="stores-data-table">
          <thead>
            <tr>
              <th scope="col" class="header-cell spec-w-162">Store Name</th>
              <th scope="col" class="header-cell spec-w-139">Domain URL</th>
              <th scope="col" class="header-cell spec-w-151">Active Promotions</th>
              <th scope="col" class="header-cell spec-w-144">Products Listed</th>
              <th scope="col" class="header-cell spec-w-132">Regional Zone</th>
              <th scope="col" class="header-cell spec-w-96">Actions</th>
            </tr>
          </thead>
          
          <tbody>
            <tr class="store-data-row">
              <td class="data-cell">
                <div class="brand-cell-group">
                  <div class="brand-avatar-border">
                    <div class="avatar-fallback-img"></div>
                  </div>
                  <div class="brand-meta-stack">
                    <span class="main-title-text">Vogue Boutique</span>
                    <span class="sub-caption-text">ID: #89420</span>
                  </div>
                </div>
              </td>
              
              <td class="data-cell">
                <div class="domain-link-wrapper">
                  <a href="#" class="inline-domain-link" target="_blank" rel="noopener">vogue.global</a>
                  <span class="external-icon">↗</span>
                </div>
              </td>
              
              <td class="data-cell">
                <div class="promo-stack-container">
                  <div class="badge-row">
                    <div class="promo-pill-bg">
                      <span class="pill-code-text">ACTIVE</span>
                    </div>
                    <span class="promo-count-weight">1</span>
                  </div>
                  <div class="promo-description-row">
                    <span class="promo-marketing-text">Storewide Season Sale</span>
                  </div>
                </div>
              </td>
              
              <td class="data-cell">
                <span class="numerical-metric-text">1,420 items</span>
              </td>
              
              <td class="data-cell">
                <span class="region-fallback-text">North America</span>
              </td>
              
              <td class="data-cell">
                <button type="button" class="row-action-trigger">Manage</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "stores",
};
</script>

<style scoped>
.stores-view {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  width: 100%;
  box-sizing: border-box;
}

/* ─── Page Header Specs ─── */
.page-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  height: auto;
  box-sizing: border-box;
}

.page-title-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}

.page-title {
  margin: 0;
  font-family: 'Geist', sans-serif;
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
  letter-spacing: -0.64px;
  color: #191B23;
}

.page-subtitle {
  margin: 0;
  font-family: 'Geist', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #434654;
}

.view-toggle-bg {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px;
  gap: 8px;
  background: #EDEDF8;
  border-radius: 8px;
}

.toggle-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  height: 32px;
  border-radius: 6px;
}

.toggle-btn.active-state {
  background: #FFFFFF;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
}

.btn-text {
  font-family: 'Geist', sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.24px;
  color: #434654;
}

.toggle-btn.active-state .btn-text {
  color: #1550D3;
}

/* ─── Filter Bar Actions Specs ─── */
.filter-frame {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 23px;
  width: 100%;
  height: 44px;
  box-sizing: border-box;
}

.search-input-wrapper {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
}

.input-inner {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
}

.filter-field {
  box-sizing: border-box;
  width: 100%;
  height: 42px;
  padding: 11px 16px 11px 40px;
  background: #FAF8FF;
  border: 1px solid #C3C5D7;
  border-radius: 8px;
  font-family: 'Geist', sans-serif;
  font-size: 14px;
  line-height: 18px;
  color: #191B23;
  outline: none;
}

.filter-field::placeholder {
  color: #6B7280;
}

.search-icon {
  position: absolute;
  left: 12px;
  width: 15px;
  height: 15px;
  pointer-events: none;
}

.dropdown-wrapper {
  box-sizing: border-box;
  width: 192px;
  height: 42px;
  background: #FAF8FF;
  border: 1px solid #C3C5D7;
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 10px 16px;
  cursor: pointer;
}

.dropdown-text {
  font-family: 'Geist', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #191B23;
  flex: 1;
}

.vector-arrow {
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 5px solid #6B7280;
}

.action-buttons-group {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
}

.layout-grid-btn {
  width: 44px;
  height: 44px;
  background: #E7E7F2;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.primary-add-btn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 16px;
  height: 36px;
  background: #F3F3FE;
  border: 1px solid #1550D3;
  border-radius: 8px;
  cursor: pointer;
}

.add-btn-text {
  font-family: 'Geist', sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.24px;
  color: #1550D3;
}

/* ─── Table Data Ledger Layout Specs ─── */
.table-container-section {
  box-sizing: border-box;
  width: 100%;
  background: #FFFFFF;
  border: 1px solid rgba(195, 197, 215, 0.3);
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 12px;
  overflow: hidden;
}

.scrollable-table-window {
  width: 100%;
  overflow-x: auto;
}

.stores-data-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

thead {
  background: #F3F3FE;
  border-bottom: 1px solid #C3C5D7;
}

.header-cell {
  padding: 24px;
  font-family: 'Geist', sans-serif;
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: #434654;
}

/* Base Pixel Bounds extracted from structural metadata cell properties */
.spec-w-162 { width: 25%; }
.spec-w-139 { width: 20%; }
.spec-w-151 { width: 20%; }
.spec-w-144 { width: 15%; }
.spec-w-132 { width: 12%; }
.spec-w-96  { width: 8%; }

.store-data-row {
  border-bottom: 1px solid rgba(195, 197, 215, 0.3);
  transition: background 0.15s ease;
}

.store-data-row:hover {
  background: #FAF8FF;
}

.data-cell {
  padding: 16px 24px;
  vertical-align: middle;
}

.brand-cell-group {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
}

.brand-avatar-border {
  box-sizing: border-box;
  width: 32px;
  height: 32px;
  background: #FAF8FF;
  border: 1px solid rgba(195, 197, 215, 0.5);
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.avatar-fallback-img {
  width: 100%;
  height: 100%;
  background: #3c6bed;
}

.brand-meta-stack {
  display: flex;
  flex-direction: column;
}

.main-title-text {
  font-family: 'Geist', sans-serif;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  color: #191B23;
}

.sub-caption-text {
  font-family: 'Geist', sans-serif;
  font-weight: 500;
  font-size: 11px;
  line-height: 14px;
  letter-spacing: 0.24px;
  color: #434654;
}

/* Domain Links */
.domain-link-wrapper {
  display: flex;
  align-items: center;
  gap: 4px;
}

.inline-domain-link {
  font-family: 'Geist', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #1550D3;
  text-decoration: none;
}

.inline-domain-link:hover {
  text-decoration: underline;
}

.external-icon {
  font-size: 10px;
  color: #1550D3;
}

/* Active Promotions Cell Structure Specs */
.promo-stack-container {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.badge-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
}

.promo-pill-bg {
  box-sizing: border-box;
  display: flex;
  padding: 2px 8px;
  background: rgba(108, 248, 187, 0.2);
  border: 1px solid rgba(0, 108, 73, 0.2);
  border-radius: 4px;
}

.pill-code-text {
  font-family: 'Geist Mono', monospace;
  font-weight: 400;
  font-size: 11px;
  line-height: 14px;
  color: #00714D;
}

.promo-count-weight {
  font-family: 'Geist', sans-serif;
  font-weight: 700;
  font-size: 12px;
  color: #191B23;
}

.promo-marketing-text {
  font-family: 'Geist', sans-serif;
  font-weight: 400;
  font-size: 11px;
  line-height: 14px;
  color: #434654;
}

.numerical-metric-text,
.region-fallback-text {
  font-family: 'Geist', sans-serif;
  font-size: 14px;
  line-height: 20px;
  color: #434654;
}

.row-action-trigger {
  background: none;
  border: none;
  color: #1550D3;
  font-family: 'Geist', sans-serif;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
}

.row-action-trigger:hover {
  text-decoration: underline;
}
</style>