<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white rounded-lg shadow-lg w-1/2 p-4">
      <div class="flex justify-between items-center">
        <h2 class="text-2xl font-semibold">{{ movie.title }}</h2>
        <button @click="closeModal" class="text-black">X</button>
      </div>
      <div class="mt-4">
        <img :src="movie.imageUrl" :alt="movie.title" class="w-full h-72 object-cover rounded-lg">
      </div>
      <div class="mt-4">
        <p>여기에 영화의 상세 정보가 들어갑니다.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: Boolean,
    movie: Object
  },
  methods: {
    closeModal() {
      this.$emit('close');
    }
  }
};
</script>