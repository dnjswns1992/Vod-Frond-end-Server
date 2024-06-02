<template>
  <div :style="containerStyle" class="video-container">
    <video
        class ="vjs-default-skin"
        id="my-video"
        controls
        preload="auto">
      <source :src="videoUrl" type="video/mp4">
      <track v-if="subtitleUrl" label="Korean" kind="subtitles" srclang="ko" :src="subtitleUrl" default>

    </video>
  </div>

  <div>
    <br><br><br><br>
    <h2>{{ episodeNumber }}</h2>
  </div>

  <div class="controls">
    <label for="aspect-ratio">화면 비율:</label>
    <select id="aspect-ratio" v-model="aspectRatio">
      <option value="16:9">16:9</option>
      <option value="4:3">4:3</option>
      <option value="1:1">1:1</option>
      <option value="21:9">21:9</option>
    </select>
  </div>
</template>

<script setup>
import {ref, onMounted, watch, onUnmounted, computed} from 'vue';
import {useRoute} from 'vue-router';

const route = useRoute();
const videoUrl = ref(route.query.videoUrl || '');
const episodeNumber = ref(route.query.episodeNumber || '');
const subtitleUrl = ref(route.query.subtitleUrl || '');
const aspectRatio = ref('16:9');

const resizeVideo = () => {
  const video = document.getElementById('my-video');
  if (video) {
    video.style.width = '100%';
    video.style.height = '100%';
  }
};

const containerStyle = computed(() => {
  let [widthRatio, heightRatio] = aspectRatio.value.split(':').map(Number);
  let paddingBottom = (heightRatio / widthRatio) * 100;
  return {
    paddingBottom: `${paddingBottom}%`,
    position: 'relative',
    width: '100%',
    height: 0,
    overflow: 'hidden',
    backgroundColor: '#000',
  };
});

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
  position: relative;
  background: #000;
}

video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain; /* 비율을 유지하며 컨테이너를 꽉 채우도록 설정 */
}

.controls {
  margin-top: 20px;
}
</style>
