export const DEFAULT_COORDS = { lat: 30.0444, lon: 31.2357 }

export function startOfDay(date) {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

export function addDays(date, days) {
  const next = new Date(date)
  next.setDate(next.getDate() + days)
  return startOfDay(next)
}

export function isValidDateKey(dateKey) {
  if (!dateKey || typeof dateKey !== 'string' || dateKey.includes('NaN')) return false
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateKey)
  if (!match) return false
  const year = Number(match[1])
  const month = Number(match[2])
  const day = Number(match[3])
  const parsed = new Date(year, month - 1, day)
  return (
    parsed.getFullYear() === year
    && parsed.getMonth() === month - 1
    && parsed.getDate() === day
  )
}

export function toDateKey(date = new Date()) {
  const d = typeof date === 'string' && isValidDateKey(date)
    ? parseDateKey(date)
    : startOfDay(date)
  if (Number.isNaN(d.getTime())) {
    d.setTime(Date.now())
    d.setHours(0, 0, 0, 0)
  }
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const key = `${year}-${month}-${day}`
  if (isValidDateKey(key)) return key

  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
}

/** Parse YYYY-MM-DD as a local calendar date (avoids UTC shift from ISO strings). */
export function parseDateKey(dateKey) {
  if (!dateKey) return startOfDay(new Date())
  const [year, month, day] = String(dateKey).split('-').map(Number)
  if (!year || !month || !day) return startOfDay(new Date())
  return startOfDay(new Date(year, month - 1, day))
}

export function resolveRecommendationImage(url) {
  if (!url) return ''
  if (url.startsWith('data:') || url.startsWith('blob:')) return url
  if (url.startsWith('http')) {
    return `/image-proxy?url=${encodeURIComponent(url)}`
  }
  return url
}

/** Prefer top-level composite_image; fall back to outfit-level if present. */
export function getRecommendationCompositeUrl(rec) {
  if (!rec) return ''
  if (rec.composite_image) return rec.composite_image
  const outfit = rec.outfits?.[0]
  if (outfit?.composite_image) return outfit.composite_image
  return ''
}

/**
 * Merge two recommendation entries for the same day.
 * Keeps the newest metadata but preserves a composite_image from POST when GET returns null.
 */
export function mergeRecommendationEntries(existing, incoming) {
  if (!existing) return incoming || null
  if (!incoming) return existing

  const existingTime = new Date(existing.created_at || 0).getTime()
  const incomingTime = new Date(incoming.created_at || 0).getTime()
  const base = incomingTime >= existingTime
    ? { ...existing, ...incoming }
    : { ...incoming, ...existing }

  const composite = getRecommendationCompositeUrl(incoming)
    || getRecommendationCompositeUrl(existing)
    || base.composite_image
    || ''

  if (composite) {
    base.composite_image = composite
  }

  if (!base.outfits?.length) {
    base.outfits = incoming.outfits?.length ? incoming.outfits : existing.outfits
  }

  if (!base.weather) {
    base.weather = incoming.weather || existing.weather || null
  }

  return base
}

/**
 * Index history entries by calendar day (latest entry wins per day).
 */
export function indexHistoryByDate(history = []) {
  const map = new Map()

  history.forEach((entry) => {
    if (!entry?.created_at) return
    const key = toDateKey(entry.created_at)
    map.set(key, mergeRecommendationEntries(map.get(key), entry))
  })

  return map
}

/**
 * Infer the fixed week start from recommendation history.
 * Uses the latest cluster of consecutive days (ignores stale entries before a gap).
 */
export function inferWeekStartFromHistory(history = [], referenceDate = new Date()) {
  const keys = Array.from(indexHistoryByDate(history).keys()).sort()
  if (!keys.length) return null

  const today = startOfDay(referenceDate)
  const latest = parseDateKey(keys[keys.length - 1])
  let anchor = latest

  for (let i = keys.length - 1; i > 0; i -= 1) {
    const curr = parseDateKey(keys[i])
    const prev = parseDateKey(keys[i - 1])
    const gapDays = Math.round((curr.getTime() - prev.getTime()) / 86400000)

    if (gapDays > 1) {
      anchor = curr
      break
    }

    if (addDays(latest, -6).getTime() > prev.getTime()) {
      break
    }

    anchor = prev
  }

  const weekEnd = addDays(anchor, 6)
  if (today.getTime() >= anchor.getTime() && today.getTime() <= weekEnd.getTime()) {
    return toDateKey(anchor)
  }

  return null
}

