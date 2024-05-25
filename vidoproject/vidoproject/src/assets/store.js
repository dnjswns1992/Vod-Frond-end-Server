import { defineStore } from 'pinia';
import axios from 'axios';

export const useUserStore = defineStore('user', {
    state: () => ({
        FormLogin: false,
        OauthLogin: false,
        isModal: false,
        LoginCheck: localStorage.getItem('isLogin') || 'false',
        ROLE : '',
        user: {},
    }),
    actions: {
        toggleModal() {
            this.isModal = !this.isModal;
        },
        async fetchUserProfile() {
            try {
                const token = localStorage.getItem("jwt");
                const LoginCheck = localStorage.getItem("isLogin");
                if (token && LoginCheck === "true") {
                    const response = await axios.get("http://localhost:8081/authenticated/getUserInfo", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    this.user = response.data;
                    this.FormLogin = !this.OauthLogin;
                    this.isModal = false;
                    this.LoginCheck = 'true';  // 상태 업데이트
                    this.ROLE = response.data.role;
                }
            } catch (error) {
                console.log(error);
            }
        },
        logout() {
            localStorage.removeItem('jwt');
            localStorage.removeItem('isLogin');
            this.LoginCheck = 'false';
            this.user = {};
            alert("로그아웃 되었습니다.");
        },
    },
});

export const usePostStore = defineStore('post', {
    state: () => ({
        posts: [],
    }),
    actions: {
        async fetchPosts() {
            try {
                const response = await axios.get('http://localhost:8081/user/bring/post');
                this.posts = Array.isArray(response.data) ? response.data : [];
            } catch (error) {
                console.error("Failed to fetch posts", error);
                this.posts = [];
            }
        }
    },
});
