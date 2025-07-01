<script setup lang="ts">
import type { PortfolioBlock } from '@/types/PortfolioBlock'

const props = defineProps<{
  block: PortfolioBlock
}>()

const emit = defineEmits<{
  (e: 'remove'): void
}>()
</script>

<template>
  <section class="block-item">
    <img
      v-if="block.image"
      class="block-item__image"
      :src="block.image"
      alt="Изображение блока"
    >
    
    <section class="block-item__info">
      <h2 class="block-item__header">
        {{ block.title }}
      </h2>

      <ul class="block-item__info-fields">
        <li
          v-for="(info, i) in block.infoFields"
          :key="i"
          class="block-item__info-field"
        >
          {{ info }}
        </li>
      </ul>
    </section>

    <button
      class="block-item__button"
      @click="$emit('remove')"
    >
      Удалить
    </button>
  </section>
</template>

<style scoped>
.block-item {
  display: flex;
  align-items: center;
  background: floralwhite;
  border-radius: 20px;
  max-width: 1200px;
  margin: 20px 40px;
  padding: 20px 20px 70px 20px;
  min-height: 200px;
  position: relative;
}

.block-item__header {
  padding: 0;
  margin: 0;
  color: #252525;
  font-size: 28px;
}

.block-item__info {
  display: flex;
  flex-direction: column;
  gap: 25px;
  margin: 10px 10px 10px 30px;
}

.block-item__image {
  width: 200px;
  height: auto;
  overflow: hidden;
  border-radius: 20px;
  object-fit: cover;
}

.block-item__info-fields {
  margin: 20px 20px 20px 10px;
}

.block-item__info-field {
  font-weight: bold;
  font-size: 22px;
  color: #404040;
}

.block-item__button {
  position: absolute;
  bottom: 20px;
  left: 10px;
  width: 120px;
  height: 40px;
  border-radius: 15px;
  border: none;
  margin-left: 10px;
  background: #cd0006;
  color: floralwhite;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.block-item__button:hover {
  background: #7a0003;
  transform: scale(1.05);
}
</style>
