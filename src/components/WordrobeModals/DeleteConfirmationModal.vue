<template>
  <TransitionRoot as="template" :show="open">
    <Dialog class="relative z-50" @close="onClose">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-900/60 backdrop-blur-sm" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4">
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel class="delete-modal w-full max-w-sm">
              <div class="flex flex-col items-center text-center">
                <div class="delete-modal__icon-wrap mb-4">
                  <svg class="w-7 h-7 text-(--Secondary-Orange-Brand-color)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true">
                    <polyline points="3 6 5 6 21 6"/>
                    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                    <path d="M10 11v6M14 11v6"/>
                    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                  </svg>
                </div>

                <DialogTitle class="text-base sm:text-lg font-bold text-(--Primary-Text-color) mb-2">
                  {{ $t('wardrobe.delete_modal.title') }}
                </DialogTitle>
                <p class="text-sm text-(--Disabled-Text-color) mb-6">
                  {{ $t('wardrobe.delete_modal.subtitle') }}
                </p>

                <p v-if="error" class="text-sm text-red-600 mb-4">{{ error }}</p>

                <div class="flex gap-3 w-full">
                  <button type="button" class="delete-modal__cancel flex-1" :disabled="deleting" @click="onClose">
                    {{ $t('wardrobe.delete_modal.cancel') }}
                  </button>
                  <button
                    type="button"
                    class="delete-modal__confirm flex-1"
                    :disabled="deleting || !itemId"
                    @click="onConfirm"
                  >
                    {{ deleting ? $t('wardrobe.delete_modal.deleting') : $t('wardrobe.delete_modal.confirm') }}
                  </button>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import { useWardrobeStore } from '../../stores/wardrobe.js'
import { mapApiError } from '../../utils/mapApiError.js'

export default {
  name: 'DeleteConfirmationModal',
  components: { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot },
  props: {
    open: { type: Boolean, default: false },
    itemId: { type: String, default: '' },
  },
  emits: ['close', 'deleted'],
  data: () => ({
    deleting: false,
    error: '',
  }),
  watch: {
    open(val) {
      if (!val) {
        this.deleting = false
        this.error = ''
      }
    },
  },
  methods: {
    onClose() {
      if (this.deleting) return
      this.$emit('close')
    },
    async onConfirm() {
      if (!this.itemId || this.deleting) return
      this.deleting = true
      this.error = ''
      try {
        const wardrobeStore = useWardrobeStore()
        await wardrobeStore.deleteItem(this.itemId)
        this.$emit('deleted', this.itemId)
        this.$emit('close')
      } catch (err) {
        this.error = mapApiError(err, this.$t.bind(this))
      } finally {
        this.deleting = false
      }
    },
  },
}
</script>

<style scoped>
.delete-modal {
  background: var(--card-surface);
  border: 1px solid var(--card-border);
  border-radius: 1.25rem;
  padding: 1.75rem 1.5rem;
  box-shadow: 0 20px 50px rgb(0 0 0 / 12%);
}

.delete-modal__icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 9999px;
  background: rgb(255 138 61 / 12%);
}

.delete-modal__cancel {
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--Secondary-Brand-color);
  background: var(--card-surface);
  border: 1.5px solid var(--Secondary-Brand-color);
  transition: background-color 0.2s;
}

.delete-modal__cancel:hover:not(:disabled) {
  background: rgb(142 211 33 / 8%);
}

.delete-modal__cancel:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.delete-modal__confirm {
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #fff;
  background: var(--Secondary-Orange-Brand-color);
  transition: opacity 0.2s;
}

.delete-modal__confirm:hover:not(:disabled) {
  opacity: 0.92;
}

.delete-modal__confirm:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>
