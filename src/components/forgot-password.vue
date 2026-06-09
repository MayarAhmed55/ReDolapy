<template>
  <div class="fp-wrapper">
    <!-- ── Email form ───────────────────────────────────── -->
    <div class="form-panel form-panel--left">
      <div class="form-container" v-show="mode === 'email'">
        <div class="form-header">
          <h2 class="form-title">Forgot Password?</h2>
          <p class="form-subtitle">
            No worries! It happens to the best of us. Enter the email address
            associated with your account and we'll send you a link to reset your
            password.
          </p>
        </div>
        <div class="fields-wrapper">
          <div class="field-group full-width">
            <label class="field-label">Email</label>
            <div
              class="input-box"
              :class="{ 'input-box--error': errors.email }"
            >
              <input
                v-model="form.email"
                type="email"
                placeholder="enter your email"
                class="field-input"
              />
            </div>
            <span v-if="errors.email" class="field-error">{{
              errors.email
            }}</span>
          </div>
        </div>
        <p v-if="apiError" class="api-error">{{ apiError }}</p>
        <button class="submit-btn" @click="handleEmail" :disabled="isLoading">
          {{ isLoading ? "Sending..." : "Next" }}
        </button>
        <div class="hint-block">
          <p class="hint-text">
            Didn't receive the email? Check your spam folder
          </p>
          <span class="hint-divider">——— OR ———</span>
          <p class="hint-text">Try a different email address</p>
        </div>
        <button class="back-btn" @click="$emit('back-to-login')">
          <span class="back-icon">←</span> Back to Login
        </button>
      </div>

      <!-- ── OTP form ─────────────────────────────────── -->
      <div class="form-container" v-show="mode === 'otp'">
        <div class="form-header">
          <h2 class="form-title">Enter Verification Code</h2>
          <p class="form-subtitle">
            We sent a 6-digit code to <strong>{{ maskedEmail }}</strong
            >. Enter it below to proceed.
          </p>
        </div>
        <div class="otp-row">
          <input
            v-for="(_, i) in otpDigits"
            :key="i"
            :ref="
              (el) => {
                if (el) otpRefs[i] = el;
              }
            "
            v-model="otpDigits[i]"
            type="text"
            inputmode="numeric"
            maxlength="1"
            class="otp-box"
            :class="{
              'otp-box--filled': otpDigits[i],
              'otp-box--active': otpFocus === i,
            }"
            @focus="otpFocus = i"
            @blur="otpFocus = -1"
            @input="onOtpInput(i, $event)"
            @keydown="onOtpKeydown(i, $event)"
          />
        </div>
        <p v-if="apiError" class="api-error">{{ apiError }}</p>
        <button
          class="submit-btn"
          @click="handleOtp"
          :disabled="isLoading || otpDigits.join('').length < 6"
        >
          {{ isLoading ? "Verifying..." : "Verify & Continue" }}
        </button>
        <div class="otp-footer">
          <div class="resend-row">
            <span class="resend-label">Didn't receive the code?</span>
            <button
              class="resend-btn"
              :disabled="resendTimer > 0"
              @click="handleResend"
            >
              Resend Code
            </button>
          </div>
          <div v-if="resendTimer > 0" class="timer-row">
            <span class="timer-icon">⏱</span>
            <span class="timer-text"
              >Request a new code in {{ formattedTimer }}</span
            >
          </div>
        </div>
        <button class="back-btn" @click="switchMode('email')">
          <span class="back-icon">←</span> Back to Login
        </button>
      </div>
    </div>

    <!-- ── Reset password form ──────────────────────────── -->
    <div class="form-panel form-panel--right">
      <div class="form-container" v-show="mode === 'reset'">
        <div class="form-header">
          <h2 class="form-title">Set New Password</h2>
          <p class="form-subtitle">
            Choose a unique, strong password that you haven't used before for
            this account.
          </p>
        </div>
        <div class="fields-wrapper">
          <div class="field-group full-width">
            <label class="field-label">Password</label>
            <div class="input-box input-box--icon">
              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="create strong password"
                class="field-input"
                @input="calcStrength"
              />
              <button
                class="eye-btn"
                type="button"
                @click="showPassword = !showPassword"
              >
                <EyeIcon :open="showPassword" />
              </button>
            </div>
            <!-- Strength bar -->
            <div class="strength-bar">
              <div
                v-for="n in 4"
                :key="n"
                class="strength-segment"
                :class="{ 'strength-segment--active': n <= passwordStrength }"
              />
            </div>
            <span class="strength-label">{{ strengthLabel }}</span>
          </div>
          <div class="field-group full-width">
            <label class="field-label">Confirm password</label>
            <div
              class="input-box input-box--icon"
              :class="{ 'input-box--error': errors.confirmPassword }"
            >
              <input
                v-model="form.confirmPassword"
                :type="showConfirm ? 'text' : 'password'"
                placeholder="confirm the password that you created"
                class="field-input"
              />
              <button
                class="eye-btn"
                type="button"
                @click="showConfirm = !showConfirm"
              >
                <EyeIcon :open="showConfirm" />
              </button>
            </div>
            <span v-if="errors.confirmPassword" class="field-error">{{
              errors.confirmPassword
            }}</span>
          </div>
          <!-- Security tip -->
          <div class="security-tip">
            <span class="tip-icon">🔒</span>
            <span class="tip-text"
              >Use 8+ characters with letters, numbers & symbols for a stronger
              password.</span
            >
          </div>
        </div>
        <p v-if="apiError" class="api-error">{{ apiError }}</p>
        <button class="submit-btn" @click="handleReset" :disabled="isLoading">
          {{ isLoading ? "Saving..." : "Reset Password" }}
        </button>
        <button class="back-btn" @click="$emit('back-to-login')">
          <span class="back-icon">←</span> Back to Login
        </button>
      </div>
    </div>

    <!-- ── Sliding image panel ───────────────────────────── -->
    <div
      class="image-panel"
      :class="{ 'image-panel--right': mode === 'reset' }"
    >
      <div class="image-panel__tint" />
      <div
        class="image-panel__content"
        :class="{ 'content-hidden': !contentVisible }"
      >
        <h1 class="panel-title">{{ panelTitle }}</h1>
        <p class="panel-subtitle">{{ panelSubtitle }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, defineComponent, h, onUnmounted } from "vue";
