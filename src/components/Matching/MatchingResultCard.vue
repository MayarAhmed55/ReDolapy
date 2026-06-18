<template>
  <article class="result-card">
    <div class="result-card__image-wrap">
      <img
        v-if="image"
        :src="image"
        :alt="name"
        class="result-card__image"
        loading="lazy"
      />
      <div v-else class="result-card__placeholder" aria-hidden="true">
        <svg class="w-8 h-8 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M6 3h12l-1 5H7L6 3z"/><path d="M5 8h14l-1.5 11H6.5L5 8z"/>
        </svg>
      </div>

      <span
        class="result-card__score"
        :class="isStore ? 'result-card__score--store' : 'result-card__score--wardrobe'"
      >
        {{ score }}%
      </span>

      <button
        v-if="isStore && productId"
        type="button"
        class="result-card__heart"
        :class="{ 'result-card__heart--active': favorited }"
        :disabled="wishlistPending"
        :aria-label="favorited ? $t('store.product.remove_wishlist_aria') : $t('store.product.wishlist_aria')"
        @click.stop="$emit('toggle-wishlist', productId)"
      >
        <svg viewBox="0 0 24 24" class="w-4 h-4" aria-hidden="true">
          <path
            d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
            :fill="favorited ? 'currentColor' : 'none'"
            stroke="currentColor"
            stroke-width="1.75"
          />
        </svg>
      </button>

      <a
        v-if="isStore && purchaseUrl"
        :href="purchaseUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="result-card__link-overlay"
        :aria-label="$t('store.product.view_on_store')"
      />
    </div>
  </article>
</template>

<script>
export default {
  name: 'MatchingResultCard',
  props: {
    image: { type: String, default: '' },
    name: { type: String, default: '' },
    score: { type: Number, default: 0 },
    isStore: { type: Boolean, default: false },
    productId: { type: String, default: '' },
    purchaseUrl: { type: String, default: '' },
    favorited: { type: Boolean, default: false },
    wishlistPending: { type: Boolean, default: false },
  },
  emits: ['toggle-wishlist'],
}
</script>

<style scoped>
.result-card {
  flex: 0 0 auto;
  width: 7rem;
}

@media (min-width: 640px) {
  .result-card {
    width: 8.5rem;
  }
}

.result-card__image-wrap {
  position: relative;
  aspect-ratio: 1;
  border-radius: 1rem;
  overflow: hidden;
  border: 2px solid rgb(142 211 33 / 45%);
  background: var(--card-surface);
}

.result-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.result-card__placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--Disabled-Text-color);
  background: var(--surface-muted);
}

.result-card__score {
  position: absolute;
  top: 0.4rem;
  padding: 0.15rem 0.45rem;
  border-radius: 9999px;
  font-size: 0.625rem;
  font-weight: 700;
  color: #fff;
  background: var(--Secondary-Brand-color);
  line-height: 1.2;
  z-index: 2;
}

.result-card__score--wardrobe {
  inset-inline-end: 0.4rem;
}

.result-card__score--store {
  inset-inline-start: 0.4rem;
}

.result-card__heart {
  position: absolute;
  top: 0.35rem;
  inset-inline-end: 0.35rem;
  z-index: 3;
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 9999px;
  border: none;
  background: rgb(255 255 255 / 88%);
  color: var(--Primary-Text-color);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s, background-color 0.2s;
}

.result-card__heart:hover:not(:disabled) {
  color: var(--Primary-Brand-color);
}

.result-card__heart--active {
  color: var(--Primary-Brand-color);
}

.result-card__heart:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.result-card__link-overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
}
</style>
