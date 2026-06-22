<template>
  <div class="add-product-page">
    <!-- Content Area -->
    <div class="content-scroll">
      <div class="content-inner">
        <!-- Success banner -->
        <div v-if="published" class="success-banner">
          <span class="success-icon">✓</span>
          <span>Product published successfully! The form has been cleared and is ready for a new entry.</span>
        </div>

        <!-- Progress Stepper -->
        <nav class="stepper" aria-label="Add product progress">
          <div class="stepper-line"></div>
          <div
            v-for="(step, i) in steps"
            :key="step.label"
            class="stepper-step"
          >
            <div
              class="stepper-circle"
              :class="{
                'is-active': i === currentStep && !stepCompleted[i],
                'is-complete': stepCompleted[i],
                'is-upcoming': i !== currentStep && !stepCompleted[i],
              }"
            >
              <CheckIcon v-if="stepCompleted[i]" class="w-4 h-4" />
              <span v-else>{{ i + 1 }}</span>
            </div>
            <span
              class="stepper-label"
              :class="{ 'is-active': i === currentStep }"
              >{{ step.label }}</span
            >
          </div>
        </nav>

        <form class="form-sections" @submit.prevent="handleSubmit">
          <!-- Section 1: Basic Info -->
          <section class="form-section">
            <div class="flex items-center">
              <div
                class="w-[6px] h-[24px] bg-blue-700 rounded-full shrink-0"
              ></div>
              <SectionHeading class="font-bold">
                Basic Information
              </SectionHeading>
            </div>

            <div class="field">
              <label class="field-label" for="product-name">Product Name</label>
              <input
                id="product-name"
                v-model="form.name"
                type="text"
                class="field-input"
                placeholder="e.g. Midnight Silk Gala Gown"
              />
            </div>

            <div class="field">
              <label class="field-label" for="description">Description</label>
              <textarea
                id="description"
                v-model="form.description"
                rows="4"
                class="field-textarea"
                placeholder="Describe the materials, fit, and aesthetic details..."
              ></textarea>
            </div>

            <div class="field">
              <label class="field-label" for="store">Assigned Store</label>
              <div class="select-wrap">
                <select id="store" v-model="form.store_id" class="field-select" :disabled="storesLoading">
                  <option disabled value="">{{ storesLoading ? 'Loading stores…' : 'Select a store' }}</option>
                  <option v-for="store in stores" :key="store.id" :value="store.id">
                    {{ store.name }}
                  </option>
                </select>
                <ChevronDownIcon class="select-chevron" />
              </div>
            </div>
          </section>

          <!-- Section 2: Media -->
          <section class="form-section">
            <div class="flex items-center">
              <div
                class="w-[6px] h-[24px] bg-blue-700 rounded-full shrink-0"
              ></div>
              <SectionHeading class="font-bold"> Product Media </SectionHeading>
            </div>

            <!-- URL input row -->
            <div class="field">
              <label class="field-label" for="image-url">Image URL</label>
              <div class="url-input-row">
                <input
                  id="image-url"
                  v-model="imageUrlInput"
                  type="url"
                  class="field-input"
                  placeholder="https://example.com/image.jpg"
                  @keydown.enter.prevent="addImageUrl"
                />
                <button
                  type="button"
                  class="btn-add-url"
                  @click="addImageUrl"
                >
                  Add
                </button>
              </div>
              <p v-if="imageUrlError" class="url-error">{{ imageUrlError }}</p>
            </div>

            <!-- Preview grid -->
            <div class="media-grid" v-if="images.length > 0">
              <div
                v-for="(image, idx) in images"
                :key="idx"
                class="media-thumb"
              >
                <img :src="image" alt="" class="media-thumb-img" @error="onImageError(idx)" />
                <button
                  type="button"
                  class="media-thumb-remove"
                  @click="removeImage(idx)"
                  aria-label="Remove image"
                >
                  <XIcon class="w-[7px] h-[7px]" />
                </button>
              </div>
            </div>
            <p v-else class="media-empty-hint">No images added yet. Paste a URL above and click Add.</p>
          </section>

          <!-- Section 3: Classification -->
          <section class="form-section">
            <div class="flex items-center">
              <div
                class="w-[6px] h-[24px] bg-blue-700 rounded-full shrink-0"
              ></div>
              <SectionHeading class="font-bold">
                Classification
              </SectionHeading>
            </div>
            <div class="two-col">
              <div class="field">
                <label class="field-label" for="category"
                  >Primary Category</label
                >
                <div class="select-wrap">
                  <select
                    id="category"
                    v-model="form.category"
                    class="field-select"
                  >
                    <option disabled value="">Select category</option>
                    <option v-for="c in categories" :key="c" :value="c">
                      {{ c }}
                    </option>
                  </select>
                  <ChevronDownIcon class="select-chevron" />
                </div>
              </div>

              <div class="field">
                <label class="field-label" for="subcategory"
                  >Sub-Category</label
                >
                <div class="select-wrap">
                  <select
                    id="subcategory"
                    v-model="form.subcategory"
                    class="field-select"
                  >
                    <option disabled value="">Select sub-category</option>
                    <option v-for="s in subcategories" :key="s" :value="s">
                      {{ s }}
                    </option>
                  </select>
                  <ChevronDownIcon class="select-chevron" />
                </div>
              </div>
            </div>

            <div class="field">
              <label class="field-label" for="color-tags">Color Tags</label>
              <div class="tags-input">
                <span
                  v-for="(tag, idx) in form.color_tags"
                  :key="tag"
                  class="tag-chip"
                >
                  {{ tag }}
                  <button
                    type="button"
                    class="tag-remove"
                    @click="removeColorTag(idx)"
                    aria-label="Remove tag"
                  >
                    <XIcon class="w-[8px] h-[8px]" />
                  </button>
                </span>
                <input
                  id="color-tags"
                  v-model="colorTagInput"
                  type="text"
                  class="tag-input-field"
                  placeholder="Add color (e.g. blue)..."
                  @keydown.enter.prevent="addColorTag"
                  @keydown.backspace="onColorTagBackspace"
                />
              </div>
            </div>

            <div class="field">
              <label class="field-label">Season Tags</label>
              <div class="season-tags">
                <button
                  v-for="s in SEASON_OPTIONS"
                  :key="s"
                  type="button"
                  class="season-btn"
                  :class="{ 'season-btn--active': form.season_tags.includes(s) }"
                  @click="toggleSeason(s)"
                >
                  {{ s.charAt(0).toUpperCase() + s.slice(1) }}
                </button>
              </div>
            </div>
          </section>

          <!-- Section 4: Pricing -->
          <section class="form-section">
            <div class="flex items-center">
              <div
                class="w-[6px] h-[24px] bg-blue-700 rounded-full shrink-0"
              ></div>
              <SectionHeading class="font-bold">
                Pricing & Commerce</SectionHeading
              >
            </div>

            <div class="two-col">
              <div class="field">
                <label class="field-label" for="price">Price</label>
                <div class="price-input-wrap">
                  <span class="price-prefix">$</span>
                  <input
                    id="price"
                    v-model="form.price"
                    type="number"
                    min="0"
                    step="0.01"
                    class="price-input"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div class="field">
                <label class="field-label" for="currency">Currency</label>
                <div class="select-wrap">
                  <select id="currency" v-model="form.currency" class="field-select">
                    <option v-for="c in CURRENCIES" :key="c" :value="c">{{ c }}</option>
                  </select>
                  <ChevronDownIcon class="select-chevron" />
                </div>
              </div>
            </div>

            <div class="field">
              <label class="field-label" for="purchase-url">Purchase URL</label>
              <input
                id="purchase-url"
                v-model="form.purchaseUrl"
                type="url"
                class="field-input"
                placeholder="https://yourstore.com/product"
              />
            </div>
          </section>

          <!-- Section 5: Settings -->
          <section class="form-section">
            <div class="flex items-center">
              <div
                class="w-[6px] h-[24px] bg-blue-700 rounded-full shrink-0"
              ></div>
              <SectionHeading class="font-bold">
                Advanced Settings
              </SectionHeading>
            </div>

            <div class="settings-card">
              <div class="settings-card-left">
                <div class="settings-icon">
                  <EyeIcon class="w-[21px] h-[21px] text-[#1550D3]" />
                </div>
                <div>
                  <h4 class="settings-title">Visible in store</h4>
                  <p class="settings-desc">
                    Customers can see and purchase this product immediately
                  </p>
                </div>
              </div>
              <button
                type="button"
                class="toggle"
                :class="{ 'is-on': form.is_active }"
                role="switch"
                :aria-checked="form.is_active"
                @click="form.is_active = !form.is_active"
              >
                <span class="toggle-knob"></span>
              </button>
            </div>

            <div class="settings-card">
              <div class="settings-card-left">
                <div class="settings-icon">
                  <EyeIcon class="w-[21px] h-[21px] text-[#1550D3]" />
                </div>
                <div>
                  <h4 class="settings-title">Enable Virtual Try-On</h4>
                  <p class="settings-desc">
                    Allow customers to virtually try on this product
                  </p>
                </div>
              </div>
              <button
                type="button"
                class="toggle"
                :class="{ 'is-on': form.try_on_enabled }"
                role="switch"
                :aria-checked="form.try_on_enabled"
                @click="form.try_on_enabled = !form.try_on_enabled"
              >
                <span class="toggle-knob"></span>
              </button>
            </div>
          </section>
        </form>
      </div>
    </div>

    <!-- Sticky Footer Action Bar -->
    <footer class="footer-bar">
      <div class="footer-left">
        <div class="avatar-stack">
          <div class="avatar avatar-primary">JD</div>
          <div class="avatar avatar-secondary">+2</div>
        </div>
        <span v-if="submitError" class="footer-error">{{ submitError }}</span>
        <span v-else class="footer-status">Fill in all fields then publish</span>
      </div>

      <div class="footer-right">
        <button type="button" class="btn-secondary" @click="$emit('cancel')">
          Save as draft
        </button>
        <div class="footer-divider"></div>
        <button type="button" class="btn-primary" :disabled="submitting" @click="handleSubmit">
          <span>{{ submitting ? 'Publishing…' : 'Publish product' }}</span>
          <ArrowRightIcon class="w-[9px] h-[9px]" />
        </button>
      </div>
    </footer>
  </div>
