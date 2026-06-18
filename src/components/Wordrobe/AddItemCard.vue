<template>
  <button
    type="button"
    class="add-item-card group w-full text-start"
    :aria-label="$t('wardrobe.add_card.label')"
    @click="$emit('click')"
  >
    <div class="add-item-card__inner">
      <div class="add-item-card__icon-wrap">
        <img :src="addIcon" alt="" class="w-8 h-8 sm:w-9 sm:h-9 opacity-70  group-hover:opacity-100 transition-opacity" aria-hidden="true" />
      </div>
      <p class="text-sm font-medium text-(--Disabled-Text-color) group-hover:text-(--Primary-Brand-color) transition-colors">
        {{ $t('wardrobe.add_card.label') }}
      </p>
    </div>
  </button>
</template>

<script>
import addIcon from '../../assets/addIcon.svg'

export default {
  name: 'AddItemCard',
  emits: ['click'],
  data: () => ({ addIcon }),
}
</script>

<style scoped>
.add-item-card {
  border-radius: 1rem;
  padding: 2px;
  background: var(--card-surface);
  border: 2px dashed var(--input-border);
  min-height: 220px;
  transition: border-color 0.2s, background-color 0.2s;
}

.add-item-card:hover {
  border-color: var(--Primary-Brand-color);
  background: var(--surface-muted);
}

.add-item-card__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  height: 100%;
  min-height: 216px;
  border-radius: calc(1rem - 2px);
  padding: 1.5rem;
}

.add-item-card__icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 9999px;
  background: var(--surface-muted);
}
</style>
