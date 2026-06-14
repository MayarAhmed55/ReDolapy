<template>
  <div class="avatar-form-card">
    <h2 class="text-base sm:text-lg font-bold text-(--Primary-Text-color) mb-5 sm:mb-6">
      {{ $t('avatar.form.title') }}
    </h2>

    <form class="space-y-4 sm:space-y-5" :class="{ 'opacity-60 pointer-events-none': disabled }" @submit.prevent="$emit('generate', { ...form })">
      <div>
        <label class="avatar-label" for="avatar-age">{{ $t('avatar.form.age') }}</label>
        <input
          id="avatar-age"
          v-model="form.age"
          type="number"
          min="1"
          max="120"
          class="avatar-input"
          :placeholder="$t('avatar.form.age_placeholder')"
        />
      </div>

      <div>
        <span class="avatar-label">{{ $t('avatar.form.gender') }}</span>
        <div class="flex gap-2 sm:gap-3 mt-1.5">
          <button
            v-for="option in genderOptions"
            :key="option.value"
            type="button"
            class="avatar-toggle"
            :class="{ 'avatar-toggle--active': form.gender === option.value }"
            @click="form.gender = option.value"
          >
            {{ option.label }}
          </button>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-3 sm:gap-4">
        <div>
          <label class="avatar-label" for="avatar-weight">{{ $t('avatar.form.weight') }}</label>
          <input
            id="avatar-weight"
            v-model="form.weight"
            type="number"
            min="1"
            class="avatar-input"
            :placeholder="$t('avatar.form.weight_placeholder')"
          />
        </div>
        <div>
          <label class="avatar-label" for="avatar-height">{{ $t('avatar.form.height') }}</label>
          <input
            id="avatar-height"
            v-model="form.height"
            type="number"
            min="1"
            class="avatar-input"
            :placeholder="$t('avatar.form.height_placeholder')"
          />
        </div>
      </div>

      <div>
        <span class="avatar-label">{{ $t('avatar.form.skin_tone') }}</span>
        <div class="flex flex-wrap gap-3 sm:gap-4 mt-2">
          <button
            v-for="tone in skinTones"
            :key="tone.id"
            type="button"
            class="avatar-swatch"
            :class="{ 'avatar-swatch--active': form.skinTone === tone.id }"
            @click="form.skinTone = tone.id"
          >
            <span
              class="avatar-swatch__circle"
              :style="{ backgroundColor: tone.color }"
            />
            <span class="avatar-swatch__label">{{ tone.label }}</span>
          </button>
        </div>
      </div>

      <div>
        <span class="avatar-label">{{ $t('avatar.form.hair_color') }}</span>
        <div class="flex flex-wrap gap-3 sm:gap-4 mt-2">
          <button
            v-for="color in hairColors"
            :key="color.id"
            type="button"
            class="avatar-swatch"
            :class="{ 'avatar-swatch--active': form.hairColor === color.id }"
            @click="form.hairColor = color.id"
          >
            <span
              class="avatar-swatch__circle"
              :style="{ backgroundColor: color.color }"
            />
            <span class="avatar-swatch__label">{{ color.label }}</span>
          </button>
        </div>
      </div>

      <button
        type="submit"
        class="avatar-generate-btn"
        :disabled="generating || !isValid || disabled"
      >
        {{ generating ? $t('avatar.form.generating') : $t('avatar.form.generate_btn') }}
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'AvatarParametersForm',
  emits: ['generate'],
  props: {
    generating: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
  },
  data: () => ({
    form: {
      age: '',
      gender: 'female',
      weight: '',
      height: '',
      skinTone: 'medium',
      hairColor: 'brown',
    },
  }),
  computed: {
    genderOptions() {
      return [
        { value: 'male', label: this.$t('avatar.form.male') },
        { value: 'female', label: this.$t('avatar.form.female') },
      ]
    },
    skinTones() {
      return [
        { id: 'very_light', color: '#FDEBD0', label: this.$t('avatar.form.skin_very_light') },
        { id: 'light', color: '#F5CBA7', label: this.$t('avatar.form.skin_light') },
        { id: 'medium', color: '#D4A574', label: this.$t('avatar.form.skin_medium') },
        { id: 'tan', color: '#C68642', label: this.$t('avatar.form.skin_tan') },
        { id: 'brown', color: '#8D5524', label: this.$t('avatar.form.skin_brown') },
        { id: 'dark', color: '#3B2219', label: this.$t('avatar.form.skin_dark') },
      ]
    },
    hairColors() {
      return [
        { id: 'black', color: '#1A1A1A', label: this.$t('avatar.form.hair_black') },
        { id: 'dark_brown', color: '#3B2314', label: this.$t('avatar.form.hair_dark_brown') },
        { id: 'brown', color: '#6B4423', label: this.$t('avatar.form.hair_brown') },
        { id: 'light_brown', color: '#A67B5B', label: this.$t('avatar.form.hair_light_brown') },
        { id: 'blonde', color: '#E8C547', label: this.$t('avatar.form.hair_blonde') },
        { id: 'red', color: '#B7410E', label: this.$t('avatar.form.hair_red') },
      ]
    },
    isValid() {
      return Boolean(this.form.age && this.form.gender && this.form.weight && this.form.height)
    },
  },
  methods: {
    reset() {
      this.form = {
        age: '',
        gender: 'female',
        weight: '',
        height: '',
        skinTone: 'medium',
        hairColor: 'brown',
      }
    },
  },
}
</script>

