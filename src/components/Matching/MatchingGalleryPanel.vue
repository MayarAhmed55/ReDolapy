<template>
  <div class="w-full">
    <div
      v-if="!analysisResult"
      class="upload-dashed-border relative w-full cursor-pointer rounded-[24px]"
      role="button"
      tabindex="0"
      @click="$refs.fileInput.click()"
      @keydown.enter="$refs.fileInput.click()"
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="onDrop"
    >
      <DashedBorderFrame />
      <input
        ref="fileInput"
        type="file"
        :accept="acceptAttr"
        class="hidden"
        @change="onFileChange"
      />
      <div
        class="flex flex-col items-center justify-center gap-2 min-h-56 sm:min-h-64 transition-colors duration-200 pointer-events-none px-4 rounded-[22px]"
        :class="isDragging ? 'bg-green-50/40 dark:bg-green-900/10' : 'bg-(--primary-bgc)'"
      >
        <img :src="uploadIcon" alt="" class="w-10 h-10 sm:w-11 sm:h-11 opacity-70" aria-hidden="true" />
        <p class="text-sm font-semibold text-(--Primary-Text-color)">{{ $t('matching.gallery.drag_prompt') }}</p>
        <p class="text-xs text-(--Disabled-Text-color)">{{ $t('matching.gallery.limits') }}</p>
      </div>
    </div>

    <div v-else class="space-y-4">
      <p class="text-sm font-semibold text-(--Primary-Text-color)">{{ $t('matching.gallery.select_piece') }}</p>

      <div class="flex flex-wrap gap-3">
        <MatchingSelectableCard
          v-for="(garment, index) in analysisResult.garments"
          :key="index"
          :image="previewUrl"
          :label="garment.specificType || garment.category"
          :selected="selectedIndex === index"
          removable
          :remove-label="$t('matching.gallery.remove_item')"
          @select="$emit('update:selectedIndex', index)"
          @remove="reset"
        />
      </div>
    </div>

    <p v-if="analyzing" class="mt-3 text-sm text-(--Secondary-Text-color) text-center">
      {{ $t('matching.gallery.analyzing') }}
    </p>
    <p v-if="error" class="mt-3 text-sm text-red-600 text-center">{{ error }}</p>
  </div>
</template>

<script>
import uploadIcon from '../../assets/UploadIcon.svg'
import DashedBorderFrame from '../sharedRecycleTryon/DashedBorderFrame.vue'
import MatchingSelectableCard from './MatchingSelectableCard.vue'
import { analyzeGarmentImage } from '../../api/wardrobe.js'
import { ACCEPT_ATTR, isAllowedImage, MAX_FILE_SIZE } from '../../utils/imageUpload.js'
import { mapApiError } from '../../utils/mapApiError.js'

export default {
  name: 'MatchingGalleryPanel',
  components: { DashedBorderFrame, MatchingSelectableCard },
  props: {
    selectedIndex: { type: Number, default: null },
  },
  emits: ['update:selectedIndex', 'analyzed', 'reset'],
  data: () => ({
    uploadIcon,
    acceptAttr: ACCEPT_ATTR,
    isDragging: false,
    selectedFile: null,
    previewUrl: '',
    analyzing: false,
    error: '',
    analysisResult: null,
  }),
  beforeUnmount() {
    this.revokePreview()
  },
  methods: {
    reset() {
      this.revokePreview()
      this.selectedFile = null
      this.previewUrl = ''
      this.analyzing = false
      this.error = ''
      this.analysisResult = null
      this.$emit('update:selectedIndex', null)
      this.$emit('reset')
    },
    revokePreview() {
      if (this.previewUrl) URL.revokeObjectURL(this.previewUrl)
    },
    onFileChange(e) {
      const file = e.target.files?.[0]
      e.target.value = ''
      if (file) this.processFile(file)
    },
    onDrop(e) {
      this.isDragging = false
      const file = e.dataTransfer.files?.[0]
      if (file) this.processFile(file)
    },
    async processFile(file) {
      this.error = ''
      this.$emit('update:selectedIndex', null)

      if (!isAllowedImage(file)) {
        this.error = this.$t('matching.gallery.errors.format')
        return
      }
      if (file.size > MAX_FILE_SIZE) {
        this.error = this.$t('matching.gallery.errors.size')
        return
      }

      this.revokePreview()
      this.selectedFile = file
      this.previewUrl = URL.createObjectURL(file)
      this.analysisResult = null

      await this.runAnalysis(file)
    },
    async runAnalysis(file) {
      this.analyzing = true
      this.error = ''

      try {
        const data = await analyzeGarmentImage(file)
        this.analysisResult = data
        this.$emit('analyzed', data)
      } catch (err) {
        this.error = mapApiError(err, this.$t.bind(this))
        this.analysisResult = null
      } finally {
        this.analyzing = false
      }
    },
  },
}
</script>

<style scoped>
.upload-dashed-border {
  isolation: isolate;
}
</style>
