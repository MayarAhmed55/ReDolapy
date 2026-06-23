<template>
  <TransitionRoot as="template" :show="open">
    <Dialog class="relative z-50" @close="$emit('close')">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-900/60 backdrop-blur-sm" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 sm:p-6">
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel class="product-match-modal w-full max-w-4xl">
              <header class="product-match-modal__header">
                <div class="product-match-modal__title-row">
                  <span class="product-match-modal__icon" aria-hidden="true">
                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l1.09 3.36L16.5 6.5l-3.36 1.09L12 11l-1.09-3.41L7.5 6.5l3.41-1.14L12 2z"/>
                      <path d="M5 14l.72 2.22L8 17l-2.28.72L5 20l-.72-2.28L2 17l2.28-.78L5 14z"/>
                      <path d="M19 14l.72 2.22L22 17l-2.28.72L19 20l-.72-2.28L16 17l2.28-.78L19 14z"/>
                    </svg>
                  </span>
                  <div>
                    <DialogTitle class="product-match-modal__title">
                      {{ $t('store.match_modal.title') }}
                    </DialogTitle>
                    <p class="product-match-modal__subtitle">{{ $t('store.match_modal.subtitle') }}</p>
                  </div>
                </div>

                <button
                  type="button"
                  class="product-match-modal__close"
                  :aria-label="$t('store.match_modal.close')"
                  @click="$emit('close')"
                >
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </header>

              <div class="product-match-modal__body">
                <div v-if="loading" class="product-match-modal__state">
                  {{ $t('store.match_modal.loading') }}
                </div>

                <p v-else-if="error" class="product-match-modal__state product-match-modal__state--error">
                  {{ error }}
                </p>

                <p v-else-if="!matches.length" class="product-match-modal__state">
                  {{ $t('store.match_modal.empty') }}
                </p>

                <ul v-else class="product-match-modal__list">
                  <li
                    v-for="(entry, index) in matches"
                    :key="entry.item?.id || index"
                    class="product-match-card"
                  >
                    <div class="product-match-card__image-wrap">
                      <img
                        v-if="entry.item?.image"
                        :src="entry.item.image"
                        :alt="entry.item.name"
                        class="product-match-card__image"
                        loading="lazy"
                      />
                      <span class="product-match-card__score">{{ entry.score }}%</span>
                    </div>

                    <div class="product-match-card__info">
                      <h3 class="product-match-card__name">{{ entry.item?.name }}</h3>

                      <div class="product-match-card__tags">
                        <span v-if="primaryColor(entry)" class="product-match-card__tag">
                          <span
                            class="product-match-card__color-dot"
                            :style="{ backgroundColor: colorHex(entry) }"
                            aria-hidden="true"
                          />
                          {{ primaryColor(entry).toUpperCase() }}
                        </span>
                        <span v-if="entry.item?.style" class="product-match-card__tag product-match-card__tag--style">
                          {{ styleLabel(entry.item.style) }}
                        </span>
                      </div>

                      <button
                        type="button"
                        class="product-match-card__details"
                        @click="onViewDetails(entry.item?.id)"
                      >
                        {{ $t('store.match_modal.view_details') }}
                        <svg
                          class="product-match-card__details-icon w-3.5 h-3.5"
                          :class="{ 'product-match-card__details-icon--rtl': isRtl }"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2.5"
                          aria-hidden="true"
                        >
                          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
                        </svg>
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'

const COLOR_MAP = {
  black: '#111111',
  white: '#f5f5f5',
  blue: '#2563eb',
  pink: '#ec4899',
  red: '#ef4444',
  green: '#22c55e',
  yellow: '#eab308',
  grey: '#9ca3af',
  gray: '#9ca3af',
  brown: '#92400e',
  beige: '#d6c4a8',
  navy: '#1e3a8a',
  'dark blue': '#1e3a8a',
  'olive green': '#6b7c3f',
  purple: '#9333ea',
  orange: '#f97316',
}

