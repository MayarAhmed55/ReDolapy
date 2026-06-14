<template>
  <div :id="scrollId" class="w-full">
    <div class="flex items-center gap-2 mb-5 sm:mb-6">
      <img :src="headerIcon" alt="" class="w-8 h-8 sm:w-10 sm:h-10 shrink-0" aria-hidden="true" />
      <h2 class="text-lg sm:text-xl font-bold text-(--Primary-Text-color)">{{ heading }}</h2>
    </div>

    <div class="flex flex-col items-center bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 p-5 sm:p-8">
      <div class="tryon-result__image-frame">
        <img
          :src="imageUrl"
          :alt="heading"
          class="tryon-result__image"
          crossorigin="anonymous"
        />
      </div>

      <p v-if="error" class="mt-4 text-sm text-red-600">{{ error }}</p>

      <div class="flex flex-col sm:flex-row gap-3 w-full max-w-md mt-6 sm:mt-8">
        <button
          type="button"
          class="tryon-result-btn tryon-result-btn--outline"
          @click="$emit('try-again')"
        >
          {{ tryAgainLabel }}
        </button>
        <button
          type="button"
          class="tryon-result-btn tryon-result-btn--primary"
          :disabled="saving"
          @click="$emit('save')"
        >
          {{ saving ? savingLabel : saveLabel }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import logoIcon from '../../assets/Redolapylogo.png'

export default {
  name: 'TryOnResult',
  emits: ['try-again', 'save'],
  props: {
    imageUrl: { type: String, required: true },
    heading: { type: String, default: '' },
    saveLabel: { type: String, default: 'Save' },
    tryAgainLabel: { type: String, default: 'Try again' },
    savingLabel: { type: String, default: 'Saving…' },
    saving: { type: Boolean, default: false },
    error: { type: String, default: '' },
    scrollId: { type: String, default: 'tryon-result' },
  },
  data: () => ({
    headerIcon: logoIcon,
  }),
}
</script>

<style scoped>
.tryon-result__image-frame {
  width: 100%;
  max-width: 28rem;
  min-height: 22rem;
  max-height: 36rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f3f4f6;
  border-radius: 1rem;
  overflow: hidden;
}

.tryon-result__image {
  width: 100%;
  height: 100%;
  max-height: 36rem;
  object-fit: contain;
  object-position: center;
}

.tryon-result-btn {
  flex: 1;
  padding: 0.875rem 1rem;
  border-radius: 0.75rem;
  font-size: 0.9375rem;
  font-weight: var(--Semi-Bold);
  transition: opacity 0.2s, background-color 0.2s;
}

.tryon-result-btn--primary {
  border: none;
  color: white;
  background: var(--Secondary-Brand-color);
}

.tryon-result-btn--primary:hover:not(:disabled) {
  opacity: 0.92;
}

.tryon-result-btn--primary:disabled {
  opacity: 0.6;
  cursor: wait;
}

.tryon-result-btn--outline {
  border: 1.5px solid var(--Secondary-Brand-color);
  color: var(--Secondary-Brand-color);
  background: white;
}

.tryon-result-btn--outline:hover {
  background: #EEF9E0;
}
</style>