</template>

<script setup>
/* ---------- Imports ---------- */
import { ref, computed, watch, h, onMounted } from "vue";
import { getStores, addProduct } from "../../services/services";

/* ---------- Lightweight inline icon components (no external deps) ---------- */

/* ---------- Lightweight inline icon components (no external deps) ---------- */
const iconBase = (paths) => (props) =>
  h(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": "2",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      class: props.class,
    },
    paths.map((d) => h("path", { d })),
  );

const CheckIcon = iconBase(["M20 6L9 17l-5-5"]);
const ChevronDownIcon = iconBase(["M6 9l6 6 6-6"]);
const UploadIcon = iconBase(["M12 16V4M7 9l5-5 5 5", "M5 20h14"]);
const ImageIcon = iconBase([
  "M3 3h18v18H3z",
  "M8.5 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3z",
  "M21 15l-5-5L5 21",
]);
const XIcon = iconBase(["M18 6L6 18", "M6 6l12 12"]);
const EyeIcon = iconBase([
  "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z",
  "M12 15a3 3 0 100-6 3 3 0 000 6z",
]);
const ArrowRightIcon = iconBase(["M5 12h14", "M12 5l7 7-7 7"]);

/* ---------- Stepper config ---------- */
const steps = [
  { label: "Basic Information" },
  { label: "Product Media" },
  { label: "Classification" },
  { label: "Pricing & Commerce" },
  { label: "Advanced Settings" },
];
const currentStep = ref(0);

