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
            <DialogPanel class="details-modal w-full max-w-4xl">
              <div class="flex items-start justify-between gap-3 mb-5">
                <DialogTitle class="text-lg sm:text-xl font-bold text-(--Primary-Text-color)">
                  {{ $t('wardrobe.details_modal.title') }}
                </DialogTitle>
                <button
                  type="button"
                  class="modal-close-btn"
                  :aria-label="$t('wardrobe.common.close')"
                  @click="$emit('close')"
                >
                  <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>

              <div v-if="loading" class="py-16 text-center">
                <WardrobeLoading :message="$t('wardrobe.details_modal.loading')" />
              </div>

              <div v-else-if="loadError" class="py-10 text-center">
                <p class="text-sm text-red-600 mb-4">{{ loadError }}</p>
                <button type="button" class="retry-btn" @click="loadAnalysis">
                  {{ $t('wardrobe.common.retry') }}
                </button>
              </div>

              <template v-else-if="garment">
                <div v-if="garmentCount > 1" class="flex flex-wrap gap-2 mb-4">
                  <button
                    v-for="idx in garmentCount"
                    :key="idx - 1"
                    type="button"
                    class="garment-tab"
                    :class="{ 'garment-tab--active': garmentIndex === idx - 1 }"
                    @click="selectGarment(idx - 1)"
                  >
                    {{ $t('wardrobe.details_modal.garment_tab', { n: idx }) }}
                  </button>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                  <div class="details-preview">
                    <div class="details-image-wrap">
                      <img
                        :src="analysisImage"
                        :alt="garment.specificType"
                        class="details-image"
                      />
                    </div>

                    <div class="details-name-block">
                      <p class="details-label">{{ $t('wardrobe.product_details.item_name') }}</p>
                      <p class="details-name capitalize">{{ garment.specificType }}</p>
                    </div>

                    <div v-if="primaryColor" class="details-color-tag">
                      <img :src="colorIcon" alt="" class="details-color-icon" aria-hidden="true" />
                      <span>{{ $t('wardrobe.product_details.color_label', { color: primaryColor.toUpperCase() }) }}</span>
                    </div>
                  </div>

                  <div>
                    <ItemDetailsForm
                      :garment="garment"
                      :saving="saving"
                      @update="onGarmentUpdate"
                    />

                    <p v-if="saveError" class="mt-3 text-sm text-red-600">{{ saveError }}</p>

                    <button
                      type="button"
                      class="add-wardrobe-btn mt-6"
                      :disabled="adding"
                      @click="onAddToWardrobe"
                    >
                      <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      {{ adding ? $t('wardrobe.details_modal.adding') : $t('wardrobe.details_modal.add_btn') }}
                    </button>
                  </div>
                </div>
              </template>
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
import ItemDetailsForm from '../Wordrobe/ItemDetailsForm.vue'
import WardrobeLoading from '../Wordrobe/WardrobeLoading.vue'
import colorIcon from '../../assets/colorIcon.svg'
import {
  getAnalysisById,
  updateAnalysis,
} from '../../api/wardrobe.js'
import { useWardrobeStore } from '../../stores/wardrobe.js'
import { mapApiError } from '../../utils/mapApiError.js'

