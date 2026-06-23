<template>
  <div class="uc-wrap">
    <!-- Page Header -->
    <div class="page-header">
      <div>
        <h1 class="page-title">Users</h1>
        <p class="page-sub">Manage accounts, roles, and feature quotas.</p>
      </div>
      <div class="header-btns">
        <button class="btn-outline">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/></svg>
          Filter
        </button>
        <button class="btn-solid">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Invite
        </button>
      </div>
    </div>

    <!-- Stat Cards -->
    <div class="stat-grid">
      <div class="stat-card">
        <div class="stat-label">Total users</div>
        <div class="stat-value" style="color: #191B23;">1,284</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Active now</div>
        <div class="stat-value" style="color: #006C49;">422</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Roles assigned</div>
        <div class="stat-value" style="color: #191B23;">12</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Pending invites</div>
        <div class="stat-value" style="color: #825100;">28</div>
      </div>
    </div>

    <!-- Table -->
    <div class="table-wrap">
      <table class="tbl">
        <thead>
          <tr>
            <th class="col-user">User</th>
            <th class="col-role">Role</th>
            <th class="col-quota">Virtual Try-On</th>
            <th class="col-quota">Recycling</th>
            <th class="col-status">Status</th>
            <th class="col-actions"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.email">
            <!-- User -->
            <td>
              <div class="user-cell">
                <div class="avatar" :style="{ background: user.avatarBg }">{{ user.initials }}</div>
                <div>
                  <p class="user-name">{{ user.name }}</p>
                  <p class="user-email">{{ user.email }}</p>
                </div>
              </div>
            </td>

            <!-- Role -->
            <td>
              <span class="role-pill" :style="{ background: user.roleBg, color: user.roleColor }">
                {{ user.role }}
              </span>
            </td>

            <!-- Virtual Try-On quota -->
            <td>
              <div class="quota-bar-wrap">
                <div class="quota-labels">
                  <span class="quota-used">{{ user.vto.used }}/{{ user.vto.total }}</span>
                  <span class="quota-pct" :class="{ danger: pct(user.vto) >= 100 }">{{ pct(user.vto) }}%</span>
                </div>
                <div class="quota-track">
                  <div class="quota-fill" :style="{ width: Math.min(pct(user.vto), 100) + '%', background: fillColor(user.vto, 'vto') }"></div>
                </div>
              </div>
            </td>

            <!-- Recycling quota -->
            <td>
              <div class="quota-bar-wrap">
                <div class="quota-labels">
                  <span class="quota-used">{{ user.rec.used }}/{{ user.rec.total }}</span>
                  <span class="quota-pct" :class="{ danger: pct(user.rec) >= 100 }">{{ pct(user.rec) }}%</span>
                </div>
                <div class="quota-track">
                  <div class="quota-fill" :style="{ width: Math.min(pct(user.rec), 100) + '%', background: fillColor(user.rec, 'rec') }"></div>
                </div>
              </div>
            </td>

            <!-- Status -->
            <td>
              <span class="status-pill" :class="user.status">{{ user.status }}</span>
            </td>

            <!-- Actions -->
            <td>
              <div class="action-btns">
                <button class="icon-btn" :aria-label="'Edit ' + user.name">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                </button>
                <button class="icon-btn" :aria-label="'More options for ' + user.name">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UsersPage',

  data() {
    return {
      users: [
        {
          initials: 'SA',
          name: 'Sara Al-Rashidi',
          email: 'sara@example.com',
          avatarBg: '#8ED321',
          role: 'Premium',
          roleColor: '#8B5CF6',
          roleBg: 'rgba(139,92,246,0.08)',
          vto: { used: 48, total: 50 },
          rec: { used: 22, total: 30 },
          status: 'active',
        },
        {
          initials: 'AH',
          name: 'Ahmed Hassan',
          email: 'ahmed@example.com',
          avatarBg: '#3B82F6',
          role: 'Store Owner',
          roleColor: '#3B82F6',
          roleBg: 'rgba(59,130,246,0.08)',
          vto: { used: 10, total: 20 },
          rec: { used: 6, total: 10 },
          status: 'active',
        },
        {
          initials: 'LN',
          name: 'Layla Nasser',
          email: 'layla@example.com',
          avatarBg: '#8B5CF6',
          role: 'User',
          roleColor: '#6B7280',
          roleBg: 'rgba(107,114,128,0.08)',
          vto: { used: 5, total: 5 },
          rec: { used: 3, total: 5 },
          status: 'active',
        },
        {
          initials: 'KO',
          name: 'Khalid Omar',
          email: 'khalid@example.com',
          avatarBg: '#F97316',
          role: 'Premium',
          roleColor: '#8B5CF6',
          roleBg: 'rgba(139,92,246,0.08)',
          vto: { used: 28, total: 50 },
          rec: { used: 14, total: 30 },
          status: 'active',
        },
        {
          initials: 'MI',
          name: 'Mona Ibrahim',
          email: 'mona@example.com',
          avatarBg: '#EC4899',
          role: 'User',
          roleColor: '#6B7280',
          roleBg: 'rgba(107,114,128,0.08)',
          vto: { used: 5, total: 5 },
          rec: { used: 5, total: 5 },
          status: 'suspended',
        },
        {
          initials: 'YK',
          name: 'Yusuf Karim',
          email: 'yusuf@example.com',
          avatarBg: '#14B8A6',
          role: 'Store Owner',
          roleColor: '#3B82F6',
          roleBg: 'rgba(59,130,246,0.08)',
          vto: { used: 8, total: 20 },
          rec: { used: 4, total: 10 },
          status: 'active',
        },
      ],
    }
  },

  methods: {
    pct(quota) {
      return Math.round((quota.used / quota.total) * 100)
    },
    fillColor(quota, type) {
      const p = this.pct(quota)
      if (p >= 100) return '#EF4444'
      return type === 'vto' ? '#8ED321' : '#3B82F6'
    },
  },
}
</script>

