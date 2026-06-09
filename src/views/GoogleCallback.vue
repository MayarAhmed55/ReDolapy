<template>
  <div class="callback-screen">
    <div class="spinner" />
  </div>
</template>

<script>
import { onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "GoogleCallback",
  setup() {
    const router = useRouter();

    onMounted(() => {
      const params = new URLSearchParams(window.location.search);

      const token  = params.get("token");
      const email  = params.get("email");
      const fname  = params.get("fname");
      const lname  = params.get("lname");
      const id     = params.get("_id");
      const image  = params.get("image");

      if (token && email) {
        const userData = { id, email, token, firstName: fname, lastName: lname, userImage: image };

        if (window.opener) {
          // Opened as a popup — send data back to the main window and close
          window.opener.postMessage(
            { type: "GOOGLE_AUTH_SUCCESS", payload: userData },
            window.origin
          );
          window.close();
        } else {
          // Normal redirect flow — save token and navigate home
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(userData));
          router.replace("/");
        }
      } else if (!window.opener) {
        router.replace("/");
      }
    });
  },
};
</script>

<style scoped>
.callback-screen {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #0a0e17;
}

.spinner {
  width: 48px;
  height: 48px;
  border: 4px solid rgba(0, 229, 255, 0.2);
  border-top-color: #40b9ff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>

<!-- 
  ── handleGoogle snippet for login-signUp.vue ──────────────────

  Add this inside setup(), replacing your current handleGoogle:

    function handleGoogle() {
      const popup = window.open(
        'http://localhost:5000/api/auth/google',
        'Google Login',
        'width=500,height=600,left=400,top=100'
      );

      window.addEventListener('message', (event) => {
        if (event.origin !== window.origin) return;
        if (event.data?.type === 'GOOGLE_AUTH_SUCCESS') {
          const { token, ...user } = event.data.payload;
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
          emit('submit', event.data.payload);
        }
      }, { once: true });
    }
-->