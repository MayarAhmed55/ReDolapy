<template>
  <div v-if="!products.length" class="store-products-empty">
    {{ $t('store.no_products') }}
  </div>

  <div v-else class="store-products grid grid-cols-2 gap-3.5 lg:grid-cols-3 lg:gap-5">
    <article
      v-for="product in products"
      :key="product.id"
      class="store-product-card group bg-white border border-[#e8eaee] rounded-2xl overflow-hidden font-['Roboto'] transition-all duration-300 hover:shadow-[0_8px_28px_rgb(18,24,38,0.1)] lg:hover:scale-[1.02]"
    >
      <a
        :href="product.purchaseUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="store-product-card__image-link relative bg-[#eceef2] aspect-square flex items-center justify-center overflow-hidden"
        :aria-label="$t('store.product.view_on_store')"
      >
        <button
          type="button"
          class="absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full border border-[#e8eaee] bg-white/95 text-[#a0a6b2] flex items-center justify-center cursor-pointer transition-all lg:right-auto lg:left-3.5 lg:border-none lg:bg-transparent group-hover:text-white"
          :class="{ 'store-product-card__wishlist--active': wishlisted[product.id] }"
          :aria-label="$t('store.product.wishlist_aria')"
          @click.stop.prevent="toggleWishlist(product.id)"
        >
          <svg viewBox="0 0 24 24" class="w-4 h-4" aria-hidden="true">
            <path
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
              :fill="wishlisted[product.id] ? 'currentColor' : 'none'"
              stroke="currentColor"
              stroke-width="1.75"
            />
          </svg>
        </button>

        <img
          :src="product.image"
          :alt="product.name"
          class="w-full h-full object-cover"
          loading="lazy"
        />

        <div class="store-product-card__overlay absolute inset-0 bg-black/55 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <span class="inline-flex items-center gap-1.5 text-white text-[15px] font-semibold">
            {{ $t('store.product.view_on_store') }}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </span>
        </div>
      </a>

      <div class="p-3.5 lg:p-4">
        <h3 class="text-[15px] font-bold text-(--Primary-Text-color) mb-2 line-clamp-2">
          {{ product.name }}
        </h3>

        <div class="mb-3 h-5 flex items-center">
          <img
            v-if="product.storeLogo"
            :src="product.storeLogo"
            :alt="product.storeName"
            class="h-4 max-w-18 object-contain object-left"
            loading="lazy"
          />
        </div>

        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-2">
          <span class="text-[15px] font-bold text-(--Primary-Text-color) whitespace-nowrap">
            {{ formatPrice(product.price) }} {{ product.currency }}
          </span>

          <button
            v-if="product.tryOnEnabled"
            type="button"
            class="store-product-card__try-on flex items-center justify-center gap-1.5 text-[13px] font-semibold text-white bg-gradient-to-b from-[#6ecfff] to-[#40b9ff] rounded-[10px] px-5 py-[10px] hover:opacity-90 transition-all w-full sm:w-auto whitespace-nowrap"
            @click="$emit('try-on', product)"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 shrink-0">
              <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z" />
            </svg>
            {{ $t('store.product.try_on') }}
          </button>

          <button
            v-else
            type="button"
            disabled
            class="store-product-card__try-on store-product-card__try-on--disabled flex items-center justify-center gap-1.5 text-[13px] font-semibold rounded-[10px] px-5 py-[10px] w-full sm:w-auto whitespace-nowrap"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 shrink-0">
              <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z" />
            </svg>
            {{ $t('store.product.try_on') }}
          </button>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import { formatStorePrice } from '../../utils/storeHelpers.js'

export default {
  name: 'StoreProducts',
  emits: ['try-on'],
  props: {
    products: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    wishlisted: {},
  }),
  methods: {
    formatPrice(price) {
      return formatStorePrice(price)
    },
    toggleWishlist(id) {
      this.wishlisted = { ...this.wishlisted, [id]: !this.wishlisted[id] }
    },
  },
}
</script>

<style scoped>
.store-products-empty {
  padding: 2.5rem 1rem;
  text-align: center;
  color: var(--Secondary-Text-color);
  font-size: 0.9375rem;
}

.store-product-card__image-link {
  display: block;
  text-decoration: none;
}

.store-product-card__overlay {
  pointer-events: none;
}

.store-product-card__wishlist--active {
  color: var(--Primary-Brand-color);
  background-color: transparent;
  border-color: transparent;
}

.store-product-card:hover .store-product-card__wishlist--active svg path {
  fill: transparent;
  stroke: var(--Primary-Brand-color);
}

.store-product-card__try-on--disabled {
  color: #a0a6b2;
  background: #eceef2;
  cursor: not-allowed;
  opacity: 0.85;
}
</style>
