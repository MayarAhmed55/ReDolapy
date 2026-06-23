import { computed, ref } from 'vue'
import {
  deleteAllRecommendations,
  generateRecommendations,
  getRecommendationHistory,
} from '../api/recommendations.js'
import {
  buildOutfitDetailItems,
  buildRecommendationDescription,
  DEFAULT_COORDS,
  addDays,
  filterHistoryToWeek,
  getRecommendationCompositeUrl,
  getWeekStartKey,
  indexHistoryByDate,
  inferWeekStartFromHistory,
  isValidDateKey,
  isWeekEnded,
  parseDateKey,
  resolveRecommendationImage,
  startOfDay,
  toDateKey,
} from '../utils/recommendationHelpers.js'
import { getUserId } from '../utils/userHelpers.js'

const POST_HOUR = 6
const CHECK_INTERVAL_MS = 60 * 60 * 1000
const POLL_INTERVAL_MS = 30000
const MAX_POLL_ATTEMPTS = 180
const MAX_POST_RETRIES = 2
const POST_RETRY_DELAY_MS = 8000
/** Backend fails on sort when limit >= 5; keep this at 3–4. */
const FETCH_LIMIT = 3
const FETCH_ERROR_COOLDOWN_MS = 5 * 60 * 1000

const history = ref([])
const loading = ref(false)
const syncing = ref(false)
const generating = ref(false)
const error = ref(null)

let schedulerStarted = false
let checkTimer = null
let pollTimer = null
let maintenanceRunning = false
let postInFlight = false
let lastFetchErrorAt = 0

function cachePrefix() {
  const userId = getUserId()
  return userId ? `rec_${userId}` : null
}

function cacheKey(suffix) {
  const prefix = cachePrefix()
  return prefix ? `${prefix}_${suffix}` : null
}

