import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'materialize-css/dist/js/materialize.min.js'
import messagePlugin from "@/utils/message.plugin";
let app
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
    apiKey: "AIzaSyB2Ro_NJE4MBj524NX6_Rw4BGCwtUY6Ht4",
    authDomain: "vue-crm-b2ea8.firebaseapp.com",
    projectId: "vue-crm-b2ea8",
    storageBucket: "vue-crm-b2ea8.appspot.com",
    messagingSenderId: "567967453579",
    appId: "1:567967453579:web:c956e761f4d96830fd5f8e"
};
const appFire = initializeApp(firebaseConfig);
const auth = getAuth();
onAuthStateChanged(auth,(user)=>{
    if(!app){
        app = createApp(App)
            .use(store)
            .use(router)
            .use(messagePlugin)
            .mount('#app')
    }
})

