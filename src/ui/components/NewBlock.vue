<template>
  <section class="new-block">
    <h2 class="new-block__header">
      Добавление блока в {{ categoryName }}
    </h2>
    <label
      for="title"
      class="new-block__label new-block__label--title"
    >
      Введите название блока:
    </label>
    <BaseInput
      id="title"
      v-model="title"
      custom-class="new-block__input new-block__input--title"
      type="text"
      required
    />

    <label 
      for="image"
      class="new-block__label new-block__label--image"
    >
      Выберите картинку (необязательно):
    </label>
    <BaseInput
      id="image"
      custom-class="new-block__input new-block__input--image"
      type="file"
      accept="image/*"
      model-value=""
      @change="onImageChange"
    />

    <section class="new-block__info-fields">
      <h2
        v-show="showInfoHeader"
        class="new-block__info-header"
      >
        Информация:
      </h2>
      <section
        v-for="(field, index) in infoFields"
        :key="index"
        class="new-block__info-field"
      >
        <BaseInput
          v-model="infoFields[index]"
          type="text"
          :is-textarea="true"
          custom-class="new-block__input"
          placeholder="Введите информацию"
        />
        <BaseButton
          type="button"
          custom-class="new-block__button new-block__button--remove-info"
          @click="removeField(index)"
        >
          ✖
        </BaseButton>
      </section>
    </section>

    <BaseButton
      custom-class="new-block__button new-block__button--add-info"
      type="button"
      @click="addField"
    >
      Добавить информационное поле
    </BaseButton>

    <BaseButton
      type="button"
      custom-class="new-block__button new-block__button--add-block"
      @click="addBlock"
    >
      Добавить блок
    </BaseButton>
  </section>
</template>

<script setup lang="ts">
import {ref, computed, watch} from 'vue'
import { usePortfolioStore } from '@/stores/portfolioStore.js'
import BaseInput from "@/ui/base/BaseInput.vue";
import BaseButton from "@/ui/base/BaseButton.vue";

const props = defineProps<{
  categoryId: string
}>()

const emit = defineEmits<{
  (e: 'added'): void
}>()

const portfolioStore = usePortfolioStore()

const categoryName = computed(() => {
  const cat = portfolioStore.categories.find(c => c.id === props.categoryId)
  return cat?.title
})

const showInfoHeader = ref(false)
const title = ref('')
const image = ref<File | null>(null)
const infoFields = ref<string[]>([])

watch(infoFields, () => {
  showInfoHeader.value = infoFields.value.length > 0;
})

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
</script>

<style>
.new-block {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  background: floralwhite;
  text-align: left;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.new-block__header {
  text-align: center;
  font-size: 28px;
}

.new-block__label {
  font-size: 18px;
  font-weight: 500;
  color: #252525;
  margin-left: 5px;
}

.new-block__label--title {
  margin-top: 0;
}

.new-block__label--image {
  margin-top: 12px;
}

.new-block__input {
  width: 100%;
  padding: 10px 12px;
  height: 40px;
  font-size: 16px;
  border: none;
  border-radius: 10px;
  background: #e3e3e3;
  transition: outline-color 0.3s ease;
}

.new-block__input:focus {
  outline: 2px solid #ff6121;
  background: floralwhite;
  outline-offset: 2px;
}

.new-block__info-fields {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  gap: 20px;
}

.new-block__info-field {
  display: flex;
  align-items: center;
  gap: 8px;
}

.new-block__button--add-info {
  align-self: flex-start;
  background: #cd671f;
  margin-bottom: 10px;
}

.new-block__button--add-info:hover {
  background: #984f1a;
}

.new-block__button--remove-info {
  background: #cd0006;
  font-size: 28px;
  width: 40px;
  height: 40px;
}

.new-block__button--remove-info:hover {
  background: #970102;
}

.new-block__button--add-block {
  align-self: center;
  background: #008000;
}

.new-block__button--add-block:hover {
  background: #005e00;
}
</style>