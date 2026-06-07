<template>
  <div
    class="relative flex-1 min-w-0 bg-white rounded-2xl p-4 sm:p-5 cursor-pointer transition-shadow duration-200 hover:shadow-sm"
    :class="selected ? 'idea-card-selected' : 'border border-gray-100 shadow-sm'"
    @click="$emit('select', idea)"
  >
    <div class="flex items-start justify-between gap-2">
      <div
        class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
        :class="selected ? 'bg-(--Secondary-Brand-color) text-white' : 'bg-gray-100 text-(--Disabled-Text-color)'"
      >
        {{ String(index + 1).padStart(2, '0') }}
      </div>

      <img
        v-if="selected"
        :src="checkIcon"
        alt="Selected"
        class="w-5 h-5 shrink-0"
      />
    </div>

    <div class="mt-4">
      <h3 class="text-sm font-bold text-(--Primary-Text-color) mb-2 leading-snug">{{ idea.title }}</h3>
      <p class="text-xs text-(--Disabled-Text-color) leading-relaxed mb-2 min-h-10">
        {{ expanded ? description : truncate(description) }}
      </p>
      <button
        type="button"
        class="text-xs font-semibold text-(--Primary-Brand-color)"
        @click.stop="expanded = !expanded"
      >
        {{ expanded ? 'See less' : 'See more' }}
      </button>
    </div>
  </div>
</template>

<script>
import checkIcon from '../../assets/checkIcon (3).svg'

export default {
  name: 'StyleIdeaCard',
  emits: ['select'],
  props: {
    idea:     { type: Object, required: true },
    index:    { type: Number, required: true },
    selected: { type: Boolean, default: false },
  },
  data: () => ({ expanded: false, checkIcon }),
  computed: {
    description() {
      return this.idea.design_description || this.idea.description || ''
    },
  },
  methods: {
    truncate(text = '') {
      return text.length > 72 ? `${text.slice(0, 72)}…` : text
    },
  },
}
</script>

<style scoped>
.idea-card-selected {
  border: 2px solid transparent;
  background-clip: padding-box;
}
</style>
