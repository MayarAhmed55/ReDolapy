<template>
  <main class="w-full max-w-6xl mx-auto px-2 sm:px-4 py-6 sm:py-8">
    <div class="wardrobe-details__toolbar">
      <router-link to="/wardrobe" class="wardrobe-details__back">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
        {{ $t('wardrobe.product_details.back') }}
      </router-link>

      <button
        v-if="wardrobeItem"
        type="button"
        class="wardrobe-details__delete"
        :aria-label="$t('wardrobe.quick_view.delete')"
        @click="showDeleteModal = true"
      >
        <svg class="w-5 h-5 text-(--Secondary-Orange-Brand-color)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true">
          <polyline points="3 6 5 6 21 6"/>
          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
          <path d="M10 11v6M14 11v6"/>
          <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
        </svg>
      </button>
    </div>

    <WardrobeLoading
      v-if="pageLoading"
      :message="$t('wardrobe.loading')"
      :aria-label="$t('wardrobe.loading')"
    />

    <div v-else-if="pageError" class="py-16 text-center">
      <p class="text-sm text-red-600 mb-4">{{ pageError }}</p>
      <router-link to="/wardrobe" class="wardrobe-details__back inline-flex">
        {{ $t('wardrobe.product_details.back') }}
      </router-link>
    </div>

    <div v-else-if="!wardrobeItem" class="py-16 text-center">
      <p class="text-sm text-(--Disabled-Text-color) mb-4">{{ $t('wardrobe.product_details.not_found') }}</p>
      <router-link to="/wardrobe" class="wardrobe-details__back inline-flex">
        {{ $t('wardrobe.product_details.back') }}
      </router-link>
    </div>

    <div v-else-if="garment" class="wardrobe-details__grid">
      <section class="wardrobe-details__preview">
        <div class="wardrobe-details__image-wrap">
          <img :src="displayImage" :alt="displayName" class="wardrobe-details__image" />
        </div>

        <div class="wardrobe-details__name-block">
          <p class="wardrobe-details__label">{{ $t('wardrobe.product_details.item_name') }}</p>
          <p class="wardrobe-details__name capitalize">{{ displayName }}</p>
        </div>

        <div v-if="primaryColor" class="wardrobe-details__color-tag">
          <img :src="colorIcon" alt="" class="wardrobe-details__color-icon" aria-hidden="true" />
          <span>{{ $t('wardrobe.product_details.color_label', { color: primaryColor.toUpperCase() }) }}</span>
        </div>
      </section>

      <section class="wardrobe-details__form-card">
        <ItemDetailsForm
          :garment="garment"
          :saving="saving"
          :readonly="!canEdit"
          @update="onGarmentUpdate"
        />

        <p v-if="saveError" class="mt-3 text-sm text-red-600">{{ saveError }}</p>
        <p v-if="saveSuccess" class="mt-3 text-sm text-(--Secondary-Brand-color)">{{ saveSuccess }}</p>
      </section>
    </div>

    <DeleteConfirmationModal
      :open="showDeleteModal"
      :item-id="id"
      @close="showDeleteModal = false"
      @deleted="onDeleted"
    />
  </main>
</template>

<script>
import { mapState } from 'pinia'
import ItemDetailsForm from '../components/Wordrobe/ItemDetailsForm.vue'
import WardrobeLoading from '../components/Wordrobe/WardrobeLoading.vue'
import DeleteConfirmationModal from '../components/WordrobeModals/DeleteConfirmationModal.vue'
import colorIcon from '../assets/colorIcon.svg'
import { getAnalysisById, updateAnalysis } from '../api/wardrobe.js'
import { useWardrobeStore } from '../stores/wardrobe.js'
import { mapApiError } from '../utils/mapApiError.js'
import { triggerLoginModal } from '../authState.js'
import { API_ERROR_CODES } from '../utils/apiError.js'

