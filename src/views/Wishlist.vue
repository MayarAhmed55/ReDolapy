<template>
  <div class="store-page" :class="{ 'store-page--empty': !hasWishlistItems }">
    <div v-if="hasWishlistItems" class="store-page__sidebar">
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
        <h1 class="store-page__title">{{ $t('wishlist.title') }}</h1>
        <p class="store-page__subtitle">
          {{ $t('wishlist.subtitle_prefix') }}
          <span class="store-page__subtitle-highlight">{{ $t('wishlist.subtitle_highlight') }}</span>
        </p>
      </header>

      <StoreSearchbar
        v-if="hasWishlistItems"
        v-model="searchQuery"
        class="store-page__search"
        @open-filters="filterOpen = true"
      />

      <p v-if="loadError" class="store-page__error">{{ loadError }}</p>

      <div v-if="loading" class="store-page__loading">{{ $t('wishlist.loading') }}</div>

      <WishlistEmpty v-else-if="!wishlistProducts.length" />

      <template v-else>
        <p v-if="!filteredProducts.length" class="store-page__no-matches">
          {{ $t('wishlist.no_matches') }}
        </p>

        <StoreProducts
          v-else
          :products="filteredProducts"
          show-see-match
          :wardrobe-match-product-ids="wardrobeMatchProductIdsList"
          @try-on="onTryOn"
          @see-match="onSeeMatch"
          @wishlist-error="onWishlistError"
        />
      </template>

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
import WishlistEmpty from '../components/StoresRedolapy/WishlistEmpty.vue'
import ProductMatchModal from '../components/StoresRedolapy/ProductMatchModal.vue'
import { fetchProducts, fetchStores } from '../api/store.js'
import { mapApiError } from '../utils/mapApiError.js'
import { useFavorites } from '../composables/useFavorites.js'
import { useProductMatch } from '../composables/useProductMatch.js'
import { useWardrobeStore } from '../stores/wardrobe.js'
import { API_ERROR_CODES } from '../utils/apiError.js'
import {
  buildFilterOptions,
  createDefaultFilters,
  filterProducts,
  normalizeProduct,
} from '../utils/storeHelpers.js'

export default {
  name: 'Wishlist',
  components: {
    FilterSidebar,
    StoreSearchbar,
    StoreProducts,
    WishlistEmpty,
    ProductMatchModal,
  },
  setup() {
    const { favorites, loadFavorites, normalizeFavoriteId } = useFavorites()
    const wardrobeStore = useWardrobeStore()
    const productMatch = useProductMatch()
    return { favorites, loadFavorites, normalizeFavoriteId, wardrobeStore, ...productMatch }
  },
  data: () => ({
    searchQuery: '',
    filterOpen: false,
    loading: true,
    loadError: '',
    products: [],
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
    if (!localStorage.getItem('token')) {
      this.$router.push({ path: '/login', query: { redirect: this.$route.fullPath } })
      return
    }

    await this.loadFavorites(true)
    await this.loadWishlistData()
    await this.loadWardrobe()
    this.scanWardrobeMatches()
  },
  beforeUnmount() {
    document.body.style.overflow = ''
  },
  computed: {
    hasWishlistItems() {
      return !this.loading && this.wishlistProducts.length > 0
    },
    wishlistProducts() {
      const favoriteIds = new Set(
        this.favorites
          .filter((entry) => entry.itemType === 'PRODUCT')
          .map((entry) => this.normalizeFavoriteId(entry.itemId)),
      )
      return this.products.filter((product) => favoriteIds.has(this.normalizeFavoriteId(product.id)))
    },
    filteredProducts() {
      return filterProducts(this.wishlistProducts, this.filters, this.searchQuery, {
        min: this.filterOptions.minPrice,
        max: this.filterOptions.maxPrice,
      })
    },
    wardrobeMatchProductIdsList() {
      return [...this.wardrobeMatchProductIds]
    },
  },
  methods: {
    async loadWishlistData() {
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
          this.wishlistProducts.length ? this.wishlistProducts : this.products,
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
      await this.openSeeMatch(product, this.$t.bind(this), {
        getWardrobeItemById: (id) => this.wardrobeStore.getItemById(id),
        ensureWardrobeLoaded: () => this.wardrobeStore.fetchAll(),
      })
    },
    closeMatchModal() {
      this.resetProductMatchModal()
    },
    scanWardrobeMatches() {
      if (!localStorage.getItem('token') || !this.wardrobeStore.items?.length) return
      const productIds = this.wishlistProducts.map((product) => product.id)
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
      this.loadError = mapApiError(err, this.$t.bind(this))
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

.store-page--empty {
  max-width: 48rem;
  margin-inline: auto;
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
  margin: 0 0 0.5rem;
}

.store-page__subtitle {
  margin: 0;
  font-size: 0.9375rem;
  color: var(--Secondary-Text-color);
  line-height: 1.55;
}

.store-page__subtitle-highlight {
  font-weight: var(--Semi-Bold);
  color: var(--Primary-Brand-color);
}

.store-page__search {
  margin-bottom: 1rem;
}

@media (min-width: 1024px) {
  .store-page__search {
    margin-bottom: 1.25rem;
  }
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

.store-page__no-matches {
  padding: 2rem 1rem;
  text-align: center;
  font-size: 0.9375rem;
  color: var(--Secondary-Text-color);
}
</style>
