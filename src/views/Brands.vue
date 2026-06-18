<template>
  <div class="store-page">
    <div class="store-page__sidebar">
      <FilterSidebar
        :filters="filters"
        :filter-options="filterOptions"
        :mobile-open="filterOpen"
        @update:filters="filters = $event"
        @close="filterOpen = false"
      />
    </div>

    <main class="store-page__main">
      <header class="store-page__header">
        <h1 class="store-page__title">{{ $t('store.title') }}</h1>
      </header>

      <StoreSearchbar
        v-model="searchQuery"
        class="store-page__search"
        @open-filters="filterOpen = true"
      />

      <div class="store-page__promo store-page__promo--mobile">
        {{ $t('store.promo_mobile_start') }}
         {{ $t('store.promo_discount') }}
        {{ $t('store.promo_mobile_mid') }}
        <span class="store-page__promo-install">{{ $t('store.promo_highlight') }}</span>
      </div>

      <p class="store-page__promo store-page__promo--desktop">
        {{ $t('store.promo_prefix') }}
        <span class="store-page__promo-highlight">{{ $t('store.promo_highlight') }}</span>
      </p>

      <p v-if="loadError" class="store-page__error">{{ loadError }}</p>

      <div v-if="loading" class="store-page__loading">{{ $t('store.loading') }}</div>

      <StoreProducts
        v-else
        :products="filteredProducts"
        show-see-match
        :wardrobe-match-product-ids="wardrobeMatchProductIdsList"
        @try-on="onTryOn"
        @see-match="onSeeMatch"
        @wishlist-error="onWishlistError"
      />

      <ProductMatchModal
        :open="matchModalOpen"
        :matches="productMatches"
        :loading="matchLoading"
        :error="matchError"
        @close="closeMatchModal"
        @view-details="onViewWardrobeDetails"
      />
    </main>
  </div>
</template>

<script>
import FilterSidebar from '../components/StoresRedolapy/filterSidebar.vue'
import StoreSearchbar from '../components/StoresRedolapy/searchbar.vue'
import StoreProducts from '../components/StoresRedolapy/StoreProducts.vue'
import ProductMatchModal from '../components/StoresRedolapy/ProductMatchModal.vue'
import { fetchProducts, fetchStores } from '../api/store.js'
import { mapApiError } from '../utils/mapApiError.js'
import {
  buildFilterOptions,
  createDefaultFilters,
  filterProducts,
  normalizeProduct,
} from '../utils/storeHelpers.js'
import { useFavorites } from '../composables/useFavorites.js'
import { useProductMatch } from '../composables/useProductMatch.js'
import { useWardrobeStore } from '../stores/wardrobe.js'
import { API_ERROR_CODES } from '../utils/apiError.js'

