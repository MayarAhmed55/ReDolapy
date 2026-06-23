<template>

  <main class="recommendation-page">

    <RecommendationHeader :display-name="userFirstName" />



    <p v-if="error" class="recommendation-page__error" role="alert">{{ error }}</p>

    <p v-if="syncing && !loading" class="recommendation-page__sync" role="status">
      {{ $t('recommendation.syncing') }}
    </p>



    <RecommendationCard

      :title="activeRecommendation.title"

      :description="activeRecommendation.description"

      :image="activeRecommendation.image"

      :details="activeRecommendation.details"

      :loading="loading && !activeRecommendation.hasData"

      :generating="generating && !activeRecommendation.hasData"

      :is-today="selectedDateKey === todayKey"

      :has-data="activeRecommendation.hasData"

    />



    <RecommendationWeekStrip

      :week-days="weekDaysWithMeta"

      :is-selected="isSelected"

      @select="selectDay"

    />

  </main>

</template>



<script>

import { computed, onMounted, onBeforeUnmount, watch } from 'vue'

import { useI18n } from 'vue-i18n'

import RecommendationHeader from '../components/Recommendation/RecommendationHeader.vue'

import RecommendationCard from '../components/Recommendation/RecommendationCard.vue'

import RecommendationWeekStrip from '../components/Recommendation/RecommendationWeekStrip.vue'

import { useRecommendationWeek } from '../composables/useRecommendationWeek.js'

import { useRecommendations } from '../composables/useRecommendations.js'

import { toDateKey } from '../utils/recommendationHelpers.js'

import { getUserFirstName } from '../utils/userHelpers.js'



export default {

  name: 'Recommendation',

  components: {

    RecommendationHeader,

    RecommendationCard,

    RecommendationWeekStrip,

  },

  setup() {

    const { t, locale } = useI18n()

    const week = useRecommendationWeek()

    const recommendations = useRecommendations()



    const todayKey = computed(() => toDateKey(new Date()))



    const formattedSelectedDate = computed(() => {

      const localeTag = locale.value === 'ar' ? 'ar-EG' : 'en-US'

      return new Intl.DateTimeFormat(localeTag, {

        weekday: 'long',

        month: 'long',

        day: 'numeric',

      }).format(week.selectedDate.value)

    })



    const activeRecommendation = computed(() => {

      const rec = recommendations.getRecommendationForDateKey(week.selectedDateKey.value)

      return recommendations.mapToCardView(rec, {

        translate: t,

        locale: locale.value,

        isToday: week.selectedDateKey.value === todayKey.value,

        formattedDate: formattedSelectedDate.value,

      })

    })



    const weekDaysWithMeta = computed(() => {

      return week.weekDays.value.map((day) => ({

        ...day,

        hasRecommendation: recommendations.historyByDate.value.has(day.key),

        weather: recommendations.getRecommendationForDateKey(day.key)?.weather || null,

      }))

    })



    onMounted(() => {
      window.addEventListener('focus', week.syncWeekWindow)
      recommendations.runMaintenance().then(() => {
        week.refreshWeekStartFromCache()
        week.syncWeekWindow()
      })
    })

    watch(
      () => recommendations.history.value.length,
      () => {
        week.refreshWeekStartFromCache()
        week.syncWeekWindow()
      },
    )

    onBeforeUnmount(() => {
      window.removeEventListener('focus', week.syncWeekWindow)
    })



    return {

      userFirstName: getUserFirstName(),

      todayKey,

      ...week,

      ...recommendations,

      activeRecommendation,

      weekDaysWithMeta,

    }

  },

}

</script>



<style scoped>

.recommendation-page {

  width: 100%;

  max-width: 72rem;

  margin: 0 auto;

  padding: 1.5rem 0 3rem;

}



.recommendation-page__sync {
  margin: 0 0 1rem;
  font-size: 0.8125rem;
  color: var(--Secondary-Text-color);
}



.recommendation-page__error {

  margin: 0 0 1rem;

  padding: 0.75rem 1rem;

  border-radius: 0.75rem;

  font-size: 0.875rem;

  color: #b91c1c;

  background: rgb(254 226 226 / 60%);

}



html.dark .recommendation-page__error {

  color: #fca5a5;

  background: rgb(127 29 29 / 25%);

}



@media (min-width: 640px) {

  .recommendation-page {

    padding-top: 2rem;

  }

}

</style>

