import { ref, computed } from 'vue'
import {
  addDays,
  getWeekStartKey,
  isValidDateKey,
  parseDateKey,
  startOfDay,
  toDateKey,
} from '../utils/recommendationHelpers.js'
import { getUserId } from '../utils/userHelpers.js'

function readWeekStartKeyFromStorage() {
  const userId = getUserId()
  if (!userId) return getWeekStartKey()
  try {
    const raw = localStorage.getItem(`rec_${userId}_week_start`)
    if (!raw) return getWeekStartKey()
    const parsed = JSON.parse(raw)
    return isValidDateKey(parsed) ? parsed : getWeekStartKey()
  } catch {
    return getWeekStartKey()
  }
}

/**
 * Fixed 7-day window anchored to `week_start` in localStorage.
 * Days stay stable (e.g. Jun 21–27) until the week ends; reset is handled
 * by useRecommendations.performWeeklyReset().
 */
export function useRecommendationWeek() {
  const weekStartKey = ref(readWeekStartKeyFromStorage())
  const selectedDateKey = ref(toDateKey(new Date()))

  function refreshWeekStartFromCache() {
    weekStartKey.value = readWeekStartKeyFromStorage()
  }

  function syncWeekWindow(referenceDate = new Date()) {
    refreshWeekStartFromCache()

    const start = parseDateKey(weekStartKey.value)
    const end = addDays(start, 6)
    const today = startOfDay(referenceDate)

    const selected = parseDateKey(selectedDateKey.value)
    if (selected < start || selected > end) {
      selectedDateKey.value = today >= start && today <= end
        ? toDateKey(today)
        : weekStartKey.value
    }
  }

  syncWeekWindow()

  const weekStart = computed(() => parseDateKey(weekStartKey.value))

  const weekDays = computed(() => {
    syncWeekWindow()
    const start = weekStart.value
    const todayKey = toDateKey(new Date())

    return Array.from({ length: 7 }, (_, index) => {
      const date = addDays(start, index)
      const key = toDateKey(date)
      return {
        date,
        key,
        isToday: key === todayKey,
      }
    })
  })

  const selectedDate = computed(() => parseDateKey(selectedDateKey.value))

  const weekEndKey = computed(() => {
    const end = addDays(weekStart.value, 6)
    return toDateKey(end)
  })

  function selectDay(day) {
    if (!day?.key || !isValidDateKey(day.key)) return
    selectedDateKey.value = day.key
  }

  function isSelected(day) {
    return day?.key === selectedDateKey.value
  }

  return {
    weekDays,
    weekStart,
    weekStartKey,
    weekEndKey,
    selectedDate,
    selectedDateKey,
    selectDay,
    isSelected,
    syncWeekWindow,
    refreshWeekStartFromCache,
  }
}
