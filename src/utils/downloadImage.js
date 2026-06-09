function slugify(text = '') {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    || 'redolapy-design'
}

function extensionFromMime(mime = '') {
  const map = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
    'image/gif': 'gif',
    'image/bmp': 'bmp',
    'image/tiff': 'tiff',
    'image/heic': 'heic',
    'image/heif': 'heif',
  }
  return map[mime] || 'png'
}

export async function downloadImage(imageUrl, title = 'design') {
  if (!imageUrl) throw new Error('No image to download')

  const response = await fetch(imageUrl)
  if (!response.ok) throw new Error('Failed to fetch image')

  const blob = await response.blob()
  const ext = extensionFromMime(blob.type)
  const filename = `${slugify(title)}.${ext}`

  const objectUrl = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = objectUrl
  link.download = filename
  link.click()
  URL.revokeObjectURL(objectUrl)
}
