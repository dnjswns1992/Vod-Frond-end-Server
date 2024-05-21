import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import './assets/tailwind.css'
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {createPinia} from "pinia";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import router from './router/router.js'
const app = createApp(App);
const pinia = createPinia();
app.config.globalProperties.$axios = axios;
app.use(router);
app.use(pinia);
app.mount('#app');
