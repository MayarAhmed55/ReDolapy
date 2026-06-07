<template>
  <div id="generated-design" class="w-full">
    <div class="flex items-center gap-2 mb-5 sm:mb-6">
      <img :src="starsIcon" alt="" class="mt-3 w-8 h-8 sm:w-10 sm:h-10 shrink-0" aria-hidden="true" />
      <h2 class="text-lg sm:text-xl font-bold text-(--Primary-Text-color)">Your Generated Design</h2>
    </div>

    <div class="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="grid grid-cols-1 lg:grid-cols-2">
        <div class="bg-white p-4 sm:p-6 flex items-center justify-center">
          <img
            :src="design.image"
            :alt="design.title"
            class="w-full max-w-sm lg:max-w-none rounded-2xl object-cover aspect-3/4 sm:aspect-4/5"
          />
        </div>

        <div class="p-5 sm:p-8 flex flex-col">
          <h3 class="text-xl sm:text-2xl font-bold text-(--Primary-Text-color) mb-4">
            {{ design.title }}
          </h3>
          <p class="text-sm sm:text-base text-(--Disabled-Text-color) leading-relaxed flex-1">
            {{ design.description }}
          </p>

          <p v-if="error" class="mt-4 text-sm text-red-600">{{ error }}</p>

          <button
            type="button"
            class="recycle-action-btn mt-6 sm:mt-8"
            :disabled="saving"
            @click="$emit('save')"
          >
            <img :src="downloadIcon" alt="" aria-hidden="true" />
            {{ saving ? 'Downloading…' : 'Save Specs' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import starsIcon from '../../assets/Redolapylogo.png'
import downloadIcon from '../../assets/DownloadIcon .svg'

export default {
  name: 'GeneratedDesign',
  emits: ['save'],
  props: {
    design: { type: Object, required: true },
    saving: { type: Boolean, default: false },
    error:  { type: String, default: '' },
  },
  data: () => ({ starsIcon, downloadIcon }),
}
</script>
