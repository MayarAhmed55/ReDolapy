<template>

  <div class="w-full mb-6 sm:mb-8">

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-3xl">

      <button

        type="button"

        class="model-choice-card"

        :class="{ 'model-choice-card--active': activeSource === 'avatar' }"

        @click="onAvatarClick"

      >

        <span

          class="model-choice-card__check"

          :class="{ 'model-choice-card__check--active': activeSource === 'avatar' }"

          aria-hidden="true"

        >

          <img v-if="activeSource === 'avatar'" :src="checkIcon" alt="" class="w-3.5 h-3.5 brightness-0 invert" />

        </span>

        <p class="model-choice-card__desc text-(--Disabled-Text-color)">

          {{ $t('tryOn.model.avatar_card_desc') }}

        </p>

        <span class="model-choice-card__action">

          <span class="model-choice-card__icon model-choice-card__icon--avatar">

            <img :src="avatarIcon" alt="" class="w-6 h-6" aria-hidden="true" />

          </span>

          <span class="text-xs sm:text-sm font-bold text-(--Primary-Text-color)">

            {{ $t('tryOn.model.use_avatar') }}

          </span>

        </span>

      </button>



      <button

        type="button"

        class="model-choice-card"

        :class="{ 'model-choice-card--active': activeSource === 'personal' }"

        @click="onPersonalClick"

      >

        <span

          class="model-choice-card__check"

          :class="{ 'model-choice-card__check--active': activeSource === 'personal' }"

          aria-hidden="true"

        >

          <img v-if="activeSource === 'personal'" :src="checkIcon" alt="" class="w-3.5 h-3.5 brightness-0 invert" />

        </span>

        <p class="model-choice-card__desc text-(--Disabled-Text-color)">

          {{ $t('tryOn.model.personal_card_desc') }}

        </p>

        <span class="model-choice-card__action">

          <span class="model-choice-card__icon model-choice-card__icon--camera">

            <img :src="cameraIcon" alt="" class="w-7 h-6 camera-icon" aria-hidden="true" />

          </span>

          <span class="text-xs sm:text-sm font-bold text-(--Primary-Text-color)">

            {{ $t('tryOn.model.personal_photo') }}

          </span>

        </span>

      </button>

    </div>



    <input

      ref="modelInput"

      type="file"

      :accept="acceptAttr"

      class="hidden"

      @change="onModelFileChange"

    />



    <AvatarSelector

      v-if="showAvatarSelector"

      class="mt-4"

      :avatars="validAvatars"

      :selected-id="model?.type === 'avatar' ? model.id : ''"

      :upgrade-mode="validAvatars.length > 0"

      @select="selectSavedAvatar"

      @create="onCreateAvatar"

    />



    <p v-if="warning" class="mt-3 text-sm text-amber-700">{{ warning }}</p>

  </div>

</template>



<script>

import avatarIcon from '../../assets/Avatar.svg'

import cameraIcon from '../../assets/cameraIcon.svg'

import checkIcon from '../../assets/checkIcon (3).svg'

import AvatarSelector from '../Avatar/AvatarSelector.vue'

import { useAvatars } from '../../composables/useAvatars.js'

import { getLatestSuccessfulAvatar } from '../../utils/avatarHelpers.js'

import { mapApiError } from '../../utils/mapApiError.js'

import {

  ACCEPT_ATTR,

  MAX_FILE_SIZE,

  isAllowedImage,

  SUPPORTED_FORMATS_LABEL,

} from '../../utils/imageUpload.js'



