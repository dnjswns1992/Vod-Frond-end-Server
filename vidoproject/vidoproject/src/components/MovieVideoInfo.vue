<template>
  <div class="bg-[#141414] text-white min-h-screen">
    <div v-if="mainTitle">
      <img :src="mainTitle.mainTitleImageUrl">
      <br><br><br><br>

      <h1 class="ml-12 text-amber-400">제목 | {{mainTitle.title}}</h1>
      <br>
      <h3 class="ml-12">줄거리</h3>
      <br>
      <h5 class="fs-p ml-12" v-html="mainTitle.mainTitleDescription"></h5>
    </div>
    <br><br><br>

    <div class="mr-14 ml-14">
      <div class="grid grid-cols-4 gap-4 mx-auto">
        <div
            v-for="(info, index) in episode"
            :key="info.episodeId"
            class="p-2">
          <div
              class="max-w-full h-36 overflow-hidden cursor-pointer"
              @click="navigateToVideo(info.videoUrl, info.episodeNumber)">
            <img :src="info.imageUrl"
                 class="w-full h-full object-cover hover:opacity-75 transition-opacity duration-200 fixed-size">
          </div>
          <p v-if="info.episodeNumber" class="mt-2 text-violet-400">{{ info.episodeNumber }}</p>
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
import {useConfigStore, useUserStore} from "../assets/store.js";

const mainTitle = ref(null);
const episode = ref([]);
const route = useRoute();
const router = useRouter();
const configStore = useConfigStore();
let userAuthorization = useUserStore();

onMounted(async () => {
  const id = route.query.id;

  if (id) {
    try {
      const response = await axios.get(`${configStore.backUrl}/api/movie/episode/${id}`);
      mainTitle.value = response.data.uploadMainTitleEntity;
      episode.value = response.data.episode;
    } catch (error) {
      console.error('Failed to fetch movie details:', error);
    }
  }
});

function navigateToVideo(videoUrl, episodeNumber) {
  router.push({
    path: '/video',
    query: { videoUrl, episodeNumber }
  });
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
  width: 100%;
  height: 160px;
  object-fit: cover;
}
</style>
