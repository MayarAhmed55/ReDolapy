import { assertApiSuccess, parseJsonResponse } from '../utils/apiError.js'

const API_BASE = import.meta.env.VITE_API_BASE || '/api'

function authHeaders() {
  const token = localStorage.getItem('token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

async function apiGet(path, fallbackMessage) {
  let res
  try {
    res = await fetch(`${API_BASE}${path}`, {
      headers: { ...authHeaders() },
    })
  } catch {
    throw new Error('Network error. Check your connection and try again.')
  }

  const data = await parseJsonResponse(res)
  assertApiSuccess(res, data, fallbackMessage)
  return data
}

export function fetchStores() {
  return apiGet('/stores?is_active=true', 'Failed to load stores')
}

export function fetchProducts() {
  return apiGet('/products?is_active=true', 'Failed to load products')
}

export function fetchProductById(id) {
  return apiGet(`/products/${id}`, 'Failed to load product')
}
