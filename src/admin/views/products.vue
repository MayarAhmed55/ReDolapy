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
            <div class="cell cell-checkbox">
              <input type="checkbox" class="ui-checkbox" />
            </div>
            <div class="cell cell-product-info">
              <span class="th-text">Product</span>
            </div>
            <div class="cell cell-store-location">
              <span class="th-text">Store Location</span>
            </div>
            <div class="cell cell-season">
              <span class="th-text">Season</span>
            </div>
            <div class="cell cell-sku">
              <span class="th-text">SKU</span>
            </div>
            <div class="cell cell-stock">
              <span class="th-text-center">Stock</span>
            </div>
            <div class="cell cell-price">
              <span class="th-text">Price</span>
            </div>
          </div>
        </div>

        <div class="table-body-container">
          <!-- Row 1 -->
          <div class="table-data-row">
            <div class="data-cell cell-checkbox">
              <input type="checkbox" class="ui-checkbox" />
            </div>
            <div class="data-cell cell-product-info row-layout-align">
              <div class="product-img-bg">
                <div class="asset-img-placeholder"></div>
              </div>
              <div class="meta-stack">
                <span class="meta-title-text">Velvet Oxford Brogue</span>
                <span class="meta-mono-text">#PROD-00412</span>
              </div>
            </div>
            <div class="data-cell cell-store-location stack-layout-align">
              <div class="info-stack-wrapper">
                <span class="info-primary-text">Milan Flagship</span>
              </div>
              <div class="info-stack-wrapper">
                <span class="info-secondary-text">Footwear</span>
              </div>
            </div>
            <div class="data-cell cell-season gap-layout-align">
              <span class="season-badge season-active">SS 2025</span>
            </div>
            <div class="data-cell cell-sku sku-align">
              <span class="sku-text">#SKU-00412</span>
            </div>
            <div class="data-cell cell-stock stock-align">
              <div class="tryons-pill"><div class="tryons-dot"></div></div>
            </div>
            <div class="data-cell cell-price price-align">
              <div class="price-stack">
                <span class="price-amount">$540.00</span>
                <span class="price-currency">USD</span>
              </div>
            </div>
          </div>

          <!-- Row 2 -->
          <div class="table-data-row">
            <div class="data-cell cell-checkbox">
              <input type="checkbox" class="ui-checkbox" />
            </div>
            <div class="data-cell cell-product-info row-layout-align">
              <div class="product-img-bg">
                <div class="asset-img-placeholder"></div>
              </div>
              <div class="meta-stack">
                <span class="meta-title-text">Arc Shell Parka</span>
                <span class="meta-mono-text">#PROD-00839</span>
              </div>
            </div>
            <div class="data-cell cell-store-location stack-layout-align">
              <div class="info-stack-wrapper">
                <span class="info-primary-text">Paris Boutique</span>
              </div>
              <div class="info-stack-wrapper">
                <span class="info-secondary-text">Outerwear</span>
              </div>
            </div>
            <div class="data-cell cell-season gap-layout-align">
              <span class="season-badge season-active">SS 2025</span>
            </div>
            <div class="data-cell cell-sku sku-align">
              <span class="sku-text">#SKU-00839</span>
            </div>
            <div class="data-cell cell-stock stock-align">
              <div class="tryons-empty"></div>
            </div>
            <div class="data-cell cell-price price-align">
              <div class="price-stack">
                <span class="price-amount">$1,250.00</span>
                <span class="price-currency">USD</span>
              </div>
            </div>
          </div>

          <!-- Row 3 -->
          <div class="table-data-row">
            <div class="data-cell cell-checkbox">
              <input type="checkbox" class="ui-checkbox" />
            </div>
            <div class="data-cell cell-product-info row-layout-align">
              <div class="product-img-bg">
                <div class="asset-img-placeholder"></div>
              </div>
              <div class="meta-stack">
                <span class="meta-title-text">Chain-Link Belt Bag</span>
                <span class="meta-mono-text">#PROD-01105</span>
              </div>
            </div>
            <div class="data-cell cell-store-location stack-layout-align">
              <div class="info-stack-wrapper">
                <span class="info-primary-text">Global E-Shop</span>
              </div>
              <div class="info-stack-wrapper">
                <span class="info-secondary-text">Accessories</span>
              </div>
            </div>
            <div class="data-cell cell-season gap-layout-align">
              <span class="season-badge season-active">SS 2025</span>
            </div>
            <div class="data-cell cell-sku sku-align">
              <span class="sku-text">#SKU-01105</span>
            </div>
            <div class="data-cell cell-stock stock-align">
              <div class="tryons-pill"><div class="tryons-dot"></div></div>
            </div>
            <div class="data-cell cell-price price-align">
              <div class="price-stack">
                <span class="price-amount">$890.00</span>
                <span class="price-currency">USD</span>
              </div>
            </div>
          </div>

          <!-- Row 4 -->
          <div class="table-data-row">
            <div class="data-cell cell-checkbox">
              <input type="checkbox" class="ui-checkbox" />
            </div>
            <div class="data-cell cell-product-info row-layout-align">
              <div class="product-img-bg">
                <div class="asset-img-placeholder"></div>
              </div>
              <div class="meta-stack">
                <span class="meta-title-text">Duchess Gown</span>
                <span class="meta-mono-text">#PROD-00271</span>
              </div>
            </div>
            <div class="data-cell cell-store-location stack-layout-align">
              <div class="info-stack-wrapper">
                <span class="info-primary-text">London Flagship</span>
              </div>
              <div class="info-stack-wrapper">
                <span class="info-secondary-text">Evening Wear</span>
              </div>
            </div>
            <div class="data-cell cell-season gap-layout-align">
              <span class="season-badge season-active">SS 2025</span>
            </div>
            <div class="data-cell cell-sku sku-align">
              <span class="sku-text">#SKU-00271</span>
            </div>
            <div class="data-cell cell-stock stock-align">
              <div class="tryons-pill"><div class="tryons-dot"></div></div>
            </div>
            <div class="data-cell cell-price price-align">
              <div class="price-stack">
                <span class="price-amount">$1,450.00</span>
                <span class="price-currency">USD</span>
              </div>
            </div>
          </div>

          <!-- Row 5 -->
          <div class="table-data-row">
            <div class="data-cell cell-checkbox">
              <input type="checkbox" class="ui-checkbox" />
            </div>
            <div class="data-cell cell-product-info row-layout-align">
              <div class="product-img-bg">
                <div class="asset-img-placeholder"></div>
              </div>
              <div class="meta-stack">
                <span class="meta-title-text">Drift Linen Blazer</span>
                <span class="meta-mono-text">#PROD-00588</span>
              </div>
            </div>
            <div class="data-cell cell-store-location stack-layout-align">
              <div class="info-stack-wrapper">
                <span class="info-primary-text">London Flagship</span>
              </div>
              <div class="info-stack-wrapper">
                <span class="info-secondary-text">Evening Wear</span>
              </div>
            </div>
            <div class="data-cell cell-season gap-layout-align">
              <span class="season-badge season-active">SS 2025</span>
            </div>
            <div class="data-cell cell-sku sku-align">
              <span class="sku-text">#SKU-00588</span>
            </div>
            <div class="data-cell cell-stock stock-align">
              <div class="tryons-pill"><div class="tryons-dot"></div></div>
            </div>
            <div class="data-cell cell-price price-align">
              <div class="price-stack">
                <span class="price-amount">$1,450.00</span>
                <span class="price-currency">USD</span>
              </div>
            </div>
          </div>

          <!-- Row 6 -->
          <div class="table-data-row">
            <div class="data-cell cell-checkbox">
              <input type="checkbox" class="ui-checkbox" />
            </div>
            <div class="data-cell cell-product-info row-layout-align">
              <div class="product-img-bg">
                <div class="asset-img-placeholder"></div>
              </div>
              <div class="meta-stack">
                <span class="meta-title-text">Opal Slip Dress</span>
                <span class="meta-mono-text">#PROD-00934</span>
              </div>
            </div>
            <div class="data-cell cell-store-location stack-layout-align">
              <div class="info-stack-wrapper">
                <span class="info-primary-text">London Flagship</span>
              </div>
              <div class="info-stack-wrapper">
                <span class="info-secondary-text">Evening Wear</span>
              </div>
            </div>
            <div class="data-cell cell-season gap-layout-align">
              <span class="season-badge season-active">SS 2025</span>
            </div>
            <div class="data-cell cell-sku sku-align">
              <span class="sku-text">#SKU-00934</span>
            </div>
            <div class="data-cell cell-stock stock-align">
              <div class="tryons-pill"><div class="tryons-dot"></div></div>
            </div>
            <div class="data-cell cell-price price-align">
              <div class="price-stack">
                <span class="price-amount">$1,450.00</span>
                <span class="price-currency">USD</span>
              </div>
            </div>
          </div>
        </div>
        <!-- /table-body-container -->
      </div>
      <!-- /data-table-wrapper -->

      <!-- Pagination -->
      <div class="pagination-footer">
        <span class="pagination-info">Showing 1–6 of 128 products</span>
        <div class="pagination-controls">
          <button class="page-btn page-arrow">&#8249;</button>
          <button class="page-btn page-active">1</button>
          <button class="page-btn">2</button>
          <button class="page-btn">3</button>
          <button class="page-btn">4</button>
          <span class="page-sep">…</span>
          <button class="page-btn">12</button>
          <button class="page-btn page-arrow">&#8250;</button>
        </div>
      </div>
    </main>
  </div>
</template>

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

.cell-checkbox {
  width: 48px;
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

.ui-checkbox {
  box-sizing: border-box;
  width: 16px;
  height: 16px;
  background: #ffffff;
  border: 1px solid #c3c5d7;
  border-radius: 4px;
  margin: 0;
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

.data-cell.cell-checkbox {
  flex-direction: column;
  align-items: flex-start;
  padding: 36px 16px 36.5px;
  width: 48px;
}

.row-layout-align {
  flex-direction: row;
  align-items: center;
  padding: 0px 0px 0px 16px;
  gap: 12px;
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
