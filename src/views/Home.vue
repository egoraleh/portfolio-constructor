<template>
  <section class="main">
    <h1 class="main__header">
      Конструктор портфолио
    </h1>
    
    <p>
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
    
    <button
      v-show="showAddCategoryButton"
      class="main__button"
      @click="openNewCategoryForm"
    >
      ✚ Добавить категорию
    </button>

    <NewCategory
      v-if="showNewCategoryForm"
      @add-category="handleAddCategory"
      @cancel="cancelNewCategory"
    />

    <section
      v-for="category in store.categories.sort((a, b) => a.position - b.position)"
      :key="category.id"
      class="category"
    >
      <section class="category__title">
        <h2 class="category__header">
          {{ category.title }}
        </h2>

        <button
          class="category__button category__button--remove"
          @click="() => removeCategory(category.id)"
        >
          <img 
            src="/src/assets/images/icons/trash.png" 
            class="category__button-image"
            alt=""
          >
        </button>
      </section>

      <button
        class="category__button category__button--add"
        @click="() => openBlockModal(category.id)"
      >
        ✚ Добавить блок в категорию
      </button>

      <section class="category__blocks">
        <BlockItem
          v-for="block in category.blocks.sort((a, b) => a.position - b.position)"
          :key="block.id"
          :block="block"
          @remove="() => removeBlock(category.id, block.id)"
        />
      </section>
    </section>

    <Modal
      :show="showBlockModal"
      @close="closeBlockModal"
    >
      <NewBlock
        v-if="activeCategoryId"
        :category-id="activeCategoryId"
        @added="closeBlockModal"
      />
    </Modal>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { usePortfolioStore } from '@/stores/portfolioStore'
import NewBlock from '@/components/NewBlock.vue'
import Modal from '@/components/Modal.vue'
import BlockItem from '@/components/BlockItem.vue'
import NewCategory from '@/components/NewCategory.vue'

const store = usePortfolioStore()

const showNewCategoryForm = ref(false)

const activeCategoryId = ref<string | null>(null)

const showBlockModal = ref(false)

const showAddCategoryButton = ref(true)

function openNewCategoryForm() {
  showNewCategoryForm.value = true
  showAddCategoryButton.value = false
}

function handleAddCategory(title: string) {
  store.addCategory(title)
  showNewCategoryForm.value = false
  showAddCategoryButton.value = true
}

function cancelNewCategory() {
  showNewCategoryForm.value = false
  showAddCategoryButton.value = true
}

function openBlockModal(categoryId: string) {
  activeCategoryId.value = categoryId
  showBlockModal.value = true
}

function closeBlockModal() {
  showBlockModal.value = false
  activeCategoryId.value = null
}

function removeCategory(categoryId: string) {
  store.removeCategory(categoryId)
}

function removeBlock(categoryId: string, blockId: string) {
  store.removeBlock(categoryId, blockId)
}
</script>

<style scoped>
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
  border: none;
  border-radius: 10px;
  background: #cd671f;
  color: floralwhite;
  font-size: 16px;
  height: 35px;
  width: 200px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.main__button:hover {
  background: #984f1a;
  transform: scale(1.05);
}

.category__title {
  display: flex;
  gap: 10px;
  align-items: center;
}

.category__button--remove {
  width: 50px;
  height: 40px;
  border: none;
  border-radius: 10px;
  background: #cd0006;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.category__button--remove:hover {
  background: #7a0003;
  transform: scale(1.05);
}
</style>
