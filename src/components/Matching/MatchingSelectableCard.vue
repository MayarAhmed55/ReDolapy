<template>
  <div class="selectable-card-wrap">
    <button
      v-if="removable"
      type="button"
      class="selectable-card__remove"
      :aria-label="removeLabel"
      @click.stop="$emit('remove')"
    >
      <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    </button>

    <div
      class="selectable-card"
      :class="{ 'selectable-card--selected': selected }"
      role="button"
      tabindex="0"
      :aria-pressed="selected"
      @click="$emit('select')"
      @keydown.enter="$emit('select')"
    >
    <div class="selectable-card__image-wrap">
      <img
        v-if="image"
        :src="image"
        :alt="label"
        class="selectable-card__image"
        loading="lazy"
      />
      <div v-else class="selectable-card__placeholder" aria-hidden="true">
        <svg class="w-8 h-8 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M6 3h12l-1 5H7L6 3z"/><path d="M5 8h14l-1.5 11H6.5L5 8z"/>
        </svg>
      </div>

      <span
        class="selectable-card__badge"
        :class="{ 'selectable-card__badge--selected': selected }"
        aria-hidden="true"
      >
        <svg v-if="selected" class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </span>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MatchingSelectableCard',
  props: {
    image: { type: String, default: '' },
    label: { type: String, default: '' },
    selected: { type: Boolean, default: false },
    removable: { type: Boolean, default: false },
    removeLabel: { type: String, default: 'Remove' },
  },
  emits: ['select', 'remove'],
}
</script>

<style scoped>
.selectable-card-wrap {
  position: relative;
  flex: 0 0 auto;
  width: 5.5rem;
}

@media (min-width: 640px) {
  .selectable-card-wrap {
    width: 6.5rem;
  }
}

.selectable-card__remove {
  position: absolute;
  top: -0.35rem;
  inset-inline-end: -0.35rem;
  z-index: 2;
  width: 1.35rem;
  height: 1.35rem;
  border-radius: 9999px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--card-surface);
  color: var(--Secondary-Text-color);
  box-shadow: 0 1px 4px rgb(0 0 0 / 12%);
  cursor: pointer;
  transition: color 0.2s, background-color 0.2s;
}

.selectable-card__remove:hover {
  color: var(--Primary-Text-color);
  background: var(--surface-muted);
}

.selectable-card {
  width: 100%;
  cursor: pointer;
  border-radius: 1rem;
  transition: transform 0.2s;
}

.selectable-card:hover {
  transform: translateY(-2px);
}

.selectable-card__image-wrap {
  position: relative;
  aspect-ratio: 1;
  border-radius: 1rem;
  overflow: hidden;
  border: 2px solid var(--input-border);
  background: var(--card-surface);
  transition: border-color 0.2s;
}

.selectable-card--selected .selectable-card__image-wrap {
  border-color: var(--Secondary-Brand-color);
  box-shadow: 0 0 0 1px rgb(142 211 33 / 25%);
}

.selectable-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.selectable-card__placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--Disabled-Text-color);
  background: var(--surface-muted);
}

.selectable-card__badge {
  position: absolute;
  top: 0.4rem;
  inset-inline-end: 0.4rem;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 9999px;
  border: 2px solid var(--input-border);
  background: rgb(255 255 255 / 92%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.selectable-card__badge--selected {
  border-color: var(--Secondary-Brand-color);
  background: var(--Secondary-Brand-color);
}
</style>
