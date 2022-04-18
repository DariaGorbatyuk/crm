import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'materialize-css/dist/js/materialize.min.js'
import messagePlugin from "@/utils/message.plugin";
createApp(App)
    .use(store)
    .use(router)
    .use(messagePlugin)
    .mount('#app')
