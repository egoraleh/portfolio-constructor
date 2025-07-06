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
          ✔
        </BaseButton>
        <BaseButton
          custom-class="new-category__button new-category__button--cancel"
          @click="cancel"
        >
          ✖
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

<style>
.new-category {
  width: fit-content;
}

.new-category__header {
  padding: 0;
  margin: 0 0 5px 5px;
  font-size: 24px;
  text-align: left;
}

.new-category__input {
  border-radius: 10px;
  border: none;
  width: 300px;
  height: 40px;
  padding: 10px;
  font-size: 18px;
  color: #353535;
  transition: outline-color 0.5s;
}

.new-category__input:focus {
  outline: 2px solid #ff6121;
}

.new-category__actions {
  display: flex;
  justify-content: space-between;
}

.new-category__button {
  margin: 10px 5px;
  font-size: 18px;
  height: 35px;
  width: 35px;
}

.new-category__button--add {
  background: #008000;
}

.new-category__button--cancel {
  background: #cd0006;
}

.new-category__button--add:hover {
  background: #005e00;
}

.new-category__button--cancel:hover {
  background: #970102;
}
</style>
