<template>
  <main class="w-full max-w-5xl mx-auto px-2 sm:px-4 py-6 sm:py-10">
    <header class="text-center mb-8 sm:mb-10">
      <h1 class="text-xl sm:text-2xl lg:text-3xl font-bold text-(--Primary-Text-color) mb-2">
        {{ $t('matching.header_prefix') }}
        <span class="gradientColor">{{ $t('matching.header_highlight') }}</span>
      </h1>
      <p class="text-sm sm:text-base text-(--Secondary-Text-color) font-medium max-w-2xl mx-auto">
        {{ $t('matching.header_subtitle') }}
      </p>
    </header>

    <AppStepper
      :steps="matchingSteps"
      :active-step="activeStep"
      :all-complete="hasResults"
      class="mb-8 sm:mb-10"
    />

    <MatchingSourceCards
      v-model="source"
      class="mb-6 sm:mb-8"
    />

    <MatchingWardrobePanel
      v-if="source === 'wardrobe'"
      v-model:selected-id="selectedWardrobeId"
      :items="wardrobeItems"
      :loading="wardrobeLoading"
      class="mb-5"
    />

    <MatchingGalleryPanel
      v-else-if="source === 'gallery'"
      ref="galleryPanel"
      v-model:selected-index="selectedGarmentIndex"
      class="mb-5"
      @analyzed="onGalleryAnalyzed"
      @reset="onGalleryReset"
    />

    <MatchingStatusBanner
      :has-selection="hasSelection"
      class="mb-6 sm:mb-8"
    />

    <MatchingResults
      v-if="hasResults"
      :wardrobe-matches="wardrobeMatches"
      :store-matches="storeMatches"
      class="mb-8 sm:mb-10"
      id="matching-results"
    />

    <div class="flex justify-center">
      <button
        type="button"
        class="matching-action-btn"
        :disabled="!canFindMatches || findingMatches"
        @click="onFindMatches"
      >
        <img :src="starsIcon" alt="" aria-hidden="true" />
        {{ buttonLabel }}
      </button>
    </div>

    <p v-if="matchError" class="mt-4 text-sm text-red-600 text-center">{{ matchError }}</p>
  </main>
</template>

<script>
import { mapState } from 'pinia'
import AppStepper from '../components/sharedRecycleTryon/AppStepper.vue'
import MatchingSourceCards from '../components/Matching/MatchingSourceCards.vue'
import MatchingWardrobePanel from '../components/Matching/MatchingWardrobePanel.vue'
import MatchingGalleryPanel from '../components/Matching/MatchingGalleryPanel.vue'
import MatchingStatusBanner from '../components/Matching/MatchingStatusBanner.vue'
import MatchingResults from '../components/Matching/MatchingResults.vue'
import starsIcon from '../assets/StarsIcon.svg'
import { useWardrobeStore } from '../stores/wardrobe.js'
import { findMatchesForAnalysis, findMatchesForWardrobeItem } from '../api/matching.js'
import {
  enrichMatchesWithImages,
  groupMatchesBySource,
  loadStoreProductsCache,
} from '../utils/matchHelpers.js'
import { mapApiError } from '../utils/mapApiError.js'
import { triggerLoginModal } from '../authState.js'
import { API_ERROR_CODES } from '../utils/apiError.js'