<style scoped>
.uc-wrap {
  font-family: 'Geist', system-ui, sans-serif;
  padding: 32px;
  background: linear-gradient(0deg, #FAF8FF, #FAF8FF), #FFFFFF;
  min-height: 100vh;
}

/* Header */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 20px;
}
.page-title {
  font-size: 28px;
  font-weight: 600;
  letter-spacing: -0.6px;
  color: #191B23;
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
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.2px;
  border: 1px solid #C3C5D7;
  border-radius: 8px;
  background: #FAF8FF;
  color: #434654;
  cursor: pointer;
}
.btn-outline:hover {
  background: #EDEDF8;
}
.btn-solid {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 16px;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.2px;
  border: none;
  border-radius: 8px;
  background: #1550D3;
  color: #ffffff;
  cursor: pointer;
}
.btn-solid:hover {
  background: #1244b8;
}

/* Stat cards */
.stat-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
  margin-bottom: 24px;
}
.stat-card {
  background: #F3F3FE;
  border: 1px solid rgba(195, 197, 215, 0.3);
  border-radius: 12px;
  padding: 14px 16px;
}
.stat-label {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: #434654;
  margin-bottom: 4px;
}
.stat-value {
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.2px;
}

/* Table */
.table-wrap {
  background: #ffffff;
  border: 0.8px solid #BEC8D1;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px -1px rgba(0, 0, 0, 0.1);
}
.tbl {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}
.tbl th {
  background: #F5F7FA;
  font-family: 'Roboto', sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: #99A1AF;
  padding: 11px 0 11px 16px;
  border-bottom: 0.8px solid #F3F4F6;
  text-align: left;
}
.tbl td {
  padding: 12px 0 12px 16px;
  border-bottom: 0.8px solid #F9FAFB;
  vertical-align: middle;
}
.tbl tr:last-child td {
  border-bottom: none;
}
.col-user    { width: 28%; }
.col-role    { width: 16%; }
.col-quota   { width: 18%; }
.col-status  { width: 12%; }
.col-actions { width: 8%; }

/* User cell */
.user-cell {
  display: flex;
  align-items: center;
  gap: 10px;
}
.avatar {
  width: 34px;
  height: 34px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Roboto', sans-serif;
  font-size: 12px;
  font-weight: 700;
  color: #ffffff;
  flex-shrink: 0;
}
.user-name {
  font-family: 'Roboto', sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: #1E1E24;
  margin: 0 0 2px;
}
.user-email {
  font-family: 'Roboto', sans-serif;
  font-size: 11px;
  color: #99A1AF;
  margin: 0;
}

/* Role pill */
.role-pill {
  display: inline-flex;
  padding: 3px 10px;
  border-radius: 999px;
  font-family: 'Roboto', sans-serif;
  font-size: 11px;
  font-weight: 500;
}

/* Quota bar */
.quota-bar-wrap {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.quota-labels {
  display: flex;
  justify-content: space-between;
  font-family: 'Roboto', sans-serif;
  font-size: 11px;
}
.quota-used  { color: #4A5565; }
.quota-pct   { color: #99A1AF; }
.quota-pct.danger { color: #FB2C36; font-weight: 600; }
.quota-track {
  height: 5px;
  background: #F3F4F6;
  border-radius: 999px;
  overflow: hidden;
}
.quota-fill {
  height: 100%;
  border-radius: 999px;
  transition: width 0.3s ease;
}

/* Status pill */
.status-pill {
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  border-radius: 999px;
  font-family: 'Roboto', sans-serif;
  font-size: 11px;
  font-weight: 500;
  white-space: nowrap;
}
.status-pill.active    { background: rgba(142, 211, 33, 0.1); color: #5A8A10; }
.status-pill.suspended { background: #FFE2E2; color: #FB2C36; }

/* Action buttons */
.action-btns {
  display: flex;
  gap: 4px;
}
.icon-btn {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  cursor: pointer;
  color: #99A1AF;
}
.icon-btn:hover {
  background: #F3F4F6;
  color: #434654;
}
</style>