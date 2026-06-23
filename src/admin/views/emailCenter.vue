<template>
  <div class="min-h-screen bg-[#FAF8FF] font-['Geist',sans-serif] text-[#191B23]">
    <div class="px-8 pt-12 pb-24 flex flex-col gap-6">

      <!-- Filter Bar -->
      <div class="flex items-center gap-3 flex-wrap">

        <!-- Unread badge -->
        <div class="flex items-center gap-2 px-4 py-2 bg-[#F3F3FE] border border-[#C3C5D7] rounded-xl">
          <span class="text-xs font-medium text-[#434654]">Unread</span>
          <span class="min-w-[20px] h-5 px-1.5 flex items-center justify-center bg-[#1550D3] rounded-full text-[10px] font-bold text-white">
            {{ unreadCount }}
          </span>
        </div>

        <!-- Read / Unread toggle -->
        <div class="flex rounded-xl overflow-hidden border border-[#C3C5D7]">
          <button
            v-for="opt in readOptions"
            :key="String(opt.value)"
            @click="setReadFilter(opt.value)"
            :class="[
              'px-4 py-2 text-xs font-medium transition-colors',
              filters.isRead === opt.value
                ? 'bg-[#1550D3] text-white'
                : 'bg-white text-[#434654] hover:bg-[#F3F3FE]'
            ]"
          >{{ opt.label }}</button>
        </div>

        <!-- Clear -->
        <button
          v-if="filters.isRead !== null"
          @click="clearFilters"
          class="px-4 h-[38px] border border-[#C3C5D7] text-xs font-medium text-[#434654] rounded-xl hover:bg-[#F3F3FE] transition-colors"
        >
          Clear
        </button>

      </div>

      <!-- Table Card -->
      <div class="bg-[#FAF8FF] border border-[#C3C5D7] rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.05)] overflow-hidden">

        <!-- Table Header -->
        <div class="flex items-center h-[41px] bg-[#F3F3FE] border-b border-[#C3C5D7] px-6">
          <div class="w-[220px] shrink-0">
            <span class="text-xs font-bold uppercase tracking-[0.6px] text-[#434654]">Sender</span>
          </div>
          <div class="flex-1">
            <span class="text-xs font-bold uppercase tracking-[0.6px] text-[#434654]">Subject & Preview</span>
          </div>
          <div class="w-[140px] shrink-0 text-right">
            <span class="text-xs font-bold uppercase tracking-[0.6px] text-[#434654]">Received</span>
          </div>
        </div>

        <!-- Rows -->
        <div class="divide-y divide-[#C3C5D7]">

          <div v-if="loading" class="flex items-center justify-center h-24 text-sm text-[#99A1AF]">
            Loading emails…
          </div>

          <div v-else-if="emails.length === 0" class="flex items-center justify-center h-24 text-sm text-[#99A1AF]">
            No emails found.
          </div>

          <div
            v-for="email in emails"
            :key="email._id"
            class="relative flex items-start py-4 hover:bg-white/70 transition-colors cursor-pointer group"
            @click="openEmail(email)"
          >
            <!-- Unread indicator -->
            <div v-if="!email.isRead" class="absolute left-0 top-0 bottom-0 w-1 bg-[#1550D3] rounded-l"></div>

            <!-- Avatar + Sender -->
            <div class="w-[220px] shrink-0 flex items-start gap-3 pl-4">
              <div
                class="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                :style="{ background: email.avatarBg }"
              >
                <span class="text-xs font-bold" :style="{ color: email.avatarColor }">{{ email.initials }}</span>
              </div>
              <span
                class="text-sm leading-snug break-words"
                :class="email.isRead ? 'font-normal text-[#191B23]' : 'font-bold text-[#191B23]'"
              >{{ email.senderName }}</span>
            </div>

            <!-- Subject + Preview -->
            <div class="flex-1 flex flex-col gap-1 pr-4">
              <span
                class="text-sm leading-snug"
                :class="email.isRead ? 'font-normal text-[#191B23]' : 'font-bold text-[#191B23]'"
              >{{ email.subject }}</span>
              <span class="text-sm text-[#434654] line-clamp-2 leading-5">{{ email.message }}</span>
            </div>

            <!-- Time + flag icon -->
            <div class="w-[140px] shrink-0 flex flex-col items-end gap-2 pr-4">
              <span
                class="text-xs tracking-[0.24px] leading-snug"
                :class="email.isRead ? 'font-medium text-[#737686]' : 'font-bold text-[#1550D3]'"
              >{{ email.receivedAt }}</span>
              <!-- Flag icon — stops row click, toggles isRead -->
              <button
                class="p-1 rounded hover:bg-[#EDEDF8] transition-colors"
                :title="email.isRead ? 'Mark as unread' : 'Mark as read'"
                @click.stop="toggleRead(email)"
              >
                <img
                  src="../../assets/Icon (35).svg"
                  class="w-[15px] h-[14px]"
                  :class="email.isRead ? 'opacity-40' : 'opacity-100'"
                />
              </button>
            </div>

          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div class="flex items-center justify-between">
        <span class="text-sm text-[#434654]">Showing {{ emails.length }} of {{ totalEmails }} messages</span>
        <div class="flex gap-2">
          <button
            class="w-[25px] h-[30px] flex items-center justify-center border border-[#C3C5D7] rounded-lg hover:bg-[#EDEDF8] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            :disabled="currentPage === 1"
            @click="prevPage"
          >
            <svg class="w-[7px] h-3 text-[#434654]" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 7 12"><path d="M6 1L1 6l5 5"/></svg>
          </button>
          <button
            class="w-[25px] h-[30px] flex items-center justify-center border border-[#C3C5D7] rounded-lg hover:bg-[#EDEDF8] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            :disabled="currentPage >= totalPages"
            @click="nextPage"
          >
            <svg class="w-[7px] h-3 text-[#434654]" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 7 12"><path d="M1 1l5 5-5 5"/></svg>
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { filterEmails, getUnreadCount, changingState } from '../../services/services';

