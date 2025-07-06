import { createApp } from 'vue';
import App from '@/App.vue';
import { createPinia } from 'pinia';
import router from '@/router/index.ts';
import BaseButton from '@/ui/base/BaseButton.vue';
import BaseInput from '@/ui/base/BaseInput.vue';
import BaseModal from '@/ui/base/BaseModal.vue';

const app = createApp(App);

app.component('BaseButton', BaseButton);
app.component('BaseInput', BaseInput);
app.component('BaseModal', BaseModal);

app.use(createPinia()).use(router).mount('#app');