function readCache(key, fallback = null) {
  const storageKey = cacheKey(key)
  if (!storageKey) return fallback
  try {
    const raw = localStorage.getItem(storageKey)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function writeCache(key, value) {
  const storageKey = cacheKey(key)
  if (!storageKey) return
  localStorage.setItem(storageKey, JSON.stringify(value))
}

function resolveWeekStartKey() {
  const stored = readCache('week_start', null)
  const today = startOfDay(new Date())

  if (isValidDateKey(stored)) {
    const start = parseDateKey(stored)
    const weekEnd = addDays(start, 6)
    if (today.getTime() >= start.getTime() && today.getTime() <= weekEnd.getTime()) {
      const inferred = inferWeekStartFromHistory(readCache('history', history.value), today)
      if (inferred && inferred !== stored) {
        writeCache('week_start', inferred)
        return inferred
      }
      return stored
    }
  }

  const inferred = inferWeekStartFromHistory(readCache('history', history.value), today)
  if (inferred) return inferred

  return getWeekStartKey()
}

function applyWeekWindowToHistory(weekStartKey) {
  if (!isValidDateKey(weekStartKey)) return
  const trimmed = filterHistoryToWeek(history.value, weekStartKey)
  if (trimmed.length !== history.value.length) {
    history.value = trimmed
    persistHistory()
  }
}

function ensureWeekStartCached() {
  const weekStartKey = resolveWeekStartKey()
  writeCache('week_start', weekStartKey)
  applyWeekWindowToHistory(weekStartKey)
  return weekStartKey
}

function clearRecommendationCache() {
  writeCache('history', [])
  localStorage.removeItem(cacheKey('post_date'))
  localStorage.removeItem(cacheKey('post_pending'))
}

function hydrateFromCache() {
  const cached = readCache('history', [])
  if (Array.isArray(cached) && cached.length) {
    history.value = cached
  }
  ensureWeekStartCached()
}

function persistHistory() {
  writeCache('history', history.value)
}

/**
 * Merge cached and fetched entries; latest created_at wins per calendar day.
 */
function mergeHistoryEntries(cached = [], fetched = []) {
  const combined = [...(Array.isArray(cached) ? cached : []), ...(Array.isArray(fetched) ? fetched : [])]
  if (!combined.length) return []

  const byDate = indexHistoryByDate(combined)
  return Array.from(byDate.values()).sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  )
}

function normalizeRecommendationEntry(entry) {
  if (!entry) return null
  const composite = getRecommendationCompositeUrl(entry)
  if (composite && !entry.composite_image) {
    return { ...entry, composite_image: composite }
  }
  return entry
}

function upsertRecommendationEntry(entry) {
  const normalized = normalizeRecommendationEntry(entry)
  if (!normalized?.created_at) return
  history.value = mergeHistoryEntries(history.value, [normalized])
  persistHistory()
}

function hasAuth() {
  return Boolean(localStorage.getItem('token') && getUserId())
}

function isPastDailyPostHour(date = new Date()) {
  return date.getHours() >= POST_HOUR
}

function getLastPostDateKey() {
  const stored = readCache('post_date', null)
  return isValidDateKey(stored) ? stored : null
}

function sanitizePostCache() {
  const postDate = readCache('post_date', null)
  if (postDate != null && !isValidDateKey(postDate)) {
    localStorage.removeItem(cacheKey('post_date'))
  }

  const pending = readCache('post_pending', null)
  if (pending?.dateKey && !isValidDateKey(pending.dateKey)) {
    localStorage.removeItem(cacheKey('post_pending'))
  }
}

function markPostTriggered(dateKey = toDateKey()) {
  const key = isValidDateKey(dateKey) ? dateKey : toDateKey()
  if (!isValidDateKey(key)) return

  writeCache('post_date', key)
  writeCache('post_pending', { dateKey: key, startedAt: Date.now() })
}

function markTodaySatisfied(todayKey = toDateKey()) {
  if (!isValidDateKey(todayKey)) return
  writeCache('post_date', todayKey)
  clearPostPending()
  postInFlight = false
  generating.value = false
  stopPolling()
}

function clearPostPending() {
  localStorage.removeItem(cacheKey('post_pending'))
}

function isPostPendingForToday() {
  if (postInFlight) return true

  const pending = readCache('post_pending', null)
  const todayKey = toDateKey()
  return isValidDateKey(pending?.dateKey) && pending.dateKey === todayKey
}

function hasRecommendationForDate(dateKey) {
  if (!isValidDateKey(dateKey)) return false
  return indexHistoryByDate(history.value).has(dateKey)
}

function isTodayComplete(todayKey = toDateKey()) {
  if (!isValidDateKey(todayKey)) return false
  if (getLastPostDateKey() === todayKey && hasRecommendationForDate(todayKey)) {
    return true
  }
  return hasRecommendationForDate(todayKey)
}

function shouldTriggerDailyPost(todayKey = toDateKey()) {
  if (!hasAuth()) return false
  if (!isValidDateKey(todayKey)) return false
  if (hasRecommendationForDate(todayKey)) return false
  if (getLastPostDateKey() === todayKey) return false
  if (isPostPendingForToday() || postInFlight) return false
  return isPastDailyPostHour()
}

function shouldFetchHistoryFromNetwork(todayKey = toDateKey()) {
  if (isTodayComplete(todayKey)) return false

  if (getLastPostDateKey() === todayKey && !hasRecommendationForDate(todayKey)) {
    return true
  }

  if (isPostPendingForToday()) return true

  if (shouldTriggerDailyPost(todayKey)) return true

  if (!getLastPostDateKey() && isPastDailyPostHour()) return true

  if (Date.now() - lastFetchErrorAt < FETCH_ERROR_COOLDOWN_MS) return false

  return !history.value.length
}

function shouldBackgroundSync(todayKey = toDateKey()) {
  if (!hasAuth()) return false
  if (Date.now() - lastFetchErrorAt < FETCH_ERROR_COOLDOWN_MS) return false
  if (shouldFetchHistoryFromNetwork(todayKey)) return true
  return history.value.length > 0
}

/**
 * If GET already returned today's outfit, treat the day as complete — never POST again.
 */
function syncTodayStateFromHistory(todayKey = toDateKey()) {
  if (!hasRecommendationForDate(todayKey)) return false
  markTodaySatisfied(todayKey)
  return true
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function fetchHistory({ silent = false, force = false, background = false } = {}) {
  if (!hasAuth()) return []

  const todayKey = toDateKey()
  hydrateFromCache()

  const hasCachedData = history.value.length > 0
  const mustFetch = force || shouldFetchHistoryFromNetwork(todayKey)
  const canSync = background || shouldBackgroundSync(todayKey)

  if (!mustFetch && !canSync) {
    syncTodayStateFromHistory(todayKey)
    return history.value
  }

  if (!mustFetch && hasCachedData && isTodayComplete(todayKey) && !background && !force) {
    syncTodayStateFromHistory(todayKey)
    return history.value
  }

  if (!silent && !hasCachedData) {
    loading.value = true
  }
  syncing.value = true
  error.value = null

  try {
    const data = await getRecommendationHistory({ limit: FETCH_LIMIT })
    const cached = readCache('history', [])
    history.value = mergeHistoryEntries(cached, data.history || [])
    ensureWeekStartCached()
    persistHistory()
    syncTodayStateFromHistory(todayKey)
    return history.value
  } catch (err) {
    lastFetchErrorAt = Date.now()
    hydrateFromCache()
    if (syncTodayStateFromHistory(todayKey)) {
      return history.value
    }
    if (!silent && !hasCachedData) {
      error.value = err.message || 'Failed to load recommendations'
    }
    return history.value
  } finally {
    loading.value = false
    syncing.value = false
  }
}

async function runPostWithRetries(retryCount = 0) {
  const todayKey = toDateKey()

  if (retryCount === 0) {
    if (postInFlight) return
    if (syncTodayStateFromHistory(todayKey)) return
    postInFlight = true
  }

  try {
    const result = await generateRecommendations({
      limit: 1,
      ...DEFAULT_COORDS,
    })

    const entry = result?.history?.[0] || result?.recommendation || null
    if (entry) {
      upsertRecommendationEntry(entry)
      if (!isValidDateKey(readCache('week_start', null))) {
        writeCache('week_start', toDateKey(entry.created_at))
        applyWeekWindowToHistory(toDateKey(entry.created_at))
      }
    }

    clearPostPending()
    await fetchHistory({ silent: true, background: true })
    syncTodayStateFromHistory(todayKey)
  } catch (err) {
    try {
      await fetchHistory({ silent: true, background: true })
      if (syncTodayStateFromHistory(todayKey)) return
    } catch {
      // Keep retry flow if history refresh also fails.
    }

    if (retryCount < MAX_POST_RETRIES) {
      await sleep(POST_RETRY_DELAY_MS)
      return runPostWithRetries(retryCount + 1)
    }

    clearPostPending()
    if (!hasRecommendationForDate(todayKey)) {
      localStorage.removeItem(cacheKey('post_date'))
    }
    generating.value = false
    error.value = err.message || 'Failed to generate recommendations'
  } finally {
    if (retryCount === 0) {
      postInFlight = false
    }
    if (hasRecommendationForDate(todayKey)) {
      syncTodayStateFromHistory(todayKey)
    }
  }
}

function stopPolling() {
  if (pollTimer) {
    clearInterval(pollTimer)
    pollTimer = null
  }
}

function startPollingForToday() {
  const todayKey = toDateKey()
  if (isTodayComplete(todayKey)) {
    syncTodayStateFromHistory(todayKey)
    return
  }

  stopPolling()
  let attempts = 0

  pollTimer = setInterval(async () => {
    attempts += 1
    const todayKey = toDateKey()

    try {
      await fetchHistory({ silent: true, background: true })
    } catch {
      // Keep polling until attempts exhausted.
    }

    if (syncTodayStateFromHistory(todayKey) || !isPostPendingForToday()) {
      generating.value = false
      stopPolling()
      return
    }

    if (attempts >= MAX_POLL_ATTEMPTS) {
      generating.value = false
      clearPostPending()
      postInFlight = false
      stopPolling()
    }
  }, POLL_INTERVAL_MS)
}

/**
 * Fire POST once per day without blocking UI; poll GET until today's entry exists.
 */
async function triggerDailyGeneration() {
  const todayKey = toDateKey()

  if (syncTodayStateFromHistory(todayKey)) return
  if (!shouldTriggerDailyPost(todayKey)) return
  if (postInFlight) return

  markPostTriggered(todayKey)
  generating.value = true
  error.value = null

  runPostWithRetries()
  startPollingForToday()
}

async function performWeeklyReset() {
  const weekStartKey = readCache('week_start', getWeekStartKey())
  if (!isWeekEnded(weekStartKey)) return false

  try {
    await deleteAllRecommendations()
  } catch (err) {
    error.value = err.message || 'Failed to reset weekly recommendations'
    return false
  }

  clearRecommendationCache()
  history.value = []
  postInFlight = false

  const newWeekStart = getWeekStartKey()
  writeCache('week_start', newWeekStart)

  if (shouldTriggerDailyPost()) {
    markPostTriggered(toDateKey())
    generating.value = true
    runPostWithRetries()
    startPollingForToday()
  }

  return true
}

async function runMaintenance() {
  if (!hasAuth() || maintenanceRunning) return
  maintenanceRunning = true

  try {
    sanitizePostCache()
    hydrateFromCache()

    const todayKey = toDateKey()

    if (syncTodayStateFromHistory(todayKey)) {
      await fetchHistory({ silent: true, background: true })
      return
    }

    ensureWeekStartCached()

    const resetTriggered = await performWeeklyReset()
    if (!resetTriggered) {
      try {
        await fetchHistory({ silent: true, background: true })
      } catch {
        syncTodayStateFromHistory(todayKey)
      }
    }

    if (syncTodayStateFromHistory(todayKey)) {
      return
    }

    if (shouldTriggerDailyPost(todayKey)) {
      await triggerDailyGeneration()
    } else if (isPostPendingForToday() && !hasRecommendationForDate(todayKey)) {
      generating.value = true
      startPollingForToday()
    } else {
      generating.value = false
    }
  } catch {
    // Errors are stored in `error` by fetch/generate helpers.
  } finally {
    maintenanceRunning = false
  }
}

export function initRecommendationScheduler() {
  if (schedulerStarted || !hasAuth()) return
  schedulerStarted = true

  runMaintenance()

  checkTimer = setInterval(runMaintenance, CHECK_INTERVAL_MS)

  window.addEventListener('focus', runMaintenance)
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      runMaintenance()
    }
  })
}

