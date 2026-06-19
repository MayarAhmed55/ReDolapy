import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './routers/index.js'
import './assets/Style.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import i18n from './i18n.js'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia).use(router).use(i18n).mount('#app')
