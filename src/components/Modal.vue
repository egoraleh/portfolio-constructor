<script setup lang="ts">
const props = defineProps<{
  show: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <div
    v-if="show"
    class="modal-overlay"
    @click.self="emit('close')"
  >
    <div class="modal-content">
      <slot />
      <button @click="emit('close')">
        Закрыть
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>
