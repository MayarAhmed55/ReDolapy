<template>
  <button class="custom-btn" @click="handleClick">
    <span class="icon-container">
      <slot name="icon">
        <img src="../../assets/Icon (33).svg" class="icon-container" />
      </slot>
    </span>

    <span class="btn-text">
      <slot>Add Product</slot>
    </span>
  </button>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const emit = defineEmits(["click"]);

function handleClick() {
  emit("click");
  router.push("/admin/addProduct");
}
</script>

<style scoped>
/* Button */
.custom-btn {
  /* Auto layout */
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 20px;
  gap: 8px;

  width: 158.5px;
  height: 32px;

  background: #1550d3;
  border-radius: 9999px;

  /* Inside auto layout */
  flex: none;
  order: 0;
  flex-grow: 0;

  /* تحسينات إضافية لتنظيف افتراضيات المتصفح للمشغلات */
  border: none;
  cursor: pointer;
  outline: none;
  box-sizing: border-box;
}

/* Container */
.icon-container {
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;

  width: 10.5px;
  height: 10.5px;

  /* Inside auto layout */
  flex: none;
  order: 0;
  flex-grow: 0;
  box-sizing: border-box;
}

/* Icon */
.default-icon {
  width: 10.5px;
  height: 10.5px;

  background: #ffffff;

  /* Inside auto layout */
  flex: none;
  order: 0;
  flex-grow: 0;
}

/* Add notifications text */
.btn-text {
  width: 100px;
  height: 16px;

  font-family: "Geist", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px; /* 133% */
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center; /* لضمان توسط النص تماماً */
  letter-spacing: 0.24px;

  color: #ffffff;

  /* Inside auto layout */
  flex: none;
  order: 1;
  flex-grow: 0;
}

/* تأثير بسيط عند تمرير الفأرة (اختياري) */
.custom-btn:hover {
  background: #1244b3;
}
</style>
