<template>
  <div class="uc-wrap">
    <!-- Page Header -->
    <div class="page-header">
      <div>
        <button class="back-link" @click="$router.back()">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back to Users
        </button>
        <h1 class="page-title">Edit User</h1>
        <p class="page-sub">Update role, quotas, and account status.</p>
      </div>
      <div class="header-btns">
        <button class="btn-outline" type="button" @click="$router.back()">Cancel</button>
        <button class="btn-solid" type="button" :disabled="saving || loading" @click="handleSave">
          {{ saving ? "Saving…" : "Save Changes" }}
        </button>
      </div>
    </div>

    <!-- Banners -->
    <div v-if="loading" class="banner banner-info">Loading user details…</div>
    <div v-if="loadError" class="banner banner-error">{{ loadError }}</div>
    <div v-if="saveError" class="banner banner-error">{{ saveError }}</div>
    <div v-if="saved" class="banner banner-success">User updated successfully.</div>

    <div v-if="!loading && !loadError" class="form-grid">
      <!-- Profile card -->
      <section class="card">
        <div class="card-header">
          <div class="avatar" :style="{ background: avatarBg }">{{ initials }}</div>
          <div>
            <h3 class="card-title">Profile</h3>
            <p class="card-sub">Basic account information</p>
          </div>
        </div>

        <div class="field-row">
          <div class="field">
            <label class="field-label">First Name</label>
            <input v-model="form.first_name" type="text" class="field-input" placeholder="First name" />
          </div>
          <div class="field">
            <label class="field-label">Last Name</label>
            <input v-model="form.last_name" type="text" class="field-input" placeholder="Last name" />
          </div>
        </div>

        <div class="field">
          <label class="field-label">Email</label>
          <input v-model="form.email" type="email" class="field-input" placeholder="user@example.com" disabled />
          <p class="field-hint">Email can't be changed here.</p>
        </div>
      </section>

      <!-- Role & status card -->
      <section class="card">
        <div class="card-header">
          <h3 class="card-title">Role & Status</h3>
        </div>

        <div class="field-row">
          <div class="field">
            <label class="field-label">Role</label>
            <div class="select-wrap">
              <select v-model="form.role" class="field-select">
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="viewer">Viewer</option>
              </select>
              <svg class="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>

          <div class="field">
            <label class="field-label">Account Status</label>
            <div class="toggle-row">
              <label class="toggle">
                <input type="checkbox" v-model="form.is_active" />
                <span class="toggle-track"><span class="toggle-thumb"></span></span>
              </label>
              <span class="toggle-label">{{ form.is_active ? "Active" : "Inactive" }}</span>
            </div>
          </div>
        </div>

        <div class="field">
          <label class="field-label">Verification</label>
          <div class="toggle-row">
            <label class="toggle">
              <input type="checkbox" v-model="form.is_verified" />
              <span class="toggle-track"><span class="toggle-thumb"></span></span>
            </label>
            <span class="status-pill" :class="form.is_verified ? 'Virified' : 'Not-Vrified'">
              {{ form.is_verified ? "Verified" : "Not Verified" }}
            </span>
          </div>
        </div>
      </section>

      <!-- Quotas card -->
      <section class="card">
        <div class="card-header">
          <h3 class="card-title">Feature Quotas</h3>
          <p class="card-sub">Usage limits for this account</p>
        </div>

        <div class="field-row">
          <div class="field">
            <label class="field-label">Virtual Try-On Limit</label>
            <input v-model.number="form.virtualTryOnLimit" type="number" min="0" class="field-input" />
            <p class="field-hint">Currently used: {{ vtoUsed }}</p>
          </div>
          <div class="field">
            <label class="field-label">Recycling Limit</label>
            <input v-model.number="form.recyclingLimit" type="number" min="0" class="field-input" />
            <p class="field-hint">Currently used: {{ recUsed }}</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
// NOTE: adjust these two imports/names if they don't match your actual service file —
// I followed the getStoreByid / getProductByid naming convention already in this codebase.
import { getUserAdmin, } from "../../services/services";

const AVATAR_COLORS = ["#1550d3", "#006c49", "#d85a30", "#7f77dd", "#825100", "#c03a6e"];

export default {
  name: "EditUserPage",
  data() {
    return {
      loading: false,
      loadError: null,
      saving: false,
      saveError: null,
      saved: false,
      vtoUsed: 0,
      recUsed: 0,
      form: {
        first_name: "",
        last_name: "",
        email: "",
        role: "viewer",
        is_active: true,
        is_verified: false,
        virtualTryOnLimit: 100,
        recyclingLimit: 100,
      },
    };
  },
  computed: {
    userId() {
      return this.$route.params.id;
    },
    initials() {
      const name = `${this.form.first_name} ${this.form.last_name}`.trim();
      return (name || this.form.email || "?")
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    },
    avatarBg() {
      const seed = this.userId ? this.userId.charCodeAt(0) : 0;
      return AVATAR_COLORS[seed % AVATAR_COLORS.length];
    },
  },
  watch: {
    // Guards against Vue reusing this component instance if you ever
    // navigate directly from one user's edit page to another's.
    userId: {
      immediate: true,
      handler(id) {
        if (id) this.fetchUser(id);
      },
    },
  },
  methods: {
    async fetchUser(id) {
      this.loading = true;
      this.loadError = null;
      try {
        const { data } = await getUserAdmin(id);

        this.form.first_name = data.profile?.first_name ?? "";
        this.form.last_name = data.profile?.last_name ?? "";
        this.form.email = data.email ?? "";
        this.form.role = (data.role ?? "viewer").toLowerCase();
        this.form.is_active = data.isActive ?? true;
        this.form.is_verified = !!data.is_verified;
        this.form.virtualTryOnLimit = data.virtualTryOnLimit ?? data.vtoLimit ?? 100;
        this.form.recyclingLimit = data.recyclingLimit ?? data.recLimit ?? 100;

        this.vtoUsed = data.latestTryOn?.length ?? data.vtoUsed ?? 0;
        this.recUsed = data.latestRecycle?.length ?? data.recUsed ?? 0;
      } catch (err) {
        console.error("Failed to load user:", err);
        this.loadError = "Failed to load user details.";
      } finally {
        this.loading = false;
      }
    },

    async handleSave() {
      this.saving = true;
      this.saveError = null;
      this.saved = false;

      const payload = {
        profile: {
          first_name: this.form.first_name,
          last_name: this.form.last_name,
        },
        role: this.form.role,
        isActive: this.form.is_active,
        is_verified: this.form.is_verified,
        virtualTryOnLimit: this.form.virtualTryOnLimit,
        recyclingLimit: this.form.recyclingLimit,
      };

      try {
        await updateUser(this.userId, payload);
        this.saved = true;
        setTimeout(() => { this.saved = false; }, 4000);
      } catch (err) {
        console.error("Failed to update user:", err);
        this.saveError = "Failed to update user. Please try again.";
      } finally {
        this.saving = false;
      }
    },
  },
};
</script>

