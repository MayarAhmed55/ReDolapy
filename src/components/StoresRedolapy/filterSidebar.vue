<template>
  <div class="filter-wrapper">
    <div
      v-if="mobileOpen"
      class="filter-wrapper__backdrop"
      aria-hidden="true"
      @click="$emit('close')"
    />

    <aside
      v-show="!isMobile || mobileOpen"
      class="filter-sidebar"
      :class="{ 'filter-sidebar--mobile-open': mobileOpen }"
      :aria-hidden="isMobile && !mobileOpen"
    >
      <!-- Mobile drawer header -->
      <header class="filter-sidebar__mobile-header">
        <button
          type="button"
          class="filter-sidebar__close-btn"
          :aria-label="$t('store.close_filters')"
          @click="$emit('close')"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path stroke-linecap="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        <h2 class="filter-sidebar__mobile-title">{{ $t('store.filters') }}</h2>
        <button type="button" class="filter-sidebar__reset filter-sidebar__reset--mobile" @click="resetAll">
          {{ $t('store.reset_all') }}
        </button>
      </header>

      <!-- Desktop header -->
      <header class="filter-sidebar__desktop-header">
        <div class="filter-sidebar__title-row">
          <svg class="filter-sidebar__icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path stroke="currentColor" stroke-width="1.75" stroke-linecap="round" d="M4 7h16M7 12h10M10 17h4" />
            <circle cx="8" cy="7" r="2" fill="currentColor" stroke="none" />
            <circle cx="14" cy="12" r="2" fill="currentColor" stroke="none" />
            <circle cx="11" cy="17" r="2" fill="currentColor" stroke="none" />
          </svg>
          <h2 class="filter-sidebar__title">{{ $t('store.filters') }}</h2>
        </div>
        <button type="button" class="filter-sidebar__reset" @click="resetAll">
          {{ $t('store.reset_all') }}
        </button>
      </header>

      <FilterSection :title="$t('store.brands')" :open="openSections.brands" @toggle="toggleSection('brands')">
        <div class="filter-sidebar__checkbox-list filter-sidebar__checkbox-list--between">
          <label
            v-for="brand in brandOptions"
            :key="brand.id"
            class="filter-sidebar__checkbox filter-sidebar__checkbox--between"
          >
            <span>{{ brand.label }}</span>
            <input
              type="checkbox"
              class="filter-sidebar__checkbox-input filter-sidebar__checkbox-input--square"
              :checked="filters.brands.includes(brand.id)"
              @change="toggleBrand(brand.id)"
            />
          </label>
        </div>
      </FilterSection>

      <FilterSection :title="$t('store.colors')" :open="openSections.colors" @toggle="toggleSection('colors')">
        <div class="filter-sidebar__colors">
          <button
            v-for="color in colorOptions"
            :key="color.id"
            type="button"
            class="filter-sidebar__color-swatch"
            :class="{ 'filter-sidebar__color-swatch--active': filters.colors.includes(color.id) }"
            :style="{ backgroundColor: color.hex }"
            :aria-label="color.label"
            @click="toggleColor(color.id)"
          />
        </div>
      </FilterSection>

      <FilterSection :title="$t('store.season')" :open="openSections.season" @toggle="toggleSection('season')">
        <div class="filter-sidebar__pills">
          <button
            v-for="season in seasonOptions"
            :key="season.id"
            type="button"
            class="filter-sidebar__pill"
            :class="{ 'filter-sidebar__pill--active': filters.seasons.includes(season.id) }"
            @click="toggleSeason(season.id)"
          >
            {{ season.label }}
          </button>
        </div>
      </FilterSection>

      <FilterSection :title="$t('store.categories')" :open="openSections.categories" @toggle="toggleSection('categories')">
        <div class="filter-sidebar__category-grid">
          <label
            v-for="category in categoryOptions"
            :key="category.id"
            class="filter-sidebar__category-btn"
            :class="{ 'filter-sidebar__category-btn--active': filters.categories.includes(category.id) }"
          >
            <input
              type="checkbox"
              class="filter-sidebar__checkbox-input filter-sidebar__checkbox-input--square"
              :checked="filters.categories.includes(category.id)"
              @change="toggleCategory(category.id)"
            />
            <span>{{ category.label }}</span>
          </label>
        </div>
      </FilterSection>

      <FilterSection
        v-if="maxPrice > minPrice || maxPrice > 0"
        :title="$t('store.price_range')"
        :open="openSections.price"
        @toggle="toggleSection('price')"
      >
        <div class="filter-sidebar__price">
          <div class="filter-sidebar__price-value">
            {{ priceDisplay }}
          </div>
          <input
            type="range"
            class="filter-sidebar__slider"
            :min="minPrice"
            :max="maxPrice"
            :value="filters.maxPrice"
            @input="onPriceChange"
          />
          <div class="filter-sidebar__price-labels">
            <span>{{ minPrice }} {{ currencyLabel }}</span>
            <span>{{ maxPrice }} {{ currencyLabel }}</span>
          </div>
        </div>
      </FilterSection>
    </aside>
  </div>