export default {

  name: 'UserModelUpload',

  components: { AvatarSelector },

  emits: ['update:model'],

  props: {

    model: { type: Object, default: null },

  },

  setup() {

    const { avatars, loadAvatars, getAvatarById } = useAvatars()

    return { savedAvatars: avatars, loadAvatars, getAvatarById }

  },

  data: () => ({

    activeSource: null,

    showAvatarSelector: false,

    warning: '',

    avatarIcon,

    cameraIcon,

    checkIcon,

    acceptAttr: ACCEPT_ATTR,

  }),

  computed: {
    validAvatars() {
      const latest = getLatestSuccessfulAvatar(this.savedAvatars)
      return latest ? [latest] : []
    },
  },
  watch: {
    model: {

      immediate: true,

      handler(value) {

        if (!value) {

          this.activeSource = null

          return

        }

        this.activeSource = value.type === 'avatar' ? 'avatar' : 'personal'

        if (value.type === 'avatar') {

          this.showAvatarSelector = true

        }

      },

    },

  },

  mounted() {

    this.loadAvatars()

  },

  activated() {

    this.loadAvatars(true)

  },

  beforeUnmount() {

    if (this.model?.revokable) URL.revokeObjectURL(this.model.url)

  },

  methods: {

    onPersonalClick() {

      this.activeSource = 'personal'

      this.showAvatarSelector = false

      this.warning = ''

      this.$refs.modelInput?.click()

    },

    async onAvatarClick() {

      this.activeSource = 'avatar'

      this.warning = ''

      await this.loadAvatars(true)

      if (this.validAvatars.length) {
        this.showAvatarSelector = true
        return
      }

      this.goToAvatarPage()
    },

    onCreateAvatar() {
      if (this.validAvatars.length) {
        this.$router.push('/pricing')
        return
      }
      this.goToAvatarPage()
    },

    goToAvatarPage() {

      this.$router.push('/Avatar')

    },

    async selectSavedAvatar(avatar) {

      this.warning = ''

      try {

        const full = await this.getAvatarById(avatar.id)

        await this.applyAvatarModel(full)

      } catch (err) {

        this.warning = mapApiError(err, this.$t.bind(this))

      }

    },

    async applyAvatarById(avatarId) {

      this.warning = ''

      try {

        await this.loadAvatars(true)

        this.showAvatarSelector = true

        this.activeSource = 'avatar'

        const full = await this.getAvatarById(avatarId)

        await this.applyAvatarModel(full)

      } catch (err) {

        this.warning = mapApiError(err, this.$t.bind(this))

      }

    },

    async applyAvatarModel(avatar) {
      if (!avatar?.url) return
      this.setAvatarModel(avatar)
    },

    setAvatarModel(avatar) {

      if (this.model?.revokable) URL.revokeObjectURL(this.model.url)

      this.$emit('update:model', {

        type: 'avatar',

        id: avatar.id,

        name: avatar.name || this.$t('avatar.default_name'),

        url: avatar.url,
        stableUrl: avatar.url,

        refreshStableUrl: false,

        revokable: false,

      })

    },

    onModelFileChange(e) {

      this.addModelFile(e.target.files?.[0])

      e.target.value = ''

    },

    addModelFile(file) {

      if (!file) return

      this.warning = ''

      if (!isAllowedImage(file)) {

        this.warning = this.$t('tryOn.warnings.format_error', { formats: SUPPORTED_FORMATS_LABEL })

        return

      }

      if (file.size > MAX_FILE_SIZE) {

        this.warning = this.$t('tryOn.warnings.size_limit')

        return

      }

      if (this.model?.revokable) URL.revokeObjectURL(this.model.url)

      this.$emit('update:model', {

        type: 'personal',

        id: 'personal',

        name: this.$t('tryOn.model.your_photo'),

        url: URL.createObjectURL(file),

        file,

        revokable: true,

      })

    },

  },

}

</script>



<style scoped>

.model-choice-card {

  position: relative;

  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 0.75rem;

  padding: 1rem 1.125rem;

  min-height: 5.5rem;

  border-radius: 1rem;

  border: 1.5px solid #D8DCE3;

  background: white;

  text-align: start;

  transition: border-color 0.2s, box-shadow 0.2s;

}



.model-choice-card:hover {

  border-color: var(--Primary-Brand-color);

}



.model-choice-card--active {

  border-color: var(--Secondary-Brand-color);

  box-shadow: 0 0 0 1px var(--Secondary-Brand-color);

}



.model-choice-card__check {

  position: absolute;

  top: 0.625rem;

  inset-inline-end: 0.625rem;

  width: 1.125rem;

  height: 1.125rem;

  border-radius: 9999px;

  border: 1.5px solid #D8DCE3;

  display: flex;

  align-items: center;

  justify-content: center;

  background: white;

}



.model-choice-card__check--active {

  border-color: var(--Secondary-Brand-color);

  background: var(--Secondary-Brand-color);

}



.model-choice-card__desc {

  flex: 1;

  font-size: 0.75rem;

  line-height: 1.4;

  max-width: 55%;

}



.model-choice-card__action {

  display: flex;

  flex-direction: column;

  align-items: center;

  gap: 0.375rem;

  flex-shrink: 0;

}



.model-choice-card__icon {

  display: flex;

  align-items: center;

  justify-content: center;

  width: 3rem;

  height: 3rem;

  border-radius: 9999px;

}



.model-choice-card__icon--avatar {

  background: #EEF9E0;

}



.model-choice-card__icon--camera {

  background: #EEF6FC;

}



.camera-icon {

  filter: brightness(0) saturate(100%) invert(56%) sepia(86%) saturate(746%) hue-rotate(175deg) brightness(101%) contrast(101%);

}

</style>


