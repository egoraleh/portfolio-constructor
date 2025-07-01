import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { PortfolioBlock } from "@/types/PortfolioBlock.ts";

export const usePortfolioStore = defineStore('portfolio', () => {
    const blocks = ref<PortfolioBlock[]>([]);

    function addBlock(block: PortfolioBlock) {
        blocks.value.push(block);
    }

    function removeBlock(index: number) {
        blocks.value.splice(index, 1);
    }

    function loadFromLocalStorage() {
        const saved = localStorage.getItem('portfolioBlocks');
        if (saved) {
            blocks.value = JSON.parse(saved);
        }
    }

    watch(
        blocks,
        (newBlocks) => {
            localStorage.setItem('portfolioBlocks', JSON.stringify(newBlocks));
        },
        { deep: true }
    );

    return {
        blocks,
        addBlock,
        removeBlock,
        loadFromLocalStorage
    };
});
