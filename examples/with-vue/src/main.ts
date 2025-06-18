import { createApp } from 'vue'
import App from './App.vue'
import { RainbowKitPlugin } from 'rainbowkit-vue'

createApp(App)
    .use(RainbowKitPlugin)
    .mount('#app')
