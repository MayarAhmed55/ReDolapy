<template>
  <div
    class="min-h-screen w-full bg-[#F5F6F7] flex text-[#191B23] font-sans antialiased"
  >
    <div class="flex-1 flex-col min-h-screen">
      <main class="flex-1 p-8 max-w-[100%] w-full mx-auto flex flex-col gap-8">
        <div class="w-full flex items-center justify-between">
          <div class="flex flex-col gap-1 max-w-[354.81px]">
            <h1
              class="text-[32px] font-semibold leading-10 tracking-[-0.64px] text-[#191B23]"
            >
              Add Store
            </h1>
            <p class="text-[14px] font-normal leading-5 text-[#434654]">
              Setup and configure a new localized or global deployment endpoint.
            </p>
          </div>
          <button
            type="button"
            :disabled="isSaving"
            @click="handleSaveStore"
            class="h-11 px-6 bg-[#1550D3] hover:bg-[#1550D3]/90 text-white text-base font-bold rounded-xl transition-all shadow-[0px_10px_15px_-3px_rgba(21,80,211,0.2),0px_4px_6px_-4px_rgba(21,80,211,0.2)] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {{ isSaving ? "Saving..." : "Save Store" }}
          </button>
        </div>

        <p v-if="saveError" class="text-[13px] font-medium text-[#B00020]">
          {{ saveError }}
        </p>
        <p v-if="saveSuccess" class="text-[13px] font-medium text-[#15803D]">
          Store created successfully.
        </p>

        <form @submit.prevent class="w-full flex flex-col gap-6">
          <section
            class="w-full bg-white border border-[#C3C5D7]/30 rounded-[16px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] p-8 flex flex-col gap-10"
          >
            <div class="w-full flex items-center gap-3">
              <img
                src="../../assets/Icon (28).svg"
                class="w-5 h-5 rounded-[4px] shrink-0"
              />
              <h3 class="text-2xl font-medium tracking-[-0.2px] text-[#191B23]">
                Store Profile
              </h3>
            </div>

            <div class="w-full flex flex-col gap-[61px]">
              <div class="w-full flex flex-col gap-2">
                <label
                  class="text-[12px] font-medium tracking-[0.24px] text-[#434654] uppercase"
                  >Store Name</label
                >
                <input
                  type="text"
                  v-model="name"
                  placeholder="e.g. Milan Flagship Digital"
                  class="w-full h-[50px] bg-[#FAF8FF] border border-[#C3C5D7] rounded-xl px-4 text-base font-normal text-[#191B23] placeholder-[#6B7280] focus:outline-none focus:border-[#1550D3] transition-colors"
                />
              </div>

              <div class="w-full flex flex-col gap-2">
                <label
                  class="text-[12px] font-medium tracking-[0.24px] text-[#434654] uppercase"
                  >Description</label
                >
                <textarea
                  rows="3"
                  v-model="description"
                  placeholder="Brief overview of the store's focus and target collection..."
                  class="w-full h-[98px] bg-[#FAF8FF] border border-[#C3C5D7] rounded-xl p-4 text-base font-normal text-[#191B23] placeholder-[#6B7280] focus:outline-none focus:border-[#1550D3] transition-colors resize-none overflow-y-auto"
                ></textarea>
              </div>

              <div class="w-full flex flex-col gap-2">
                <label
                  class="text-[12px] font-medium tracking-[0.24px] text-[#434654] uppercase"
                  >Website URL</label
                >
                <div class="w-full flex h-[50px]">
                  <span
                    class="h-full bg-[#EDEDF8] border border-r-0 border-[#C3C5D7] rounded-s-xl px-4 flex items-center justify-center text-[12px] font-serif- text-[#434654] select-none"
                  >
                    https://
                  </span>
                  <input
                    type="text"
                    v-model="websiteDomain"
                    placeholder="dolapy.store/milan-flagship"
                    class="flex-1 h-full bg-[#FAF8FF] border border-[#C3C5D7] rounded-e-xl px-4 text-base font-normal text-[#191B23] placeholder-[#6B7280] focus:outline-none focus:border-[#1550D3] transition-colors"
                  />
                </div>
              </div>
            </div>
          </section>

          <section
            class="w-full bg-white border border-[#C3C5D7]/30 rounded-[16px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] p-8 flex flex-col items-center gap-6"
          >
            <div class="w-full flex items-center gap-3">
              <img
                src="../../assets/Icon (30).svg"
                class="w-[18px] h-[18px] rounded-[4px] shrink-0"
              />
              <h3 class="text-2xl font-medium tracking-[-0.2px] text-[#191B23]">
                Brand Assets
              </h3>
            </div>

            <div
              class="w-full max-w-[459px] flex flex-col gap-3 mx-auto md:mx-0"
            >
              <label
                class="text-[12px] font-medium tracking-[0.24px] text-[#434654] uppercase"
                >Brand Logo</label
              >

              <input
                ref="logoFileInput"
                type="file"
                accept="image/*"
                class="hidden"
                @change="handleLogoFileChange"
              />

              <div
                class="w-full h-[130px] bg-[#FAF8FF] border-2 border-dashed border-[#C3C5D7] rounded-xl flex flex-col justify-center items-center gap-2 cursor-pointer hover:bg-[#F3F3FE]/40 transition-colors p-6 relative overflow-hidden"
                @click="logoFileInput?.click()"
                @dragover.prevent
                @drop.prevent="handleLogoDrop"
              >
                <img
                  v-if="logoUrl"
                  :src="logoUrl"
                  alt="Logo preview"
                  class="absolute inset-0 w-full h-full object-contain p-3 bg-[#FAF8FF]"
                />
                <template v-else>
                  <img
                    src="../../assets/Icon (31).svg"
                    class="w-6 h-[30px] opacity-70 rounded-sm"
                  />
                  <span
                    class="text-[14px] font-normal leading-5 text-[#434654] text-center"
                  >
                    {{ isCompressingLogo ? "Compressing..." : "Drag and drop or browse asset file" }}
                  </span>
                </template>
              </div>

              <button
                v-if="logoUrl"
                type="button"
                @click.stop="logoUrl = ''"
                class="text-[12px] font-medium text-[#B00020] self-start hover:opacity-75"
              >
                Remove logo
              </button>
            </div>
          </section>

          <section class="w-full bg-white border border-[#C3C5D7]/30 rounded-2xl shadow-[0px_1px_2px_rgba(0,0,0,0.05)] p-8 flex flex-col gap-6">
  <div class="flex items-center gap-3">
    <img src="../../assets/Icon (32).svg" class="w-5 h-5" />
    <h3 class="text-[20px] leading-7 font-medium tracking-[-0.2px] text-[#191B23]">
      Commerce
    </h3>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div class="flex flex-col gap-2">
      <label class="text-[12px] font-medium tracking-[0.24px] text-[#434654] h-[18px] flex items-center">
        DISCOUNT CODE
      </label>
      <input
        type="text"
        v-model="discountCode"
        :disabled="!discountsEnabled"
        placeholder="WELCOME10"
        :class="!discountsEnabled ? 'opacity-50 cursor-not-allowed' : ''"
        class="h-[50px] px-4 bg-[#FAF8FF] border border-[#C3C5D7] rounded-xl text-[16px] text-[#6B7280] outline-none"
      />
    </div>

    <div class="flex flex-col gap-2">
      <label class="text-[12px] font-medium tracking-[0.24px] text-[#434654] h-[18px] flex items-center">
        PERCENTAGE (%)
      </label>
      <input
        type="number"
        v-model.number="discountPercent"
        :disabled="!discountsEnabled"
        placeholder="15"
        :class="!discountsEnabled ? 'opacity-50 cursor-not-allowed' : ''"
        class="h-[50px] px-4 bg-[#FAF8FF] border border-[#C3C5D7] rounded-xl text-[16px] text-[#6B7280] outline-none"
      />
    </div>

    <div class="flex flex-col gap-2">
      <div class="h-[18px]" aria-hidden="true"></div>

      <div class="h-[50px] flex items-center">
        <label class="flex items-center cursor-pointer">
          <div class="relative">
            <input type="checkbox" v-model="discountsEnabled" class="sr-only peer" />
            <div
              class="w-[44px] h-[24px] rounded-full transition-colors"
              :class="discountsEnabled ? 'bg-[#1550D3]' : 'bg-[#C3C5D7]'"
            ></div>
            <div
              class="absolute top-[2px] w-[20px] h-[20px] rounded-full bg-white border border-white transition-all"
              :class="discountsEnabled ? 'left-[22px]' : 'left-[2px]'"
            ></div>
          </div>
          <span class="ml-3 text-[14px] leading-5 text-[#191B23]">
            Enable Discounts
          </span>
        </label>
      </div>
    </div>
  </div>