import { resetPassword, verifyOTP, mailingOTP } from "../services/services";

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

export default {
  name: "forgot-password",
  components: { EyeIcon },
  emits: ["back-to-login", "reset-success"],
  setup(_, { emit }) {
    // ── State ──────────────────────────────────────────────
    const mode = ref("email"); // 'email' | 'otp' | 'reset'
    const contentVisible = ref(true);
    const isLoading = ref(false);
    const apiError = ref(null);
    const errors = ref({});

    const form = ref({ email: "", password: "", confirmPassword: "" });
    const showPassword = ref(false);
    const showConfirm = ref(false);

    // OTP
    const otpDigits = ref(["", "", "", "", "", ""]);
    const otpRefs = ref([]);
    const otpFocus = ref(-1);

    // Resend timer
    const resendTimer = ref(0);
    let timerInterval = null;

    const formattedTimer = computed(() => {
      const m = String(Math.floor(resendTimer.value / 60)).padStart(2, "0");
      const s = String(resendTimer.value % 60).padStart(2, "0");
      return `${m}:${s}`;
    });

    // Password strength
    const passwordStrength = ref(0);
    const strengthLabel = computed(() => {
      return (
        ["", "Weak", "Fair", "Medium", "Strong"][passwordStrength.value] ?? ""
      );
    });

    function calcStrength() {
      const p = form.value.password;
      let score = 0;
      if (p.length >= 8) score++;
      if (/[A-Z]/.test(p)) score++;
      if (/[0-9]/.test(p)) score++;
      if (/[^A-Za-z0-9]/.test(p)) score++;
      passwordStrength.value = score;
    }

    // Panel text per mode
    const panelTitle = computed(() => {
      if (mode.value === "otp") return "Verify Your Identity";
      if (mode.value === "reset") return "Secure Your Atelier";
      return "Reset Your Style Access";
    });

    const panelSubtitle = computed(() => {
      if (mode.value === "otp")
        return "To protect your wardrobe and style preferences, please confirm it's really you.";
      if (mode.value === "reset")
        return "Protect your digital fashion sanctuary. A stronger password ensures your curated wardrobe remains exclusively yours.";
      return "Let's get you back to your digital atelier and personalized wardrobe.";
    });

    const maskedEmail = computed(() => {
      const e = form.value.email;
      const [user, domain] = e.split("@");
      if (!user || !domain) return e;
      return user.slice(0, 2) + "****@" + domain;
    });

    // ── Mode switch with fade ──────────────────────────────
    function switchMode(newMode) {
      contentVisible.value = false;
      setTimeout(() => {
        mode.value = newMode;
      }, 220);
      setTimeout(() => {
        contentVisible.value = true;
      }, 500);
    }

    // ── OTP helpers ────────────────────────────────────────
    function onOtpInput(i, e) {
      const val = e.target.value.replace(/\D/g, "");
      otpDigits.value[i] = val.slice(-1);
      if (val && i < 5) otpRefs.value[i + 1]?.focus();
    }

    function onOtpKeydown(i, e) {
      if (e.key === "Backspace" && !otpDigits.value[i] && i > 0) {
        otpRefs.value[i - 1]?.focus();
      }
    }

    function startResendTimer(seconds = 58) {
      resendTimer.value = seconds;
      clearInterval(timerInterval);
      timerInterval = setInterval(() => {
        resendTimer.value--;
        if (resendTimer.value <= 0) clearInterval(timerInterval);
      }, 1000);
    }

    // ── Handlers ───────────────────────────────────────────
    async function handleEmail() {
      errors.value = {};
      apiError.value = null;
      if (!form.value.email) {
        errors.value.email = "Email is required";
        return;
      }
      isLoading.value = true;
      try {
        await mailingOTP({ email: form.value.email });
        startResendTimer();
        switchMode("otp");
      } catch (err) {
        apiError.value = err.response?.data?.message ?? "Something went wrong";
        console.log(err);
      } finally {
        isLoading.value = false;
      }
    }

    async function handleOtp() {
      apiError.value = null;
      isLoading.value = true;
      try {
        await verifyOTP({
          email: form.value.email,
          otp: otpDigits.value.join(""),
        });
        switchMode("reset");
      } catch (err) {
        apiError.value = err.response?.data?.message ?? "Invalid code";
      } finally {
        isLoading.value = false;
      }
    }

    async function handleResend() {
      apiError.value = null;
      try {
        await mailingOTP({ email: form.value.email });
        otpDigits.value = ["", "", "", "", "", ""];
        startResendTimer();
      } catch (err) {
        apiError.value = err.response?.data?.message ?? "Could not resend code";
      }
    }

    async function handleReset() {
      errors.value = {};
      apiError.value = null;
      if (form.value.password !== form.value.confirmPassword) {
        errors.value.confirmPassword = "Passwords do not match";
        return;
      }
      isLoading.value = true;
      try {
        await resetPassword({
          email: form.value.email,
          otp: otpDigits.value.join(""),
          password: form.value.password,
          confirmPassword: form.value.confirmPassword,
        });
        emit("reset-success");
      } catch (err) {
        apiError.value = err.response?.data?.message ?? "Something went wrong";
      } finally {
        isLoading.value = false;
      }
    }

    onUnmounted(() => clearInterval(timerInterval));

    return {
      mode,
      contentVisible,
      isLoading,
      apiError,
      errors,
      form,
      showPassword,
      showConfirm,
      otpDigits,
      otpRefs,
      otpFocus,
      onOtpInput,
      onOtpKeydown,
      resendTimer,
      formattedTimer,
      handleResend,
      passwordStrength,
      strengthLabel,
      calcStrength,
      panelTitle,
      panelSubtitle,
      maskedEmail,
      switchMode,
      handleEmail,
      handleOtp,
      handleReset,
    };
  },
};
</script>