const AVATAR_PALETTE = [
  { bg: '#DCE1FF', color: '#003CAD' },
  { bg: '#6CF8BB', color: '#00714D' },
  { bg: '#FFE5B4', color: '#A36700' },
  { bg: '#E2E1ED', color: '#434654' },
  { bg: '#FFD6E0', color: '#9B1C3A' },
  { bg: '#D4F1FF', color: '#0A6A99' },
];

const LIMIT = 50;

function formatDate(iso) {
  if (!iso) return '—';
  const date = new Date(iso);
  const now  = new Date();
  const diffDays = Math.floor((now - date) / 86400000);
  if (diffDays === 0) return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7)  return date.toLocaleDateString([], { weekday: 'short' });
  return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
}

function getInitials(profile) {
  if (!profile) return '??';
  return ((profile.first_name?.[0] ?? '') + (profile.last_name?.[0] ?? '')).toUpperCase() || '??';
}

function mapEmail(raw, i) {
  const palette    = AVATAR_PALETTE[i % AVATAR_PALETTE.length];
  const senderName = raw.senderUserId?.profile
    ? `${raw.senderUserId.profile.first_name} ${raw.senderUserId.profile.last_name}`.trim()
    : raw.senderEmail ?? 'Unknown';
  return {
    _id:         raw._id,
    senderName,
    initials:    getInitials(raw.senderUserId?.profile),
    avatarBg:    palette.bg,
    avatarColor: palette.color,
    subject:     raw.subject  ?? '(no subject)',
    message:     raw.message  ?? '',
    isRead:      raw.isRead   ?? true,
    receivedAt:  formatDate(raw.created_at),
  };
}

export default {
  name: 'EmailCenter',

  data() {
    return {
      emails:      [],
      totalEmails: 0,
      unreadCount: 0,
      currentPage: 1,
      loading:     false,
      filters: {
        isRead: null,
      },
      readOptions: [
        { label: 'All',    value: null  },
        { label: 'Read',   value: true  },
        { label: 'Unread', value: false },
      ],
    };
  },

  computed: {
    totalPages() {
      return Math.max(1, Math.ceil(this.totalEmails / LIMIT));
    },
  },

  methods: {
    buildParams(page) {
      const params = { page, limit: LIMIT };
      if (this.filters.isRead !== null) params.isRead = this.filters.isRead;
      return params;
    },

    async fetchEmails(page = 1) {
      this.loading = true;
      try {
        const res  = await filterEmails(this.buildParams(page));
        const body = res.data;
        const raw  = Array.isArray(body) ? body : (body.emails ?? body.data ?? []);
        this.totalEmails = body.total ?? body.totalCount ?? raw.length;
        this.emails      = raw.map(mapEmail);
        this.currentPage = page;
      } catch (err) {
        console.error('Failed to fetch emails', err);
      } finally {
        this.loading = false;
      }
    },

    async fetchUnreadCount() {
      try {
        const res = await getUnreadCount();
        this.unreadCount = res.data?.count ?? res.data?.unreadCount ?? 0;
      } catch (err) {
        console.error('Failed to fetch unread count', err);
      }
    },

    async openEmail(email) {
      // Mark as read on open if currently unread
      if (!email.isRead) {
        try {
          await changingState(email._id, { isRead: true });
          email.isRead = true;
          this.unreadCount = Math.max(0, this.unreadCount - 1);
        } catch (err) {
          console.error('Failed to mark as read', err);
        }
      }
      this.$router.push({ name: 'ReplyEmail', params: { id: email._id } });
    },

    async toggleRead(email) {
      const next = !email.isRead;
      try {
        await changingState(email._id, { isRead: next });
        email.isRead = next;
        this.unreadCount = next
          ? Math.max(0, this.unreadCount - 1)
          : this.unreadCount + 1;
      } catch (err) {
        console.error('Failed to toggle read state', err);
      }
    },

    setReadFilter(value) {
      this.filters.isRead = value;
      this.fetchEmails(1);
    },

    clearFilters() {
      this.filters.isRead = null;
      this.fetchEmails(1);
    },

    prevPage() { if (this.currentPage > 1)              this.fetchEmails(this.currentPage - 1); },
    nextPage() { if (this.currentPage < this.totalPages) this.fetchEmails(this.currentPage + 1); },
  },

  mounted() {
    this.fetchUnreadCount();
    this.fetchEmails();
  },
};
</script>