/* ---------- Stepper: each step's completion is independent of the others.
   Admin does not need to complete steps in sequence — any step that has
   its required fields filled in is marked complete in the nav, regardless
   of whether earlier/later steps are done. ---------- */
const stepCompleted = computed(() => SECTION_FIELDS.map((isDone) => !!isDone()));

/* "currentStep" is only used to highlight the next outstanding step as
   "active" for guidance — it no longer gates whether a step can show as
   complete. */
function computeCurrentStep() {
  for (let i = 0; i < SECTION_FIELDS.length; i++) {
    if (!SECTION_FIELDS[i]()) return i;
  }
  return SECTION_FIELDS.length - 1;
}

/* ---------- Stores (fetched from API) ---------- */
const stores = ref([]);
const storesLoading = ref(false);

async function fetchStores() {
  storesLoading.value = true;
  try {
    const res = await getStores();
    const raw = Array.isArray(res.data) ? res.data : (res.data?.stores ?? []);
    stores.value = raw.map((s) => ({ id: s._id, name: s.name }));
  } catch (err) {
    console.error("Failed to fetch stores", err);
  } finally {
    storesLoading.value = false;
  }
}

const categories = ["top", "bottom", "dress", "outerwear", "footwear", "accessory", "bag"];
const subcategories = ["Evening Wear", "Daywear", "Bridal", "Resort", "Casual", "Sport"];