</template>

<script>
import FilterSection from './FilterSection.vue'

export default {
  name: 'FilterSidebar',
  components: { FilterSection },
  emits: ['update:filters', 'close'],
  props: {
    filters: {
      type: Object,
      required: true,
    },
    filterOptions: {
      type: Object,
      default: () => ({
        brands: [],
        colors: [],
        seasons: [],
        categories: [],
        minPrice: 0,
        maxPrice: 0,
        currency: 'USD',
      }),
    },
    mobileOpen: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    openSections: {
      brands: true,
      colors: true,
      season: true,
      categories: true,
      price: true,
    },
    isMobile: typeof window !== 'undefined' ? window.innerWidth < 1024 : true,
  }),
  computed: {
    brandOptions() {
      return this.filterOptions.brands
    },
    colorOptions() {
      return this.filterOptions.colors
    },
    seasonOptions() {
      return this.filterOptions.seasons.map((season) => ({
        id: season.id,
        label: this.seasonLabel(season.id, season.label),
      }))
    },
    categoryOptions() {
      return this.filterOptions.categories.map((category) => ({
        id: category.id,
        label: this.categoryLabel(category.id, category.label),
      }))
    },
    minPrice() {
      return this.filterOptions.minPrice
    },
    maxPrice() {
      return this.filterOptions.maxPrice
    },
    currencyLabel() {
      return this.filterOptions.currency || this.$t('store.currency')
    },
    priceDisplay() {
      return `${this.minPrice} — ${this.filters.maxPrice} ${this.currencyLabel}`
    },
  },
  mounted() {
    this.checkMobile()
    window.addEventListener('resize', this.checkMobile, { passive: true })
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkMobile)
  },
  methods: {
    checkMobile() {
      this.isMobile = window.innerWidth < 1024
    },
    seasonLabel(id, fallback) {
      const key = `store.seasons.${id}`
      return this.$te(key) ? this.$t(key) : fallback
    },
    categoryLabel(id, fallback) {
      const key = `store.category_options.${id}`
      return this.$te(key) ? this.$t(key) : fallback
    },
    toggleSection(key) {
      this.openSections[key] = !this.openSections[key]
    },
    emitFilters(next) {
      this.$emit('update:filters', next)
    },
    resetAll() {
      this.emitFilters({
        brands: [],
        colors: [],
        seasons: [],
        categories: [],
        maxPrice: this.maxPrice,
      })
    },
    toggleBrand(id) {
      const brands = this.filters.brands.includes(id)
        ? this.filters.brands.filter(b => b !== id)
        : [...this.filters.brands, id]
      this.emitFilters({ ...this.filters, brands })
    },
    toggleColor(id) {
      const colors = this.filters.colors.includes(id)
        ? this.filters.colors.filter(c => c !== id)
        : [...this.filters.colors, id]
      this.emitFilters({ ...this.filters, colors })
    },
    toggleSeason(id) {
      const seasons = this.filters.seasons.includes(id)
        ? this.filters.seasons.filter(s => s !== id)
        : [...this.filters.seasons, id]
      this.emitFilters({ ...this.filters, seasons })
    },
    toggleCategory(id) {
      const categories = this.filters.categories.includes(id)
        ? this.filters.categories.filter(c => c !== id)
        : [...this.filters.categories, id]
      this.emitFilters({ ...this.filters, categories })
    },
    onPriceChange(e) {
      this.emitFilters({ ...this.filters, maxPrice: Number(e.target.value) })
    },
  },
}
</script>

