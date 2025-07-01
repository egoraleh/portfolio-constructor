<script setup lang="ts">
import { ref } from 'vue'
import { usePortfolioStore } from '@/stores/portfolioStore'
import type { PortfolioBlock } from '@/types/PortfolioBlock'

const portfolioStore = usePortfolioStore()

const title = ref('')
const image = ref<File | null>(null)
const infoFields = ref<string[]>([])

function addField() {
  infoFields.value.push('')
}

function removeField(index: number) {
  infoFields.value.splice(index, 1)
}

function onImageChange(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    image.value = target.files[0]
  } else {
    image.value = null
  }
}

function addBlock() {
  if (!title.value.trim()) {
    alert('Введите название блока')
    return
  }

  if (image.value) {
    const reader = new FileReader()
    reader.onload = () => {
      const newBlock: PortfolioBlock = {
        title: title.value,
        image: reader.result as string,
        infoFields: [...infoFields.value]
      }
      portfolioStore.addBlock(newBlock)
      resetForm()
    }
    reader.readAsDataURL(image.value)
  } else {
    const newBlock: PortfolioBlock = {
      title: title.value,
      image: null,
      infoFields: [...infoFields.value]
    }
    portfolioStore.addBlock(newBlock)
    resetForm()
  }
}

function resetForm() {
  title.value = ''
  image.value = null
  infoFields.value = []
}
</script>

<template>
  <section class="new-block">
    <label for="title">Введите название блока:</label>
    <input 
      id="title"
      v-model="title"
      class="new-block__title"
      type="text"
      required
    >

    <label for="image">Выберите картинку (необязательно):</label>
    <input
      id="image"
      class="new-block__image"
      type="file"
      accept="image/*"
      @change="onImageChange"
    >

    <div class="info-fields">
      <div
        v-for="(field, index) in infoFields"
        :key="index"
        class="info-field"
      >
        <input
          v-model="infoFields[index]"
          type="text"
          placeholder="Введите информацию"
        >
        <button
          type="button"
          @click="removeField(index)"
        >
          Удалить
        </button>
      </div>
    </div>

    <button
      class="new-block__add-input-button"
      type="button"
      @click="addField"
    >
      Добавить информационное поле
    </button>

    <button
      type="button"
      @click="addBlock"
    >
      Добавить блок
    </button>
  </section>
</template>

<style scoped>

</style>