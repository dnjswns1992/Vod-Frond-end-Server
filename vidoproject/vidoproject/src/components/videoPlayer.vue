<template>
  <div class="video-container">
    <video
        id="my-video"
        controls
        preload="auto">
      <source :src="videoUrl" type="video/mp4">
      <track v-if="subtitleUrl" label="Korean" kind="subtitles" srclang="ko" :src="subtitleUrl" default>
      Your browser does not support the video tag.
    </video>
  </div>

  <div></div>

  <div>
    <br><br><br><br>
    <h2>{{ episodeNumber }}</h2>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const videoUrl = ref(route.query.videoUrl || '');
const episodeNumber = ref(route.query.episodeNumber || '');
const subtitleUrl = ref(route.query.subtitleUrl || '');

console.log("subtitle", subtitleUrl.value);

const resizeVideo = () => {
  const video = document.getElementById('my-video');
  if (video) {
    video.style.width = '100%';
    video.style.height = '100%';
  }
};

onMounted(() => {
  resizeVideo();
  window.addEventListener('resize', resizeVideo);
});

watch([videoUrl, subtitleUrl], () => {
  const video = document.getElementById('my-video');
  if (video) {
    video.load();
    video.play(); // 비디오를 자동으로 재생합니다.
  }
});

onUnmounted(() => {
  window.removeEventListener('resize', resizeVideo);
});
</script>

<style scoped>
.video-container {
  width: 100%;
  height: 70vh; /* 원하는 높이로 설정 */
  background: #000;
  overflow: hidden;
  position: relative;
}

video {
  width: 100%;
  height: 100%;
  object-fit: contain; /* 비율을 유지하며 컨테이너를 꽉 채우도록 설정 */
  background-color: #000;
}

.video-info {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  display: flex;
  align-items: center;
  padding: 10px;
}

.info-details h2, .info-details p {
  margin: 0;
}
</style>
