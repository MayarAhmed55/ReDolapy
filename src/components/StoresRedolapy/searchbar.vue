<template>
  <div class="store-search-row">
    <div class="store-search" :class="{ 'store-search--rtl': isRtl }">
      <svg
        class="store-search__icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <path stroke-linecap="round" d="M20 20l-3.5-3.5" />
      </svg>
      <input
        type="search"
        class="store-search__input"
        :value="modelValue"
        :placeholder="$t('store.search_placeholder')"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </div>

    <button
      type="button"
      class="store-search__filter-btn"
      :aria-label="$t('store.filter_aria')"
      @click="$emit('open-filters')"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true">
        <path stroke-linecap="round" d="M4 7h16M7 12h10M10 17h4" />
        <circle cx="8" cy="7" r="2" fill="currentColor" stroke="none" />
        <circle cx="14" cy="12" r="2" fill="currentColor" stroke="none" />
        <circle cx="11" cy="17" r="2" fill="currentColor" stroke="none" />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: 'StoreSearchbar',
  emits: ['update:modelValue', 'open-filters'],
  props: {
    modelValue: { type: String, default: '' },
  },
  computed: {
    isRtl() {
      return this.$i18n.locale === 'ar'
    },
  },
}
</script>

<style scoped>
.store-search-row {
  display: flex;
  align-items: stretch;
  gap: 0.75rem;
  width: 100%;
}

.store-search {
  position: relative;
  flex: 1;
  min-width: 0;
}

.store-search__icon {
  position: absolute;
  top: 50%;
  inset-inline-start: 1.125rem;
  transform: translateY(-50%);
  width: 1.125rem;
  height: 1.125rem;
  color: #a0a6b2;
  pointer-events: none;
}


.store-search--rtl .store-search__icon {
  top: 0.625rem;
  inset-inline-start: 50%;
  inset-inline-end: auto;
  transform: translateX(-50%);
}

.store-search__input {
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 2.75rem;
  border: 1px solid #e8eaee;
  border-radius: 9999px;
  background: #ffffff;
  font-family: 'Roboto', sans-serif;
  font-size: 0.9375rem;
  color: var(--Primary-Text-color);
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.store-search--rtl .store-search__input {
  padding: 2.125rem 1rem 0.75rem;
  text-align: center;
}

.store-search__input::placeholder {
  color: #a0a6b2;
}

.store-search__input:focus {
  border-color: var(--Primary-Brand-color);
  box-shadow: 0 0 0 3px rgba(64, 185, 255, 0.12);
}

.store-search__filter-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 3rem;
  height: 3rem;
  border: 1px solid #e8eaee;
  border-radius: 0.875rem;
  background: #ffffff;
  color: var(--Primary-Text-color);
  cursor: pointer;
  transition: border-color 0.2s, background-color 0.2s;
}

.store-search__filter-btn:hover {
  border-color: var(--Primary-Brand-color);
  background: #f8fbff;
}

.store-search__filter-btn svg {
  width: 1.25rem;
  height: 1.25rem;
}

@media (min-width: 1024px) {
  .store-search__filter-btn {
    display: none;
  }

  .store-search--rtl .store-search__icon {
    top: 50%;
    inset-inline-start: auto;
    inset-inline-end: 1.125rem;
    transform: translateY(-50%);
  }

  .store-search--rtl .store-search__input {
    padding: 0.875rem 2.75rem 0.875rem 1rem;
    text-align: start;
  }
}
</style>
