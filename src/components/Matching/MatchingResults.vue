<template>
  <div class="space-y-6 sm:space-y-8">
    <section v-if="wardrobeMatches.length">
      <h2 class="text-base sm:text-lg font-bold text-(--Primary-Text-color) mb-3 sm:mb-4">
        {{ $t('matching.results.wardrobe_title') }}
      </h2>
      <div class="flex gap-3 sm:gap-4 overflow-x-auto pb-1 snap-x snap-mandatory">
        <MatchingResultCard
          v-for="match in wardrobeMatches"
          :key="match.item.id"
          :image="match.item.image"
          :name="match.item.name"
          :score="match.score"
        />
      </div>
    </section>

    <section v-if="storeMatches.length">
      <h2 class="text-base sm:text-lg font-bold text-(--Primary-Text-color) mb-3 sm:mb-4">
        {{ $t('matching.results.store_title') }}
      </h2>
      <div class="flex gap-3 sm:gap-4 overflow-x-auto pb-1 snap-x snap-mandatory">
        <MatchingResultCard
          v-for="match in storeMatches"
          :key="match.item.id"
          :image="match.item.image"
          :name="match.item.name"
          :score="match.score"
          is-store
          :product-id="getProductId(match.item.id)"
          :purchase-url="match.item.purchase_url"
          :favorited="isFavorited(getProductId(match.item.id))"
          :wishlist-pending="Boolean(wishlistPending[getProductId(match.item.id)])"
          @toggle-wishlist="onToggleWishlist"
        />
      </div>
    </section>
  </div>
</template>

<script>
import MatchingResultCard from './MatchingResultCard.vue'
import { extractStoreProductId } from '../../utils/matchHelpers.js'
import { useFavorites } from '../../composables/useFavorites.js'
import { mapApiError } from '../../utils/mapApiError.js'
import { triggerLoginModal } from '../../authState.js'

export default {
  name: 'MatchingResults',
  components: { MatchingResultCard },
  props: {
    wardrobeMatches: { type: Array, default: () => [] },
    storeMatches: { type: Array, default: () => [] },
  },
  setup() {
    const { isFavorited, toggleFavorite, loadFavorites } = useFavorites()
    return { isFavorited, toggleFavorite, loadFavorites }
  },
  data: () => ({
    wishlistPending: {},
    wishlistError: '',
  }),
  mounted() {
    this.loadFavorites()
  },
  methods: {
    getProductId(id) {
      return extractStoreProductId(id)
    },
    async onToggleWishlist(productId) {
      if (!localStorage.getItem('token')) {
        triggerLoginModal()
        return
      }
      if (this.wishlistPending[productId]) return

      this.wishlistPending = { ...this.wishlistPending, [productId]: true }
      try {
        await this.toggleFavorite(productId)
      } catch (err) {
        if (err.code === 'LOGIN_REQUIRED') {
          triggerLoginModal()
        } else {
          this.wishlistError = mapApiError(err, this.$t.bind(this))
        }
      } finally {
        const { [productId]: _, ...rest } = this.wishlistPending
        this.wishlistPending = rest
      }
    },
  },
}
</script>
