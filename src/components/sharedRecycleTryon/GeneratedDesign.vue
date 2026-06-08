<template>
  <div :id="scrollId" class="w-full">
    <div class="flex items-center gap-2 mb-5 sm:mb-6">
      <img :src="headerIcon" alt="" class="w-8 h-8 sm:w-10 sm:h-10 shrink-0" aria-hidden="true" />
      <h2 class="text-lg sm:text-xl font-bold text-(--Primary-Text-color)">{{ heading }}</h2>
    </div>

    <div class="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="grid grid-cols-1 lg:grid-cols-2">
        <div class="relative bg-white p-4 sm:p-6 flex items-center justify-center">
          <img
            :src="design.image"
            :alt="design.title"
            class="w-full max-w-sm lg:max-w-none rounded-2xl object-cover aspect-3/4 sm:aspect-4/5"
          />

          <div
            v-if="showMatchBadge"
            class="absolute top-6 sm:top-8 inset-x-6 sm:inset-x-8 flex items-center justify-between gap-2"
          >
            <div class="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 shadow-sm">
              <span class="w-5 h-5 rounded-full bg-[var(--Secondary-Brand-color)] flex items-center justify-center shrink-0">
                <svg class="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </span>
              <span class="text-[11px] sm:text-xs font-semibold text-(--Primary-Text-color) whitespace-nowrap">
                {{ matchPercent }}% Style Match
              </span>
            </div>

            <button
              type="button"
              class="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm shadow-sm flex items-center justify-center text-(--Primary-Text-color) hover:bg-white transition-colors"
              aria-label="Zoom image"
              @click="zoomOpen = true"
            >
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <circle cx="11" cy="11" r="7"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                <line x1="11" y1="8" x2="11" y2="14"/>
                <line x1="8" y1="11" x2="14" y2="11"/>
              </svg>
            </button>
          </div>
        </div>

        <div class="p-5 sm:p-8 flex flex-col">
          <h3 class="text-xl sm:text-2xl font-bold text-(--Primary-Text-color) mb-4">
            {{ design.title }}
          </h3>
          <p class="text-sm sm:text-base text-(--Disabled-Text-color) leading-relaxed flex-1">
            {{ design.description }}
          </p>

          <p v-if="error" class="mt-4 text-sm text-red-600">{{ error }}</p>

          <button
            type="button"
            class="recycle-action-btn mt-6 sm:mt-8"
            :disabled="saving"
            @click="$emit('save')"
          >
            <img :src="actionIcon" alt="" aria-hidden="true" />
            {{ saving ? actionLoadingLabel : actionLabel }}
          </button>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <Transition name="zoom-fade">
        <div
          v-if="zoomOpen && showMatchBadge"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
          @click.self="zoomOpen = false"
          @keydown.escape="zoomOpen = false"
        >
          <img
            :src="design.image"
            :alt="design.title"
            class="max-w-full max-h-[90vh] rounded-2xl object-contain shadow-2xl"
          />
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script>
import logoIcon from '../../assets/Redolapylogo.png'
import downloadIcon from '../../assets/DownloadIcon .svg'
import addIcon from '../../assets/addIcon.svg'

export default {
  name: 'GeneratedDesign',
  emits: ['save'],
  props: {
    design: { type: Object, required: true },
    saving: { type: Boolean, default: false },
    error: { type: String, default: '' },
    heading: { type: String, default: 'Your Generated Design' },
    actionLabel: { type: String, default: 'Save Specs' },
    actionLoadingLabel: { type: String, default: 'Downloading…' },
    actionIconSrc: { type: String, default: '' },
    scrollId: { type: String, default: 'generated-design' },
    showMatchBadge: { type: Boolean, default: false },
    matchPercent: { type: Number, default: 98 },
  },
  data: () => ({
    headerIcon: logoIcon,
    zoomOpen: false,
  }),
  computed: {
    actionIcon() {
      if (this.actionIconSrc) return this.actionIconSrc
      return this.showMatchBadge ? addIcon : downloadIcon
    },
  },
}
</script>

<style scoped>
.zoom-fade-enter-active,
.zoom-fade-leave-active {
  transition: opacity 0.2s ease;
}

.zoom-fade-enter-from,
.zoom-fade-leave-to {
  opacity: 0;
}
</style>
