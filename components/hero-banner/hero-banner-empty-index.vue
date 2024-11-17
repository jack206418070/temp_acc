<template>
  	<div class="hero-banner-one pt-225 xl-pt-200 lg-pt-150 pb-150 lg-pb-100 position-relative">
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
  '/images/bg_1.jpg',
  '/images/bg_2.jpg'
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
	margin-top: 90px !important;
	height: 100vh;
}
.hero-banner-one::before {
    content: "";
    position: absolute;
	
    width: 100%;
    height: 100%;
    left: 0px;
    top: 0px;
    background: unset !important;
	}

.hero-img {
    height: 100vh;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

.hero-slider-one {
    height: 100%;
}

.swiper-slide {
    height: 100%;
}
</style>