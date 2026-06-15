<!-- AdminLayout.vue -->
<template>
  <div class="flex">
    <Sidebar />
    <h1>this is the dashboard</h1>
    <div class="flex-1">
      <Header />
      <RouterView />
    </div>
  </div>
</template>

<script>
    export default {
        name:"admin",
    }
</script>

<style lang="scss" scoped>

</style>