<template>
  <main class="w-full max-w-5xl mx-auto px-2 sm:px-4 py-6 sm:py-10">
    <header class="text-center mb-8 sm:mb-10">
      <h1 class="text-xl sm:text-2xl lg:text-3xl font-bold text-(--Primary-Text-color) mb-2">
        {{ $t('recycle.header_title') }}
      </h1>
      <p class="text-sm sm:text-base text-(--Secondary-Text-color) font-medium">
        {{ $t('recycle.header_subtitle') }}
      </p>
    </header>

    <AppStepper
      :steps="recycleSteps"
      :active-step="activeStep"
      :all-complete="!!generatedDesign"
      class="mb-10 sm:mb-12"
    />

    <RecycleUploadArea
      v-model:files="files"
      :analyzing="analyzing"
      :error="analyzeError"
      :title-label="$t('recycle.upload.title')"
      :support-text-label="$t('recycle.upload.support_text')"
      :drag-prompt-label="$t('recycle.upload.drag_prompt')"
      :piece-prefix-label="$t('recycle.upload.piece_prefix')"
      :button-label="$t('recycle.upload.button')"
      :loading-label="$t('recycle.upload.loading')"
      class="mb-10 sm:mb-12"
      @analyze="onAnalyze"
    />

    <RecycleIdeas
      v-if="styleIdeas.length"
      :ideas="styleIdeas"
      :selected-id="selectedIdea?.id ?? null"
      :loading="generating"
      :title-label="$t('recycle.ideas.title')"
      :submit-label="$t('recycle.ideas.submit')"
      :loading-label="$t('recycle.ideas.loading')"
      class="mb-10 sm:mb-12"
      @select="onSelectIdea"
      @generate="onGenerate"
    />

    <p v-if="generateError" class="mb-6 text-sm text-red-600 text-center">{{ generateError }}</p>

    <GeneratedDesign
      v-if="generatedDesign"
      :design="generatedDesign"
      :saving="saving"
      :error="saveError"
      :heading="$t('recycle.output.heading')"
      :action-label="$t('recycle.output.save_btn')"
      :action-loading-label="$t('recycle.output.saving')"
      @save="onSaveSpecs"
    />
  </main>
</template>

<script>
import AppStepper from '../components/sharedRecycleTryon/AppStepper.vue'
import GeneratedDesign from '../components/sharedRecycleTryon/GeneratedDesign.vue'
import RecycleUploadArea from '../components/Recycle/RecycleUploadArea.vue'
import RecycleIdeas from '../components/Recycle/RecycleIdeas.vue'
import { analyzeGarments, generateDesign } from '../api/recycle.js'
import { downloadImage } from '../utils/downloadImage.js'

export default {
  name: 'Recycle',
  components: {
    AppStepper,
    RecycleUploadArea,
    RecycleIdeas,
    GeneratedDesign,
  },
  data: () => ({
    files: [],
    analyzing: false,
    generating: false,
    saving: false,
    analyzeError: '',
    generateError: '',
    saveError: '',
    selectedIdea: null,
    generatedDesign: null,
    styleIdeas: [],
    sourceImages: [],
  }),
  computed: {
    recycleSteps() {
      return [
        {
          id: 'upload',
          label: this.$t('recycle.steps.upload'),
          subtitle: this.$t('recycle.steps.upload_subtitle'),
        },
        {
          id: 'idea',
          label: this.$t('recycle.steps.choose'),
          subtitle: this.$t('recycle.steps.choose_subtitle'),
        },
        {
          id: 'generate',
          label: this.$t('recycle.steps.result'),
          subtitle: this.$t('recycle.steps.result_subtitle'),
        },
      ]
    },
    activeStep() {
      if (this.generatedDesign) return 2
      if (this.styleIdeas.length) return 1
      return 0
    },
  },
  watch: {
    files(newFiles, oldFiles) {
      if (!newFiles.length) {
        this.resetSession()
        return
      }
      if (oldFiles?.length && newFiles.length !== oldFiles.length) {
        this.styleIdeas = []
        this.sourceImages = []
        this.selectedIdea = null
        this.generatedDesign = null
        this.generateError = ''
      }
      this.analyzeError = ''
    },
  },
  methods: {
    resetSession() {
      this.selectedIdea = null
      this.generatedDesign = null
      this.styleIdeas = []
      this.sourceImages = []
      this.analyzeError = ''
      this.generateError = ''
      this.saveError = ''
    },
    onSelectIdea(idea) {
      this.selectedIdea = idea
      this.generateError = ''
    },
    async onAnalyze() {
      if (!this.files.length || this.analyzing) return

      this.analyzing = true
      this.analyzeError = ''
      this.generateError = ''
      this.selectedIdea = null
      this.generatedDesign = null
      this.styleIdeas = []
      this.sourceImages = []

      try {
        const data = await analyzeGarments(this.files.map(f => f.file))
        this.sourceImages = data.images
        this.styleIdeas = data.upcycling_ideas.map(idea => ({
          ...idea,
          description: idea.design_description,
        }))
      } catch (err) {
        this.analyzeError = err.message
      } finally {
        this.analyzing = false
      }
    },
    async onGenerate({ model, size }) {
      if (!this.selectedIdea || this.generating) return
      if (!this.sourceImages.length) {
        this.generateError = this.$t('recycle.errors.upload_first')
        return
      }

      this.generating = true
      this.generateError = ''

      try {
        const data = await generateDesign({
          prompt: this.selectedIdea.image_prompt,
          images: this.sourceImages,
          model,
          size,
        })

        this.generatedDesign = {
          title: this.selectedIdea.title,
          image: data.images[0],
          description: this.selectedIdea.design_description || this.selectedIdea.description,
        }

        this.$nextTick(() => {
          document.getElementById('generated-design')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        })
      } catch (err) {
        this.generateError = err.message
      } finally {
        this.generating = false
      }
    },
    async onSaveSpecs() {
      if (!this.generatedDesign?.image || this.saving) return

      this.saving = true
      this.saveError = ''
      try {
        await downloadImage(this.generatedDesign.image, this.generatedDesign.title)
      } catch (err) {
        this.saveError = err.message || this.$t('recycle.errors.save_failed')
      } finally {
        this.saving = false
      }
    },
  },
}
</script>
