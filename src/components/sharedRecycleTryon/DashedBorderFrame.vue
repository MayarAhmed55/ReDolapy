<template>
  <svg class="upload-border-svg" aria-hidden="true">
    <defs>
      <linearGradient :id="gradientId" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#40B9FF"/>
        <stop offset="50%" stop-color="#8ED321"/>
        <stop offset="100%" stop-color="#FF8A3D"/>
      </linearGradient>
    </defs>
    <rect
      class="upload-border-rect"
      x="2" y="2"
      :rx="radius" :ry="radius"
      fill="none"
      :stroke="`url(#${gradientId})`"
      stroke-width="2.5"
      stroke-dasharray="6 10"
    />
  </svg>
</template>

<script>
let borderId = 0

export default {
  name: 'DashedBorderFrame',
  props: {
    radius: { type: Number, default: 22 },
  },
  data() {
    borderId += 1
    return { gradientId: `dashGrad-${borderId}` }
  },
}
</script>

<style scoped>
.upload-border-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: visible;
}

.upload-border-rect {
  width: calc(100% - 4px);
  height: calc(100% - 4px);
  animation: dash-march 3s linear infinite;
}

@keyframes dash-march {
  to {
    stroke-dashoffset: -80;
  }
}
</style>
