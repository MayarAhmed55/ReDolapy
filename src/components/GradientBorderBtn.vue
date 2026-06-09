<template>
    <div>
        <a v-if="isAnchorLink" :href="routeTo" class="no-underline block" @click="handleScroll">
            <button :id="id" class="font-semibold gradient-btn-border">
                <div class="gradient-btn-content">
                    {{ Description }}
                </div>
            </button>
        </a>

        <router-link v-else :to="routeTo" class="no-underline block">
            <button :id="id" class="font-semibold gradient-btn-border">
                <div class="gradient-btn-content">
                    {{ Description }}
                </div>
            </button>
        </router-link>


        <!-- <button id="aboutRecycle" class="font-semibold gradient-btn-border">
            <router-link :to="routeTo" class="no-underline">
                <div class="gradient-btn-content">
                    {{ Description }}
                </div>
            </router-link>
        </button> -->
    </div>
</template>

<script>
export default {
    name: 'GradientBorderBtn',
    props: {
        Description: String,
        routeTo: {
            type: String,
            default: '#'
        },
    },
    computed: {
    isAnchorLink() {
      return this.routeTo && this.routeTo.startsWith('#');
    }
  },
  // 💡 2. Add this methods block to execute your custom smooth scroll behavior
  methods: {
    handleScroll(event) {
      event.preventDefault(); // Stop the default instant page jump
      
      const targetElement = document.querySelector(this.routeTo);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
        
        // Cleanly updates URL hash bar without breaking the smooth scroll
        window.history.pushState(null, null, this.routeTo);
      }
    }
}
}
</script>

<style scoped>
@import '../assets/Style.css';

.gradient-btn-border {
    width: 100%;
    border-radius: 0.5em;

    background: linear-gradient(90deg, #8ED321 0%, #40B9FF 50%, #FF8E40 100%);
    padding: 0.2rem;
    cursor: pointer;
}

.gradient-btn-content {
    background-color: var(--primary-bgc);
    border-radius: 0.5rem;
    padding: 0.8rem 1.8rem;

    align-items: center;
    justify-content: center;
    transition: background-color 0.2s ease;
}
</style>