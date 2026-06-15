<template>
  <div class="wishlist-empty">
    <div class="wishlist-empty__icon-wrap" aria-hidden="true">
      <svg class="wishlist-empty__icon" viewBox="0 0 24 24" fill="none">
        <path
          d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
          stroke="currentColor"
          stroke-width="1.75"
        />
      </svg>
    </div>
    <p class="wishlist-empty__text">{{ $t('wishlist.empty_lonely') }}</p>
  </div>
</template>

<script>
export default {
  name: 'WishlistEmpty',
}
</script>

<style scoped>
.wishlist-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 1.5rem;
  text-align: center;
}

.wishlist-empty__icon-wrap {
  width: 5.5rem;
  height: 5.5rem;
  border-radius: 9999px;
  background: var(--card-surface);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
}

.wishlist-empty__icon {
  width: 2rem;
  height: 2rem;
  color: #7eb8e8;
}

.wishlist-empty__text {
  margin: 0;
  font-size: 1.125rem;
  font-weight: var(--Bold);
  color: var(--Primary-Text-color);
}
</style>
