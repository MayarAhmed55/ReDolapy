<template>
  <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
    <AddItemCard @click="$emit('add-item')" />
    <ItemCard
      v-for="item in items"
      :key="item._id"
      :item="item"
      @open-item="$emit('open-item', $event)"
      @delete="$emit('delete', $event)"
    />
  </div>
</template>

<script>
import AddItemCard from './AddItemCard.vue'
import ItemCard from './ItemCard.vue'

export default {
  name: 'WardrobeItems',
  components: { AddItemCard, ItemCard },
  props: {
    items: { type: Array, default: () => [] },
  },
  emits: ['add-item', 'open-item', 'delete'],
}
</script>
