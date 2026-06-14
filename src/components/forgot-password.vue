<template>
  <!-- ═══════════════════════════════════════════════════════
       Arabic mode → single-column responsive card (no image panel)
       LTR mode    → full two-panel desktop card
  ════════════════════════════════════════════════════════════ -->

  <!-- ── ARABIC: responsive single-column card ────────────── -->
  <div v-if="isRTL" class="fp-wrapper fp-wrapper--rtl">

    <!-- Email step -->
    <div v-if="mode === 'email'" class="form-container">
      <div class="form-header">
        <h2 class="form-title">{{ $t("fp.forgotTitle") }}</h2>
        <p class="form-subtitle">{{ $t("fp.forgotSubtitle") }}</p>
      </div>
      <div class="fields-wrapper">
        <div class="field-group full-width">
          <label class="field-label">{{ $t("fp.emailLabel") }}</label>
          <div class="input-box" :class="{ 'input-box--error': errors.email }">
            <input
              v-model="form.email"
              type="email"
              :placeholder="$t('fp.emailPlaceholder')"
              class="field-input"
            />
          </div>
          <span v-if="errors.email" class="field-error">{{ errors.email }}</span>
        </div>
      </div>
      <p v-if="apiError" class="api-error">{{ apiError }}</p>
      <button class="submit-btn" @click="handleEmail" :disabled="isLoading">
        {{ isLoading ? $t("fp.sending") : $t("fp.next") }}
      </button>
      <div class="hint-block">
        <p class="hint-text">{{ $t("fp.hintSpam") }}</p>
        <span class="hint-divider">——— {{ $t("fp.or") }} ———</span>
        <p class="hint-text">{{ $t("fp.hintDifferent") }}</p>
      </div>
      <button class="back-btn" @click="$emit('back-to-login')">
        <span class="back-icon">→</span> {{ $t("fp.backToLogin") }}
      </button>
    </div>

    <!-- OTP step -->
    <div v-else-if="mode === 'otp'" class="form-container">
      <div class="form-header">
        <h2 class="form-title">{{ $t("fp.verificationTitle") }}</h2>
        <p
          class="form-subtitle"
          v-html="$t('fp.verificationSubtitle', { email: `<strong>${maskedEmail}</strong>` })"
        />
      </div>
      <div class="otp-row">
        <input
          v-for="(_, i) in otpDigits"
          :key="i"
          :ref="(el) => { if (el) otpRefs[i] = el }"
          v-model="otpDigits[i]"
          type="text"
          inputmode="numeric"
          maxlength="1"
          class="otp-box"
          :class="{ 'otp-box--filled': otpDigits[i], 'otp-box--active': otpFocus === i }"
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
        {{ isLoading ? $t("fp.verifying") : $t("fp.verifyContinue") }}
      </button>
      <div class="otp-footer">
        <div class="resend-row">
          <span class="resend-label">{{ $t("fp.didnotReceiveCode") }}</span>
          <button class="resend-btn" :disabled="resendTimer > 0" @click="handleResend">
            {{ $t("fp.resendCode") }}
          </button>
        </div>
        <div v-if="resendTimer > 0" class="timer-row">
          <span class="timer-icon">⏱</span>
          <span class="timer-text">{{ $t("fp.requestCodeIn", { timer: formattedTimer }) }}</span>
        </div>
      </div>
      <button class="back-btn" @click="switchMode('email')">
        <span class="back-icon">→</span> {{ $t("fp.backToLogin") }}
      </button>
    </div>

    <!-- Reset step -->
    <div v-else-if="mode === 'reset'" class="form-container">
      <div class="form-header">
        <h2 class="form-title">{{ $t("fp.setNewPasswordTitle") }}</h2>
        <p class="form-subtitle">{{ $t("fp.setNewPasswordSubtitle") }}</p>
      </div>
      <div class="fields-wrapper">
        <div class="field-group full-width">
          <label class="field-label">{{ $t("fp.passwordLabel") }}</label>
          <div class="input-box input-box--icon">
            <input
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              :placeholder="$t('fp.passwordPlaceholder')"
              class="field-input"
              @input="calcStrength"
            />
            <button class="eye-btn" type="button" @click="showPassword = !showPassword">
              <EyeIcon :open="showPassword" />
            </button>
          </div>
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
          <label class="field-label">{{ $t("fp.confirmPasswordLabel") }}</label>
          <div
            class="input-box input-box--icon"
            :class="{ 'input-box--error': errors.confirmPassword }"
          >
            <input
              v-model="form.confirmPassword"
              :type="showConfirm ? 'text' : 'password'"
              :placeholder="$t('fp.confirmPasswordPlaceholder')"
              class="field-input"
            />
            <button class="eye-btn" type="button" @click="showConfirm = !showConfirm">
              <EyeIcon :open="showConfirm" />
            </button>
          </div>
          <span v-if="errors.confirmPassword" class="field-error">{{ errors.confirmPassword }}</span>
        </div>
        <div class="security-tip">
          <span class="tip-icon">🔒</span>
          <span class="tip-text">{{ $t("fp.securityTip") }}</span>
        </div>
      </div>
      <p v-if="apiError" class="api-error">{{ apiError }}</p>
      <button class="submit-btn" @click="handleReset" :disabled="isLoading">
        {{ isLoading ? $t("fp.saving") : $t("fp.resetPassword") }}
      </button>
      <button class="back-btn" @click="$emit('back-to-login')">
        <span class="back-icon">→</span> {{ $t("fp.backToLogin") }}
      </button>
    </div>

  </div>

  <!-- ── LTR: full desktop two-panel card ──────────────────── -->
  <div v-else class="fp-wrapper">

    <div
      class="form-panel form-panel--left"
      :data-active="String(mode === 'email' || mode === 'otp')"
    >
      <div class="form-container" v-show="mode === 'email'">
        <div class="form-header">
          <h2 class="form-title">{{ $t("fp.forgotTitle") }}</h2>
          <p class="form-subtitle">{{ $t("fp.forgotSubtitle") }}</p>
        </div>
        <div class="fields-wrapper">
          <div class="field-group full-width">
            <label class="field-label">{{ $t("fp.emailLabel") }}</label>
            <div class="input-box" :class="{ 'input-box--error': errors.email }">
              <input
                v-model="form.email"
                type="email"
                :placeholder="$t('fp.emailPlaceholder')"
                class="field-input"
              />
            </div>
            <span v-if="errors.email" class="field-error">{{ errors.email }}</span>
          </div>
        </div>
        <p v-if="apiError" class="api-error">{{ apiError }}</p>
        <button class="submit-btn" @click="handleEmail" :disabled="isLoading">
          {{ isLoading ? $t("fp.sending") : $t("fp.next") }}
        </button>
        <div class="hint-block">
          <p class="hint-text">{{ $t("fp.hintSpam") }}</p>
          <span class="hint-divider">——— {{ $t("fp.or") }} ———</span>
          <p class="hint-text">{{ $t("fp.hintDifferent") }}</p>
        </div>
        <button class="back-btn" @click="$emit('back-to-login')">
          <span class="back-icon">←</span> {{ $t("fp.backToLogin") }}
        </button>
      </div>

      <div class="form-container" v-show="mode === 'otp'">
        <div class="form-header">
          <h2 class="form-title">{{ $t("fp.verificationTitle") }}</h2>
          <p
            class="form-subtitle"
            v-html="$t('fp.verificationSubtitle', { email: `<strong>${maskedEmail}</strong>` })"
          />
        </div>
        <div class="otp-row">
          <input
            v-for="(_, i) in otpDigits"
            :key="i"
            :ref="(el) => { if (el) otpRefs[i] = el }"
            v-model="otpDigits[i]"
            type="text"
            inputmode="numeric"
            maxlength="1"
            class="otp-box"
            :class="{ 'otp-box--filled': otpDigits[i], 'otp-box--active': otpFocus === i }"
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
          {{ isLoading ? $t("fp.verifying") : $t("fp.verifyContinue") }}
        </button>
        <div class="otp-footer">
          <div class="resend-row">
            <span class="resend-label">{{ $t("fp.didnotReceiveCode") }}</span>
            <button class="resend-btn" :disabled="resendTimer > 0" @click="handleResend">
              {{ $t("fp.resendCode") }}
            </button>
          </div>
          <div v-if="resendTimer > 0" class="timer-row">
            <span class="timer-icon">⏱</span>
            <span class="timer-text">{{ $t("fp.requestCodeIn", { timer: formattedTimer }) }}</span>
          </div>
        </div>
        <button class="back-btn" @click="switchMode('email')">
          <span class="back-icon">←</span> {{ $t("fp.backToLogin") }}
        </button>
      </div>
    </div>

    <div
      class="form-panel form-panel--right"
      :data-active="String(mode === 'reset')"
    >
      <div class="form-container" v-show="mode === 'reset'">
        <div class="form-header">
          <h2 class="form-title">{{ $t("fp.setNewPasswordTitle") }}</h2>
          <p class="form-subtitle">{{ $t("fp.setNewPasswordSubtitle") }}</p>
        </div>
        <div class="fields-wrapper">
          <div class="field-group full-width">
            <label class="field-label">{{ $t("fp.passwordLabel") }}</label>
            <div class="input-box input-box--icon">
              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                :placeholder="$t('fp.passwordPlaceholder')"
                class="field-input"
                @input="calcStrength"
              />
              <button class="eye-btn" type="button" @click="showPassword = !showPassword">
                <EyeIcon :open="showPassword" />
              </button>
            </div>
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
            <label class="field-label">{{ $t("fp.confirmPasswordLabel") }}</label>
            <div
              class="input-box input-box--icon"
              :class="{ 'input-box--error': errors.confirmPassword }"
            >
              <input
                v-model="form.confirmPassword"
                :type="showConfirm ? 'text' : 'password'"
                :placeholder="$t('fp.confirmPasswordPlaceholder')"
                class="field-input"
              />
              <button class="eye-btn" type="button" @click="showConfirm = !showConfirm">
                <EyeIcon :open="showConfirm" />
              </button>
            </div>
            <span v-if="errors.confirmPassword" class="field-error">{{ errors.confirmPassword }}</span>
          </div>
          <div class="security-tip">
            <span class="tip-icon">🔒</span>
            <span class="tip-text">{{ $t("fp.securityTip") }}</span>
          </div>
        </div>
        <p v-if="apiError" class="api-error">{{ apiError }}</p>
        <button class="submit-btn" @click="handleReset" :disabled="isLoading">
          {{ isLoading ? $t("fp.saving") : $t("fp.resetPassword") }}
        </button>
        <button class="back-btn" @click="$emit('back-to-login')">
          <span class="back-icon">←</span> {{ $t("fp.backToLogin") }}
        </button>
      </div>
    </div>

    <div class="image-panel" :class="slidingPanelClass">
      <div class="image-panel__tint" />
      <div class="image-panel__content" :class="{ 'content-hidden': !contentVisible }">
        <h1 class="panel-title">{{ panelTitle }}</h1>
        <p class="panel-subtitle">{{ panelSubtitle }}</p>
      </div>
    </div>

  </div>
