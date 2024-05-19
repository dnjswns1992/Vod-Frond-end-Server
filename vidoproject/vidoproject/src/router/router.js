import {createWebHistory,createRouter}  from "vue-router";
import Login from "../components/Login.vue";
import Home from "../components/Home.vue";
const router =createRouter({
    history : createWebHistory(),
    routes :[
        {path : '/' , component : Home},
        {path : "/Login" ,component : Login},
        ]
})

export default router;