<style scoped>
/* ─── Wrapper ─────────────────────────────────────────── */
.fp-wrapper {
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

/* ─── Form panels ─────────────────────────────────────── */
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
.form-panel--left {
  /* Image panel starts at left:0 in email/otp modes, so form content goes on the right half */
  order: 2;
  margin-left: auto;
}
.form-panel--right {
  /* Image panel slides right in reset mode, so form content goes on the left half */
  order: 1;
}

/* ─── Image sliding panel ─────────────────────────────── */
.image-panel {
  position: absolute;
  top: 0;
  left: 0;
  width: 530px;
  height: 100%;
  border-radius: 40px;
  z-index: 10;
  overflow: hidden;
  background:
    url("/src/assets/auth-bg.png") center/cover no-repeat,
    #006492;
  transition: left 0.55s cubic-bezier(0.77, 0, 0.175, 1);
  will-change: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 64px;
}

.image-panel--right {
  left: calc(100% - 530px);
}

.image-panel__tint {
  position: absolute;
  inset: 0;
  background: rgba(0, 100, 146, 0.55);
  background-image:
    linear-gradient(rgba(10, 100, 146, 0.2)),
    url("../../public/ChatGPT\ Image\ Jun\ 7\,\ 2026\,\ 10_22_25\ PM.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 1;
  border-radius: 40px;
}

.image-panel__content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  width: 100%;
  max-width: 459px;
  transition:
    opacity 0.22s ease,
    transform 0.22s ease;
}

.content-hidden {
  opacity: 0 !important;
  transform: translateY(10px) !important;
}

.panel-title {
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  font-size: 48px;
  line-height: 63px;
  text-align: center;
  color: #ffffff;
  margin: 0;
}

.panel-subtitle {
  font-family: "Roboto", sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 23px;
  text-align: center;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
}

/* ─── Form container ──────────────────────────────────── */
.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  max-width: 481px;
}

