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

<style lang="scss">
@use '@/assets/styles/blockItem';
</style>
