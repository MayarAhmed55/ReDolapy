import { assertApiSuccess, parseJsonResponse } from '../utils/apiError.js'

const API_BASE = import.meta.env.VITE_API_BASE || '/api'

function authHeaders() {
  const token = localStorage.getItem('token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

async function parseApiResponse(res, fallbackMessage) {
  const data = await parseJsonResponse(res)
  assertApiSuccess(res, data, fallbackMessage)
  return data
}

export function fetchFavorites() {
  return fetch(`${API_BASE}/users/favorites`, {
    headers: { ...authHeaders() },
  }).then((res) => parseApiResponse(res, 'Failed to load favorites'))
}

export function addFavorite(itemId) {
  return fetch(`${API_BASE}/users/favorites`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
    },
    body: JSON.stringify({ itemType: 'PRODUCT', itemId }),
  }).then((res) => parseApiResponse(res, 'Failed to add favorite'))
}

export function removeFavorite(favoriteId) {
  return fetch(`${API_BASE}/users/favorites/${favoriteId}`, {
    method: 'DELETE',
    headers: { ...authHeaders() },
  }).then((res) => parseApiResponse(res, 'Failed to remove favorite'))
}
