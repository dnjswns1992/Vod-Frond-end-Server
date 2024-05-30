import {createWebHistory,createRouter}  from "vue-router";
import Login from "../components/Login.vue";
import Home from "../components/Home.vue";
import CallBack from "../components/CallBack.vue";
import Register from "../components/Register.vue";
import Board from "../components/Board.vue";
import BoardWriter from "../components/BoardWriter.vue";
import PostDetail from "../components/PostDetail.vue";
import EmailLogin from "../components/EmailLogin.vue";
import Profile from "../components/Profile.vue";
import VideoUpload from "../components/videoUpload.vue";
import VideoPlayer from "../components/videoPlayer.vue";
import VideoInfo from "../components/VideoInfo.vue";
const router =createRouter({
    history : createWebHistory(),
    routes :[
        {path : '/' , component : Home},
        {path : "/Login" ,component : Login},
        { path: '/callback', component: CallBack },
        {path : '/Register', component: Register},
        {path : '/board', component : Board},
        {path : '/boardWriter', component: BoardWriter},
        {path : '/boardDetail/:id' , component : PostDetail,name :'PostDetail'},
        {path : '/profile', component : Profile},
        {path : '/videoUpload', component : VideoUpload},
        {path : '/video' ,component: VideoPlayer},
        {path : '/videoInfo' , component : VideoInfo},

        ]
})

export default router;