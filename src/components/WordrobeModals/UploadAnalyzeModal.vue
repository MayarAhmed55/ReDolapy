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
            <DialogPanel class="upload-modal w-full max-w-md">
              <div class="flex items-center justify-between mb-5">
                <DialogTitle class="flex-1 text-center text-lg font-bold text-(--Primary-Text-color) pe-6">
                  {{ $t('wardrobe.upload_modal.title') }}
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

              <div
                class="upload-area"
                role="button"
                tabindex="0"
                @click="$refs.fileInput.click()"
                @keydown.enter="$refs.fileInput.click()"
                @dragover.prevent="isDragging = true"
                @dragleave.prevent="isDragging = false"
                @drop.prevent="onDrop"
              >
                <input
                  ref="fileInput"
                  type="file"
                  :accept="acceptAttr"
                  class="hidden"
                  @change="onFileChange"
                />

                <template v-if="previewUrl">
                  <img :src="previewUrl" alt="" class="upload-preview" />
                </template>
                <template v-else>
                  <img :src="cameraIcon" alt="" class="w-10 h-10 mb-3 opacity-60" aria-hidden="true" />
                  <p class="text-sm text-(--Disabled-Text-color)">{{ $t('wardrobe.upload_modal.click_upload') }}</p>
                </template>
              </div>

              <p v-if="error" class="mt-3 text-sm text-red-600 text-center">{{ error }}</p>

              <button
                type="button"
                class="analyze-btn mt-5"
                :disabled="!selectedFile || analyzing"
                @click="onAnalyze"
              >
                {{ analyzing ? $t('wardrobe.upload_modal.analyzing') : $t('wardrobe.upload_modal.analyze_btn') }}
              </button>
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
import cameraIcon from '../../assets/cameraIcon.svg'
import { analyzeGarmentImage } from '../../api/wardrobe.js'
import { ACCEPT_ATTR, isAllowedImage, MAX_FILE_SIZE } from '../../utils/imageUpload.js'
import { mapApiError } from '../../utils/mapApiError.js'

export default {
  name: 'UploadAnalyzeModal',
  components: { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot },
  props: {
    open: { type: Boolean, default: false },
  },
  emits: ['close', 'analyzed'],
  data: () => ({
    cameraIcon,
    acceptAttr: ACCEPT_ATTR,
    selectedFile: null,
    previewUrl: '',
    isDragging: false,
    analyzing: false,
    error: '',
  }),
  watch: {
    open(val) {
      if (!val) this.reset()
    },
  },
  beforeUnmount() {
    this.revokePreview()
  },
  methods: {
    reset() {
      this.selectedFile = null
      this.revokePreview()
      this.previewUrl = ''
      this.error = ''
      this.analyzing = false
      this.isDragging = false
    },
    revokePreview() {
      if (this.previewUrl) URL.revokeObjectURL(this.previewUrl)
    },
    setFile(file) {
      if (!file) return
      if (!isAllowedImage(file)) {
        this.error = this.$t('wardrobe.upload_modal.format_error')
        return
      }
      if (file.size > MAX_FILE_SIZE) {
        this.error = this.$t('wardrobe.upload_modal.size_error')
        return
      }
      this.error = ''
      this.selectedFile = file
      this.revokePreview()
      this.previewUrl = URL.createObjectURL(file)
    },
    onFileChange(e) {
      const file = e.target.files?.[0]
      this.setFile(file)
      e.target.value = ''
    },
    onDrop(e) {
      this.isDragging = false
      const file = e.dataTransfer?.files?.[0]
      this.setFile(file)
    },
    async onAnalyze() {
      if (!this.selectedFile || this.analyzing) return
      this.analyzing = true
      this.error = ''
      try {
        const data = await analyzeGarmentImage(this.selectedFile)
        this.$emit('analyzed', {
          analysisId: data.analysis_id,
          garments: data.garments || [],
          detectionType: data.detectionType,
        })
        this.$emit('close')
      } catch (err) {
        this.error = mapApiError(err, this.$t.bind(this))
      } finally {
        this.analyzing = false
      }
    },
  },
}
</script>

<style scoped>
.upload-modal {
  background: var(--card-surface);
  border-radius: 1.25rem;
  padding: 1.5rem;
  box-shadow: 0 20px 50px rgb(0 0 0 / 15%);
}

.modal-close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  color: var(--Disabled-Text-color);
  transition: background-color 0.2s, color 0.2s;
}

.modal-close-btn:hover {
  background: var(--surface-muted);
  color: var(--Primary-Text-color);
}

.upload-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 220px;
  border-radius: 1rem;
  border: 2px dashed var(--input-border);
  background: var(--surface-muted);
  cursor: pointer;
  overflow: hidden;
  transition: border-color 0.2s, background-color 0.2s;
}

.upload-area:hover {
  border-color: var(--Primary-Brand-color);
}

.upload-preview {
  width: 100%;
  height: 220px;
  object-fit: contain;
  padding: 0.75rem;
}

.analyze-btn {
  width: 100%;
  padding: 0.875rem 1rem;
  border-radius: 0.75rem;
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #fff;
  background: var(--Primary-Brand-color);
  transition: background-color 0.2s, opacity 0.2s;
}

.analyze-btn:hover:not(:disabled) {
  background: var(--Primary-Brand-hover);
}

.analyze-btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}
</style>
