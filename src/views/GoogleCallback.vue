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
      const params = new URLSearchParams(window.location.search);
    const clientUrl = params.get("client_url") || window.location.origin;

    function notifyOpener(userData, token) {
      localStorage.setItem("user", JSON.stringify(userData));

      if (window.opener && !window.opener.closed) {
        window.opener.postMessage(
          { type: "GOOGLE_AUTH_SUCCESS", payload: { ...userData, token } },
          // window.origin,
                    clientUrl,
        );
        window.close();
        return;
      }

      // Fallback when cross-origin OAuth severs window.opener (Cloud Run callback URL)
      localStorage.setItem("google_auth_trigger", String(Date.now()));
      window.close();
    }

    onMounted(async () => {
      // const params = new URLSearchParams(window.location.search);
      const authError = params.get("error");

      if (authError) {
        console.error("Google login failed:", authError);
        if (window.opener && !window.opener.closed) {
          window.opener.postMessage(
            { type: "GOOGLE_AUTH_ERROR", error: authError },
            // window.origin,
                      clientUrl,
          );
          window.close();
        } else {
          router.replace("/");
        }
        return;
      }

      const token = params.get("token");
      const email = params.get("email");
      const _id = params.get("_id");

      if (token && email && _id) {
        localStorage.setItem("token", token);

        try {
          const userRes = await getUserById(_id);

          const userData = {
            first_name: userRes.data.user.profile.first_name,
            last_name: userRes.data.user.profile.last_name,
            email: userRes.data.user.email,
            id: userRes.data.user._id,
            userImage: userRes.data.user.userImage,
            language: userRes.data.user.settings.language,
            avatars: userRes.data.user.avatars,
            darkMode: userRes.data.user.darkMode,
            has_mobile_app: userRes.data.user.settings.has_mobile_app,
            gender: userRes.data.user.profile.gender,
            date_of_birth: userRes.data.user.profile.date_of_birth,
            notifications: userRes.data.user.settings.notifications_enabled,
            role: userRes.data.user.role,
          };

          notifyOpener(userData, token);
        } catch (err) {
          console.error("Failed to fetch user profile after Google login:", err);
          localStorage.removeItem("token");
          if (window.opener && !window.opener.closed) {
            window.close();
          } else {
            router.replace("/");
          }
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