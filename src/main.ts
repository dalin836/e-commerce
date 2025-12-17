//

// src/main.ts
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router';

const app = createApp(App);
app.use(router);
// app.mount('#app');


//  Create Pinia instance
const pinia = createPinia()

//  Register Pinia before mounting
app.use(pinia)

app.mount('#app')
