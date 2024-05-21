<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
      <h2 class="text-2xl font-bold mb-6 text-center text-gray-700">회원 가입</h2>
      <form @submit.prevent="submitForm">
        <div class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">이메일</label>
            <input id="email" type="email" v-model="email" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="이메일을 입력하세요" />
          </div>
          <div>
            <label for="username" class="block text-sm font-medium text-gray-700">아이디</label>
            <input id="username" type="text" v-model="username" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="아이디를 입력하세요" />
          </div>
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">비밀번호</label>
            <input id="password" type="password" v-model="password" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="비밀번호를 입력하세요" />
          </div>
          <div>
            <label for="passwordCheck" class="block text-sm font-medium text-gray-700">비밀번호 확인</label>
            <input id="passwordCheck" type="password" v-model="passwordCheck" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="비밀번호를 다시 입력하세요" />
          </div>
          <div class="flex items-center">
            <input id="female" type="radio" value="female" v-model="gender" class="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
            <label for="female" class="ml-2 block text-sm font-medium text-gray-700">여성</label>
            <input id="male" type="radio" value="male" v-model="gender" class="ml-4 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
            <label for="male" class="ml-2 block text-sm font-medium text-gray-700">남성</label>
          </div>
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input id="agree" type="checkbox" v-model="agree" class="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
            </div>
            <div class="ml-3 text-sm">
              <label for="agree" class="font-medium text-gray-700">이용약관 개인정보 수집 및 이용, 마케팅 활용 선택에 모두 동의합니다.</label>
            </div>
          </div>
        </div>
        <div class="mt-6">
          <button type="submit" class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">가입하기</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const email = ref('');
const username = ref('');
const password = ref('');
const passwordCheck = ref('');
const gender = ref('');
const agree = ref(false);

const router = useRouter();

const submitForm = async () => {
  if (!email.value || !username.value || !password.value || !passwordCheck.value || !gender.value || !agree.value) {
    alert("모든 필수 항목을 입력하고 동의해주세요.");
    return;
  }

  if (password.value !== passwordCheck.value) {
    alert("비밀번호가 일치하지 않습니다.");
    return;
  }

  try {
    const response = await axios.post('http://localhost:8081/register', {
      email: email.value,
      username: username.value,
      password: password.value,
      gender: gender.value
    });

    if (response.status === 200) {
      alert("회원가입이 완료되었습니다.");
      await router.push('/');
    }
  } catch (error) {
    if (error.response && error.response.status === 409) {
      alert("사용중인 아이디 입니다.");
    } else {
      console.error(error);
    }
  }
};
</script>
