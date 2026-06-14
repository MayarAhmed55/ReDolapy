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

function triggerBlobDownload(blob, filename) {
  const objectUrl = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = objectUrl
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(objectUrl)
}

async function fetchAsBlob(imageUrl) {
  const response = await fetch(imageUrl, { mode: 'cors', credentials: 'omit' })
  if (!response.ok) throw new Error('Failed to fetch image')
  return response.blob()
}

async function fetchViaProxy(imageUrl) {
  const proxyUrl = `/image-proxy?url=${encodeURIComponent(imageUrl)}`
  const response = await fetch(proxyUrl)
  if (!response.ok) throw new Error('Failed to fetch image via proxy')
  return response.blob()
}

async function loadImageAsBlob(imageUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas')
        canvas.width = img.naturalWidth
        canvas.height = img.naturalHeight
        canvas.getContext('2d').drawImage(img, 0, 0)
        canvas.toBlob(
          (blob) => (blob ? resolve(blob) : reject(new Error('Failed to create image blob'))),
          'image/png',
        )
      } catch (err) {
        reject(err)
      }
    }
    img.onerror = () => reject(new Error('Failed to load image'))
    img.src = imageUrl
  })
}

async function resolveImageBlob(imageUrl) {
  const attempts = [
    () => fetchAsBlob(imageUrl),
    () => fetchViaProxy(imageUrl),
    () => loadImageAsBlob(imageUrl),
  ]

  let lastError
  for (const attempt of attempts) {
    try {
      return await attempt()
    } catch (err) {
      lastError = err
    }
  }

  throw lastError || new Error('Failed to download image')
}

export async function downloadImage(imageUrl, title = 'design') {
  if (!imageUrl) throw new Error('No image to download')

  const blob = await resolveImageBlob(imageUrl)
  const ext = extensionFromMime(blob.type)
  triggerBlobDownload(blob, `${slugify(title)}.${ext}`)
}
