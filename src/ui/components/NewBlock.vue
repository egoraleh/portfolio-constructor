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
import {ref, computed, watch} from 'vue'
import { usePortfolioStore } from '@/stores/portfolioStore.js'
import BaseInput from "@/ui/base/BaseInput.vue";
import BaseButton from "@/ui/base/BaseButton.vue";

const props = defineProps<{
  categoryId: string
}>()

const emit = defineEmits<{
  (e: 'added'): void
  (e: 'cancel'): void
}>()

const portfolioStore = usePortfolioStore()

const categoryName = computed(() => {
  const cat = portfolioStore.categories.find(c => c.id === props.categoryId)
  return cat?.title
})

const title = ref('')
const image = ref<File | null>(null)
const infoFields = ref<string[]>([])

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
    alert('Добавьте хотя бы одно информационное поле')
    return
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

<style>
.new-block {
  width: 100%;
  margin: 0 auto;
  background: floralwhite;
  text-align: left;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.new-block__header {
  text-align: center;
  margin: 0;
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
  height: 40px;
  font-family: 'Inter', sans-serif;
}

.new-block__label__info {
  margin-top: 10px;
  padding: 0;
}

.new-block__info-fields {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.new-block__info-field {
  display: flex;
  align-items: center;
  gap: 8px;
}

.new-block__info-field:last-of-type {
  margin-bottom: 10px;
}

.new-block__button--add-info {
  align-self: flex-start;
  margin-bottom: 10px;
}

.new-block__button--remove-info {
  background: #cd0006;
  font-size: 28px;
  padding: 0;
  min-width: 40px;
  min-height: 40px;
  max-width: 40px;
  max-height: 40px;
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

.new-block__button--cancel {
  background: #cd0006;
}

.new-block__button--cancel:hover {
  background: #970102;
}

.final-buttons {
  display: flex;
  flex-direction: row;
  gap: 10px;
}
</style>