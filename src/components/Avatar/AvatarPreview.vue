<template>
  <div class="avatar-preview">
    <div v-if="generating" class="avatar-preview__placeholder">
      <span class="avatar-preview__spinner" aria-hidden="true" />
      <p class="text-sm text-(--Disabled-Text-color) text-center">
        {{ $t('avatar.form.generating') }}
      </p>
    </div>

    <div
      v-else-if="!imageUrl"
      class="avatar-preview__placeholder"
    >
      <div class="avatar-preview__icon-wrap">
        <svg class="w-10 h-10 sm:w-12 sm:h-12 text-(--Disabled-Text-color)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
          <circle cx="12" cy="8" r="4"/>
          <path d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6"/>
        </svg>
      </div>
      <p class="text-sm text-(--Disabled-Text-color) text-center px-4 max-w-xs">
        {{ $t('avatar.preview.placeholder') }}
      </p>
    </div>

    <AvatarResult
      v-else
      :image-url="imageUrl"
      :show-actions="showActions"
      :preparing-try-on="preparingTryOn"
      @download="$emit('download')"
      @use-for-tryon="$emit('use-for-tryon')"
      @try-again="$emit('try-again')"
    />
  </div>
</template>

<script>
import AvatarResult from './AvatarResult.vue'

export default {
  name: 'AvatarPreview',
  components: { AvatarResult },
  emits: ['download', 'use-for-tryon', 'try-again'],
  props: {
    imageUrl: { type: String, default: '' },
    generating: { type: Boolean, default: false },
    showActions: { type: Boolean, default: false },
    preparingTryOn: { type: Boolean, default: false },
  },
}
</script>

<style scoped>
.avatar-preview {
  width: 100%;
  align-self: start;
  min-height: 20rem;
  border-radius: 1.25rem;
  border: 2px dashed var(--input-border);
  background: var(--card-surface);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

@media (min-width: 1024px) {
  .avatar-preview {
    min-height: 24rem;
  }
}

.avatar-preview__placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
}

.avatar-preview__icon-wrap {
  width: 5rem;
  height: 5rem;
  border-radius: 9999px;
  background: var(--primary-bgc);
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-preview__spinner {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  border: 3px solid #E8F0F8;
  border-top-color: var(--Primary-Brand-color);
  animation: avatar-spin 0.8s linear infinite;
}

@keyframes avatar-spin {
  to { transform: rotate(360deg); }
}
</style>
