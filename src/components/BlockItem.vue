<script setup lang="ts">
import type { PropType } from 'vue'

type Block = {
  title: string
  image?: string
  infoFields: string[]
}

const props = defineProps<{
  block: Block
}>()

const emit = defineEmits<{
  (e: 'remove'): void
}>()
</script>

<template>
  <div class="block-item">
    <h2>{{ block.title }}</h2>

    <img
      v-if="block.image"
      :src="block.image"
      alt="Изображение блока"
    >

    <ul>
      <li 
        v-for="(info, i) in block.infoFields" 
        :key="i"
      >
        {{ info }}
      </li>
    </ul>

    <button @click="$emit('remove')">
      Удалить блок
    </button>
  </div>
</template>

<style scoped>
</style>
