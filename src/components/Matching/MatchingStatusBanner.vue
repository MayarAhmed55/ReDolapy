<template>
  <div
    class="flex items-start gap-3 px-4 py-3.5 rounded-2xl"
    :class="hasSelection ? 'bg-(--surface-active) border border-[var(--Primary-Brand-color)]/20' : 'bg-(--surface-active)'"
    role="status"
  >
    <svg
      class="w-5 h-5 shrink-0 mt-0.5 text-[var(--Primary-Brand-color)]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.75"
      aria-hidden="true"
    >
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
      <line x1="12" y1="22.08" x2="12" y2="12"/>
    </svg>

    <div class="min-w-0">
      <p class="text-sm font-bold text-(--Primary-Text-color)">
        {{ hasSelection ? $t('matching.status.selected_title') : $t('matching.status.empty_title') }}
      </p>
      <p class="text-xs text-(--Disabled-Text-color) mt-0.5">
        {{ hasSelection ? $t('matching.status.selected_desc') : $t('matching.status.empty_desc') }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MatchingStatusBanner',
  props: {
    hasSelection: { type: Boolean, default: false },
  },
}
</script>