export default {
  name: 'AnalyzeDetailsModal',
  components: { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot, ItemDetailsForm, WardrobeLoading },
  props: {
    open: { type: Boolean, default: false },
    analysisId: { type: String, default: '' },
    initialGarmentIndex: { type: Number, default: 0 },
  },
  emits: ['close', 'added'],
  data: () => ({
    colorIcon,
    loading: false,
    loadError: '',
    saveError: '',
    saving: false,
    adding: false,
    analysisImage: '',
    garments: [],
    garmentIndex: 0,
  }),
  computed: {
    garment() {
      return this.garments[this.garmentIndex] || null
    },
    garmentCount() {
      return this.garments.length
    },
    colorLabels() {
      if (!this.garment?.colors?.length) return []
      return this.garment.colors.map((c) => ({
        name: c.color,
        percentage: c.percentage,
      }))
    },
    primaryColor() {
      return this.garment?.colors?.[0]?.color || ''
    },
  },
  watch: {
    open(val) {
      if (val && this.analysisId) {
        this.garmentIndex = this.initialGarmentIndex
        this.loadAnalysis()
      } else if (!val) {
        this.resetState()
      }
    },
    analysisId(val) {
      if (val && this.open) {
        this.garmentIndex = this.initialGarmentIndex
        this.loadAnalysis()
      }
    },
  },
  methods: {
    resetState() {
      this.loading = false
      this.loadError = ''
      this.saveError = ''
      this.saving = false
      this.adding = false
      this.analysisImage = ''
      this.garments = []
      this.garmentIndex = 0
    },
    selectGarment(index) {
      this.garmentIndex = index
      this.saveError = ''
    },
    async loadAnalysis() {
      if (!this.analysisId) return
      this.loading = true
      this.loadError = ''
      try {
        const data = await getAnalysisById(this.analysisId)
        const analysis = data.analysis || data
        this.analysisImage = analysis.image || ''
        this.garments = (analysis.garments || []).map((g) => ({ ...g }))
        if (!this.garments.length) {
          throw new Error(this.$t('wardrobe.details_modal.no_garments'))
        }
        if (this.garmentIndex >= this.garments.length) {
          this.garmentIndex = 0
        }
      } catch (err) {
        this.loadError = mapApiError(err, this.$t.bind(this))
      } finally {
        this.loading = false
      }
    },
    async onGarmentUpdate(updatedGarment) {
      this.garments.splice(this.garmentIndex, 1, updatedGarment)
      this.saving = true
      this.saveError = ''
      try {
        await updateAnalysis(this.analysisId, this.garments)
      } catch (err) {
        this.saveError = mapApiError(err, this.$t.bind(this))
      } finally {
        this.saving = false
      }
    },
    async onAddToWardrobe() {
      if (!this.analysisId || this.adding) return
      this.adding = true
      this.saveError = ''
      try {
        const wardrobeStore = useWardrobeStore()
        await wardrobeStore.addFromAnalysis(this.analysisId, this.garmentIndex)
        this.$emit('added')
        this.$emit('close')
      } catch (err) {
        this.saveError = mapApiError(err, this.$t.bind(this))
      } finally {
        this.adding = false
      }
    },
  },
}
</script>

<style scoped>
.details-modal {
  background: var(--card-surface);
  border-radius: 1.25rem;
  padding: 1.25rem 1.25rem 1.5rem;
  box-shadow: 0 20px 50px rgb(0 0 0 / 15%);
}

@media (min-width: 640px) {
  .details-modal {
    padding: 1.5rem 1.75rem 1.75rem;
  }
}

.modal-close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  color: var(--Disabled-Text-color);
  flex-shrink: 0;
  transition: background-color 0.2s, color 0.2s;
}

.modal-close-btn:hover {
  background: var(--surface-muted);
  color: var(--Primary-Text-color);
}

.details-image-wrap {
  border-radius: 1rem;
  overflow: hidden;
  background: var(--surface-muted);
  border: 1px solid var(--card-border);
}

.details-image {
  width: 100%;
  max-height: 320px;
  object-fit: contain;
  display: block;
  margin: 0 auto;
  padding: 0.75rem;
}

.details-preview {
  background: var(--card-surface);
  border: 1px solid var(--card-border);
  border-radius: 1.25rem;
  padding: 1.25rem;
}

.details-label {
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--Disabled-Text-color);
  margin-bottom: 0.5rem;
}

.details-name-block {
  margin-top: 1rem;
}

.details-name {
  padding: 0.875rem 1rem;
  border-radius: 0.75rem;
  background: var(--surface-muted);
  font-size: 0.9375rem;
  font-weight: 700;
  color: var(--Primary-Text-color);
  line-height: 1.4;
}

.details-color-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  margin-top: 1rem;
  padding: 0.45rem 0.85rem;
  border-radius: 9999px;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: #ec4899;
  background: rgb(236 72 153 / 10%);
}

.details-color-icon {
  width: 1rem;
  height: 1rem;
  filter: brightness(0) saturate(100%) invert(55%) sepia(55%) saturate(1200%) hue-rotate(300deg) brightness(100%) contrast(95%);
}

.color-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--Primary-Text-color);
  background: var(--surface-active);
  border: 1px solid var(--Primary-Brand-color);
}

.color-chip__pct {
  font-size: 0.6875rem;
  color: var(--Disabled-Text-color);
}

.garment-tab {
  padding: 0.35rem 0.85rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--store-filter-text);
  border: 1px solid var(--input-border);
  background: var(--card-surface);
}

.garment-tab--active {
  color: var(--Primary-Brand-color);
  border-color: var(--Primary-Brand-color);
  background: var(--surface-active);
}

.add-wardrobe-btn,
.retry-btn {
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.875rem 1rem;
  border-radius: 9999px;
  font-size: 0.9375rem;
  font-weight: 700;
  color: #fff;
  background: var(--Primary-Brand-color);
  transition: opacity 0.2s, background-color 0.2s;
}

.add-wardrobe-btn:hover:not(:disabled),
.retry-btn:hover {
  opacity: 0.92;
}

.add-wardrobe-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>
