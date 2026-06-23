import {
  API_ERROR_CODES,
  assertApiSuccess,
  parseJsonResponse,
} from '../utils/apiError.js'

const API_BASE = import.meta.env.VITE_API_BASE || '/api'

export const RECYCLE_API_ERRORS = API_ERROR_CODES

function getUserToken() {
  const token = localStorage.getItem('token')
  if (!token) {
    throw new Error(API_ERROR_CODES.LOGIN_REQUIRED)
  }
  return token
}

function getGithubToken() {
  const token = import.meta.env.VITE_GITHUB_TOKEN || import.meta.env.VITE_API_KEY
  if (!token) {
    throw new Error(API_ERROR_CODES.MISSING_GITHUB_KEY)
  }
  return token
}

function getDashscopeKey() {
  const key = import.meta.env.VITE_DASHSCOPE_API_KEY
  if (!key) {
    throw new Error(API_ERROR_CODES.MISSING_DASHSCOPE_KEY)
  }
  return key
}

function authHeaders() {
  return {
    Authorization: `Bearer ${getUserToken()}`,
  }
}

export async function analyzeGarments(files) {
  const formData = new FormData()
  files.forEach((file) => formData.append('images', file))

  let res
  try {
    res = await fetch(`${API_BASE}/recycle/analyze`, {
      method: 'POST',
      headers: {
        ...authHeaders(),
        'x-github-token': getGithubToken(),
      },
      body: formData,
    })
  } catch {
    throw new Error('Network error. Check your connection and try again.')
  }

  const data = await parseJsonResponse(res)
  assertApiSuccess(res, data, 'Failed to generate ideas')

  return data
}

export async function generateIdeaImage({ sessionId, ideaId, model }) {
  let res
  try {
    res = await fetch(`${API_BASE}/recycle/${sessionId}/generate/${ideaId}`, {
      method: 'POST',
      headers: {
        ...authHeaders(),
        'Content-Type': 'application/json',
        'x-dashscope-api-key': getDashscopeKey(),
      },
      body: JSON.stringify({ model }),
    })
  } catch {
    throw new Error('Network error. Check your connection and try again.')
  }

  const data = await parseJsonResponse(res)
  assertApiSuccess(res, data, 'Image generation failed')

  if (!data.image_url) {
    throw new Error(data.message || data.error || 'Image generation failed')
  }

  return data
}
