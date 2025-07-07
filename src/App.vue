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

<style>
* {
  box-sizing: border-box;
}

body {
  background: antiquewhite;
  font-family: 'Inter', sans-serif;
  color: #333;
  line-height: 1.6;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
