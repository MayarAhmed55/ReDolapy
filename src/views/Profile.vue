<template>
  <div class="edit-profile-page min-h-screen bg-white text-[#1E1E24]">
    
    <div class="max-w-[894px] mx-auto pt-8 px-4 pb-16 space-y-8">
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div class="bg-white border border-[#E9EBEF] shadow-sm rounded-2xl p-8 flex flex-col items-center justify-center min-h-[270px]">
          <div class="relative w-32 h-32 mb-4">
            <div class="w-full h-full rounded-full bg-[url('Checker.png')] bg-cover shadow-[0_0_0_4px_rgba(64,185,255,0.2)] overflow-hidden">
              <img src="../assets/profile-placeholder.png" alt="Profile" class="w-full h-full object-cover hidden" />
            </div>
            <button 
              type="button"
              class="absolute bottom-0 right-0 w-10 h-10 bg-[#40B9FF] text-white rounded-full flex items-center justify-center shadow-md hover:bg-[#29aaff] transition-colors"
              aria-label="Change profile photo"
            >
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.67">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 0110 4h4a2.31 2.31 0 013.173 2.175l.173.866A1.155 1.155 0 0018.49 8H20.4A1.6 1.6 0 0122 9.6v10.4A1.6 1.6 0 0120.4 21.6H3.6A1.6 1.6 0 012 20v-10.4A1.6 1.6 0 013.6 8h1.91a1.155 1.155 0 001.144-.96l.173-.865z" />
                <circle cx="12" cy="13" r="3" />
              </svg>
            </button>
          </div>
          <h2 class="text-xl font-semibold text-[#1E1E24]">{{ fullName }}</h2>
          <p class="text-sm text-[#717182] mt-1">Click the camera icon to change photo</p>
        </div>

        <div class="bg-white border border-[#E9EBEF] shadow-sm rounded-2xl p-8 flex flex-col items-center justify-between min-h-[277px]">
          <div class="flex flex-col items-center w-full mt-2">
            <div class="relative w-32 h-32 mb-4">
              <div class="w-full h-full rounded-full bg-[url('Checker.png')] bg-cover shadow-[0_0_0_4px_rgba(64,185,255,0.2)] overflow-hidden">
                <img src="../assets/avatar-placeholder.png" alt="Avatar Preview" class="w-full h-full object-cover hidden" />
              </div>
              <button 
                type="button"
                class="absolute bottom-0 right-0 w-10 h-10 bg-[#40B9FF] text-white rounded-full flex items-center justify-center shadow-md hover:bg-[#29aaff] transition-colors"
                aria-label="Add Avatar Layer"
              >
                <svg class="w-6 h-6 border border-[#F1F5F9] rounded" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
            <p class="text-sm text-[#717182]">Create your Avatar</p>
          </div>

          <div class="flex items-center gap-4 w-full justify-center mt-4">
            <button 
              type="button" 
              class="w-24 h-[26px] bg-[#EA0234] text-white rounded-md text-xs font-medium shadow-sm hover:opacity-90 transition-opacity"
            >
              Delete
            </button>
            <button 
              type="button" 
              class="w-24 h-[26px] bg-[#AAE338] text-white rounded-md text-xs font-medium shadow-sm hover:opacity-90 transition-opacity"
            >
              Edit
            </button>
          </div>
        </div>

      </div>

      <div class="bg-white border border-[#E9EBEF] shadow-sm rounded-2xl p-8">
        <h3 class="text-lg font-semibold text-[#1E1E24] mb-6">Personal Information</h3>
        
        <form @submit.prevent="saveChanges" class="space-y-6">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div class="flex flex-col">
              <label class="text-sm font-medium text-[#1E1E24] mb-2">First Name</label>
              <div class="relative flex items-center">
                <input 
                  v-model="form.firstName" 
                  type="text" 
                  class="w-full h-12 px-4 bg-[#F9FAFB] border border-[#E9EBEF] rounded-l-xl text-base text-[#0A0A0A] focus:outline-none focus:border-[#40B9FF]"
                />
                <div class="absolute right-4 text-[#1E1E1E]">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </div>
              </div>
            </div>

            <div class="flex flex-col">
              <label class="text-sm font-medium text-[#1E1E24] mb-2">Last Name</label>
              <div class="relative flex items-center">
                <input 
                  v-model="form.lastName" 
                  type="text" 
                  class="w-full h-12 px-4 bg-[#F9FAFB] border border-[#E9EBEF] rounded-l-xl text-base text-[#0A0A0A] focus:outline-none focus:border-[#40B9FF]"
                />
                <div class="absolute right-4 text-[#1E1E1E]">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div class="flex flex-col">
            <label class="text-sm font-medium text-[#1E1E24] mb-2">Email</label>
            <div class="relative flex items-center">
              <div class="absolute left-4 text-[#717182]">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.67">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <input 
                v-model="form.email" 
                type="email" 
                readonly
                class="w-full h-12 pl-12 pr-4 bg-gray-100 border border-[#E9EBEF] rounded-xl text-base text-gray-500 focus:outline-none focus:border-[#40B9FF] cursor-not-allowed"
              />
            </div>
          </div>

          <div class="flex flex-col">
            <label class="text-sm font-medium text-[#1E1E24] mb-3">Gender</label>
            <div class="flex items-center gap-3">
              <button 
                type="button"
                @click="form.gender = 'male'"
                class="w-[84px] h-12 rounded-xl text-base font-medium transition-all shadow-sm"
                :class="form.gender === 'male' ? 'bg-[#40B9FF] text-white' : 'bg-[#F9FAFB] text-[#717182]'"
              >
                Male
              </button>
              <button 
                type="button"
                @click="form.gender = 'female'"
                class="w-[100px] h-12 rounded-xl text-base font-medium transition-all shadow-sm"
                :class="form.gender === 'female' ? 'bg-[#40B9FF] text-white' : 'bg-[#F9FAFB] text-[#717182]'"
              >
                Female
              </button>
            </div>
          </div>

          <div class="pt-8 border-t border-[#E9EBEF] flex items-center gap-4">
            <button 
              type="button" 
              @click="cancelEdits"
              class="flex-1 h-[51px] border border-[#E9EBEF] rounded-xl text-base font-medium text-[#717182] hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              class="flex-1 h-[51px] bg-[#8ED321] text-white rounded-xl text-base font-medium shadow-md hover:opacity-90 transition-opacity"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>

      <div class="w-full flex justify-center pt-4">
        <button 
          type="button"
          @click="confirmDeleteAccount"
          class="w-full max-w-[400px] h-[66px] bg-[#FFF5F5] border border-[#FFE5E5] rounded-ebd-xl rounded-[14px] px-5 flex items-center gap-3 hover:bg-[#ffebeb] transition-colors"
        >
          <div class="text-[#D4183D] flex items-center justify-center">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.67">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <span class="text-base font-medium text-[#D4183D]">Delete Account</span>
        </button>
      </div>

    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "EditProfile",
  setup() {
    const router = useRouter();

    const form = ref({
      firstName: "",
      lastName:  "",
      email:     "",
      gender:    "",
    });

    // Derived full name for the avatar card heading
    const fullName = computed(() =>
      [form.value.firstName, form.value.lastName].filter(Boolean).join(" ") || "—"
    );

    onMounted(() => {
      const raw = localStorage.getItem("user");
      if (!raw) {
        router.replace("/");
        return;
      }

      const user = JSON.parse(raw);

      // Pre-fill the form from localStorage
      form.value.firstName = user.first_name  || "";
      form.value.lastName  = user.last_name   || "";
      form.value.email     = user.email       || "";
      form.value.gender    = user.gender      || "";
    });

    const saveChanges = () => {
      console.log("Save:", form.value);
    };

    const cancelEdits = () => {
      const raw  = localStorage.getItem("user");
      const user = raw ? JSON.parse(raw) : {};
      form.value.firstName = user.first_name || "";
      form.value.lastName  = user.last_name  || "";
      form.value.email     = user.email      || "";
      form.value.gender    = user.gender     || "";
    };

    const confirmDeleteAccount = () => {
      console.log("Delete account requested");
    };

    return {
      form,
      fullName,
      saveChanges,
      cancelEdits,
      confirmDeleteAccount,
    };
  },
};
</script>