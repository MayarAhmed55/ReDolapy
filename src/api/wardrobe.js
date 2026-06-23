 import {
  API_ERROR_CODES,
  assertApiSuccess,
  parseJsonResponse,
} from '../utils/apiError.js'

const API_BASE = import.meta.env.VITE_API_BASE || '/api'

function getUserToken() {
  const token = localStorage.getItem('token')
  if (!token) {
    throw new Error(API_ERROR_CODES.LOGIN_REQUIRED)
  }
  return token
}

function authHeaders(extra = {}) {
  return {
    Authorization: `Bearer ${getUserToken()}`,
    ...extra,
  }
}

async function request(url, options = {}, fallbackMessage = 'Request failed') {
  let res
  try {
    res = await fetch(url, options)
  } catch {
    throw new Error('Network error. Check your connection and try again.')
  }

  const data = await parseJsonResponse(res)
  assertApiSuccess(res, data, fallbackMessage)
  return data
}

export async function analyzeGarmentImage(file, { force = false } = {}) {
  const formData = new FormData()
  formData.append('image', file)

  const query = force ? '?force=true' : ''
  return request(
    `${API_BASE}/analyze${query}`,
    {
      method: 'POST',
      headers: authHeaders(),
      body: formData,
    },
    'Failed to analyze garment',
  )
}

export async function getAnalysisById(analysisId) {
  return request(
    `${API_BASE}/analyze/${analysisId}`,
    { headers: authHeaders() },
    'Failed to load analysis',
  )
}

export async function updateAnalysis(analysisId, garments) {
  return request(
    `${API_BASE}/analyze/${analysisId}`,
    {
      method: 'PUT',
      headers: {
        ...authHeaders(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ garments }),
    },
    'Failed to update analysis',
  )
}

export async function addToWardrobeFromAnalysis(analysisId, garmentIndex = 0) {
  return request(
    `${API_BASE}/wardrobe/from-analysis`,
    {
      method: 'POST',
      headers: {
        ...authHeaders(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        analysis_id: analysisId,
        garment_index: garmentIndex,
      }),
    },
    'Failed to add item to wardrobe',
  )
}

export async function fetchWardrobeItems() {
  return request(
    `${API_BASE}/wardrobe`,
    { headers: authHeaders() },
    'Failed to load wardrobe',
  )
}

export async function fetchWardrobeItemById(itemId) {
  return request(
    `${API_BASE}/wardrobe/${itemId}`,
    { headers: authHeaders() },
    'Failed to load item',
  )
}

export async function updateWardrobeItem(itemId, payload) {
  return request(
    `${API_BASE}/wardrobe/${itemId}`,
    {
      method: 'PUT',
      headers: {
        ...authHeaders(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    },
    'Failed to update item',
  )
}

export async function deleteWardrobeItem(itemId) {
  return request(
    `${API_BASE}/wardrobe/${itemId}`,
    {
      method: 'DELETE',
      headers: authHeaders(),
    },
    'Failed to delete item',
  )
}

export const WARDROBE_CATEGORIES = [
  'all',
  'top',
  'bottom',
  'outerwear',
  'dress',
  'jeans',
  'jacket',
  'shoes',
  'accessory',
]

export const FILTER_CATEGORIES = [
  'top',
  'skirt',
  'bottom',
  'jeans',
  'short',
  'jacket',
  'dress',
  'abayas',
  'shoes',
  'bag',
  'accessory',
  'outerwear',
  'footwear',
]

export const GENDERS = ['male', 'female', 'unisex']
export const SEASONS = ['spring', 'summer', 'winter', 'autumn', 'all_season']
export const STYLES = ['casual', 'formal', 'streetwear', 'vintage', 'minimalist', 'sporty', 'business', 'elegant']
export const PATTERNS = ['solid', 'striped', 'floral', 'checked', 'graphic', 'printed', 'plaid']
