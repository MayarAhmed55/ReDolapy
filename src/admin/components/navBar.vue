<template>
  <header class="dash-header">
    <div class="search-container">
      <img src="../../assets/Icon (9).svg" class="search-icon-img" alt="" />
      <input
        type="text"
        class="search-input"
        placeholder="Search global database..."
        aria-label="Search global database"
      />
    </div>

    <div class="header-controls">
      <button type="button" class="ctrl-btn" aria-label="Action 1">
        <img src="../../assets/Icon (10).svg" alt="" />
      </button>
      <button type="button" class="ctrl-btn" aria-label="Action 2">
        <img src="../../assets/Icon (11).svg" alt="" />
      </button>
      <button type="button" class="ctrl-btn" aria-label="Action 3">
        <img src="../../assets/Icon (12).svg" alt="" />
      </button>

      <div class="vertical-divider"></div>

      <div class="mini-profile" role="button" tabindex="0" aria-label="Profile menu">
        <div class="avatar-initials">DA</div>
        <img src="../../assets/Icon (13).svg" alt="" />
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "navBar",
};
</script>

<style scoped>
.dash-header {
  /* Flow inside .main-area — no absolute positioning or manual offset needed */
  width:100%;
  height: 110px;
  flex-shrink: 0;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: #ffffff;
  font-family: 'Geist', sans-serif;
  box-sizing: border-box;
  border-bottom: 1px solid #EDEEEF;
}

/* --- Search Bar --- */
.search-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  width: 412px;
  height: 54px;
  background: #edeeef;
  border: 1px solid #c3c5d7;
  border-radius: 16px;
}

.search-icon-img {
  width: 13.5px;
  height: 13.5px;
  flex-shrink: 0;
}

.search-input {
  width: 100%;
  border: none;
  background: transparent;
  font-family: 'Geist', sans-serif;
  font-size: 14px;
  line-height: 18px;
  color: #191b23;
}

.search-input::placeholder {
  color: #6b7280;
}

.search-input:focus {
  outline: none;
}

/* --- Right Side Controls --- */
.header-controls {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  height: 36px;
}

.ctrl-btn {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  border-radius: 6px;
  transition: background 0.2s;
}

.ctrl-btn:hover {
  background: rgba(0, 0, 0, 0.05);
}

.ctrl-btn img {
  display: block;
}

.vertical-divider {
  width: 1px;
  height: 32px;
  background: #c3c5d7;
}

/* --- Profile --- */
.mini-profile {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  height: 32px;
}

.avatar-initials {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  background: #3c6bed;
  border-radius: 50%;
  font-family: 'Geist', sans-serif;
  font-weight: 700;
  font-size: 12px;
  color: #ffffff;
  text-transform: uppercase;
}
</style>