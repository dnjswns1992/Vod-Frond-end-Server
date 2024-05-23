<template>
  <div>
    <ImageSlider/>
    <br><br><br>
    <MoiveContent/>
    <br><br><br>
    <Animation/>
    <br><br><br>
    <Drama/>
  </div>
</template>

<script setup>
import ImageSlider from './ImageSlider.vue';
import Animation from './Animation.vue';
import MoiveContent from "./MoiveContent.vue";
import Drama from "./Drama.vue";
import EmailLogin from "./EmailLogin.vue";

</script>

<style scoped>
* {
  background: white;
}
</style>