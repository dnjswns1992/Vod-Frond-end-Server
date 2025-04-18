<template>
  <div class="relative">
    <h1 class="text-black font-semibold text-2xl">영화</h1>
    <a href="#" class="absolute top-4 right-0 mt-2 mr-6 text-black font-semibold">더보기</a>
    <hr class="my-4">
    <div class="grid grid-cols-7 gap-1">
      <div v-for="movie in movies" :key="movie.uploadMainTitleEntityId" class="col-span-1">
        <a class="m-0" href="#" @click.prevent="navigateToVideoInfo(movie.uploadMainTitleEntityId)">
          <div class="w-full h-72 overflow-hidden rounded-lg border border-gray-300 hover:transform hover:translate-y-[-5px] transition-transform duration-300">
            <img :src="movie.imageUrl" :alt="movie.title" class="w-full h-full object-cover rounded-lg">
          </div>
        </a>
        <p class="mt-2 text-center text-black font-semibold">{{ movie.title }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, computed, onMounted} from 'vue';
import axios from 'axios';
import fetchAnimationData from '../assets/animation.js';
import fetchMovies from '../assets/movie.js';
import {useRouter} from 'vue-router';
import {MovieEpisodeStore, useConfigStore, useEpisodeStore} from "../assets/store.js";


const movies = ref([]);
const loading = ref(true);
const error = ref(null);
const isExpanded = ref(false);
const router = useRouter();
const configStore = useConfigStore();
const episodeStore = MovieEpisodeStore();



const toggleDescription = () => {
  isExpanded.value = !isExpanded.value;
};

const closeModal = () => {
  episodeStore.isModalVisible = false;
};

const formatDate = (datetime) => {
  const date = new Date(datetime);
  return date.toLocaleDateString();
};

onMounted(async () => {
  try {
    movies.value = await fetchMovies(); // 이렇게 사용!
  } catch (e) {
    error.value = 'Error fetching movie data';
    console.error(e);
  } finally {
    loading.value = false;
  }
});

const navigateToVideoInfo = (id) => {
  const token = localStorage.getItem('jwt');
  if (!token) {
    alert("로그인을 하십시오!");
    router.push("/login");
    return;
  }

  router.push({
    path: '/movieVideoInfo', // ✅ 여기 경로를 애니에서 영화로 바꿔야 함!!
    query: { id: id }
  });
};

</script>

<style scoped>
a {
  text-decoration: none;
}

h2 {
  color: #1a1a1a;
}

h3, h4 {
  color: #1a1a1a;
}

.cursor-pointer {
  cursor: pointer;
}

.text-blue-500 {
  color: #3b82f6;
}

.modal-content {
  padding: 20px;
}

.modal-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.modal-image-container {
  flex: 0 0 200px;
  max-width: 200px;
  margin-right: 20px;
}

.modal-image {
  width: 100%;
  height: auto;
}

.modal-info {
  flex: 1;
}

.additional-info {
  margin-top: 10px;
  font-size: 14px;
  color: #666;
}

.episodes-list {
  width: 80%;
}

.hover\:transform:hover {
  transform: translateY(-20px);
}

.transition-transform {
  transition: transform 0.1s;
}

.progress-container {
  width: 100%;
  background-color: #f3f3f3;
  border-radius: 5px;
  margin-top: 20px;
  overflow: hidden;
}

.progress-bar {
  height: 20px;
  background-color: #4caf50;
  width: 0;
  transition: width 0.3s;
}
</style>
