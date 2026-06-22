<template>
  <div class="auth-wrapper">
    <div class="auth-tabs">
      <button
        class="auth-tab"
        :class="{ active: mode === 'signup' }"
        @click="switchTo('signup')"
      >
        {{ $t("auth.tabs.signUp") }}
      </button>
      <button
        class="auth-tab"
        :class="{ active: mode === 'login' }"
        @click="switchTo('login')"
      >
        {{ $t("auth.tabs.login") }}
      </button>
    </div>

    <div
      class="form-panel form-panel--signup"
      :data-active="String(mode === 'signup')"
    >
      <div class="form-container">
        <div class="form-header">
          <h2 class="form-title">{{ $t("auth.signup.title") }}</h2>
          <p class="form-subtitle">{{ $t("auth.signup.subtitle") }}</p>
        </div>
        <div class="fields-wrapper">
          <div class="field-row">
            <div class="field-group">
              <label class="field-label">{{
                $t("auth.signup.firstName")
              }}</label>
              <div class="input-box">
                <input
                  v-model="form.first_name"
                  type="text"
                  :placeholder="$t('auth.signup.firstNamePlaceholder')"
                  class="field-input"
                />
              </div>
            </div>
            <div class="field-group">
              <label class="field-label">{{
                $t("auth.signup.lastName")
              }}</label>
              <div class="input-box">
                <input
                  v-model="form.last_name"
                  type="text"
                  :placeholder="$t('auth.signup.lastNamePlaceholder')"
                  class="field-input"
                />
              </div>
            </div>
          </div>
          <div class="field-group full-width">
            <label class="field-label">{{ $t("auth.signup.email") }}</label>
            <div class="input-box">
              <input
                v-model="form.emailSignup"
                type="email"
                :placeholder="$t('auth.signup.emailPlaceholder')"
                class="field-input"
              />
            </div>
          </div>
          <div class="field-group full-width">
            <label class="field-label">{{ $t("auth.signup.password") }}</label>
            <div class="input-box input-box--icon">
              <input
                v-model="form.passwordSignup"
                :type="showPassword ? 'text' : 'password'"
                :placeholder="$t('auth.signup.passwordPlaceholder')"
                class="field-input"
              />
              <button
                class="eye-btn"
                @click="showPassword = !showPassword"
                type="button"
              >
                <EyeIcon :open="showPassword" />
              </button>
            </div>
          </div>
          <div class="field-group full-width">
            <label class="field-label">{{
              $t("auth.signup.confirmPassword")
            }}</label>
            <div class="input-box input-box--icon">
              <input
                v-model="form.confirmPasswordSignup"
                :type="showConfirm ? 'text' : 'password'"
                :placeholder="$t('auth.signup.confirmPasswordPlaceholder')"
                class="field-input"
              />
              <button
                class="eye-btn"
                @click="showConfirm = !showConfirm"
                type="button"
              >
                <EyeIcon :open="showConfirm" />
              </button>
            </div>
          </div>
        </div>
        <p v-if="error" style="color: red; font-size: 12px">{{ error }}</p>
        <p v-if="successMessage" class="success-message">
          {{ $t("auth.signup.successMessage") }}
        </p>
        <button
          class="submit-btn"
          @click="handleSubmit('signup')"
          :disabled="isLoading"
        >
          {{ isLoading ? $t("auth.signup.loading") : $t("auth.signup.submit") }}
        </button>
        <div class="divider">
          <span class="divider-text">{{ $t("auth.common.orDivider") }}</span>
        </div>
        <button class="google-btn" type="button" @click="handleGoogle()">
          <GoogleIcon />{{ $t("auth.common.continueWithGoogle") }}
        </button>
        <p class="switch-text">
          {{ $t("auth.signup.switchText") }}
          <button class="switch-link" @click="switchTo('login')">
            {{ $t("auth.signup.switchLink") }}
          </button>
        </p>
      </div>
    </div>

    <div
      class="form-panel form-panel--login"
      :data-active="String(mode === 'login')"
    >
      <div class="form-container">
        <div class="form-header">
          <h2 class="form-title">{{ $t("auth.login.title") }}</h2>
          <p class="form-subtitle">{{ $t("auth.login.subtitle") }}</p>
        </div>
        <div class="fields-wrapper">
          <div class="field-group full-width">
            <label class="field-label">{{ $t("auth.login.email") }}</label>
            <div class="input-box">
              <input
                v-model="form.email"
                type="email"
                :placeholder="$t('auth.login.emailPlaceholder')"
                class="field-input"
              />
            </div>
          </div>
          <div class="field-group full-width">
            <label class="field-label">{{ $t("auth.login.password") }}</label>
            <div class="input-box input-box--icon">
              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                :placeholder="$t('auth.login.passwordPlaceholder')"
                class="field-input"
              />
              <button
                class="eye-btn"
                @click="showPassword = !showPassword"
                type="button"
              >
                <EyeIcon :open="showPassword" />
              </button>
            </div>
          </div>
          <div class="forgot-row">
            <button class="forgot-link" @click="$emit('forgot-password')">
              {{ $t("auth.login.forgotPassword") }}
            </button>
          </div>
        </div>
        <p v-if="error" style="color: red; font-size: 12px">{{ error }}</p>
        <button
          class="submit-btn"
          @click="handleSubmit('login')"
          :disabled="isLoading"
        >
          {{ isLoading ? $t("auth.login.loading") : $t("auth.login.submit") }}
        </button>
        <div class="divider">
          <span class="divider-text">{{ $t("auth.common.orDivider") }}</span>
        </div>
        <button class="google-btn" type="button" @click="handleGoogle()">
          <GoogleIcon />{{ $t("auth.common.continueWithGoogle") }}
        </button>
        <p class="switch-text">
          {{ $t("auth.login.switchText") }}
          <button class="switch-link" @click="switchTo('signup')">
            {{ $t("auth.login.switchLink") }}
          </button>
        </p>
      </div>
    </div>

    <div
      class="left-panel"
      :class="{
        'left-panel--right': isRTL ? mode === 'login' : mode === 'signup',
      }"
    >
      <div class="left-content">
        <div class="brand-header">
          <h1
            class="brand-title"
            :class="{ 'content-hidden': !contentVisible }"
            v-html="
              mode === 'login'
                ? $t('auth.panel.welcomeBack')
                : $t('auth.panel.welcomeTo')
            "
          />
          <p
            class="brand-subtitle"
            :class="{ 'content-hidden': !contentVisible }"
          >
            {{
              mode === "login"
                ? $t("auth.panel.noAccount")
                : $t("auth.panel.alreadyHaveAccount")
            }}
          </p>
        </div>
        <button
          class="switch-btn"
          :class="{ 'content-hidden': !contentVisible }"
          @click="switchTo(mode === 'login' ? 'signup' : 'login')"
        >
          {{
            mode === "login" ? $t("auth.panel.signUp") : $t("auth.panel.login")
          }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, defineComponent, h, onUnmounted, computed } from "vue";
