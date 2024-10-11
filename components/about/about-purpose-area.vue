<template>
  <div>
    <!-- text feature area start -->
    <div class="text-feature-one mt-150 lg-mt-80">
      <div class="container">
        <div class="line-wrapper position-relative">
          <div class="row align-items-center">
            <div class="col-lg-5 wow fadeInLeft">
              <div class="title-one">
                <h2>計畫目的</h2>
              </div>
              <p class="text-lg mt-45 lg-mt-30 mb-35 lg-mb-30">
                多元陪伴照顧服務計畫旨在提供全面的照顧支持,滿足不同族群的需求。
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
								<h2>服務內容</h2>
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
						<p class="text-lg">
              本計畫依據「長期照顧服務法」及「多元照顧服務中心設立標準及人員配置標準」辦理。
            </p>
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

    <!-- text feature area start -->
    <div class="text-feature-three text-feature-one position-relative mt-150 lg-mt-80 pb-150 lg-pb-80">
			<div class="container">
				<div class="row align-items-center">
					<div class="col-xxl-5 col-lg-6 ms-auto d-flex flex-column order-lg-last wow fadeInRight">
						<div class="title-one">
							<div class="upper-title">專業照顧</div>
							<h2>主辦單位</h2>
						</div>
						<!-- /.title-one -->
						<p class="text-lg mt-35 lg-mt-10 mb-30">衛生福利部致力於建構完善的長期照顧體系,
            提供多元化的照顧服務,提升國民生活品質,打造友善的高齡社會。</p>
						<div>
              <nuxt-link href="/contact" class="btn-four mt-15">聯絡我們</nuxt-link>
            </div>
						<div class="counter-wrapper mt-50 lg-mt-40 pt-5">
							<div class="row">
								<div class="col-xl-6 col-sm-5">
									<div class="counter-block-one mt-20">
										<div class="main-count fw-bold"><span class="counter">15</span>+</div>
										<p class="m0">年服務經驗</p>
									</div>
									<!-- /.counter-block-one -->
								</div>
								<div class="col-xl-6 col-sm-7">
									<div class="counter-block-one mt-20">
										<div class="main-count fw-bold"><span class="counter">50000</span>+</div>
										<p class="m0">受惠家庭</p>
									</div>
									<!-- /.counter-block-one -->
								</div>
							</div>
						</div>
						<!-- /.counter-wrapper -->
					</div>
					<div class="col-xxl-7 col-lg-6 wow fadeInLeft">
						<div class="media-list-item me-auto pe-xxl-5 pe-4 ps-xxl-5 ps-4 pb-35 md-mt-40 d-flex align-items-end">
							<ul class="style-none">
								<li>提供全方位照顧服務</li>
								<li>客製化照顧方案</li>
								<li>提升照顧者能力</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
    <!-- text feature area end -->
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
    desc: "我們的願景是建立一個互助友愛的社會,讓每個人都能在需要時得到適當的照顧和支持,共同營造幸福美滿的生活。",
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