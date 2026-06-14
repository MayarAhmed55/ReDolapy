import { computed, ref } from 'vue'
import { addFavorite, fetchFavorites, removeFavorite } from '../api/favorites.js'

const favorites = ref([])
const loaded = ref(false)
const loading = ref(false)

function normalizeId(id) {
  if (!id) return ''
  if (typeof id === 'object' && id._id) return String(id._id)
  return String(id)
}

export function useFavorites() {
  const favoriteByProductId = computed(() => {
    const map = {}
    favorites.value.forEach((entry) => {
      if (entry.itemType === 'PRODUCT' && entry.itemId) {
        map[normalizeId(entry.itemId)] = entry._id
      }
    })
    return map
  })

  const favoriteProductIds = computed(() =>
    favorites.value
      .filter((entry) => entry.itemType === 'PRODUCT')
      .map((entry) => normalizeId(entry.itemId)),
  )

  async function loadFavorites(force = false) {
    if (!localStorage.getItem('token')) {
      favorites.value = []
      loaded.value = true
      return
    }

    if (loaded.value && !force) return

    loading.value = true
    try {
      const data = await fetchFavorites()
      favorites.value = Array.isArray(data.favorites) ? data.favorites : []
      loaded.value = true
    } finally {
      loading.value = false
    }
  }

  async function toggleFavorite(productId) {
    if (!localStorage.getItem('token')) {
      const err = new Error('LOGIN_REQUIRED')
      err.code = 'LOGIN_REQUIRED'
      throw err
    }

    const normalizedProductId = normalizeId(productId)
    const existingId = favoriteByProductId.value[normalizedProductId]
    const previousFavorites = [...favorites.value]

    if (existingId) {
      favorites.value = favorites.value.filter((entry) => entry._id !== existingId)

      try {
        await removeFavorite(existingId)
        return false
      } catch (err) {
        favorites.value = previousFavorites
        throw err
      }
    }

    favorites.value = [
      ...favorites.value,
      {
        _id: `pending-${normalizedProductId}`,
        itemType: 'PRODUCT',
        itemId: normalizedProductId,
      },
    ]

    try {
      const data = await addFavorite(normalizedProductId)
      favorites.value = Array.isArray(data.favorites) ? data.favorites : favorites.value
      return true
    } catch (err) {
      favorites.value = previousFavorites
      throw err
    }
  }

  function isFavorited(productId) {
    return Boolean(favoriteByProductId.value[normalizeId(productId)])
  }

  return {
    favorites,
    favoriteByProductId,
    favoriteProductIds,
    loading,
    loaded,
    loadFavorites,
    toggleFavorite,
    isFavorited,
    normalizeFavoriteId: normalizeId,
  }
}