</template>

<script>
import { ref, computed, defineComponent, h, onUnmounted } from "vue";
import { useI18n } from "vue-i18n";
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
  name: "ForgotPassword",
  components: { EyeIcon },
  emits: ["back-to-login", "reset-success"],
  setup(_, { emit }) {
    const { t, locale } = useI18n();

    const isRTL = computed(() => locale.value === "ar");

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
      const labels = [
        "",
        t("fp.strength.weak"),
        t("fp.strength.fair"),
        t("fp.strength.good"),
        t("fp.strength.strong"),
      ];
      return labels[passwordStrength.value] ?? "";
    });

    function calcStrength() {
      const p = form.value.password;
      if (!p) { passwordStrength.value = 0; return; }
      let score = 0;
      if (p.length >= 8) score++;
      if (/[A-Z]/.test(p)) score++;
      if (/[0-9]/.test(p)) score++;
      if (/[^A-Za-z0-9]/.test(p)) score++;
      passwordStrength.value = score;
    }

    // Panel text (LTR only)
    const panelTitle = computed(() => {
      if (mode.value === "otp") return t("fp.panel.otpTitle");
      if (mode.value === "reset") return t("fp.panel.resetTitle");
      return t("fp.panel.emailTitle");
    });
    const panelSubtitle = computed(() => {
      if (mode.value === "otp") return t("fp.panel.otpSubtitle");
      if (mode.value === "reset") return t("fp.panel.resetSubtitle");
      return t("fp.panel.emailSubtitle");
    });

    const maskedEmail = computed(() => {
      const e = form.value.email;
      const [user, domain] = e.split("@");
      if (!user || !domain) return e;
      return user.slice(0, 2) + "****@" + domain;
    });

    const slidingPanelClass = computed(() =>
      mode.value === "reset" ? "image-panel--slide-left" : ""
    );

    // ── Mode switch with fade ──────────────────────────────
    function switchMode(newMode) {
      contentVisible.value = false;
      setTimeout(() => { mode.value = newMode; }, 220);
      setTimeout(() => { contentVisible.value = true; }, 500);
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

    function startResendTimer(seconds = 120) {
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
        errors.value.email = t("fp.emailRequired");
        return;
      }
      isLoading.value = true;
      try {
        await mailingOTP({ email: form.value.email });
        startResendTimer();
        switchMode("otp");
      } catch (err) {
        apiError.value = err.response?.data?.message ?? t("fp.errorGeneric");
      } finally {
        isLoading.value = false;
      }
    }

    async function handleOtp() {
      apiError.value = null;
      isLoading.value = true;
      try {
        await verifyOTP({ email: form.value.email, otp: otpDigits.value.join("") });
        switchMode("reset");
      } catch (err) {
        apiError.value = err.response?.data?.message ?? t("fp.errorInvalidCode");
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
        apiError.value = err.response?.data?.message ?? t("fp.errorGeneric");
      }
    }

    async function handleReset() {
      errors.value = {};
      apiError.value = null;
      if (form.value.password !== form.value.confirmPassword) {
        errors.value.confirmPassword = t("fp.passwordMismatch");
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
        apiError.value = err.response?.data?.message ?? t("fp.errorGeneric");
      } finally {
        isLoading.value = false;
      }
    }

    onUnmounted(() => clearInterval(timerInterval));

    return {
      isRTL,
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
      resendTimer,
      formattedTimer,
      passwordStrength,
      strengthLabel,
      calcStrength,
      panelTitle,
      panelSubtitle,
      maskedEmail,
      slidingPanelClass,
      switchMode,
      onOtpInput,
      onOtpKeydown,
      handleEmail,
      handleOtp,
      handleResend,
      handleReset,
    };
  },
};
</script>

