<template>

  <div class="w-full">

    <div class="flex flex-col items-center text-center mb-5 sm:mb-6">

      <div class="flex items-center justify-center gap-2 sm:gap-3">

        <img :src="hangerIcon" alt="" class="w-7 h-7 sm:w-8 sm:h-8 shrink-0" aria-hidden="true" />

        <h2 class="text-lg sm:text-xl font-bold text-(--Primary-Text-color)">Upload Your Garments</h2>

      </div>

      <p class="text-xs text-(--Secondary-Text-color) mt-1.5">

        Support for JPG, PNG, WEBP (max10MB each)

      </p>

    </div>



    <div

      class="gradient-dashed-border relative w-full min-h-52 sm:min-h-64 rounded-3xl bg-(--primary-bgc) flex items-center justify-center cursor-pointer transition-colors duration-200"

      :class="isDragging ? 'bg-green-50/40' : 'bg-(--primary-bgc)'"

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

        multiple

        class="hidden"

        @change="onFileChange"

      />

      <div class="flex flex-col items-center gap-2 pointer-events-none px-4">

        <img :src="uploadIcon" alt="" class="w-10 h-10 sm:w-11 sm:h-11" aria-hidden="true" />

        <p class="text-sm text-(--Disabled-Text-color)">Click or drag images here</p>

      </div>

    </div>



    <div v-if="files.length" class="flex flex-wrap justify-start gap-4 sm:gap-5 mt-5 sm:mt-6">

      <div

        v-for="(f, i) in files"

        :key="f.url"

        class="relative w-24 sm:w-28"

      >

        <div class="rounded-2xl bg-[#D6E8F5] p-2 sm:p-2.5 overflow-hidden">

          <img

            :src="f.url"

            :alt="`Piece ${i + 1}`"

            class="w-full h-28 sm:h-32 object-cover rounded-xl block"

          />

          <span class="absolute bottom-4 start-4 bg-white/95 text-[10px] sm:text-xs font-medium text-(--Primary-Text-color) px-2 py-0.5 rounded-md shadow-sm">

            Piece {{ i + 1 }}

          </span>

        </div>

        <button

          type="button"

          class="absolute -top-1.5 -end-1.5 w-5 h-5 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"

          :aria-label="`Remove piece ${i + 1}`"

          @click="remove(i)"

        >

          <svg class="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">

            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>

          </svg>

        </button>

      </div>

    </div>



<div  class="flex justify-center mt-5 sm:mt-6">
    <button

      v-if="files.length"

      type="button"

      class="recycle-action-btn recycle-action-btn--compact"

      :disabled="analyzing"

      @click="$emit('analyze')"

    >

      <img :src="starsIcon" alt="" aria-hidden="true" />

      {{ analyzing ? 'Creating your design ideas…' : 'Discover Design Ideas' }}

    </button>
</div>



    <p v-if="warning" class="mt-3 text-sm text-amber-700 text-center">{{ warning }}</p>

    <p v-if="error" class="mt-3 text-sm text-red-600 text-center">{{ error }}</p>

  </div>

</template>



<script>

import hangerIcon from '../../assets/HangerIcon.svg'

import uploadIcon from '../../assets/UploadIcon.svg'

import starsIcon from '../../assets/StarsIcon.svg'

import {

  ACCEPT_ATTR,

  MAX_FILE_SIZE,

  MAX_UPLOAD_FILES,

  SUPPORTED_FORMATS_LABEL,

  isAllowedImage,

} from '../../utils/imageUpload.js'



export default {

  name: 'UploadArea',

  emits: ['update:files', 'analyze'],

  props: {

    files:     { type: Array, default: () => [] },

    analyzing: { type: Boolean, default: false },

    error:     { type: String, default: '' },

  },

  data: () => ({

    isDragging: false,

    warning: '',

    hangerIcon,

    uploadIcon,

    starsIcon,

    acceptAttr: ACCEPT_ATTR,

    supportedFormats: SUPPORTED_FORMATS_LABEL,

  }),

  beforeUnmount() {

    this.revokeAll()

  },

  methods: {

    onFileChange(e) {

      this.add(Array.from(e.target.files))

      e.target.value = ''

    },

    onDrop(e) {

      this.isDragging = false

      this.add(Array.from(e.dataTransfer.files))

    },

    add(incoming) {

      this.warning = ''



      const allowed = incoming.filter(isAllowedImage)

      const rejected = incoming.filter(file => !isAllowedImage(file))



      if (rejected.length) {

        this.warning = `Unsupported file format. Use ${SUPPORTED_FORMATS_LABEL}.`

      }



      if (!allowed.length) return



      if (this.files.length >= MAX_UPLOAD_FILES) {

        this.warning = 'You cannot upload more than 2 images.'

        return

      }



      const slots = MAX_UPLOAD_FILES - this.files.length

      const next = [...this.files]

      let skipped = 0



      allowed.forEach((file) => {

        if (next.length >= MAX_UPLOAD_FILES) {

          skipped += 1

          return

        }

        if (file.size > MAX_FILE_SIZE) {

          this.warning = 'Each image must be 10MB or smaller.'

          return

        }

        next.push({ file, url: URL.createObjectURL(file) })

      })



      if (skipped > 0) {

        this.warning = 'You cannot upload more than 2 images.'

      }



      this.$emit('update:files', next)

    },

    remove(i) {

      URL.revokeObjectURL(this.files[i].url)

      const next = [...this.files]

      next.splice(i, 1)

      this.warning = ''

      this.$emit('update:files', next)

    },

    revokeAll() {

      this.files.forEach(f => URL.revokeObjectURL(f.url))

    },

  },

}

</script>

