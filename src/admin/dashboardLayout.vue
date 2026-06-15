<template>
  <div class="admin-layout">
    <SideBar />

    <div class="main-area">
      <NavBar />

      <main class="page-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import SideBar from './components/sideBar.vue';
import NavBar from './components/navBar.vue';

export default {
  name: 'AdminLayout',
  components: {
    SideBar,
    NavBar,
  },
};
</script>

<style scoped>
.admin-layout {
  display: flex;
  width: 104.5%;
  height: 100vh;
  overflow: hidden;
  background-color: #ffffff;
}

/* Offset content exactly by the width of your fixed sidebar (280px) */
.main-area {
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-left: 190px; /* Crucial: Matches sidebar width */
  height: 100vh;
  min-width: 0;
}

.page-content {
  flex: 1;
  padding: 24px; /* Optional: cleaner whitespace padding around Profile form */
  padding-top: 5px;
  overflow-y: auto; /* Allows profile page to scroll independently of nav/sidebar */
}
</style>