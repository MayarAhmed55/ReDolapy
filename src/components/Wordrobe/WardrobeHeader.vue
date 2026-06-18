<template>
  <header class="mb-6 sm:mb-8 bg-(--card-surface) p-4 rounded-xl shadow-sm shadow-gray-400/10">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5 sm:mb-6">
      <div>
        <h1 class="text-xl sm:text-2xl lg:text-3xl font-bold text-(--Primary-Text-color)">
          {{ $t('wardrobe.header.title') }}
        </h1>
        <p class="text-sm text-(--Secondary-Text-color) mt-1">
          {{ $t('wardrobe.header.subtitle') }}
        </p>
      </div>

      <router-link
        to="/Recommendation"
        class="wardrobe-recommend-btn shrink-0 self-start sm:self-auto"
      >
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
        {{ $t('wardrobe.header.recommendation') }}
      </router-link>
    </div>

    <div class="flex flex-wrap gap-2 sm:gap-2.5">
      <button
        v-for="category in categories"
        :key="category"
        type="button"
        class="category-chip"
        :class="{ 'category-chip--active': activeCategory === category }"
        @click="$emit('filter', category)"
      >
        {{ $t(`wardrobe.categories.${category}`) }}
      </button>
    </div>
  </header>
</template>

<script>
import { WARDROBE_CATEGORIES } from '../../api/wardrobe.js'

export default {
  name: 'WardrobeHeader',
  props: {
    activeCategory: { type: String, default: 'all' },
  },
  emits: ['filter'],
  data: () => ({
    categories: WARDROBE_CATEGORIES,
  }),
}
</script>

<style scoped>
.wardrobe-recommend-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  border-radius: 0.75rem;
  font-size: 0.8125rem;
  font-weight: 600;
  color: #fff;
  background: var(--Gradient-bgc);
  text-decoration: none;
  transition: opacity 0.2s;
}

.wardrobe-recommend-btn:hover {
  opacity: 0.92;
}

.category-chip {
  padding: 0.45rem 1rem;
  border-radius: 9999px;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--store-filter-text);
  background: var(--card-surface);
  border: 1px solid var(--card-border);
  transition: border-color 0.2s, background-color 0.2s, color 0.2s;
}

.category-chip:hover {
  border-color: var(--Primary-Brand-color);
}

.category-chip--active {
  color: var(--Primary-Brand-color);
  background: var(--surface-active);
  border-color: var(--Primary-Brand-color);
}
</style>
