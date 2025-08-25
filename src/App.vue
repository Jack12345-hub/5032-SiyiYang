<!-- src/App.vue -->
<template>
  <div class="min-vh-100 d-flex flex-column">
    <BHeader />

    <main class="flex-grow-1">
      <!-- Route outlet: renders HomeView / AboutView -->
      <router-view />
    </main>
  </div>
</template>

<script setup>
import BHeader from './components/BHeader.vue'
</script>

<style scoped>
/* optional layout helpers (Bootstrap already handles most) */
</style>
