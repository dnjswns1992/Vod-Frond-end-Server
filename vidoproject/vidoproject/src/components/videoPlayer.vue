<template>
  <div class="video-container">
    <video controls autoplay>
      <source :src="videoUrl" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const videoUrl = ref('');

onMounted(() => {
  videoUrl.value = route.query.url || '';
});
</script>

<style scoped>
.video-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: black;
}

video {
  max-width: 100%;
  height: auto;
}
</style>