<style scoped>
.avatar-form-card {
  padding: 1.25rem;
  border-radius: 1.25rem;
  background: white;
  border: 2px solid transparent;
  background-image: linear-gradient(white, white), var(--Gradient-border);
  background-origin: border-box;
  background-clip: padding-box, border-box;
}

@media (min-width: 640px) {
  .avatar-form-card {
    padding: 1.75rem;
  }
}

.avatar-label {
  display: block;
  font-size: 0.8125rem;
  font-weight: var(--Semi-Bold);
  color: var(--Primary-Text-color);
  margin-bottom: 0.375rem;
}

.avatar-input {
  width: 100%;
  padding: 0.625rem 0.875rem;
  border-radius: 0.625rem;
  border: 1px solid #D8DCE3;
  font-size: 0.875rem;
  color: var(--Primary-Text-color);
  background: white;
  outline: none;
  transition: border-color 0.2s;
}

.avatar-input:focus {
  border-color: var(--Primary-Brand-color);
}

.avatar-input::placeholder {
  color: var(--Disabled-Text-color);
}

.avatar-toggle {
  flex: 1;
  padding: 0.625rem 0.75rem;
  border-radius: 0.625rem;
  border: 1px solid #D8DCE3;
  font-size: 0.875rem;
  font-weight: var(--Semi-Bold);
  color: var(--Primary-Text-color);
  background: white;
  transition: border-color 0.2s, background 0.2s;
}

.avatar-toggle--active {
  border-color: var(--Primary-Brand-color);
  background: #EEF6FC;
  color: var(--Primary-Brand-color);
}

.avatar-swatch {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.375rem;
  min-width: 3.25rem;
}

.avatar-swatch__circle {
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  border: 2px solid transparent;
  transition: border-color 0.2s, transform 0.2s;
}

.avatar-swatch--active .avatar-swatch__circle {
  border-color: var(--Secondary-Brand-color);
  transform: scale(1.08);
}

.avatar-swatch__label {
  font-size: 0.625rem;
  color: var(--Disabled-Text-color);
  text-align: center;
  max-width: 3.5rem;
  line-height: 1.2;
}

.avatar-generate-btn {
  width: 100%;
  margin-top: 0.5rem;
  padding: 0.875rem 1rem;
  border-radius: 0.75rem;
  border: none;
  font-size: 0.9375rem;
  font-weight: var(--Bold);
  color: white;
  background: var(--Gradient-bgc);
  transition: opacity 0.2s;
}

.avatar-generate-btn:hover:not(:disabled) {
  opacity: 0.92;
}

.avatar-generate-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
