import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { PortfolioCategory } from '@/types/PortfolioCategory.ts'
import { nanoid } from 'nanoid'
import { PortfolioBlock } from '@/types/PortfolioBlock.ts';

export interface PortfolioStore {
    categories: PortfolioCategory[];

    addCategory(title: string): void;
    removeCategory(categoryId: string): void;

    addBlock(categoryId: string, block: Omit<PortfolioBlock, 'id' | 'position'>): void;
    removeBlock(categoryId: string, blockId: string): void;

    saveToLocalStorage(): void;
    loadFromLocalStorage(): void;
}

export const usePortfolioStore = defineStore('portfolio', () => {
    const categories = ref<PortfolioCategory[]>([])

    const addCategory = (title: string): void => {
        categories.value.push({
            id: nanoid(),
            title,
            position: categories.value.length + 1,
            blocks: []
        });
        saveToLocalStorage();
    };

    const removeCategory = (categoryId: string): void => {
        categories.value = categories.value.filter(c => c.id !== categoryId);
        saveToLocalStorage();
    };

    const addBlock = (categoryId: string, block: Omit<PortfolioBlock, 'id' | 'position'>): void => {
        const category = categories.value.find(c => c.id === categoryId);
        if (category) {
            category.blocks.push({
                id: nanoid(),
                position: category.blocks.length + 1,
                ...block
            })
            saveToLocalStorage();
        }
    };

    const removeBlock = (categoryId: string, blockId: string): void => {
        const category = categories.value.find(c => c.id === categoryId);
        if (category) {
            category.blocks = category.blocks.filter(b => b.id !== blockId);
            saveToLocalStorage();
        }
    };

    const saveToLocalStorage = (): void => {
        localStorage.setItem('portfolio-data', JSON.stringify(categories.value));
    };

    const loadFromLocalStorage = (): void => {
        const data: string | null = localStorage.getItem('portfolio-data');
        if (data) {
            categories.value = JSON.parse(data);
        }
    };

    return {
        categories,
        addCategory,
        removeCategory,
        addBlock,
        removeBlock,
        saveToLocalStorage,
        loadFromLocalStorage
    };
});