/* ─── Header ──────────────────────────────────────────── */
.form-header {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}

.form-title {
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  font-size: 36px;
  line-height: 44px;
  color: #121826;
  margin: 0;
}

.form-subtitle {
  font-family: "Roboto", sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color: #3e4850;
  margin: 0;
  max-width: 418px;
}

/* ─── Fields ──────────────────────────────────────────── */
.fields-wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field-group.full-width {
  width: 100%;
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
.input-box--error {
  border-color: #ef4444 !important;
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

.field-error {
  font-size: 12px;
  color: #ef4444;
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

/* ─── Strength bar ────────────────────────────────────── */
.strength-bar {
  display: flex;
  gap: 4px;
  width: 100%;
  margin-top: 4px;
}

.strength-segment {
  flex: 1;
  height: 4px;
  border-radius: 9999px;
  background: rgba(190, 200, 210, 0.3);
  transition: background 0.3s;
}

.strength-segment--active {
  background: #40b9ff;
}

.strength-label {
  font-family: "Roboto", sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: #6e7881;
}

/* ─── Security tip ────────────────────────────────────── */
.security-tip {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  width: 100%;
  background: #f0f8e6;
  border: 1px solid rgba(172, 244, 69, 0.2);
  border-radius: 4px;
}

.tip-icon {
  font-size: 16px;
}

.tip-text {
  font-family: "Plus Jakarta Sans", sans-serif;
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  color: #8ed321;
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
  transition:
    background 0.2s,
    opacity 0.2s;
}

.submit-btn:hover:not(:disabled) {
  background: #29aaff;
}
.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* ─── Hint block (email mode) ─────────────────────────── */
.hint-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 100%;
}

.hint-text {
  font-family: "Roboto", sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: #a0a6b2;
  margin: 0;
}

.hint-divider {
  font-family: "Inter", sans-serif;
  font-weight: 700;
  font-size: 12px;
  line-height: 26px;
  color: #40b9ff;
}

/* ─── OTP ─────────────────────────────────────────────── */
.otp-row {
  display: flex;
  flex-direction: row;
  gap: 8px;
  width: 100%;
  justify-content: center;
}

.otp-box {
  width: 74px;
  height: 74px;
  background: #f0f8e6;
  border: 2px solid transparent;
  border-radius: 8px;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 20px;
  line-height: 23px;
  text-align: center;
  color: #000000;
  outline: none;
  transition:
    border-color 0.2s,
    background 0.2s;
  cursor: text;
}

.otp-box--active,
.otp-box:focus {
  border-color: #8ed321;
  background: #ffffff;
}

.otp-box--filled:not(:focus) {
  background: #f0f8e6;
  border-color: transparent;
}

/* ─── OTP footer ──────────────────────────────────────── */
.otp-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding-bottom: 8px;
}

.resend-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.resend-label {
  font-family: "Roboto", sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: #1e1e24;
}

.resend-btn {
  background: none;
  border: none;
  border-bottom: 2px solid #1e1e24;
  padding: 0 0 2px;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: #161b22;
  cursor: pointer;
  transition: opacity 0.2s;
}

.resend-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.timer-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.timer-icon {
  font-size: 13px;
  color: #ff8a3d;
}

.timer-text {
  font-family: "Plus Jakarta Sans", sans-serif;
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  color: #ff8a3d;
}

/* ─── Back to login ───────────────────────────────────── */
.back-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  border-bottom: 1px solid #8ed321;
  padding: 4px 0;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: #8ed321;
  cursor: pointer;
  transition: opacity 0.2s;
}

.back-btn:hover {
  opacity: 0.8;
}
.back-icon {
  font-size: 13px;
}

/* ─── Errors ──────────────────────────────────────────── */
.api-error {
  width: 100%;
  font-size: 12px;
  color: #ef4444;
  text-align: center;
  margin: 0;
}
</style>
