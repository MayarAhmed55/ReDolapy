
import { API_ERROR_CODES, isKieCreditsError } from './apiError.js'

function isKieUploadQuotaError(message = '') {
  const text = String(message).toLowerCase()
  return text.includes('30 files within 30 days')
    || text.includes('free users can upload')
}

export function mapApiError(err, t) {
  const message = err?.message || ''

  if (isKieUploadQuotaError(message)) {
    return t('tryOn.errors.kie_upload_quota')
  }

  if (isKieCreditsError(message) || message === API_ERROR_CODES.KIE_CREDITS_EXHAUSTED) {
    return t('avatar.errors.kie_credits')
  }

  switch (message) {
    case API_ERROR_CODES.LOGIN_REQUIRED:
      return t('recycle.errors.login_required')
    case API_ERROR_CODES.MISSING_GITHUB_KEY:
      return t('recycle.errors.missing_github_key')
    case API_ERROR_CODES.MISSING_DASHSCOPE_KEY:
      return t('recycle.errors.missing_dashscope_key')
    case API_ERROR_CODES.MISSING_DASHSCOPE_ENDPOINT:
      return t('avatar.errors.missing_dashscope_endpoint')
    case API_ERROR_CODES.MISSING_KIE_KEY:
      return t('tryOn.errors.missing_kie_key')
    case API_ERROR_CODES.MISSING_HF_TOKEN:
      return t('tryOn.errors.missing_hf_token')
    case API_ERROR_CODES.NOT_FOUND:
      return t('errors.api_not_found')
    case API_ERROR_CODES.INVALID_RESPONSE:
      return t('errors.invalid_response', { status: err.status || '' })
    default:
      return message || t('errors.generic')
  }
}
