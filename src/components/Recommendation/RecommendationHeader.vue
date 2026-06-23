<template>
  <header class="recommendation-header">
    <h1 class="recommendation-header__title">
      {{ greeting }},
      <span class="recommendation-header__name">{{ displayName }}!</span>
    </h1>
    <p class="recommendation-header__subtitle">
      {{ $t('recommendation.tagline') }}
    </p>
  </header>
</template>

<script>
import { getTimeOfDayKey } from '../../utils/userHelpers.js'

export default {
  name: 'RecommendationHeader',
  props: {
    displayName: {
      type: String,
      default: '',
    },
  },
  computed: {
    greeting() {
      const key = getTimeOfDayKey()
      return this.$t(`recommendation.greeting.${key}`)
    },
  },
}
</script>

<style scoped>
.recommendation-header {
  margin-bottom: 1.75rem;
}

.recommendation-header__title {
  margin: 0;
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 700;
  line-height: 1.25;
  color: var(--Primary-Text-color);
}

.recommendation-header__name {
  color: var(--Secondary-Brand-color);
}

.recommendation-header__subtitle {
  margin: 0.5rem 0 0;
  font-size: 0.9375rem;
  color: var(--Secondary-Text-color);
}
</style>