const CURRENCIES = ["USD", "EUR", "GBP", "EGP"];

/* ---------- Form state ---------- */
const form = ref({
  name: "",
  description: "",
  store_id: "",
  category: "",
  subcategory: "",
  color_tags: [],
  season_tags: [],
  price: "",
  currency: "USD",
  purchaseUrl: "",
  try_on_enabled: false,
  is_active: true,
});

/* ---------- Color tags ---------- */
const colorTagInput = ref("");
function addColorTag() {
  const val = colorTagInput.value.trim().toLowerCase();
  if (val && !form.value.color_tags.includes(val)) {
    form.value.color_tags.push(val);
  }
  colorTagInput.value = "";
}
function removeColorTag(idx) { form.value.color_tags.splice(idx, 1); }
function onColorTagBackspace() {
  if (colorTagInput.value === "" && form.value.color_tags.length) form.value.color_tags.pop();
}

/* ---------- Season tags ---------- */
const SEASON_OPTIONS = ["spring", "summer", "autumn", "winter"];
function toggleSeason(s) {
  const idx = form.value.season_tags.indexOf(s);
  if (idx === -1) form.value.season_tags.push(s);
  else form.value.season_tags.splice(idx, 1);
}

const tagInput = ref("");
function addTag() {
  const val = tagInput.value.trim();
  if (val && !form.value.color_tags.includes(val)) {
    form.value.color_tags.push(val);
  }
  tagInput.value = "";
}
function removeTag(idx) { form.value.color_tags.splice(idx, 1); }
function onTagBackspace() {
  if (tagInput.value === "" && form.value.color_tags.length) form.value.color_tags.pop();
}

/* ---------- Media (URL-based) ---------- */
const images = ref([]);
const imageUrlInput = ref("");
const imageUrlError = ref("");

function addImageUrl() {
  const url = imageUrlInput.value.trim();
  if (!url) return;
  try { new URL(url); } catch {
    imageUrlError.value = "Please enter a valid URL.";
    return;
  }
  if (images.value.includes(url)) {
    imageUrlError.value = "This URL has already been added.";
    return;
  }
  images.value.push(url);
  imageUrlInput.value = "";
  imageUrlError.value = "";
}

function removeImage(idx) {
  images.value.splice(idx, 1);
}

function onImageError(idx) {
  images.value.splice(idx, 1);
}

/* ---------- Stepper: which fields must be filled per step ---------- */
const SECTION_FIELDS = [
  // step 0 – Basic Information
  () => form.value.name && form.value.description && form.value.store_id,
  // step 1 – Product Media
  () => images.value.length > 0,
  // step 2 – Classification
  () => form.value.category,
  // step 3 – Pricing & Commerce
  () => form.value.price && form.value.purchaseUrl,
  // step 4 – Advanced Settings (always complete)
  () => true,
];

