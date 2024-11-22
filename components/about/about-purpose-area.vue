<template>
  <div>
    <!-- text feature area start -->
    <div class="text-feature-one mt-150 lg-mt-80">
      <div class="container">
        <div class="line-wrapper position-relative">
          <div class="row align-items-center">
            <div class="col-lg-5 wow fadeInLeft">
              <div class="title-one">
                <h2>計畫內容簡介</h2>
              </div>
              <p class="text-lg mt-45 lg-mt-30 mb-35 lg-mb-30">
                多元陪伴照顧服務計畫旨在提供全面的照顧支援,滿足不同族群的需求。
                我們致力於提升照顧品質,減輕家庭負擔,促進社會共融。
              </p>
              <nuxt-link href="/contact" class="btn-three icon-link mt-15 md-mb-40">
                <span>服務諮詢</span>
                <img src="/images/icon/icon_09.svg" alt="" class="lazy-img icon ms-1"/>
              </nuxt-link>
            </div>
            <div class="col-lg-6 ms-auto wow fadeInRight">
              <div
                v-for="item in text_feature"
                :key="item.id"
                class="card-style-three d-flex pt-75 lg-pt-40 pb-45 lg-pb-20"
              >
                <img :src="item.icon" alt="" class="lazy-img icon" />
                <div class="ps-4">
                  <h4 class="fw-bold mb-20">{{ item.title }}</h4>
                  <p>{{ item.desc }}</p>
                </div>
              </div>
            </div>
          </div>
          <img src="/images/shape/shape_05.svg" alt="" class="lazy-img shapes shape_01"/>
        </div>

        <!-- counter area -->
        <counter-one spacing="mt-80 lg-mt-20" />
        <!-- counter area -->
      </div>
    </div>
    <!-- text feature area end -->

    <!-- block feature area start -->
    <div class="block-feature-one position-relative light-bg-deep mt-150 lg-mt-80 pt-120 lg-pt-60 pb-130 lg-pb-60">
			<div class="container">
				<div class="position-relative">
					<div class="row">
						<div class="col-md-6">
							<div class="title-one text-center text-md-start mb-30 sm-mb-10">
								<h2>了解更多</h2>
							</div>
							<!-- /.title-one -->
						</div>
					</div>
					<div class="row justify-content-center">
						<div v-for="(item,i) in service_data" :key="item.id" class="col-lg-4 col-md-6 d-flex wow fadeInUp" :data-wow-delay="`0.${i}s`">
							<div class="card-style-two vstack tran3s w-100 mt-30">
                <img :src="item.icon" alt="" class="lazy-img icon me-auto">
								<h4 class="fw-bold mt-30 mb-25">{{item.title}}</h4>
								<p class="mb-20">{{item.desc}}</p>
								<nuxt-link href="/service-details" class="arrow-btn tran3s mt-auto stretched-link">
                  <img src="/images/icon/icon_09.svg" alt="" class="lazy-img">
                </nuxt-link>
							</div>
						</div>
					</div>

					<div class="section-subheading sm-mt-40">
						
						<nuxt-link href="/service-v1" class="btn-three icon-link">
							<span>了解更多服務</span>
							<img src="/images/icon/icon_09.svg" alt="" class="lazy-img icon ms-1">
						</nuxt-link>
					</div>
					<!-- /.section-subheading -->
				</div>
			</div>
		</div>
    <!-- block feature area end -->

  </div>
</template>

<script setup lang="ts">
const text_feature = [
  {
    id: 1,
    icon: "/images/icon/icon_10.svg",
    title: "我們的使命",
    desc: "我們的使命是提供高品質、多元化的照顧服務,讓每個需要幫助的人都能獲得適當的照顧,提升生活品質。",
  },
  {
    id: 2,
    icon: "/images/icon/icon_11.svg",
    title: "我們的願景",
    desc: "我們的願景是建立一個互助友愛的社會,讓每個人都能在需要時得到適當的照顧和支援,共同營造幸福美滿的生活。",
  },
];

const service_data = [
  {
    id:1,
    icon:'/images/icon/icon_06.svg',
    title:'居家照顧服務',
    desc:'提供專業的居家照顧,包括生活照顧、健康促進等,讓長者在熟悉的環境中獲得妥善照顧。',
  },
  {
    id:2,
    icon:'/images/icon/icon_07.svg',
    title:'日間照顧中心',
    desc:'提供日間照顧服務,包括生活照顧、健康促進、文康休閒活動等,減輕家庭照顧負擔。',
  },
  {
    id:3,
    icon:'/images/icon/icon_08.svg',
    title:'喘息服務',
    desc:'提供短期照顧服務,讓家庭照顧者有休息的機會,維持身心健康和照顧品質。',
  },
]
</script>