<template>

  <div class="w-full">

    <div class="flex items-start justify-between gap-3 mb-5 sm:mb-6">

      <div class="flex items-center gap-2">

        <img :src="ideaIcon" alt="" class="w-4 h-5 shrink-0" aria-hidden="true" />

        <h2 class="text-lg sm:text-xl font-bold text-(--Primary-Text-color)">Choose Your Style Idea</h2>

      </div>

      <span class="shrink-0 text-[10px] sm:text-xs font-semibold text-white bg-(--Secondary-Brand-color) px-3 py-1 rounded-full">

        AI Suggested

      </span>

    </div>



    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">

      <StyleIdeaCard

        v-for="(idea, i) in ideas"

        :key="idea.id"

        :idea="idea"

        :index="i"

        :selected="selectedId === idea.id"

        @select="$emit('select', idea)"

      />

    </div>



    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-5 sm:mt-6">

      <div class="relative">

        <select

          v-model="selectedModel"

          class="w-full appearance-none text-sm font-medium text-(--Primary-Text-color) bg-white border border-gray-200 rounded-lg ps-3 pe-8 py-2.5 cursor-pointer focus:outline-none focus:border-(--Primary-Brand-color)"

        >

          <option

            v-for="(label, value) in models"

            :key="value"

            :value="value"

          >

            {{ label }}

          </option>

        </select>

        <svg class="absolute inset-e-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-(--Disabled-Text-color) pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">

          <polyline points="6 9 12 15 18 9"/>

        </svg>

      </div>



      <div class="relative">

        <select

          v-model="selectedSize"

          class="w-full appearance-none text-sm font-medium text-(--Primary-Text-color) bg-white border border-gray-200 rounded-lg ps-3 pe-8 py-2.5 cursor-pointer focus:outline-none focus:border-(--Primary-Brand-color)"

        >

          <option

            v-for="(label, value) in sizes"

            :key="value"

            :value="value"

          >

            {{ label }}

          </option>

        </select>

        <svg class="absolute inset-e-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-(--Disabled-Text-color) pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">

          <polyline points="6 9 12 15 18 9"/>

        </svg>

      </div>

    </div>



    <div v-if="selectedId" class="flex justify-center mt-5 sm:mt-6">

      <button

        type="button"

        class="recycle-action-btn recycle-action-btn--compact"

        :disabled="loading"

        @click="$emit('generate', { model: selectedModel, size: selectedSize })"

      >

        <img :src="starsIcon" alt="" aria-hidden="true" />

        {{ loading ? 'Generating…' : 'Generate Selected Design' }}

      </button>

    </div>

  </div>

</template>



<script>

import ideaIcon from '../../assets/IdeaIcon.svg'

import starsIcon from '../../assets/StarsIcon.svg'

import StyleIdeaCard from './StyleIdeaCard.vue'

import { fetchModels } from '../../api/recycle.js'



const FALLBACK_MODELS = {

  'qwen-image-2.0-pro': 'Qwen Image 2.0 Pro',

  'qwen-image-2.0': 'Qwen Image 2.0',

}



const FALLBACK_SIZES = {

  '1024*1024': '1024×1024 (1:1)',

  '1536*1024': '1536×1024 (3:2)',

  '1024*1536': '1024×1536 (2:3)',

  '1280*720': '1280×720 (16:9)',

  '720*1280': '720×1280 (9:16)',

}



export default {

  name: 'RecycleIdeas',

  components: { StyleIdeaCard },

  emits: ['select', 'generate'],

  props: {

    ideas:      { type: Array, required: true },

    selectedId: { type: [Number, String], default: null },

    loading:    { type: Boolean, default: false },

  },

  data: () => ({

    ideaIcon,

    starsIcon,

    models: FALLBACK_MODELS,

    sizes: FALLBACK_SIZES,

    selectedModel: 'qwen-image-2.0-pro',

    selectedSize: '1536*1024',

  }),

  async mounted() {

    try {

      const data = await fetchModels()

      if (data.models) this.models = data.models

      if (data.sizes) this.sizes = data.sizes

      if (data.defaultModel) this.selectedModel = data.defaultModel

      if (data.defaultSize) this.selectedSize = data.defaultSize

    } catch {

      // Keep fallback options when the API server is not running yet.

    }

  },

}

</script>