export default {
  name: 'Matching',
  components: {
    AppStepper,
    MatchingSourceCards,
    MatchingWardrobePanel,
    MatchingGalleryPanel,
    MatchingStatusBanner,
    MatchingResults,
  },
  data: () => ({
    starsIcon,
    source: '',
    selectedWardrobeId: '',
    selectedGarmentIndex: null,
    galleryAnalysis: null,
    matches: [],
    hasResults: false,
    findingMatches: false,
    matchError: '',
    localWardrobeError: '',
  }),
  computed: {
    ...mapState(useWardrobeStore, ['items', 'loading', 'initialized']),

    wardrobeStore() {
      return useWardrobeStore()
    },

    wardrobeItems() {
      return this.items
    },

    wardrobeLoading() {
      return this.loading && !this.initialized
    },

    matchingSteps() {
      return [
        {
          id: 'select',
          label: this.$t('matching.steps.select'),
          subtitle: this.$t('matching.steps.select_subtitle'),
        },
        {
          id: 'find',
          label: this.$t('matching.steps.find'),
          subtitle: this.$t('matching.steps.find_subtitle'),
        },
        {
          id: 'results',
          label: this.$t('matching.steps.results'),
          subtitle: this.$t('matching.steps.results_subtitle'),
        },
      ]
    },

    activeStep() {
      if (this.hasResults) return 2
      if (this.hasSelection) return 1
      return 0
    },

    hasSelection() {
      if (this.source === 'wardrobe') return Boolean(this.selectedWardrobeId)
      if (this.source === 'gallery') {
        return this.selectedGarmentIndex != null && Boolean(this.galleryAnalysis?.analysis_id)
      }
      return false
    },

    canFindMatches() {
      return this.hasSelection
    },

    groupedMatches() {
      return groupMatchesBySource(this.matches)
    },

    wardrobeMatches() {
      return this.groupedMatches.wardrobe
    },

    storeMatches() {
      return this.groupedMatches.store
    },

    buttonLabel() {
      if (this.findingMatches) return this.$t('matching.action.loading')
      if (this.hasSelection) return this.$t('matching.action.see_matching')
      return this.$t('matching.action.find_matches')
    },
  },
  watch: {
    source(newSource, oldSource) {
      if (oldSource && newSource !== oldSource) {
        this.resetFlow()
      }
    },
    selectedWardrobeId(newId, oldId) {
      if (oldId && newId !== oldId) this.clearResults()
    },
    selectedGarmentIndex(newIndex, oldIndex) {
      if (oldIndex != null && newIndex !== oldIndex) this.clearResults()
    },
  },
  mounted() {
    this.loadWardrobe()
    loadStoreProductsCache().catch(() => {})
  },
  methods: {
    async loadWardrobe() {
      this.localWardrobeError = ''
      try {
        await this.wardrobeStore.fetchAll()
      } catch (err) {
        if (err.message === API_ERROR_CODES.LOGIN_REQUIRED) {
          triggerLoginModal()
        } else {
          this.localWardrobeError = mapApiError(err, this.$t.bind(this))
        }
      }
    },

    resetFlow() {
      this.selectedWardrobeId = ''
      this.selectedGarmentIndex = null
      this.galleryAnalysis = null
      this.clearResults()
      this.$refs.galleryPanel?.reset()
    },

    clearResults() {
      this.matches = []
      this.hasResults = false
      this.matchError = ''
    },

    onGalleryAnalyzed(data) {
      this.galleryAnalysis = data
      this.clearResults()
    },

    onGalleryReset() {
      this.galleryAnalysis = null
      this.clearResults()
    },

    async onFindMatches() {
      if (!this.canFindMatches || this.findingMatches) return

      this.findingMatches = true
      this.matchError = ''

      try {
        let data

        if (this.source === 'wardrobe') {
          data = await findMatchesForWardrobeItem(this.selectedWardrobeId)
        } else {
          data = await findMatchesForAnalysis(this.galleryAnalysis.analysis_id)
        }

        const rawMatches = data.matches || []
        this.matches = await enrichMatchesWithImages(rawMatches, {
          getWardrobeItemById: (id) => this.wardrobeStore.getItemById(id),
        })
        this.hasResults = this.matches.length > 0

        this.$nextTick(() => {
          document.getElementById('matching-results')?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          })
        })
      } catch (err) {
        if (err.message === API_ERROR_CODES.LOGIN_REQUIRED) {
          triggerLoginModal()
        } else {
          this.matchError = mapApiError(err, this.$t.bind(this))
        }
      } finally {
        this.findingMatches = false
      }
    },
  },
}
</script>

<style scoped>
.matching-action-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.625rem;
  width: 100%;
  max-width: 22rem;
  min-width: 16rem;
  padding: 0.875rem 3rem;
  border-radius: 9999px;
  font-size: 0.9375rem;
  font-weight: 600;
  color: #fff;
  background-color: var(--Primary-Brand-color);
  border: none;
  transition: opacity 0.2s, background-color 0.2s;
}

.matching-action-btn:hover:not(:disabled) {
  background-color: var(--Primary-Brand-hover);
}

.matching-action-btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
  background-color: #6b7b8f;
}

.matching-action-btn img {
  width: 1rem;
  height: 1rem;
}
</style>
