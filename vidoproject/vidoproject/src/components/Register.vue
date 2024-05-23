<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
      <h2 class="text-2xl font-bold mb-6 text-center text-gray-700">회원 가입</h2>
      <form @submit.prevent="submitForm">
        <div class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">이메일</label>
            <input id="email" type="email" v-model="email" @blur="checkDuplicateEmail" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="이메일을 입력하세요" />
            <div v-if="DuplicateUserEmailCheck === false" class="alert alert-success"><span>{{ DuplicateUserEmail }}</span></div>
            <div v-if="DuplicateUserEmailCheck === true" class="alert alert-danger"><span>{{ DuplicateUserEmail }}</span></div>
          </div>
          <div>
            <label for="username" class="block text-sm font-medium text-gray-700">아이디</label>
            <input id="username" type="text" v-model="username" @blur="checkDuplicateUsername" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="아이디를 입력하세요" />
            <div v-if="DuplicateUserNameCheck === false" class="alert alert-success"><span>{{ DuplicateUserName }}</span></div>
            <div v-if="DuplicateUserNameCheck === true" class="alert alert-danger"><span>{{ DuplicateUserName }}</span></div>
          </div>
          <div>
            <label for="nickname" class="block text-sm font-medium text-gray-700">닉네임</label>
            <input id="nickname" type="text" v-model="nickname" @blur="checkDuplicateNickname" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="닉네임을 입력하세요" />
            <div v-if="DuplicateUserNickNameCheck === false" class="alert alert-success"><span>{{ DuplicateUserNickName }}</span></div>
            <div v-if="DuplicateUserNickNameCheck === true" class="alert alert-danger"><span>{{ DuplicateUserNickName }}</span></div>
          </div>
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">비밀번호</label>
            <input id="password" type="password" v-model="password" @input="validatePassword" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="비밀번호를 입력하세요" />
            <div v-if="isPassWordCheck === false" class="alert alert-danger mt-3" role="alert">{{ passwordError }}</div>
            <div v-if="isPassWordCheck === true" class="alert alert-success mt-3" role="alert">{{ passwordError }}</div>
          </div>
          <div>
            <label for="passwordCheck" class="block text-sm font-medium text-gray-700">비밀번호 확인</label>
            <input id="passwordCheck" type="password" v-model="passwordCheck" @input="validatePassword" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="비밀번호를 다시 입력하세요" />
          </div>
          <div class="flex items-center space-x-4">
            <div class="flex items-center">
              <input id="female" type="radio" value="female" v-model="gender" class="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
              <label for="female" class="ml-2 block text-sm font-medium text-gray-700">여성</label>
            </div>
            <div class="flex items-center">
              <input id="male" type="radio" value="male" v-model="gender" class="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
              <label for="male" class="ml-2 block text-sm font-medium text-gray-700">남성</label>
            </div>
          </div>
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input id="agree" type="checkbox" v-model="agree" class="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
            </div>
            <div class="ml-3 text-sm">
              <label for="agree" class="font-medium text-gray-700">이용약관 개인정보 수집 및 이용, 마케팅 활용 선택에 모두 동의합니다.</label>
            </div>
          </div>
          <div class="mt-6">
            <button type="submit" class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">가입하기</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>


<script setup>
import { ref, watch } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const email = ref('');
const username = ref('');
const password = ref('');
const passwordCheck = ref('');
const nickname = ref('');
const gender = ref('');
const agree = ref(false);
const passwordError = ref('');
const isPassWordCheck = ref(false);

/* 사용자 로그인 중복 체크 */

const DuplicateUserNickName = ref('');
const DuplicateUserNickNameCheck = ref(false);
const DuplicateUserEmail = ref('');
const DuplicateUserEmailCheck = ref(false);
const DuplicateUserName = ref('');
const DuplicateUserNameCheck = ref(false);

const router = useRouter();

const validatePassword = () => {
  const passwordPattern = /^(?=.*[a-z])(?=.*\d).{8,}$/;
  if (!passwordPattern.test(password.value)) {
    passwordError.value = '비밀번호는 숫자 영문 8글자 이상이어야 합니다.';
    isPassWordCheck.value = false;
  } else {
    isPassWordCheck.value = true;
    passwordError.value = '안전한 비밀번호 입니다!';
  }
};
watch(password, validatePassword);

const checkDuplicateEmail = async () => {
  try {
    const response = await axios.post('http://localhost:8081/check-email', { email: email.value });
    DuplicateUserEmailCheck.value = response.data.exists;
    DuplicateUserEmail.value = response.data.exists ? '사용중인 이메일 입니다.' : '사용가능한 이메일 입니다.';
  } catch (error) {
    console.error('Error checking email:', error);
  }
};

const checkDuplicateUsername = async () => {
  try {
    const response = await axios.post('http://localhost:8081/check-username', { username: username.value });
    DuplicateUserNameCheck.value = response.data.exists;
    DuplicateUserName.value = response.data.exists ? '사용중인 아이디입니다.' : '사용가능한 아이디 입니다.';
  } catch (error) {
    console.error('Error checking username:', error);
  }
};

const checkDuplicateNickname = async () => {
  try {
    const response = await axios.post('http://localhost:8081/check-nickname', { nickname: nickname.value });
    DuplicateUserNickNameCheck.value = response.data.exists;
    DuplicateUserNickName.value = response.data.exists ? '사용중인 닉네임 입니다.' : '사용가능한 닉네임 입니다.';
  } catch (error) {
    console.error('Error checking nickname:', error);
  }
};

const submitForm = async () => {
  validatePassword();
  if (!isPassWordCheck.value) {
    alert("비밀번호를 확인하세요.");
    return;
  }

  if (!email.value || !username.value || !password.value || !passwordCheck.value || !nickname.value || !gender.value || !agree.value) {
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
      gender: gender.value,
      nickname: nickname.value,
    });

    if (response.status === 200) {
      alert("회원가입이 완료되었습니다.");
      await router.push('/');
    }
  } catch (error) {
    if (error.response && error.response.status === 409) {
      const errorMessage = error.response.data.message || error.response.data; // 에러 메시지가 객체 안에 있는 경우를 처리

      if (errorMessage.includes("NickName Duplicate")) {
        DuplicateUserNickName.value = '사용중인 닉네임 입니다.';
        DuplicateUserNickNameCheck.value = true;
      } else {
        DuplicateUserNickName.value = '사용가능한 닉네임 입니다.';
        DuplicateUserNickNameCheck.value = false;
      }

      if (errorMessage.includes("Email Duplicate")) {
        DuplicateUserEmail.value = '사용중인 이메일 입니다.';
        DuplicateUserEmailCheck.value = true;
      } else {
        DuplicateUserEmail.value = '사용가능한 이메일 입니다.';
        DuplicateUserEmailCheck.value = false;
      }

      if (errorMessage.includes("UserName Duplicate")) {
        DuplicateUserName.value = '사용중인 아이디입니다.';
        DuplicateUserNameCheck.value = true;
      } else {
        DuplicateUserName.value = '사용가능한 아이디 입니다.';
        DuplicateUserNameCheck.value = false;
      }
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

.alert {
  padding: 0.75rem;
  margin-top: 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
}

.alert-danger {
  background-color: #f8d7da;
  color: #721c24;
}

.alert-success {
  background-color: #d4edda;
  color: #155724;
}
</style>