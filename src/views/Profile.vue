<template>
  <div class="edit-profile-page min-h-screen bg-white dark:bg-[#161616] PrimaryTxt">
    <div class="max-w-[894px] mx-auto pt-8 px-4 pb-16 space-y-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div class="bg-white dark:bg-[#0d0d0d] border  border-[#E9EBEF] shadow-sm rounded-2xl p-8 flex flex-col items-center justify-center min-h-[270px] gap-4">
          <!-- Avatar circle -->
          <div class="relative w-32 h-32">
            <div
              class="w-full h-full rounded-full bg-[url('Checker.png')] bg-cover shadow-[0_0_0_4px_rgba(64,185,255,0.2)] overflow-hidden"
            >
              <img
                v-if="userImage"
                :src="userImage"
                class="w-full h-full object-cover"
              />
              <img
                v-else
                src="../assets/Avatar.svg"
                class="w-full h-full object-cover"
              />
            </div>
            <div
              v-if="imageLoading"
              class="absolute inset-0 rounded-full bg-black/30 flex items-center justify-center"
            >
              <svg
                class="w-6 h-6 text-white animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                />
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
            </div>
          </div>

          <h2 class="text-xl font-semibold PrimaryTxt">{{ fullName }}</h2>

          <div class="flex items-center gap-3">
            <button
              type="button"
              @click="handleAddImage"
              :disabled="imageLoading"
              class="flex items-center gap-1.5 px-4 h-9 bg-[#40B9FF] text-white rounded-lg text-sm font-medium shadow-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg
                class="w-4 h-4 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 16.5V19a1 1 0 001 1h16a1 1 0 001-1v-2.5M12 3v13m-4-4l4 4 4-4"
                />
              </svg>
              {{ $t("profile.addImage") }}
            </button>
            <button
              type="button"
              @click="handleDeleteImage"
              :disabled="imageLoading || !userImage"
              class="flex items-center gap-1.5 px-4 h-9 bg-[#FFF5F5] border border-[#FFE5E5] text-[#D4183D] rounded-lg text-sm font-medium hover:bg-[#ffebeb] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <svg
                class="w-4 h-4 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              {{ $t("profile.deleteImage") }}
            </button>
          </div>
        </div>

        <div class="bg-white dark:bg-[#0d0d0d] border border-[#E9EBEF] shadow-sm rounded-2xl p-8 flex flex-col items-center justify-between min-h-[277px]">
          <div class="flex flex-col items-center w-full mt-2">
            <div class="relative w-32 h-32 mb-4">
              <div
                class="w-full h-full rounded-full bg-[url('Checker.png')] bg-cover shadow-[0_0_0_4px_rgba(64,185,255,0.2)] overflow-hidden"
              >
                <img
                  src="../assets/Avatar.svg"
                  alt="Avatar Preview"
                  class="w-full h-full object-cover hidden"
                />
              </div>
              <button
                type="button"
                class="absolute bottom-0 right-0 w-10 h-10 bg-[#40B9FF] text-white rounded-full flex items-center justify-center shadow-md hover:bg-[#29aaff] transition-colors"
                :aria-label="$t('profile.createAvatar')"
              >
                <svg
                  class="w-6 h-6 border border-[#F1F5F9] rounded"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            </div>
            <p class="text-sm text-[#717182]">
              {{ $t("profile.createAvatar") }}
            </p>
          </div>
          <div class="flex items-center gap-4 w-full justify-center mt-4">
            <button
              type="button"
              class="w-24 h-[26px] bg-[#EA0234] text-white rounded-md text-xs font-medium shadow-sm hover:opacity-90 transition-opacity"
            >
              {{ $t("profile.delete") }}
            </button>
            <button
              type="button"
              class="w-24 h-[26px] bg-[#AAE338] text-white rounded-md text-xs font-medium shadow-sm hover:opacity-90 transition-opacity"
            >
              {{ $t("profile.edit") }}
            </button>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-[#0d0d0d] border border-[#E9EBEF] shadow-sm rounded-2xl p-8">
        <h3 class="text-lg font-semibold PrimaryTxt mb-6">Personal Information</h3>
        <form @submit.prevent="saveChanges" class="space-y-6">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div class="flex flex-col">
              <label class="text-sm font-medium PrimaryTxt mb-2">{{
                $t("profile.firstName")
              }}</label>
              <div class="relative flex items-center">
                <input
                  v-model="form.firstName"
                  type="text"
                  class="w-full h-12 ps-4 pe-10 bg-[#F9FAFB] border border-[#E9EBEF] rounded-xl text-base text-[#0A0A0A] focus:outline-none focus:border-[#40B9FF]"
                />
                <div class="absolute end-4 text-[#1E1E1E]">
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="1.6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div class="flex flex-col">
              <label class="text-sm font-medium PrimaryTxt mb-2">{{
                $t("profile.lastName")
              }}</label>
              <div class="relative flex items-center">
                <input
                  v-model="form.lastName"
                  type="text"
                  class="w-full h-12 ps-4 pe-10 bg-[#F9FAFB] border border-[#E9EBEF] rounded-xl text-base text-[#0A0A0A] focus:outline-none focus:border-[#40B9FF]"
                />
                <div class="absolute end-4 text-[#1E1E1E]">
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="1.6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div class="flex flex-col">
            <label class="text-sm font-medium PrimaryTxt mb-2">{{
              $t("profile.email")
            }}</label>
            <div class="relative flex items-center">
              <div class="absolute start-4 text-[#717182]">
                <svg
                  class="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="1.67"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <input
                v-model="form.email"
                disabled
                type="email"
                class="w-full h-12 ps-12 pe-4 bg-gray-100 text-gray-500 border border-[#E9EBEF] rounded-xl text-base cursor-not-allowed focus:outline-none focus:border-[#40B9FF]"
              />
            </div>
          </div>

          <div class="flex flex-col">
            <label class="text-sm font-medium PrimaryTxt mb-3">{{
              $t("profile.gender")
            }}</label>
            <div class="flex items-center gap-3">
              <button
                type="button"
                @click="form.gender = 'Male'"
                class="w-[84px] h-12 rounded-xl text-base font-medium transition-all shadow-sm"
                :class="
                  form.gender === 'Male'
                    ? 'bg-[#40B9FF] text-white'
                    : 'bg-[#F9FAFB] text-[#717182]'
                "
              >
                {{ $t("profile.male") }}
              </button>
              <button
                type="button"
                @click="form.gender = 'Female'"
                class="w-[100px] h-12 rounded-xl text-base font-medium transition-all shadow-sm"
                :class="
                  form.gender === 'Female'
                    ? 'bg-[#40B9FF] text-white'
                    : 'bg-[#F9FAFB] text-[#717182]'
                "
              >
                {{ $t("profile.female") }}
              </button>
            </div>
          </div>

          <div class="pt-8 border-t border-[#E9EBEF] flex items-center gap-4">
            <button
              type="button"
              @click="cancelEdits"
              class="flex-1 h-[51px] border border-[#E9EBEF] rounded-xl text-base font-medium text-[#717182] hover:bg-gray-50 transition-colors"
            >
              {{ $t("profile.cancel") }}
            </button>
            <button
              type="submit"
              class="flex-1 h-[51px] bg-[#8ED321] text-white rounded-xl text-base font-medium shadow-md hover:opacity-90 transition-opacity"
            >
              {{ $t("profile.saveChanges") }}
            </button>
          </div>
        </form>
      </div>

      <div class="w-full flex justify-center pt-4">
        <button type="button" @click="showDeleteModal = true" class="w-full max-w-[400px] h-[66px] justify-center bg-[#FFF5F5] border border-[#FFE5E5] rounded-[14px] px-5 flex items-center gap-3 hover:bg-[#ffebeb] transition-colors">
          <div class="text-[#D4183D] flex items-center justify-center">
            <svg
              class="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.67"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <span class="text-base font-medium text-[#D4183D]">{{
            $t("profile.deleteAccount")
          }}</span>
        </button>
      </div>
    </div>

    <div
      v-if="showDeleteModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      @click.self="!isDeleting && (showDeleteModal = false)"
    >
      <div class="delete-account-modal-container">
        <div class="icon-layout-container">
          <div class="warning-icon-badge">
            <svg
              class="warning-vector-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#D4183D"
              stroke-width="2.66667"
              stroke-linecap="round"
            >
              <path d="M12 9v4M12 17h.01" />
              <path d="M12 3a9 9 0 110 18 9 9 0 010-18z" />
            </svg>
          </div>
        </div>

        <div class="heading-layout-container">
          <h2 class="delete-modal-title">
            {{ $t("profile.deleteModal.title") }}
          </h2>
        </div>

        <div class="paragraph-layout-container">
          <p class="delete-modal-description">
            {{ $t("profile.deleteModal.description") }}
          </p>
        </div>

        <div class="actions-outer-container">
          <div class="actions-inner-stack">
            <button
              type="button"
              @click="handleDeleteConfirmation"
              :disabled="isDeleting"
              class="action-btn-danger"
            >
              <span v-if="!isDeleting" class="btn-text-white">{{
                $t("profile.deleteModal.confirm")
              }}</span>
              <span v-else class="btn-text-white">{{
                $t("profile.deleteModal.deleting")
              }}</span>
            </button>

            <button
              type="button"
              @click="showDeleteModal = false"
              :disabled="isDeleting"
              class="action-btn-cancel"
            >
              <span class="btn-text-muted">{{
                $t("profile.deleteModal.cancel")
              }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="showSuccessModal"
      class="success-modal-overlay"
      @click.self="showSuccessModal = false"
    >
      <div class="success-modal-container">
        <div class="success-icon-layout">
          <div class="success-icon-badge">
            <svg
              class="success-vector-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M3.5 12.5L9 18L20.5 6"
                stroke="#8ED321"
                stroke-width="2.66667"
              />
            </svg>
          </div>
        </div>

        <div class="success-heading-layout">
          <h2 class="success-modal-title">
            {{ $t("profile.successModal.title") }}
          </h2>
        </div>

        <div class="success-paragraph-layout">
          <p class="success-modal-description">
            {{ $t("profile.successModal.description") }}
          </p>
        </div>

        <button
          type="button"
          @click="showSuccessModal = false"
          class="success-action-btn"
        >
          <span class="success-btn-text">{{
            $t("profile.successModal.continue")
          }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import {
  updateProfile,
  deleteAccount,
  getUserById,
  addImage,
  deleteImage,
} from "../services/services";

export default {
  name: "EditProfile",
  setup() {
    const router = useRouter();
    const form = ref({
      firstName: "",
      lastName: "",
      email: "",
      gender: "",
    });

    // Modal view tracking states
    const showDeleteModal = ref(false);
    const isDeleting = ref(false);

    const fullName = computed(
      () =>
        [form.value.firstName, form.value.lastName].filter(Boolean).join(" ") ||
        "—",
    );

    onMounted(() => {
      const raw = localStorage.getItem("user");
      if (!raw) {
        router.replace("/");
        return;
      }

      const user = JSON.parse(raw);
      form.value.firstName = user.first_name || "";
      form.value.lastName = user.last_name || "";
      form.value.email = user.email || "";
      const g = user.gender || "";
      form.value.gender = g.charAt(0).toUpperCase() + g.slice(1).toLowerCase();
      userImage.value = user.userImage || "";
    });

    const showSuccessModal = ref(false);
    const userImage = ref("");
    const imageLoading = ref(false);

    const handleAddImage = () => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";

  input.onchange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    imageLoading.value = true;

    try {
      // Compress image
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 0.000000000001,
        maxWidthOrHeight: 500,
        useWebWorker: true,
      });

      // Convert compressed image to Base64
      const reader = new FileReader();

      reader.onload = async () => {
        try {
          const base64 = reader.result;

          // Adjust this depending on what your backend route expects:
          await addImage({ userImage: base64 });
          console.log(base64)
          // or, if the route expects the raw string itself:
          // await addImage(base64);

          userImage.value = base64;

          // Persist in localStorage so navbar/other pages stay in sync
          const stored = JSON.parse(localStorage.getItem("user") || "{}");
          stored.userImage = base64;
          localStorage.setItem("user", JSON.stringify(stored));

          window.dispatchEvent(new Event("storage"));
        } catch (err) {
          console.error("Failed to upload image:", err);
        } finally {
          imageLoading.value = false;
        }
      };

      reader.readAsDataURL(compressedFile);
    } catch (err) {
      console.error("Image compression failed:", err);
      imageLoading.value = false;
    }
  };

  input.click();
};

    const handleDeleteImage = async () => {
      if (!userImage.value) return;
      imageLoading.value = true;
      try {
        await deleteImage();
        userImage.value = "";
        const stored = JSON.parse(localStorage.getItem("user") || "{}");
        stored.userImage = "";
        localStorage.setItem("user", JSON.stringify(stored));
        window.dispatchEvent(new Event("storage"));
      } catch (err) {
        console.error("Failed to delete image:", err);
      } finally {
        imageLoading.value = false;
      }
    };

    const saveChanges = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const payload = {
          firstName: form.value.firstName,
          lastName: form.value.lastName,
          gender: form.value.gender,
        };

        // 1. Persist the changes on the backend
        await updateProfile(payload, token);

        // 2. Fetch the fresh full user object and save it to localStorage
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const id = user.id || user._id;

        const userRes = await getUserById(id);
        const userData = {
          first_name: userRes.data.user.profile.first_name,
          last_name: userRes.data.user.profile.last_name,
          email: userRes.data.user.email,
          id: userRes.data.user._id,
          userImage: userRes.data.user.userImage,
          language: userRes.data.user.settings.language,
          avatars: userRes.data.user.avatars,
          darkMode: userRes.data.user.darkMode,
          has_mobile_app: userRes.data.user.settings.has_mobile_app,
          gender: userRes.data.user.profile.gender,
          date_of_birth: userRes.data.user.profile.date_of_birth,
        };
        localStorage.setItem("user", JSON.stringify(userData));
        window.dispatchEvent(new Event("storage"));

        showSuccessModal.value = true;
      } catch (error) {
        console.error(error);
      }
    };

    const cancelEdits = () => {
      const raw = localStorage.getItem("user");
      const user = raw ? JSON.parse(raw) : {};
      form.value.firstName = user.firstName || "";
      form.value.lastName = user.lastName || "";
      const g = user.gender || "";
      form.value.gender = g.charAt(0).toUpperCase() + g.slice(1).toLowerCase();
    };

    // Refactored async system removing custom native confirmations
    const handleDeleteConfirmation = async () => {
      if (isDeleting.value) return;
      isDeleting.value = true;

      try {
        await deleteAccount(form.value.email);

        // Wipe local validation persistence stores
        localStorage.removeItem("user");
        localStorage.removeItem("token");

        showDeleteModal.value = false;

        // Force reactive view rebuild natively to clear navbar configurations cleanly
        router.push("/").then(() => {
          window.location.reload();
        });
      } catch (error) {
        console.error("Failed to delete account:", error);
        alert(
          error.response?.data?.message ||
            "An error occurred while attempting to delete your account.",
        );
      } finally {
        isDeleting.value = false;
      }
    };

    return {
      form,
      fullName,
      userImage,
      imageLoading,
      showDeleteModal,
      showSuccessModal,
      isDeleting,
      saveChanges,
      cancelEdits,
      handleDeleteConfirmation,
      handleAddImage,
      handleDeleteImage,
    };
  },
};
</script>