export default {
  name: 'WardrobeDetails',
  components: { ItemDetailsForm, WardrobeLoading, DeleteConfirmationModal },
  props: {
    id: { type: String, required: true },
  },
  data: () => ({
    colorIcon,
    analysisImage: '',
    garments: [],
    activeGarmentIndex: 0,
    resolving: true,
    analysisLoading: false,
    loadError: '',
    saving: false,
    saveError: '',
    saveSuccess: '',
    showDeleteModal: false,
  }),
  computed: {
    ...mapState(useWardrobeStore, ['loading']),

    wardrobeStore() {
      return useWardrobeStore()
    },

    wardrobeItem() {
      return this.wardrobeStore.getItemById(this.id)
    },

    pageLoading() {
      return this.resolving || this.analysisLoading || this.loading
    },

    pageError() {
      return this.loadError
    },

    garment() {
      if (this.garments.length) {
        return this.garments[this.activeGarmentIndex] || null
      }
      if (!this.wardrobeItem) return null
      return this.garmentFromWardrobeItem(this.wardrobeItem)
    },

    canEdit() {
      return Boolean(this.wardrobeItem?.analysis_id)
    },

    displayImage() {
      return this.analysisImage || this.wardrobeItem?.image || ''
    },

    displayName() {
      return this.garment?.specificType || this.wardrobeItem?.name || ''
    },

    primaryColor() {
      return this.garment?.colors?.[0]?.color
        || this.wardrobeItem?.color
        || this.wardrobeItem?.colors?.[0]?.color
        || ''
    },
  },
  watch: {
    id: {
      immediate: true,
      handler() {
        this.resolveItem()
      },
    },
  },
  methods: {
    garmentFromWardrobeItem(item) {
      return {
        gender: item.gender,
        category: item.category,
        season: Array.isArray(item.season) ? [...item.season] : [],
        style: item.style,
        pattern: item.pattern,
        specificType: item.name,
        colors: item.colors || (item.color ? [{ color: item.color, percentage: 100 }] : []),
      }
    },

    async resolveItem() {
      this.resolving = true
      this.loadError = ''
      this.saveError = ''
      this.saveSuccess = ''
      this.garments = []
      this.analysisImage = ''

      try {
        if (!this.wardrobeStore.initialized || !this.wardrobeStore.items.length) {
          await this.wardrobeStore.fetchAll()
        }

        const item = this.wardrobeStore.getItemById(this.id)
        if (!item) {
          this.resolving = false
          return
        }

        if (item.analysis_id) {
          this.activeGarmentIndex = item.garment_index ?? 0
          await this.loadAnalysis(item.analysis_id)
        }
      } catch (err) {
        if (err.message === API_ERROR_CODES.LOGIN_REQUIRED) {
          triggerLoginModal()
        } else {
          this.loadError = mapApiError(err, this.$t.bind(this))
        }
      } finally {
        this.resolving = false
      }
    },

    async loadAnalysis(analysisId) {
      this.analysisLoading = true
      try {
        const data = await getAnalysisById(analysisId)
        const analysis = data.analysis || data
        this.analysisImage = analysis.image || ''
        this.garments = (analysis.garments || []).map((g) => ({ ...g }))
        if (this.activeGarmentIndex >= this.garments.length) {
          this.activeGarmentIndex = 0
        }
      } catch (err) {
        this.loadError = mapApiError(err, this.$t.bind(this))
      } finally {
        this.analysisLoading = false
      }
    },

    async onGarmentUpdate(updatedGarment) {
      if (!this.wardrobeItem?.analysis_id) return

      this.garments.splice(this.activeGarmentIndex, 1, updatedGarment)
      this.saving = true
      this.saveError = ''
      this.saveSuccess = ''

      try {
        await updateAnalysis(this.wardrobeItem.analysis_id, this.garments)
        this.saveSuccess = this.$t('wardrobe.product_details.saved')
      } catch (err) {
        this.saveError = mapApiError(err, this.$t.bind(this))
      } finally {
        this.saving = false
      }
    },

    onDeleted() {
      this.showDeleteModal = false
      this.$router.push('/wardrobe')
    },
  },
}
</script>

<style scoped>
.wardrobe-details__toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.wardrobe-details__back {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--Primary-Text-color);
  background: var(--card-surface);
  border: 1px solid var(--card-border);
  text-decoration: none;
  transition: border-color 0.2s, background-color 0.2s;
}

.wardrobe-details__back:hover {
  border-color: var(--Primary-Brand-color);
  background: var(--surface-muted);
}

.wardrobe-details__delete {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 0.875rem;
  background: rgb(255 138 61 / 12%);
  border: 1px solid rgb(255 138 61 / 20%);
  transition: background-color 0.2s;
}

.wardrobe-details__delete:hover {
  background: rgb(255 138 61 / 18%);
}

.wardrobe-details__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
}

@media (min-width: 1024px) {
  .wardrobe-details__grid {
    grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
    gap: 1.5rem;
  }
}

.wardrobe-details__preview,
.wardrobe-details__form-card {
  background: var(--card-surface);
  border: 1px solid var(--card-border);
  border-radius: 1.25rem;
  padding: 1.25rem;
}

@media (min-width: 640px) {
  .wardrobe-details__preview,
  .wardrobe-details__form-card {
    padding: 1.5rem;
  }
}

.wardrobe-details__image-wrap {
  border-radius: 1rem;
  overflow: hidden;
  background: var(--surface-muted);
  margin-bottom: 1.25rem;
}

.wardrobe-details__image {
  width: 100%;
  max-height: 420px;
  object-fit: contain;
  display: block;
  margin: 0 auto;
  padding: 1rem;
}

.wardrobe-details__label {
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--Disabled-Text-color);
  margin-bottom: 0.5rem;
}

.wardrobe-details__name {
  padding: 0.875rem 1rem;
  border-radius: 0.75rem;
  background: var(--surface-muted);
  font-size: 0.9375rem;
  font-weight: 700;
  color: var(--Primary-Text-color);
  line-height: 1.4;
}

.wardrobe-details__name-block {
  margin-bottom: 1rem;
}

.wardrobe-details__color-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.45rem 0.85rem;
  border-radius: 9999px;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: #ec4899;
  background: rgb(236 72 153 / 10%);
}

.wardrobe-details__color-icon {
  width: 1rem;
  height: 1rem;
  filter: brightness(0) saturate(100%) invert(55%) sepia(55%) saturate(1200%) hue-rotate(300deg) brightness(100%) contrast(95%);
}
</style>
