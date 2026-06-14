const SKIN_TONE_MAP = {
  very_light: 'very-light',
  light: 'light',
  medium: 'medium',
  tan: 'tan',
  brown: 'brown',
  dark: 'dark',
}

const HAIR_COLOR_MAP = {
  black: 'black',
  dark_brown: 'dark-brown',
  brown: 'brown',
  light_brown: 'light-brown',
  blonde: 'blonde',
  red: 'red',
}

const HIDDEN_AVATAR_DEFAULTS = {
  face_shape: 'oval',
  eye_color: 'brown eyes',
  beard_style: 'clean shave',
  facial_expression: 'smiling',
}

const REQUIRED_AVATAR_FIELDS = [
  'age',
  'height',
  'weight',
  'gender',
  'skin_tone',
  'face_shape',
  'hair_color',
  'eye_color',
  'beard_style',
  'facial_expression',
]

export function buildAvatarPayload(form) {
  const avatar = {
    age: `${form.age}y`,
    height: `${form.height}cm`,
    weight: `${form.weight}kg`,
    gender: form.gender,
    skin_tone: SKIN_TONE_MAP[form.skinTone] || form.skinTone,
    hair_color: HAIR_COLOR_MAP[form.hairColor] || form.hairColor,
    ...HIDDEN_AVATAR_DEFAULTS,
  }

  const missing = REQUIRED_AVATAR_FIELDS.filter((field) => !avatar[field])
  if (missing.length) {
    throw new Error(`Missing avatar attributes: ${missing.join(', ')}`)
  }

  return { avatar }
}

export function buildAvatarPrompt(attrs) {
  const {
    age,
    gender,
    skin_tone,
    face_shape,
    hair_color,
    eye_color,
    beard_style,
    facial_expression,
    height,
    weight,
  } = attrs

  const facialHair = gender === 'female' ? 'no facial hair' : `${beard_style} beard`

  return (
    `A photorealistic full-body image of an Egyptian ${age} ${gender} with ${skin_tone} skin, `
    + `a ${face_shape} face, ${hair_color} hair, ${eye_color}, ${facialHair}, `
    + `${height} tall, ${weight}, and a ${facial_expression} expression. `
    + 'The person is wearing a white shirt and jeans. Front-facing, well-lit, neutral background, '
    + 'natural body proportions, balanced framing with comfortable headroom and footroom, '
    + 'wide enough composition so the figure is not stretched or squeezed. '
    + 'High-quality digital avatar. The entire body from head to toe must be visible.'
  )
}

export function normalizeAvatar(raw) {
  const avatar = raw?.avatar ?? raw
  return {
    id: String(avatar._id ?? avatar.id ?? ''),
    url: avatar.image_url ?? avatar.url ?? '',
    name: avatar.name || 'My Avatar',
    attributes: avatar.attributes ?? null,
    createdAt: avatar.created_at ?? avatar.createdAt ?? null,
  }
}

export function normalizeAvatarList(data) {
  const list = data?.avatars ?? data ?? []
  return Array.isArray(list) ? list.map(normalizeAvatar) : []
}

export function hasValidAvatarImage(avatar) {
  const url = avatar?.url ?? avatar?.image_url ?? ''
  return typeof url === 'string' && /^https?:\/\//.test(url)
}

export function filterSuccessfulAvatars(avatars) {
  return (avatars || []).filter(hasValidAvatarImage)
}

export function getLatestSuccessfulAvatar(avatars) {
  const successful = filterSuccessfulAvatars(avatars)
  if (!successful.length) return null

  return successful.reduce((latest, current) => {
    const latestTime = latest.createdAt ? new Date(latest.createdAt).getTime() : 0
    const currentTime = current.createdAt ? new Date(current.createdAt).getTime() : 0
    return currentTime > latestTime ? current : latest
  })
}
