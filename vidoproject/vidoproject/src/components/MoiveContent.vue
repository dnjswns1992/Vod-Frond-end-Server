<template>
  <div class="relative">
    <h1 class="text-black font-semibold text-2xl">영화</h1>
    <a href="#" class="absolute top-4 right-0 mt-2 mr-6 text-black font-semibold ">더보기</a>
    <hr class="my-4">
    <div class="grid grid-cols-7 gap-1">
      <div v-for="movie in MovieData" :key="movie.id" class="col-span-1">
        <a class="m-0" href="#" @click.prevent="openModal(movie)">
          <div class="w-full h-72 overflow-hidden rounded-lg border border-gray-300">
            <img :src="movie.imgUrl" :alt="movie.title" class="w-full h-full object-cover rounded-lg">
          </div>
        </a>
        <p class="mt-2 text-center text-black font-semibold mt-3">{{ movie.title }}</p>
      </div>
    </div>
    <MovieModal :show="showModal" :movie="selectedMovie" @close="closeModal"/>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import MovieData from '../assets/Movie.js';
import MovieModal from '../components/MoiveModal.vue'

const showModal = ref(false);
const selectedMovie = ref({});

const openModal = (movie) => {
  selectedMovie.value = movie;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};
</script>