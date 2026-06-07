<template>
  <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 w-full max-w-5xl mx-auto">
    <div
      v-for="(step, i) in steps"
      :key="step.id"
      :class="stepWrapClass(i)"
    >
      <div
        class="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-3 sm:py-4 bg-(--primary-bgc) rounded-[20px] min-h-18 sm:min-h-22"
      >
        <div
          class="shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm font-bold"
          :class="circleClass(i)"
        >
          <svg
            v-if="isCompleted(i)"
            class="w-4 h-4 sm:w-5 sm:h-5 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          <span v-else>{{ i + 1 }}</span>
        </div>

        <div class="min-w-0">
          <p
            class="text-sm sm:text-base font-bold leading-tight truncate"
            :class="isInactive(i) ? 'text-(--Disabled-Text-color)' : 'text-(--Primary-Text-color)'"
          >
            {{ step.label }}
          </p>
          <p class="text-[11px] sm:text-xs text-(--Secondary-Text-color) leading-snug mt-0.5 line-clamp-2">
            {{ step.subtitle }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecycleStepper',
  props: {
    activeStep: { type: Number, default: 0 },
    allComplete: { type: Boolean, default: false },
  },
  data: () => ({
    steps: [
      { id: 'upload', label: 'Upload', subtitle: 'Upload 1-2 garment photos' },
      { id: 'idea', label: 'Choose Idea', subtitle: 'Pick your favorite design' },
      { id: 'generate', label: 'Generate', subtitle: 'Visualize your upcycled piece' },
    ],
  }),
  methods: {
    isCompleted(i) {
      return this.allComplete || i < this.activeStep
    },
    isActive(i) {
      return !this.allComplete && i === this.activeStep
    },
    isInactive(i) {
      return !this.allComplete && i > this.activeStep
    },
    stepWrapClass(i) {
      if (this.isActive(i)) return 'gradient-border-wrap'
      if (this.isCompleted(i)) return 'rounded-3xl border-[3px] border-[var(--Secondary-Brand-color)]'
      return 'rounded-3xl border border-gray-200'
    },
    circleClass(i) {
      if (this.isCompleted(i) || this.isActive(i)) {
        return 'bg-[var(--Secondary-Brand-color)] text-white'
      }
      return 'bg-gray-100 text-[var(--Disabled-Text-color)]'
    },
  },
}
</script>
