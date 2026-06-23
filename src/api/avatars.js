import {
  API_ERROR_CODES,
  assertApiSuccess,
  extractApiMessage,
  isKieCreditsError,
  parseJsonResponse,
} from '../utils/apiError.js'
import { buildAvatarPrompt } from '../utils/avatarHelpers.js'
import {
  canUseDashscopeAvatar,
  generateAvatarWithDashscope,
} from '../utils/dashscopeAvatar.js'

const API_BASE = import.meta.env.VITE_API_BASE || '/api'

function getUserToken() {
  const token = localStorage.getItem('token')
  if (!token) {
    throw new Error(API_ERROR_CODES.LOGIN_REQUIRED)
  }
  return token
}

function authHeaders() {
  return { Authorization: `Bearer ${getUserToken()}` }
}

async function parseApiResponse(res, fallbackMessage) {
  const data = await parseJsonResponse(res)
  if (res.status === 401) {
    const err = new Error(API_ERROR_CODES.LOGIN_REQUIRED)
    err.status = 401
    throw err
  }
  assertApiSuccess(res, data, fallbackMessage)
  return data
}

async function recoverAvatarWithDashscope(payload, failedData) {
  const failedAvatar = failedData?.avatar
  const avatarId = failedAvatar?._id ?? failedAvatar?.id

  if (!avatarId) {
    throw new Error(
      'Avatar image generation failed and no saved record was returned. Please try again.',
    )
  }

  if (!canUseDashscopeAvatar()) {
    throw new Error(API_ERROR_CODES.KIE_CREDITS_EXHAUSTED)
  }

  const imageUrl = await generateAvatarWithDashscope(buildAvatarPrompt(payload))
  return updateAvatarImageUrl(avatarId, imageUrl)
}

export async function createAvatar(payload) {
  let res
  try {
    res = await fetch(`${API_BASE}/avatars`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders(),
      },
      body: JSON.stringify(payload),
    })
  } catch {
    throw new Error('Network error. Check your connection and try again.')
  }

  const data = await parseJsonResponse(res)

  if (res.ok && data?.success !== false) {
    return data
  }

  const message = extractApiMessage(data) || data?.error || ''

  if (isKieCreditsError(message) && canUseDashscopeAvatar()) {
    return recoverAvatarWithDashscope(payload, data)
  }

  if (
    canUseDashscopeAvatar()
    && (message.includes('Task creation failed') || message.includes('Image generation failed'))
  ) {
    return recoverAvatarWithDashscope(payload, data)
  }

  if (isKieCreditsError(message)) {
    throw new Error(API_ERROR_CODES.KIE_CREDITS_EXHAUSTED)
  }

  if (res.status === 401) {
    const err = new Error(API_ERROR_CODES.LOGIN_REQUIRED)
    err.status = 401
    throw err
  }

  assertApiSuccess(res, data, 'Failed to create avatar')
  return data
}

export function fetchAvatars() {
  return fetch(`${API_BASE}/avatars`, {
    headers: authHeaders(),
  }).then((res) => parseApiResponse(res, 'Failed to load avatars'))
}

export function fetchAvatarById(id) {
  return fetch(`${API_BASE}/avatars/${id}`, {
    headers: authHeaders(),
  }).then((res) => parseApiResponse(res, 'Failed to load avatar'))
}

export function updateAvatarImageUrl(id, imageUrl) {
  return fetch(`${API_BASE}/avatars/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
    },
    body: JSON.stringify({ image_url: imageUrl }),
  }).then((res) => parseApiResponse(res, 'Failed to update avatar image'))
}