import { useI18n } from "vue-i18n";
import {
  login,
  signUp,
  updateProfile,
  getUserById,
  emailVerification,
} from "../services/services";
import API_BASE from "../config/api.js";

const EyeIcon = defineComponent({
  props: { open: Boolean },
  render() {
    return this.open
      ? h(
          "svg",
          {
            width: 20,
            height: 20,
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "#6B7280",
            "stroke-width": 2,
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
          },
          [
            h("path", {
              d: "M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24",
            }),
            h("line", { x1: 1, y1: 1, x2: 23, y2: 23 }),
          ],
        )
      : h(
          "svg",
          {
            width: 20,
            height: 20,
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "#6B7280",
            "stroke-width": 2,
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
          },
          [
            h("path", { d: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" }),
            h("circle", { cx: 12, cy: 12, r: 3 }),
          ],
        );
  },
});

const GoogleIcon = defineComponent({
  render() {
    return h(
      "svg",
      {
        width: 20,
        height: 20,
        viewBox: "0 0 20 20",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
      },
      [
        h("path", {
          d: "M19.6 10.23c0-.68-.06-1.36-.18-2H10v3.79h5.4a4.61 4.61 0 0 1-2 3.03v2.5h3.23c1.9-1.74 2.97-4.31 2.97-7.32z",
          fill: "#4285F4",
        }),
        h("path", {
          d: "M10 20c2.7 0 4.97-.9 6.63-2.45l-3.23-2.5c-.9.6-2.04.96-3.4.96-2.6 0-4.81-1.76-5.6-4.13H1.07v2.58A10 10 0 0 0 10 20z",
          fill: "#34A853",
        }),
        h("path", {
          d: "M4.4 11.88A5.98 5.98 0 0 1 4.08 10c0-.65.11-1.28.32-1.88V5.54H1.07A10 10 0 0 0 0 10c0 1.64.39 3.18 1.07 4.46l3.33-2.58z",
          fill: "#FBBC05",
        }),
        h("path", {
          d: "M10 3.98c1.47 0 2.79.51 3.83 1.5l2.86-2.86A9.94 9.94 0 0 0 10 0 10 10 0 0 0 1.07 5.54l3.33 2.58C5.19 5.74 7.4 3.98 10 3.98z",
          fill: "#EA4335",
        }),
      ],
    );
  },
});

export default {
  name: "LoginSignup",
  components: { EyeIcon, GoogleIcon },
  props: {
    mode: { type: String, default: "signup" },
  },
  emits: ["switch-mode", "submit", "forgot-password", "close"],
  setup(props, { emit }) {
    const form = ref({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    const showPassword = ref(false);
    const showConfirm = ref(false);
    const contentVisible = ref(true);
    const isLoading = ref(false);
    const successMessage = ref("");
    const error = ref(null);
    const { locale } = useI18n();
    const isRTL = computed(() => locale.value === "ar");
    const API = API_BASE;

    // function handleGoogle() {
    //   const popup = window.open(
    //     `${API}/auth/google`,
    //     "Google Login",
    //     "width=500,height=600,left=400,top=100",
    //   );

    //   if (!popup) {
    //     error.value = "Popup blocked. Allow popups for this site and try again.";
    //     return;
    //   }

    //   window.addEventListener(
    //     "message",
    //     (event) => {
    //       if (event.origin !== window.origin) return;
    //       if (event.data?.type === "GOOGLE_AUTH_SUCCESS") {
    //         const { token, ...user } = event.data.payload;
    //         localStorage.setItem("token", token);
    //         localStorage.setItem("user", JSON.stringify(user));
    //         if (popup && !popup.closed) popup.close();
    //         emit("login-success");
    //         emit("close");
    //         location.reload();
    //       }
    //     },
    //     { once: true },
    //   );
    // }

    // Inside LoginSignup.vue setup()

function handleGoogle() {
  const popup = window.open(
    `${API}/auth/google`,
    "Google Login",
    "width=500,height=600,left=400,top=100"
  );

  if (!popup) {
    error.value = "Popup blocked.";
    return;
  }

  // Define the storage listener
  const storageListener = (event) => {
    // Only listen for our specific trigger key
    if (event.key === "google_auth_trigger") {
      window.removeEventListener("storage", storageListener);
      
      // Data is already saved in localStorage by the callback
      // Simply reload the app to reflect the logged-in state
      location.reload(); 
    }
  };

  // Listen for storage changes
  window.addEventListener("storage", storageListener);
}

    function switchTo(newMode) {
      if (newMode === props.mode) return;
      // 1. Fade content out
      contentVisible.value = false;
      // 2. After half the slide duration, swap content
      setTimeout(() => {
        emit("switch-mode", newMode);
      }, 220);
      // 3. Fade content back in after panel lands
      setTimeout(() => {
        contentVisible.value = true;
      }, 500);
    }

    async function handleSubmit(mode) {
      isLoading.value = true;
      error.value = null;
      try {
        if (mode === "signup") {
          const res = await signUp({
            email: form.value.emailSignup,
            password: form.value.passwordSignup,
            confirmPassword: form.value.confirmPasswordSignup,
          });
          const token = res.data.token;
          localStorage.setItem("token", token);
          await updateProfile(
            {
              firstName: form.value.first_name,
              lastName: form.value.last_name,
            },
            token,
          );
          await emailVerification(token);
          successMessage.value =
            "We sent an email to verify your account. Check your inbox.";
          emit("submit", res.data);
        } else {
          const res = await login({
            email: form.value.email,
            password: form.value.password,
          });

          const token = localStorage.setItem("token", res.data.token);
          localStorage.setItem("_id", res.data._id);
          const userRes = await getUserById(res.data._id); // token is read from localStorage inside the service
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
            has_mobile_app: userRes.data.user.settings.has_mobile_app,
            notifications:userRes.data.user.settings.notifications_enabled,
            role:userRes.data.user.role
          };
          localStorage.setItem("user", JSON.stringify(userData));
          emit("login-success");
          emit("submit", userRes.data);
          emit("close");
          location.reload()
        }
      } catch (err) {
        error.value = err.response?.data?.message ?? "Something went wrong";
      } finally {
        isLoading.value = false;
      }
    }

    return {
      isRTL,
      form,
      showPassword,
      showConfirm,
      contentVisible,
      isLoading,
      error,
      successMessage,
      switchTo,
      handleSubmit,
      handleGoogle,
    };
  },
};
</script>

<style scoped>
/* ─── Wrapper ─────────────────────────────────────────── */
.auth-wrapper {
  position: relative;
  display: flex;
  width: 1118px;
  height: 90vh;
  max-height: 930px;
  border-radius: 40px;
  overflow: hidden;
  font-family: "Roboto", sans-serif;
  background: #ffffff;
}

.success-message {
  color: #155724;
  background-color: #d4edda;
  border: 1px solid #c3e6cb;
  font-size: 14px;
  padding: 12px;
  margin-top: 10px;

  border-radius: 4px;
  font-weight: 500;
}

/* ─── Static form panels ──────────────────────────────── */
/* Each form panel occupies half the wrapper, sitting behind the blue panel */
.form-panel {
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 32px 48px;
  flex-shrink: 0;
}

.form-panel--signup {
  order: 1;
}

.form-panel--login {
  order: 2;
}

/* ─── Blue sliding panel ──────────────────────────────── */
.left-panel {
  position: absolute;
  top: 0;
  left: 0;
  width: 530px;
  height: 100%;
  border-radius: 35px;
  /* both sides rounded */
  background-image:
    linear-gradient(rgba(128, 128, 128, 0.2), rgba(128, 128, 128, 0.2)),
    url("../assets/Login.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 64px;
  z-index: 10;

  /* slide transition */
  transition: left 0.55s cubic-bezier(0.77, 0, 0.175, 1);
  will-change: left;
}

/* When mode === 'login', panel slides to the right */
.left-panel--right {
  left: calc(100% - 530px);
}

/* ─── Panel content ───────────────────────────────────── */
.left-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 56px;
  width: 264px;
}

.brand-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.brand-title {
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  font-size: 48px;
  line-height: 63px;
  text-align: center;
  color: #ffffff;
  margin: 0;
  /* fade + slight lift */
  transition:
    opacity 0.22s ease,
    transform 0.22s ease;
}

.brand-subtitle {
  font-family: "Plus Jakarta Sans", sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 28px;
  text-align: center;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  max-width: 280px;
  transition:
    opacity 0.22s ease,
    transform 0.22s ease;
}

.switch-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 54px;
  width: 180px;
  height: 48px;
  border: 2px solid #f1f5f9;
  border-radius: 8px;
  background: transparent;
  font-family: "Roboto", sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 23px;
  color: #ffffff;
  cursor: pointer;
  transition:
    background 0.2s,
    opacity 0.22s ease,
    transform 0.22s ease;
}

.switch-btn:hover {
  background: rgba(255, 255, 255, 0.12);
}

/* ─── Content fade animation ──────────────────────────── */
.content-hidden {
  opacity: 0 !important;
  transform: translateY(10px) !important;
  pointer-events: none;
}

/* ─── Form container ──────────────────────────────────── */
.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  max-width: 420px;
}

/* ─── Form header ─────────────────────────────────────── */
.form-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  width: 100%;
}

