<template>
   <div :class="`feedback-section-one ${spacing?spacing:'mt-150 lg-mt-80 pb-80'}`">
			<div class="container">
				<div class="position-relative">
					<div class="title-one sm-mb-40">
						<h2>Words from <br> clients.</h2>
					</div>
					<!-- /.title-one -->
					<swiper v-bind="slider_setting" :effect="'fade'" :modules="[EffectFade]" :fadeEffect="{crossFade: true}" class="feedback-slider-one">
						<swiper-slide v-for="item in feedback_data" :key="item.id" class="item">
							<div class="feedback-block-one">
								<div class="row align-items-end">
									<div class="col-md-7 ms-auto order-md-last">
										<blockquote>{{item.desc}}</blockquote>
										<div class="d-flex align-items-center">
											<img :src="item.user" alt="" class="avatar rounded-circle">
											<div class="ps-4">
												<div class="name fw-bold text-dark">{{item.name}}</div>
												<p class="fs-6 m0">{{item.location}}</p>
											</div>
										</div>
									</div>
									<div class="col-md-4 order-md-first">
										<div class="d-flex align-items-center justify-content-between sm-mt-40">
											<div class="line"></div>
											<div class="count fw-500">
                        <span className="text-dark">
                            {{item.id < 10 ? `0${item.id}` : item.id}}
                          </span>
                          /
                          {{feedback_data.length < 10
                            ? `0${feedback_data.length}`
                            : feedback_data.length}}
                      </div>
										</div>
									</div>
								</div>
							</div>
						</swiper-slide>
					</swiper>

					<div class="icon d-flex align-items-center justify-content-center rounded-circle">
            <img src="/images/icon/icon_12.svg" alt="" class="lazy-img">
          </div>
				</div>
			</div>
		</div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { EffectFade } from "swiper/modules";
defineProps<{spacing?:string}>();

const feedback_data = [
  {
    id:1,
    user:'/images/media/img_08.jpg',
    name:'John Smith',
    location:'CEO & Head of Sky Tech Inc.',
    desc:`"Efficient problem-solving, insightful market analysis, and actionable plans made the consulting experience invaluable to our business's success."`
  },
  {
    id:2,
    user:'/images/media/img_08.jpg',
    name:'Mark John',
    location:'CEO & Head of Apple Tech Inc.',
    desc:`"Lorem ipsum, dolor sit amet consectetur elit. Asperiores unde inventore tenetur. Accusantium tenetur id cupiditate quibusdam."`
  },
  {
    id:3,
    user:'/images/media/img_08.jpg',
    name:'James Bond.',
    location:'CEO & Head of Pixel Tech Inc.',
    desc:`"Efficient problem-solving, insightful market analysis, and actionable plans made the consulting experience invaluable to our business's success."`
  }
];

const slider_setting = {
  slidesPerView: 1,
  spaceBetween: 30,
  loop:false,
};
</script>
