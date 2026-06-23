<template>
  <div class="ak-wrap">
    <!-- Header -->
    <div class="ak-head">
      <div class="ak-head-left">
        <button class="ak-back-btn" @click="$router.back()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <div>
          <h1 class="ak-title">Edit API Key</h1>
          <p class="ak-sub">{{ form.name || "Loading…" }}</p>
        </div>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="ak-empty">Loading key…</div>

    <!-- Form card -->
    <div v-else class="ak-card">
      <!-- Name -->
      <div class="ak-field">
        <label class="ak-label" for="field-name">Name</label>
        <input
          id="field-name"
          v-model="form.name"
          class="ak-input"
          type="text"
          placeholder="e.g. Try On Analysis Model"
        />
      </div>

      <!-- Service -->
      <div class="ak-field">
        <label class="ak-label" for="field-service">Service</label>
        <input
          id="field-service"
          v-model="form.service"
          class="ak-input"
          type="text"
          placeholder="e.g. Try On Analysis Model"
        />
      </div>

      <!-- Key -->
      <div class="ak-field">
        <label class="ak-label" for="field-key">API Key</label>
        <div class="ak-key-input-wrap">
          <input
            id="field-key"
            v-model="form.key"
            class="ak-input ak-key-input"
            :type="showKey ? 'text' : 'password'"
            placeholder="Enter new key value"
            autocomplete="off"
          />
          <button class="ak-eye-btn" type="button" @click="showKey = !showKey" :aria-label="showKey ? 'Hide key' : 'Show key'">
            <svg v-if="!showKey" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <svg v-else width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
              <line x1="1" y1="1" x2="23" y2="23" />
            </svg>
          </button>
        </div>
        <p class="ak-hint">Leave blank to keep the existing key unchanged.</p>
      </div>

      <!-- Status -->
      <div class="ak-field">
        <label class="ak-label">Status</label>
        <div class="ak-toggle-group">
          <button
            class="ak-toggle-btn"
            :class="{ active: form.status === 'Active' }"
            type="button"
            @click="form.status = 'Active'"
          >Active</button>
          <button
            class="ak-toggle-btn"
            :class="{ inactive: form.status === 'Inactive' }"
            type="button"
            @click="form.status = 'Inactive'"
          >Inactive</button>
        </div>
      </div>

      <!-- Error -->
      <p v-if="error" class="ak-error">{{ error }}</p>

      <!-- Actions -->
      <div class="ak-actions">
        <button class="ak-btn-cancel" type="button" @click="$router.back()">Cancel</button>
        <button class="ak-btn-save" type="button" :disabled="saving" @click="save">
          {{ saving ? "Saving…" : "Save Changes" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { getApiKeyByid, updateAPIKey } from "../../services/services";

export default {
  name: "EditAPIKey",

  data() {
    return {
      loading: true,
      saving: false,
      showKey: false,
      error: null,
      originalKey: null,
      form: {
        name: "",
        service: "",
        key: "",
        status: "Active",
      },
    };
  },

  computed: {
    keyId() {
      return this.$route.params.id;
    },
  },

  watch: {
    "$route.params.id"(newId, oldId) {
      if (newId && newId !== oldId) {
        this.loadKey();
      }
    },
  },

  async mounted() {
    this.loadKey();
  },

  methods: {
    async loadKey() {
      this.loading = true;
      this.error = null;
      this.showKey = false;
      this.form = { name: "", service: "", key: "", status: "Active" };
      try {
        const res = await getApiKeyByid(this.keyId);
        const d = res.data;
        this.originalKey = d.key ?? "";
        this.form = {
          name:    d.name    ?? "",
          service: d.service ?? "",
          key:     "",
          status:  d.status  ?? "Active",
        };
      } catch (err) {
        this.error = "Failed to load key details.";
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    async save() {
      this.error = null;
      if (!this.form.name.trim()) { this.error = "Name is required."; return; }
      if (!this.form.service.trim()) { this.error = "Service is required."; return; }

      this.saving = true;
      try {
        const payload = {
          name:    this.form.name.trim(),
          service: this.form.service.trim(),
          key:     this.form.key.trim() || this.originalKey,
          status:  this.form.status,
        };
        await updateAPIKey(this.keyId, payload);
        this.$router.push({ path: "/admin/API" });
      } catch (err) {
        this.error = "Failed to save changes. Please try again.";
        console.error(err);
      } finally {
        this.saving = false;
      }
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
  margin-bottom: 24px;
}
.ak-head-left {
  display: flex;
  align-items: center;
  gap: 12px;
}
.ak-back-btn {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  border: none;
  background: #ffffff;
  box-shadow: 0px 1px 3px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #434654;
  flex-shrink: 0;
}
.ak-back-btn:hover { background: #f3f4f6; }

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

/* Card */
.ak-card {
  background: #ffffff;
  border-radius: 16px;
  box-shadow:
    0px 1px 3px rgba(0, 0, 0, 0.1),
    0px 1px 2px -1px rgba(0, 0, 0, 0.1);
  padding: 28px;
  max-width: 560px;
}

/* Fields */
.ak-field {
  margin-bottom: 20px;
}
.ak-label {
  display: block;
  font-family: "Roboto", sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: #434654;
  margin-bottom: 7px;
}
.ak-input {
  width: 100%;
  box-sizing: border-box;
  padding: 9px 13px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  font-family: "Roboto", sans-serif;
  font-size: 13px;
  color: #1e1e24;
  background: #f9fafb;
  outline: none;
  transition: border-color 0.15s;
}
.ak-input:focus { border-color: #1550d3; background: #fff; }

/* Key input with eye button */
.ak-key-input-wrap {
  position: relative;
}
.ak-key-input { padding-right: 38px; }
.ak-eye-btn {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #99a1af;
  display: flex;
  align-items: center;
  padding: 2px;
}
.ak-eye-btn:hover { color: #434654; }
.ak-hint {
  font-family: "Roboto", sans-serif;
  font-size: 11px;
  color: #99a1af;
  margin: 5px 0 0;
}

/* Status toggle */
.ak-toggle-group {
  display: inline-flex;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
}
.ak-toggle-btn {
  padding: 7px 20px;
  font-family: "Roboto", sans-serif;
  font-size: 12px;
  font-weight: 500;
  border: none;
  background: #f9fafb;
  color: #99a1af;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}
.ak-toggle-btn.active {
  background: rgba(142, 211, 33, 0.12);
  color: #5a8a10;
}
.ak-toggle-btn.inactive {
  background: #ffe2e2;
  color: #fb2c36;
}

/* Error */
.ak-error {
  font-family: "Roboto", sans-serif;
  font-size: 12px;
  color: #fb2c36;
  margin: 0 0 16px;
}

/* Action buttons */
.ak-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 8px;
}
.ak-btn-cancel {
  padding: 8px 20px;
  border-radius: 999px;
  border: 1px solid #e5e7eb;
  background: #fff;
  font-family: "Roboto", sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: #434654;
  cursor: pointer;
}
.ak-btn-cancel:hover { background: #f3f4f6; }
.ak-btn-save {
  padding: 8px 20px;
  border-radius: 999px;
  border: none;
  background: #1550d3;
  font-family: "Roboto", sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: #fff;
  cursor: pointer;
  transition: background 0.15s;
}
.ak-btn-save:hover:not(:disabled) { background: #1244b8; }
.ak-btn-save:disabled { opacity: 0.6; cursor: not-allowed; }

.ak-empty {
  text-align: center;
  padding: 40px;
  color: #99a1af;
  font-size: 13px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0px 1px 3px rgba(0,0,0,0.1);
}
</style>