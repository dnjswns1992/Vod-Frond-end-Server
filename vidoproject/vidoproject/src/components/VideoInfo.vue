<template>
  <div class="bg-[#141414] text-white min-h-screen">
    <div v-if="mainTitle">
      <img :src="mainTitle.mainTitleImageUrl">
      <br><br><br><br>

      <h1 class="ml-12 text-amber-400">제목 | {{mainTitle.title}}</h1>
      <br>
      <h3 class="ml-12">줄거리</h3>
      <br>
      <p class="fs-p ml-12">{{mainTitle.mainTitleDescription}}</p>
    </div>
    <br><br><br>

    <div class="mr-14 ml-14">
      <div class="grid grid-cols-4 gap-4 mx-auto">
        <div
            v-for="(info, index) in episode"
            :key="info.episodeId"
            class="p-2">
          <div
              class="w-full h-40 overflow-hidden cursor-pointer"
              @click="navigateToVideo(info.videoUrl, info.episodeNumber, info.subtitleUrl)">
            <img :src="info.imageUrl"
                 class="w-full h-full object-cover hover:opacity-75 transition-opacity duration-200 fixed-size">
          </div>
          <p class="mt-2 text-violet-400">{{ info.episodeNumber }}</p>
          <p class="mt-2 fs">{{ info.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import axios from 'axios';
import {useConfigStore} from "../assets/store.js";

const mainTitle = ref(null);
const episode = ref([]);
const route = useRoute();
const router = useRouter();
const configStore = useConfigStore();

onMounted(async () => {
  const id = route.query.id;
  if (id) {
    try {
      const response = await axios.get(`${configStore.backUrl}/api/animation/episode/${id}`);
      mainTitle.value = response.data.uploadMainTitleEntity;
      episode.value = response.data.episode;
    } catch (error) {
      console.error('Failed to fetch movie details:', error);
    }
  }
});

function navigateToVideo(videoUrl, episodeNumber, subtitleUrl) {
  router.push(`/video?videoUrl=${videoUrl}&episodeNumber=${episodeNumber}&subtitleUrl=${subtitleUrl}`);
}
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}

.fs {
  font-size: 14px;
}

.fixed-size {
  width: 100%; /* 가로 크기를 부모 요소의 너비에 맞춤 */
  height: 160px; /* 세로 크기를 고정된 높이로 설정 */
  object-fit: cover; /* 이미지 비율을 유지하며 크기를 조정 */
}
</style>