watch(
  () => [
    form.value.name,
    form.value.description,
    form.value.store_id,
    images.value.length,
    form.value.category,
    form.value.price,
    form.value.purchaseUrl,
  ],
  () => {
    currentStep.value = computeCurrentStep();
  },
  { deep: true },
);

/* ---------- Submit ---------- */
const emit = defineEmits(["submit", "cancel"]);
const submitting = ref(false);
const submitError = ref("");
const published = ref(false);

function resetForm() {
  form.value = {
    name: "",
    description: "",
    store_id: "",
    category: "",
    subcategory: "",
    color_tags: [],
    season_tags: [],
    price: "",
    currency: "USD",
    purchaseUrl: "",
    try_on_enabled: false,
    is_active: true,
  };
  images.value = [];
  imageUrlInput.value = "";
  imageUrlError.value = "";
  colorTagInput.value = "";
  currentStep.value = 0;
}

async function handleSubmit() {
  submitting.value = true;
  submitError.value = "";
  published.value = false;
  try {
    const payload = {
      store_id:       form.value.store_id,
      name:           form.value.name,
      description:    form.value.description,
      images:         images.value,
      category:       form.value.category,
      color_tags:     form.value.color_tags,
      season_tags:    form.value.season_tags,
      price:          parseFloat(form.value.price) || 0,
      currency:       form.value.currency,
      purchase_url:   form.value.purchaseUrl,
      try_on_enabled: form.value.try_on_enabled,
      is_active:      form.value.is_active,
    };
    const res = await addProduct(payload);
    emit("submit", res.data);
    resetForm();
    published.value = true;
    setTimeout(() => { published.value = false; }, 5000);
  } catch (err) {
    console.error("Failed to add product", err);
    submitError.value = err?.response?.data?.message ?? "Something went wrong. Please try again.";
  } finally {
    submitting.value = false;
  }
}

onMounted(() => {
  fetchStores();
});

/* ---------- Small reusable heading component ---------- */
const SectionHeading = {
  props: ["title"],
  setup(_, { slots }) {
    return () =>
      h("div", { class: "section-heading" }, [
        h("span", { class: "section-heading-bar" }),
        h(
          "h3",
          { class: "section-heading-text" },
          slots.default ? slots.default() : "",
        ),
      ]);
  },
};
</script>

<style scoped>
/* ===== Design tokens ===== */
.add-product-page {
  --bg: #faf8ff;
  --border: #c3c5d7;
  --primary: #1550d3;
  --primary-soft: #f3f3fe;
  --primary-soft-2: #ededf8;
  --primary-light: #dce1ff;
  --text-strong: #191b23;
  --text-body: #434654;
  --text-muted: #6b7280;
  --text-faint: #737686;

  position: relative;
  width: 100%;
  height: 100%;
  background: var(--bg);
  font-family:
    "Geist",
    system-ui,
    -apple-system,
    sans-serif;
  color: var(--text-strong);
  display: flex;
  flex-direction: column;
}

/* ===== Scroll area ===== */
.content-scroll {
  flex: 1;
  overflow-y: auto;
  padding: 32px 0 32px;
}
.content-inner {
  max-width: 768px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  gap: 48px;
}

/* ===== Stepper ===== */
.stepper {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;
}
.stepper-line {
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-1px);
  height: 2px;
  background: var(--border);
  z-index: 0;
}
.stepper-step {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 0 8px;
  background: var(--bg);
}
.stepper-circle {
  width: 32px;
  height: 32px;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
  flex-shrink: 0;
}
.stepper-circle.is-active {
  background: var(--primary);
  color: #fff;
}
.stepper-circle.is-complete {
  background: #3c6bed;
  color: #fffbff;
}
.stepper-circle.is-upcoming {
  background: #e2e1ed;
  color: var(--text-body);
}
.stepper-label {
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0.24px;
  color: var(--text-body);
  white-space: nowrap;
}
.stepper-label.is-active {
  color: var(--primary);
}

