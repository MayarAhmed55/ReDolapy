<template>
  <div class="min-h-screen bg-[#FAF8FF] font-['Geist',system-ui,sans-serif] text-[#191B23]">
    <div class="px-8 pt-6 pb-16 mx-auto max-w-[936px] flex flex-col gap-6">

      <!-- Loading -->
      <div v-if="loading" class="flex items-center justify-center h-48 text-sm text-[#99A1AF]">
        Loading email…
      </div>

      <template v-else-if="email">

        <!-- Top Bar -->
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <button
              @click="$router.back()"
              class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#EDEDF8] transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#191B23" stroke-width="2.5">
                <path d="M19 12H5M12 5l-7 7 7 7"/>
              </svg>
            </button>
            <h1 class="font-bold text-xl leading-7 tracking-[-0.2px] text-[#191B23]">{{ isNewEmail ? 'New Email' : email.subject }}</h1>
          </div>
        </div>

        <!-- Email Viewer Card -->
        <div v-if="!isNewEmail" class="bg-white border border-[#C3C5D7] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-xl overflow-hidden">

          <!-- Message Header -->
          <div class="flex items-center justify-between px-6 py-6 border-b border-[#C3C5D7]">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-full flex items-center justify-center shrink-0 bg-[#DCE1FF]">
                <span class="font-bold text-xl text-[#1550D3]">{{ email.initials }}</span>
              </div>
              <div class="flex flex-col gap-0.5">
                <span class="font-bold text-base leading-6 text-[#191B23]">{{ email.senderName }}</span>
                <span class="text-sm leading-6 text-[#434654]">{{ email.senderEmail }}</span>
              </div>
            </div>
            <div class="flex flex-col items-end gap-1">
              <span class="text-xs font-medium tracking-[0.24px] text-[#434654]">{{ email.receivedAt }}</span>
              <span class="text-xs font-medium tracking-[0.24px] text-[#434654]">{{ email.receivedDate }}</span>
            </div>
          </div>

          <!-- Subject & Tags bar -->
          <div class="flex items-center justify-between px-6 py-4 bg-[#F3F3FE]">
            <div class="flex items-center gap-3">
              <span class="font-semibold text-base leading-6 text-[#1550D3]">{{ email.subject }}</span>
              <span
                v-if="email.isRead"
                class="px-3 py-1 bg-[#E2E1ED] rounded-full text-xs font-medium tracking-[0.24px] text-[#434654]"
              >Read</span>
              <span
                v-else
                class="px-3 py-1 bg-[#6CF8BB] rounded-full text-xs font-medium tracking-[0.24px] text-[#00714D]"
              >Unread</span>
              <span
                v-if="email.emailType"
                class="px-3 py-1 bg-[#DCE1FF] rounded-full text-xs font-medium tracking-[0.24px] text-[#1550D3]"
              >{{ email.emailType }}</span>
            </div>
            <button
              @click="toggleRead"
              :title="email.isRead ? 'Mark as unread' : 'Mark as read'"
              class="hover:opacity-70 transition-opacity"
            >
              <img
                src="../../assets/Icon (35).svg"
                class="w-5 h-[19px] transition-opacity"
                :class="email.isRead ? 'opacity-40' : 'opacity-100'"
              />
            </button>
          </div>

          <!-- Message Body -->
          <div class="px-8 py-8 flex flex-col gap-4">
            <p
              v-for="(para, i) in email.paragraphs"
              :key="i"
              class="text-base leading-[26px] text-[#191B23]"
            >{{ para }}</p>
          </div>

          <!-- Replies thread -->
          <div v-if="replies.length" class="border-t border-[#C3C5D7]">
            <div
              v-for="(rep, i) in replies"
              :key="rep._id"
              class="flex gap-4 px-8 py-6"
              :class="i < replies.length - 1 ? 'border-b border-[#C3C5D7]' : ''"
            >
              <div class="w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                :style="{ background: AVATAR_PALETTE[i % AVATAR_PALETTE.length].bg }">
                <span class="text-xs font-bold" :style="{ color: AVATAR_PALETTE[i % AVATAR_PALETTE.length].color }">
                  {{ rep.initials }}
                </span>
              </div>
              <div class="flex-1 flex flex-col gap-1">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-sm text-[#191B23]">{{ rep.senderName }}</span>
                  <span class="text-xs text-[#737686]">{{ rep.receivedAt }}</span>
                </div>
                <p class="text-sm leading-6 text-[#434654]">{{ rep.message }}</p>
              </div>
            </div>
          </div>

        </div>
        <!-- /Email Viewer -->

        <!-- Reply Composer Card -->
        <div class="bg-white border border-[#C3C5D7] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-xl overflow-hidden">

          <!-- Composer Header -->
          <div class="flex items-center gap-3 px-6 py-5 bg-[#F3F3FE] border-b border-[#C3C5D7]">
            <svg width="18" height="14" viewBox="0 0 24 18" fill="none" stroke="#1550D3" stroke-width="2">
              <polyline points="9 9 4 4 9 -1"/><path d="M20 18v-7a4 4 0 0 0-4-4H4"/>
            </svg>
            <h2 class="font-bold text-base leading-6 text-[#191B23]">{{ isNewEmail ? 'Compose New Email' : 'Reply to Message' }}</h2>
          </div>

          <!-- Composer Fields -->
          <div class="px-6 py-6 flex flex-col gap-4">

            <!-- To + CC -->
            <div class="flex gap-4">
              <div class="flex-1 flex flex-col gap-1">
                <label class="text-xs font-medium tracking-[0.24px] text-[#737686]">To</label>
                <input
                  v-model="reply.to"
                  type="email"
                  class="w-full border border-[#C3C5D7] rounded-lg px-4 py-2 text-base leading-6 text-[#434654] bg-white outline-none focus:border-[#1550D3] transition-colors"
                  :placeholder="isNewEmail ? 'recipient@example.com' : email.receiverEmail"
                />
              </div>
              <div class="flex-1 flex flex-col gap-1">
                <label class="text-xs font-medium tracking-[0.24px] text-[#737686]">CC</label>
                <input
                  v-model="reply.cc"
                  type="text"
                  placeholder="Add recipients..."
                  class="w-full border border-[#C3C5D7] rounded-lg px-4 py-2 text-base leading-6 text-[#6B7280] bg-white outline-none focus:border-[#1550D3] transition-colors"
                />
              </div>
            </div>

            <!-- Subject -->
            <div class="flex flex-col gap-1">
              <label class="text-xs font-medium tracking-[0.24px] text-[#737686]">Subject</label>
              <input
                v-model="reply.subject"
                type="text"
                class="w-full border border-[#C3C5D7] rounded-lg px-4 py-2 text-base leading-6 text-[#191B23] bg-white outline-none focus:border-[#1550D3] transition-colors"
              />
            </div>

            <!-- Rich text editor -->
            <div class="flex flex-col gap-1">
              <label class="text-xs font-medium tracking-[0.24px] text-[#737686]">Message Body</label>
              <div class="border border-[#C3C5D7] rounded-xl overflow-hidden flex flex-col">
                <!-- Toolbar -->
                <div class="flex items-center gap-1 px-2 py-2 bg-[#F3F3FE] border-b border-[#C3C5D7]">
                  <button @click="execCmd('bold')"    class="w-6 h-6 flex items-center justify-center rounded hover:bg-[#EDEDF8] text-xs font-bold   text-[#191B23]">B</button>
                  <button @click="execCmd('italic')"  class="w-6 h-6 flex items-center justify-center rounded hover:bg-[#EDEDF8] text-xs italic      text-[#191B23]">I</button>
                  <button @click="execCmd('underline')" class="w-6 h-6 flex items-center justify-center rounded hover:bg-[#EDEDF8] text-xs underline text-[#191B23]">U</button>
                  <div class="w-px h-5 bg-[#C3C5D7] mx-1"></div>
                  <button @click="execCmd('insertUnorderedList')" class="w-7 h-6 flex items-center justify-center rounded hover:bg-[#EDEDF8]">
                    <svg width="14" height="12" viewBox="0 0 24 20" fill="none" stroke="#191B23" stroke-width="2">
                      <line x1="8" y1="4" x2="22" y2="4"/><line x1="8" y1="10" x2="22" y2="10"/><line x1="8" y1="16" x2="22" y2="16"/>
                      <circle cx="3" cy="4" r="1.5" fill="#191B23"/><circle cx="3" cy="10" r="1.5" fill="#191B23"/><circle cx="3" cy="16" r="1.5" fill="#191B23"/>
                    </svg>
                  </button>
                  <button @click="execCmd('insertOrderedList')" class="w-7 h-7 flex items-center justify-center rounded hover:bg-[#EDEDF8]">
                    <svg width="14" height="15" viewBox="0 0 24 24" fill="none" stroke="#191B23" stroke-width="2">
                      <line x1="10" y1="6" x2="22" y2="6"/><line x1="10" y1="12" x2="22" y2="12"/><line x1="10" y1="18" x2="22" y2="18"/>
                      <path d="M4 6h1V3M4 12h2l-2 3h2M4 18v-1l2-1-2-1v-1" stroke-linecap="round"/>
                    </svg>
                  </button>
                  <div class="w-px h-5 bg-[#C3C5D7] mx-1"></div>
                  <button @click="execCmd('justifyLeft')"   class="w-7 h-5 flex items-center justify-center rounded hover:bg-[#EDEDF8]">
                    <svg width="15" height="10" viewBox="0 0 24 14" fill="none" stroke="#191B23" stroke-width="2">
                      <line x1="2" y1="2" x2="22" y2="2"/><line x1="2" y1="7" x2="15" y2="7"/><line x1="2" y1="12" x2="19" y2="12"/>
                    </svg>
                  </button>
                  <button @click="execCmd('justifyCenter')" class="w-7 h-7 flex items-center justify-center rounded hover:bg-[#EDEDF8]">
                    <svg width="15" height="14" viewBox="0 0 24 18" fill="none" stroke="#191B23" stroke-width="2">
                      <line x1="2" y1="2" x2="22" y2="2"/><line x1="6" y1="7" x2="18" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/>
                    </svg>
                  </button>
                  <div class="flex-1"></div>
                  <button @click="clearBody" title="Clear" class="w-7 h-7 flex items-center justify-center rounded hover:bg-red-50">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#BA1A1A" stroke-width="2">
                      <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>
                    </svg>
                  </button>
                </div>
                <!-- Editable area -->
                <div
                  ref="bodyEditor"
                  contenteditable="true"
                  class="min-h-[249px] p-6 text-base leading-6 text-[#191B23] outline-none bg-white"
                  @input="reply.body = $event.target.innerHTML"
                ></div>
              </div>
            </div>

            <p v-if="sendError" class="text-xs text-[#BA1A1A]">{{ sendError }}</p>
          </div>

          <!-- Action Footer -->
          <div class="flex items-center justify-between px-6 py-6 bg-[#FAF8FF] border-t border-[#C3C5D7]">
            <div class="flex items-center gap-2">
              <button title="Attach" class="w-[29px] h-9 flex items-center justify-center rounded-full hover:bg-[#EDEDF8] transition-colors">
                <svg width="13" height="20" viewBox="0 0 16 24" fill="none" stroke="#434654" stroke-width="1.8">
                  <path d="M14 8v8a6 6 0 0 1-12 0V6a4 4 0 0 1 8 0v8a2 2 0 0 1-4 0V7"/>
                </svg>
              </button>
              <button title="Emoji" class="w-9 h-[34px] flex items-center justify-center rounded-full hover:bg-[#EDEDF8] transition-colors">
                <svg width="20" height="18" viewBox="0 0 24 22" fill="none" stroke="#434654" stroke-width="1.8">
                  <circle cx="12" cy="11" r="9"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                  <line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>
                </svg>
              </button>
              <button title="Discard" class="w-8 h-[34px] flex items-center justify-center rounded-full hover:bg-red-50 transition-colors">
                <svg width="16" height="18" viewBox="0 0 20 22" fill="none" stroke="#BA1A1A" stroke-width="1.8">
                  <path d="M3 6h14M8 6V4h4v2M17 6l-1 13H4L3 6"/>
                </svg>
              </button>
            </div>
            <div class="flex items-center gap-3">
              <button
                @click="saveDraft"
                class="px-6 h-[38px] border border-[#C3C5D7] rounded-xl text-xs font-bold tracking-[0.24px] text-[#191B23] hover:bg-[#EDEDF8] transition-colors"
              >Save Draft</button>
              <button
                @click="sendReply"
                :disabled="sending"
                class="flex items-center gap-2 px-8 h-9 bg-[#1550D3] rounded-xl text-xs font-bold tracking-[0.24px] text-white shadow-[0px_10px_15px_-3px_rgba(21,80,211,0.2),0px_4px_6px_-4px_rgba(21,80,211,0.2)] hover:bg-[#1244B8] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
              >
                {{ sending ? 'Sending…' : (isNewEmail ? 'Send Email' : 'Send Reply') }}
                <svg width="14" height="12" viewBox="0 0 20 16" fill="none" stroke="white" stroke-width="2">
                  <path d="M2 8h16M12 2l6 6-6 6"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

      </template>

      <div v-else-if="!loading" class="flex items-center justify-center h-48 text-sm text-[#99A1AF]">
        Email not found.
      </div>

    </div>

    <!-- Toast -->
    <transition
      enter-active-class="transition-all duration-300" enter-from-class="opacity-0 translate-y-4" enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-4"
    >
      <div v-if="toast" class="fixed bottom-8 right-8 flex items-center gap-3 bg-[#191B23] text-white px-5 py-3 rounded-xl shadow-xl text-xs font-medium z-50">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8DE321" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        {{ toast }}
      </div>
    </transition>
  </div>
</template>

<script>
import { getEmailThread, replyToAnEmail, changingState, sendEmailTouser } from '../../services/services';

const AVATAR_PALETTE = [
  { bg: '#DCE1FF', color: '#1550D3' },
  { bg: '#6CF8BB', color: '#00714D' },
  { bg: '#FFE5B4', color: '#A36700' },
  { bg: '#E2E1ED', color: '#434654' },
  { bg: '#FFD6E0', color: '#9B1C3A' },
  { bg: '#D4F1FF', color: '#0A6A99' },
];

function formatTime(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function formatDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

function initialsFromEmail(email) {
  if (!email) return '??';
  const name = email.split('@')[0].replace(/[._-]/g, ' ');
  return name.split(' ').slice(0, 2).map(w => w[0]?.toUpperCase() ?? '').join('') || '??';
}

function mapReply(raw, i) {
  const palette = AVATAR_PALETTE[(i + 1) % AVATAR_PALETTE.length];
  return {
    _id:        raw._id,
    senderName: raw.senderEmail ?? 'Unknown',
    initials:   initialsFromEmail(raw.senderEmail),
    avatarBg:   palette.bg,
    avatarColor: palette.color,
    message:    raw.message ?? '',
    receivedAt: formatTime(raw.created_at),
  };
}

export default {
  name: 'ReplyEmail',

  data() {
    return {
      loading:    true,
      sending:    false,
      sendError:  null,
      toast:      null,
      toastTimer: null,
      email:      null,
      replies:    [],
      reply: { to: '', cc: '', subject: '', body: '' },
      AVATAR_PALETTE,
    };
  },

  computed: {
    emailId() { return this.$route.params.id; },
    isNewEmail() { return !this.emailId; },
  },

  watch: {
    // Vue Router reuses this component instance when navigating between
    // /email/:id routes (and to/from the no-id "compose" route), so mounted()
    // alone isn't enough - we need to react to id changes explicitly.
    '$route.params.id'() {
      this.init();
    },
  },

  async mounted() {
    await this.init();
  },

  methods: {
    async init() {
      this.resetState();
      if (this.isNewEmail) {
        this.setupNewEmail();
      } else {
        await this.loadEmail();
      }
    },

    resetState() {
      this.loading = true;
      this.sending = false;
      this.sendError = null;
      this.toast = null;
      clearTimeout(this.toastTimer);
      this.email = null;
      this.replies = [];
      this.reply = { to: '', cc: '', subject: '', body: '' };
      this.$nextTick(() => {
        if (this.$refs.bodyEditor) this.$refs.bodyEditor.innerHTML = '';
      });
    },

    setupNewEmail() {
      this.email = {
        _id:          null,
        senderName:   '',
        senderEmail:  '',
        receiverEmail: '',
        initials:     '??',
        subject:      '',
        paragraphs:   [],
        isRead:       true,
        emailType:    null,
        receivedAt:   '',
        receivedDate: '',
      };
      this.loading = false;
    },

    async loadEmail() {
      this.loading = true;
      try {
        const res     = await getEmailThread(this.emailId);
        const { root, replies } = res.data;

        this.email = {
          _id:          root._id,
          senderName:   root.senderEmail ?? 'Unknown',
          senderEmail:  root.senderEmail ?? '',
          receiverEmail: root.receiverEmail ?? '',
          initials:     initialsFromEmail(root.senderEmail),
          subject:      root.subject    ?? '(no subject)',
          paragraphs:   (root.message   ?? '').split(/\n+/).filter(Boolean),
          isRead:       root.isRead     ?? true,
          emailType:    root.emailType  ?? null,
          receivedAt:   formatTime(root.created_at),
          receivedDate: formatDate(root.created_at),
        };

        this.replies = (replies ?? []).map(mapReply);

        this.reply.to      = root.senderEmail ?? '';
        this.reply.subject = `Re: ${this.email.subject}`;
      } catch (err) {
        console.error('Failed to load email thread', err);
        this.email = null;
      } finally {
        this.loading = false;
      }
    },

    async toggleRead() {
      const next = !this.email.isRead;
      try {
        await changingState(this.emailId, { isRead: next });
        this.email.isRead = next;
      } catch (err) {
        console.error('Failed to toggle read state', err);
      }
    },

    execCmd(cmd) {
      document.execCommand(cmd, false, null);
      this.$refs.bodyEditor.focus();
    },

    clearBody() {
      this.$refs.bodyEditor.innerHTML = '';
      this.reply.body = '';
    },

    saveDraft() {
      this.showToast('Draft saved.');
    },

    async sendReply() {
      this.sendError = null;
      const bodyText = this.$refs.bodyEditor.innerText.trim();
      if (!bodyText) { this.sendError = 'Message body cannot be empty.'; return; }

      if (this.isNewEmail && !this.reply.to.trim()) {
        this.sendError = 'Please enter a recipient email.';
        return;
      }

      this.sending = true;
      try {
        if (this.isNewEmail) {
          await sendEmailTouser({
            receiverEmail: this.reply.to.trim(),
            subject: this.reply.subject,
            message: bodyText,
          });
          this.showToast('Email sent successfully.');
          this.clearBody();
          this.reply.to = '';
          this.reply.subject = '';
        } else {
          await replyToAnEmail(this.emailId, { message: bodyText });
          this.showToast('Reply sent successfully.');
          this.clearBody();
          await this.loadEmail(); // refresh thread to show new reply
        }
      } catch (err) {
        this.sendError = `Failed to send ${this.isNewEmail ? 'email' : 'reply'}. Please try again.`;
        console.error(err);
      } finally {
        this.sending = false;
      }
    },

    showToast(msg) {
      clearTimeout(this.toastTimer);
      this.toast = msg;
      this.toastTimer = setTimeout(() => { this.toast = null; }, 3000);
    },
  },

  beforeUnmount() {
    clearTimeout(this.toastTimer);
  },
};
</script>