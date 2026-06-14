<template>
  <div class="w-full mb-6 sm:mb-8">
    <p class="text-sm font-bold text-(--Primary-Text-color) mb-3">Choose your model</p>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl">
      <button
        type="button"
        class="model-choice-card  bg-white dark:bg-[#0d0d0d]"
        :class="{ 'model-choice-card--active': modelSource === 'personal' } "
        @click="selectModelSource('personal')"
      >
        <span class="model-choice-card__icon" aria-hidden="true">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
            <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"/>
            <path d="M20 21a8 8 0 0 0-16 0"/>
          </svg>
        </span>
        <span>
          <span class="block text-sm font-bold text-(--Primary-Text-color)">Personal Photo</span>
          <span class="block text-xs text-(--Disabled-Text-color) mt-0.5">Upload your own image</span>
        </span>
      </button>

      <button
        type="button"
        class="model-choice-card bg-white dark:bg-[#0d0d0d]"
        :class="{ 'model-choice-card--active': modelSource === 'avatar' }"
        @click="selectModelSource('avatar')"
      >
        <span class="model-choice-card__icon" aria-hidden="true">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
            <circle cx="12" cy="8" r="4"/>
            <path d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6"/>
          </svg>
        </span>
        <span>
          <span class="block text-sm font-bold text-(--Primary-Text-color)">Use Avatar</span>
          <span class="block text-xs text-(--Disabled-Text-color) mt-0.5">Pick a preset model</span>
        </span>
      </button>
    </div>

    <div v-if="modelSource === 'personal' && !model" class="mt-4 max-w-xl">
      <div
        class="upload-dashed-border relative w-full cursor-pointer rounded-[20px]"
        role="button"
        tabindex="0"
        @click="$refs.modelInput.click()"
        @keydown.enter="$refs.modelInput.click()"
        @dragover.prevent="modelDragging = true"
        @dragleave.prevent="modelDragging = false"
        @drop.prevent="onModelDrop"
      >
        <DashedBorderFrame :radius="18" />
        <input
          ref="modelInput"
          type="file"
          :accept="acceptAttr"
          class="hidden"
          @change="onModelFileChange"
        />
        <div
          class="flex items-center justify-center gap-3 min-h-24 px-4 rounded-[18px] transition-colors duration-200 pointer-events-none"
          :class="modelDragging ? 'bg-green-50/40' : 'bg-(--primary-bgc)'"
        >
          <img :src="uploadIcon" alt="" class="w-8 h-8 shrink-0 opacity-60" aria-hidden="true" />
          <p class="text-sm text-(--Disabled-Text-color)">Upload your photo (JPG, PNG, WEBP)</p>
        </div>
      </div>
    </div>

    <div v-if="modelSource === 'avatar' && !model" class="mt-4">
      <p class="text-xs text-(--Disabled-Text-color) mb-3">Select an avatar</p>
      <div class="flex flex-wrap gap-3">
        <button
          v-for="avatar in avatars"
          :key="avatar.id"
          type="button"
          class="avatar-option"
          :aria-label="`Select ${avatar.name}`"
          @click="selectAvatar(avatar)"
        >
          <img :src="avatar.url" :alt="avatar.name" class="w-full h-full object-cover" />
        </button>
      </div>
    </div>

    <p v-if="warning" class="mt-3 text-sm text-amber-700">{{ warning }}</p>
  </div>
</template>

<script>
import uploadIcon from '../../assets/UploadIcon.svg'
import avatar1 from '../../assets/hero.png'
import avatar2 from '../../assets/picture+nuttn.png'
import avatar3 from '../../assets/Header Image.png'
import DashedBorderFrame from '../sharedRecycleTryon/DashedBorderFrame.vue'
import {
  ACCEPT_ATTR,
  MAX_FILE_SIZE,
  isAllowedImage,
  SUPPORTED_FORMATS_LABEL,
} from '../../utils/imageUpload.js'

export default {
  name: 'UserModelUpload',
  components: { DashedBorderFrame },
  emits: ['update:model'],
  props: {
    model: { type: Object, default: null },
  },
  data: () => ({
    modelSource: null,
    modelDragging: false,
    warning: '',
    uploadIcon,
    acceptAttr: ACCEPT_ATTR,
    avatars: [
      { id: 'avatar-1', name: 'Classic Model', url: avatar1 },
      { id: 'avatar-2', name: 'Casual Look', url: avatar2 },
      { id: 'avatar-3', name: 'Studio Pose', url: avatar3 },
    ],
  }),
  beforeUnmount() {
    if (this.model?.revokable) URL.revokeObjectURL(this.model.url)
  },
  methods: {
    selectModelSource(source) {
      if (this.modelSource === source) return
      this.clearModel()
      this.modelSource = source
      this.warning = ''
    },
    selectAvatar(avatar) {
      this.$emit('update:model', {
        type: 'avatar',
        id: avatar.id,
        name: avatar.name,
        url: avatar.url,
        revokable: false,
      })
    },
    onModelFileChange(e) {
      this.addModelFile(e.target.files?.[0])
      e.target.value = ''
    },
    onModelDrop(e) {
      this.modelDragging = false
      this.addModelFile(e.dataTransfer.files?.[0])
    },
    addModelFile(file) {
      if (!file) return
      this.warning = ''
      if (!isAllowedImage(file)) {
        this.warning = `Unsupported file format. Use ${SUPPORTED_FORMATS_LABEL}.`
        return
      }
      if (file.size > MAX_FILE_SIZE) {
        this.warning = 'Each image must be 10MB or smaller.'
        return
      }
      if (this.model?.revokable) URL.revokeObjectURL(this.model.url)
      this.$emit('update:model', {
        type: 'personal',
        id: 'personal',
        name: 'Your Photo',
        url: URL.createObjectURL(file),
        file,
        revokable: true,
      })
    },
    clearModel() {
      if (this.model?.revokable) URL.revokeObjectURL(this.model.url)
      this.$emit('update:model', null)
    },
  },
}
</script>

<style scoped>
.model-choice-card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  border-radius: 1rem;
  border: 1.5px solid #D8DCE3;
  /* background: white; */
  text-align: start;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.model-choice-card:hover {
  border-color: var(--Primary-Brand-color);
}

.model-choice-card--active {
  border-color: var(--Secondary-Brand-color);
  box-shadow: 0 0 0 1px var(--Secondary-Brand-color);
}

.model-choice-card__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  background: #EEF6FC;
  color: var(--Primary-Brand-color);
  flex-shrink: 0;
}

.model-choice-card--active .model-choice-card__icon {
  background: #EEF9E0;
  color: var(--Secondary-Brand-color);
}

.avatar-option {
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 9999px;
  overflow: hidden;
  border: 2px solid #D8DCE3;
  transition: border-color 0.2s, transform 0.2s;
}

.avatar-option:hover {
  border-color: var(--Secondary-Brand-color);
  transform: scale(1.05);
}

.upload-dashed-border {
  isolation: isolate;
}
</style>