/* ===== Form sections ===== */
.form-sections {
  display: flex;
  flex-direction: column;
  gap: 40px;
}
.form-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.section-heading {
  display: flex;
  align-items: center;
  gap: 12px;
}
.section-heading-bar {
  width: 6px;
  height: 24px;
  border-radius: 9999px;
  background: var(--primary);
  flex-shrink: 0;
}
.section-heading-text {
  font-size: 20px;
  font-weight: 700;
  line-height: 28px;
  letter-spacing: -0.2px;
  color: var(--text-strong);
}

/* ===== Fields ===== */
.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.field-label {
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0.24px;
  color: var(--text-body);
}
.field-input,
.field-textarea,
.field-select {
  width: 100%;
  box-sizing: border-box;
  background: #ffffff;
  border: 1px solid var(--border);
  border-radius: 8px;
  font-family: inherit;
  font-size: 16px;
  color: var(--text-strong);
  padding: 13px 16px 14px;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;
}
.field-input::placeholder,
.field-textarea::placeholder {
  color: var(--text-muted);
}
.field-textarea {
  min-height: 122px;
  resize: vertical;
  line-height: 24px;
}
.field-input:focus,
.field-textarea:focus,
.field-select:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(21, 80, 211, 0.12);
}

.select-wrap {
  position: relative;
}
.field-select {
  appearance: none;
  padding-right: 44px;
  cursor: pointer;
}
.select-chevron {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  color: var(--text-muted);
  pointer-events: none;
}

.two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}
@media (max-width: 640px) {
  .two-col {
    grid-template-columns: 1fr;
  }
}

/* ===== Media ===== */
.media-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  min-height: 120px;
}
@media (max-width: 640px) {
  .media-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
.media-thumb {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--border);
  aspect-ratio: 1;
}
.media-thumb-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.media-thumb-remove {
  position: absolute;
  top: 9px;
  right: 9px;
  width: 24px;
  height: 24px;
  border-radius: 9999px;
  background: #ba1a1a;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.15s ease;
}
.media-thumb:hover .media-thumb-remove {
  opacity: 1;
}

/* URL input row */
.url-input-row {
  display: flex;
  gap: 8px;
}
.url-input-row .field-input {
  flex: 1;
}
.btn-add-url {
  flex-shrink: 0;
  padding: 0 20px;
  height: 50px;
  border-radius: 8px;
  border: none;
  background: var(--primary);
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
}
.btn-add-url:hover { background: #103fa8; }

.url-error {
  margin: 4px 0 0;
  font-size: 12px;
  color: #dc2626;
}

.media-empty-hint {
  font-size: 13px;
  color: var(--text-faint);
  text-align: center;
  padding: 24px;
  border: 1px dashed var(--border);
  border-radius: 12px;
  margin: 0;
}

/* ===== Success banner ===== */
.success-banner {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  background: #e6f4ef;
  border: 1px solid #a3d9c2;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  color: #006c49;
}
.success-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #006c49;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  flex-shrink: 0;
}

/* ===== Tags ===== */
.tags-input {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  min-height: 50px;
  padding: 10px 12px;
  background: #ffffff;
  border: 1px solid var(--border);
  border-radius: 8px;
}
.tag-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 9999px;
  background: #6cf8bb;
  color: #00714d;
  font-size: 12px;
  font-weight: 700;
  line-height: 16px;
}
.tag-remove {
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: #00714d;
  cursor: pointer;
  padding: 0;
}
.tag-input-field {
  flex: 1;
  min-width: 96px;
  border: none;
  outline: none;
  font-size: 12px;
  font-family: inherit;
  color: var(--text-strong);
  background: transparent;
}
.tag-input-field::placeholder {
  color: var(--text-muted);
}

