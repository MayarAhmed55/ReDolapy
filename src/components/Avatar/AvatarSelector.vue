<template>
  <div class="avatar-selector">
    <p class="text-sm font-medium text-(--Disabled-Text-color) mb-3">
      {{ $t('avatar.selector.title') }}
    </p>
    <div class="flex flex-wrap gap-3 sm:gap-4">
      <button
        v-for="avatar in avatars"
        :key="avatar.id"
        type="button"
        class="avatar-selector__item group"
        :class="{
          'avatar-selector__item--active': selectedId === avatar.id,
          'avatar-selector__item--loading': loadingId === avatar.id,
        }"
        :aria-label="$t('avatar.selector.select_aria', { name: avatar.name })"
        @click="$emit('select', avatar)"
      >
        <img :src="avatar.url" :alt="avatar.name" class="avatar-selector__thumb" />
        <span v-if="loadingId === avatar.id" class="avatar-selector__spinner" aria-hidden="true" />
        <span v-else class="avatar-selector__overlay">
          {{ $t('avatar.result.use_hover') }}
        </span>
      </button>

      <button
        type="button"
        class="avatar-selector__create"
        :aria-label="upgradeMode ? $t('avatar.selector.upgrade_aria') : $t('avatar.selector.create_aria')"
        @click="$emit('create')"
      >
        <span class="avatar-selector__plus" aria-hidden="true">+</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AvatarSelector',
  emits: ['select', 'create'],
  props: {
    avatars: { type: Array, default: () => [] },
    selectedId: { type: String, default: '' },
    loadingId: { type: String, default: '' },
    upgradeMode: { type: Boolean, default: false },
  },
}
</script>

<style scoped>
.avatar-selector__create,
.avatar-selector__item {
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 9999px;
  overflow: hidden;
  flex-shrink: 0;
  border: 2px solid #D8DCE3;
  transition: border-color 0.2s, transform 0.2s;
}

@media (min-width: 640px) {
  .avatar-selector__create,
  .avatar-selector__item {
    width: 5rem;
    height: 5rem;
  }
}

.avatar-selector__create {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #EEF6FC 0%, #EEF9E0 100%);
  color: var(--Primary-Brand-color);
}

.avatar-selector__create:hover {
  border-color: var(--Primary-Brand-color);
  transform: scale(1.05);
}

.avatar-selector__plus {
  font-size: 1.75rem;
  line-height: 1;
  font-weight: 300;
  color: var(--Primary-Brand-color);
}

.avatar-selector__item {
  position: relative;
  padding: 0;
  background: white;
}

.avatar-selector__item--active {
  border-color: var(--Secondary-Brand-color);
  box-shadow: 0 0 0 1px var(--Secondary-Brand-color);
}

.avatar-selector__item:hover {
  border-color: var(--Secondary-Brand-color);
  transform: scale(1.05);
}

.avatar-selector__thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-selector__overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.375rem;
  text-align: center;
  font-size: 0.5625rem;
  font-weight: var(--Semi-Bold);
  line-height: 1.2;
  color: white;
  background: rgba(18, 24, 38, 0);
  transition: background 0.25s;
  pointer-events: none;
}

.group:hover .avatar-selector__overlay {
  background: rgba(18, 24, 38, 0.55);
}

.avatar-selector__item--loading {
  pointer-events: none;
  opacity: 0.75;
}

.avatar-selector__spinner {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(18, 24, 38, 0.45);
}

.avatar-selector__spinner::after {
  content: '';
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 9999px;
  border: 2px solid rgba(255, 255, 255, 0.35);
  border-top-color: white;
  animation: avatar-selector-spin 0.8s linear infinite;
}

@keyframes avatar-selector-spin {
  to { transform: rotate(360deg); }
}
</style>
