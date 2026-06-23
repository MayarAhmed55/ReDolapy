<template>
  <div
    class="idea-card relative flex-1 min-w-0 cursor-pointer transition-shadow duration-200 hover:shadow-sm"
    :class="selected ? 'idea-card--selected' : 'idea-card--default'"
    @click="$emit('select', idea)"
  >
    <!-- SVG animated gradient dashed border — perfect corners, only shown when selected -->
    <svg v-if="selected" class="idea-border-svg" aria-hidden="true">
      <defs>
        <linearGradient id="cardDashGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stop-color="#40B9FF"/>
          <stop offset="50%"  stop-color="#8ED321"/>
          <stop offset="100%" stop-color="#FF8A3D"/>
        </linearGradient>
      </defs>
      <rect
        class="idea-border-rect"
        x="2" y="2"
        rx="14" ry="14"
        fill="none"
        stroke="url(#cardDashGrad)"
        stroke-width="2.5"
        stroke-dasharray="6 10"
      />
    </svg>

    <div class="p-4 sm:p-5 h-full">
      <div class="flex items-start justify-between gap-2">
        <div
          class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
          :class="selected ? 'bg-(--Secondary-Brand-color) text-white' : 'bg-gray-100 dark:bg-zinc-800 text-(--Disabled-Text-color)'"
        >
          {{ String(index + 1).padStart(2, '0') }}
        </div>

        <img
          v-if="selected"
          :src="checkIcon"
          :alt="$t('recycle.card.selected')"
          class="w-5 h-5 shrink-0"
        />
      </div>

      <div class="mt-4">
        <h3 class="text-sm font-bold text-(--Primary-Text-color) mb-2 leading-snug">{{ idea.title }}</h3>
        <p class="text-xs text-(--Disabled-Text-color) leading-relaxed mb-2 min-h-10">
          {{ expanded ? description : truncate(description) }}
        </p>
        <button
          type="button"
          class="text-xs font-semibold text-(--Primary-Brand-color)"
          @click.stop="$emit('toggle-expand')"
        >
          {{ expanded ? $t('recycle.card.see_less') : $t('recycle.card.see_more') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import checkIcon from '../../assets/checkIcon (3).svg'

export default {
  name: 'StyleIdeaCard',
  emits: ['select', 'toggle-expand'],
  props: {
    idea:     { type: Object, required: true },
    index:    { type: Number, required: true },
    selected: { type: Boolean, default: false },
    expanded: { type: Boolean, default: false },
  },
  data: () => ({ checkIcon }),
  computed: {
    description() {
      return this.idea.design_description || this.idea.description || ''
    },
  },
  methods: {
    truncate(text = '') {
      return text.length > 72 ? `${text.slice(0, 72)}…` : text
    },
  },
}
</script>

<style scoped>
.idea-card {
  border-radius: 16px;
  background: var(--card-surface);
}

.idea-card--default {
  border: 1px solid var(--input-border);
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
}

.idea-card--selected {
  isolation: isolate;
}

/* SVG fills the card perfectly — no corner gaps */
.idea-border-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: visible;
}

.idea-border-rect {
  width: calc(100% - 4px);
  height: calc(100% - 4px);
  animation: dash-march-card 10s linear infinite;
}

@keyframes dash-march-card {
  to {
    stroke-dashoffset: -80;
  }
}
</style>