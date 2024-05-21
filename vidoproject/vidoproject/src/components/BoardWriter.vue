<template>
  <div class="container mx-auto p-4 bg-white shadow-lg rounded-lg">
    <h1 class="text-2xl font-bold mb-6 text-center text-gray-800">글 작성하기</h1>
    <form @submit.prevent="submitPost">
      <div class="mb-4">
        <label for="title" class="block text-gray-700 font-semibold mb-2">제목</label>
        <input type="text" id="title" v-model="title" class="w-full p-2 border border-gray-300 rounded-md" required>
      </div>
      <div class="mb-4">
        <label for="author" class="block text-gray-700 font-semibold mb-2">사용자 이름</label>
        <input type="text" id="author" v-model="author" :readonly="isUserLoggedIn" class="w-full p-2 border border-gray-300 rounded-md">
      </div>
      <div class="mb-4">
        <label for="content" class="block text-gray-700 font-semibold mb-2">내용</label>
        <textarea id="content" v-model="content" class="w-full p-2 border border-gray-300 rounded-md" rows="6" required></textarea>
      </div>
      <div class="flex justify-end">
        <router-link to="/" class="bg-gray-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-600 transition duration-150 ease-in-out">취소</router-link>
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-150 ease-in-out">작성하기</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../assets/store.js';

const title = ref('');
const author = ref('');
const content = ref('');
const isUserLoggedIn = ref(false);
const router = useRouter();
const userStore = useUserStore();

onMounted(async () => {
  const jwtToken = localStorage.getItem('jwt');
  const isCheckLogin = localStorage.getItem('ischeckLogin') === 'true';

  if (!jwtToken && !isCheckLogin) {
    alert('로그인을 해주세요.');
    await router.push('/login');
    return;
  }

  await userStore.fetchUserProfile();
  if (userStore.user && userStore.FormLogin) {
    author.value = userStore.user.username;
    isUserLoggedIn.value = true;
  }
  else if(userStore.user && userStore.OauthLogin) {
    author.value = userStore.user.email;
    isUserLoggedIn.value = true;
  }
});

const submitPost = async () => {
  if(title.value && author.value && content.value) {
    const PostDto = {
      title : title.value,
      username : author.value,
      content : content.value,
      postHit : 0,
    };

    try {
      const response = await fetch('http://localhost:8081/user/createPost' , {
        method: 'POST',
        headers : {
          'Content-Type': 'application/json',
          'Authorization' : `Bearer ${localStorage.getItem('jwt')}`
        },
        body : JSON.stringify(PostDto)
      });

      if(response.ok) {
        alert("글이 작성되었습니다.");
        await router.push("/board");
      } else if(response.status === 401) {
        alert("권한이 없습니다.");
        await router.push("/Login")
      }
    } catch (error) {
      if(error.response && error.response.status === 400) alert("글을 작성할 수 없습니다.");
      else alert(`오류가 발생했습니다: ${error.message}`);
    }
  }
};
</script>

<style scoped>
.container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  background: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

h1 {
  margin-bottom: 1.5rem;
  color: #333;
}

form {
  margin-top: 1rem;
}

label {
  font-size: 0.875rem;
}

input,
textarea {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  font-size: 1rem;
  color: #4a5568;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #63b3ed;
  box-shadow: 0 0 0 1px #63b3ed;
}

button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: 600;
}

.bg-blue-500:hover {
  background-color: #2b6cb0;
}

.bg-gray-500:hover {
  background-color: #4a5568;
}
</style>