<template>
  <div class="s-wrap">

    <!-- Page Header -->
    <div class="s-header">
      <h1 class="s-title">Platform Settings</h1>
      <p class="s-sub">Manage your enterprise environment, notification preferences, and global account security.</p>
    </div>

    <!-- Section: Preferences -->
    <div class="card">
      <div class="section-head">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1550D3" stroke-width="1.8"
          aria-hidden="true">
          <circle cx="12" cy="12" r="3" />
          <path
            d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
        <h2 class="section-title">Preferences</h2>
      </div>

      <!-- System Language -->
      <div class="setting-row">
        <div class="setting-info">
          <p class="setting-label">System language</p>
          <p class="setting-desc">Choose the display language for the platform interface.</p>
        </div>
        <div class="select-wrap">
          <select v-model="form.language" aria-label="System language">
            <option value="en-US">English (US)</option>
            <option value="ar">Arabic</option>
            <option value="fr">French</option>
            <option value="es">Spanish</option>
          </select>
        </div>
      </div>

      <hr class="sep">

      <!-- Appearance -->
      <div class="setting-row">
        <div class="setting-info">
          <p class="setting-label">Appearance</p>
          <p class="setting-desc">Set the visual theme for your workspace.</p>
        </div>
        <div class="toggle-group" role="group" aria-label="Appearance">
          <button class="toggle-opt" :class="{ active: form.theme === 'light' }" @click="form.theme = 'light'">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
              aria-hidden="true">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
            Light
          </button>
          <button class="toggle-opt" :class="{ active: form.theme === 'dark' }" @click="form.theme = 'dark'">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
              aria-hidden="true">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
            Dark
          </button>
        </div>
      </div>
    </div>

    <!-- Section: Notifications -->
    <div class="card">
      <div class="section-head">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1550D3" stroke-width="1.8"
          aria-hidden="true">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
        <h2 class="section-title">Notifications</h2>
      </div>

      <div class="notif-list">
        <div v-for="notif in notifications" :key="notif.id" class="notif-item">
          <div class="notif-left">
            <div class="notif-icon" :style="{ background: notif.iconBg, color: notif.iconColor }">
              <component :is="'span'" :v-html="notif.iconSvg" />
            </div>
            <div>
              <p class="notif-label">{{ notif.label }}</p>
              <p class="notif-desc">{{ notif.desc }}</p>
            </div>
          </div>
          <label class="sw" :aria-label="'Toggle ' + notif.label">
            <input type="checkbox" v-model="notif.enabled">
            <span class="sw-track"></span>
            <span class="sw-thumb"></span>
          </label>
        </div>
      </div>
    </div>

    <!-- Section: Account & Support -->
    <div class="card">
      <div class="section-head">
        <svg width="16" height="20" viewBox="0 0 24 24" fill="none" stroke="#1550D3" stroke-width="1.8"
          aria-hidden="true">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        <h2 class="section-title">Account &amp; Support</h2>
      </div>

      <div class="links-grid">
        <a class="link-item" href="#" @click.prevent>
          <div class="link-left">
            <svg width="16" height="20" viewBox="0 0 24 24" fill="none" stroke="#434654" stroke-width="1.8"
              aria-hidden="true">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            <span class="link-text">Documentation</span>
          </div>
          <svg class="chevron" width="8" height="12" viewBox="0 0 8 14" fill="none" stroke="#434654" stroke-width="1.8"
            aria-hidden="true">
            <polyline points="1 1 7 7 1 13" />
          </svg>
        </a>

        <a class="link-item" href="#" @click.prevent>
          <div class="link-left">
            <svg width="16" height="20" viewBox="0 0 24 24" fill="none" stroke="#434654" stroke-width="1.8"
              aria-hidden="true">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span class="link-text">Contact support</span>
          </div>
          <svg class="chevron" width="8" height="12" viewBox="0 0 8 14" fill="none" stroke="#434654" stroke-width="1.8"
            aria-hidden="true">
            <polyline points="1 1 7 7 1 13" />
          </svg>
        </a>

        <a class="link-item" href="#" @click.prevent>
          <div class="link-left">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#434654" stroke-width="1.8"
              aria-hidden="true">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span class="link-text">Privacy policy</span>
          </div>
          <svg class="chevron" width="8" height="12" viewBox="0 0 8 14" fill="none" stroke="#434654" stroke-width="1.8"
            aria-hidden="true">
            <polyline points="1 1 7 7 1 13" />
          </svg>
        </a>

        <button class="link-item danger-link" @click="signOut">
          <div class="link-left">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#BA1A1A" stroke-width="1.8"
              aria-hidden="true">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span class="link-text danger-text">Sign out</span>
          </div>
        </button>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <button class="btn-cancel" @click="discardChanges">Discard changes</button>
      <button class="btn-save" @click="saveSettings">Save all settings</button>
    </div>

  </div>
