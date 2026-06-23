<template>
  <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 w-full max-w-5xl mx-auto">
    <div
      v-for="(step, i) in steps"
      :key="step.id"
      :class="stepWrapClass(i)"
    >
      <div
        class="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-3 sm:py-4 min-h-18 sm:min-h-22"
        :class="stepInnerClass(i)"
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
  name: 'AppStepper',
  props: {
    steps: { type: Array, required: true },
    activeStep: { type: Number, default: 0 },
    allComplete: { type: Boolean, default: false },
  },
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
      if (this.isActive(i)) return 'animated-solid-gradient-border'
      if (this.isCompleted(i)) return 'step-border-completed'
      return 'step-border-inactive'
    },
    stepInnerClass(i) {
      if (this.isActive(i)) return 'animated-solid-gradient-border__inner'
      if (this.isCompleted(i)) return 'step-border-completed__inner'
      return 'step-border-inactive__inner'
    },
    circleClass(i) {
      if (this.isCompleted(i) || this.isActive(i)) {
        return 'bg-[var(--Secondary-Brand-color)] text-white'
      }
      return 'bg-gray-100 dark:bg-zinc-800 text-[var(--Disabled-Text-color)]'
    },
  },
}
</script>
