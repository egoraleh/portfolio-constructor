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
              :class="{ 'category__position-button--disabled': isFirstCategory(category.id) }"
              data-ignore-export
              @click="() => moveCategoryUp(category.id)"
            >
              ⬆
            </BaseButton>

            <BaseButton
              custom-class="category__position-button"
              :class="{ 'category__position-button--disabled': isLastCategory(category.id) }"
              data-ignore-export
              @click="() => moveCategoryDown(category.id)"
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
              @move-up="() => moveBlockUp(category.id, block.id)"
              @move-down="() => moveBlockDown(category.id, block.id)"
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
import NewBlock from '@/ui/components/NewBlock.vue';
import BlockItem from '@/ui/components/BlockItem.vue';
import NewCategory from '@/ui/components/NewCategory.vue';
import BaseButton from '@/ui/base/BaseButton.vue';
import BaseModal from "@/ui/base/BaseModal.vue";
import { PortfolioCategory } from "@/types/PortfolioCategory";

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

const updateCategoriesPositions = () => {
  store.categories.forEach((category, index) => {
    category.position = index;
  });
  store.saveToLocalStorage();
};

const moveCategoryUp = (categoryId: string) => {
  const categoryIndex = store.categories.findIndex(c => c.id === categoryId);
  if (!isFirstCategory(categoryId)) {
    const upperCategory = store.categories[categoryIndex - 1];
    store.categories[categoryIndex - 1] = store.categories[categoryIndex];
    store.categories[categoryIndex] = upperCategory;
    updateCategoriesPositions();
  }
};

const moveCategoryDown = (categoryId: string) => {
  const categoryIndex = store.categories.findIndex(c => c.id === categoryId);
  if (!isLastCategory(categoryId)) {
    const lowerCategory = store.categories[categoryIndex + 1];
    store.categories[categoryIndex + 1] = store.categories[categoryIndex];
    store.categories[categoryIndex] = lowerCategory;
    updateCategoriesPositions();
  }
};

const isFirstCategory = (categoryId: string) => {
  const index = store.categories.findIndex(c => c.id === categoryId);
  return index === 0;
};

const isLastCategory = (categoryId: string) => {
  const index = store.categories.findIndex(c => c.id === categoryId);
  return index === store.categories.length - 1;
};

const updateBlocksPositions = (category: PortfolioCategory) => {
  category.blocks.forEach((block, index) => {
    block.position = index;
  });
  store.saveToLocalStorage();
};

const moveBlockUp = (categoryId: string, blockId: string) => {
  const category = store.categories.find(c => c.id === categoryId);
  if (!category) return;

  const index = category.blocks.findIndex(b => b.id === blockId);
  if (index > 0) {
    const upperBlock = category.blocks[index - 1];
    category.blocks[index - 1] = category.blocks[index];
    category.blocks[index] = upperBlock;
    updateBlocksPositions(category);
  }
};

const moveBlockDown = (categoryId: string, blockId: string) => {
  const category = store.categories.find(c => c.id === categoryId);
  if (!category) return;

  const index = category.blocks.findIndex(b => b.id === blockId);
  if (index < category.blocks.length - 1) {
    const lowerBlock = category.blocks[index + 1];
    category.blocks[index + 1] = category.blocks[index];
    category.blocks[index] = lowerBlock;
    updateBlocksPositions(category);
  }
};
</script>

<style>
.instruction-link__image {
  width: 50px;
  transition: filter 0.3s ease, transform 0.3s ease;
  position: absolute;
  left: 15px;
  top: 15px;
}

.instruction-link:hover .instruction-link__image {
  filter: brightness(0) saturate(100%) invert(40%) sepia(70%) saturate(800%) hue-rotate(-10deg);
  transform: scale(1.1);
}

.main {
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 10px;
  align-items: center;
}

.main__header {
  font-size: 30px;
  text-align: center;
  padding: 0;
  margin: 0;
}

.main__buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.main__button--download {
  background: green;
}

.main__button--download:hover {
  background: #005e00;
}

.category {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
}

.category__title {
  display: flex;
  gap: 10px;
  align-items: center;
}

.category__button--remove {
  width: 50px;
  height: 40px;
  background: #cd0006;
}

.category__button--remove:hover {
  background: #7a0003;
}

.category__position-button {
  background: none;
  border: none;
  box-shadow: none;
  width: 20px;
  height: 35px;
  font-size: 30px;
  color: #404040;
  transition: none;
}

.category__position-button:hover {
  transform: none;
  background-color: rgba(0, 0, 0, 0.2);
}

.category__position-button--disabled {
  opacity: 0.3;
  pointer-events: none;
  background: none;
}

.category-list-enter-active,
.category-list-leave-active {
  transition: opacity 0.5s ease;
}

.category-list-enter-from,
.category-list-leave-to {
  opacity: 0;
}

.category-list-enter-to,
.category-list-leave-from {
  opacity: 1;
}

.category-list-move {
  transition: opacity 0.5s ease;
}

.block-list-move {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
</style>
