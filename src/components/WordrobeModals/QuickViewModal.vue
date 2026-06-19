<template>
  <TransitionRoot as="template" :show="true">
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
        <div class="flex min-h-full items-center justify-center p-4">
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel v-if="item" class="quick-view w-full max-w-3xl">
              <div class="quick-view__layout">
                <div class="quick-view__image-panel">
                  <img :src="item.image" :alt="item.name" class="quick-view__image" />
                </div>

                <div class="quick-view__content">
                  <div class="quick-view__top">
                    <div class="quick-view__heading">
                      <span class="quick-view__heading-line" aria-hidden="true" />
                      <span class="quick-view__heading-text">{{ $t('wardrobe.quick_view.details_label') }}</span>
                    </div>
                    <button
                      type="button"
                      class="quick-view__close"
                      :aria-label="$t('wardrobe.common.close')"
                      @click="$emit('close')"
                    >
                      <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                      </svg>
                    </button>
                  </div>

                  <h3 class="quick-view__title capitalize">{{ item.name }}</h3>

                  <div class="quick-view__grid">
                    <div v-for="detail in detailRows" :key="detail.key" class="quick-view__row">
                      <span class="detail-icon-wrap" :class="detail.iconClass">
                        <img :src="detail.icon" alt="" class="detail-icon" aria-hidden="true" />
                      </span>
                      <div>
                        <p class="detail-label">{{ detail.label }}</p>
                        <p class="detail-value capitalize">
                          <span
                            v-if="detail.key === 'color' && colorHex"
                            class="color-dot"
                            :style="{ backgroundColor: colorHex }"
                            aria-hidden="true"
                          />
                          {{ detail.value }}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div class="quick-view__actions">
                    <button
                      type="button"
                      class="quick-view__delete-btn"
                      :aria-label="$t('wardrobe.quick_view.delete')"
                      @click="$emit('delete', item)"
                    >
                      <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                        <path d="M10 11v6M14 11v6"/>
                        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                      </svg>
                    </button>
                    <button type="button" class="quick-view__view-btn" @click="onView">
                      <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                      {{ $t('wardrobe.quick_view.view') }}
                    </button>
                  </div>
                </div>
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
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import categoryIcon from '../../assets/categoryIcon.svg'
import colorIcon from '../../assets/colorIcon.svg'
import genderIcon from '../../assets/genderIcon.svg'
import patterenIcon from '../../assets/patterenIcon.svg'
import seasonIcon from '../../assets/SeasonIcon.svg'
import starsIcon from '../../assets/StarsIcon.svg'

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
  purple: '#9333ea',
  orange: '#f97316',
}

export default {
  name: 'QuickViewModal',
  components: { Dialog, DialogPanel, TransitionChild, TransitionRoot },
  props: {
    item: { type: Object, required: true },
  },
  emits: ['close', 'delete'],
  computed: {
    primaryColor() {
      return this.item?.color || this.item?.colors?.[0]?.color || ''
    },
    colorHex() {
      const name = String(this.primaryColor || '').toLowerCase()
      return COLOR_MAP[name] || ''
    },
    seasonLabel() {
      if (!this.item?.season?.length) return '—'
      return this.item.season
        .map((s) => this.$t(`wardrobe.options.season.${s}`))
        .join(', ')
    },
    detailRows() {
      if (!this.item) return []
      const categoryKey = this.item.category || 'top'
      return [
        {
          key: 'category',
          label: this.$t('wardrobe.form.category').toUpperCase(),
          value: this.$t(`wardrobe.categories.${categoryKey}`),
          icon: categoryIcon,
          iconClass: 'detail-icon-wrap--blue',
        },
        {
          key: 'season',
          label: this.$t('wardrobe.form.season').toUpperCase(),
          value: this.seasonLabel,
          icon: seasonIcon,
          iconClass: 'detail-icon-wrap--blue',
        },
        {
          key: 'style',
          label: this.$t('wardrobe.form.style').toUpperCase(),
          value: this.item.style ? this.$t(`wardrobe.options.style.${this.item.style}`) : '—',
          icon: starsIcon,
          iconClass: 'detail-icon-wrap--blue',
        },
        {
          key: 'color',
          label: this.$t('wardrobe.details_modal.colors').toUpperCase(),
          value: this.primaryColor || '—',
          icon: colorIcon,
          iconClass: 'detail-icon-wrap--pink',
        },
        {
          key: 'pattern',
          label: this.$t('wardrobe.form.pattern').toUpperCase(),
          value: this.item.pattern ? this.$t(`wardrobe.options.pattern.${this.item.pattern}`) : '—',
          icon: patterenIcon,
          iconClass: 'detail-icon-wrap--blue',
        },
        {
          key: 'gender',
          label: this.$t('wardrobe.form.gender').toUpperCase(),
          value: this.item.gender ? this.$t(`wardrobe.options.gender.${this.item.gender}`) : '—',
          icon: genderIcon,
          iconClass: 'detail-icon-wrap--blue',
        },
      ]
    },
  },
  methods: {
    async onView() {
      const id = this.item?._id
      if (!id) return

      this.$emit('close')
      await this.$nextTick()
      await this.$router.push(`/wardrobe/${id}`)
    },
  },
}
</script>

