<template>
  <div class="container mx-auto p-4 bg-white shadow-lg rounded-lg">
    <h1 class="text-2xl font-bold mb-6 text-center text-gray-800">커뮤니티 게시판</h1>
    <table class="min-w-full divide-y divide-gray-300">
      <thead class="bg-gray-100">
      <tr>
        <th scope="col" class="px-4 py-2 text-left text-sm font-medium text-gray-700">번호</th>
        <th scope="col" class="px-4 py-2 text-left text-sm font-medium text-gray-700">제목</th>
        <th scope="col" class="px-4 py-2 text-left text-sm font-medium text-gray-700">글쓴이</th>
        <th scope="col" class="px-4 py-2 text-left text-sm font-medium text-gray-700">작성일</th>
        <th scope="col" class="px-4 py-2 text-left text-sm font-medium text-gray-700">조회</th>
        <th scope="col" class="px-4 py-2 text-left text-sm font-medium text-gray-700">추천</th>
      </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-300">
      <tr v-for="post in PostTable" :key="post.id" class="hover:bg-gray-100 transition duration-150 ease-in-out">
        <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{{ post.postId }}</td>

        <td class="text-black font-semibold px-4 py-2 whitespace-nowrap text-sm text-gray-700">
          <router-link :to="{ name: 'PostDetail', params: { id: post.postId } }" class="text-black hover:text-blue-900">
            {{ post.title }}<span class="text-gray-500 pl-1">[{{ post.commentCount }}]</span>
          </router-link>
        </td>
        <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{{ post.nickname}}</td>
        <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{{ post.createTime }}</td>
        <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{{ post.postHit }}</td>
        <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{{ 0 }}</td>
      </tr>
      </tbody>
    </table>
    <router-link to="/boardWriter">
      <button class="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 transition duration-150 ease-in-out">글 작성하기</button>
    </router-link>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import axios from "axios";
import {usePostStore, useUserStore} from "../assets/store.js";

const postStore = usePostStore();
const PostTable = ref([]);

console.log("포스트 테이블",PostTable)

onMounted(async () => {
  await postStore.fetchPosts();
  PostTable.value = postStore.posts;
})





</script>

<style scoped>
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  background: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1 {
  margin-top: 20px;
  color: #333;
}

table {
  margin-top: 20px;
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 12px 15px;
}

th {
  background: #f1f5f9;
  color: #555;
  text-align: left;
  border-bottom: 2px solid #e5e7eb;
}

td {
  border-bottom: 1px solid #e5e7eb;
}

a {
  color: #000; /* 기본 검정색으로 설정 */
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.hover& bg-gray-100:hover {
  background-color: #f3f4f6;
}

.hover& text-blue-900:hover {
  color: #2b6cb0;
}
</style>