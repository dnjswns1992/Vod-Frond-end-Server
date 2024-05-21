import { defineStore } from 'pinia';
import axios from 'axios';

export const useUserStore = defineStore('user', {
    state: () => ({
        FormLogin: false,
        OauthLogin: false,
        isModal: false,
        LoginCheck: localStorage.getItem('isLogin') || 'false',
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
