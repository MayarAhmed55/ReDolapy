<template>
  <main class="w-full max-w-5xl mx-auto px-2 sm:px-4 py-6 sm:py-10">
    <header class="text-center mb-8 sm:mb-10">
      <h1 class="text-xl sm:text-2xl lg:text-3xl font-bold text-(--Primary-Text-color) mb-2">
        {{ $t('tryOn.header_title') }}
      </h1>
      <p class="text-sm sm:text-base text-(--Secondary-Text-color) font-medium">
        {{ $t('tryOn.header_subtitle') }}
      </p>
    </header>

    <AppStepper
      :steps="tryOnSteps"
      :active-step="activeStep"
      :all-complete="!!tryOnResult"
      class="mb-10 sm:mb-12"
    />

    <UserModelUpload
      v-model:model="model"
      class="mb-6 sm:mb-8"
    />

    <TryOnUploadArea
      v-model:model="model"
      v-model:garments="garments"
      :generating="generating"
      :error="generateError"
      class="mb-10 sm:mb-12"
      @generate="onGenerate"
    />

    <GeneratedDesign
      v-if="tryOnResult"
      :design="tryOnResult"
      :saving="saving"
      :error="saveError"
      :heading="$t('tryOn.output.heading')"
      :action-label="$t('tryOn.output.save_btn')"
      :action-loading-label="$t('tryOn.output.saving')"
      :match-badge-label="$t('tryOn.output.style_match', { percent: 98 })"
      :zoom-aria-label="$t('tryOn.output.zoom_aria')"
      scroll-id="tryon-result"
      show-match-badge
      @save="onAddToWardrobe"
    />
  </main>
</template>

<script>
import AppStepper from '../components/sharedRecycleTryon/AppStepper.vue'
import GeneratedDesign from '../components/sharedRecycleTryon/GeneratedDesign.vue'
import UserModelUpload from '../components/TryOn/UserModelUpload.vue'
import TryOnUploadArea from '../components/TryOn/TryOnUploadArea.vue'
import { fetchProductById } from '../api/store.js'
import { mapApiError } from '../utils/mapApiError.js'
import { normalizeProduct, productToTryOnGarment } from '../utils/storeHelpers.js'
import mockResultImage from '../assets/HeaderImage.png'

export default {
  name: 'TryOn',
  components: {
    AppStepper,
    UserModelUpload,
    TryOnUploadArea,
    GeneratedDesign,
  },
  data: () => ({
    model: null,
    garments: [],
    generating: false,
    saving: false,
    generateError: '',
    saveError: '',
    tryOnResult: null,
  }),
  computed: {
    tryOnSteps() {
      return [
        {
          id: 'image',
          label: this.$t('tryOn.steps.image'),
          subtitle: this.$t('tryOn.steps.image_subtitle'),
        },
        {
          id: 'clothes',
          label: this.$t('tryOn.steps.clothes'),
          subtitle: this.$t('tryOn.steps.clothes_subtitle'),
        },
        {
          id: 'tryon',
          label: this.$t('tryOn.steps.tryon'),
          subtitle: this.$t('tryOn.steps.tryon_subtitle'),
        },
      ]
    },
    activeStep() {
      if (this.tryOnResult) return 2
      if (this.model) return 1
      return 0
    },
  },
  watch: {
    model() {
      this.resetResult()
    },
    garments(newGarments, oldGarments) {
      if (newGarments.length !== oldGarments?.length) {
        this.resetResult()
      }
    },
    '$route.query.productId': {
      immediate: false,
      handler(productId) {
        if (productId) {
          this.loadStoreProduct(productId)
        }
      },
    },
  },
  mounted() {
    const productId = this.$route.query.productId
    if (productId) {
      this.loadStoreProduct(productId)
    }
  },
  methods: {
    categoryLabel(category) {
      const key = `store.category_options.${category}`
      return this.$te(key) ? this.$t(key) : category
    },
    async loadStoreProduct(productId) {
      try {
        const raw = await fetchProductById(productId)
        const product = normalizeProduct(raw)
        if (!product.tryOnEnabled || !product.image) return

        this.garments = [
          productToTryOnGarment(product, this.categoryLabel(product.category)),
        ]
      } catch (err) {
        this.generateError = mapApiError(err, this.$t.bind(this))
      }
    },
    resetResult() {
      this.tryOnResult = null
      this.generateError = ''
      this.saveError = ''
    },
    async onGenerate() {
      if (!this.model || !this.garments.length || this.generating) return

      this.generating = true
      this.generateError = ''

      try {
        await new Promise(resolve => setTimeout(resolve, 1800))

        const garmentNames = this.garments.map(g => g.title).join(' & ')
        this.tryOnResult = {
          title: garmentNames || this.$t('tryOn.output.heading'),
          image: mockResultImage,
          description: this.$t('tryOn.mock_description'),
        }

        this.$nextTick(() => {
          document.getElementById('tryon-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        })
      } catch (err) {
        this.generateError = mapApiError(err, this.$t.bind(this))
      } finally {
        this.generating = false
      }
    },
    async onAddToWardrobe() {
      if (this.saving) return

      this.saving = true
      this.saveError = ''

      try {
        await new Promise(resolve => setTimeout(resolve, 800))
      } catch (err) {
        this.saveError = err.message || this.$t('tryOn.errors.save_failed')
      } finally {
        this.saving = false
      }
    },
  },
}
</script>
