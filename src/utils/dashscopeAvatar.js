import { API_ERROR_CODES } from './apiError.js'

const DEFAULT_MODEL = import.meta.env.VITE_DASHSCOPE_AVATAR_MODEL || 'qwen-image-2.0-pro'
const DEFAULT_SIZE = import.meta.env.VITE_DASHSCOPE_AVATAR_SIZE || '1024*1280'

function getDashscopeKey() {
  const key = import.meta.env.VITE_DASHSCOPE_API_KEY
  if (!key) {
    throw new Error(API_ERROR_CODES.MISSING_DASHSCOPE_KEY)
  }
  return key
}

function getDashscopeEndpoint() {
  const endpoint = import.meta.env.VITE_DASHSCOPE_ENDPOINT
  if (!endpoint) {
    throw new Error(API_ERROR_CODES.MISSING_DASHSCOPE_ENDPOINT)
  }
  return endpoint
}

export function canUseDashscopeAvatar() {
  return Boolean(
    import.meta.env.VITE_DASHSCOPE_API_KEY && import.meta.env.VITE_DASHSCOPE_ENDPOINT,
  )
}

function buildPayload(prompt) {
  return {
    model: DEFAULT_MODEL,
    input: {
      messages: [{
        role: 'user',
        content: [{ text: prompt }],
      }],
    },
    parameters: {
      n: 1,
      negative_prompt: 'blurry, low quality, cropped body, cut off feet, cut off head, multiple people',
      prompt_extend: true,
      watermark: false,
      size: DEFAULT_SIZE,
    },
  }
}

export async function generateAvatarWithDashscope(prompt) {
  let res
  try {
    res = await fetch(getDashscopeEndpoint(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getDashscopeKey()}`,
      },
      body: JSON.stringify(buildPayload(prompt)),
    })
  } catch {
    throw new Error('Network error while generating avatar. Check your connection.')
  }

  if (!res.ok) {
    const errText = await res.text().catch(() => '')
    throw new Error(`Avatar generation failed (${res.status}): ${errText || res.statusText}`)
  }

  const data = await res.json()
  const images = data?.output?.choices?.[0]?.message?.content
    ?.filter((item) => item.image)
    ?.map((item) => item.image) || []

  if (images.length) {
    return images[0]
  }

  throw new Error(data.message || 'No image returned from DashScope')
}
