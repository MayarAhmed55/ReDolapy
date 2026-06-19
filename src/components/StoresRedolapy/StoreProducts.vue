<template>
  <div v-if="!products.length" class="py-10 text-center text-slate-500 text-[15px]">
    {{ emptyMessage || $t('store.no_products') }}
  </div>

  <div v-else>
    <div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
      <article
        v-for="product in paginatedProducts"
        :key="product.id"
        class="group bg-(--card-surface) border border-gray-200 dark:border-zinc-800 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
      >
        <!-- Image Section -->
        <a
          :href="product.purchaseUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="relative block aspect-square bg-slate-100 dark:bg-zinc-900 overflow-hidden"
          :aria-label="$t('store.product.view_on_store')"
        >
<button
  type="button"
  class="absolute top-3 left-3 z-10 w-9 h-9 rounded-3xl bg-(--card-surface)/80 backdrop-blur-sm border border-gray-200 dark:border-zinc-700 flex items-center justify-center text-[var(--Disabled-Text-color)] hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-[var(--Primary-Brand-color)] transition-all group-hover:scale-110 lg:border-none lg:bg-transparent lg:hover:bg-(--card-surface)/70"
  :class="{ 
    'text-[var(--Primary-Brand-color)] bg-transparent border-transparent !shadow-none': isProductFavorited(product.id) 
  }"
  :aria-label="isProductFavorited(product.id) ? $t('store.product.remove_wishlist_aria') : $t('store.product.wishlist_aria')"
  :disabled="wishlistPending[product.id]"
  @click.stop.prevent="onToggleWishlist(product.id)"
>
  <svg viewBox="0 0 24 24" class="w-5 h-5" aria-hidden="true">
    <path
      d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
      :fill="isProductFavorited(product.id) ? 'currentColor' : 'none'"
      stroke="currentColor"
      stroke-width="1.75"
    />
  </svg>
</button>

          <span
            v-if="showWardrobeMatchBadge(product.id)"
            class="absolute top-3 right-3 z-10 px-2.5 py-1 text-[10px] sm:text-[11px] font-semibold text-white bg-[var(--Secondary-Brand-color)] rounded-full leading-none shadow-sm pointer-events-none"
          >
            {{ $t('store.product.match_wardrobe') }}
          </span>

          <img
            :src="product.image"
            :alt="product.name"
            class="w-full h-full object-cover"
            loading="lazy"
          />

          <!-- Hover Overlay -->
          <div class="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span class="flex items-center gap-2 text-white text-sm font-semibold">
              {{ $t('store.product.view_on_store') }}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </span>
          </div>
        </a>

        <!-- Content -->
        <div class="p-4 lg:p-5">
          <h3 class="text-[15px] font-semibold text-gray-900 dark:text-zinc-100 line-clamp-2 mb-3 leading-tight">
            {{ product.name }}
          </h3>

          <!-- Brand + Price -->
          <div class="flex items-center justify-between gap-2 mb-4 min-h-5">
            <img
              v-if="product.storeLogo"
              :src="product.storeLogo"
              :alt="product.storeName"
              class="h-4 max-w-[72px] object-contain object-left"
              loading="lazy"
            />
            <span v-else-if="product.storeName" class="text-[13px] text-gray-500 dark:text-zinc-400 line-clamp-1">
              {{ product.storeName }}
            </span>
            <span v-else aria-hidden="true" />

            <span class="text-[15px] font-bold text-gray-900 dark:text-zinc-100 shrink-0">
              {{ formatPrice(product.price) }} {{ product.currency }}
            </span>
          </div>

          <!-- See Match + Try-on -->
          <div class="flex gap-2">
            <button
              v-if="showSeeMatch"
              type="button"
              class="flex-1 min-w-0 px-3 py-3 bg-[var(--Secondary-Brand-color)] hover:brightness-95 text-white text-sm font-semibold rounded-2xl flex items-center justify-center transition-all active:scale-95"
              @click="$emit('see-match', product)"
            >
              <span>{{ $t('store.product.see_match') }}</span>
            </button>

            <button
              v-if="product.tryOnEnabled"
              type="button"
              class="flex-1 min-w-0 px-3 py-3 bg-[var(--Primary-Brand-color)] hover:bg-[var(--Primary-Brand-hover)] text-white text-sm font-semibold rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95"
              @click="$emit('try-on', product)"
            >
              <img :src="starsIcon" alt="" class="w-4 h-4" />
              <span>{{ $t('store.product.try_on') }}</span>
            </button>

            <button
              v-else
              type="button"
              disabled
              class="flex-1 min-w-0 px-3 py-3 bg-slate-200 text-slate-400 text-sm font-semibold rounded-2xl flex items-center justify-center gap-2 cursor-not-allowed"
            >
              <img :src="starsIcon" alt="" class="w-4 h-4 opacity-70" />
              <span>{{ $t('store.product.try_on') }}</span>
            </button>
          </div>
        </div>
      </article>
    </div>

    <ProductBottomNavigator
      v-if="totalPages > 1"
      :current-page="currentPage"
      :total-pages="totalPages"
      @update:current-page="onPageChange"
    />
  </div>
</template>

<script>
import starsIcon from '../../assets/StarsIcon.svg'
import { formatStorePrice } from '../../utils/storeHelpers.js'
import { useFavorites } from '../../composables/useFavorites.js'
import ProductBottomNavigator from './productBottomNavigator.vue'

const PRODUCTS_PER_PAGE = 6

export default {
  name: 'StoreProducts',
  components: { ProductBottomNavigator },
  emits: ['try-on', 'see-match', 'wishlist-error'],
  props: {
    products: { type: Array, default: () => [] },
    emptyMessage: { type: String, default: '' },
    showSeeMatch: { type: Boolean, default: false },
    wardrobeMatchProductIds: { type: Array, default: () => [] },
  },
  setup() {
    const { isFavorited, toggleFavorite } = useFavorites()
    return { isFavorited, toggleFavorite }
  },
  data: () => ({
    starsIcon,
    wishlistPending: {},
    currentPage: 1,
    perPage: PRODUCTS_PER_PAGE,
  }),
  computed: {
    totalPages() {
      return Math.ceil(this.products.length / this.perPage)
    },
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.perPage
      return this.products.slice(start, start + this.perPage)
    },
  },
  watch: {
    products() {
      this.currentPage = 1
    },
  },
  methods: {
    formatPrice(price) {
      return formatStorePrice(price)
    },
    isProductFavorited(productId) {
      return this.isFavorited(productId)
    },
    async onToggleWishlist(productId) {
      if (this.wishlistPending[productId]) return
      this.wishlistPending = { ...this.wishlistPending, [productId]: true }
      try {
        await this.toggleFavorite(productId)
      } catch (err) {
        this.$emit('wishlist-error', err)
      } finally {
        const { [productId]: _, ...rest } = this.wishlistPending
        this.wishlistPending = rest
      }
    },
    onPageChange(page) {
      this.currentPage = page
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    showWardrobeMatchBadge(productId) {
      if (!this.showSeeMatch || !productId) return false
      return this.wardrobeMatchProductIds.includes(String(productId))
    },
  },
}
</script>