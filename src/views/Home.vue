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
        </section>

        <BaseButton
          custom-class="category__button category__button--add"
          data-ignore-export
          @click="() => openBlockModal(category.id)"
        >
          ✚ Блок
        </BaseButton>

        <section class="category__blocks">
          <TransitionGroup
            name="block-list"
            tag="section"
            class="category__blocks"
          >
            <BlockItem
              v-for="(block, index) in category.blocks.sort((a, b) => a.position - b.position)"
              :key="block.id"
              :block="block"
              :is-first-block="index === 0"
              :is-last-block="index === category.blocks.length - 1"
              @remove="() => removeBlock(category.id, block.id)"
              @move-up="() => moveBlockUp(store, category.id, block.id)"
              @move-down="() => moveBlockDown(store, category.id, block.id)"
            />
          </TransitionGroup>
        </section>
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
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { usePortfolioStore } from '@/stores/portfolioStore';
import { downloadPortfolio } from '@/scripts/downloadPortfolio';
import { moveCategoryUp, moveCategoryDown, isLastCategory, isFirstCategory } from '@/scripts/moveCategories';
import { moveBlockUp, moveBlockDown } from '@/scripts/moveBlocks';
import NewBlock from '@/ui/components/NewBlock.vue';
import BlockItem from '@/ui/components/BlockItem.vue';
import NewCategory from '@/ui/components/NewCategory.vue';
import BaseButton from '@/ui/base/BaseButton.vue';
import BaseModal from '@/ui/base/BaseModal.vue';

const store = usePortfolioStore();

const activeCategoryId = ref<string | null>(null);

const showBlockModal = ref(false);

const showCategoryModal = ref(false);

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
</script>

<style lang="scss">
@use '@/assets/styles/home';
</style>
