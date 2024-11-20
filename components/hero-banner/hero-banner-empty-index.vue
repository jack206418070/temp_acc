<template>
  	<div class="hero-banner-one mt-75 pt-225 xl-pt-220 lg-pt-160 pb-150 lg-pb-100 position-relative">
		<swiper :modules="modules" v-bind="slider_setting" class="hero-slider-one m0">
			<swiper-slide v-for="(src,i) in slider_images" :key="i" class="item m0">
				<div class="hero-img" :style="`background-image: url(${src});`"></div>
			</swiper-slide>
		</swiper>
		
	</div>
	
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay } from 'swiper/modules';

const modules = [Autoplay];

const slider_images = [
  '/images/bg_1.png'
]

const slider_setting = {
  slidesPerView: 1,
  spaceBetween: 0,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  }
};

</script>
<style scoped>
.hero-banner-one{
	
	height: 60vh;
}
.hero-banner-one::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;

    background: unset !important;
	}

.hero-img {
    height: 100% !important;
    background-size: contain !important;
    background-position: center !important;
    background-repeat: no-repeat !important;
}

.hero-slider-one {
    height: 100%;
}

.swiper-slide {
    height: 100%;
}
</style>