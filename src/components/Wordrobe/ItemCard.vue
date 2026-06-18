<template>
  <article
    class="item-card group cursor-pointer"
    role="button"
    tabindex="0"
    @click="$emit('open-item', item)"
    @keydown.enter="$emit('open-item', item)"
  >
    <div class="item-card__image-wrap">
      <img
        :src="item.image"
        :alt="item.name"
        class="item-card__image"
        loading="lazy"
      />

      <div class="item-card__overlay">
        <h3 class="item-card__name">{{ item.name }}</h3>
        <span class="item-card__category">{{ categoryLabel }}</span>
      </div>

      <button
        type="button"
        class="item-card__delete"
        :aria-label="$t('wardrobe.item.delete_aria')"
        @click.stop="$emit('delete', item)"
      >
        <img :src="trashIcon" alt="" class="w-4 h-4" aria-hidden="true" />
      </button>
    </div>
  </article>
</template>

<script>
import trashIcon from '../../assets/TrashIcon.svg'

export default {
  name: 'ItemCard',
  props: {
    item: { type: Object, required: true },
  },
  emits: ['open-item', 'delete'],
  data: () => ({ trashIcon }),
  computed: {
    categoryLabel() {
      const key = this.item.category || 'top'
      return this.$t(`wardrobe.categories.${key}`).toUpperCase()
    },
  },
}
</script>

<style scoped>
.item-card {
  border-radius: 1.5rem;
  overflow: hidden;
  transition: box-shadow 0.2s, transform 0.2s;
}

.item-card:hover {
  box-shadow: 0 10px 28px rgb(0 0 0 / 14%);
  transform: translateY(-2px);
}

.item-card__image-wrap {
  position: relative;
  aspect-ratio: 3 / 4;
  background: var(--surface-muted);
  overflow: hidden;
}

.item-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.item-card:hover .item-card__image {
  transform: scale(1.04);
}

.item-card__overlay {
  position: absolute;
  inset-inline: 0;
  bottom: 0;
  padding: 1.25rem 1rem 1rem;
  background: linear-gradient(to top, rgb(0 0 0 / 72%) 0%, rgb(0 0 0 / 38%) 55%, transparent 100%);
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.item-card__name {
  font-size: 0.9375rem;
  font-weight: 700;
  color: #fff;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-transform: capitalize;
}

.item-card__category {
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  color: rgb(255 255 255 / 82%);
}

.item-card__delete {
  position: absolute;
  top: 0.625rem;
  inset-inline-end: 0.625rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  background: rgb(0 0 0 / 45%);
  opacity: 0;
  transition: opacity 0.2s, background-color 0.2s;
}

.item-card:hover .item-card__delete,
.item-card:focus-within .item-card__delete {
  opacity: 1;
}

.item-card__delete:hover {
  background: rgb(0 0 0 / 65%);
}
</style>
