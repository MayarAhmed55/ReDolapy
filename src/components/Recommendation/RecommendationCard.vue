<template>
  <section class="recommendation-card-section" :aria-label="$t('recommendation.section_today')">
    <h2 class="recommendation-card-section__heading">
      {{ $t('recommendation.section_today') }}
    </h2>

    <div class="recommendation-card-layout">
      <article class="recommendation-hero">
        <div class="recommendation-hero__media">
          <img
            v-if="displayImage && hasData"
            :src="displayImage"
            :alt="title"
            class="recommendation-hero__image"
            loading="eager"
            fetchpriority="high"
            @error="onImageError"
          />
          <div v-else class="recommendation-hero__placeholder" aria-hidden="true">
            <div
              v-if="(loading || generating) && !hasData"
              class="recommendation-hero__loading"
              role="status"
              :aria-label="generating ? $t('recommendation.generating') : $t('recommendation.loading')"
            >
              <div class="recommendation-hero__spinner" />
              <svg class="recommendation-hero__sparkle recommendation-hero__sparkle--active" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l1.09 3.36L16.5 6.5l-3.36 1.09L12 11l-1.09-3.41L7.5 6.5l3.41-1.14L12 2z"/>
                <path d="M5 14l.72 2.22L8 17l-2.28.72L5 20l-.72-2.28L2 17l2.28-.78L5 14z"/>
                <path d="M19 14l.72 2.22L22 17l-2.28.72L19 20l-.72-2.28L16 17l2.28-.78L19 14z"/>
              </svg>
              <p class="recommendation-hero__loading-text">
                {{ generating ? $t('recommendation.generating') : $t('recommendation.loading') }}
              </p>
            </div>
            <svg v-else class="recommendation-hero__sparkle" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l1.09 3.36L16.5 6.5l-3.36 1.09L12 11l-1.09-3.41L7.5 6.5l3.41-1.14L12 2z"/>
              <path d="M5 14l.72 2.22L8 17l-2.28.72L5 20l-.72-2.28L2 17l2.28-.78L5 14z"/>
              <path d="M19 14l.72 2.22L22 17l-2.28.72L19 20l-.72-2.28L16 17l2.28-.78L19 14z"/>
            </svg>
          </div>
        </div>

        <div class="recommendation-hero__content">
          <span class="recommendation-hero__badge">
            {{ isToday ? $t('recommendation.badge') : $t('recommendation.badge_day') }}
          </span>
          <h3 class="recommendation-hero__title">{{ title }}</h3>
          <p class="recommendation-hero__description">{{ description }}</p>
        </div>
      </article>

      <aside class="recommendation-details">
        <div class="recommendation-details__accent" aria-hidden="true" />
        <p class="recommendation-details__label">{{ $t('recommendation.outfit_details') }}</p>
        <ul v-if="detailItems.length" class="recommendation-details__list">
          <li v-for="(detail, index) in detailItems" :key="index" class="recommendation-details__item">
            <img
              v-if="iconFor(detail.icon)"
              :src="iconFor(detail.icon)"
              alt=""
              class="recommendation-details__icon"
              aria-hidden="true"
            />
            <span>{{ detail.text }}</span>
          </li>
        </ul>
        <p v-else class="recommendation-details__empty">
          {{ hasData ? $t('recommendation.outfit_empty') : emptyMessage }}
        </p>
      </aside>
    </div>
  </section>
</template>

<script>
import colorIcon from '../../assets/colorIcon.svg'
import patternIcon from '../../assets/patterenIcon.svg'
import seasonIcon from '../../assets/SeasonIcon.svg'
import categoryIcon from '../../assets/categoryIcon.svg'

const ICONS = {
  category: categoryIcon,
  color: colorIcon,
  pattern: patternIcon,
  season: seasonIcon,
}

export default {
  name: 'RecommendationCard',
  props: {
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
    details: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
    generating: {
      type: Boolean,
      default: false,
    },
    isToday: {
      type: Boolean,
      default: true,
    },
    hasData: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      imageLoadFailed: false,
    }
  },
  computed: {
    displayImage() {
      if (this.imageLoadFailed && this.image?.includes('/image-proxy?')) {
        try {
          const url = new URL(this.image, window.location.origin)
          return url.searchParams.get('url') || this.image
        } catch {
          return this.image
        }
      }
      return this.image
    },
    detailItems() {
      if (!this.details.length) return []
      if (typeof this.details[0] === 'string') {
        return this.details.map((text) => ({ icon: 'category', text }))
      }
      return this.details
    },
    emptyMessage() {
      if (this.generating) return this.$t('recommendation.generating')
      if (this.loading) return this.$t('recommendation.loading')
      return this.$t('recommendation.outfit_empty')
    },
  },
  watch: {
    image() {
      this.imageLoadFailed = false
    },
  },
  methods: {
    onImageError() {
      if (!this.imageLoadFailed) {
        this.imageLoadFailed = true
      }
    },
    iconFor(type) {
      return ICONS[type] || null
    },
  },
}
</script>

