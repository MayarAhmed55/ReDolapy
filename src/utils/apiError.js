export const API_ERROR_CODES = {
  LOGIN_REQUIRED: 'LOGIN_REQUIRED',
  MISSING_GITHUB_KEY: 'MISSING_GITHUB_KEY',
  MISSING_DASHSCOPE_KEY: 'MISSING_DASHSCOPE_KEY',
  MISSING_DASHSCOPE_ENDPOINT: 'MISSING_DASHSCOPE_ENDPOINT',
  MISSING_KIE_KEY: 'MISSING_KIE_KEY',
  MISSING_HF_TOKEN: 'MISSING_HF_TOKEN',
  KIE_CREDITS_EXHAUSTED: 'KIE_CREDITS_EXHAUSTED',
  NOT_FOUND: 'API_NOT_FOUND',
  INVALID_RESPONSE: 'INVALID_RESPONSE',
}

export function isKieCreditsError(message = '') {
  const text = String(message).toLowerCase()
  return text.includes('credit')
    && (text.includes('insufficient') || text.includes('top up') || text.includes('balance'))
}

export function extractApiMessage(data) {
  if (!data) return ''
  if (typeof data === 'string') return data
  const detail = data.error || ''
  const message = data.message || data.msg || ''
  if (detail && message && detail !== message) {
    return detail
  }
  return message || detail
}

export async function parseJsonResponse(res) {
  const contentType = res.headers.get('content-type') || ''
  if (!contentType.includes('application/json')) {
    const err = new Error(
      res.status === 404 ? API_ERROR_CODES.NOT_FOUND : API_ERROR_CODES.INVALID_RESPONSE,
    )
    err.status = res.status
    throw err
  }

  try {
    return await res.json()
  } catch {
    const err = new Error(API_ERROR_CODES.INVALID_RESPONSE)
    err.status = res.status
    throw err
  }
}

export function assertApiSuccess(res, data, fallbackMessage = 'Request failed') {
  if (!res.ok) {
    const err = new Error(extractApiMessage(data) || fallbackMessage)
    err.status = res.status
    throw err
  }

  if (data && data.success === false) {
    const err = new Error(extractApiMessage(data) || fallbackMessage)
    err.status = res.status
    throw err
  }

  return data
}