.form-title {
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  font-size: 32px;
  line-height: 44px;
  color: #121826;
  margin: 0;
  width: 100%;
}

.form-subtitle {
  font-family: "Roboto", sans-serif;
  font-weight: 600;
  font-size: 15px;
  line-height: 19px;
  color: #3e4850;
  margin: 0;
}

/* ─── Fields ──────────────────────────────────────────── */
.fields-wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}

.field-row {
  display: flex;
  flex-direction: row;
  gap: 17px;
  width: 100%;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}

.field-group.full-width {
  width: 100%;
  flex: unset;
}

.field-label {
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: #121826;
}

.input-box {
  display: flex;
  align-items: center;
  padding: 10px 16px;
  gap: 10px;
  height: 47px;
  border: 2px solid #d5d9de;
  border-radius: 8px;
  transition: border-color 0.2s;
}

.input-box:focus-within {
  border-color: #40b9ff;
}

.input-box--icon {
  justify-content: space-between;
}

.field-input {
  flex: 1;
  border: none;
  outline: none;
  font-family: "Roboto", sans-serif;
  font-size: 12px;
  color: #121826;
  background: transparent;
  min-width: 0;
}

.field-input::placeholder {
  color: #a1a7b3;
}

.eye-btn {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.forgot-row {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: -4px;
}

.forgot-link {
  font-size: 12px;
  color: #40b9ff;
  text-decoration: none;
}

.forgot-link:hover {
  text-decoration: underline;
}

/* ─── Submit ──────────────────────────────────────────── */
.submit-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 56px;
  background: #40b9ff;
  border: none;
  border-radius: 8px;
  font-family: "Roboto", sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: #ffffff;
  cursor: pointer;
  transition: background 0.2s;
}

