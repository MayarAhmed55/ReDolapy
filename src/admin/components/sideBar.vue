<template>
  <aside class="sidenav-bar">
    <div class="brand-margin">
      <div class="brand-container">
        <div class="brand-logo-wrapper">
          <img
            src="../../assets/45380b17-7ecb-4043-8722-90acbe27d99a 1.png"
            class="brand-logo"
            alt="Logo"
          />
        </div>
        <div class="brand-subtitle-container">
          <span class="brand-subtitle-text">Global Admin</span>
        </div>
      </div>
    </div>

    <nav class="nav-links-scroll-wrapper">
      <router-link
        to="/admin/dashboard"
        class="nav-link"
        active-class="item-active"
      >
        <div class="icon-frame-wrapper spec-active-dim">
          <img src="../../assets/icon (14).svg" class="active-color" />
        </div>
        <div class="label-frame-wrapper spec-active-txt-w">
          <span class="link-label">Dashboard</span>
        </div>
      </router-link>

      <router-link
        to="/admin/stores"
        class="nav-link"
        active-class="item-active"
      >
        <div class="icon-frame-wrapper">
          <img src="../../assets/Icon (1).svg" />
        </div>
        <div class="label-frame-wrapper spec-stores-w">
          <span class="link-label">Stores</span>
        </div>
      </router-link>

      <router-link
        to="/admin/products"
        class="nav-link"
        active-class="item-active"
      >
        <div class="icon-frame-wrapper">
          <img src="../../assets/Icon (2).svg" />
        </div>
        <div class="label-frame-wrapper spec-products-w">
          <span class="link-label">Products</span>
        </div>
      </router-link>

      <!-- <router-link
        to="/admin/promotions"
        class="nav-link"
        active-class="item-active"
      >
        <div class="icon-frame-wrapper">
          <img src="../../assets/Icon (3).svg" class="icon-asset" />
        </div>
        <div class="label-frame-wrapper spec-orders-w">
          <span class="link-label">Promotions</span>
        </div>
      </router-link> -->

      <router-link
        to="/admin/notifications"
        class="nav-link"
        active-class="item-active"
      >
        <div class="icon-frame-wrapper">
          <img src="../../assets/Icon (4).svg" />
        </div>
        <div class="label-frame-wrapper spec-analytics-w">
          <span class="link-label">Notifications</span>
        </div>
      </router-link>

      <router-link
        to="/admin/emailCenter"
        class="nav-link"
        active-class="item-active"
      >
        <div class="icon-frame-wrapper">
          <img src="../../assets/Icon (5).svg" />
        </div>
        <div class="label-frame-wrapper spec-tryon-w">
          <span class="link-label">Email Center</span>
        </div>
      </router-link>

      <router-link
        to="/admin/users"
        class="nav-link"
        active-class="item-active"
      >
        <div class="icon-frame-wrapper">
          <img src="../../assets/Icon (6).svg" />
        </div>
        <div class="label-frame-wrapper spec-recycle-w">
          <span class="link-label">Users</span>
        </div>
      </router-link>

      <router-link to="/admin/API" class="nav-link" active-class="item-active">
        <div class="icon-frame-wrapper">
          <img src="../../assets/Icon (7).svg" />
        </div>
        <div class="label-frame-wrapper spec-management-w">
          <span class="link-label">API Management</span>
        </div>
      </router-link>

      <router-link
        to="/admin/setttings"
        class="nav-link"
        active-class="item-active"
      >
        <div class="icon-frame-wrapper">
          <img src="../../assets/Icon (8).svg" />
        </div>
        <div class="label-frame-wrapper spec-settings-w">
          <span class="link-label">Settings</span>
        </div>
      </router-link>
    </nav>

    <div class="profile-outer-footer">
      <div class="profile-pill-bg">
        <img :src="img" class="profile-avatar-frame" />
        <div class="profile-metadata-stack">
          <div class="profile-name-row">
            <span class="display-name">{{ first_name + " " + last_name }}</span>
          </div>
          <div class="profile-role-row">
            <span class="role-badge">Super Admin</span>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  name: "SideNavBar",
  data() {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    return {
      first_name: user.first_name,
      last_name: user.last_name,
      img:user.userImage
    };
  },
};
</script>

<style scoped>
.sidenav-bar {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 24px 0px;
  position: fixed;
  width: 280px;
  height: 100vh;
  left: 0px;
  top: 0px;
  background: #faf8ff;
  border-right: 1px solid #c3c5d7;
  z-index: 100;
}

.brand-margin {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px 0px 32px;
  width: 100%;
  flex-shrink: 0;
}

.brand-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px 24px;
  width: 100%;
  box-sizing: border-box;
}

.brand-logo-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
}

.brand-logo {
  max-width: 100%;
  height: auto;
  object-fit: contain;
}

.brand-subtitle-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 8px;
  width: 100%;
}

.brand-subtitle-text {
  width: 100%;
  font-family: "Geist", sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  letter-spacing: 0.24px;
  color: #434654;
}

.nav-links-scroll-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px 8px;
  gap: 4px;
  width: 100%;
  box-sizing: border-box;
  overflow-y: auto;
  flex: 1;
}

.nav-link {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 16px;
  gap: 12px;
  width: 100%;
  height: 44px;
  text-decoration: none;
  border-left: 4px solid transparent;
  transition: all 0.2s ease;
}

/* Active Class handles dynamic highlight perfectly */
.nav-link.item-active {
  background: #f3f3fe;
  border-left: 4px solid #1550d3;
}

.nav-link.item-active .link-label {
  color: #1550d3;
  font-weight: 600;
}

.icon-frame-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.label-frame-wrapper {
  display: flex;
  align-items: center;
  height: 16px;
  flex: 1;
}

.link-label {
  font-family: "Geist", sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.24px;
  color: #434654;
}

.profile-outer-footer {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
  width: 100%;
  box-sizing: border-box;
  flex-shrink: 0;
}

.profile-pill-bg {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px;
  gap: 12px;
  background: #ededf8;
  border-radius: 12px;
  width: 100%;
  box-sizing: border-box;
}

.profile-avatar-frame {
  width: 50px;
  height: 50px;
  flex-shrink: 0;
  background: #3c6bed; /* Fallback accent color */
  border: 2px solid rgba(21, 80, 211, 0.2);
  border-radius: 9999px;
}

.profile-metadata-stack {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
  flex: 1;
  min-width: 0;
}

.profile-name-row,
.profile-role-row {
  width: 100%;
}

.display-name {
  font-family: "Geist", sans-serif;
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.24px;
  color: #191b23;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.role-badge {
  font-family: "Geist", sans-serif;
  font-weight: 400;
  font-size: 10px;
  line-height: 15px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: #434654;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
