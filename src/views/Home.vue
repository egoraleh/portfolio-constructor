<script setup lang="ts">
import { ref } from 'vue'
import { usePortfolioStore } from '@/stores/portfolioStore'
import NewBlock from '@/components/NewBlock.vue'
import Modal from '@/components/Modal.vue'
import BlockItem from '@/components/BlockItem.vue'

const store = usePortfolioStore()

const showModal = ref(false)

function openModal() {
  showModal.value = true
}

function closeModal() {
  showModal.value = false
}

function removeBlock(index: number) {
  store.removeBlock(index)
}
</script>

<template>
  <div class="home">
    <h1>Мои блоки</h1>

    <button @click="openModal">Добавить новый блок</button>

    <div class="blocks">
      <BlockItem 
        v-for="(block, index) in store.blocks"
        :key="index"
        :block="block"
        @remove="removeBlock(index)"
      />
    </div>

    <Modal
      :show="showModal"
      @close="closeModal"
    >
      <NewBlock />
    </Modal>
  </div>
</template>

<style scoped>

</style>
