<template>
  <div v-if="routerReady">
    <template v-if="$route.meta.layout !== 'blank' && !$route.meta.requiresAdmin">
      <Navbar />
    </template>

    <router-view />

    <template v-if="$route.meta.layout !== 'blank' && !$route.meta.requiresAdmin">
      <Footer />
    </template>
  </div>
</template>

<script>
import Footer from "./components/Footer.vue";
import Navbar from "./components/Navbar.vue";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import { initRecommendationScheduler } from "./composables/useRecommendations.js";

export default {
  name: "App",
  components: {
    Navbar,
    Footer,
  },
  setup() {
    const router = useRouter();
    const routerReady = ref(false);

    router.isReady().then(() => {
      routerReady.value = true;
      if (localStorage.getItem("token")) {
        initRecommendationScheduler();
      }
    });

    return { routerReady };
  },
};
</script>

<style scoped></style>