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
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="8" y1="12" x2="16" y2="12" />
            <line x1="11" y1="18" x2="13" y2="18" />
          </svg>
          Filter
        </button>
        <button class="btn-solid">
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
          Invite
        </button>
      </div>
    </div>

    <!-- Stat Cards -->
    <div class="stat-grid">
      <div class="stat-card">
        <div class="stat-label">Total users</div>
        <div class="stat-value" style="color: #191b23">{{ userCount }}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Verified Accounts</div>
        <div class="stat-value" style="color: #006c49">{{ virified }}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Roles assigned</div>
        <div class="stat-value" style="color: #191b23">{{ roles }}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">subscrieped Users</div>
        <div class="stat-value" style="color: #825100">{{ subscribed }}</div>
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
            <th class="col-status">Virified</th>
            <th class="col-actions"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="users.length === 0">
            <td colspan="6" class="empty-row">No users found.</td>
          </tr>
          <tr v-for="user in users" :key="user.email">
            <!-- User -->
            <td>
              <div class="user-cell">
                <div class="avatar" :style="{ background: user.avatarBg }">
                  {{ user.initials }}
                </div>
                <div>
                  <p class="user-name">{{ user.name }}</p>
                  <p class="user-email">{{ user.email }}</p>
                </div>
              </div>
            </td>

            <!-- Role -->
            <td>
              <span
                class="role-pill"
                :style="{ background: user.roleBg, color: user.roleColor }"
              >
                {{ user.role }}
              </span>
            </td>

            <!-- Virtual Try-On quota -->
            <td>
              <div class="quota-bar-wrap">
                <div class="quota-labels">
                  <span class="quota-used"
                    >{{ user.vto.used }}/{{ user.vto.total }}</span
                  >
                  <span
                    class="quota-pct"
                    :class="{ danger: pct(user.vto) >= 100 }"
                    >{{ pct(user.vto) }}%</span
                  >
                </div>
                <div class="quota-track">
                  <div
                    class="quota-fill"
                    :style="{
                      width: Math.min(pct(user.vto), 100) + '%',
                      background: fillColor(user.vto, 'vto'),
                    }"
                  ></div>
                </div>
              </div>
            </td>

            <!-- Recycling quota -->
            <td>
              <div class="quota-bar-wrap">
                <div class="quota-labels">
                  <span class="quota-used"
                    >{{ user.rec.used }}/{{ user.rec.total }}</span
                  >
                  <span
                    class="quota-pct"
                    :class="{ danger: pct(user.rec) >= 100 }"
                    >{{ pct(user.rec) }}%</span
                  >
                </div>
                <div class="quota-track">
                  <div
                    class="quota-fill"
                    :style="{
                      width: Math.min(pct(user.rec), 100) + '%',
                      background: fillColor(user.rec, 'rec'),
                    }"
                  ></div>
                </div>
              </div>
            </td>

            <!-- Status -->
            <td>
              <span class="status-pill" :class="user.status">{{
                user.status
              }}</span>
            </td>

            <!-- Actions -->
            <td>
              <div class="action-btns">
                <button class="icon-btn" :aria-label="'Edit ' + user.name">
                  <svg
                    width="14"
                    height="14"
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
                  class="icon-btn"
                  :aria-label="'More options for ' + user.name"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="5" r="1" />
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="12" cy="19" r="1" />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="pagination" v-if="totalPages > 1">
      <button class="pg-btn" :disabled="currentPage === 1" @click="prev">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          aria-hidden="true"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <template v-for="pg in pageNumbers" :key="pg">
        <span v-if="pg === '…'" class="pg-ellipsis">…</span>
        <button
          v-else
          class="pg-btn"
          :class="{ active: pg === currentPage }"
          @click="goTo(pg)"
        >
          {{ pg }}
        </button>
      </template>

      <button
        class="pg-btn"
        :disabled="currentPage === totalPages"
        @click="next"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          aria-hidden="true"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      <span class="pg-info"
        >{{ (currentPage - 1) * pageSize + 1 }}–{{
          Math.min(currentPage * pageSize, allUsers.length)
        }}
        of {{ allUsers.length }}</span
      >
    </div>
  </div>
</template>

<script>
import { getAllUsers } from "../../services/services";

const AVATAR_COLORS = [
  "#1550d3",
  "#006c49",
  "#d85a30",
  "#7f77dd",
  "#825100",
  "#c03a6e",
];

const ROLE_STYLES = {
  admin: { bg: "#e8edfc", color: "#1550d3" },
  manager: { bg: "#e6f4ef", color: "#006c49" },
  viewer: { bg: "#fef3e2", color: "#825100" },
};

function mapUser(u, i) {
  const name =
    `${u.profile.first_name ?? ""} ${u.profile.last_name ?? ""}`.trim() ||
    u.username ||
    "Unknown";
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  const role = (u.role ?? "viewer").toLowerCase();
  const roleStyle = ROLE_STYLES[role] ?? { bg: "#f3f4f6", color: "#434654" };

  return {
    name,
    initials,
    email: u.email ?? "—",
    role,
    roleBg: roleStyle.bg,
    roleColor: roleStyle.color,
    status: u.isActive ?? (u.is_verified ? "Virified" : "Not-Vrified"),
    avatarBg: AVATAR_COLORS[i % AVATAR_COLORS.length],
    vto: {
      used: u.latestTryOn.length ?? u.vtoUsed ?? 0,
      total: u.virtualTryOnLimit ?? u.vtoLimit ?? 100,
    },
    rec: {
      used: u.latestRecycle.length ?? u.recUsed ?? 0,
      total: u.recyclingLimit ?? u.recLimit ?? 100,
    },
  };
}

const PAGE_SIZE = 8;

