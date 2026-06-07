export const MAX_UPLOAD_FILES = 2
export const MAX_FILE_SIZE = 10 * 1024 * 1024

export const ACCEPTED_EXTENSIONS = [
  '.jpg', '.jpeg', '.png', '.webp', '.bmp', '.tiff', '.tif', '.heic', '.gif',
]

export const ACCEPT_ATTR = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/bmp',
  'image/tiff',
  'image/gif',
  'image/heic',
  'image/heif',
  ...ACCEPTED_EXTENSIONS,
].join(',')

export const SUPPORTED_FORMATS_LABEL =
  'JPG, JPEG, PNG, WEBP, BMP, TIFF, HEIC, GIF'

function getExtension(name = '') {
  const dot = name.lastIndexOf('.')
  return dot >= 0 ? name.slice(dot).toLowerCase() : ''
}

export function isAllowedImage(file) {
  if (!file) return false
  if (ACCEPTED_EXTENSIONS.includes(getExtension(file.name))) return true
  return Boolean(file.type && file.type.startsWith('image/'))
}
