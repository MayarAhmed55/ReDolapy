<template>
  <main class="w-full max-w-6xl mx-auto px-2 sm:px-4 py-6 sm:py-10">
    <WardrobeLoading
      v-if="loading && !initialized"
      :message="$t('wardrobe.loading')"
      :aria-label="$t('wardrobe.loading')"
    />

    <template v-else>
      <EmptyWordrobe
        v-if="!items.length"
        @add-item="openUploadModal"
      />

      <template v-else>
        <WardrobeHeader
          :active-category="activeCategory"
          @filter="activeCategory = $event"
        />

        <WardrobeItems
          :items="filteredItems"
          @add-item="openUploadModal"
          @open-item="openItemDetails"
          @delete="openDeleteModal"
        />
      </template>
    </template>

    <p v-if="displayError" class="mt-4 text-sm text-red-600 text-center">{{ displayError }}</p>

    <UploadAnalyzeModal
      :open="showUploadModal"
      @close="showUploadModal = false"
      @analyzed="onAnalyzed"
    />

    <AnalyzeDetailsModal
      :open="showDetailsModal"
      :analysis-id="activeAnalysisId"
      @close="showDetailsModal = false"
      @added="onItemAdded"
    />

    <QuickViewModal
      v-if="showQuickViewModal && selectedItem"
      :item="selectedItem"
      @close="closeQuickViewModal"
      @delete="onQuickViewDelete"
    />

    <DeleteConfirmationModal
      :open="showDeleteModal"
      :item-id="itemToDelete?._id || ''"
      @close="closeDeleteModal"
      @deleted="onItemDeleted"
    />
  </main>
</template>

<script>
import { mapState } from 'pinia'
import EmptyWordrobe from '../components/Wordrobe/EmptyWordrobe.vue'
import WardrobeHeader from '../components/Wordrobe/WardrobeHeader.vue'
import WardrobeItems from '../components/Wordrobe/WardrobeItems.vue'
import WardrobeLoading from '../components/Wordrobe/WardrobeLoading.vue'
import UploadAnalyzeModal from '../components/WordrobeModals/UploadAnalyzeModal.vue'
import AnalyzeDetailsModal from '../components/WordrobeModals/AnalyzeDetailsModal.vue'
import QuickViewModal from '../components/WordrobeModals/QuickViewModal.vue'
import DeleteConfirmationModal from '../components/WordrobeModals/DeleteConfirmationModal.vue'
import { useWardrobeStore } from '../stores/wardrobe.js'
import { mapApiError } from '../utils/mapApiError.js'
import { triggerLoginModal } from '../authState.js'
import { API_ERROR_CODES } from '../utils/apiError.js'

export default {
  name: 'Wardrobe',
  components: {
    EmptyWordrobe,
    WardrobeHeader,
    WardrobeItems,
    WardrobeLoading,
    UploadAnalyzeModal,
    AnalyzeDetailsModal,
    QuickViewModal,
    DeleteConfirmationModal,
  },
  data: () => ({
    activeCategory: 'all',
    showUploadModal: false,
    showDetailsModal: false,
    activeAnalysisId: '',
    showQuickViewModal: false,
    selectedItem: null,
    showDeleteModal: false,
    itemToDelete: null,
    localError: '',
  }),
  computed: {
    ...mapState(useWardrobeStore, ['items', 'loading', 'error', 'initialized']),

    wardrobeStore() {
      return useWardrobeStore()
    },

    filteredItems() {
      return this.wardrobeStore.getByCategory(this.activeCategory)
    },

    displayError() {
      return this.localError || (this.error ? mapApiError({ message: this.error }, this.$t.bind(this)) : '')
    },
  },
  mounted() {
    this.loadWardrobe()
  },
  beforeRouteLeave() {
    this.closeQuickViewModal()
  },
  methods: {
    async loadWardrobe() {
      this.localError = ''
      try {
        await this.wardrobeStore.fetchAll()
      } catch (err) {
        if (err.message === API_ERROR_CODES.LOGIN_REQUIRED) {
          triggerLoginModal()
        } else {
          this.localError = mapApiError(err, this.$t.bind(this))
        }
      }
    },

    openUploadModal() {
      if (!localStorage.getItem('token')) {
        triggerLoginModal()
        return
      }
      this.showUploadModal = true
    },

    onAnalyzed({ analysisId }) {
      this.activeAnalysisId = analysisId
      this.showDetailsModal = true
    },

    onItemAdded() {
      this.showDetailsModal = false
    },

    openItemDetails(item) {
      this.selectedItem = item
      this.showQuickViewModal = true
    },

    closeQuickViewModal() {
      this.showQuickViewModal = false
      this.selectedItem = null
    },

    onQuickViewDelete(item) {
      this.closeQuickViewModal()
      this.openDeleteModal(item)
    },

    openDeleteModal(item) {
      this.itemToDelete = item
      this.showDeleteModal = true
    },

    closeDeleteModal() {
      this.showDeleteModal = false
      this.itemToDelete = null
    },

    onItemDeleted() {
      this.closeDeleteModal()
    },
  },
}
</script>