/* ===== Pricing ===== */
.price-input-wrap {
  position: relative;
  display: flex;
  align-items: center;
}
.price-prefix {
  position: absolute;
  left: 16px;
  font-size: 16px;
  font-weight: 700;
  color: var(--text-faint);
  pointer-events: none;
}
.price-input {
  width: 100%;
  box-sizing: border-box;
  padding: 13px 16px 14px 33px;
  background: #ffffff;
  border: 1px solid var(--border);
  border-radius: 8px;
  font-family: inherit;
  font-size: 16px;
  color: var(--text-strong);
}
.price-input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(21, 80, 211, 0.12);
}
.price-input::-webkit-outer-spin-button,
.price-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* ===== Settings card ===== */
.settings-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 24px;
  background: var(--primary-soft);
  border: 1px solid var(--border);
  border-radius: 16px;
}
.settings-card-left {
  display: flex;
  align-items: center;
  gap: 16px;
}
.settings-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: var(--primary-light);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.settings-title {
  font-size: 12px;
  font-weight: 700;
  line-height: 16px;
  letter-spacing: 0.24px;
  color: var(--text-strong);
  margin: 0 0 2px;
}
.settings-desc {
  font-size: 11px;
  line-height: 16px;
  color: var(--text-body);
  margin: 0;
}

.toggle {
  width: 44px;
  height: 24px;
  border-radius: 9999px;
  background: var(--border);
  position: relative;
  border: none;
  cursor: pointer;
  flex-shrink: 0;
  transition: background 0.15s ease;
}
.toggle.is-on {
  background: var(--primary);
}
.toggle-knob {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  border-radius: 9999px;
  background: #fff;
  border: 1px solid #fff;
  transition: transform 0.15s ease;
}
.toggle.is-on .toggle-knob {
  transform: translateX(20px);
}

/* ===== Footer ===== */
.footer-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 0 32px;
  height: 80px;
  background: rgba(250, 248, 255, 0.9);
  border-top: 1px solid var(--border);
  box-shadow: 0px -4px 24px rgba(0, 0, 0, 0.04);
  backdrop-filter: blur(12px);
  flex-shrink: 0;
}
.footer-left {
  display: flex;
  align-items: center;
  gap: 16px;
  min-width: 0;
}
.avatar-stack {
  display: flex;
  align-items: center;
}
.avatar {
  width: 32px;
  height: 32px;
  border-radius: 9999px;
  border: 2px solid var(--bg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 700;
  color: var(--text-strong);
}
.avatar-primary {
  background: #3c6bed;
  z-index: 1;
}
.avatar-secondary {
  background: var(--primary-soft-2);
  color: var(--text-faint);
  margin-left: -8px;
}
.footer-status {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-body);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.footer-right {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
}
.footer-divider {
  width: 1px;
  height: 24px;
  background: var(--border);
}
.btn-secondary {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 24px;
  border-radius: 12px;
  border: none;
  background: transparent;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.24px;
  color: var(--text-body);
  cursor: pointer;
  transition: background 0.15s ease;
  white-space: nowrap;
}
.btn-secondary:hover {
  background: var(--primary-soft-2);
}
.btn-primary {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 32px;
  border-radius: 12px;
  border: none;
  background: var(--primary);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.24px;
  color: #fff;
  cursor: pointer;
  transition: background 0.15s ease;
  white-space: nowrap;
}
.btn-primary:hover {
  background: #103fa8;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Focus visibility for accessibility */
.media-dropzone:focus-within,
.toggle:focus-visible,
.btn-primary:focus-visible,
.btn-secondary:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

/* ===== Season tags ===== */
.season-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.season-btn {
  padding: 6px 18px;
  border-radius: 9999px;
  border: 1px solid var(--border);
  background: #ffffff;
  font-size: 12px;
  font-weight: 500;
  color: var(--text-body);
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s, color 0.15s;
}
.season-btn--active {
  background: var(--primary);
  border-color: var(--primary);
  color: #ffffff;
}

/* ===== Footer error ===== */
.footer-error {
  font-size: 13px;
  font-weight: 500;
  color: #dc2626;
}

/* ===== Disabled button ===== */
.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>