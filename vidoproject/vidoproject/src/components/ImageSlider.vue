<template>
  <div class="swiper-container">
    <swiper :modules="[Navigation, Pagination,Autoplay]" navigation pagination autoplay :autoplay="{delay : 3000}" class="mySwiper">
      <swiper-slide>
        <img src="../assets/image/SilderImgage/img_6.png" alt="Image 1" class="slide-image">
      </swiper-slide>
      <swiper-slide>
        <img src="../assets/image/SilderImgage/img_8.png" alt="Image 2" class="slide-image">
      </swiper-slide>
      <swiper-slide>
        <img src="../assets/image/SilderImgage/img_9.png" alt="Image 3" class="slide-image">
      </swiper-slide>
      <!-- 필요한 만큼 슬라이드를 추가하세요 -->
    </swiper>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
import { Navigation, Pagination,Autoplay } from 'swiper/modules';
</script>

<style scoped>
.swiper-container {
  width: 100%;
  height: 630px; /* 슬라이더의 높이를 설정합니다. 필요에 따라 조절하세요. */
}

.mySwiper {
  width: 100%;
  height: 100%;
}

.slide-image {
  width: 100%;
  height: 100%; /* 이미지 높이를 100%로 설정하여 슬라이더 높이에 맞춥니다. */
  object-fit: inherit; /* 이미지를 슬라이더에 꽉 차도록 설정합니다. */
}
</style>
