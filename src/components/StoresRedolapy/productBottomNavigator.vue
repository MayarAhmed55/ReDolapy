<template>
  <nav
    class="product-nav"
    :class="{ 'product-nav--rtl': isRtl }"
    :aria-label="$t('store.pagination.aria')"
  >
    <button
      type="button"
      class="product-nav__arrow"
      :disabled="currentPage <= 1"
      :aria-label="$t('store.pagination.prev')"
      @click="goToPage(currentPage - 1)"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" :d="prevArrowPath" />
      </svg>
    </button>

    <div class="product-nav__pages">
      <button
        v-for="page in visiblePages"
        :key="page"
        type="button"
        class="product-nav__page"
        :class="{ 'product-nav__page--active': page === currentPage }"
        :aria-label="$t('store.pagination.go_to_page', { page })"
        :aria-current="page === currentPage ? 'page' : undefined"
        @click="goToPage(page)"
      >
        {{ page }}
      </button>
    </div>

    <button
      type="button"
      class="product-nav__arrow"
      :disabled="currentPage >= totalPages"
      :aria-label="$t('store.pagination.next')"
      @click="goToPage(currentPage + 1)"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" :d="nextArrowPath" />
      </svg>
    </button>
  </nav>
</template>

<script>
export default {
  name: 'ProductBottomNavigator',
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
  },
  emits: ['update:currentPage'],
  computed: {
    isRtl() {
      return this.$i18n?.locale === 'ar'
    },
    prevArrowPath() {
      return this.isRtl ? 'M9 5l7 7-7 7' : 'M15 19l-7-7 7-7'
    },
    nextArrowPath() {
      return this.isRtl ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'
    },
    visiblePages() {
      const total = this.totalPages
      const current = this.currentPage
      const maxVisible = 5

      if (total <= maxVisible) {
        return Array.from({ length: total }, (_, i) => i + 1)
      }

      let start = Math.max(1, current - 2)
      let end = Math.min(total, start + maxVisible - 1)

      if (end - start < maxVisible - 1) {
        start = Math.max(1, end - maxVisible + 1)
      }

      return Array.from({ length: end - start + 1 }, (_, i) => start + i)
    },
  },
  methods: {
    goToPage(page) {
      if (page < 1 || page > this.totalPages || page === this.currentPage) return
      this.$emit('update:currentPage', page)
    },
  },
}
</script>

<style scoped>
.product-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
}

.product-nav--rtl {
  flex-direction: row-reverse;
}

.product-nav--rtl .product-nav__pages {
  flex-direction: row-reverse;
}

.product-nav__arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 9999px;
  border: 1px solid var(--store-border);
  background: var(--card-surface);
  color: var(--Primary-Text-color);
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s, background-color 0.2s;
}

.product-nav__arrow svg {
  width: 1rem;
  height: 1rem;
}

.product-nav__arrow:hover:not(:disabled) {
  border-color: var(--Primary-Brand-color);
  color: var(--Primary-Brand-color);
}

.product-nav__arrow:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.product-nav__pages {
  display: flex;
  align-items: center;
  gap: 0.375rem;
}

.product-nav__page {
  min-width: 2.25rem;
  height: 2.25rem;
  padding: 0 0.5rem;
  border-radius: 9999px;
  border: 1px solid transparent;
  background: transparent;
  color: var(--Secondary-Text-color);
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s, background-color 0.2s;
}

.product-nav__page:hover:not(.product-nav__page--active) {
  color: var(--Primary-Text-color);
  background: var(--surface-muted);
}

.product-nav__page--active {
  border-color: var(--Primary-Brand-color);
  background: var(--Primary-Brand-color);
  color: #fff;
}
</style>
