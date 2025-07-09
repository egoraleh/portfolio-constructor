import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { ElementStyle } from '@/types/ElementStyle.ts';

export const useElementStylesStore = defineStore('elementStyles', () => {
    const styles = ref<Record<string, ElementStyle>>({});

    const updateStyle = (elementId: string, key: keyof ElementStyle, value: string) => {
        if (!styles.value[elementId]) {
            styles.value[elementId] = {};
        }
        styles.value[elementId][key] = value;
        saveToLocalStorage();
    };

    const getStyle = (elementId: string): ElementStyle => {
        return styles.value[elementId] || {};
    };

    const saveToLocalStorage = () => {
        localStorage.setItem('element-styles', JSON.stringify(styles.value));
    };

    const loadFromLocalStorage = () => {
        const data = localStorage.getItem('element-styles');
        if (data) {
            styles.value = JSON.parse(data);
        }
    };

    return {
        styles,
        updateStyle,
        getStyle,
        saveToLocalStorage,
        loadFromLocalStorage
    };
});
