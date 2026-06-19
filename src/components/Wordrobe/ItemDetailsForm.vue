<template>
  <div class="item-details-form space-y-5">
    <fieldset v-for="field in fields" :key="field.key" class="border-0 p-0 m-0">
      <legend class="flex items-center gap-2 text-sm font-bold text-(--Primary-Text-color) mb-3">
        <span class="form-icon-wrap">
          <img :src="field.icon" alt="" class="form-icon" aria-hidden="true" />
        </span>
        {{ $t(`wardrobe.form.${field.key}`) }}
      </legend>
      <div class="flex flex-wrap gap-2 mb-4">
        <button
          v-for="option in field.options"
          :key="option"
          type="button"
          class="option-chip"
          :class="{ 'option-chip--active': isSelected(field.key, option) }"
          :disabled="saving || readonly"
          @click="onSelect(field.key, option)"
        >
          {{ $t(`wardrobe.options.${field.key}.${option}`) }}
        </button>
      </div>
    </fieldset>
  </div>
</template>

<script>
import categoryIcon from '../../assets/categoryIcon.svg'
import genderIcon from '../../assets/genderIcon.svg'
import patterenIcon from '../../assets/patterenIcon.svg'
import seasonIcon from '../../assets/SeasonIcon.svg'
import starsIcon from '../../assets/StarsIcon.svg'
import {
  FILTER_CATEGORIES,
  GENDERS,
  PATTERNS,
  SEASONS,
  STYLES,
} from '../../api/wardrobe.js'

const FIELD_ICONS = {
  gender: genderIcon,
  category: categoryIcon,
  season: seasonIcon,
  style: starsIcon,
  pattern: patterenIcon,
}

export default {
  name: 'ItemDetailsForm',
  props: {
    garment: { type: Object, required: true },
    saving: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
  },
  emits: ['update'],
  computed: {
    fields() {
      return [
        { key: 'gender', options: GENDERS, icon: FIELD_ICONS.gender },
        { key: 'category', options: FILTER_CATEGORIES, icon: FIELD_ICONS.category },
        { key: 'season', options: SEASONS, multi: true, icon: FIELD_ICONS.season },
        { key: 'style', options: STYLES, icon: FIELD_ICONS.style },
        { key: 'pattern', options: PATTERNS, icon: FIELD_ICONS.pattern },
      ]
    },
  },
  methods: {
    isSelected(key, option) {
      if (key === 'season') {
        return Array.isArray(this.garment.season) && this.garment.season.includes(option)
      }
      return this.garment[key] === option
    },
    onSelect(key, option) {
      if (this.readonly) return

      const updated = { ...this.garment }

      if (key === 'season') {
        const current = Array.isArray(updated.season) ? [...updated.season] : []
        const index = current.indexOf(option)
        if (index >= 0) {
          current.splice(index, 1)
        } else {
          current.push(option)
        }
        updated.season = current
      } else {
        updated[key] = option
      }

      this.$emit('update', updated)
    },
  },
}
</script>

<style scoped>
.form-icon-wrap {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
}

.form-icon {
  width: 1.125rem;
  height: 1.125rem;
  object-fit: contain;
  filter: brightness(0) saturate(100%) invert(72%) sepia(28%) saturate(1200%) hue-rotate(44deg) brightness(98%) contrast(92%);
}

.option-chip {
  padding: 0.5rem 0.85rem;
  border-radius: 0.625rem;
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--store-filter-text);
  background: var(--card-surface);
  border: 1.5px solid var(--input-border);
  transition: border-color 0.2s, color 0.2s, background-color 0.2s;
}

.option-chip:hover:not(:disabled) {
  border-color: var(--Secondary-Brand-color);
}

.option-chip--active {
  color: var(--Primary-Text-color);
  background: var(--card-surface);
  border-color: var(--Secondary-Brand-color);
  box-shadow: 0 0 0 1px var(--Secondary-Brand-color);
}

.option-chip:disabled {
  opacity: 0.85;
  cursor: default;
}
</style>