<style scoped>
/* Exact Figma Blueprint Styles Setup Mapping */
.delete-account-modal-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 32px;
  width: 448px;
  max-width: 448px;
  height: 391.2px;
  background: #ffffff;
  box-shadow: 0px 25px 50px -12px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  box-sizing: border-box;
}

.icon-layout-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  width: 384px;
  height: 64px;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
}

.warning-icon-badge {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  width: 64px;
  height: 64px;
  background: #fff5f5;
  border-radius: 9999px; /* Equivalent to 2.68435e+07px */
  flex: none;
  order: 0;
  flex-grow: 0;
}

.warning-vector-icon {
  width: 32px;
  height: 32px;
  flex: none;
  order: 0;
  flex-grow: 0;
}

.heading-layout-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 0px 0px;
  width: 384px;
  height: 56px;
  flex: none;
  order: 1;
  flex-grow: 0;
}

.delete-modal-title {
  width: 192px;
  height: 32px;
  font-family: "Inter", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  text-align: center;
  color: #1e1e24;
  margin: 0;
  flex: none;
  order: 0;
  flex-grow: 0;
}

.paragraph-layout-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 0px 0px;
  width: 384px;
  height: 64px;
  flex: none;
  order: 2;
  align-self: stretch;
  flex-grow: 0;
}

