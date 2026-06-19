<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  fullWidth: { type: Boolean, default: false },
})

const { locale } = useI18n()

const savedLang = localStorage.getItem('user-lang') || 'en'

const isOpen = ref(false)
const currentLang = ref(savedLang)

locale.value = savedLang

const languages = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'ar', label: 'AR', name: 'Arabic' }
]

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectLanguage = (langCode) => {
  currentLang.value = langCode
  isOpen.value = false 
  
  locale.value = langCode
  
  localStorage.setItem('user-lang', langCode)
  
  if (langCode === 'ar') {
    document.documentElement.dir = 'rtl'
    document.documentElement.lang = 'ar'
  } else {
    document.documentElement.dir = 'ltr'
    document.documentElement.lang = 'en'
  }
}

const switcherRef = ref(null)
const handleClickOutside = (event) => {
  if (switcherRef.value && !switcherRef.value.contains(event.target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  
  if (currentLang.value === 'ar') {
    document.documentElement.dir = 'rtl'
    document.documentElement.lang = 'ar'
  } else {
    document.documentElement.dir = 'ltr'
    document.documentElement.lang = 'en'
  }
})

onUnmounted(() => document.removeEventListener('click', handleClickOutside))
</script>




<template>
  <div
    ref="switcherRef"
    class="relative text-left select-none"
    :class="fullWidth ? 'block w-full' : 'inline-block'"
  >
    
    <button 
      @click="toggleDropdown"
      type="button"
      class="flex items-center transition-colors focus:outline-none"
      :class="fullWidth
        ? 'w-full justify-between gap-3 px-4 py-3 bg-(--primary-bgc) rounded-full hover:bg-gray-200/80 dark:hover:bg-zinc-800'
        : 'gap-2 px-3 py-1.5 bg-(--card-surface) border border-gray-200 dark:border-zinc-700 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-800'"
    >
      <svg class="w-5 h-5 text-(--Primary-Text-color) shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 2a14.5 14.5 0 0 0 0 20M12 2a14.5 14.5 0 0 1 0 20M2 12h20m-20 0a14.5 14.5 0 0 0 20 0"/>
      </svg>
      
      <span
        class="text-(--Primary-Text-color)"
        :class="fullWidth ? 'flex-1 text-center text-sm font-medium' : 'text-sm font-semibold uppercase tracking-wider'"
      >
        {{ fullWidth
          ? languages.find(l => l.code === currentLang)?.name
          : languages.find(l => l.code === currentLang)?.label }}
      </span>
      
      <svg 
        :class="{'rotate-180': isOpen}"
        class="w-4 h-4 text-(--Primary-Text-color) transition-transform duration-200 shrink-0" 
        fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div 
        v-if="isOpen"
        class="absolute mt-2 bg-(--card-surface) border border-gray-200 dark:border-zinc-700 rounded-xl shadow-lg z-50 overflow-hidden ltr:right-0 rtl:left-0"
        :class="fullWidth ? 'left-0 right-0 w-full' : 'w-52'"
      >
        <div class="flex flex-col p-1">
          <div 
            v-for="(lang, index) in languages" 
            :key="lang.code"
            @click="selectLanguage(lang.code)"
            class="group flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
          >
            <div class="flex items-center gap-3">
              <svg class="w-5 h-5 text-(--Primary-Text-color)" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 2a14.5 14.5 0 0 0 0 20M12 2a14.5 14.5 0 0 1 0 20M2 12h20m-20 0a14.5 14.5 0 0 0 20 0"/>
              </svg>
              <span class="text-base font-normal text-(--Primary-Text-color)">{{ lang.name }}</span>
            </div>

            <div class="w-4 h-4 flex items-center justify-center">
              <svg v-if="currentLang === lang.code" class="w-4 h-4 text-(--Primary-Text-color)" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          <hr class="border-gray-100 dark:border-zinc-800 my-0 order-1" />
        </div>
      </div>
    </transition>

  </div>
</template>