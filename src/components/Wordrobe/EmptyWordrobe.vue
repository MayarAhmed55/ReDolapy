<template>
  <section class="flex flex-col items-center justify-center text-center py-10 sm:py-16 px-4">
    <h1 class="text-xl sm:text-2xl font-bold text-(--Primary-Text-color) mb-2">
      {{ $t('wardrobe.empty.title') }}
    </h1>
    <p class="text-sm sm:text-base text-(--Disabled-Text-color) mb-8 max-w-md">
      {{ $t('wardrobe.empty.subtitle') }}
    </p>

    <img
      :src="emptyImage"
      :alt="$t('wardrobe.empty.image_alt')"
      class="w-full max-w-[280px] sm:max-w-[320px] h-auto mb-8 select-none"
      draggable="false"
    />

    <button
      type="button"
      class="wardrobe-primary-btn"
      @click="$emit('add-item')"
    >
      {{ $t('wardrobe.empty.cta') }}
    </button>
  </section>
</template>

<script>
import emptyImage from '../../assets/emptyWordrobe.png'

export default {
  name: 'EmptyWordrobe',
  emits: ['add-item'],
  data: () => ({ emptyImage }),
}
</script>

<style scoped>
.wardrobe-primary-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 11rem;
  padding: 0.75rem 1.75rem;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #fff;
  background-color: var(--Primary-Brand-color);
  transition: background-color 0.2s, opacity 0.2s;
}

.wardrobe-primary-btn:hover {
  background-color: var(--Primary-Brand-hover);
}
</style>
