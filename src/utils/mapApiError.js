import { API_ERROR_CODES } from './apiError.js'

export function mapApiError(err, t) {
  switch (err.message) {
    case API_ERROR_CODES.LOGIN_REQUIRED:
      return t('recycle.errors.login_required')
    case API_ERROR_CODES.MISSING_GITHUB_KEY:
      return t('recycle.errors.missing_github_key')
    case API_ERROR_CODES.MISSING_DASHSCOPE_KEY:
      return t('recycle.errors.missing_dashscope_key')
    case API_ERROR_CODES.NOT_FOUND:
      return t('errors.api_not_found')
    case API_ERROR_CODES.INVALID_RESPONSE:
      return t('errors.invalid_response', { status: err.status || '' })
    default:
      return err.message || t('errors.generic')
  }
}
