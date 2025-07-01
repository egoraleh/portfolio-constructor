<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'add-category', title: string): void
  (e: 'cancel'): void
}>()

const categoryTitle = ref('')

function addCategory() {
  if (!categoryTitle.value.trim()) {
    alert('Введите название категории')
    return
  }
  emit('add-category', categoryTitle.value)
  categoryTitle.value = ''
}

function cancel() {
  categoryTitle.value = ''
  emit('cancel')
}
</script>

<template>
  <section class="new-category">
    <input
      v-model="categoryTitle"
      type="text"
      placeholder="Название категории"
      class="new-category__input"
    >

    <section class="new-category__buttons">
      <button
        class="new-category__button new-category__button--add"
        @click="addCategory"
      >
        Добавить
      </button>
      <button 
        class="new-category__button new-category__button--cancel"
        @click="cancel"
      >
        Отмена
      </button>
    </section>
  </section>
</template>

<style scoped>

</style>
