const TOP_CATEGORIES = new Set(['top', 'outerwear', 'shirt', 'blouse', 'jacket', 'coat'])
const BOTTOM_CATEGORIES = new Set(['bottom', 'pants', 'skirt', 'shorts', 'jeans', 'trousers'])

export async function resolveImageFile(source, fallbackName = 'image.jpg') {
  if (source?.file instanceof File) {
    return source.file
  }

  const url = source?.url
  if (!url) {
    throw new Error('Image source is missing')
  }

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Failed to load image')
  }

  const blob = await response.blob()
  const extension = blob.type?.split('/')[1] || 'jpg'
  const name = fallbackName.includes('.') ? fallbackName : `${fallbackName}.${extension}`

  return new File([blob], name, { type: blob.type || 'image/jpeg' })
}

/** Avatar URL is sent to the backend as personImageUrl — no browser fetch, no KIE re-upload. */
export function resolvePersonForTryOn(model) {
  if (!model) {
    throw new Error('Image source is missing')
  }

  if (model.type === 'avatar') {
    const url = model.url
    if (!url) {
      throw new Error('Avatar URL is missing')
    }
    return { personImageUrl: url }
  }

  if (model.file instanceof File) {
    return { personImage: model.file }
  }

  throw new Error('Please upload a personal photo or select an avatar')
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
