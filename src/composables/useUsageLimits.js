import { computed, ref } from 'vue'
import { getUserId } from '../utils/userHelpers.js'

export const USAGE_LIMITS = {
  tryOn: 5,
  recycle: 4,
}

const usageRevision = ref(0)

function storageKey() {
  const userId = getUserId()
  return userId ? `usage_limits_${userId}` : null
}

function readUsage() {
  const key = storageKey()
  if (!key) return { tryOn: 0, recycle: 0 }

  try {
    const raw = localStorage.getItem(key)
    const parsed = raw ? JSON.parse(raw) : {}
    return {
      tryOn: Number(parsed.tryOn) || 0,
      recycle: Number(parsed.recycle) || 0,
    }
  } catch {
    return { tryOn: 0, recycle: 0 }
  }
}

function writeUsage(usage) {
  const key = storageKey()
  if (!key) return
  localStorage.setItem(key, JSON.stringify(usage))
  usageRevision.value += 1
}

function normalizeType(type) {
  return type === 'recycle' ? 'recycle' : 'tryOn'
}

export function getUsageCount(type) {
  usageRevision.value
  const key = normalizeType(type)
  return readUsage()[key]
}

export function getUsageLimit(type) {
  return USAGE_LIMITS[normalizeType(type)]
}

export function getRemainingTries(type) {
  const key = normalizeType(type)
  return Math.max(0, USAGE_LIMITS[key] - getUsageCount(type))
}

export function canUseFeature(type) {
  return getRemainingTries(type) > 0
}

/**
 * Increment successful usage and return remaining tries.
 */
export function recordSuccessfulUse(type) {
  const key = normalizeType(type)
  const usage = readUsage()
  usage[key] = Math.min(USAGE_LIMITS[key], (usage[key] || 0) + 1)
  writeUsage(usage)
  return getRemainingTries(type)
}

/**
 * Redirect to upgrade page when limit is reached.
 * @returns {boolean} true if redirected (caller should abort action)
 */
export function guardUsageLimit(type, router) {
  if (canUseFeature(type)) return false
  router.push({ name: 'UpgradePricing' })
  return true
}

export function useUsageLimits() {
  const tryOnRemaining = computed(() => {
    usageRevision.value
    return getRemainingTries('tryOn')
  })

  const recycleRemaining = computed(() => {
    usageRevision.value
    return getRemainingTries('recycle')
  })

  return {
    tryOnRemaining,
    recycleRemaining,
    getRemainingTries,
    canUseFeature,
    recordSuccessfulUse,
    guardUsageLimit,
    USAGE_LIMITS,
  }
}
