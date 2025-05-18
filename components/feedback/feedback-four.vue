<template>
   <div :class="`feedback-section-four ${spacing?spacing:'mt-180 lg-mt-80'}`">
			<div class="container">
				<div class="position-relative">
					<div class="title-two">
						<h2>You're in a good hand</h2>
					</div>
					<!-- /.title-two -->
					<p class="text-lg mt-30 lg-mt-20 mb-70 lg-mb-40">Optimize expense tracking across platforms, & product lines using multiple cards.</p>
					<swiper v-bind="slider_setting" :modules="[Navigation]" class="feedback-slider-four">
						<swiper-slide v-for="item in feedback_data" :key="item.id" class="item">
							<div class="feedback-block-four tran3s">
								<div class="d-flex align-items-center justify-content-between">
									<ul class="style-none d-flex rating">
										<li><i class="bi bi-star-fill"></i></li>
										<li><i class="bi bi-star-fill"></i></li>
										<li><i class="bi bi-star-fill"></i></li>
										<li><i class="bi bi-star-fill"></i></li>
										<li><i class="bi bi-star-fill"></i></li>
									</ul>
									<img src="/images/icon/icon_48.svg" alt="" class="icon">
								</div>
								<blockquote>{{item.desc}}</blockquote>
								<div class="d-flex align-items-center justify-content-between">
									<div class="d-flex align-items-center">
										<div class="name fw-500 text-dark">{{item.name}},</div>
										<p class="m0 opacity-75">{{item.location}}</p>
									</div>
									<img :src="item.user" alt="" class="avatar rounded-circle">
								</div>
							</div>
							<!-- /.feedback-block-four -->
						</swiper-slide>
					</swiper>

					<ul class="slider-arrows slick-arrow-one d-flex justify-content-center style-none">
						<li class="prev_a slick-arrow"><i class="bi bi-chevron-left"></i></li>
						<li class="next_a slick-arrow"><i class="bi bi-chevron-right"></i></li>
					</ul>


					<div class="partner-logo-one pt-80 lg-pt-50 pb-80 lg-pb-50">
						<!-- partner slider -->
            <partner-slider-one />
          <!-- partner slider -->
					</div>
					<!-- /.partner-logo-one -->
				</div>
			</div>
		</div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper/modules";
defineProps<{spacing?:string}>();

const feedback_data = [
  {
    id:1,
    desc:'Game-changer! Boosted efficiency, simplified tasks, and saved time. Highly recommended!',
    name:'John Smith',
    location:'Claifornia',
    user:'/images/media/img_08.jpg',
    rating:5
  },
  {
    id:2,
    desc:'Game-changer! Boosted efficiency, simplified tasks, and saved time. Highly recommended!',
    name:'Zephyrlyn',
    location:'Valeria',
    user:'/images/media/img_14.jpg',
    rating:4
  },
  {
    id:3,
    desc:'Game-changer! Boosted efficiency, simplified tasks, and saved time. Highly recommended!',
    name:'Quinvera',
    location:'Aqualuna',
    user:'/images/media/img_15.jpg',
    rating:4.5
  },
]

const slider_setting = {
  slidesPerView: 2,
  spaceBetween: 30,
  navigation: {
    nextEl: ".next_a",
    prevEl: ".prev_a",
  },
  breakpoints: {
    "768": {
      slidesPerView: 2,
    },
    "576": {
      slidesPerView: 1,
    },
    "0": {
      slidesPerView: 1,
    },
  },
};

</script>