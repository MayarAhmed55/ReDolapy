import { createApp } from 'vue'
import App from './App.vue'
import router from './routers/index.js'
import './assets/Style.css'

const app = createApp(App)

app.use(router)


createApp(App).use(router).mount('#app')
