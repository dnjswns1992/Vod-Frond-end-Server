<template>
  <div>Loading...</div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { onMounted } from 'vue';
import {useUserStore} from "../assets/store.js";

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

onMounted(async () => {
  let token = route.query['access-token'];
  if (Array.isArray(token)) {
    token = token[0];
    console.log(token);
  }
  if (typeof token === 'string') {
    localStorage.setItem('jwt', token);
    localStorage.setItem("isLogin", 'true');
    userStore.OauthLogin = true;
    userStore.FormLogin = false;
    alert('로그인 되었습니다.');
    await userStore.fetchUserProfile();
    await router.push('/');
  } else {
    console.error('토큰이 없습니다.');
    await router.push('/login');
  }
});
</script>