import { defineStore } from 'pinia'
import {
  addToWardrobeFromAnalysis,
  deleteWardrobeItem,
  fetchWardrobeItems,
} from '../api/wardrobe.js'
import { API_ERROR_CODES } from '../utils/apiError.js'

/**
 * Central wardrobe state — single source of truth for the item list.
 * API layer stays in src/api/wardrobe.js; this store owns cache + UI state.
 */
export const useWardrobeStore = defineStore('wardrobe', {
  state: () => ({
    /** Cached wardrobe documents from GET /api/wardrobe */
    items: [],
    /** True while fetchAll / deleteItem / addFromAnalysis is in flight */
    loading: false,
    /** Last error message (null when clear) */
    error: null,
    /** True after at least one successful fetchAll */
    initialized: false,
  }),

  getters: {
    /**
     * Client-side lookup — used by WardrobeDetails when there is no GET /wardrobe/:id.
     * @param {string} id — Mongo _id or legacy id field
     */
    getItemById: (state) => (id) =>
      state.items.find((item) => item._id === id || item.id === id) ?? null,

    itemCount: (state) => state.items.length,

    isEmpty: (state) => state.initialized && !state.loading && state.items.length === 0,

    /** Category filter helper for the list page */
    getByCategory: (state) => (category) => {
      if (!category || category === 'all') return state.items
      return state.items.filter((item) => item.category === category)
    },
  },

  actions: {
    /**
     * GET /api/wardrobe — loads (or refreshes) the full item list.
     * Skips the network call when already initialized unless force=true.
     */
    async fetchAll({ force = false } = {}) {
      if (this.loading) return this.items
      if (this.initialized && !force) return this.items

      this.loading = true
      this.error = null

      try {
        const data = await fetchWardrobeItems()
        this.items = data.items || []
        this.initialized = true
        return this.items
      } catch (err) {
        this.error = err.message || 'Failed to load wardrobe'
        if (err.message !== API_ERROR_CODES.LOGIN_REQUIRED) {
          this.items = []
        }
        throw err
      } finally {
        this.loading = false
      }
    },

    /**
     * DELETE /api/wardrobe/{id} — removes on server then drops from cache.
     */
    async deleteItem(id) {
      if (!id) throw new Error('Item id is required')

      this.loading = true
      this.error = null

      try {
        await deleteWardrobeItem(id)
        this.items = this.items.filter((item) => item._id !== id && item.id !== id)
      } catch (err) {
        this.error = err.message || 'Failed to delete item'
        throw err
      } finally {
        this.loading = false
      }
    },

    /**
     * POST /api/wardrobe/from-analysis — adds garment(s) and merges into cache.
     * Upload/analyze flow stays unchanged; call this after user confirms details.
     */
    async addFromAnalysis(analysisId, garmentIndex = 0) {
      this.loading = true
      this.error = null

      try {
        const data = await addToWardrobeFromAnalysis(analysisId, garmentIndex)
        const newItems = data.items || []
        this.mergeItems(newItems)
        return newItems
      } catch (err) {
        this.error = err.message || 'Failed to add item'
        throw err
      } finally {
        this.loading = false
      }
    },

    /** Prepend new items, dedupe by _id (newer entries win). */
    mergeItems(newItems) {
      const merged = [...newItems, ...this.items]
      const seen = new Set()
      this.items = merged.filter((item) => {
        if (!item._id || seen.has(item._id)) return false
        seen.add(item._id)
        return true
      })
      this.initialized = true
    },

    clearError() {
      this.error = null
    },
  },
})
