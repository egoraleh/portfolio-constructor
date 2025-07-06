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

    <BaseButton
      custom-class="main__button"
      data-ignore-export
      @click="downloadPortfolio"
    >
      ⬇ Скачать портфолио
    </BaseButton>

    <BaseButton
      v-show="showAddCategoryButton"
      custom-class="main__button"
      data-ignore-export
      @click="openNewCategoryModal"
    >
      ✚ Добавить категорию
    </BaseButton>

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

    <section
      v-for="category in store.categories.sort((a, b) => a.position - b.position)"
      :key="category.id"
      class="category"
    >
      <section class="category__title">
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
        ✚ Добавить блок в категорию
      </BaseButton>

      <section class="category__blocks">
        <BlockItem
          v-for="block in category.blocks.sort((a, b) => a.position - b.position)"
          :key="block.id"
          :block="block"
          @remove="() => removeBlock(category.id, block.id)"
        />
      </section>
    </section>

    <BaseModal
      :show="showBlockModal"
      data-ignore-export
      @close="closeBlockModal"
    >
      <NewBlock
        v-if="activeCategoryId"
        :category-id="activeCategoryId"
        @added="closeBlockModal"
      />
    </BaseModal>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { usePortfolioStore } from '@/stores/portfolioStore';
import NewBlock from '@/ui/components/NewBlock.vue';
import BlockItem from '@/ui/components/BlockItem.vue';
import NewCategory from '@/ui/components/NewCategory.vue';
import BaseButton from '@/ui/base/BaseButton.vue';
import BaseModal from "@/ui/base/BaseModal.vue";

const store = usePortfolioStore();

const activeCategoryId = ref<string | null>(null);

const showBlockModal = ref(false);

const showCategoryModal = ref(false);

const showAddCategoryButton = ref(true);

const handleAddCategory = (title: string) => {
  store.addCategory(title)
  closeCategoryModal()
};

const openBlockModal = (categoryId: string) => {
  activeCategoryId.value = categoryId
  showBlockModal.value = true
};

const closeBlockModal = () => {
  showBlockModal.value = false
  activeCategoryId.value = null
};

const openNewCategoryModal = () => {
  showAddCategoryButton.value = false;
  showCategoryModal.value = true;
};

const closeCategoryModal = () => {
  showAddCategoryButton.value = true;
  showCategoryModal.value = false;
};

const removeCategory = (categoryId: string) => {
  store.removeCategory(categoryId)
};

const removeBlock = (categoryId: string, blockId: string) => {
  store.removeBlock(categoryId, blockId)
};

const getAllStyles = () => {
  let styles = '';

  document.head.querySelectorAll('style, link[rel="stylesheet"]').forEach((tag) => {
    styles += tag.outerHTML;
  });

  return styles;
};

const downloadPortfolio = () => {
  const portfolioContainer = document.querySelector('#app');

  if (!portfolioContainer) {
    console.error('Контейнер портфолио не найден');
    return;
  }

  const exportContent = portfolioContainer.cloneNode(true) as HTMLElement;

  const mainHeader = exportContent.querySelector('.main__header');
  if (mainHeader) {
    mainHeader.textContent = 'Моё портфолио';
  }

  exportContent.querySelectorAll('[data-ignore-export]').forEach((el) => el.remove());

  const dynamicStyles = getAllStyles();

  const fullHtml = `
    <html lang="ru">
      <head>
        <meta charset="utf-8">
        <title>Моё портфолио</title>
        ${dynamicStyles}
      </head>
      <body>
        ${exportContent.outerHTML}
      </body>
    </html>
  `;

  const blob = new Blob([fullHtml], { type: 'text/html' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'portfolio.html';
  link.click();
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
  text-align: center;
  padding: 10px;
}

.main__header {
  font-size: 30px;
  text-align: center;
  padding: 0;
  margin: 0;
}

.main__button {
  height: 35px;
  width: 250px;
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
</style>
