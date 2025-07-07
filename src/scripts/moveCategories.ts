import { PortfolioCategory } from '@/types/PortfolioCategory.ts';
import { PortfolioStore } from '@/stores/portfolioStore.ts';

const updateCategoriesPositions = (store: PortfolioStore): void => {
    store.categories.forEach((category: PortfolioCategory, index: number): void => {
        category.position = index;
    });
    store.saveToLocalStorage();
};

const moveCategoryUp = (store: PortfolioStore, categoryId: string): void => {
    const categoryIndex: number = store.categories.findIndex((c: PortfolioCategory): boolean => c.id === categoryId);
    if (!isFirstCategory(store, categoryId)) {
        const upperCategory: PortfolioCategory = store.categories[categoryIndex - 1];
        store.categories[categoryIndex - 1] = store.categories[categoryIndex];
        store.categories[categoryIndex] = upperCategory;
        updateCategoriesPositions(store);
    }
};

const moveCategoryDown = (store: PortfolioStore, categoryId: string): void => {
    const categoryIndex: number = store.categories.findIndex((c: PortfolioCategory): boolean => c.id === categoryId);
    if (!isLastCategory(store, categoryId)) {
        const lowerCategory: PortfolioCategory = store.categories[categoryIndex + 1];
        store.categories[categoryIndex + 1] = store.categories[categoryIndex];
        store.categories[categoryIndex] = lowerCategory;
        updateCategoriesPositions(store);
    }
};

const isFirstCategory = (store: PortfolioStore, categoryId: string): boolean => {
    const index: number = store.categories.findIndex((c: PortfolioCategory): boolean => c.id === categoryId);
    return index === 0;
};

const isLastCategory = (store: PortfolioStore, categoryId: string): boolean => {
    const index: number = store.categories.findIndex((c: PortfolioCategory): boolean => c.id === categoryId);
    return index === store.categories.length - 1;
};

export { moveCategoryUp, moveCategoryDown, isLastCategory, isFirstCategory };
