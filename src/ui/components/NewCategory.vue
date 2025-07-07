<template>
  <section class="new-category">
    <h2 class="new-category__header">
      Новая категория:
    </h2>
    <BaseInput
      v-model="categoryTitle"
      type="text"
      placeholder="Название категории"
      custom-class="new-category__input"
    />

    <section class="new-category__actions">
      <section class="new-category__buttons">
        <BaseButton
          custom-class="new-category__button new-category__button--add"
          @click="addCategory"
        >
          Сохранить
        </BaseButton>
        <BaseButton
          custom-class="new-category__button new-category__button--cancel"
          @click="cancel"
        >
          Отмена
        </BaseButton>
      </section>

      <section />
    </section>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseInput from "@/ui/base/BaseInput.vue";
import BaseButton from "@/ui/base/BaseButton.vue";

const emit = defineEmits<{
  (e: 'add-category', title: string): void
  (e: 'cancel'): void
}>();

const categoryTitle = ref('');

const addCategory = () => {
  if (!categoryTitle.value.trim()) {
    alert('Введите название категории');
    return;
  }
  emit('add-category', categoryTitle.value);
  categoryTitle.value = '';
};

const cancel = () => {
  categoryTitle.value = '';
  emit('cancel');
};
</script>

<style lang="scss">
@use '@/assets/styles/newCategory';
</style>
