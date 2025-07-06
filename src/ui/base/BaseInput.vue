<template>
  <component
    :is="isTextarea ? 'textarea' : 'input'"
    ref="inputRef"
    v-bind="$attrs"
    :value="modelValue"
    :class="['base-input', customClass]"
    @input="onInput"
  />
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue';

const props = defineProps<{
  modelValue: string
  customClass?: string
  isTextarea?: boolean
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>();

const inputRef = ref<HTMLInputElement | HTMLTextAreaElement | null>(null);

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement | HTMLTextAreaElement;
  emit('update:modelValue', target.value);

  if (props.isTextarea) {
    autoResize();
  }
};

const autoResize = () => {
  if (props.isTextarea && inputRef.value instanceof HTMLTextAreaElement) {
    inputRef.value.style.height = '40px';
    inputRef.value.style.height = inputRef.value.scrollHeight + 'px';
  }
};

onMounted(() => {
  if (props.isTextarea) {
    nextTick(autoResize);
  }
});

watch(() => props.modelValue, () => {
  if (props.isTextarea) {
    nextTick(autoResize);
  }
});
</script>

<style>
.base-input {
  padding: 10px 12px;
  font-size: 16px;
  border: none;
  border-radius: 10px;
  background: #e3e3e3;
  transition: outline-color 0.3s ease;
  resize: none;
}

.base-input:focus {
  outline: 2px solid #ff6121;
  background: floralwhite;
  outline-offset: 2px;
}
</style>
