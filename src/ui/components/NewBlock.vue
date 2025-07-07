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

    <label
      v-show="showInfoHeader"
      class="new-block__label new-block__label__info"
    >
      Добавьте информацию к блоку:
    </label>
    <section class="new-block__info-fields">
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
      ✚ Добавить информационное поле
    </BaseButton>

    <section class="final-buttons">
      <BaseButton
        type="button"
        custom-class="new-block__button new-block__button--add-block"
        @click="addBlock"
      >
        Сохранить
      </BaseButton>

      <BaseButton
        type="button"
        custom-class="new-block__button new-block__button--cancel"
        @click="cancel"
      >
        Отмена
      </BaseButton>
    </section>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { usePortfolioStore } from '@/stores/portfolioStore.js'
import BaseInput from "@/ui/base/BaseInput.vue";
import BaseButton from "@/ui/base/BaseButton.vue";

const props = defineProps<{
  categoryId: string
}>();

const emit = defineEmits<{
  (e: 'added'): void
  (e: 'cancel'): void
}>();

const portfolioStore = usePortfolioStore();

const categoryName = computed(() => {
  const cat = portfolioStore.categories.find(c => c.id === props.categoryId);
  return cat?.title;
});

const title = ref('');
const image = ref<File | null>(null);
const infoFields = ref<string[]>([]);

const showInfoHeader = computed(() => infoFields.value.length > 0);

const addField = () => {
  infoFields.value.push('');
};

const removeField = (index: number) => {
  infoFields.value.splice(index, 1);
};

const onImageChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    image.value = target.files[0];
  } else {
    image.value = null;
  }
};

const addBlock = () => {
  if (!title.value.trim()) {
    alert('Введите название блока');
    return;
  }

  if (infoFields.value.length === 0) {
    alert('Добавьте хотя бы одно информационное поле');
    return;
  }

  if (image.value) {
    const reader = new FileReader();
    reader.onload = () => {
      const newBlock = {
        title: title.value,
        image: reader.result as string,
        infoFields: [...infoFields.value]
      }
      portfolioStore.addBlock(props.categoryId, newBlock);
      resetForm();
      emit('added');
    }
    reader.readAsDataURL(image.value);
  } else {
    const newBlock = {
      title: title.value,
      image: null,
      infoFields: [...infoFields.value]
    };
    portfolioStore.addBlock(props.categoryId, newBlock);
    resetForm();
    emit('added');
  }
};

const cancel = () => {
  resetForm();
  emit('cancel');
};

const resetForm = () => {
  title.value = '';
  image.value = null;
  infoFields.value = [];
};
</script>

<style lang="scss">
@use '@/assets/styles/newBlock';
</style>