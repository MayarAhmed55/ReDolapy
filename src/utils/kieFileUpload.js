import { API_ERROR_CODES } from './apiError.js'
const KIE_URL_UPLOAD_ENDPOINT = 'https://kieai.redpandaai.co/api/file-url-upload'
const STABLE_HOST = 'kieai.redpandaai.co'
const UNSTABLE_HOST_PATTERNS = [
  'tempfile.aiquickdraw.com',
  'tempfile.redpandaai.co',
  'aiquickdraw.com',
]
export function getKieApiKey() {
  const key =
    import.meta.env.VITE_KIE_API_KEY ||
    import.meta.env.VITE_KIE_API_key ||
    import.meta.env.KIE_API_key
  if (!key) {
    throw new Error(API_ERROR_CODES.MISSING_KIE_KEY)
  }
  return key
}
export function isStableKieDownloadUrl(url) {
    if (!url || typeof url !== 'string') return false
    try {
      const parsed = new URL(url)
      return parsed.hostname.toLowerCase() === STABLE_HOST
        && parsed.pathname.includes('/download')
    } catch {
      return false
    }
  }
  export function needsKieUrlUpload(url) {
    if (!url || typeof url !== 'string') return false
    if (isStableKieDownloadUrl(url)) return false
    try {
      const host = new URL(url).hostname.toLowerCase()
      if (host.includes('tempfile')) return true
      return UNSTABLE_HOST_PATTERNS.some((pattern) => host.includes(pattern))
    } catch {
      return false
    }
  }
  export function buildAvatarFileName(prefix = 'avatar') {
    return `${prefix}-${Date.now()}.jpg`
  }
  export async function uploadUrlToKie(fileUrl, options = {}) {
    if (!fileUrl) {
      throw new Error('Image URL is required')
    }
    const apiKey = options.apiKey || getKieApiKey()
    const uploadPath = options.uploadPath || 'user-avatars'
    const fileName = options.fileName || buildAvatarFileName(options.prefix)
    let response
    try {
      response = await fetch(KIE_URL_UPLOAD_ENDPOINT, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fileUrl, uploadPath, fileName }),
      })
    } catch {
      throw new Error('Network error while preparing avatar image. Check your connection.')
    }
    let data
    try {
      data = await response.json()
    } catch {
      const errText = await response.text().catch(() => '')
      throw new Error(`KIE upload failed (${response.status}): ${errText || response.statusText}`)
    }
    if (!response.ok || data.code !== 200 || !data.data?.downloadUrl) {
      const detail = data.msg || data.message || 'Unknown error'
      if (response.status === 401) {
        throw new Error('KIE API key is invalid or unauthorized')
      }
      throw new Error(`KIE upload failed: ${detail}`)
    }
    return {
      downloadUrl: data.data.downloadUrl,
      fileName: data.data.fileName,
      filePath: data.data.filePath,
      mimeType: data.data.mimeType,
      fileSize: data.data.fileSize,
      uploadedAt: data.data.uploadedAt,
    }
  }
  /** Convert unstable Kie temp URLs to redpandaai download URLs (frontend-only, no browser fetch). */
export async function stabilizeAvatarUrl(originalUrl, options = {}) {
    if (!originalUrl) {
      throw new Error('Avatar URL is missing')
    }
    if (!needsKieUrlUpload(originalUrl)) {
      return originalUrl
    }
    const result = await uploadUrlToKie(originalUrl, {
      uploadPath: 'user-avatars',
      fileName: buildAvatarFileName(options.prefix || 'avatar'),
      ...options,
    })
    return result.downloadUrl
  }
  