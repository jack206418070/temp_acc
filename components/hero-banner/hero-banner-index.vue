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
						<h1 class="hero-heading d-inline-block position-relative wow fadeInUp">多元陪伴照顧<br>服務<br>試辦計畫。</h1>
						<p class="text-xl text-white pt-35 pb-25 wow fadeInUp" data-wow-delay="0.1s">致力於協助家庭</p>
						<nuxt-link href="/contact" class="btn-two icon-link wow fadeInUp" data-wow-delay="0.2s">
							<span>歡迎與我們聯繫</span>
							<img src="/images/icon/icon_02.svg" alt="圖標" class="lazy-img icon ms-2">
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