export function filterHistoryToWeek(history = [], weekStartKey) {
  if (!isValidDateKey(weekStartKey)) return history
  const start = parseDateKey(weekStartKey)
  const end = addDays(start, 6)

  return history.filter((entry) => {
    if (!entry?.created_at) return false
    const day = parseDateKey(toDateKey(entry.created_at))
    return day.getTime() >= start.getTime() && day.getTime() <= end.getTime()
  })
}

function primaryOutfit(rec) {
  return rec?.outfits?.[0] || null
}

function findItem(outfit, category) {
  return outfit?.items?.find((item) => item.category === category) || null
}

function itemColor(item) {
  if (!item) return '—'
  if (item.color) return item.color
  const fromPalette = item.colors?.[0]?.color
  return fromPalette || '—'
}

export function buildOutfitDetailItems(rec, translate) {
  if (!rec) return []

  const outfit = primaryOutfit(rec)
  const top = findItem(outfit, 'top')
  const bottom = findItem(outfit, 'bottom')
  const weather = rec.weather
  const items = []

  if (top) {
    items.push({
      icon: 'category',
      text: translate('recommendation.detail_top', {
        name: top.name || top.type,
        color: itemColor(top),
        style: top.style || '—',
      }),
    })
  }

  if (bottom) {
    items.push({
      icon: 'category',
      text: translate('recommendation.detail_bottom', {
        name: bottom.name || bottom.type,
        color: itemColor(bottom),
        style: bottom.style || '—',
      }),
    })
  }

  const colors = [...new Set([itemColor(top), itemColor(bottom)].filter((c) => c && c !== '—'))]
  if (colors.length) {
    items.push({
      icon: 'color',
      text: translate('recommendation.detail_color', { color: colors.join(', ') }),
    })
  }

  if (top?.pattern || bottom?.pattern) {
    items.push({
      icon: 'pattern',
      text: translate('recommendation.detail_pattern', {
        pattern: top?.pattern || bottom?.pattern,
      }),
    })
  }

  const seasons = [...new Set([...(top?.season || []), ...(bottom?.season || [])])]
  if (seasons.length) {
    items.push({
      icon: 'season',
      text: translate('recommendation.detail_season', {
        season: seasons.join(', '),
      }),
    })
  }

  if (weather) {
    items.push({
      icon: 'weather',
      text: translate('recommendation.detail_weather', {
        temp: Math.round(weather.temperature ?? 0),
        condition: formatWeatherCondition(weather.condition),
      }),
    })
  }

  if (rec.score != null) {
    items.push({
      icon: 'score',
      text: translate('recommendation.detail_score', {
        score: rec.score,
      }),
    })
  }

  return items
}

/** @deprecated Use buildOutfitDetailItems */
export function buildOutfitDetails(rec, translate) {
  return buildOutfitDetailItems(rec, translate).map((item) => item.text)
}

export function buildRecommendationDescription(rec, translate) {
  if (!rec) return translate('recommendation.look_description')

  const outfit = primaryOutfit(rec)
  const top = findItem(outfit, 'top')
  const bottom = findItem(outfit, 'bottom')
  const weather = rec.weather

  if (weather && top && bottom) {
    return translate('recommendation.description_weather', {
      temp: Math.round(weather.temperature ?? 0),
      condition: formatWeatherCondition(weather.condition),
      top: top.name || top.type,
      bottom: bottom.name || bottom.type,
    })
  }

  if (top && bottom) {
    return translate('recommendation.description_items', {
      top: top.name || top.type,
      bottom: bottom.name || bottom.type,
    })
  }

  return translate('recommendation.look_description')
}

function formatWeatherCondition(condition) {
  if (!condition) return ''
  return String(condition).replace(/_/g, ' ')
}

export function getWeekStartKey(referenceDate = new Date()) {
  return toDateKey(startOfDay(referenceDate))
}

export function isWeekEnded(weekStartKey, referenceDate = new Date()) {
  const start = isValidDateKey(weekStartKey) ? parseDateKey(weekStartKey) : startOfDay(referenceDate)
  const weekEnd = addDays(start, 6)
  return startOfDay(referenceDate).getTime() > weekEnd.getTime()
}
