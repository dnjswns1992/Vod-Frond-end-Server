<template>
  <div v-if="visible" class="modal-backdrop" @click.self="close">
    <div class="modal-content">
      <button @click="close" class="close-button">Close</button>
      <slot></slot>
      <button @click="playVideo" class="play-button">Play</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  visible: Boolean,
  currentMovie: Object,
  episodes: Array
});

const emits = defineEmits(['close']);

const router = useRouter();

const close = () => {
  emits('close');
};

const playVideo = () => {
  const videoUrl = props.currentMovie.videoUrl; // 동영상 URL을 가져온다고 가정
  const posterUrl = props.currentMovie.imageUrl; // 포스터 URL
  const title = props.currentMovie.title;
  const description = props.currentMovie.mainTitleDescription;
  const producer = props.currentMovie.producer;
  const releaseDate = props.currentMovie.releaseDate;

  router.push({
    path: '/video',
    query: {
      url1080: videoUrl,
      poster: posterUrl,
      title: title,
      description: description,
      producer: producer,
      releaseDate: releaseDate
    }
  });
};
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap');

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 900px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  max-height: 80vh;
  overflow-y: auto;
  font-family: 'Noto Sans KR', sans-serif;
  position: relative;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #333;
}

.modal-header {
  display: flex;
  align-items: center;
}

.modal-poster {
  width: 150px;
  height: auto;
  border-radius: 10px;
  margin-right: 20px;
}

.modal-title {
  flex: 1;
}

.modal-title h1 {
  margin: 0;
  font-size: 24px;
  color: #333;
}

.modal-title p {
  margin: 5px 0 0;
  color: #666;
}

.modal-body {
  margin-top: 20px;
}

.modal-body h2 {
  font-size: 20px;
  margin-bottom: 10px;
  color: #333;
}

.episode-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.episode-thumbnail {
  width: 100px;
  height: auto;
  border-radius: 5px;
  margin-right: 10px;
}

.episode-info {
  flex: 1;
}

.episode-info h3 {
  margin: 0;
  font-size: 16px;
  color: #333;
}

.episode-info p {
  margin: 5px 0 0;
  color: #666;
}

.play-button {
  margin-top: 20px;
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
  display: block;
  width: 100%;
}
</style>