export default {
  name: 'ProductMatchModal',
  components: { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot },
  props: {
    open: { type: Boolean, default: false },
    matches: { type: Array, default: () => [] },
    loading: { type: Boolean, default: false },
    error: { type: String, default: '' },
  },
  emits: ['close', 'view-details'],
  computed: {
    isRtl() {
      return this.$i18n?.locale === 'ar'
    },
  },
  methods: {
    primaryColor(entry) {
      return entry?.item?.color || entry?.item?.colors?.[0]?.color || ''
    },
    colorHex(entry) {
      const name = String(this.primaryColor(entry) || '').toLowerCase()
      return COLOR_MAP[name] || '#cbd5e1'
    },
    styleLabel(style) {
      const key = `wardrobe.options.style.${style}`
      const translated = this.$t(key)
      return translated === key ? String(style).toUpperCase() : translated.toUpperCase()
    },
    onViewDetails(itemId) {
      if (!itemId) return
      this.$emit('view-details', itemId)
    },
  },
}
</script>

<style scoped>
.product-match-modal {
  background: var(--card-surface);
  border-radius: 1.5rem;
  box-shadow: 0 24px 48px rgb(15 23 42 / 18%);
  overflow: hidden;
}

.product-match-modal__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.25rem 1.25rem 0.75rem;
}

@media (min-width: 640px) {
  .product-match-modal__header {
    padding: 1.5rem 1.5rem 1rem;
  }
}

.product-match-modal__title-row {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  min-width: 0;
}

.product-match-modal__icon {
  flex-shrink: 0;
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background: var(--Secondary-Brand-color);
}

.product-match-modal__title {
  margin: 0;
  font-size: 1.0625rem;
  font-weight: 700;
  color: var(--Primary-Text-color);
  line-height: 1.3;
}

.product-match-modal__subtitle {
  margin: 0.2rem 0 0;
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--Disabled-Text-color);
}

.product-match-modal__close {
  flex-shrink: 0;
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--surface-muted);
  color: var(--Secondary-Text-color);
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
}

.product-match-modal__close:hover {
  background: var(--input-border);
  color: var(--Primary-Text-color);
}

.product-match-modal__body {
  padding: 0.5rem 1.25rem 1.25rem;
  max-height: min(70vh, 32rem);
  overflow-y: auto;
}

@media (min-width: 640px) {
  .product-match-modal__body {
    padding: 0.75rem 1.5rem 1.5rem;
  }
}

.product-match-modal__state {
  padding: 2rem 1rem;
  text-align: center;
  font-size: 0.9375rem;
  color: var(--Secondary-Text-color);
}

.product-match-modal__state--error {
  color: #c62828;
}

.product-match-modal__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.875rem;
}

@media (min-width: 640px) {
  .product-match-modal__list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.product-match-card {
  display: flex;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 1rem;
  border: 1.5px solid rgb(142 211 33 / 45%);
  background: var(--primary-bgc);
  min-width: 0;
}

.product-match-card__image-wrap {
  position: relative;
  flex-shrink: 0;
  width: 4.75rem;
  height: 4.75rem;
  border-radius: 0.75rem;
  overflow: hidden;
  background: var(--surface-muted);
}

@media (min-width: 640px) {
  .product-match-card__image-wrap {
    width: 5.5rem;
    height: 5.5rem;
  }
}

.product-match-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-match-card__score {
  position: absolute;
  top: 0.4rem;
  inset-inline-start: 0.4rem;
  padding: 0.15rem 0.45rem;
  border-radius: 9999px;
  font-size: 0.6875rem;
  font-weight: 700;
  color: #121826;
  background: rgb(255 255 255 / 95%);
  box-shadow: 0 1px 3px rgb(0 0 0 / 12%);
}

.product-match-card__info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.product-match-card__name {
  margin: 0;
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--Primary-Text-color);
  line-height: 1.35;
}

.product-match-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
}

.product-match-card__tag {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.2rem 0.55rem;
  border-radius: 9999px;
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--Secondary-Text-color);
  background: var(--card-surface);
}

.product-match-card__tag--style {
  text-transform: uppercase;
}

.product-match-card__color-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 9999px;
  border: 1px solid rgb(0 0 0 / 8%);
}

.product-match-card__details {
  margin-top: auto;
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 0.2rem;
  padding: 0;
  border: none;
  background: none;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: var(--Secondary-Brand-color);
  cursor: pointer;
  transition: opacity 0.2s;
}

.product-match-card__details:hover {
  opacity: 0.8;
}

.product-match-card__details-icon--rtl {
  transform: scaleX(-1);
}
</style>