</template>

<script>
export default {
  name: 'PlatformSettings',

  data() {
    return {
      form: {
        language: 'en-US',
        theme: 'light',
      },
      notifications: [
        {
          id: 'email',
          label: 'Email notifications',
          desc: 'Receive updates about users, keys, and system events via email.',
          iconBg: 'rgba(21,80,211,0.1)',
          iconColor: '#1550D3',
          enabled: true,
        },
        {
          id: 'push',
          label: 'Push notifications',
          desc: 'Get real-time alerts on your mobile device or browser.',
          iconBg: 'rgba(0,108,73,0.1)',
          iconColor: '#006C49',
          enabled: true,
        },
        {
          id: 'quota',
          label: 'Quota limit warnings',
          desc: 'Notify when a user approaches or exceeds their feature quota.',
          iconBg: 'rgba(130,81,0,0.1)',
          iconColor: '#825100',
          enabled: false,
        },
      ],
      savedForm: null,
    }
  },

  created() {
    this.savedForm = JSON.parse(JSON.stringify(this.form))
  },

  methods: {
    saveSettings() {
      this.savedForm = JSON.parse(JSON.stringify(this.form))
      console.log('Settings saved', this.form)
    },

    discardChanges() {
      this.form = JSON.parse(JSON.stringify(this.savedForm))
    },

    signOut() {
      localStorage.removeItem("_id");
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      this.$router.push("/");
    }
  },
}
</script>

<style scoped>
.s-wrap {
  font-family: 'Geist', system-ui, sans-serif;
  padding: 32px;
  background: linear-gradient(0deg, #FAF8FF, #FAF8FF), #FFFFFF;
  min-height: 100vh;
}

/* Header */
.s-header {
  margin-bottom: 32px;
}

.s-title {
  font-size: 28px;
  font-weight: 600;
  letter-spacing: -0.6px;
  color: #191B23;
  margin: 0 0 6px;
}

.s-sub {
  font-size: 15px;
  color: #434654;
  margin: 0;
}

/* Cards */
.card {
  background: #ffffff;
  border: 1px solid rgba(195, 197, 215, 0.3);
  border-radius: 12px;
  padding: 32px;
  margin-bottom: 20px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
}

/* Section headings */
.section-head {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 24px;
}

.section-title {
  font-size: 18px;
  font-weight: 500;
  letter-spacing: -0.2px;
  color: #191B23;
  margin: 0;
}

/* Setting rows */
.setting-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
}

.setting-info {
  flex: 1;
}

.setting-label {
  font-size: 15px;
  font-weight: 700;
  color: #191B23;
  margin: 0 0 3px;
}

.setting-desc {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.2px;
  color: #434654;
  margin: 0;
}

.sep {
  border: none;
  border-top: 1px solid rgba(195, 197, 215, 0.2);
  margin: 20px 0;
}

/* Language select */
.select-wrap {
  position: relative;
  min-width: 200px;
}

.select-wrap select {
  width: 100%;
  padding: 9px 36px 9px 12px;
  background: #FAF8FF;
  border: 1px solid #C3C5D7;
  border-radius: 8px;
  font-family: 'Geist', system-ui, sans-serif;
  font-size: 15px;
  color: #191B23;
  appearance: none;
  cursor: pointer;
  outline: none;
}

