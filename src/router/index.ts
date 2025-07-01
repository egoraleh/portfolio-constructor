import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import Home from "@/views/Home.vue";
import Instruction from "@/views/Instruction.vue";

const routes: Array<RouteRecordRaw> = [
    { path: '/', component: Home, meta: { title: 'Главная' } },
    { path: '/instruction', component: Instruction, meta: { title: 'Инструкция' } }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.afterEach((to) => {
    document.title = typeof to.meta.title === 'string' ? to.meta.title : 'Default Title'
});

export default router;