<style scoped>
.uc-wrap {
  font-family: "Geist", system-ui, sans-serif;
  padding: 32px;
  background: linear-gradient(0deg, #faf8ff, #faf8ff), #ffffff;
  min-height: 100vh;
}

/* Header */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 20px;
}
.back-link {
  display: flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  color: #99a1af;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
  margin-bottom: 8px;
}
.back-link:hover {
  color: #434654;
}
.page-title {
  font-size: 28px;
  font-weight: 600;
  letter-spacing: -0.6px;
  color: #191b23;
  margin: 0 0 4px;
}
.page-sub {
  font-size: 14px;
  color: #434654;
  margin: 0;
}
.header-btns {
  display: flex;
  gap: 10px;
  align-items: center;
}
.btn-outline {
  padding: 9px 16px;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.2px;
  border: 1px solid #c3c5d7;
  border-radius: 8px;
  background: #faf8ff;
  color: #434654;
  cursor: pointer;
}
.btn-outline:hover {
  background: #ededf8;
}
.btn-solid {
  padding: 9px 18px;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.2px;
  border: none;
  border-radius: 8px;
  background: #1550d3;
  color: #ffffff;
  cursor: pointer;
}
.btn-solid:hover {
  background: #1244b8;
}
.btn-solid:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Banners */
.banner {
  border-radius: 10px;
  padding: 12px 16px;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 16px;
}
.banner-info {
  background: #ededf8;
  color: #434654;
}
.banner-error {
  background: #ffe2e2;
  color: #b3261e;
}
.banner-success {
  background: rgba(142, 211, 33, 0.1);
  color: #5a8a10;
}

/* Layout */
.form-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 720px;
}

/* Card */
.card {
  background: #ffffff;
  border: 0.8px solid #bec8d1;
  border-radius: 16px;
  padding: 24px;
  box-shadow:
    0px 1px 3px rgba(0, 0, 0, 0.1),
    0px 1px 2px -1px rgba(0, 0, 0, 0.1);
}
.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}
.card-title {
  font-size: 15px;
  font-weight: 600;
  color: #191b23;
  margin: 0;
}
.card-sub {
  font-size: 12px;
  color: #99a1af;
  margin: 2px 0 0;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 700;
  color: #ffffff;
  flex-shrink: 0;
}

/* Fields */
.field-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
}
.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.field-row .field {
  margin-bottom: 0;
}
.field-label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  color: #434654;
}
.field-input,
.field-select {
  height: 40px;
  padding: 0 12px;
  border: 1px solid #c3c5d7;
  border-radius: 8px;
  background: #faf8ff;
  font-size: 13px;
  color: #191b23;
  font-family: inherit;
}
.field-input:focus,
.field-select:focus {
  outline: none;
  border-color: #1550d3;
  box-shadow: 0 0 0 3px rgba(21, 80, 211, 0.12);
}
.field-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.field-hint {
  font-size: 11px;
  color: #99a1af;
  margin: 0;
}
.select-wrap {
  position: relative;
  display: flex;
  align-items: center;
}
.field-select {
  width: 100%;
  appearance: none;
  cursor: pointer;
}
.select-chevron {
  position: absolute;
  right: 12px;
  color: #99a1af;
  pointer-events: none;
}

/* Toggle */
.toggle-row {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 40px;
}
.toggle {
  position: relative;
  cursor: pointer;
}
.toggle input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}
.toggle-track {
  display: inline-flex;
  align-items: center;
  width: 36px;
  height: 20px;
  border-radius: 999px;
  background: #d1d5db;
  transition: background 0.15s;
  padding: 2px;
}
.toggle input:checked + .toggle-track {
  background: #1550d3;
}
.toggle-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #ffffff;
  transition: transform 0.15s;
}
.toggle input:checked + .toggle-track .toggle-thumb {
  transform: translateX(16px);
}
.toggle-label {
  font-size: 12px;
  color: #434654;
  font-weight: 500;
}

/* Status pill (reused from users.vue) */
.status-pill {
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 500;
  white-space: nowrap;
}
.status-pill.Virified {
  background: rgba(142, 211, 33, 0.1);
  color: #5a8a10;
}
.status-pill.Not-Vrified {
  background: #ffe2e2;
  color: #fb2c36;
}
</style>