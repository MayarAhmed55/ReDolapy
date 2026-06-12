<template>
  <div class="callback-screen">
    <div class="spinner" />
  </div>
</template>

<script>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { getUserById } from "../services/services"; // adjust path if needed

export default {
  name: "GoogleCallback",
  setup() {
    const router = useRouter();

    onMounted(async () => {
      const params = new URLSearchParams(window.location.search);

      const token = params.get("token");
      const email = params.get("email");
      const _id   = params.get("_id");

      if (token && email && _id) {
        // Store token first so getUserById can attach it to the request
        localStorage.setItem("token", token);

        try {
          const userRes = await getUserById(_id);

          const userData = {
            first_name:      userRes.data.user.profile.first_name,
            last_name:       userRes.data.user.profile.last_name,
            email:           userRes.data.user.email,
            id:              userRes.data.user._id,
            userImage:       userRes.data.user.userImage,
            language:        userRes.data.user.settings.language,
            avatars:         userRes.data.user.avatars,
            darkMode:        userRes.data.user.darkMode,
            has_mobile_app:  userRes.data.user.settings.has_mobile_app,
            gender:          userRes.data.user.profile.gender,
            date_of_birth:   userRes.data.user.profile.date_of_birth,
          };

          if (window.opener) {
            // Popup flow — send full data back to the opener and close
            window.opener.postMessage(
              { type: "GOOGLE_AUTH_SUCCESS", payload: { ...userData, token } },
              window.origin
            );
            window.close();
          } else {
            // Redirect flow — save and navigate home
            localStorage.setItem("user", JSON.stringify(userData));
            router.replace("/");
          }
        } catch (err) {
          console.error("Failed to fetch user profile after Google login:", err);
          localStorage.removeItem("token");
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
  to {
    transform: rotate(360deg);
  }
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
          const { token, ...userData } = event.data.payload;
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(userData));
          emit('submit', event.data.payload);
        }
      }, { once: true });
    }
-->