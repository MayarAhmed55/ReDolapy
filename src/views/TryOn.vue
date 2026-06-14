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
      ref="userModelUpload"
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

    <TryOnResult
      v-if="tryOnResult"
      :image-url="tryOnResult.image"
      :heading="$t('tryOn.output.heading')"
      :save-label="$t('tryOn.output.download_btn')"
      :try-again-label="$t('tryOn.output.try_again_btn')"
      :saving-label="$t('tryOn.output.downloading')"
      :saving="saving"
      :error="saveError"
      scroll-id="tryon-result"
      @try-again="onTryAgain"
      @save="onSaveResult"
    />
  </main>
</template>

<script>
import AppStepper from '../components/sharedRecycleTryon/AppStepper.vue'
import TryOnResult from '../components/TryOn/TryOnResult.vue'
import UserModelUpload from '../components/TryOn/UserModelUpload.vue'
import TryOnUploadArea from '../components/TryOn/TryOnUploadArea.vue'
import { fetchProductById } from '../api/store.js'
import { generateOutfitTryOn } from '../api/tryOn.js'
import { downloadImage } from '../utils/downloadImage.js'
import { mapApiError } from '../utils/mapApiError.js'
import { normalizeProduct, productToTryOnGarment } from '../utils/storeHelpers.js'
import { pickTopAndBottomGarments, resolveImageFile, resolvePersonForTryOn } from '../utils/tryOnHelpers.js'

export default {
  name: 'TryOn',
  components: {
    AppStepper,
    UserModelUpload,
    TryOnUploadArea,
    TryOnResult,
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
    '$route.query.avatarId': {
      immediate: false,
      handler() {
        this.applyAvatarFromRoute()
      },
    },
  },
  mounted() {
    const productId = this.$route.query.productId
    if (productId) {
      this.loadStoreProduct(productId)
    }
    this.applyAvatarFromRoute()
    this.applyUploadedModelFromRoute()
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
    applyAvatarFromRoute() {
      const avatarId = this.$route.query.avatarId
      if (!avatarId) return
      this.$nextTick(() => {
        this.$refs.userModelUpload?.applyAvatarById(String(avatarId))
      })
    },
    applyUploadedModelFromRoute() {
      const file = history.state?.uploadedModelFile
      if (!(file instanceof File)) return

      this.$nextTick(() => {
        this.$refs.userModelUpload?.addModelFile(file)
      })

      const { uploadedModelFile, ...rest } = history.state || {}
      window.history.replaceState(rest, '')
    },
    async onGenerate() {
      if (!this.model || this.garments.length < 2 || this.generating) {
        if (!this.model || this.garments.length < 2) {
          this.generateError = this.$t('tryOn.errors.need_two_garments')
        }
        return
      }

      this.generating = true
      this.generateError = ''

      try {
        const { top, bottom } = pickTopAndBottomGarments(this.garments)
        const person = resolvePersonForTryOn(this.model)
        const [topImage, bottomImage] = await Promise.all([
          resolveImageFile(top, 'top.jpg'),
          resolveImageFile(bottom, 'bottom.jpg'),
        ])

        const result = await generateOutfitTryOn({
          ...person,
          topImage,
          bottomImage,
        })

        this.tryOnResult = {
          image: result.imageUrl,
        }

        this.$nextTick(() => {
          document.getElementById('tryon-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        })
      } catch (err) {
        if (err.message === 'NEED_TWO_GARMENTS') {
          this.generateError = this.$t('tryOn.errors.need_two_garments')
        } else {
          this.generateError = mapApiError(err, this.$t.bind(this))
        }
      } finally {
        this.generating = false
      }
    },
    onTryAgain() {
      this.model = null
      this.garments = []
      this.resetResult()
    },
    async onSaveResult() {
      if (this.saving || !this.tryOnResult?.image) return

      this.saving = true
      this.saveError = ''

      try {
        await downloadImage(this.tryOnResult.image, this.$t('tryOn.output.heading'))
      } catch (err) {
        this.saveError = err.message || this.$t('tryOn.errors.save_failed')
      } finally {
        this.saving = false
      }
    },
  },
}
</script>
