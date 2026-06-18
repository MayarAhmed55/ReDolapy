<template>
  <div class="w-full">
    <p class="text-sm font-semibold text-(--Primary-Text-color) mb-3">
      {{ $t('matching.wardrobe.select_item') }}
    </p>

    <div v-if="loading" class="py-8 text-center text-sm text-(--Disabled-Text-color)">
      {{ $t('wardrobe.loading') }}
    </div>

    <div v-else-if="!items.length" class="py-8 text-center text-sm text-(--Disabled-Text-color)">
      {{ $t('matching.wardrobe.empty') }}
    </div>

    <div v-else class="flex flex-wrap gap-3">
      <MatchingSelectableCard
        v-for="item in items"
        :key="getItemId(item)"
        :image="item.image"
        :label="item.name"
        :selected="selectedId === getItemId(item)"
        @select="$emit('update:selectedId', getItemId(item))"
      />
    </div>
  </div>
</template>

<script>
import MatchingSelectableCard from './MatchingSelectableCard.vue'
import { getWardrobeItemId } from '../../utils/matchHelpers.js'

export default {
  name: 'MatchingWardrobePanel',
  components: { MatchingSelectableCard },
  props: {
    items: { type: Array, default: () => [] },
    selectedId: { type: String, default: '' },
    loading: { type: Boolean, default: false },
  },
  emits: ['update:selectedId'],
  methods: {
    getItemId: getWardrobeItemId,
  },
}
</script>
