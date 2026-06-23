<template>

  <section class="week-strip" :aria-label="$t('recommendation.week_aria')">

    <h2 class="week-strip__heading">{{ $t('recommendation.week_title') }}</h2>



    <div class="week-strip__scroll">

      <button

        v-for="day in weekDays"

        :key="day.key"

        type="button"

        class="week-strip__day"

        :class="{

          'week-strip__day--selected': isSelected(day),

          'week-strip__day--today': day.isToday,

          'week-strip__day--has-data': day.hasRecommendation,

        }"

        :aria-pressed="isSelected(day)"

        :aria-label="dayAriaLabel(day)"

        @click="$emit('select', day)"

      >

        <span class="week-strip__day-name">{{ formatDayName(day.date) }}</span>

        <span class="week-strip__day-date">{{ formatDayDate(day.date) }}</span>

        <span class="week-strip__weather" aria-hidden="true">

          <svg v-if="isClearWeather(day.weather)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">

            <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" opacity="0.85"/>

            <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>

          </svg>

          <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">

            <path d="M18 10a4 4 0 0 0-7.9-1A3.5 3.5 0 1 0 6 15h11.5a3.5 3.5 0 0 0 .5-7z"/>

          </svg>

        </span>

      </button>

    </div>

  </section>

</template>



<script>
export default {
  name: 'RecommendationWeekStrip',
  props: {
    weekDays: {
      type: Array,
      default: () => [],
    },
    isSelected: {
      type: Function,
      required: true,
    },
  },
  emits: ['select'],
  computed: {
    localeTag() {
      return this.$i18n?.locale === 'ar' ? 'ar-EG' : 'en-US'
    },
  },
  methods: {
    formatDayName(date) {
      if (!date) return ''
      return new Intl.DateTimeFormat(this.localeTag, { weekday: 'short' })
        .format(new Date(date))
        .toUpperCase()
    },
    formatDayDate(date) {
      if (!date) return ''
      return new Intl.DateTimeFormat(this.localeTag, { month: 'short', day: 'numeric' })
        .format(new Date(date))
    },
    dayAriaLabel(day) {
      if (!day?.date) return ''
      const label = new Intl.DateTimeFormat(this.localeTag, {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      }).format(new Date(day.date))
      return this.$t('recommendation.select_day', { date: label })
    },
    isClearWeather(weather) {
      if (!weather?.condition) return true
      const condition = String(weather.condition).toLowerCase()
      return condition.includes('clear') || condition.includes('sun') || condition.includes('mainly_clear')
    },
  },
}
</script>



<style scoped>

.week-strip {

  margin-top: 2rem;

}



.week-strip__heading {

  margin: 0 0 1rem;

  font-size: 1.125rem;

  font-weight: 700;

  color: var(--Primary-Text-color);

}



.week-strip__scroll {

  display: grid;

  grid-template-columns: repeat(2, minmax(0, 1fr));

  gap: 0.625rem;

}

@media (min-width: 480px) {

  .week-strip__scroll {

    grid-template-columns: repeat(4, minmax(0, 1fr));

  }

}

@media (min-width: 768px) {

  .week-strip__scroll {

    grid-template-columns: repeat(7, minmax(0, 1fr));

  }

}



.week-strip__day {

  flex: unset;

  width: 100%;

  display: flex;

  flex-direction: column;

  align-items: center;

  gap: 0.35rem;

  padding: 0.85rem 0.65rem;

  border-radius: 1rem;

  border: 1.5px solid transparent;

  background: var(--card-surface);

  color: var(--Primary-Text-color);

  cursor: pointer;

  transition: border-color 0.2s, color 0.2s, box-shadow 0.2s;

}



.week-strip__day:hover {

  border-color: rgb(142 211 33 / 35%);

}



.week-strip__day--selected {

  border-color: var(--Secondary-Brand-color);

  color: var(--Secondary-Brand-color);

  box-shadow: 0 0 0 1px rgb(142 211 33 / 15%);

}



.week-strip__day--today {

  box-shadow: inset 0 0 0 1px rgb(142 211 33 / 25%);

}



.week-strip__day--has-data .week-strip__weather {

  opacity: 1;

}



.week-strip__day-name {

  font-size: 0.6875rem;

  font-weight: 700;

  letter-spacing: 0.06em;

}



.week-strip__day-date {

  font-size: 0.8125rem;

  font-weight: 700;

}



.week-strip__weather {

  display: flex;

  align-items: center;

  justify-content: center;

  margin-top: 0.15rem;

  color: inherit;

  opacity: 0.55;

}



.week-strip__weather svg {

  width: 1.1rem;

  height: 1.1rem;

}

</style>

