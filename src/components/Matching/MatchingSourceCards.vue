<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
    <button
      v-for="option in options"
      :key="option.id"
      type="button"
      class="source-card"
      :class="{ 'source-card--selected': modelValue === option.id }"
      :aria-pressed="modelValue === option.id"
      @click="$emit('update:modelValue', option.id)"
    >
      <span
        class="source-card__check"
        :class="{ 'source-card__check--selected': modelValue === option.id }"
        aria-hidden="true"
      >
        <svg v-if="modelValue === option.id" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </span>

      <div class="source-card__content">
        <p class="source-card__title">{{ option.title }}</p>
        <p class="source-card__desc">{{ option.description }}</p>
      </div>

      <div class="source-card__icon-wrap" aria-hidden="true">
        <img :src="option.icon" alt="" class="source-card__icon" />
      </div>
    </button>
  </div>
</template>

<script>
import hangerIcon from '../../assets/HangerIcon.svg'
import galleryIcon from '../../assets/GallaryIcon.svg'

export default {
  name: 'MatchingSourceCards',
  props: {
    modelValue: { type: String, default: '' },
  },
  emits: ['update:modelValue'],
  computed: {
    options() {
      return [
        {
          id: 'wardrobe',
          title: this.$t('matching.source.wardrobe_title'),
          description: this.$t('matching.source.wardrobe_desc'),
          icon: hangerIcon,
        },
        {
          id: 'gallery',
          title: this.$t('matching.source.gallery_title'),
          description: this.$t('matching.source.gallery_desc'),
          icon: galleryIcon,
        },
      ]
    },
  },
}
</script>

<style scoped>
.source-card {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 1rem 1.125rem;
  border-radius: 1.25rem;
  border: 1.5px solid var(--input-border);
  background: var(--card-surface);
  text-align: start;
  transition: border-color 0.2s, background-color 0.2s, box-shadow 0.2s;
}

.source-card:hover {
  border-color: var(--Primary-Brand-color);
}

.source-card--selected {
  border-color: var(--Primary-Brand-color);
  background: var(--surface-active);
  box-shadow: 0 0 0 1px rgb(64 185 255 / 12%);
}

.source-card__check {
  position: absolute;
  top: 0.75rem;
  inset-inline-end: 0.75rem;
  width: 1.375rem;
  height: 1.375rem;
  border-radius: 9999px;
  border: 2px solid var(--input-border);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background: transparent;
}

.source-card__check--selected {
  border-color: var(--Primary-Brand-color);
  background: var(--Primary-Brand-color);
}

.source-card__content {
  flex: 1;
  min-width: 0;
  padding-inline-end: 1.75rem;
}

.source-card__title {
  font-size: 0.9375rem;
  font-weight: 700;
  color: var(--Primary-Text-color);
  margin-bottom: 0.2rem;
}

.source-card__desc {
  font-size: 0.75rem;
  color: var(--Disabled-Text-color);
  line-height: 1.35;
}

.source-card__icon-wrap {
  flex-shrink: 0;
  width: 3.25rem;
  height: 3.25rem;
  border-radius: 0.875rem;
  background: rgb(64 185 255 / 12%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.source-card__icon {
  width: 1.5rem;
  height: 1.5rem;
  opacity: 0.85;
}
</style>
