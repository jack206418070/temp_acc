<template>
  <div class="hero-banner-one pt-225 xl-pt-200 lg-pt-150 pb-150 lg-pb-100 position-relative">
			<swiper :modules="modules" v-bind="slider_setting" class="hero-slider-one m0">
				<swiper-slide v-for="(src,i) in slider_images" :key="i" class="item m0">
          <div class="hero-img" :style="`background-image: url(${src});`"></div>
        </swiper-slide>
			</swiper>
			<!-- /.hero-slider-one -->
			<div class="container position-relative">
				<div class="row">
					<div class="col-xl-6 col-lg-7 ms-auto">
						<h1 class="hero-heading d-inline-block position-relative wow fadeInUp">Your business <br>Consultant & <br>Solution.</h1>
						<p class="text-xl text-white pt-35 pb-25 wow fadeInUp" data-wow-delay="0.1s">Empowering businesses with innovative strategies and actionable recommendations</p>
						<nuxt-link href="/contact" class="btn-two icon-link wow fadeInUp" data-wow-delay="0.2s">
							<span>Let’s Talk</span>
							<img src="/images/icon/icon_02.svg" alt="icon" class="lazy-img icon ms-2">
						</nuxt-link>
					</div>
				</div>
			</div>
			<nuxt-link href="/contact" class="more-btn rounded-circle d-flex align-items-center justify-content-center tran3s wow fadeInLeft" target="_blank"><i class="bi bi-arrow-up-right"></i></nuxt-link>
		</div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay } from 'swiper/modules';

const modules = [Autoplay];

const slider_images = [
  '/images/media/img_01.jpg',
  '/images/media/img_02.jpg',
  '/images/media/img_03.jpg'
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
