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

<style>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  font-size: 16px;
  border: none;
  border-radius: 10px;
  background: #cd671f;
  color: floralwhite;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0 2px 5px rgba(0,0,0,0.15);
}

.base-button:hover {
  background: #984f1a;
  transform: scale(1.05);
}
</style>
