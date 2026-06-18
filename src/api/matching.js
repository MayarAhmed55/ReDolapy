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
    'Content-Type': 'application/json',
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

/**
 * POST /api/matches — find matches for a saved wardrobe item.
 */
export function findMatchesForWardrobeItem(wardrobeItemId, { lat, lon } = {}) {
  const body = { wardrobe_item_id: wardrobeItemId }
  if (lat != null && lon != null) {
    body.lat = lat
    body.lon = lon
  }

  return request(
    `${API_BASE}/matches`,
    {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(body),
    },
    'Failed to find matches',
  )
}

/**
 * POST /api/matches/product/{productId} — find wardrobe matches for a store product.
 * Product id is passed in the URL path only (no request body).
 */
export function findMatchesForProduct(productId) {
  const id = encodeURIComponent(String(productId || '').trim())
  if (!id) {
    return Promise.reject(new Error('Product id is required'))
  }

  return request(
    `${API_BASE}/matches/product/${id}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getUserToken()}`,
        accept: '*/*',
      },
    },
    'Failed to find product matches',
  )
}

/**
 * POST /api/matches/analysis/{analysisId} — find matches for an analyzed image.
 */
export function findMatchesForAnalysis(analysisId, { lat, lon } = {}) {
  const body = {}
  if (lat != null && lon != null) {
    body.lat = lat
    body.lon = lon
  }

  return request(
    `${API_BASE}/matches/analysis/${analysisId}`,
    {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(body),
    },
    'Failed to find matches',
  )
}