<style scoped>
.recommendation-card-section__heading {
  margin: 0 0 1rem;
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--Primary-Text-color);
}

.recommendation-card-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 900px) {
  .recommendation-card-layout {
    grid-template-columns: minmax(0, 0.9fr) minmax(0, 0.65fr);
    align-items: stretch;
  }
}

.recommendation-hero {
  position: relative;
  min-height: 28rem;
  aspect-ratio: 3 / 4;
  border-radius: 1.5rem;
  overflow: hidden;
  background: #111;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

@media (min-width: 640px) {
  .recommendation-hero {
    min-height: 26rem;
    aspect-ratio: 16 / 11;
  }
}

@media (min-width: 900px) {
  .recommendation-hero {
    min-height: 28rem;
    aspect-ratio: auto;
    height: 100%;
  }
}

html.dark .recommendation-hero {
  background: #050505;
}

.recommendation-hero__media {
  position: absolute;
  inset: 0;
  overflow: hidden;
  background: #111;
}

.recommendation-hero__image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center center;
  display: block;
  background: #111;               
  box-sizing: border-box;
}

.recommendation-hero__placeholder {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, #d9dce3 0%, #111111 72%);
}

html.dark .recommendation-hero__placeholder {
  background: linear-gradient(180deg, #3a3a3a 0%, #050505 72%);
}

.recommendation-hero__loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.recommendation-hero__spinner {
  width: 2.5rem;
  height: 2.5rem;
  border: 3px solid rgb(255 255 255 / 20%);
  border-top-color: var(--Secondary-Brand-color);
  border-radius: 50%;
  animation: rec-spin 0.9s linear infinite;
}

.recommendation-hero__loading-text {
  margin: 0;
  font-size: 0.875rem;
  color: rgb(255 255 255 / 70%);
}

.recommendation-hero__sparkle {
  width: 3rem;
  height: 3rem;
  color: rgb(255 255 255 / 35%);
}

.recommendation-hero__sparkle--active {
  color: var(--Secondary-Brand-color);
  animation: rec-pulse 1.4s ease-in-out infinite;
}

.recommendation-hero__content {
  position: relative;
  z-index: 1;
  padding: 1.25rem 1.25rem 1.5rem;
  background: linear-gradient(180deg, transparent 0%, rgb(0 0 0 / 78%) 38%, rgb(0 0 0 / 88%) 100%);
}

.recommendation-hero__badge {
  display: inline-block;
  margin-bottom: 0.75rem;
  padding: 0.25rem 0.65rem;
  border-radius: 9999px;
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #fff;
  background: var(--Secondary-Brand-color);
}

.recommendation-hero__title {
  margin: 0;
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  font-weight: 700;
  color: #fff;
}

.recommendation-hero__description {
  margin: 0.5rem 0 0;
  max-width: 36rem;
  font-size: 0.875rem;
  line-height: 1.55;
  color: rgb(255 255 255 / 82%);
}

.recommendation-details {
  padding: 1.25rem 1.5rem;
  border-radius: 1.5rem;
  background: var(--card-surface);
  border: 1px solid var(--card-border);
  min-height: 16rem;
}

@media (min-width: 900px) {
  .recommendation-details {
    min-height: 28rem;
  }
}

.recommendation-details__accent {
  width: 2.5rem;
  height: 0.2rem;
  border-radius: 9999px;
  background: var(--Secondary-Brand-color);
  margin-bottom: 0.85rem;
}

.recommendation-details__label {
  margin: 0 0 0.75rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--Secondary-Brand-color);
}

.recommendation-details__list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.recommendation-details__item {
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
  color: var(--Primary-Text-color);
  font-size: 0.875rem;
  line-height: 1.55;
}

.recommendation-details__icon {
  width: 1.125rem;
  height: 1.125rem;
  flex-shrink: 0;
  margin-top: 0.1rem;
  object-fit: contain;
}

html.dark .recommendation-details__icon {
  filter: brightness(0) invert(1);
}

.recommendation-details__empty {
  margin: 0;
  font-size: 0.875rem;
  color: var(--Secondary-Text-color);
}

@keyframes rec-spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes rec-pulse {
  0%,
  100% {
    opacity: 0.55;
    transform: scale(1);
  }

  50% {
    opacity: 1;
    transform: scale(1.08);
  }
}
</style>
