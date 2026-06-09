<template>
  <main class="w-full max-w-5xl mx-auto px-2 sm:px-4 py-6 sm:py-10">
    <header class="text-center mb-8 sm:mb-10">
      <h1 class="text-xl sm:text-2xl lg:text-3xl font-bold text-(--Primary-Text-color) mb-2">
        Redolapy <span class="gradientColor">Virtual Try-on</span>
      </h1>
      <p class="text-sm sm:text-base text-(--Secondary-Text-color) font-medium">
        Upload your pieces · Pick a style · See it come to life
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
      heading="Your Virtual Try-on"
      action-label="Add to Wardrobe"
      action-loading-label="Adding…"
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
import mockResultImage from '../assets/HeaderImage.png'

const TRY_ON_STEPS = [
  { id: 'image', label: 'Upload Your image', subtitle: 'Upload a photo or pick an avatar' },
  { id: 'clothes', label: 'Upload Your clothes', subtitle: 'Upload 1-2 garment photos' },
  { id: 'tryon', label: 'Virtual Try-on', subtitle: 'See your outfit come to life' },
]

const MOCK_DESCRIPTION =
  'Our AI has seamlessly combined your uploaded garments into a cohesive look. ' +
  'The silhouette balances structure and flow, pairing your pieces for a polished virtual try-on preview.'

export default {
  name: 'TryOn',
  components: {
    AppStepper,
    UserModelUpload,
    TryOnUploadArea,
    GeneratedDesign,
  },
  data: () => ({
    tryOnSteps: TRY_ON_STEPS,
    model: null,
    garments: [],
    generating: false,
    saving: false,
    generateError: '',
    saveError: '',
    tryOnResult: null,
  }),
  computed: {
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
  },
  methods: {
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
          title: garmentNames || 'Your Virtual Look',
          image: mockResultImage,
          description: MOCK_DESCRIPTION,
        }

        this.$nextTick(() => {
          document.getElementById('tryon-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        })
      } catch (err) {
        this.generateError = err.message || 'Something went wrong. Please try again.'
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
        this.saveError = err.message || 'Failed to add to wardrobe.'
      } finally {
        this.saving = false
      }
    },
  },
}
</script>