</section>
        </form>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import imageCompression from "browser-image-compression";
import { addStore } from "../../services/services"; // adjust this import path to match your project structure

const name = ref("");
const description = ref("");
const websiteDomain = ref("");
const logoUrl = ref("");
const logoFileInput = ref(null);
const isCompressingLogo = ref(false);

const discountCode = ref("");
const discountPercent = ref(null);
const discountsEnabled = ref(true);

const isSaving = ref(false);
const saveError = ref(null);
const saveSuccess = ref(false);

async function processLogoFile(file) {
  if (!file) return;

  isCompressingLogo.value = true;
  try {
    const compressedFile = await imageCompression(file, {
      maxSizeMB: 0.000000000001,
      maxWidthOrHeight: 709,
      useWebWorker: true,
    });

    const reader = new FileReader();
    reader.onload = () => {
      logoUrl.value = reader.result;
      isCompressingLogo.value = false;
    };
    reader.onerror = () => {
      console.error("Failed to read logo file");
      isCompressingLogo.value = false;
    };
    reader.readAsDataURL(compressedFile);
  } catch (err) {
    console.error("Logo compression failed:", err);
    isCompressingLogo.value = false;
  }
}

function handleLogoFileChange(e) {
  processLogoFile(e.target.files[0]);
}

function handleLogoDrop(e) {
  processLogoFile(e.dataTransfer.files[0]);
}

