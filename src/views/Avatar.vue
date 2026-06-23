<template>
  <main class="w-full max-w-6xl mx-auto px-2 sm:px-4 py-6 sm:py-10">
    <header class="text-center mb-8 sm:mb-10">
      <h1 class="text-xl sm:text-2xl lg:text-3xl font-bold text-(--Primary-Text-color) mb-2">
        {{ $t('avatar.page.title_prefix') }}
        <span class="gradientColor">{{ $t('avatar.page.title_highlight') }}</span>
      </h1>
      <p class="text-sm sm:text-base text-(--Disabled-Text-color) font-medium">
        {{ $t('avatar.page.subtitle') }}
      </p>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
      <AvatarParametersForm
        ref="formRef"
        :generating="generating"
        :disabled="hasUsedFreeTry"
        @generate="onGenerate"
      />
      <AvatarPreview
        :image-url="generatedUrl"
        :generating="generating"
        :show-actions="Boolean(generatedUrl)"
        @download="onDownloadAvatar"
        @use-for-tryon="onUseForTryOn"
        @try-again="onTryAgain"
      />
    </div>

    <p v-if="error" class="mt-4 text-sm text-red-600 text-center">{{ error }}</p>
  </main>
</template>

<script>
import AvatarParametersForm from '../components/Avatar/AvatarParametersForm.vue'
import AvatarPreview from '../components/Avatar/AvatarPreview.vue'
import { createAvatar } from '../api/avatars.js'
import { useAvatars } from '../composables/useAvatars.js'
import { buildAvatarPayload, getLatestSuccessfulAvatar, normalizeAvatar } from '../utils/avatarHelpers.js'
import { downloadImage } from '../utils/downloadImage.js'
import { mapApiError } from '../utils/mapApiError.js'

export default {
  name: 'AvatarPage',
  components: {
    AvatarParametersForm,
    AvatarPreview,
  },
  setup() {
    const { avatars, loadAvatars } = useAvatars()
    return { savedAvatars: avatars, loadAvatars }
  },
  data: () => ({
    generating: false,
    generatedUrl: '',
    generatedAvatarId: '',
    hasUsedFreeTry: false,
    error: '',
  }),
  async mounted() {
    await this.loadExistingAvatar()
  },
  methods: {
    async loadExistingAvatar() {
      try {
        await this.loadAvatars(true)
        const existing = getLatestSuccessfulAvatar(this.savedAvatars)
        if (!existing) return

        this.generatedUrl = existing.url
        this.generatedAvatarId = existing.id
        this.hasUsedFreeTry = true
      } catch {
        // ignore — user can still try generating
      }
    },
    async onGenerate(params) {
      if (this.hasUsedFreeTry) {
        this.$router.push('/UpgradePricing')
        return
      }

      this.generating = true
      this.error = ''
      this.generatedUrl = ''
      this.generatedAvatarId = ''

      try {
        const data = await createAvatar(buildAvatarPayload(params))
        const avatar = normalizeAvatar(data)
        if (!avatar.url) {
          throw new Error(this.$t('avatar.errors.generate_failed'))
        }

        this.generatedUrl = avatar.url
        this.generatedAvatarId = avatar.id
        this.hasUsedFreeTry = true
        await this.loadAvatars(true)
      } catch (err) {
        this.error = mapApiError(err, this.$t.bind(this))
      } finally {
        this.generating = false
      }
    },
    onTryAgain() {
      this.$router.push('/UpgradePricing')
    },
    async onDownloadAvatar() {
      if (!this.generatedUrl) return

      try {
        await downloadImage(this.generatedUrl, this.$t('avatar.default_name'))
      } catch (err) {
        this.error = err.message || this.$t('avatar.errors.download_failed')
      }
    },
    async onUseForTryOn() {
      if (!this.generatedUrl || !this.generatedAvatarId) return

      this.$router.push({
        path: '/TryOn',
        query: { avatarId: this.generatedAvatarId },
      })
    },
  },
}
</script>
