<template>
  <div class="avatar-result">
    <div class="avatar-result__image-wrap group">
      <img
        :src="imageUrl"
        :alt="$t('avatar.result.alt')"
        class="avatar-result__image"
        crossorigin="anonymous"
      />
      <button
        type="button"
        class="avatar-result__download-btn"
        :aria-label="$t('avatar.result.download_aria')"
        @click="$emit('download')"
      >
        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M12 3v12"/>
          <path d="M7 10l5 5 5-5"/>
          <path d="M5 21h14"/>
        </svg>
      </button>
    </div>

    <div v-if="showActions" class="avatar-result__actions">
      <button
        type="button"
        class="avatar-result__action avatar-result__action--tryon"
        :disabled="preparingTryOn"
        @click="onTryOnClick"
      >
        <img :src="starsIcon" alt="" class="w-4 h-4 shrink-0" aria-hidden="true" />
        {{ $t('avatar.result.try_on_btn') }}
      </button>
      <button
        type="button"
        class="avatar-result__action avatar-result__action--again"
        @click="$emit('try-again')"
      >
        {{ $t('avatar.result.try_again') }}
      </button>
    </div>
  </div>
</template>

<script>
import starsIcon from '../../assets/StarsIcon.svg'

export default {
  name: 'AvatarResult',
  emits: ['download', 'use-for-tryon', 'try-again'],
  props: {
    imageUrl: { type: String, required: true },
    showActions: { type: Boolean, default: false },
    preparingTryOn: { type: Boolean, default: false },
  },
  data: () => ({
    starsIcon,
  }),
  methods: {
    onTryOnClick() {
      if (this.preparingTryOn) return
      this.$emit('use-for-tryon')
    },
  },
}
</script>

<style scoped>
.avatar-result {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
}

.avatar-result__image-wrap {
  position: relative;
  width: 100%;
  max-width: 22rem;
  border-radius: 1.5rem;
  overflow: hidden;
  background: #f3f4f6;
}

.avatar-result__image {
  width: 100%;
  max-height: 32rem;
  aspect-ratio: 4 / 5;
  object-fit: contain;
  object-position: center;
  display: block;
  transition: transform 0.3s;
}

.avatar-result__download-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.9);
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background: var(--Secondary-Brand-color);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.25s, transform 0.25s;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.group:hover .avatar-result__image {
  transform: scale(1.01);
}

.group:hover .avatar-result__download-btn {
  opacity: 1;
  pointer-events: auto;
  transform: translate(-50%, -50%) scale(1);
}

.avatar-result__actions {
  display: flex;
  gap: 0.75rem;
  width: 100%;
  max-width: 22rem;
}

.avatar-result__action {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  padding: 0.75rem 0.875rem;
  border-radius: 0.75rem;
  font-size: 0.8125rem;
  font-weight: var(--Semi-Bold);
  transition: opacity 0.2s, background-color 0.2s;
}

.avatar-result__action--tryon {
  border: none;
  color: white;
  background: var(--Primary-Brand-color);
}

.avatar-result__action--tryon:hover:not(:disabled) {
  background: var(--Primary-Brand-hover);
}

.avatar-result__action--tryon:disabled {
  opacity: 0.6;
  cursor: wait;
}

.avatar-result__action--again {
  border: 1.5px solid var(--Primary-Brand-color);
  color: var(--Primary-Brand-color);
  background: white;
}

.avatar-result__action--again:hover {
  background: #EEF6FC;
}
</style>