.submit-btn:hover {
  background: #29aaff;
}

/* ─── Divider ─────────────────────────────────────────── */
.divider {
  width: 100%;
  display: flex;
  justify-content: center;
}

.divider-text {
  font-family: "Inter", sans-serif;
  font-weight: 700;
  font-size: 12px;
  line-height: 26px;
  color: #40b9ff;
}

/* ─── Google ──────────────────────────────────────────── */
.google-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  width: 100%;
  height: 56px;
  border: 1px solid #d5d9de;
  border-radius: 8px;
  background: #ffffff;
  font-family: "Roboto", sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: #121826;
  cursor: pointer;
  transition: background 0.2s;
}

.google-btn:hover {
  background: #f8f8f8;
}

/* ─── Switch text ─────────────────────────────────────── */
.switch-text {
  font-family: "Roboto", sans-serif;
  font-size: 12px;
  text-align: center;
  color: #161b22;
  margin: 0;
}

.switch-link {
  background: none;
  border: none;
  padding: 0;
  font-family: "Roboto", sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: #40b9ff;
  cursor: pointer;
  text-decoration: underline;
}

/* ─── Responsive: mid-size (tablets 600px – 1024px) ──── */
@media (max-width: 1024px) {
  .auth-wrapper {
    width: 100%;
    max-width: 600px;
    height: auto;
    max-height: none;
    flex-direction: column;
    border-radius: 24px;
  }

  /* Hide the sliding blue panel on tablets — replaced by tab switcher */
  .left-panel {
    display: none;
  }

  /* Only show the active form panel */
  .form-panel {
    width: 100%;
    padding: 32px 40px;
    display: none;
  }

  .form-panel--signup[data-active="true"],
  .form-panel--login[data-active="true"] {
    display: flex;
  }

  /* Tab-style switcher bar at top */
  .auth-wrapper::before {
    content: "";
    display: block;
  }

  .form-title {
    font-size: 26px;
    line-height: 36px;
  }
}

