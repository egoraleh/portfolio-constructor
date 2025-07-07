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

<style lang="scss">
@use '@/assets/styles/input';
</style>
