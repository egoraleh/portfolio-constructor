<template>
  <div
    v-if="show"
    class="base-modal-overlay"
    @click.self="$emit('close')"
  >
    <div class="base-modal-content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  show: boolean
}>();

const emit = defineEmits<{
  (e: 'close'): void
}>();
</script>

<style lang="scss">
@use '@/assets/styles/modal';
</style>
