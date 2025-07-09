<template>
  <section class="main">
    <h1 class="main__header">
      Конструктор портфолио
    </h1>

    <p data-ignore-export>
      <router-link
        class="instruction-link"
        to="/instruction"
      >
        <img
          src="/src/assets/images/icons/info.png"
          class="instruction-link__image"
          alt="Информация"
        >
      </router-link>
    </p>

    <section class="main__buttons">
      <BaseButton
        custom-class="main__button main__button--download"
        data-ignore-export
        @click="downloadPortfolio"
      >
        ⬇ Скачать портфолио
      </BaseButton>

      <BaseButton
        custom-class="main__button"
        data-ignore-export
        @click="openNewCategoryModal"
      >
        ✚ Категория
      </BaseButton>
    </section>

    <BaseModal
      :show="showCategoryModal"
      data-ignore-export
      @close="closeCategoryModal"
    >
      <NewCategory
        @add-category="handleAddCategory"
        @cancel="closeCategoryModal"
      />
    </BaseModal>

    <TransitionGroup
      name="category-list"
      tag="section"
    >
      <section
        v-for="category in store.categories.sort((a, b) => a.position - b.position)"
        :key="category.id"
        class="category"
        :style="getElementStyle(category.id)"
      >
        <section class="category__title">
          <section class="move-buttons">
            <BaseButton
              custom-class="category__position-button"
              :class="{ 'category__position-button--disabled': isFirstCategory(store, category.id) }"
              data-ignore-export
              @click="() => moveCategoryUp(store, category.id)"
            >
              ⬆
            </BaseButton>

            <BaseButton
              custom-class="category__position-button"
              :class="{ 'category__position-button--disabled': isLastCategory(store, category.id) }"
              data-ignore-export
              @click="() => moveCategoryDown(store, category.id)"
            >
              ⬇
            </BaseButton>
          </section>

          <h2 class="category__header">
            {{ category.title }}
          </h2>

          <BaseButton
            custom-class="category__button category__button--remove"
            data-ignore-export
            @click="() => removeCategory(category.id)"
          >
            <img
              src="/src/assets/images/icons/trash.png"
              class="category__button-image"
              alt=""
            >
          </BaseButton>

          <BaseButton
            custom-class="category__button category__button--edit"
            data-ignore-export
            @click="() => openStyleModal(category.id)"
          >
            🎨
          </BaseButton>
        </section>

        <BaseButton
          custom-class="category__button category__button--add"
          data-ignore-export
          @click="() => openBlockModal(category.id)"
        >
          ✚ Блок
        </BaseButton>

        <TransitionGroup
          name="block-list"
          tag="section"
          class="category__blocks"
        >
          <section
            v-for="(block, index) in category.blocks.sort((a, b) => a.position - b.position)"
            :key="block.id"
            class="block"
            :style="getElementStyle(block.id)"
          >
            <BlockItem
              :block="block"
              :is-first-block="index === 0"
              :is-last-block="index === category.blocks.length - 1"
              @remove="() => removeBlock(category.id, block.id)"
              @move-up="() => moveBlockUp(store, category.id, block.id)"
              @move-down="() => moveBlockDown(store, category.id, block.id)"
            />

            <BaseButton
              custom-class="block__button block__button--edit"
              data-ignore-export
              @click="() => openStyleModal(block.id)"
            >
              🎨
            </BaseButton>
          </section>
        </TransitionGroup>
      </section>
    </TransitionGroup>

    <BaseModal
      :show="showBlockModal"
      data-ignore-export
      @close="closeBlockModal"
    >
      <NewBlock
        v-if="activeCategoryId"
        :category-id="activeCategoryId"
        @added="closeBlockModal"
        @cancel="closeBlockModal"
      />
    </BaseModal>

    <BaseModal
      :show="showStyleModal"
      @close="closeStyleModal"
    >
      <ElementSettings
        v-if="activeElementId"
        :element-id="activeElementId"
        @close="closeStyleModal"
      />
    </BaseModal>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { usePortfolioStore } from '@/stores/portfolioStore';
import { useElementStylesStore } from '@/stores/elementStylesStore';
import { downloadPortfolio } from '@/scripts/downloadPortfolio';
import { moveCategoryUp, moveCategoryDown, isLastCategory, isFirstCategory } from '@/scripts/moveCategories';
import { moveBlockUp, moveBlockDown } from '@/scripts/moveBlocks';
import NewBlock from '@/ui/components/NewBlock.vue';
import BlockItem from '@/ui/components/BlockItem.vue';
import NewCategory from '@/ui/components/NewCategory.vue';
import BaseButton from '@/ui/base/BaseButton.vue';
import BaseModal from '@/ui/base/BaseModal.vue';
import ElementSettings from '@/ui/components/ElementSettings.vue';

const store = usePortfolioStore();
const stylesStore = useElementStylesStore();

const activeCategoryId = ref<string | null>(null);
const showBlockModal = ref(false);
const showCategoryModal = ref(false);
const showStyleModal = ref(false);
const activeElementId = ref<string | null>(null);

const handleAddCategory = (title: string) => {
  store.addCategory(title);
  closeCategoryModal();
};

const openBlockModal = (categoryId: string) => {
  activeCategoryId.value = categoryId;
  showBlockModal.value = true;
};

const closeBlockModal = () => {
  showBlockModal.value = false;
  activeCategoryId.value = null;
};

const openNewCategoryModal = () => {
  showCategoryModal.value = true;
};

const closeCategoryModal = () => {
  showCategoryModal.value = false;
};

const removeCategory = (categoryId: string) => {
  store.removeCategory(categoryId);
};

const removeBlock = (categoryId: string, blockId: string) => {
  store.removeBlock(categoryId, blockId);
};

const openStyleModal = (elementId: string) => {
  activeElementId.value = elementId;
  showStyleModal.value = true;
};

const closeStyleModal = () => {
  showStyleModal.value = false;
  activeElementId.value = null;
};

const getElementStyle = (elementId: string) => {
  const style = stylesStore.getStyle(elementId);
  return {
    backgroundColor: style.backgroundColor || '',
    color: style.textColor || '',
    fontSize: style.fontSize || '',
    fontStyle: style.fontStyle || '',
    fontWeight: style.fontWeight || '',
    textAlign: style.textAlign || '',
    alignItems: style.alignItems || '',
    alignContent: style.alignContent || '',
    width: style.width || '',
    height: style.height || ''
  };
};
</script>

<style lang="scss">
@use '@/assets/styles/home';
</style>
