<!-- <template>
  <main class="w-full max-w-5xl mx-auto px-2 sm:px-4 py-6 sm:py-10">
    <header class="text-center mb-8 sm:mb-10">
      <h1 class="text-xl sm:text-2xl lg:text-3xl font-bold text-(--Primary-Text-color) mb-2">
        Redolapy Up-cycling Design Generator
      </h1>
      <p class="text-sm sm:text-base text-(--Secondary-Text-color) font-medium">
        Upload your pieces · Pick a design · See it come to life
      </p>
    </header>

    <RecycleStepper
      :active-step="activeStep"
      :all-complete="!!generatedDesign"
      class="mb-10 sm:mb-12"
    />

    <UploadArea
      v-model:files="files"
      :analyzing="analyzing"
      :error="analyzeError"
      class="mb-10 sm:mb-12"
      @analyze="onAnalyze"
    />

    <RecycleIdeas
      v-if="styleIdeas.length"
      :ideas="styleIdeas"
      :selected-id="selectedIdea?.id ?? null"
      :loading="generating"
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
      @save="onSaveSpecs"
    />
  </main>
</template>

<script>
import RecycleStepper from '../components/Recycle/RecycleStepper.vue'
import UploadArea from '../components/Recycle/UploadArea.vue'
import RecycleIdeas from '../components/Recycle/RecycleIdeas.vue'
import GeneratedDesign from '../components/Recycle/GeneratedDesign.vue'
import { analyzeGarments, generateDesign } from '../api/recycle.js'
import { downloadImage } from '../utils/downloadImage.js'

export default {
  name: 'Recycle',
  components: {
    RecycleStepper,
    UploadArea,
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
        this.generateError = 'Please upload garments and discover design ideas first.'
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
        this.saveError = err.message || 'Failed to download image.'
      } finally {
        this.saving = false
      }
    },
  },
}
</script> -->


<template>
  <main class="w-full max-w-5xl mx-auto px-2 sm:px-4 py-6 sm:py-10">
    <header class="text-center mb-8 sm:mb-10">
      <!-- 💡 Dynamic Brand Title -->
      <h1 class="text-xl sm:text-2xl lg:text-3xl font-bold text-(--Primary-Text-color) mb-2">
        {{ $t('recycle.header_title') }}
      </h1>
      <!-- 💡 Dynamic Subtitle Pipeline Workflow -->
      <p class="text-sm sm:text-base text-(--Secondary-Text-color) font-medium">
        {{ $t('recycle.header_subtitle') }}
      </p>
    </header>

    <!-- 💡 Fixed: Passing step labels down as props -->
    <RecycleStepper
      :active-step="activeStep"
      :all-complete="!!generatedDesign"
      :uploadLabel="$t('recycle.steps.upload')"
      :chooseLabel="$t('recycle.steps.choose')"
      :resultLabel="$t('recycle.steps.result')"
      class="mb-10 sm:mb-12"
    />

    <!-- 💡 Fixed: Passing dropzone & button text states down as props -->
    <UploadArea
      v-model:files="files"
      :analyzing="analyzing"
      :error="analyzeError"
      :titleLabel="$t('recycle.upload.title')"
      :buttonLabel="$t('recycle.upload.button')"
      :loadingLabel="$t('recycle.upload.loading')"
      class="mb-10 sm:mb-12"
      @analyze="onAnalyze"
    />

    <!-- 💡 Fixed: Passing section headers and dynamic buttons down as props -->
    <RecycleIdeas
      v-if="styleIdeas.length"
      :ideas="styleIdeas"
      :selected-id="selectedIdea?.id ?? null"
      :loading="generating"
      :titleLabel="$t('recycle.ideas.title')"
      :submitLabel="$t('recycle.ideas.submit')"
      class="mb-10 sm:mb-12"
      @select="onSelectIdea"
      @generate="onGenerate"
    />

    <p v-if="generateError" class="mb-6 text-sm text-red-600 text-center">{{ generateError }}</p>

    <!-- 💡 Fixed: Passing download button label down as a prop -->
    <GeneratedDesign
      v-if="generatedDesign"
      :design="generatedDesign"
      :saving="saving"
      :error="saveError"
      :saveLabel="$t('recycle.output.save_btn')"
      class="mb-10 sm:mb-12"
      @save="onSaveSpecs"
    />
  </main>
</template>

<script>
import RecycleStepper from '../components/Recycle/RecycleStepper.vue'
import UploadArea from '../components/Recycle/UploadArea.vue'
import RecycleIdeas from '../components/Recycle/RecycleIdeas.vue'
import GeneratedDesign from '../components/Recycle/GeneratedDesign.vue'
import { analyzeGarments, generateDesign } from '../api/recycle.js'
import { downloadImage } from '../utils/downloadImage.js'

export default {
  name: 'Recycle',
  components: {
    RecycleStepper,
    UploadArea,
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
        // 💡 Localized internal runtime text validation error strings
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
        // 💡 Localized image export error string
        this.saveError = err.message || this.$t('recycle.errors.save_failed')
      } finally {
        this.saving = false
      }
    },
  },
}
</script>