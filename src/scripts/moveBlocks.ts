import { PortfolioCategory } from '@/types/PortfolioCategory.ts';
import { PortfolioBlock } from '@/types/PortfolioBlock.ts';
import { PortfolioStore } from '@/stores/portfolioStore.ts';

const updateBlocksPositions = (store: PortfolioStore, category: PortfolioCategory): void => {
    category.blocks.forEach((block: PortfolioBlock, index: number): void => {
        block.position = index;
    });
    store.saveToLocalStorage();
};

const moveBlockUp = (store: PortfolioStore, categoryId: string, blockId: string): void => {
    const category: PortfolioCategory | undefined = store.categories.find((c: PortfolioCategory): boolean => c.id === categoryId);
    if (!category) return;

    const index: number = category.blocks.findIndex((b: PortfolioBlock): boolean => b.id === blockId);
    if (index > 0) {
        const upperBlock: PortfolioBlock = category.blocks[index - 1];
        category.blocks[index - 1] = category.blocks[index];
        category.blocks[index] = upperBlock;
        updateBlocksPositions(store, category);
    }
};

const moveBlockDown = (store: PortfolioStore, categoryId: string, blockId: string): void => {
    const category: PortfolioCategory | undefined = store.categories.find((c: PortfolioCategory): boolean => c.id === categoryId);
    if (!category) return;

    const index: number = category.blocks.findIndex((b: PortfolioBlock): boolean => b.id === blockId);
    if (index < category.blocks.length - 1) {
        const lowerBlock: PortfolioBlock = category.blocks[index + 1];
        category.blocks[index + 1] = category.blocks[index];
        category.blocks[index] = lowerBlock;
        updateBlocksPositions(store, category);
    }
};

export { moveBlockUp, moveBlockDown };
