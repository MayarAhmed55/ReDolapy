<template>
  <main class="w-full max-w-4xl mx-auto px-4 py-10 text-center">
    <h1 class="text-2xl font-bold text-(--Primary-Text-color) mb-2">
      {{ $t('wardrobe.header.recommendation') }}
    </h1>
    <p class="text-sm text-(--Secondary-Text-color)">
      {{ $t('wardrobe.header.subtitle') }}
    </p>
  </main>
</template>

<script>
export default {
  name: 'Recommendation',
}
</script>
