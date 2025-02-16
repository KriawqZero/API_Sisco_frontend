import { createApp } from 'vue'
import './style.css'
import router from './router/router'
import App from './App.vue'
import { createPinia } from 'pinia'
import authMiddleware from './middlewares/auth.middleware'

const app = createApp(App)

app.use(createPinia())
app.use(router)

router.beforeEach(authMiddleware);

app.mount('#app')