async function handleSaveStore() {
  if (!name.value.trim()) {
    saveError.value = "Store name is required.";
    saveSuccess.value = false;
    return;
  }

  isSaving.value = true;
  saveError.value = null;
  saveSuccess.value = false;

  try {
    await addStore({
      name: name.value.trim(),
      logo_url: logoUrl.value,
      description: description.value.trim(),
      discount_percent: discountsEnabled.value ? Number(discountPercent.value) || 0 : 0,
      discount_code: discountsEnabled.value ? discountCode.value.trim() : "",
      is_active: true,
      website_url: websiteDomain.value
        ? `https://${websiteDomain.value.replace(/^https?:\/\//, "")}`
        : "",
    });

    saveSuccess.value = true;

    // Reset the form after a successful save
    name.value = "";
    description.value = "";
    websiteDomain.value = "";
    logoUrl.value = "";
    discountCode.value = "";
    discountPercent.value = null;
    discountsEnabled.value = true;
  } catch (err) {
    console.error("Failed to create store:", err);
    saveError.value = "Failed to create store. Please try again.";
  } finally {
    isSaving.value = false;
  }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400&family=Geist:wght@400;500;600;700&display=swap");

.font-sans {
  font-family: "Geist", sans-serif;
}
.font-mono {
  font-family: "Geist", sans-serif;
}
</style>