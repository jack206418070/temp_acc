<template>
<div class="portfolio-two position-relative mt-180 lg-mt-80">
			<div class="container">
				<div class="position-relative mb-80 lg-mb-40">
					<div class="d-flex justify-content-between align-items-center">
						<div class="title-one">
							<h2 class="color-deep m0">Our Projects.</h2>
						</div>
						<!-- /.title-one -->
						<ul class="slider-arrows slick-arrow-one d-flex justify-content-center style-none">
							<li class="prev_b slick-arrow"><i class="bi bi-arrow-left"></i></li>
							<li class="next_b slick-arrow"><i class="bi bi-arrow-right"></i></li>
						</ul>
					</div>
          </div>
			</div>
			<div class="slider-wrapper">
				<swiper v-bind="slider_setting" :modules="[Navigation]" class="project-slider-one">
					<swiper-slide v-for="item in portfolio_data" :key="item.id" class="item">
						<div class="portfolio-block-two">
							<div class="img-wrapper">
								<img :src="item.img" alt="" class="w-100">
							</div>
							<!-- /.img-wrapper -->
							<div class="caption d-flex align-items-center justify-content-between flex-wrap">
								<div>
									<span class="fw-bold text-uppercase">{{item.sub_title}}</span>
									<h3><a href="#">{{item.title}}</a></h3>
								</div>
								<nuxt-link href="/project-details-v1" class="round-btn rounded-circle d-flex align-items-center justify-content-center tran3s">
                  <i class="bi bi-arrow-up-right"></i>
                </nuxt-link>
							</div>
							<!-- /.caption -->
						</div>
						<!-- /.portfolio-block-two -->
					</swiper-slide>
				</swiper>
			</div>
			<!-- /.slider-wrapper -->
		</div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from 'swiper/modules';

const portfolio_data = [
  {
    id:1,
    img:'/images/gallery/img_20.jpg',
    tags:['BANNER','WEB DESIGN'],
    sub_title:'User Interface',
    title:'Landing for Creative Agency',
  },
  {
    id:2,
    img:'/images/gallery/img_21.jpg',
    tags:['BANNER','WEB DESIGN'],
    sub_title:'LANDING PAGE',
    title:'Babun- Landing Page Template',
  },
  {
    id:3,
    img:'/images/gallery/img_22.jpg',
    tags:['BANNER','WEB DESIGN'],
    sub_title:'User Interface',
    title:'Agency Minima Design',
  },
  {
    id:4,
    img:'/images/gallery/img_21.jpg',
    tags:['BANNER','WEB DESIGN'],
    sub_title:'User Interface',
    title:'Landing for Creative Agency',
  },
  {
    id:5,
    img:'/images/gallery/img_22.jpg',
    tags:['BANNER','WEB DESIGN'],
    sub_title:'User Interface',
    title:'Landing for Creative Agency',
  }
];

const slider_setting = {
  slidesPerView: 3,
  spaceBetween: 30,
  centeredSlides: true,
  loop:true,
  navigation:{
    nextEl:'.next_b',
    prevEl:'.prev_b',
  },
  breakpoints: {
    "768": {
      slidesPerView: 3,
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