export default {
  name: 'Brands',
  components: {
    FilterSidebar,
    StoreSearchbar,
    StoreProducts,
    ProductMatchModal,
  },
  setup() {
    const { loadFavorites } = useFavorites()
    const wardrobeStore = useWardrobeStore()
    const productMatch = useProductMatch()
    return { loadFavorites, wardrobeStore, ...productMatch }
  },
  data: () => ({
    searchQuery: '',
    filterOpen: false,
    loading: true,
    loadError: '',
    products: [],
    activeMatchProductId: '',
    filterOptions: {
      brands: [],
      colors: [],
      seasons: [],
      categories: [],
      minPrice: 0,
      maxPrice: 0,
      currency: 'USD',
    },
    filters: {
      brands: [],
      colors: [],
      seasons: [],
      categories: [],
      minPrice: 0,
      maxPrice: 0,
    },
  }),
  watch: {
    filterOpen(open) {
      document.body.style.overflow = open ? 'hidden' : ''
    },
  },
  async mounted() {
    window.scrollTo({ top: 0, left: 0 })
    await Promise.all([
      this.loadStoreData(),
      this.loadFavorites(),
      this.loadWardrobe(),
    ])
    this.scanWardrobeMatches()
  },
  beforeUnmount() {
    document.body.style.overflow = ''
  },
  computed: {
    filteredProducts() {
      return filterProducts(this.products, this.filters, this.searchQuery, {
        min: this.filterOptions.minPrice,
        max: this.filterOptions.maxPrice,
      })
    },
    wardrobeMatchProductIdsList() {
      return [...this.wardrobeMatchProductIds]
    },
  },
  methods: {
    async loadStoreData() {
      this.loading = true
      this.loadError = ''

      try {
        const [stores, rawProducts] = await Promise.all([
          fetchStores(),
          fetchProducts(),
        ])

        this.products = (Array.isArray(rawProducts) ? rawProducts : [])
          .filter((product) => product.is_active !== false)
          .map(normalizeProduct)

        this.filterOptions = buildFilterOptions(
          Array.isArray(stores) ? stores : [],
          this.products,
        )
        this.filters = createDefaultFilters(this.filterOptions)
      } catch (err) {
        this.loadError = mapApiError(err, this.$t.bind(this))
      } finally {
        this.loading = false
      }
    },
    onTryOn(product) {
      this.$router.push({
        path: '/TryOn',
        query: { productId: product.id },
      })
    },
    async loadWardrobe() {
      try {
        await this.wardrobeStore.fetchAll()
      } catch (err) {
        if (err.message !== API_ERROR_CODES.LOGIN_REQUIRED) {
          console.warn('Failed to preload wardrobe for match details', err)
        }
      }
    },
    async onSeeMatch(product) {
      this.activeMatchProductId = product?.id || ''
      await this.openSeeMatch(product, this.$t.bind(this))
    },
    closeMatchModal() {
      this.activeMatchProductId = ''
      this.resetProductMatchModal()
    },
    scanWardrobeMatches() {
      if (!localStorage.getItem('token') || !this.wardrobeStore.items?.length) return
      const productIds = this.filteredProducts.map((product) => product.id)
      this.scanProductsForWardrobeMatches(productIds)
    },
    async onViewWardrobeDetails(itemId) {
      if (!itemId) return

      const item = this.wardrobeStore.getItemById(itemId)
      if (!item) {
        try {
          await this.wardrobeStore.fetchAll()
        } catch {
          // Navigation still works if item exists server-side
        }
      }

      this.closeMatchModal()
      await this.$nextTick()
      await this.$router.push(`/wardrobe/${itemId}`)
    },
    onWishlistError(err) {
      if (err.code === 'LOGIN_REQUIRED' || err.message === 'LOGIN_REQUIRED') {
        this.$router.push({ path: '/login', query: { redirect: this.$route.fullPath } })
      }
    },
  },
}
</script>

<style scoped>
.store-page {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.5rem 0 3rem;
  font-family: 'Roboto', sans-serif;
}

@media (min-width: 1024px) {
  .store-page {
    flex-direction: row;
    align-items: flex-start;
    gap: 2rem;
  }
}

.store-page__sidebar {
  flex-shrink: 0;
}

@media (max-width: 1023px) {
  .store-page__sidebar {
    width: 0;
    height: 0;
    overflow: hidden;
    margin: 0;
    padding: 0;
  }
}

@media (min-width: 1024px) {
  .store-page__sidebar {
    width: 17rem;
    position: sticky;
    top: 1rem;
    align-self: flex-start;
  }
}

.store-page__main {
  flex: 1;
  min-width: 0;
}

.store-page__header {
  margin-bottom: 1rem;
}

@media (min-width: 1024px) {
  .store-page__header {
    margin-bottom: 1.25rem;
  }
}

.store-page__title {
  font-size: clamp(1.5rem, 4vw, 2.25rem);
  font-weight: var(--Bold);
  color: var(--Primary-Text-color);
  margin: 0;
}

.store-page__search {
  margin-bottom: 1rem;
}

@media (min-width: 1024px) {
  .store-page__search {
    margin-bottom: 1.25rem;
  }
}

.store-page__promo {
  font-size: 0.9375rem;
  color: var(--Secondary-Text-color);
  line-height: 1.55;
  margin-bottom: 1.25rem;
}

.store-page__promo--mobile {
  display: block;
  padding: 1rem 1.125rem;
  border-radius: 0.875rem;
  font-size: 0.875rem;
}

.store-page__promo--desktop {
  display: none;
}

@media (min-width: 1024px) {
  .store-page__promo--mobile {
    display: none;
  }

  .store-page__promo--desktop {
    display: block;
    margin-bottom: 1.5rem;
  }
}



.store-page__promo-install {
  font-weight: var(--Bold);
  background: var(--Gradient-bgc);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.store-page__promo-highlight {
  font-weight: var(--Semi-Bold);
  background: var(--Gradient-bgc);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.store-page__loading,
.store-page__error {
  padding: 2rem 1rem;
  text-align: center;
  font-size: 0.9375rem;
}

.store-page__error {
  color: #c62828;
}

.store-page__loading {
  color: var(--Secondary-Text-color);
}
</style>
