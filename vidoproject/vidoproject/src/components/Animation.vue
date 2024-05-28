<template>
  <div class="relative">
    <h1 class="text-black font-semibold text-2xl">애니메이션</h1>
    <a href="#" class="absolute top-4 right-0 mt-2 mr-6 text-black font-semibold">더보기</a>
    <hr class="my-4">
    <div class="grid grid-cols-7 gap-1">
      <div v-for="movie in movies" :key="movie.uploadMainTitleEntityId" class="col-span-1">
        <a class="m-0" href="#" @click.prevent="fetchEpisodes(movie.uploadMainTitleEntityId)">
          <div class="w-full h-72 overflow-hidden rounded-lg border border-gray-300 hover:transform hover:translate-y-[-5px] transition-transform duration-300">
            <img :src="movie.imageUrl" :alt="movie.title" class="w-full h-full object-cover rounded-lg">
          </div>
        </a>
        <p class="mt-2 text-center text-black font-semibold">{{ movie.title }}</p>
      </div>
    </div>
    <!-- Modal 컴포넌트 -->
    <AnimationModal :visible="episodeStore.isModalVisible" @close="closeModal">
      <div class="modal-content">
        <div class="modal-header">
          <div class="modal-image-container">
            <img :src="episodeStore.currentMovie.imageUrl" alt="Animation" class="modal-image">
          </div>
          <div class="modal-info">
            <h2 class="text-2xl font-bold mb-2">{{ episodeStore.currentMovie.title }}</h2>
            <p class="text-gray-600 mb-4">
              {{ isExpanded ? episodeStore.mainTitleDescription : truncatedDescription }}
              <button @click="toggleDescription" class="text-blue-500 cursor-pointer ml-2">
                {{ isExpanded ? "접기" : "더보기" }}
              </button>
            </p>
            <div class="additional-info">
              <p><strong>제작:</strong> {{ episodeStore.currentMovie.producer }}</p>
              <p><strong>출시:</strong> {{ episodeStore.currentMovie.releaseDate }}</p>
            </div>
          </div>
        </div>
        <h3 class="text-xl font-semibold mb-2">Episodes</h3>
        <ul class="episodes-list">
          <li v-for="episode in episodeStore.episodes" :key="episode.episodeId" class="mb-4 flex items-center">
            <img :src="episode.imageUrl" :alt="episode.description" class="w-32 h-32 object-cover rounded-lg mr-4">
            <div>
              <h4 class="text-lg font-semibold">{{ episode.episodeNumber }}</h4>
              <p @click="navigateToVideo(episode)" class="cursor-pointer text-cyan-500">{{ episode.description }}</p>
            </div>
          </li>
        </ul>
      </div>
    </AnimationModal>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import fetchAnimationData from '../assets/animation.js';
import AnimationModal from "./AnimationModal.vue";
import { useRouter } from 'vue-router';
import { useConfigStore, useEpisodeStore } from "@/assets/store.js";

const movies = ref([]);
const loading = ref(true);
const error = ref(null);
const isExpanded = ref(false);
const router = useRouter();
const configStore = useConfigStore();
const episodeStore = useEpisodeStore();

const truncatedDescription = computed(() => {
  return episodeStore.mainTitleDescription.length > 100
      ? episodeStore.mainTitleDescription.slice(0, 100) + '...'
      : episodeStore.mainTitleDescription;
});

const toggleDescription = () => {
  isExpanded.value = !isExpanded.value;
};

const closeModal = () => {
  episodeStore.isModalVisible = false;
};

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
  const token = localStorage.getItem('jwt');
  if (!token) {
    alert("로그인을 하십시오!");
    router.push("/login");
    return;
  }

  try {
    await episodeStore.fetchEpisodes(id);
    episodeStore.isModalVisible = true; // Ensure modal is only shown if fetch is successful
  } catch (e) {
    console.error('Failed to fetch episodes:', e);
  }
};

const navigateToVideo = (episode) => {
  const videoUrl = episode.videoUrl;
  const posterUrl = episode.imageUrl;
  router.push({
    path: '/video',
    query: {
      url1080: videoUrl,
      poster: posterUrl,
      description: episodeStore.mainTitleDescription,
      episodeNumber: episodeStore.episodeNumber,
    }
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
</style>
