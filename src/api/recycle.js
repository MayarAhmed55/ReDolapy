const API_BASE = import.meta.env.VITE_API_BASE || ''

async function parseJsonResponse(res) {
  const contentType = res.headers.get('content-type') || ''
  if (!contentType.includes('application/json')) {
    throw new Error(
      res.status === 404
        ? 'Server endpoint not found. Start the API with: npm run server'
        : `Unexpected server response (${res.status}). Start the API and try again.`,
    )
  }
  return res.json()
}

export async function fetchModels() {
  const res = await fetch(`${API_BASE}/models`)
  const data = await parseJsonResponse(res)
  if (!res.ok) throw new Error(data.error || data.message || 'Failed to load models')
  return data
}

export async function analyzeGarments(files) {
  const formData = new FormData()
  files.forEach((file) => formData.append('images', file))

  const res = await fetch(`${API_BASE}/upcycle`, {
    method: 'POST',
    body: formData,
  })

  const data = await parseJsonResponse(res)
  if (!res.ok) throw new Error(data.error || data.message || `Request failed (${res.status})`)
  if (!data.success) throw new Error(data.error || 'Failed to generate ideas')
  return data
}

export async function generateDesign({ prompt, images, model, size }) {
  const res = await fetch(`${API_BASE}/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, images, model, size }),
  })

  const data = await parseJsonResponse(res)
  if (!res.ok) throw new Error(data.error || data.message || 'Image generation failed')
  if (!data.success || !data.images?.[0]) {
    throw new Error(data.error || data.message || 'Image generation failed')
  }
  return data
}