.delete-modal-description {
  width: 384px;
  height: 52px;
  font-family: "Inter", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 26px;
  text-align: center;
  color: #717182;
  margin: 0;
  flex: none;
  order: 0;
  flex-grow: 0;
}

.actions-outer-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 32px 0px 0px;
  width: 384px;
  height: 143.2px;
  flex: none;
  order: 3;
  align-self: stretch;
  flex-grow: 0;
}

.actions-inner-stack {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 12px;
  width: 384px;
  height: 111.2px;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
}

.action-btn-danger {
  position: relative;
  width: 384px;
  height: 48px;
  background: #d4183d;
  border: none;
  border-radius: 10px;
  flex: none;
  order: 0;
  flex-grow: 0;
  cursor: pointer;
  transition: opacity 0.2s;
}

.action-btn-danger:hover {
  opacity: 0.9;
}

.btn-text-white {
  position: absolute;
  width: 154px;
  height: 24px;
  left: calc(50% - 154px / 2);
  top: calc(50% - 24px / 2);
  font-family: "Inter", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: #ffffff;
}

.action-btn-cancel {
  box-sizing: border-box;
  position: relative;
  width: 384px;
  height: 51.2px;
  border: 1.6px solid #e9ebef;
  background: #ffffff;
  border-radius: 10px;
  flex: none;
  order: 1;
  flex-grow: 0;
  cursor: pointer;
  transition: background-color 0.2s;
}

