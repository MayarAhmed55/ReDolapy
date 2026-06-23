/**

 * Resolve a friendly display name from the cached localStorage user object.

 */

export function getUserDisplayName(user = null) {

  const profile = user || safeParseUser()

  if (!profile) return ''



  const first =

    profile.firstName ||

    profile.first_name ||

    profile.given_name ||

    ''

  const last =

    profile.lastName ||

    profile.last_name ||

    profile.family_name ||

    ''



  if (first || last) return `${first} ${last}`.trim()

  if (profile.name) return profile.name

  if (profile.displayName) return profile.displayName

  if (profile.email) return profile.email.split('@')[0]

  return ''

}



export function getUserFirstName(user = null) {

  const full = getUserDisplayName(user)

  if (!full) return ''

  return full.split(/\s+/)[0]

}



export function getUserId(user = null) {

  const profile = user || safeParseUser()

  if (!profile) {

    return localStorage.getItem('_id') || ''

  }

  return String(profile.id || profile._id || localStorage.getItem('_id') || '')

}



function safeParseUser() {

  try {

    const raw = localStorage.getItem('user')

    return raw ? JSON.parse(raw) : null

  } catch {

    return null

  }

}



/**

 * @param {Date} [date]

 * @returns {'morning' | 'afternoon' | 'evening'}

 */

export function getTimeOfDayKey(date = new Date()) {

  const hour = date.getHours()

  if (hour < 12) return 'morning'

  if (hour < 17) return 'afternoon'

  return 'evening'

}

