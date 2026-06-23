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
 * GET /api/recommendations — past recommendation history.
 */
export function getRecommendationHistory({ limit = 3, skip = 0 } = {}) {
  const params = new URLSearchParams({
    limit: String(limit),
    skip: String(skip),
  })

  return request(
    `${API_BASE}/recommendations?${params}`,
    {
      method: 'GET',
      headers: authHeaders(),
    },
    'Failed to load recommendations',
  )
}

/**
 * POST /api/recommendations — generate new outfit recommendations.
 * Long-running; callers should not block UI on this promise.
 */
export function generateRecommendations({ limit = 10, lat, lon } = {}) {
  const body = { limit }
  if (lat != null && lon != null) {
    body.lat = lat
    body.lon = lon
  }

  return request(
    `${API_BASE}/recommendations`,
    {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(body),
    },
    'Failed to generate recommendations',
  )
}

/**
 * DELETE /api/recommendations — clear all saved recommendations for the user.
 */
export function deleteAllRecommendations() {
  return request(
    `${API_BASE}/recommendations`,
    {
      method: 'DELETE',
      headers: authHeaders(),
    },
    'Failed to reset recommendations',
  )
}