.action-btn-cancel:hover {
  background-color: #f9fafb;
}

.btn-text-muted {
  position: absolute;
  width: 53px;
  height: 24px;
  left: calc(50% - 53px / 2);
  top: calc(50% - 24px / 2);
  font-family: "Inter", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: #717182;
}

/* Disable styles handling */
button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* ── Success Modal ─────────────────────────────────────────── */
.success-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px;
  background: rgba(0, 0, 0, 0.5);
}

.success-modal-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 32px;
  width: 448px;
  max-width: 448px;
  background: #ffffff;
  box-shadow: 0px 25px 50px -12px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  box-sizing: border-box;
}

.success-icon-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  width: 100%;
  height: 64px;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
}

.success-icon-badge {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 64px;
  height: 64px;
  background: linear-gradient(
    135deg,
    rgba(142, 211, 33, 0.2) 0%,
    rgba(64, 185, 255, 0.2) 100%
  );
  border-radius: 9999px;
  flex: none;
  order: 0;
  flex-grow: 0;
}

.success-vector-icon {
  width: 32px;
  height: 32px;
  flex: none;
  order: 0;
  flex-grow: 0;
}

.success-heading-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 0px 0px;
  width: 100%;
  flex: none;
  order: 1;
  flex-grow: 0;
}

.success-modal-title {
  font-family: "Inter", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  text-align: center;
  color: #1e1e24;
  margin: 0;
  flex: none;
  order: 0;
  flex-grow: 0;
}

.success-paragraph-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 0px 32px;
  width: 100%;
  flex: none;
  order: 2;
  flex-grow: 0;
}

.success-modal-description {
  font-family: "Inter", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 26px;
  text-align: center;
  color: #717182;
  margin: 0;
  flex: none;
  order: 0;
  flex-grow: 0;
}

.success-action-btn {
  position: relative;
  width: 100%;
  height: 48px;
  background: #8ed321;
  box-shadow:
    0px 4px 6px -1px rgba(0, 0, 0, 0.1),
    0px 2px 4px -2px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  border: none;
  cursor: pointer;
  flex: none;
  order: 3;
  align-self: stretch;
  flex-grow: 0;
  transition: opacity 0.2s;
}

.success-action-btn:hover {
  opacity: 0.9;
}

.success-btn-text {
  font-family: "Inter", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: #ffffff;
}
</style>
