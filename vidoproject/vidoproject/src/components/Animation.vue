<template>
  <div class="relative">
    <h1 class="text-black font-semibold text-2xl">애니메이션</h1>
    <a href="#" class="absolute top-4 right-0 mt-2 mr-6 text-black font-semibold">더보기</a>
    <hr class="my-4">
    <div class="grid grid-cols-7 gap-1">
      <div v-for="movie in movies" :key="movie.uploadMainTitleEntityId" class="col-span-1">
        <a class="m-0" href="#" @click.prevent="fetchEpisodes(movie.uploadMainTitleEntityId)">
          <div class="w-full h-72 overflow-hidden rounded-lg border border-gray-300">
            <img :src="movie.imageUrl" :alt="movie.title" class="w-full h-full object-cover rounded-lg">
          </div>
        </a>
        <p class="mt-2 text-center text-black font-semibold">{{ movie.title }}</p>
      </div>
    </div>
    <!-- Modal 컴포넌트 -->
    <AnimationModal :visible="isModalVisible" @close="isModalVisible = false">
      <h2 class="text-xl font-bold mb-4">Episodes</h2>
      <ul>
        <li v-for="episode in episodes" :key="episode.episodeId" class="mb-2">
          <h3 class="text-lg font-semibold">{{ episode.episodeNumber }}</h3>
          <p @click="navigateToVideo(episode.videoUrl)" class="cursor-pointer text-blue-500">{{ episode.description }}</p>
        </li>
      </ul>
    </AnimationModal>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import fetchAnimationData from '../assets/animation.js';
import AnimationModal from "./AnimationModal.vue";
import { useRouter } from 'vue-router';

const movies = ref([]);
const loading = ref(true);
const error = ref(null);
const isModalVisible = ref(false);
const episodes = ref([]);
const router = useRouter();

onMounted(async () => {
  try {
    movies.value = await fetchAnimationData();
  } catch (e) {
    error.value = 'Error fetching animation data';
    console.error(e);
  } finally {
    loading.value = false;
  }
});

const fetchEpisodes = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8081/api/animation/episode/${id}`);
    episodes.value = response.data;
    isModalVisible.value = true; // 모달 창 열기
  } catch (e) {
    console.error('Error fetching episodes:', e);
  }
};

const navigateToVideo = (videoUrl) => {
  router.push({ path: '/video', query: { url: videoUrl } }); // 라우터를 사용하여 새로운 페이지로 이동
};
</script>

<style scoped>
a {
  text-decoration: none;
}

h2 {
  color: #333;
}

h3 {
  color: #555;
}

.cursor-pointer {
  cursor: pointer;
}
.text-blue-500 {
  color: #3b82f6;
}
</style>