<style scoped>
.filter-wrapper {
  position: relative;
}

.filter-wrapper__backdrop {
  position: fixed;
  inset: 0;
  z-index: 40;
  background: rgba(18, 24, 38, 0.35);
}

.filter-sidebar {
  --store-card-bg: #ffffff;
  --store-border: #e8eaee;
  --store-muted: #a0a6b2;
  --store-filter-text: #4b5563;

  display: none;
  position: fixed;
  inset: 0;
  z-index: 50;
  border-radius: 0;
  padding: 1.25rem 1.5rem 2rem;
  overflow-y: auto;
  box-shadow: none;
  background: var(--store-card-bg);
  font-family: 'Roboto', sans-serif;
}

.filter-sidebar--mobile-open {
  display: block;
}

@media (min-width: 1024px) {
  .filter-sidebar {
    display: block;
    position: static;
    inset: auto;
    z-index: auto;
    border-radius: 1.25rem;
    padding: 1.5rem 1.25rem;
    overflow-y: visible;
    box-shadow: 0 4px 24px rgba(18, 24, 38, 0.06);
  }

  .filter-sidebar--mobile-open {
    display: block;
  }
}

.filter-sidebar__mobile-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  position: relative;
}

@media (min-width: 1024px) {
  .filter-sidebar__mobile-header {
    display: none;
  }
}

.filter-sidebar__desktop-header {
  display: none;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
}

@media (min-width: 1024px) {
  .filter-sidebar__desktop-header {
    display: flex;
  }
}

.filter-sidebar__close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: none;
  background: none;
  color: var(--Primary-Text-color);
  cursor: pointer;
  padding: 0;
}

.filter-sidebar__close-btn svg {
  width: 1.25rem;
  height: 1.25rem;
}

.filter-sidebar__mobile-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1.125rem;
  font-weight: var(--Bold);
  color: #006699;
  margin: 0;
}

.filter-sidebar__title-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.filter-sidebar__icon {
  width: 1.25rem;
  height: 1.25rem;
  color: var(--Primary-Brand-color);
  flex-shrink: 0;
}

.filter-sidebar__title {
  font-size: 1.125rem;
  font-weight: var(--Bold);
  color: var(--Primary-Text-color);
  margin: 0;
}

.filter-sidebar__reset {
  border: none;
  background: none;
  font-size: 0.8125rem;
  color: var(--store-muted);
  cursor: pointer;
  padding: 0.25rem 0;
  font-family: inherit;
  transition: color 0.2s;
}

.filter-sidebar__reset:hover {
  color: var(--Primary-Brand-color);
}

.filter-sidebar__reset--mobile {
  color: var(--Primary-Brand-color);
  font-weight: var(--Semi-Bold);
}

.filter-sidebar__title-row + .filter-section,
.filter-sidebar__desktop-header + .filter-section,
.filter-sidebar__mobile-header + .filter-section {
  border-top: none;
  padding-top: 0;
}

.filter-sidebar__checkbox-list {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}

.filter-sidebar__checkbox {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  font-size: 0.9375rem;
  color: var(--store-filter-text);
  cursor: pointer;
}

