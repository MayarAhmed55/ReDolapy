import { ref } from 'vue'
import { fetchAvatarById, fetchAvatars } from '../api/avatars.js'
import { normalizeAvatar, normalizeAvatarList } from '../utils/avatarHelpers.js'

const avatars = ref([])
const loaded = ref(false)
const loading = ref(false)

export function useAvatars() {
  async function loadAvatars(force = false) {
    if (!localStorage.getItem('token')) {
      avatars.value = []
      loaded.value = true
      return
    }

    if (loaded.value && !force && avatars.value.length) return

    loading.value = true
    try {
      const data = await fetchAvatars()
      avatars.value = normalizeAvatarList(data)
      loaded.value = true
    } catch {
      avatars.value = []
      loaded.value = true
    } finally {
      loading.value = false
    }
  }

  async function getAvatarById(id) {
    const data = await fetchAvatarById(id)
    const avatar = normalizeAvatar(data)
    const index = avatars.value.findIndex((entry) => entry.id === avatar.id)
    if (index >= 0) {
      avatars.value[index] = avatar
    }
    return avatar
  }

  return {
    avatars,
    loading,
    loadAvatars,
    getAvatarById,
  }
}
