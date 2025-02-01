<script setup lang="ts">
import SugarBagCard from "~/components/general/SugarBagCard.vue";

const photoSwiper = ref(null)
const swiper = useSwiper(photoSwiper)

const props = defineProps({
  data: {type: Object, required: true},
});
</script>

<template>
  <ClientOnly>
    <swiper-container
        :autoplay="{
                  delay: 2500,
                  disableOnInteraction: false,
                }"
        class="swiper"
        slidesPerView="auto"
        :loop="true"
        :spaceBetween="30"
        ref="photoSwiper">
      <swiper-slide
          class="partner-card"
          v-for="(item, index) in data"
          :key="index">
          <slot name="slider-item" :item="item"/>
      </swiper-slide>
    </swiper-container>
  </ClientOnly>
</template>

<style scoped>

</style>