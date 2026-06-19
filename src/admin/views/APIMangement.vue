<template>
  <div class="ak-wrap">
    <!-- Page Header -->
    <div class="ak-head">
      <div>
        <h1 class="ak-title">API Key Management</h1>
        <p class="ak-sub">{{ activeCount }} active keys</p>
      </div>
      <button class="ak-btn-add" @click="showAddModal = true">
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          aria-hidden="true"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        Add API key
      </button>
    </div>

    <!-- Security notice -->
    <div class="ak-notice">
      <svg
        class="ak-notice-icon"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#5A8A10"
        stroke-width="1.5"
        aria-hidden="true"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
      <div>
        <p class="ak-notice-title">API keys are encrypted at rest</p>
        <p class="ak-notice-desc">
          Only partial keys are displayed. Copy the full key immediately after
          creation — it won't be shown again.
        </p>
      </div>
    </div>

    <!-- Key Cards -->
    <div class="ak-list">
      <div v-for="key in apiKeys" :key="key.id" class="ak-card">
        <!-- Card top row -->
        <div class="ak-card-top">
          <div class="ak-card-left">
            <div class="ak-icon-wrap" :class="key.iconClass">
              <component
                :is="'svg'"
                :v-html="key.iconSvg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                aria-hidden="true"
              />
            </div>
            <div>
              <span class="ak-name">{{ key.name }}</span>
              <span class="ak-status-pill" :class="key.status">{{
                key.status
              }}</span>
            </div>
          </div>
          <div class="ak-card-actions">
            <button
              class="ak-icon-btn"
              :aria-label="'Edit ' + key.name"
              @click="editKey(key)"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                aria-hidden="true"
              >
                <path
                  d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                />
                <path
                  d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
                />
              </svg>
            </button>
            <button
              class="ak-icon-btn"
              :aria-label="'Delete ' + key.name"
              @click="deleteKey(key.id)"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                aria-hidden="true"
              >
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                <path d="M10 11v6M14 11v6" />
                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Masked key row -->
        <div class="ak-key-row">
          <code class="ak-key-code">{{
            key.revealed ? key.fullKey : key.masked
          }}</code>
          <div class="ak-key-btns">
            <button
              class="ak-key-btn"
              :class="{ copied: key.copied }"
              :aria-label="'Copy key for ' + key.name"
              @click="copyKey(key)"
            >
              <svg
                v-if="!key.copied"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                aria-hidden="true"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" />
                <path
                  d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
                />
              </svg>
              <svg
                v-else
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#5A8A10"
                stroke-width="2"
                aria-hidden="true"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </button>
            <button
              class="ak-key-btn"
              :aria-label="
                (key.revealed ? 'Hide' : 'Reveal') + ' key for ' + key.name
              "
              @click="toggleReveal(key)"
            >
              <svg
                v-if="!key.revealed"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                aria-hidden="true"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <svg
                v-else
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                aria-hidden="true"
              >
                <path
                  d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
                />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ApiKeyManagement",

  data() {
    return {
      showAddModal: false,
      apiKeys: [
        {
          id: "k1",
          name: "Recycle Analysis Model",
          iconClass: "icon-purple",
          masked: "r8_xTpQ2••••••••",
          fullKey: "r8_xTpQ2AbCdEfGhIjKlMn",
          status: "active",
          copied: false,
          revealed: false,
        },
        {
          id: "k2",
          name: "Recycle image generation",
          iconClass: "icon-amber",
          masked: "AIzaSyBx••••••",
          fullKey: "AIzaSyBxQwErTyUiOpAs",
          status: "active",
          copied: false,
          revealed: false,
        },
        {
          id: "k3",
          name: "Try on image generation",
          iconClass: "icon-amber",
          masked: "AIzaSyBx••••••",
          fullKey: "AIzaSyBxZxCvBnMqWsEd",
          status: "active",
          copied: false,
          revealed: false,
        },
        {
          id: "k4",
          name: "Try on Analysis Model",
          iconClass: "icon-amber",
          masked: "AIzaSyBx••••••",
          fullKey: "AIzaSyBxRfTgYhUjIkOl",
          status: "active",
          copied: false,
          revealed: false,
        },
        {
          id: "k5",
          name: "Avatar generation Model",
          iconClass: "icon-amber",
          masked: "AIzaSyBx••••••",
          fullKey: "AIzaSyBxPzLmKnJhGfDs",
          status: "active",
          copied: false,
          revealed: false,
        },
      ],
    };
  },

  computed: {
    activeCount() {
      return this.apiKeys.filter((k) => k.status === "active").length;
    },
  },

  methods: {
    copyKey(key) {
      navigator.clipboard.writeText(key.fullKey).catch(() => {});
      key.copied = true;
      setTimeout(() => {
        key.copied = false;
      }, 1500);
    },

    toggleReveal(key) {
      key.revealed = !key.revealed;
    },

    deleteKey(id) {
      this.apiKeys = this.apiKeys.filter((k) => k.id !== id);
    },

    editKey(key) {
      console.log("Edit key:", key.id);
    },
  },
};
</script>