<style scoped>
/* ═══════════════════════════════════════════════════════════
   ARABIC / RTL LAYOUT  (fp-wrapper--rtl)
   A plain single-column card — no image panel, no split.
   Always renders at a comfortable width; uses native RTL direction.
════════════════════════════════════════════════════════════ */
.fp-wrapper--rtl {
  direction: rtl;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 520px;
  height: auto;
  background: #ffffff;
  border-radius: 24px;
  padding: 48px 48px 40px;
  font-family: "Roboto", sans-serif;
}

/* Tighter padding on small screens */
@media (max-width: 599px) {
  .fp-wrapper--rtl {
    padding: 32px 24px 28px;
    border-radius: 16px;
  }
}

/* ═══════════════════════════════════════════════════════════
   LTR / DESKTOP LAYOUT  (fp-wrapper without modifier)
════════════════════════════════════════════════════════════ */
.fp-wrapper {
  position: relative;
  display: flex;
  flex-direction: row;
  width: 1118px;
  max-width: 100%;
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

/* ─── Image sliding panel ─────────────────────────────── */
.image-panel {
  position: absolute;
  top: 0;
  left: calc(100% - 530px);
  width: 530px;
  height: 100%;
  border-radius: 40px;
  z-index: 10;
  overflow: hidden;
  background-image: url("../../public/ChatGPT Image Jun 7, 2026, 10_22_25 PM.jpg");
  background-size: cover;
  background-position: center;
  transition: left 0.55s cubic-bezier(0.77, 0, 0.175, 1);
  will-change: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 64px;
}

.image-panel--slide-left {
  left: 0;
}

.image-panel__tint {
  position: absolute;
  inset: 0;
  background: rgba(0, 100, 146, 0.45);
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
  max-width: 420px;
  transition: opacity 0.22s ease, transform 0.22s ease;
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
  line-height: 26px;
  text-align: center;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
}

/* ─── Responsive: mid-size (600px – 1024px) — LTR only ── */
@media (max-width: 1024px) {
  .fp-wrapper {
    width: 100%;
    max-width: 600px;
    height: auto;
    max-height: none;
    flex-direction: column;
    border-radius: 24px;
  }

  .image-panel {
    display: none;
  }

  .form-panel {
    width: 100%;
    height: auto;
    padding: 36px 40px;
    display: none;
  }

  .form-panel[data-active="true"] {
    display: flex;
  }

  .form-title {
    font-size: 28px;
    line-height: 38px;
  }
  .form-subtitle {
    font-size: 14px;
    line-height: 22px;
  }
  .hint-text {
    font-size: 14px;
  }
  .resend-label {
    font-size: 14px;
  }
}

/* ─── Responsive: small screens (< 600px) — LTR only ──── */
@media (max-width: 599px) {
  .fp-wrapper {
    max-width: 100%;
    border-radius: 16px;
  }

  .form-panel {
    padding: 28px 20px;
  }
}

/* ═══════════════════════════════════════════════════════════
   SHARED STYLES  (used by both LTR and RTL trees)
════════════════════════════════════════════════════════════ */

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

@media (max-width: 599px) {
  .form-title {
    font-size: 24px;
    line-height: 32px;
  }
  .form-subtitle {
    font-size: 13px;
    line-height: 20px;
  }
}

.form-subtitle {
  font-family: "Roboto", sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
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
  background: #ffffff;
  transition: border-color 0.2s;
  direction: ltr;
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
  min-width: 0;
  border: none;
  outline: none;
  font-family: "Roboto", sans-serif;
  font-size: 12px;
  color: #121826;
  background: transparent;
  direction: inherit;
  text-align: start;
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

/* ─── Errors ──────────────────────────────────────────── */
.api-error {
  width: 100%;
  font-size: 12px;
  color: #ef4444;
  text-align: center;
  margin: 0;
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
  transition: background 0.2s, opacity 0.2s;
}

.submit-btn:hover:not(:disabled) {
  background: #29aaff;
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (max-width: 599px) {
  .submit-btn {
    height: 48px;
    font-size: 15px;
  }
}

/* ─── Hint block ──────────────────────────────────────── */
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

@media (max-width: 599px) {
  .hint-text {
    font-size: 13px;
  }
}

.hint-divider {
  font-family: "Inter", sans-serif;
  font-weight: 700;
  font-size: 12px;
  line-height: 26px;
  color: #40b9ff;
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

/* ─── OTP ─────────────────────────────────────────────── */
.otp-row {
  display: flex;
  flex-direction: row;
  gap: 8px;
  width: 100%;
  justify-content: center;
  direction: ltr;
}

@media (max-width: 599px) {
  .otp-row {
    gap: 6px;
  }
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
  transition: border-color 0.2s, background 0.2s;
  cursor: text;
}

@media (max-width: 599px) {
  .otp-box {
    width: 44px;
    height: 52px;
    font-size: 18px;
  }
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

@media (max-width: 599px) {
  .resend-row {
    flex-direction: column;
    gap: 6px;
    align-items: center;
  }
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
</style>