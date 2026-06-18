import { fetchProductById, fetchProducts } from '../api/store.js'
import { normalizeProduct } from './storeHelpers.js'

const productImageCache = new Map()
let storeProductsById = null
let storeProductsByPurchaseUrl = null
let storeProductsLoadPromise = null

function unwrapProductsList(data) {
  if (Array.isArray(data)) return data
  if (Array.isArray(data?.products)) return data.products
  if (Array.isArray(data?.items)) return data.items
  return []
}

function unwrapProduct(data) {
  if (data?.product) return data.product
  if (data?.data && !Array.isArray(data.data)) return data.data
  return data
}

/**
 * Load and cache store products for match image + purchase_url lookup.
 */
export async function loadStoreProductsCache() {
  if (storeProductsById) return
  if (storeProductsLoadPromise) {
    await storeProductsLoadPromise
    return
  }

  storeProductsLoadPromise = (async () => {
    try {
      const rawProducts = await fetchProducts()
      const products = unwrapProductsList(rawProducts)
        .filter((product) => product.is_active !== false)
        .map(normalizeProduct)

      storeProductsById = new Map(products.map((product) => [String(product.id), product]))
      storeProductsByPurchaseUrl = new Map(
        products
          .filter((product) => product.purchaseUrl)
          .map((product) => [product.purchaseUrl, product]),
      )
    } catch {
      storeProductsById = new Map()
      storeProductsByPurchaseUrl = new Map()
    } finally {
      storeProductsLoadPromise = null
    }
  })()

  await storeProductsLoadPromise
}

export function resetStoreProductsCache() {
  storeProductsById = null
  storeProductsByPurchaseUrl = null
  productImageCache.clear()
}

/**
 * Split API matches into wardrobe and store buckets.
 */
export function groupMatchesBySource(matches = []) {
  const wardrobe = []
  const store = []

  matches.forEach((entry) => {
    const source = entry?.item?.source
    if (source === 'wardrobe') wardrobe.push(entry)
    else if (source === 'store') store.push(entry)
  })

  return { wardrobe, store }
}

/**
 * Resolve wardrobe match image: use API image when present, else cached wardrobe item.
 */
export function resolveWardrobeMatchImage(item, getWardrobeItemById) {
  if (!item || item.source !== 'wardrobe') return ''
  if (item.image) return item.image
  if (!getWardrobeItemById) return ''

  const cached = getWardrobeItemById(item.id)
  return cached?.image || ''
}

/**
 * Resolve store match fields from the products cache (by id or purchase_url).
 */
export function resolveStoreMatchFromCache(item) {
  if (!item || item.source !== 'store') {
    return { image: '', purchaseUrl: item?.purchase_url || '' }
  }

  const productId = extractStoreProductId(item.id)
  const cachedById = productId ? storeProductsById?.get(productId) : null
  const cachedByUrl = item.purchase_url
    ? storeProductsByPurchaseUrl?.get(item.purchase_url)
    : null
  const cached = cachedById || cachedByUrl

  return {
    image: item.image || cached?.image || '',
    purchaseUrl: item.purchase_url || cached?.purchaseUrl || '',
  }
}

/**
 * Fetch a single store product image when not found in cache.
 */
export async function resolveStoreMatchImageRemote(item) {
  if (!item || item.source !== 'store') return ''
  if (item.image) return item.image

  const productId = extractStoreProductId(item.id)
  if (!productId) return ''

  if (productImageCache.has(productId)) {
    return productImageCache.get(productId)
  }

  try {
    const raw = await fetchProductById(productId)
    const product = normalizeProduct(unwrapProduct(raw))
    const image = product.image || ''
    productImageCache.set(productId, image)
    return image
  } catch {
    productImageCache.set(productId, '')
    return ''
  }
}

/**
 * Resolve a display image for a match item.
 */
export async function resolveMatchItemImage(item, { getWardrobeItemById } = {}) {
  if (!item) return ''
  if (item.image) return item.image

  if (item.source === 'wardrobe') {
    return resolveWardrobeMatchImage(item, getWardrobeItemById)
  }

  if (item.source === 'store') {
    await loadStoreProductsCache()
    const cached = resolveStoreMatchFromCache(item)
    if (cached.image) return cached.image
    return resolveStoreMatchImageRemote(item)
  }

  return ''
}

export function extractStoreProductId(id = '') {
  const value = String(id)
  return value.startsWith('store_') ? value.slice(6) : value
}

/**
 * Batch-resolve images and purchase URLs for match results.
 * Returns a new array so Vue picks up nested field updates reliably.
 */
export async function enrichMatchesWithImages(matches = [], { getWardrobeItemById } = {}) {
  await loadStoreProductsCache()

  const enriched = matches.map((match) => ({
    ...match,
    item: { ...match.item },
  }))

  const uniqueItems = new Map()
  enriched.forEach((match) => {
    const id = match?.item?.id
    if (id && !uniqueItems.has(id)) uniqueItems.set(id, match.item)
  })

  for (const item of uniqueItems.values()) {
    if (item.source === 'wardrobe' && !item.image) {
      item.image = resolveWardrobeMatchImage(item, getWardrobeItemById)
    }
  }

  for (const item of uniqueItems.values()) {
    if (item.source !== 'store') continue

    const cached = resolveStoreMatchFromCache(item)
    if (cached.image) item.image = cached.image
    if (cached.purchaseUrl) item.purchase_url = cached.purchaseUrl
  }

  const storeItemsNeedingFetch = [...uniqueItems.values()].filter(
    (item) => item.source === 'store' && !item.image,
  )

  await Promise.all(
    storeItemsNeedingFetch.map(async (item) => {
      item.image = await resolveStoreMatchImageRemote(item)
    }),
  )

  return enriched
}

export function getWardrobeItemId(item) {
  return item?._id || item?.id || ''
}
