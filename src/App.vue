<template>
  <div>
    <template v-if="$route.meta.layout !== 'blank'">
      <Navbar />
    </template>

    <router-view />

    <template v-if="$route.meta.layout !== 'blank'">
      <Footer />
    </template>
  </div>
</template>

<script>
import Footer from "./components/Footer.vue";
import Navbar from "./components/Navbar.vue";

export default {
  name: "App",
  components: {
    Navbar,
    Footer,
  },
};
</script>

<style scoped></style>
