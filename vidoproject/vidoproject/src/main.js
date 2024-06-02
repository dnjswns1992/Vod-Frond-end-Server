import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { faDownLeftAndUpRightToCenter } from "@fortawesome/free-solid-svg-icons"
import { createPinia } from "pinia"
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import router from './router/router.js'
import './style.css'

const app = createApp(App);
const pinia = createPinia();

// Add FontAwesome icons to the library
library.add(faDownLeftAndUpRightToCenter);

// Register FontAwesomeIcon component globally
app.component('font-awesome-icon', FontAwesomeIcon);

app.config.globalProperties.$axios = axios;
app.use(router);
app.use(pinia);
app.mount('#app');
