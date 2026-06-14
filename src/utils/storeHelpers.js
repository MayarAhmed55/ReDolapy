const COLOR_HEX = {
  black: '#121826',
  white: '#FFFFFF',
  navy: '#1E3A5F',
  darkblue: '#1B3A57',
  blue: '#2563EB',
  beige: '#F5F0E6',
  cream: '#F5F0E6',
  pink: '#F4A6B8',
  red: '#C62828',
  green: '#16A34A',
  grey: '#9CA3AF',
  gray: '#9CA3AF',
  brown: '#8B4513',
  yellow: '#FBBF24',
  orange: '#FB923C',
  purple: '#9333EA',
}

function normalizeTag(value) {
  return String(value || '').trim().toLowerCase()
}

function titleCase(value) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export function colorToHex(colorName) {
  const key = normalizeTag(colorName).replace(/\s+/g, '')
  return COLOR_HEX[key] || '#A0A6B2'
}

export function normalizeProduct(raw) {
  const store = raw.store_id || {}

  return {
    id: raw._id,
    name: raw.name,
    description: raw.description || '',
    image: raw.images?.[0] || '',
    images: raw.images || [],
    category: normalizeTag(raw.category),
    colors: (raw.color_tags || []).map(normalizeTag).filter(Boolean),
    seasons: (raw.season_tags || []).map(normalizeTag).filter(Boolean),
    price: Number(raw.price) || 0,
    currency: raw.currency || 'USD',
    purchaseUrl: raw.purchase_url || '',
    tryOnEnabled: Boolean(raw.try_on_enabled),
    storeId: store._id || raw.store_id || '',
    storeName: store.name || '',
    storeLogo: store.logo_url || '',
  }
}

export function buildFilterOptions(stores, products) {
  const brandMap = new Map()
  stores.forEach((store) => {
    if (store.is_active !== false) {
      brandMap.set(store._id, store.name)
    }
  })

  const colorSet = new Set()
  const seasonSet = new Set()
  const categorySet = new Set()
  const prices = []

  products.forEach((product) => {
    product.colors.forEach((color) => colorSet.add(color))
    product.seasons.forEach((season) => seasonSet.add(season))
    if (product.category) categorySet.add(product.category)
    prices.push(product.price)
  })

  const minPrice = prices.length ? Math.floor(Math.min(...prices)) : 0
  const maxPrice = prices.length ? Math.ceil(Math.max(...prices)) : 0
  const currency = products.find((product) => product.currency)?.currency || 'USD'

  return {
    brands: [...brandMap.entries()]
      .map(([id, label]) => ({ id, label }))
      .sort((a, b) => a.label.localeCompare(b.label)),
    colors: [...colorSet]
      .sort()
      .map((id) => ({ id, label: titleCase(id), hex: colorToHex(id) })),
    seasons: [...seasonSet]
      .sort()
      .map((id) => ({ id, label: titleCase(id) })),
    categories: [...categorySet]
      .sort()
      .map((id) => ({ id, label: titleCase(id) })),
    minPrice,
    maxPrice,
    currency,
  }
}

export function createDefaultFilters(filterOptions) {
  return {
    brands: [],
    colors: [],
    seasons: [],
    categories: [],
    minPrice: filterOptions.minPrice,
    maxPrice: filterOptions.maxPrice,
  }
}

export function filterProducts(products, filters, searchQuery = '', priceBounds = null) {
  const query = searchQuery.trim().toLowerCase()
  const bounds = priceBounds || {
    min: filters.minPrice,
    max: filters.maxPrice,
  }

  return products.filter((product) => {
    if (query && !product.name.toLowerCase().includes(query)) return false
    if (filters.brands.length && !filters.brands.includes(product.storeId)) return false
    if (filters.colors.length && !product.colors.some((color) => filters.colors.includes(color))) return false
    if (filters.seasons.length && !product.seasons.some((season) => filters.seasons.includes(season))) return false
    if (filters.categories.length && !filters.categories.includes(product.category)) return false

    if (filters.minPrice > bounds.min && product.price < filters.minPrice) return false
    if (filters.maxPrice < bounds.max && product.price > filters.maxPrice) return false

    return true
  })
}

export function formatStorePrice(price) {
  return Number.isInteger(price) ? String(price) : price.toFixed(2)
}

export function productToTryOnGarment(product, categoryLabel) {
  return {
    id: `store-${product.id}`,
    source: 'store',
    productId: product.id,
    category: product.category,
    url: product.image,
    title: product.name,
    subtitle: categoryLabel,
  }
}
