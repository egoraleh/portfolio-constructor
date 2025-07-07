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

<style>
.base-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.base-modal-content {
  background: floralwhite;
  padding: 20px;
  border-radius: 20px;
  max-width: 600px;
  width: 90%;
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
}
</style>
