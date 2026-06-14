<template>
  <div class="w-full">
    <div class="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
      <div class="lg:col-span-3">
        <div class="flex flex-col items-start mb-4 sm:mb-5">
          <div class="flex items-center gap-2 sm:gap-3">
            <img :src="uploadFileIcon" alt="" class="w-6 h-6 sm:w-7 sm:h-7 shrink-0" aria-hidden="true" />
            <h2 class="text-lg sm:text-xl font-bold text-(--Primary-Text-color)">Upload Your Garments</h2>
          </div>
          <p class="text-xs text-(--Secondary-Text-color) mt-1.5 ms-8 sm:ms-10">
            Support for JPG, PNG, WEBP (max 10MB each)
          </p>
        </div>

        <div
          class="upload-dashed-border relative w-full cursor-pointer rounded-[24px]"
          role="button"
          tabindex="0"
          @click="$refs.garmentInput.click()"
          @keydown.enter="$refs.garmentInput.click()"
          @dragover.prevent="garmentDragging = true"
          @dragleave.prevent="garmentDragging = false"
          @drop.prevent="onGarmentDrop"
        >
          <DashedBorderFrame />
          <input
            ref="garmentInput"
            type="file"
            :accept="acceptAttr"
            multiple
            class="hidden"
            @change="onGarmentFileChange"
          />
          <div
            class="flex flex-col items-center justify-center gap-2 min-h-56 sm:min-h-72 lg:min-h-80 transition-colors duration-200 pointer-events-none px-2 rounded-[22px]"
            :class="garmentDragging ? 'bg-green-50/40' : 'bg-(--primary-bgc)'"
          >
            <img :src="uploadIcon" alt="" class="w-10 h-10 sm:w-11 sm:h-11" aria-hidden="true" />
            <p class="text-sm text-(--Disabled-Text-color)">Click or drag images here</p>
          </div>
        </div>
      </div>

      <div class="lg:col-span-2 flex flex-col">
        <p class="text-[11px] sm:text-xs font-bold tracking-wider text-(--Disabled-Text-color) uppercase mb-3 sm:mb-4">
          Current Selection
        </p>

        <div class="flex-1 space-y-3">
          <div
            v-for="item in selectionItems"
            :key="item.id"
            class="selection-item"
          >
            <img :src="item.url" :alt="item.title" class="selection-item__thumb" />
            <div class="min-w-0 flex-1">
              <p class="text-sm font-bold text-(--Primary-Text-color) truncate">{{ item.title }}</p>
              <p class="text-xs text-(--Disabled-Text-color) truncate">{{ item.subtitle }}</p>
            </div>
            <button
              type="button"
              class="shrink-0 p-1.5 rounded-md hover:bg-red-50 transition-colors"
              :aria-label="`Remove ${item.title}`"
              @click="removeItem(item)"
            >
              <img :src="trashIcon" alt="" class="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>

          <p v-if="!selectionItems.length" class="text-sm text-(--Disabled-Text-color) py-6 text-center border border-dashed border-gray-200 rounded-2xl">
            No items selected yet
          </p>
        </div>

        <button
          v-if="garments.length < maxGarments"
          type="button"
          class="add-more-btn mt-4 "
          @click="$refs.garmentInput.click()"
        >
          Add More Pieces
        </button>
      </div>
    </div>

    <div class="flex justify-center mt-8 sm:mt-10">
      <button
        type="button"
        class="tryon-generate-btn"
        :disabled="!canGenerate || generating"
        @click="$emit('generate')"
      >
        <img :src="tryonIcon" alt="" aria-hidden="true" />
        {{ generating ? 'Generating your try-on…' : 'Try-on' }}
      </button>
    </div>

    <p v-if="warning" class="mt-3 text-sm text-amber-700 text-center">{{ warning }}</p>
    <p v-if="error" class="mt-3 text-sm text-red-600 text-center">{{ error }}</p>
  </div>
</template>

<script>
import uploadIcon from '../../assets/UploadIcon.svg'
import uploadFileIcon from '../../assets/Upload File.png'
import trashIcon from '../../assets/TrashIcon.svg'
import tryonIcon from '../../assets/TryonIcon.svg'
import DashedBorderFrame from '../sharedRecycleTryon/DashedBorderFrame.vue'
import {
  ACCEPT_ATTR,
  MAX_FILE_SIZE,
  isAllowedImage,
  SUPPORTED_FORMATS_LABEL,
} from '../../utils/imageUpload.js'

