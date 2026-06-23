import {
  API_ERROR_CODES,
  assertApiSuccess,
  extractApiMessage,
  parseJsonResponse,
} from '../utils/apiError.js'

const API_BASE = import.meta.env.VITE_API_BASE || '/api'
const TRYON_TIMEOUT_MS = 5 * 60 * 1000

function getUserToken() {
  const token = localStorage.getItem('token')
  if (!token) {
    throw new Error(API_ERROR_CODES.LOGIN_REQUIRED)
  }
  return token
}

function getKieApiKey() {
  const key =
    import.meta.env.VITE_KIE_API_KEY ||
    import.meta.env.VITE_KIE_API_key ||
    import.meta.env.KIE_API_key
  if (!key) {
    throw new Error(API_ERROR_CODES.MISSING_KIE_KEY)
  }
  return key
}

function getHfToken() {
  const token = import.meta.env.VITE_HF_TOKEN || import.meta.env.HF_TOKEN
  if (!token) {
    throw new Error(API_ERROR_CODES.MISSING_HF_TOKEN)
  }
  return token
}

function authHeaders() {
  return {
    Authorization: `Bearer ${getUserToken()}`,
    'x-kie-api-key': getKieApiKey(),
    'x-hf-token': getHfToken(),
  }
}

export async function generateOutfitTryOn({ personImage, personImageUrl, topImage, bottomImage, prompt }) {
  const formData = new FormData()
  if (personImage instanceof File) {
    formData.append('personImage', personImage)
  }
  if (personImageUrl) {
    formData.append('personImageUrl', personImageUrl)
  }
  formData.append('topImage', topImage)
  formData.append('bottomImage', bottomImage)
  if (prompt) {
    formData.append('prompt', prompt)
  }

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), TRYON_TIMEOUT_MS)

  let res
  try {
    res = await fetch(`${API_BASE}/virtual-tryon/outfit`, {
      method: 'POST',
      headers: authHeaders(),
      body: formData,
      signal: controller.signal,
    })
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new Error('Virtual try-on timed out. The AI is taking longer than expected — please try again.')
    }
    throw new Error('Network error. Check your connection and try again.')
  } finally {
    clearTimeout(timeoutId)
  }

  const data = await parseJsonResponse(res)
  assertApiSuccess(res, data, 'Virtual try-on failed')

  if (!data.imageUrl) {
    throw new Error(extractApiMessage(data) || 'Virtual try-on failed')
  }

  return data
}
