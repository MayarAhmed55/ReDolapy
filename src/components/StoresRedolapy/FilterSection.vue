<template>
  <div class="filter-section">
    <button
      type="button"
      class="filter-section__header"
      :aria-expanded="open"
      @click="$emit('toggle')"
    >
      <span>{{ title }}</span>
      <svg
        class="filter-section__chevron"
        :class="{ 'filter-section__chevron--open': open }"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        aria-hidden="true"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
      </svg>
    </button>

    <div v-show="open" class="filter-section__body">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterSection',
  emits: ['toggle'],
  props: {
    title: { type: String, required: true },
    open: { type: Boolean, default: true },
  },
}
</script>

<style scoped>
.filter-section {
  border-top: 1px solid #e8eaee;
  padding: 1rem 0;
}


.filter-section__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: none;
  border: none;
  padding: 0;
  font-size: 0.875rem;
  font-weight: var(--Bold);
  color: var(--Primary-Text-color);
  cursor: pointer;
  font-family: 'Roboto', sans-serif;
  text-transform: none;
  letter-spacing: normal;
}

.filter-section__chevron {
  width: 1rem;
  height: 1rem;
  color: #a0a6b2;
  transition: transform 0.2s;
}

.filter-section__chevron--open {
  transform: rotate(180deg);
}

.filter-section__body {
  margin-top: 1rem;
}
</style>