export default {
  name: "UsersPage",
  data() {
    return {
      allUsers: [],
      userCount: 0,
      currentPage: 1,
      pageSize: PAGE_SIZE,
      roles: 0,
      virified: 0,
      subscribed: 0,
    };
  },

  computed: {
    totalPages() {
      return Math.max(1, Math.ceil(this.allUsers.length / this.pageSize));
    },
    users() {
      const start = (this.currentPage - 1) * this.pageSize;
      return this.allUsers.slice(start, start + this.pageSize);
    },
    pageNumbers() {
      const total = this.totalPages;
      if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
      const cur = this.currentPage;
      const pages = new Set(
        [1, total, cur, cur - 1, cur + 1].filter((n) => n >= 1 && n <= total),
      );
      return [...pages]
        .sort((a, b) => a - b)
        .reduce((acc, n, i, arr) => {
          if (i > 0 && n - arr[i - 1] > 1) acc.push("…");
          acc.push(n);
          return acc;
        }, []);
    },
  },

  methods: {
    async fetchUsers() {
      try {
        const res = await getAllUsers();
        const raw = Array.isArray(res.data)
          ? res.data
          : (res.data?.users ?? []);
        this.allUsers = raw.map(mapUser);
        this.userCount = this.allUsers.length;
      } catch (err) {
        console.log("failed to fetch users", err);
      }
    },

    goTo(page) {
      if (typeof page === "number") this.currentPage = page;
    },
    prev() {
      if (this.currentPage > 1) this.currentPage--;
    },
    next() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },

    pct(quota) {
      return quota.total ? Math.round((quota.used / quota.total) * 100) : 0;
    },
    fillColor(quota, type) {
      const p = this.pct(quota);
      if (p >= 100) return "#fb2c36";
      if (p >= 80) return "#f59e0b";
      return type === "vto" ? "#1550d3" : "#006c49";
    },
    async fetchRoles() {
      try {
        const { data } = await getAllUsers();

        this.roles = new Set(data.map((user) => user.role)).size;
      } catch (err) {
        console.log("failed to get the number of roles", err);
      }
    },
    async fetchActivited() {
      try {
        const { data } = await getAllUsers();
        this.virified = data.filter((user) => user.is_verified === true).length;
      } catch (err) {
        console.log("fialed to get the actvited users", err);
      }
    },
    async subscriptions() {
      try {
        const { data } = await getAllUsers();

        this.subscribed = data.filter(
          (data) =>
            data.stripeCustomerId !== (null && "null") &&
            data.stripeCustomerId !== undefined,
        ).length;
      } catch (err) {
        console.log("failed to get subscribed users", err);
      }
    },
  },

  mounted() {
    this.fetchUsers();
    this.fetchRoles();
    this.fetchActivited();
    this.subscriptions();
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
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
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
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 16px;
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

/* Stat cards */
.stat-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
  margin-bottom: 24px;
}
.stat-card {
  background: #f3f3fe;
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
  border: 0.8px solid #bec8d1;
  border-radius: 16px;
  overflow: hidden;
  box-shadow:
    0px 1px 3px rgba(0, 0, 0, 0.1),
    0px 1px 2px -1px rgba(0, 0, 0, 0.1);
}
.tbl {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}
.tbl th {
  background: #f5f7fa;
  font-family: "Roboto", sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: #99a1af;
  padding: 11px 0 11px 16px;
  border-bottom: 0.8px solid #f3f4f6;
  text-align: left;
}
.tbl td {
  padding: 12px 0 12px 16px;
  border-bottom: 0.8px solid #f9fafb;
  vertical-align: middle;
}
.tbl tr:last-child td {
  border-bottom: none;
}
.col-user {
  width: 28%;
}
.col-role {
  width: 16%;
}
.col-quota {
  width: 18%;
}
.col-status {
  width: 12%;
}
.col-actions {
  width: 8%;
}

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
  font-family: "Roboto", sans-serif;
  font-size: 12px;
  font-weight: 700;
  color: #ffffff;
  flex-shrink: 0;
}
.user-name {
  font-family: "Roboto", sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: #1e1e24;
  margin: 0 0 2px;
}
.user-email {
  font-family: "Roboto", sans-serif;
  font-size: 11px;
  color: #99a1af;
  margin: 0;
}

/* Role pill */
.role-pill {
  display: inline-flex;
  padding: 3px 10px;
  border-radius: 999px;
  font-family: "Roboto", sans-serif;
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
  font-family: "Roboto", sans-serif;
  font-size: 11px;
}
.quota-used {
  color: #4a5565;
}
.quota-pct {
  color: #99a1af;
}
.quota-pct.danger {
  color: #fb2c36;
  font-weight: 600;
}
.quota-track {
  height: 5px;
  background: #f3f4f6;
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
  font-family: "Roboto", sans-serif;
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
  color: #99a1af;
}
.icon-btn:hover {
  background: #f3f4f6;
  color: #434654;
}
/* Empty state */
.empty-row {
  text-align: center;
  padding: 40px;
  color: #99a1af;
  font-size: 13px;
}

/* Pagination */
.pagination {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 16px;
  justify-content: flex-end;
}
.pg-btn {
  min-width: 32px;
  height: 32px;
  padding: 0 8px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  color: #434654;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition:
    background 0.15s,
    border-color 0.15s;
}
.pg-btn:hover:not(:disabled):not(.active) {
  background: #f3f4f6;
  border-color: #c3c5d7;
}
.pg-btn.active {
  background: #1550d3;
  border-color: #1550d3;
  color: #ffffff;
}
.pg-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}
.pg-ellipsis {
  font-size: 12px;
  color: #99a1af;
  padding: 0 4px;
}
.pg-info {
  font-size: 11px;
  color: #99a1af;
  margin-left: 8px;
  white-space: nowrap;
}
</style>