<style scoped>
.ak-wrap {
  font-family: "Geist", system-ui, sans-serif;
  padding: 32px;
  background: linear-gradient(0deg, #faf8ff, #faf8ff), #ffffff;
  min-height: 100vh;
}

/* Header */
.ak-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}
.ak-title {
  font-family: "Plus Jakarta Sans", system-ui, sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: #1e1e24;
  margin: 0 0 4px;
}
.ak-sub {
  font-size: 12px;
  color: #99a1af;
  margin: 0;
}
.ak-btn-add {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 7px 18px;
  background: #1550d3;
  color: #fff;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.2px;
  border: none;
  border-radius: 999px;
  cursor: pointer;
}
.ak-btn-add:hover {
  background: #1244b8;
}

/* Notice banner */
.ak-notice {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  background: #edeef0;
  border-radius: 14px;
  padding: 14px 16px;
  margin-bottom: 24px;
}
.ak-notice-icon {
  margin-top: 1px;
  flex-shrink: 0;
}
.ak-notice-title {
  font-family: "Roboto", sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: #121826;
  margin: 0 0 3px;
}
.ak-notice-desc {
  font-family: "Roboto", sans-serif;
  font-size: 11px;
  color: #1e1e24;
  margin: 0;
}

/* Key cards */
.ak-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.ak-card {
  background: #ffffff;
  border-radius: 16px;
  box-shadow:
    0px 1px 3px rgba(0, 0, 0, 0.1),
    0px 1px 2px -1px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

/* Card top row */
.ak-card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.ak-card-left {
  display: flex;
  align-items: center;
  gap: 12px;
}
.ak-icon-wrap {
  width: 40px;
  height: 40px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.icon-purple {
  background: rgba(99, 102, 241, 0.12);
  color: #6366f1;
}
.icon-amber {
  background: rgba(245, 158, 11, 0.12);
  color: #f59e0b;
}
.ak-name {
  font-family: "Roboto", sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: #1e1e24;
  margin-right: 8px;
}
.ak-status-pill {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 999px;
  font-family: "Roboto", sans-serif;
  font-size: 11px;
  font-weight: 500;
}
.ak-status-pill.active {
  background: rgba(142, 211, 33, 0.1);
  color: #5a8a10;
}
.ak-status-pill.inactive {
  background: #ffe2e2;
  color: #fb2c36;
}
.ak-card-actions {
  display: flex;
  gap: 6px;
}
.ak-icon-btn {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  cursor: pointer;
  color: #99a1af;
}
.ak-icon-btn:hover {
  background: #f3f4f6;
  color: #434654;
}

/* Key row */
.ak-key-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f5f7fa;
  border-radius: 12px;
  padding: 9px 12px;
}
.ak-key-code {
  font-family: "Consolas", "Courier New", monospace;
  font-size: 12px;
  color: #4a5565;
}
.ak-key-btns {
  display: flex;
  gap: 6px;
}
.ak-key-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #99a1af;
  padding: 2px;
  display: flex;
  align-items: center;
}
.ak-key-btn:hover {
  color: #434654;
}
.ak-key-btn.copied {
  color: #5a8a10;
}
</style>
