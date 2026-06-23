<template>
  <div class="min-h-screen bg-[#FAF8FF] overflow-y-auto">

    <!-- Content Area -->
    <div class="px-8 pt-8 pb-12 max-w-[856px] mx-auto">

      <!-- Page Heading -->
      <div class="mb-8">
        <h1 class="font-['Geist',system-ui,sans-serif] font-semibold text-[32px] leading-10 tracking-[-0.64px] text-[#191B23]">
          Create New Notification
        </h1>
        <p class="font-['Geist',system-ui,sans-serif] font-normal text-sm leading-5 text-[#434654] mt-2">
          Configure and target your push notification to reach the right audience at the right time.
        </p>
      </div>

      <div class="flex flex-col gap-8">

        <!-- Notification Details Card -->
        <div class="bg-[#FAF8FF] border border-[#C3C5D7] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-xl p-6 flex flex-col gap-6">
          <h2 class="font-['Geist',system-ui,sans-serif] font-medium text-xl leading-7 tracking-[-0.2px] text-[#191B23]">
            Notification Content
          </h2>

          <div class="flex flex-col gap-6">
            <!-- Title -->
            <div class="flex flex-col gap-2">
              <label class="font-['Geist',system-ui,sans-serif] font-medium text-xs leading-4 tracking-[0.24px] text-[#191B23]">
                Title
              </label>
              <input
                v-model="form.title"
                type="text"
                placeholder="e.g. New Summer Collection is here!"
                class="w-full bg-[#FAF8FF] border border-[#737686] rounded-lg px-4 py-[13px] font-['Geist',system-ui,sans-serif] text-sm leading-[18px] text-[#191B23] placeholder-[#6B7280] outline-none focus:border-[#1550D3] transition-colors"
              />
            </div>

            <!-- Message / Body -->
            <div class="flex flex-col gap-2">
              <label class="font-['Geist',system-ui,sans-serif] font-medium text-xs leading-4 tracking-[0.24px] text-[#191B23]">
                Message
              </label>
              <textarea
                v-model="form.message"
                rows="3"
                placeholder="Describe the notification content..."
                class="w-full bg-[#FAF8FF] border border-[#737686] rounded-lg px-4 py-3 font-['Geist',system-ui,sans-serif] text-sm leading-5 text-[#191B23] placeholder-[#6B7280] outline-none focus:border-[#1550D3] transition-colors resize-none"
              />
            </div>

            <!-- Deep Link -->
            <div class="flex flex-col gap-2">
              <label class="font-['Geist',system-ui,sans-serif] font-medium text-xs leading-4 tracking-[0.24px] text-[#191B23]">
                Deep Link (URL)
              </label>
              <div class="flex">
                <span class="flex items-center px-4 bg-[#EDEDF8] border border-r-0 border-[#737686] rounded-l-lg font-['Geist',system-ui,sans-serif] text-sm leading-5 text-[#737686] whitespace-nowrap">
                  https://
                </span>
                <input
                  v-model="form.deepLink"
                  type="text"
                  placeholder="app/collection/summer-2024"
                  class="flex-1 bg-[#FAF8FF] border border-[#737686] rounded-r-lg px-4 py-[13px] font-['Geist',system-ui,sans-serif] text-sm leading-[18px] text-[#191B23] placeholder-[#6B7280] outline-none focus:border-[#1550D3] transition-colors"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Targeting & Schedule Card -->
        <div class="bg-[#FAF8FF] border border-[#C3C5D7] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-xl p-6 flex flex-col gap-6">
          <h2 class="font-['Geist',system-ui,sans-serif] font-medium text-xl leading-7 tracking-[-0.2px] text-[#191B23]">
            Targeting &amp; Schedule
          </h2>

          <!-- Audience Selection -->
          <div class="flex flex-col gap-2">
            <label class="font-['Geist',system-ui,sans-serif] font-medium text-xs leading-4 tracking-[0.24px] text-[#191B23]">
              Audience Selection
            </label>
            <div class="relative">
              <select
                v-model="form.audience"
                class="w-full appearance-none bg-[#FAF8FF] border border-[#737686] rounded-lg px-4 py-[13px] font-['Geist',system-ui,sans-serif] text-sm leading-5 text-[#191B23] outline-none focus:border-[#1550D3] transition-colors cursor-pointer"
              >
                <option value="all">All Users</option>
                <option value="email">Specific Email</option>
              </select>
              <!-- Chevron -->
              <svg class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" width="12" height="8" viewBox="0 0 12 8" fill="none">
                <path d="M1 1L6 6L11 1" stroke="#434654" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </div>
          </div>

          <!-- Email field — shown only when audience = email -->
          <div v-if="form.audience === 'email'" class="flex flex-col gap-2">
            <label class="font-['Geist',system-ui,sans-serif] font-medium text-xs leading-4 tracking-[0.24px] text-[#191B23]">
              Recipient Email
            </label>
            <div class="flex">
              <span class="flex items-center px-4 bg-[#EDEDF8] border border-r-0 border-[#737686] rounded-l-lg font-['Geist',system-ui,sans-serif] text-sm text-[#737686]">
                To
              </span>
              <input
                v-model="form.email"
                type="email"
                placeholder="user@example.com"
                class="flex-1 bg-[#FAF8FF] border border-[#737686] rounded-r-lg px-4 py-[13px] font-['Geist',system-ui,sans-serif] text-sm leading-[18px] text-[#191B23] placeholder-[#6B7280] outline-none focus:border-[#1550D3] transition-colors"
              />
            </div>
          </div>

          <!-- Website toggle — broadcast only -->
          <div v-if="form.audience === 'all'" class="flex items-center justify-between py-3 px-4 bg-white border border-[#C3C5D7] rounded-lg">
            <div>
              <p class="font-['Geist',system-ui,sans-serif] font-medium text-xs tracking-[0.24px] text-[#191B23]">Include Website Link</p>
              <p class="font-['Geist',system-ui,sans-serif] text-xs text-[#6B7280] mt-0.5">Attach a website flag to the notification payload.</p>
            </div>
            <button
              type="button"
              @click="form.website = !form.website"
              :class="['relative inline-flex items-center flex-shrink-0 w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none', form.website ? 'bg-[#1550D3]' : 'bg-[#C3C5D7]']"
            >
              <span :class="['inline-block w-4 h-4 bg-white rounded-full shadow transition-transform duration-200', form.website ? 'translate-x-6' : 'translate-x-1']" />
            </button>
          </div>
        </div>

        <!-- Error -->
        <p v-if="error" class="font-['Geist',system-ui,sans-serif] text-xs text-[#FB2C36] -mt-4">{{ error }}</p>

        <!-- Action Bar -->
        <div class="flex justify-end items-center gap-4 pb-0">
          <button
            type="button"
            @click="resetForm"
            class="px-6 py-3 rounded-xl font-['Geist',system-ui,sans-serif] font-medium text-xs leading-4 tracking-[0.24px] text-[#191B23] hover:bg-[#EDEDF8] transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            @click="handleSend"
            :disabled="sending"
            class="px-8 py-3 bg-[#1550D3] disabled:opacity-60 disabled:cursor-not-allowed rounded-xl font-['Geist',system-ui,sans-serif] font-medium text-xs leading-4 tracking-[0.24px] text-white hover:bg-[#1244B8] transition-colors"
          >
            {{ sending ? "Sending…" : "Send Now" }}
          </button>
        </div>

      </div>
    </div>

    <!-- Toast -->
    <transition
      enter-active-class="transition-all duration-300"
      enter-from-class="opacity-0 translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-4"
    >
      <div
        v-if="toast"
        class="fixed bottom-8 right-8 flex items-center gap-3 bg-[#191B23] text-white px-5 py-3 rounded-xl shadow-xl font-['Geist',system-ui,sans-serif] text-xs font-medium z-50"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8DE321" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        {{ toast }}
      </div>
    </transition>

  </div>