const MAX_GARMENTS = 2

export default {
  name: 'TryOnUploadArea',
  components: { DashedBorderFrame },
  emits: ['update:garments', 'update:model', 'generate'],
  props: {
    model: { type: Object, default: null },
    garments: { type: Array, default: () => [] },
    generating: { type: Boolean, default: false },
    error: { type: String, default: '' },
  },
  data: () => ({
    garmentDragging: false,
    warning: '',
    uploadIcon,
    uploadFileIcon,
    trashIcon,
    tryonIcon,
    acceptAttr: ACCEPT_ATTR,
    maxGarments: MAX_GARMENTS,
  }),
  computed: {
    selectionItems() {
      const items = []
      if (this.model) {
        items.push({
          id: 'model',
          type: 'model',
          title: this.model.type === 'avatar' ? this.model.name : 'Your Photo',
          subtitle: this.model.type === 'avatar' ? 'Avatar' : 'Personal image',
          url: this.model.url,
        })
      }
      this.garments.forEach((g) => {
        items.push({
          id: g.id,
          type: 'garment',
          title: g.title,
          subtitle: g.subtitle,
          url: g.url,
        })
      })
      return items
    },
    canGenerate() {
      return Boolean(this.model) && this.garments.length >= 1
    },
  },
  beforeUnmount() {
    this.revokeGarmentUrls()
  },
  methods: {
    onGarmentFileChange(e) {
      this.addGarments(Array.from(e.target.files || []))
      e.target.value = ''
    },
    onGarmentDrop(e) {
      this.garmentDragging = false
      this.addGarments(Array.from(e.dataTransfer.files || []))
    },
    addGarments(incoming) {
      this.warning = ''
      const allowed = incoming.filter(isAllowedImage)
      const rejected = incoming.filter(f => !isAllowedImage(f))

      if (rejected.length) {
        this.warning = `Unsupported file format. Use ${SUPPORTED_FORMATS_LABEL}.`
      }
      if (!allowed.length) return

      if (this.garments.length >= MAX_GARMENTS) {
        this.warning = 'You can only upload up to 2 garment images.'
        return
      }

      const next = [...this.garments]
      let skipped = 0

      allowed.forEach((file) => {
        if (next.length >= MAX_GARMENTS) {
          skipped += 1
          return
        }
        if (file.size > MAX_FILE_SIZE) {
          this.warning = 'Each image must be 10MB or smaller.'
          return
        }
        const baseName = file.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ')
        next.push({
          id: `garment-${Date.now()}-${next.length}`,
          file,
          url: URL.createObjectURL(file),
          title: this.formatGarmentTitle(baseName, next.length),
          subtitle: 'Uploaded garment',
        })
      })

      if (skipped > 0) {
        this.warning = 'You can only upload up to 2 garment images.'
      }

      this.$emit('update:garments', next)
    },
    formatGarmentTitle(name, index) {
      if (name && name.length > 1) {
        return name.charAt(0).toUpperCase() + name.slice(1)
      }
      return `Garment ${index + 1}`
    },
    removeItem(item) {
      if (item.type === 'model') {
        this.$emit('update:model', null)
        return
      }
      const idx = this.garments.findIndex(g => g.id === item.id)
      if (idx === -1) return
      const next = [...this.garments]
      URL.revokeObjectURL(next[idx].url)
      next.splice(idx, 1)
      this.warning = ''
      this.$emit('update:garments', next)
    },
    revokeGarmentUrls() {
      this.garments.forEach(g => URL.revokeObjectURL(g.url))
    },
  },
}
</script>

<style scoped>
.selection-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 1rem;
  background: #E8F0F8;
}

.selection-item__thumb {
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 9999px;
  object-fit: cover;
  flex-shrink: 0;
  background: white;
}

.add-more-btn {
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: var(--Semi-Bold);
  color: var(--Primary-Text-color);
  background: white;
  border: 2px solid transparent;
  background-image: linear-gradient(white, white), var(--Gradient-bgc);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  transition: opacity 0.2s;
}

.add-more-btn:hover {
  opacity: 0.9;
}

.tryon-generate-btn {
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
  color: white;
  background-color: var(--Secondary-Brand-color);
  border: none;
  transition: opacity 0.2s;
}

.tryon-generate-btn:hover:not(:disabled) {
  opacity: 0.92;
}

.tryon-generate-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.tryon-generate-btn img {
  width: 1rem;
  height: 1rem;
}

.upload-dashed-border {
  isolation: isolate;
}
</style>
