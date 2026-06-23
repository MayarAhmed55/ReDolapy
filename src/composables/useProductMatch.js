import { ref, shallowRef } from 'vue'
import { findMatchesForProduct } from '../api/matching.js'
import { enrichMatchesWithImages } from '../utils/matchHelpers.js'
import { mapApiError } from '../utils/mapApiError.js'
import { API_ERROR_CODES } from '../utils/apiError.js'
import { triggerLoginModal } from '../authState.js'

export function useProductMatch() {
  const matchModalOpen = ref(false)
  const matchLoading = ref(false)
  const matchError = ref('')
  const productMatches = ref([])
  const wardrobeMatchProductIds = shallowRef(new Set())

  function markHasMatch(productId) {
    if (!productId) return
    const next = new Set(wardrobeMatchProductIds.value)
    next.add(String(productId))
    wardrobeMatchProductIds.value = next
  }

  function productHasWardrobeMatch(productId) {
    return wardrobeMatchProductIds.value.has(String(productId))
  }

  async function scanProductsForWardrobeMatches(productIds, { max = 30 } = {}) {
    if (!localStorage.getItem('token')) return

    const pending = productIds
      .slice(0, max)
      .map(String)
      .filter((id) => id && !wardrobeMatchProductIds.value.has(id))

    const concurrency = 3
    for (let i = 0; i < pending.length; i += concurrency) {
      const batch = pending.slice(i, i + concurrency)
      await Promise.all(
        batch.map(async (productId) => {
          try {
            const data = await findMatchesForProduct(productId)
            if (Array.isArray(data?.matches) && data.matches.length) {
              markHasMatch(productId)
            }
          } catch {
            // Ignore background scan failures
          }
        }),
      )
    }
  }

  async function openSeeMatch(product, t, { getWardrobeItemById, ensureWardrobeLoaded } = {}) {
    if (!product?.id || matchLoading.value) return

    matchModalOpen.value = true
    matchLoading.value = true
    matchError.value = ''
    productMatches.value = []

    try {
      if (typeof ensureWardrobeLoaded === 'function') {
        await ensureWardrobeLoaded()
      }

      const data = await findMatchesForProduct(product.id)
      const rawMatches = Array.isArray(data?.matches) ? data.matches : []
      productMatches.value = await enrichMatchesWithImages(rawMatches, { getWardrobeItemById })
      if (productMatches.value.length) {
        markHasMatch(product.id)
      }
    } catch (err) {
      if (err.message === API_ERROR_CODES.LOGIN_REQUIRED) {
        resetProductMatchModal()
        triggerLoginModal()
      } else {
        matchError.value = mapApiError(err, t)
      }
    } finally {
      matchLoading.value = false
    }
  }

  function resetProductMatchModal() {
    matchModalOpen.value = false
    matchLoading.value = false
    matchError.value = ''
    productMatches.value = []
  }

  return {
    matchModalOpen,
    matchLoading,
    matchError,
    productMatches,
    wardrobeMatchProductIds,
    productHasWardrobeMatch,
    scanProductsForWardrobeMatches,
    openSeeMatch,
    resetProductMatchModal,
  }
}