</template>

<script>
import { sendNotificationByEmail, notificationsForAllUsers } from "../../services/services";

export default {
  name: "NotificationsPage",

  data() {
    return {
      sending: false,
      error: null,
      toast: null,
      toastTimer: null,
      form: {
        title: "",
        message: "",
        deepLink: "",
        audience: "all",
        email: "",
        website: true,
      },
    };
  },

  methods: {
    validate() {
      this.error = null;
      if (!this.form.title.trim()) { this.error = "Title is required."; return false; }
      if (!this.form.message.trim()) { this.error = "Message is required."; return false; }
      if (this.form.audience === "email" && !this.form.email.trim()) {
        this.error = "Recipient email is required."; return false;
      }
      return true;
    },

    async handleSend() {
      if (!this.validate()) return;
      this.sending = true;
      try {
        if (this.form.audience === "all") {
          await notificationsForAllUsers({
            title: this.form.title.trim(),
            message: this.form.message.trim(),
            data: { website: this.form.website },
          });
          this.showToast("Broadcast sent to all users.");
        } else {
          await sendNotificationByEmail({
            email: this.form.email.trim(),
            title: this.form.title.trim(),
            body: this.form.message.trim(),
          });
          this.showToast(`Notification sent to ${this.form.email}.`);
        }
        this.resetForm();
      } catch (err) {
        this.error = "Failed to send notification. Please try again.";
        console.error(err);
      } finally {
        this.sending = false;
      }
    },

    handleSaveDraft() {
      // Draft persistence can be wired up when the endpoint is available
    },

    resetForm() {
      this.error = null;
      this.form = { title: "", message: "", deepLink: "", audience: "all", email: "", website: true };
    },

    showToast(msg) {
      clearTimeout(this.toastTimer);
      this.toast = msg;
      this.toastTimer = setTimeout(() => { this.toast = null; }, 3500);
    },
  },

  beforeUnmount() {
    clearTimeout(this.toastTimer);
  },
};
</script>