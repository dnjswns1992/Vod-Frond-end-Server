import {createWebHistory,createRouter}  from "vue-router";
import Login from "../components/Login.vue";
import Home from "../components/Home.vue";
import CallBack from "../components/CallBack.vue";
import Register from "../components/Register.vue";
import Board from "../components/Board.vue";
import BoardWriter from "../components/BoardWriter.vue";
const router =createRouter({
    history : createWebHistory(),
    routes :[
        {path : '/' , component : Home},
        {path : "/Login" ,component : Login},
        { path: '/callback', component: CallBack },
        {path : '/Register', component: Register},
        {path : '/board', component : Board},
        {path : '/boardWriter', component: BoardWriter},
        ]
})

export default router;