/* ─── Responsive: small screens (< 600px) ────────────── */
@media (max-width: 599px) {
  .auth-wrapper {
    width: 100%;
    max-width: 100%;
    border-radius: 16px;
  }

  .form-panel {
    padding: 24px 20px;
  }

  .form-title {
    font-size: 22px;
    line-height: 30px;
  }

  .form-subtitle {
    font-size: 13px;
  }

  /* Stack first/last name fields vertically on small screens */
  .field-row {
    flex-direction: column;
    gap: 12px;
  }

  .submit-btn,
  .google-btn {
    height: 48px;
    font-size: 15px;
  }

  .brand-title {
    font-size: 36px;
    line-height: 48px;
  }
}

/* ─── Tab switcher (visible on ≤ 1024px) ─────────────── */
.auth-tabs {
  display: none;
}

@media (max-width: 1024px) {
  .auth-tabs {
    display: flex;
    width: 100%;
    border-bottom: 2px solid #e5e9ef;
  }

  .auth-tab {
    flex: 1;
    padding: 16px;
    background: none;
    border: none;
    font-family: "Roboto", sans-serif;
    font-size: 15px;
    font-weight: 600;
    color: #6b7280;
    cursor: pointer;
    transition:
      color 0.2s,
      border-bottom 0.2s;
    border-bottom: 3px solid transparent;
    margin-bottom: -2px;
  }

  .auth-tab.active {
    color: #40b9ff;
    border-bottom-color: #40b9ff;
  }

  .auth-tab:hover:not(.active) {
    color: #374151;
  }
}
</style>