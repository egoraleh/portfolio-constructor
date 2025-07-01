<script setup lang="ts">
const props = defineProps<{
  show: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <section
    v-if="show"
    class="modal-overlay"
    @click.self="emit('close')"
  >
    <section class="modal-content">
      <slot />
      <button @click="emit('close')">
        Закрыть
      </button>
    </section>
  </section>
</template>

<style scoped>

</style>
