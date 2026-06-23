<template>
  <div class="add-product-page">
    <!-- Content Area -->
    <div class="content-scroll">
      <div class="content-inner">
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
                'is-active': i === currentStep,
                'is-complete': i < currentStep,
                'is-upcoming': i > currentStep,
              }"
            >
              <CheckIcon v-if="i < currentStep" class="w-4 h-4" />
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
                <select id="store" v-model="form.store" class="field-select">
                  <option disabled value="">Select a store</option>
                  <option v-for="store in stores" :key="store" :value="store">
                    {{ store }}
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

            <div class="media-grid">
              <label class="media-dropzone">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  class="sr-only"
                  @change="onFilesSelected"
                />
                <UploadIcon class="w-[18px] h-[18px] text-[#1550D3]" />
                <span class="media-dropzone-text">Upload</span>
              </label>

              <div
                v-for="(image, idx) in images"
                :key="idx"
                class="media-thumb"
              >
                <img :src="image" alt="" class="media-thumb-img" />
                <button
                  type="button"
                  class="media-thumb-remove"
                  @click="removeImage(idx)"
                  aria-label="Remove image"
                >
                  <XIcon class="w-[7px] h-[7px]" />
                </button>
              </div>

              <div
                v-for="n in emptySlots"
                :key="'empty-' + n"
                class="media-empty"
              >
                <ImageIcon class="w-[14px] h-[14px] text-[#737686]" />
              </div>
            </div>
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
              <label class="field-label" for="tags">Tags</label>
              <div class="tags-input">
                <span
                  v-for="(tag, idx) in form.tags"
                  :key="tag"
                  class="tag-chip"
                >
                  {{ tag }}
                  <button
                    type="button"
                    class="tag-remove"
                    @click="removeTag(idx)"
                    aria-label="Remove tag"
                  >
                    <XIcon class="w-[8px] h-[8px]" />
                  </button>
                </span>
                <input
                  id="tags"
                  v-model="tagInput"
                  type="text"
                  class="tag-input-field"
                  placeholder="Add tag..."
                  @keydown.enter.prevent="addTag"
                  @keydown.backspace="onTagBackspace"
                />
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
                <label class="field-label" for="price">Price (USD)</label>
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
                <label class="field-label" for="purchase-url"
                  >Purchase URL</label
                >
                <input
                  id="purchase-url"
                  v-model="form.purchaseUrl"
                  type="url"
                  class="field-input"
                  placeholder="https://yourstore.com/product"
                />
              </div>
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
                :class="{ 'is-on': form.visible }"
                role="switch"
                :aria-checked="form.visible"
                @click="form.visible = !form.visible"
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
        <span class="footer-status">Draft auto-saved 2 minutes ago</span>
      </div>

      <div class="footer-right">
        <button type="button" class="btn-secondary" @click="$emit('cancel')">
          Save as draft
        </button>
        <div class="footer-divider"></div>
        <button type="button" class="btn-primary" @click="handleSubmit">
          <span>Publish product</span>
          <ArrowRightIcon class="w-[9px] h-[9px]" />
        </button>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, h } from "vue";

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
  { label: "Basic Info" },
  { label: "Media" },
  { label: "Classify" },
  { label: "Pricing" },
  { label: "Settings" },
];
const currentStep = ref(0);

/* ---------- Form state ---------- */
const stores = [
  "Flagship Boutique - Paris",
  "SoHo Concept Store",
  "Online Only",
];
const categories = ["Dresses & Gowns", "Outerwear", "Footwear", "Accessories"];
const subcategories = ["Evening Wear", "Daywear", "Bridal", "Resort"];

const form = ref({
  name: "",
  description: "",
  store: "Flagship Boutique - Paris",
  category: "Dresses & Gowns",
  subcategory: "Evening Wear",
  tags: ["New Arrival", "Limited Run", "Silk"],
  price: "",
  purchaseUrl: "",
  visible: true,
});

const tagInput = ref("");
function addTag() {
  const val = tagInput.value.trim();
  if (val && !form.value.tags.includes(val)) {
    form.value.tags.push(val);
  }
  tagInput.value = "";
}
function removeTag(idx) {
  form.value.tags.splice(idx, 1);
}
function onTagBackspace() {
  if (tagInput.value === "" && form.value.tags.length) {
    form.value.tags.pop();
  }
}

/* ---------- Media ---------- */
const images = ref([]);
const maxSlots = 3;
const emptySlots = computed(() => Math.max(0, maxSlots - images.value.length));

function onFilesSelected(e) {
  const files = Array.from(e.target.files || []);
  files.forEach((file) => {
    const reader = new FileReader();
    reader.onload = () => images.value.push(reader.result);
    reader.readAsDataURL(file);
  });
  e.target.value = "";
}
function removeImage(idx) {
  images.value.splice(idx, 1);
}

/* ---------- Submit ---------- */
const emit = defineEmits(["submit", "cancel"]);
function handleSubmit() {
  emit("submit", { ...form.value });
}

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
  height: 240px;
}
@media (max-width: 640px) {
  .media-grid {
    grid-template-columns: repeat(2, 1fr);
    height: auto;
  }
}
.media-dropzone {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 2px dashed var(--primary);
  border-radius: 12px;
  background: rgba(60, 107, 237, 0.08);
  cursor: pointer;
  transition: background 0.15s ease;
}
.media-dropzone:hover {
  background: rgba(60, 107, 237, 0.14);
}
.media-dropzone-text {
  font-size: 10px;
  font-weight: 700;
  line-height: 15px;
  text-transform: uppercase;
  color: var(--primary);
  letter-spacing: 0.4px;
}
.media-thumb {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--border);
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
.media-empty {
  border: 1px solid var(--border);
  border-radius: 12px;
  background: var(--primary-soft);
  display: flex;
  align-items: center;
  justify-content: center;
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
</style>
