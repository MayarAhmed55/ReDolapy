<template>
    <div>
        <input class="card" type="text" :placeholder="placeholder">
        <div class="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none text-gray-500 dark:text-gray-400"></div>
        <slot>
      <slot></slot></slot>

    </div>
</template>

<script>
export default {
    name: 'Search',
    props: {
        placeholder: {
            type: String, // Capitalized 'String'
            default: ''   // Good practice to provide a fallback default
        }
    }
}
</script>

<style scoped>
.card {
    /* width: 100%; */
    /* background-color: blue; */
    border-radius: 1em;
    padding: 0.5rem;
    box-shadow: 0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 0.1), -0.1rem -0.1rem 0.1rem rgba(0, 0, 0, 0.1);
}
</style>