<style scoped>
.quick-view {
  background: var(--card-surface);
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: 0 24px 60px rgb(0 0 0 / 18%);
}

.quick-view__layout {
  display: flex;
  flex-direction: column;
}

@media (min-width: 768px) {
  .quick-view__layout {
    flex-direction: row;
    min-height: 420px;
  }
}

.quick-view__image-panel {
  background: var(--surface-muted);
  min-height: 260px;
}

@media (min-width: 768px) {
  .quick-view__image-panel {
    width: 42%;
    min-height: auto;
  }
}

.quick-view__image {
  width: 100%;
  height: 100%;
  min-height: 260px;
  object-fit: contain;
  padding: 1rem;
}

@media (min-width: 768px) {
  .quick-view__image {
    min-height: 420px;
  }
}

.quick-view__content {
  flex: 1;
  padding: 1.25rem 1.25rem 1.5rem;
  display: flex;
  flex-direction: column;
}

@media (min-width: 768px) {
  .quick-view__content {
    padding: 1.5rem 1.75rem 1.75rem;
  }
}

.quick-view__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
}

.quick-view__heading {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.quick-view__heading-line {
  width: 1.75rem;
  height: 3px;
  border-radius: 9999px;
  background: var(--Secondary-Brand-color);
}

.quick-view__heading-text {
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--Secondary-Brand-color);
}

.quick-view__close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  color: var(--Disabled-Text-color);
  transition: background-color 0.2s, color 0.2s;
}

.quick-view__close:hover {
  background: var(--surface-muted);
  color: var(--Primary-Text-color);
}

.quick-view__title {
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 1.35;
  color: var(--Primary-Text-color);
  margin-bottom: 1.25rem;
}

@media (min-width: 768px) {
  .quick-view__title {
    font-size: 1.25rem;
  }
}

.quick-view__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem 1.5rem;
  flex: 1;
}

@media (min-width: 640px) {
  .quick-view__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.quick-view__row {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.detail-icon-wrap {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 9999px;
  flex-shrink: 0;
}

.detail-icon-wrap--blue {
  background: rgb(64 185 255 / 12%);
}

.detail-icon-wrap--pink {
  background: rgb(236 72 153 / 12%);
}

.detail-icon {
  width: 1.125rem;
  height: 1.125rem;
  object-fit: contain;
}

.detail-icon-wrap--blue .detail-icon {
  filter: brightness(0) saturate(100%) invert(58%) sepia(86%) saturate(500%) hue-rotate(170deg) brightness(101%) contrast(101%);
}

.detail-icon-wrap--pink .detail-icon {
  filter: brightness(0) saturate(100%) invert(55%) sepia(55%) saturate(1200%) hue-rotate(300deg) brightness(100%) contrast(95%);
}

.detail-label {
  font-size: 0.625rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: var(--Disabled-Text-color);
  margin-bottom: 0.15rem;
}

.detail-value {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--Primary-Text-color);
}

.color-dot {
  width: 0.625rem;
  height: 0.625rem;
  border-radius: 9999px;
  border: 1px solid rgb(0 0 0 / 10%);
  flex-shrink: 0;
}

.quick-view__actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.quick-view__delete-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 0.875rem;
  color: #ef4444;
  background: rgb(239 68 68 / 10%);
  border: 1px solid rgb(239 68 68 / 25%);
  flex-shrink: 0;
  transition: background-color 0.2s;
}

.quick-view__delete-btn:hover {
  background: rgb(239 68 68 / 16%);
}

.quick-view__view-btn {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 3rem;
  padding: 0 1.25rem;
  border-radius: 0.875rem;
  font-size: 0.9375rem;
  font-weight: 700;
  color: #fff;
  background: var(--Primary-Brand-color);
  transition: background-color 0.2s;
}

.quick-view__view-btn:hover {
  background: var(--Primary-Brand-hover);
}
</style>
