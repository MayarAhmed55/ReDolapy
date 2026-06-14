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
</template> -->

<script>
import AppStepper from '../components/sharedRecycleTryon/AppStepper.vue'
import GeneratedDesign from '../components/sharedRecycleTryon/GeneratedDesign.vue'
import RecycleUploadArea from '../components/Recycle/RecycleUploadArea.vue'
import RecycleIdeas from '../components/Recycle/RecycleIdeas.vue'
import { analyzeGarments, generateIdeaImage } from '../api/recycle.js'
import { downloadImage } from '../utils/downloadImage.js'
import { localizeRecycleIdeas, localizeRecycleIdea } from '../utils/recycleLocale.js'
import { mapApiError } from '../utils/mapApiError.js'

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
    rawIdeas: [],
    sessionId: null,
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
    styleIdeas() {
      return localizeRecycleIdeas(this.rawIdeas, this.$i18n.locale)
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
        this.rawIdeas = []
        this.sessionId = null
        this.selectedIdea = null
        this.generatedDesign = null
        this.generateError = ''
      }
      this.analyzeError = ''
    },
    '$i18n.locale'() {
      if (this.selectedIdea) {
        const match = this.styleIdeas.find(idea => idea.id === this.selectedIdea.id)
        if (match) this.selectedIdea = match
      }
      if (this.generatedDesign && this.selectedIdea) {
        this.generatedDesign = {
          ...this.generatedDesign,
          title: this.selectedIdea.title,
          description: this.selectedIdea.design_description || this.selectedIdea.description,
        }
      }
    },
  },
  methods: {
    resetSession() {
      this.selectedIdea = null
      this.generatedDesign = null
      this.rawIdeas = []
      this.sessionId = null
      this.analyzeError = ''
      this.generateError = ''
      this.saveError = ''
    },
    mapRecycleError(err) {
      return mapApiError(err, this.$t.bind(this))
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
      this.rawIdeas = []
      this.sessionId = null

      try {
        const data = await analyzeGarments(this.files.map(f => f.file))
        this.sessionId = data.session_id
        this.rawIdeas = data.ideas || []
      } catch (err) {
        this.analyzeError = this.mapRecycleError(err)
      } finally {
        this.analyzing = false
      }
    },
    async onGenerate({ model }) {
      if (!this.selectedIdea || this.generating) return
      if (!this.sessionId) {
        this.generateError = this.$t('recycle.errors.upload_first')
        return
      }

      this.generating = true
      this.generateError = ''

      try {
        const data = await generateIdeaImage({
          sessionId: this.sessionId,
          ideaId: this.selectedIdea.id,
          model,
        })

        const localizedIdea = localizeRecycleIdea(
          this.rawIdeas.find(idea => idea.id === this.selectedIdea.id) || this.selectedIdea,
          this.$i18n.locale,
        )

        this.generatedDesign = {
          title: localizedIdea.title,
          image: data.image_url,
          description: localizedIdea.design_description || localizedIdea.description,
        }

        this.$nextTick(() => {
          document.getElementById('generated-design')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        })
      } catch (err) {
        this.generateError = this.mapRecycleError(err)
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
