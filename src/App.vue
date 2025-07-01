<script setup lang="ts">
import { onMounted } from 'vue'
import { usePortfolioStore } from '@/stores/portfolioStore'

const portfolioStore = usePortfolioStore()

onMounted(() => {
  portfolioStore.loadFromLocalStorage()
})
</script>

<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<style scoped>

</style>
