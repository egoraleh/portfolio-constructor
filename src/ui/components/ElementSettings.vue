<template>
  <div>
    <h3>Настройки элемента</h3>

    <label>Фон:</label>
    <input
      v-model="backgroundColor"
      type="color"
    >

    <label>Цвет текста:</label>
    <input
      v-model="textColor"
      type="color"
    >

    <label>Размер текста:</label>
    <input
      v-model="fontSize"
      type="text"
      placeholder="например 20px"
    >

    <label>Стиль текста:</label>
    <select v-model="fontStyle">
      <option value="">
        По умолчанию
      </option>
      <option value="normal">
        Обычный
      </option>
      <option value="italic">
        Курсив
      </option>
      <option value="oblique">
        Наклонный
      </option>
    </select>

    <label>Толщина шрифта:</label>
    <select v-model="fontWeight">
      <option value="">
        По умолчанию
      </option>
      <option value="normal">
        Обычный
      </option>
      <option value="bold">
        Жирный
      </option>
      <option value="lighter">
        Тоньше
      </option>
      <option value="bolder">
        Толще
      </option>
      <option value="100">
        100
      </option>
      <option value="200">
        200
      </option>
      <option value="300">
        300
      </option>
      <option value="400">
        400
      </option>
      <option value="500">
        500
      </option>
      <option value="600">
        600
      </option>
      <option value="700">
        700
      </option>
      <option value="800">
        800
      </option>
      <option value="900">
        900
      </option>
    </select>

    <label>Выравнивание текста:</label>
    <select v-model="textAlign">
      <option value="">
        По умолчанию
      </option>
      <option value="left">
        Слева
      </option>
      <option value="center">
        По центру
      </option>
      <option value="right">
        Справа
      </option>
      <option value="justify">
        По ширине
      </option>
    </select>

    <label>Align Items:</label>
    <select v-model="alignItems">
      <option value="">
        По умолчанию
      </option>
      <option value="flex-start">
        Сверху
      </option>
      <option value="center">
        По центру
      </option>
      <option value="flex-end">
        Снизу
      </option>
      <option value="stretch">
        Растянуть
      </option>
    </select>

    <label>Align Content:</label>
    <select v-model="alignContent">
      <option value="">
        По умолчанию
      </option>
      <option value="flex-start">
        Сверху
      </option>
      <option value="center">
        По центру
      </option>
      <option value="flex-end">
        Снизу
      </option>
      <option value="space-between">
        С отступами
      </option>
      <option value="stretch">
        Растянуть
      </option>
    </select>

    <label>Ширина:</label>
    <input
      v-model="width"
      type="text"
      placeholder="например 100px или 50%"
    >

    <label>Высота:</label>
    <input
      v-model="height"
      type="text"
      placeholder="например 50px или auto"
    >

    <button @click="save">
      Сохранить
    </button>
  </div>
</template>

<script setup lang="ts">
import { useElementStylesStore } from '@/stores/elementStylesStore'
import { ref, watch } from 'vue'

const props = defineProps<{
  elementId: string
}>()

const emit = defineEmits(['close'])

const stylesStore = useElementStylesStore()

const backgroundColor = ref('')
const textColor = ref('')
const fontSize = ref('')
const fontStyle = ref('')
const fontWeight = ref('')
const textAlign = ref('')
const alignItems = ref('')
const alignContent = ref('')
const width = ref('')
const height = ref('')

watch(
  () => props.elementId,
  (val) => {
    if (val) {
      const style = stylesStore.getStyle(val)
      backgroundColor.value = style.backgroundColor || ''
      textColor.value = style.textColor || ''
      fontSize.value = style.fontSize || ''
      fontStyle.value = style.fontStyle || ''
      fontWeight.value = style.fontWeight || ''
      textAlign.value = style.textAlign || ''
      alignItems.value = style.alignItems || ''
      alignContent.value = style.alignContent || ''
      width.value = style.width || ''
      height.value = style.height || ''
    }
  },
  { immediate: true }
)

const save = () => {
  stylesStore.updateStyle(props.elementId, 'backgroundColor', backgroundColor.value)
  stylesStore.updateStyle(props.elementId, 'textColor', textColor.value)
  stylesStore.updateStyle(props.elementId, 'fontSize', fontSize.value)
  stylesStore.updateStyle(props.elementId, 'fontStyle', fontStyle.value)
  stylesStore.updateStyle(props.elementId, 'fontWeight', fontWeight.value)
  stylesStore.updateStyle(props.elementId, 'textAlign', textAlign.value)
  stylesStore.updateStyle(props.elementId, 'alignItems', alignItems.value)
  stylesStore.updateStyle(props.elementId, 'alignContent', alignContent.value)
  stylesStore.updateStyle(props.elementId, 'width', width.value)
  stylesStore.updateStyle(props.elementId, 'height', height.value)
  emit('close')
}
</script>
