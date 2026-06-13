<template>
  <div class="w-full">
    <div class="flex items-start justify-between gap-3 mb-5 sm:mb-6">
      <div class="flex items-center gap-2">
        <img :src="ideaIcon" alt="" class="w-4 h-5 shrink-0" aria-hidden="true" />
        <h2 class="text-lg sm:text-xl font-bold text-(--Primary-Text-color)">{{ titleLabel }}</h2>
      </div>
      <span class="shrink-0 text-[10px] sm:text-xs font-semibold text-white bg-(--Secondary-Brand-color) px-3 py-1 rounded-full">
        {{ $t('recycle.ideas.badge') }}
      </span>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 items-start">
      <StyleIdeaCard
        v-for="(idea, i) in ideas"
        :key="`idea-${i}-${idea.id}`"
        :idea="idea"
        :index="i"
        :selected="selectedId === idea.id"
        :expanded="expandedId === idea.id"
        @select="$emit('select', idea)"
        @toggle-expand="toggleExpand(idea.id)"
      />
    </div>

    <div class="recycle-options mt-5 sm:mt-6">
      <div class="recycle-options__field recycle-options__field--start">
        <label class="recycle-options__label" for="recycle-model">{{ $t('recycle.ideas.ai_engine') }}</label>
        <div class="recycle-options__select-wrap">
          <select
            id="recycle-model"
            v-model="selectedModel"
            class="recycle-options__select"
          >
            <option
              v-for="(label, value) in models"
              :key="value"
              :value="value"
            >
              {{ label }}
            </option>
          </select>
          <svg class="recycle-options__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>
      </div>

      <div class="recycle-options__field recycle-options__field--end">
        <label class="recycle-options__label" for="recycle-size">{{ $t('recycle.ideas.aspect_ratio') }}</label>
        <div class="recycle-options__select-wrap">
          <select
            id="recycle-size"
            v-model="selectedSize"
            class="recycle-options__select"
          >
            <option
              v-for="(label, value) in sizes"
              :key="value"
              :value="value"
            >
              {{ label }}
            </option>
          </select>
          <svg class="recycle-options__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>
      </div>
    </div>

    <div v-if="selectedId" class="flex justify-center mt-5 sm:mt-6">
      <button
        type="button"
        class="recycle-action-btn recycle-action-btn--compact mt-6"
        :disabled="loading"
        @click="$emit('generate', { model: selectedModel, size: selectedSize })"
      >
        <img :src="starsIcon" alt="" aria-hidden="true" />
        {{ loading ? loadingLabel : submitLabel }}
      </button>
    </div>
  </div>
</template>

<script>
import ideaIcon from '../../assets/IdeaIcon.svg'
import starsIcon from '../../assets/StarsIcon.svg'
import StyleIdeaCard from './StyleIdeaCard.vue'
import { fetchModels } from '../../api/recycle.js'

const MODEL_DISPLAY_NAMES = {
  'qwen-image-2.0-pro': 'Design Maestro',
  'qwen-image-2.0': 'Style Starter',
}

const FALLBACK_MODELS = MODEL_DISPLAY_NAMES

function withDisplayNames(models = {}) {
  return Object.fromEntries(
    Object.entries(models).map(([id, label]) => [id, MODEL_DISPLAY_NAMES[id] || label]),
  )
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
    ideas: { type: Array, required: true },
    selectedId: { type: [Number, String], default: null },
    loading: { type: Boolean, default: false },
    titleLabel: { type: String, required: true },
    submitLabel: { type: String, required: true },
    loadingLabel: { type: String, required: true },
  },
  data: () => ({
    ideaIcon,
    starsIcon,
    models: FALLBACK_MODELS,
    sizes: FALLBACK_SIZES,
    selectedModel: 'qwen-image-2.0-pro',
    selectedSize: '1536*1024',
    expandedId: null,
  }),
  watch: {
    ideas() {
      this.expandedId = null
    },
  },
  methods: {
    toggleExpand(id) {
      this.expandedId = this.expandedId === id ? null : id
    },
  },
  async mounted() {
    try {
      const data = await fetchModels()
      if (data.models) this.models = withDisplayNames(data.models)
      if (data.sizes) this.sizes = data.sizes
      if (data.defaultModel) this.selectedModel = data.defaultModel
      if (data.defaultSize) this.selectedSize = data.defaultSize
    } catch {
      // Keep fallback options when the API server is not running yet.
    }
  },
}
</script>

<style scoped>
.recycle-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

.recycle-options__field {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  width: 100%;
  min-width: 0;
}

.recycle-options__field--end {
  align-items: flex-start;
}

.recycle-options__label {
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1rem;
  color: var(--Disabled-Text-color);
}

.recycle-options__select-wrap {
  position: relative;
  width: 100%;
}

.recycle-options__select {
  width: 100%;
  appearance: none;
  padding: 0.625rem 2.25rem 0.625rem 0.875rem;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.25rem;
  color: var(--Disabled-Text-color);
  cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.recycle-options__select:focus {
  outline: none;
  border-color: var(--Primary-Brand-color);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--Primary-Brand-color) 12%, transparent);
}

.recycle-options__chevron {
  position: absolute;
  top: 50%;
  inset-inline-end: 0.75rem;
  width: 1rem;
  height: 1rem;
  color: var(--Disabled-Text-color);
  pointer-events: none;
  transform: translateY(-50%);
}

@media (min-width: 640px) {
  .recycle-options {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
    gap: 1.5rem;
  }

  .recycle-options__field {
    width: auto;
    min-width: min(100%, 13rem);
    max-width: 17.5rem;
  }

  .recycle-options__field--end {
    align-items: flex-end;
    margin-inline-start: auto;
  }

  .recycle-options__field--end .recycle-options__label {
    text-align: end;
  }
}

@media (min-width: 768px) {
  .recycle-options__field {
    min-width: min(100%, 14.5rem);
    max-width: 19rem;
  }
}
</style>
