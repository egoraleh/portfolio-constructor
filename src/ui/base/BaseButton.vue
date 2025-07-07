<template>
  <button
    :class="['base-button', customClass]"
    v-bind="$attrs"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  customClass?: string
}>();

const emit = defineEmits<{
  (e: 'click', event: Event): void
}>();
</script>

<style lang="scss">
@use '@/assets/styles/button';
</style>
