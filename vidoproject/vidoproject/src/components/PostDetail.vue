<template>
  <div class="container">
    <div class="post-header">
      <h1 class="post-title">{{ post.title }}</h1>
      <div class="post-meta flex justify-between items-center">
        <div class="author-info flex items-center">
          <div class="author-avatar flex items-center mr-2">
            <img :src="useDetail.imageUrl" alt="Author Avatar" class="rounded-full w-10 h-10">
            <span class="post-author userId ml-2 text-black">{{ post.nickname }}</span>
          </div>
          <div class="ml-4">
            <span class="post-author text-lg font-bold">{{ post.author }}</span>
            <span class="post-date text-sm text-gray-500 text-black">작성일: {{ post.createTime }}</span>
          </div>
        </div>
        <div class="post-stats text-sm text-gray-500">
          <span class="mr-4">조회수: {{ post.postHit }}</span>
          <span>추천수: {{ 0 }}</span>
        </div>
      </div>
    </div>
    <div class="post-content" v-html="post.content"></div>
    <div class="post-actions mt-4 flex justify-between">
      <router-link to="/board" class="btn">목록으로</router-link>
      <div class="nav-buttons">
        <button class="btn">이전 글</button>
        <button class="btn">다음 글</button>
      </div>
    </div>
    <div class="post-comments mt-8">
      <h2 class="comments-title text-2xl font-bold mb-4">댓글</h2>
      <div v-for="comment in comments" :key="comment.commentId" class="comment p-4 mb-4 border rounded-lg bg-gray-50 flex justify-between items-start">
        <div>
          <div class="comment-author font-bold">{{ comment.nickname }}</div>
          <div class="comment-content">{{ comment.content }}</div>
          <div class="comment-date text-sm text-gray-500">{{ comment.createAt }}</div>
        </div>
        <button v-if="comment.nickname === userStore.user.nickname" @click="deleteComment(comment.commentId)" class="btn-delete text-red-500">삭제하기</button>
      </div>

      <div v-if="!isLoggedIn" class="login-prompt mt-4 text-gray-500">
        <br><br>
        댓글을 작성하시려면 로그인이 필요합니다. <router-link to="/login" class="login-link text-blue-500">로그인하기</router-link>
      </div>
      <div v-else class="mt-4">
        <br><br>
        <textarea v-model="newComment" placeholder="댓글을 작성하세요" class="comment-input w-full p-2 border rounded-lg mb-4"></textarea>
        <button @click="submitComment" class="btn">등록</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import {useConfigStore, useUserStore} from '../assets/store.js'; // Pinia 스토어 사용
const isLoggedIn = ref(localStorage.getItem('isLogin') === 'true');
const useDetail = ref({})
const newComment = ref('');
const route = useRoute();
const post = ref({
  title: '',
  content: '',
  author: '',
  createAt: 0,
  date: '',
  likes: 0,
  commentsList: [],
  nickname: ''
});

const comments = ref([]); // 빈 배열로 초기화
const userStore = useUserStore();
const backServer = useConfigStore();

onMounted(async () => {
  await userStore.fetchUserProfile();
  const postId = route.params.id;
  try {
    const response = await axios.get(`${backServer.backUrl}/user/postDetail/${postId}`);
    if (response.status === 200) {
      post.value = response.data.dto;
      console.log(post.value);
    } else if (response.status === 204) {
      console.warn('No content found for this post.');
    }
  } catch (error) {
    console.error('Failed to fetch post details:', error);
  }

  try {
    const response = await axios.get(`${backServer.backUrl}/user/comment/bring/${postId}`);
    if (response.status === 200) {
      console.log(response.data);
      comments.value = response.data;
    }
  } catch (error) {
    console.error('Failed to fetch comments:', error);
  }
});

const submitComment = async () => {
  if (!newComment.value.trim()) {
    alert('댓글을 입력하세요.');
    return;
  }

  // 댓글 제출 로직 구현
  const commentDto = {
    nickname: userStore.user.nickname, // 실제 유저 정보 사용
    content: newComment.value,
    title: post.value.title,
    postId: route.params.id
  };

  // 서버로 댓글 데이터 전송
  try {
    const response = await axios.post(`${backServer.backUrl}/user/comment/write/${route.params.id}`, commentDto, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      }
    });
    console.log(response.status);
    if (response.status === 200) {
      alert('댓글이 등록되었습니다.');

      // 새로운 댓글을 comments 배열에 추가
      comments.value.push(response.data);
      newComment.value = '';
    } else {
      alert('댓글 등록에 실패했습니다.');
    }
  } catch (error) {
    console.error('Failed to submit comment:', error);
    alert('댓글 등록 중 오류가 발생했습니다.');
  }
};

const deleteComment = async (commentId) => {
  try {
    const response = await axios.delete(`${backServer.backUrl}/user/comment/remove/${commentId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      }
    });
    if (response.status === 200) {
      alert('댓글이 삭제되었습니다.');
      // 댓글을 comments 배열에서 제거
      comments.value = comments.value.filter(comment => comment.commentId !== commentId);
    } else {
      alert('댓글 삭제에 실패했습니다.');
    }
  } catch (error) {
    console.error('Failed to delete comment:', error);
    alert('댓글 삭제 중 오류가 발생했습니다.');
  }
};
</script>

<style scoped>
.container {
  width: 100%;
  max-width: 800px;
  margin: 20px auto;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  font-family: Arial, sans-serif;
}

.post-header {
  border-bottom: 1px solid #ddd;
  padding-bottom: 15px;
  margin-bottom: 20px;
}

.post-title {
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.post-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.author-avatar {
  display: flex;
  align-items: center;
}

.author-avatar img {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin-right: 10px;
}

.userId {
  margin-left: 10px;
}

.post-author {
  font-size: 16px;
  font-weight: bold;
  color: #007bff;
}

.post-date {
  font-size: 14px;
  color: #777;
  margin-left: 10px;
}

.post-stats {
  display: flex;
  gap: 10px;
  font-size: 14px;
  color: #555;
}

.post-content {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #f9f9f9;
  color: #444;
  font-size: 16px;
  line-height: 1.6;
}

.post-actions {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

.btn {
  padding: 10px 15px;
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #0056b3;
}

.nav-buttons {
  display: flex;
}

.nav-buttons .btn {
  margin-left: 10px;
}

.post-comments {
  margin-top: 30px;
}

.comments-title {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.login-prompt {
  color: #777;
  margin-bottom: 20px;
}

.login-link {
  color: #007bff;
  text-decoration: none;
}

.login-link:hover {
  text-decoration: underline;
}

.comment-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  resize: vertical;
}

.comment {
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #f9f9f9;
  margin-top: 10px;
}

.comment-author {
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}

.comment-content {
  color: #555;
}

.comment-date {
  color: #777;
}
</style>
