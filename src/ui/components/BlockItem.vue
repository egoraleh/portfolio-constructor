<template>
  <section class="block-item">
    <section 
      class="block-item__buttons"
      data-ignore-export
    >
      <BaseButton
        class="block-item__button block-item__button--move"
        :class="{ 'block-item__button--disabled': isFirstBlock }"
        data-ignore-export
        @click="$emit('move-up')"
      >
        ⬆
      </BaseButton>

      <BaseButton
        class="block-item__button block-item__button--move"
        :class="{ 'block-item__button--disabled': isLastBlock }"
        data-ignore-export
        @click="$emit('move-down')"
      >
        ⬇
      </BaseButton>

      <BaseButton
        custom-class="block-item__button"
        data-ignore-export
        @click="$emit('remove')"
      >
        <img
          src="/src/assets/images/icons/trash.png"
          class="category__button-image"
          alt=""
        >
      </BaseButton>
    </section>
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
  </section>
</template>

<script setup lang="ts">
import type { PortfolioBlock } from '@/types/PortfolioBlock';

const props = defineProps<{
  block: PortfolioBlock
  isFirstBlock: boolean
  isLastBlock: boolean
}>();

const emit = defineEmits<{
  (e: 'remove'): void
  (e: 'move-up'): void
  (e: 'move-down'): void
}>();
</script>

<style>
.block-item {
  display: flex;
  align-items: center;
  background: floralwhite;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  width: 1000px;
  margin: 20px 40px;
  padding: 20px;
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
  margin-left: 20px;
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

.block-item__buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
}

.block-item__button {
  width: 50px;
  height: 40px;
  background: #cd0006;
}

.block-item__button:hover {
  background: #7a0003;
}

.block-item__button--move {
  background: none;
  border: none;
  box-shadow: none;
  width: 20px;
  height: 35px;
  font-size: 30px;
  color: #404040;
  transition: none;
}

.block-item__button--move:hover {
  transform: none;
  background-color: rgba(0, 0, 0, 0.2);
}

.block-item__button--disabled {
  opacity: 0.3;
  pointer-events: none;
  background: none;
}
</style>