export function stopRecommendationScheduler() {
  schedulerStarted = false
  if (checkTimer) {
    clearInterval(checkTimer)
    checkTimer = null
  }
  stopPolling()
  postInFlight = false
  window.removeEventListener('focus', runMaintenance)
}

export function useRecommendations() {
  const historyByDate = computed(() => indexHistoryByDate(history.value))

  function getRecommendationForDateKey(dateKey) {
    return historyByDate.value.get(dateKey) || null
  }

  function mapToCardView(rec, { translate, locale, isToday, formattedDate }) {
    if (!rec) {
      return {
        title: isToday
          ? translate('recommendation.look_title_today')
          : translate('recommendation.look_title_date', { date: formattedDate }),
        description: translate('recommendation.look_description'),
        image: '',
        details: [],
        weather: null,
        hasData: false,
      }
    }

    return {
      title: isToday
        ? translate('recommendation.look_title_today')
        : translate('recommendation.look_title_date', { date: formattedDate }),
      description: buildRecommendationDescription(rec, translate),
      image: resolveRecommendationImage(getRecommendationCompositeUrl(rec)),
      details: buildOutfitDetailItems(rec, translate),
      weather: rec.weather || null,
      hasData: true,
    }
  }

  return {
    history,
    loading,
    syncing,
    generating,
    error,
    historyByDate,
    fetchHistory,
    getRecommendationForDateKey,
    mapToCardView,
    runMaintenance,
    initRecommendationScheduler,
  }
}
