//

// src/main.ts
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)

// ✅ Create Pinia instance
const pinia = createPinia()

// ✅ Register Pinia before mounting
app.use(pinia)

app.mount('#app')
