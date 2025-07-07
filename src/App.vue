<template>
  <RouterView />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { usePortfolioStore } from '@/stores/portfolioStore';

const portfolioStore = usePortfolioStore();

onMounted(() => {
  portfolioStore.loadFromLocalStorage();
});
</script>

<style lang="scss">
@use '@/assets/styles/main';
</style>
