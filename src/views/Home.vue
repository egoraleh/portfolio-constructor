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

function openNewCategoryForm() {
  showNewCategoryForm.value = true
}

function handleAddCategory(title: string) {
  store.addCategory(title)
  console.log(store.categories)
  showNewCategoryForm.value = false
}

function cancelNewCategory() {
  showNewCategoryForm.value = false
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

<template>
  <section class="main">
    <h1 class="main__header">
      Конструктор портфолио
    </h1>
    
    <p>
      <router-link
        class=""
        to="/instruction"
      >
        (См. инструкцию)
      </router-link>
    </p>
    
    <button
      class="main__button main__button--add-category"
      @click="openNewCategoryForm"
    >
      Добавить категорию
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
      <h2 class="category__title">
        {{ category.title }}
      </h2>

      <button
        class="category__button category__button--add"
        @click="() => openBlockModal(category.id)"
      >
        Добавить блок в категорию
      </button>
      <button
        class="category__button category__button--remove"
        @click="() => removeCategory(category.id)"
      >
        Удалить категорию
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

<style scoped>

</style>