.select-wrap select:focus {
  border-color: #1550D3;
  box-shadow: 0 0 0 3px rgba(21, 80, 211, 0.1);
}

.select-wrap::after {
  content: '';
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  border: 5px solid transparent;
  border-top-color: #6B7280;
  pointer-events: none;
}

/* Appearance toggle */
.toggle-group {
  display: flex;
  padding: 4px;
  background: #E7E7F2;
  border-radius: 8px;
  flex-shrink: 0;
}

.toggle-opt {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 6px 16px;
  border-radius: 6px;
  font-family: 'Geist', system-ui, sans-serif;
  font-size: 15px;
  cursor: pointer;
  border: none;
  background: transparent;
  color: #434654;
  white-space: nowrap;
}

.toggle-opt.active {
  background: #FAF8FF;
  color: #1550D3;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
}

/* Notifications */
.notif-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.notif-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(243, 243, 254, 0.5);
  border-radius: 8px;
  padding: 14px 16px;
}

.notif-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.notif-icon {
  width: 40px;
  height: 40px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  flex-shrink: 0;
}

.notif-label {
  font-size: 15px;
  font-weight: 700;
  color: #191B23;
  margin: 0 0 3px;
}

.notif-desc {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.2px;
  color: #434654;
  margin: 0;
}

/* Toggle switch */
.sw {
  position: relative;
  width: 44px;
  height: 24px;
  flex-shrink: 0;
  cursor: pointer;
}

.sw input {
  opacity: 0;
  width: 0;
  height: 0;
  position: absolute;
}

.sw-track {
  position: absolute;
  inset: 0;
  border-radius: 999px;
  background: #C3C5D7;
  transition: background 0.2s;
}

.sw input:checked~.sw-track {
  background: #1550D3;
}

.sw-thumb {
  position: absolute;
  width: 20px;
  height: 20px;
  top: 2px;
  left: 2px;
  background: #ffffff;
  border-radius: 999px;
  border: 1px solid #D1D5DB;
  transition: left 0.2s;
}

.sw input:checked~.sw-thumb {
  left: 22px;
  border-color: #ffffff;
}

/* Account & Support links */
.links-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.link-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border: 1px solid rgba(195, 197, 215, 0.2);
  border-radius: 8px;
  cursor: pointer;
  text-decoration: none;
  background: transparent;
  font-family: inherit;
  width: 100%;
  box-sizing: border-box;
}

.link-item:hover {
  background: #F5F5FF;
}

.link-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.link-text {
  font-size: 15px;
  color: #191B23;
}

.chevron {
  flex-shrink: 0;
}

.danger-link {
  background: rgba(186, 26, 26, 0.05);
  border-color: rgba(186, 26, 26, 0.2);
}

.danger-link:hover {
  background: rgba(186, 26, 26, 0.08);
}

.danger-text {
  font-size: 15px;
  font-weight: 700;
  color: #BA1A1A;
}

/* Footer */
.footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  background: rgba(250, 248, 255, 0.85);
  border: 1px solid rgba(195, 197, 215, 0.3);
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.07);
}

.btn-cancel {
  padding: 10px 24px;
  border-radius: 8px;
  border: none;
  background: transparent;
  font-family: 'Geist', system-ui, sans-serif;
  font-size: 15px;
  color: #434654;
  cursor: pointer;
}

.btn-cancel:hover {
  background: #EDEDF8;
}

.btn-save {
  padding: 10px 32px;
  border-radius: 8px;
  border: none;
  background: #1550D3;
  font-family: 'Geist', system-ui, sans-serif;
  font-size: 15px;
  color: #ffffff;
  cursor: pointer;
  box-shadow: 0px 4px 6px -1px rgba(21, 80, 211, 0.2), 0px 2px 4px -2px rgba(21, 80, 211, 0.2);
}

.btn-save:hover {
  background: #1244b8;
}
</style>