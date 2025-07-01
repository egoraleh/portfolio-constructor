<script setup lang="ts">
import { ref } from 'vue'
import { usePortfolioStore } from '@/stores/portfolioStore'

const props = defineProps<{
  categoryId: string
}>()

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
      const newBlock = {
        title: title.value,
        image: reader.result as string,
        infoFields: [...infoFields.value]
      }
      portfolioStore.addBlock(props.categoryId, newBlock)
      resetForm()
      emit('added')
    }
    reader.readAsDataURL(image.value)
  } else {
    const newBlock = {
      title: title.value,
      image: null,
      infoFields: [...infoFields.value]
    }
    portfolioStore.addBlock(props.categoryId, newBlock)
    resetForm()
    emit('added')
  }
}

function resetForm() {
  title.value = ''
  image.value = null
  infoFields.value = []
}

const emit = defineEmits<{
  (e: 'added'): void
}>()
</script>

<template>
  <section class="new-block">
    <label
      for="title"
      class="new-block__label new-block__label--title"
    >
      Введите название блока:
    </label>
    <input 
      id="title"
      v-model="title"
      class="new-block__input new-block__input--title"
      type="text"
      required
    >

    <label 
      for="image"
      class="new-block__label new-block__label--image"
    >
      Выберите картинку (необязательно):
    </label>
    <input
      id="image"
      class="new-block__input new-block__input--image"
      type="file"
      accept="image/*"
      @change="onImageChange"
    >

    <section class="new-block__info-fields">
      <section
        v-for="(field, index) in infoFields"
        :key="index"
        class="new-block__info-field"
      >
        <input
          v-model="infoFields[index]"
          type="text"
          class="new-block__input"
          placeholder="Введите информацию"
        >
        <button
          type="button"
          class="new-block__button new-block__button--remove-info"
          @click="removeField(index)"
        >
          Удалить
        </button>
      </section>
    </section>

    <button
      class="new-block__button new-block__button--add-info"
      type="button"
      @click="addField"
    >
      Добавить информационное поле
    </button>

    <button
      type="button"
      class="new-block__button new-block__button--add-block"
      @click="addBlock"
    >
      Добавить блок
    </button>
  </section>
</template>

<style scoped>

</style>