const TOP_CATEGORIES = new Set(['top', 'outerwear', 'shirt', 'blouse', 'jacket', 'coat'])
const BOTTOM_CATEGORIES = new Set(['bottom', 'pants', 'skirt', 'shorts', 'jeans', 'trousers'])

async function fetchImageBlob(url) {
  try {
    const response = await fetch(url, { mode: 'cors', credentials: 'omit' })
    if (response.ok) return response.blob()
  } catch {
    // fall through to dev proxy
  }

  const proxyUrl = `/image-proxy?url=${encodeURIComponent(url)}`
  const proxyResponse = await fetch(proxyUrl)
  if (!proxyResponse.ok) {
    throw new Error('Failed to load image')
  }
  return proxyResponse.blob()
}

export async function resolveImageFile(source, fallbackName = 'image.jpg') {
  if (source?.file instanceof File) {
    return source.file
  }

  const url = source?.url
  if (!url) {
    throw new Error('Image source is missing')
  }

  const blob = await fetchImageBlob(url)
  const extension = blob.type?.split('/')[1] || 'jpg'
  const name = fallbackName.includes('.') ? fallbackName : `${fallbackName}.${extension}`

  return new File([blob], name, { type: blob.type || 'image/jpeg' })
}

/** Resolve avatar or personal photo to a personImage File for the try-on API. */
export async function resolvePersonForTryOn(model) {
  if (!model) {
    throw new Error('Image source is missing')
  }

  if (model.file instanceof File) {
    return { personImage: model.file }
  }

  const url = model.url
  if (!url) {
    throw new Error(model.type === 'avatar' ? 'Avatar URL is missing' : 'Please upload a personal photo or select an avatar')
  }

  const personImage = await resolveImageFile({ url }, 'person.jpg')
  return { personImage }
}

export function pickTopAndBottomGarments(garments) {
  if (!garments?.length || garments.length < 2) {
    throw new Error('NEED_TWO_GARMENTS')
  }

  const top = garments.find((g) => TOP_CATEGORIES.has(String(g.category || '').toLowerCase()))
  const bottom = garments.find((g) => BOTTOM_CATEGORIES.has(String(g.category || '').toLowerCase()))

  if (top && bottom && top !== bottom) {
    return { top, bottom }
  }

  return { top: garments[0], bottom: garments[1] }
}
