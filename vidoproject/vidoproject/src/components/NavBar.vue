<template>
  <nav class="bg-white">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <button type="button" class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
            <span class="absolute -inset-0.5"></span>
            <span class="sr-only">Open main menu</span>
            <!-- Icon when menu is closed. -->
            <svg class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            <!-- Icon when menu is open. -->
            <svg class="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex flex-shrink-0 items-center">
            <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company">
          </div>
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <router-link to="/" class="bg-black text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page">홈으로 가기</router-link>
              <a href="#" class="text-black font-semibold hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">테마 추천</a>
              <a href="#" class="text-black font-semibold hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">요일별 신작</a>
              <router-link to="/board" href="#" class="text-black font-semibold hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">커뮤니티</router-link>
            </div>
          </div>
        </div>

        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 gap-0">
          <input id="search-bar" class="search-bar" type="text" placeholder="검색어를 입력하세요">
          <router-link v-if="userStore.LoginCheck === 'false'" class="text-black font-semibold hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium" to="/Login">로그인/회원가입</router-link>

          <!-- Profile dropdown -->
          <div class="relative ml-3" v-if="userStore.LoginCheck==='true'">
            <button @click="userStore.toggleModal" type="button" class="mr-4 relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
              <span class="absolute -inset-1.5"></span>
              <span class="sr-only">Open user menu</span>
              <img class="h-8 w-8 rounded-full" src="https://i.namu.wiki/i/eFb4WQiCqn_eR20aTLkki2_mdvVS6qGirWP9tbtTBHZn35yQ6Wo_MjB1UVNFviZqBemJp2J0mgyq0bzS-SawZNtCsMcOYQG7oi0wM9Y3ezqmejyUSH6Q1XhqrmumYvxTI69m2DjX8NGBw-4J_ntITw.webp" alt="User Image">
            </button>
            <!-- Dropdown menu -->
            <div v-if="userStore.isModal" class="absolute right--1 z-10 mt-2 w-64 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
              <div class="p-4 border-b">
                <img class="h-8 w-8 rounded-full" src="https://i.namu.wiki/i/eFb4WQiCqn_eR20aTLkki2_mdvVS6qGirWP9tbtTBHZn35yQ6Wo_MjB1UVNFviZqBemJp2J0mgyq0bzS-SawZNtCsMcOYQG7oi0wM9Y3ezqmejyUSH6Q1XhqrmumYvxTI69m2DjX8NGBw-4J_ntITw.webp" alt="User Image">
                <br>
                <div class="font-bold text-gray-900">{{ userStore.user.username }}</div>
                <div class="text-sm text-gray-600">{{ userStore.user.email }}</div>
              </div>
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabindex="-1" id="user-menu-item-0">프로필 선택</a>
              <div class="flex justify-around p-4">
                <div class="text-center">
                  <div class="font-bold">{{ userStore.user.points }}</div>
                  <div class="text-sm text-gray-600">포인트</div>
                </div>
                <div class="text-center">
                  <div class="font-bold">{{ userStore.user.reviews }}</div>
                  <div class="text-sm text-gray-600">리뷰</div>
                </div>
                <div class="text-center">
                  <div class="font-bold">{{ userStore.user.rank }}</div>
                  <div class="text-sm text-gray-600">등급</div>
                </div>
              </div>
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabindex="-1" id="user-menu-item-6">설정</a>
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabindex="-1" id="user-menu-item-7">고객센터</a>
              <a href="#" @click="userStore.logout()" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabindex="-1" id="user-menu-item-8">로그아웃</a>
            </div>
          </div>
          <button v-if="userStore.LoginCheck==='true' && userStore.FormLogin" @click="userStore.toggleModal()"><span class="font-bold text-gray-900">{{ userStore.user.username }}</span></button>
          <button v-if="userStore.LoginCheck==='true' && userStore.OauthLogin" @click="userStore.toggleModal()"><span class="font-bold text-gray-900">{{ userStore.user.email }}</span></button>

        </div>
      </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state. -->
    <div class="sm:hidden" id="mobile-menu">
      <div class="space-y-1 px-2 pb-3 pt-2">
        <a href="#" class="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" aria-current="page">Dashboard</a>
        <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Team</a>
        <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Projects</a>
        <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Calendar</a>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { onMounted } from "vue";
import { useUserStore } from '../assets/store.js'; // Pinia 스토어 임포트

const userStore = useUserStore(); // Pinia 스토어 사용

onMounted(() => {
  userStore.fetchUserProfile(); // 사용자 프로필 데이터 가져오기
});
</script>

<style scoped>
.search-bar {
  margin-right: 40px;
}
a {
  text-decoration: none;
}
#search-bar {
  margin-right: 70px;
}
</style>
