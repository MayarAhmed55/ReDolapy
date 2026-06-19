import { ref } from 'vue'
import { stabilizeAvatarUrl } from '../utils/kieFileUpload.js'
const stableUrlCache = new Map()
export function useStableAvatarUrl() {
  const loading = ref(false)
  const error = ref('')
  async function stabilize(originalUrl, options = {}) {
    error.value = ''
    if (!originalUrl) {
      const err = new Error('Avatar URL is missing')
      error.value = err.message
      throw err
    }
    const cacheKey = originalUrl
    if (stableUrlCache.has(cacheKey)) {
      return stableUrlCache.get(cacheKey)
    }
    loading.value = true
    try {
      const stableUrl = await stabilizeAvatarUrl(originalUrl, options)
      stableUrlCache.set(cacheKey, stableUrl)
      return stableUrl
    } catch (err) {
      error.value = err.message || 'Failed to prepare avatar image'
      throw err
    } finally {
        loading.value = false
    }
  }
  function clearCache() {
    stableUrlCache.clear()
  }
  return {
    loading,
    error,
    stabilize,
    clearCache,
  }
}