.filter-sidebar__checkbox--between {
  justify-content: space-between;
  flex-direction: row;
}

.filter-sidebar__checkbox-input {
  appearance: none;
  width: 1.125rem;
  height: 1.125rem;
  border: 1.5px solid var(--store-border);
  border-radius: 9999px;
  cursor: pointer;
  flex-shrink: 0;
  transition: border-color 0.2s, background-color 0.2s;
  order: 2;
}

.filter-sidebar__checkbox-input--square {
  border-radius: 0.25rem;
}

.filter-sidebar__checkbox-input:checked {
  border-color: var(--Primary-Brand-color);
  background-color: var(--Primary-Brand-color);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 10' fill='none'%3E%3Cpath d='M1 5l3 3 7-7' stroke='white' stroke-width='1.75' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 0.625rem;
  box-shadow: none;
}

.filter-sidebar__colors {
  display: flex;
  flex-wrap: wrap;
  gap: 0.875rem;
}

.filter-sidebar__color-swatch {
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 9999px;
  border: 2px solid transparent;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.filter-sidebar__color-swatch:last-child {
  border-color: var(--store-border);
}

.filter-sidebar__color-swatch--active {
  box-shadow: 0 0 0 2px white, 0 0 0 4px var(--Primary-Brand-color);
  transform: scale(1.05);
}

.filter-sidebar__pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.filter-sidebar__pill {
  padding: 0.375rem 0.875rem;
  border-radius: 9999px;
  border: 1px solid var(--store-border);
  background: white;
  font-size: 0.8125rem;
  color: var(--store-filter-text);
  cursor: pointer;
  transition: border-color 0.2s, background-color 0.2s, color 0.2s;
}

.filter-sidebar__pill--active {
  border-color: var(--Primary-Brand-color);
  background: #eef6fc;
  color: var(--Primary-Text-color);
  font-weight: var(--Semi-Bold);
}

.filter-sidebar__category-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.625rem;
}

@media (min-width: 1024px) {
  .filter-sidebar__category-grid {
    display: flex;
    flex-direction: column;
    gap: 0.875rem;
  }
}

.filter-sidebar__category-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 0.75rem;
  border-radius: 0.625rem;

  background: white;
  font-size: 0.875rem;
  color: var(--store-filter-text);
  cursor: pointer;
  transition: border-color 0.2s, background-color 0.2s;
}

.filter-sidebar__category-btn--active {
  background: #eef6fc;
  color: var(--Primary-Text-color);
  font-weight: var(--Semi-Bold);
}

.filter-sidebar__price {
  padding-top: 0.25rem;
}

.filter-sidebar__price-value {
  font-size: 0.875rem;
  color: var(--Primary-Brand-color);
  font-weight: var(--Semi-Bold);
  margin-bottom: 0.75rem;
  text-align: end;
}

@media (min-width: 1024px) {
  .filter-sidebar__price-value {
    display: none;
  }
}

.filter-sidebar__slider {
  width: 100%;
  height: 0.375rem;
  appearance: none;
  background: #d6ecfa;
  border-radius: 9999px;
  outline: none;
  cursor: pointer;
}

.filter-sidebar__slider::-webkit-slider-thumb {
  appearance: none;
  width: 1.125rem;
  height: 1.125rem;
  border-radius: 9999px;
  background: var(--Primary-Brand-color);
  box-shadow: 0 2px 6px rgba(64, 185, 255, 0.4);
  cursor: pointer;
}

.filter-sidebar__slider::-moz-range-thumb {
  width: 1.125rem;
  height: 1.125rem;
  border: none;
  border-radius: 9999px;
  background: var(--Primary-Brand-color);
  box-shadow: 0 2px 6px rgba(64, 185, 255, 0.4);
  cursor: pointer;
}

.filter-sidebar__price-labels {
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
  font-size: 0.8125rem;
  color: var(--store-muted);
}
</style>
