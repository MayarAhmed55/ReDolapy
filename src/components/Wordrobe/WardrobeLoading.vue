<template>
  <div class="wardrobe-loading" role="status" :aria-label="ariaLabel">
    <img :src="loadingGif" alt="" class="wardrobe-loading__gif" aria-hidden="true" />
    <p v-if="message" class="wardrobe-loading__text">{{ message }}</p>
  </div>
</template>

<script>
import loadingGif from '../../assets/loadinimi.gif'

export default {
  name: 'WardrobeLoading',
  props: {
    message: { type: String, default: '' },
    ariaLabel: { type: String, default: 'Loading' },
  },
  data: () => ({ loadingGif }),
}
</script>

<style scoped>
.wardrobe-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 3rem 1rem;
}

.wardrobe-loading__gif {
  width: 5rem;
  height: 5rem;
  object-fit: contain;
}

.wardrobe-loading__text {
  font-size: 0.875rem;
  color: var(--Disabled-Text-color);
}
</style>
