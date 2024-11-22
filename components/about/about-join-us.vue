<template>
  <div>
    <!-- 文字特色區域開始 -->
    <div class="text-feature-one mt-150 lg-mt-80">
      <div class="container">
        <div class="line-wrapper position-relative">
          <div class="row align-items-center">
            <div class="col-lg-5 wow fadeInLeft">
              <div class="title-one">
                <h2>試辦單位簡介</h2>
              </div>
              <p class="text-lg mt-45 lg-mt-30 mb-35 lg-mb-30">
                我們是一家致力於提供高品質照顧服務的機構。自2010年成立以來,
                我們秉持「以人為本,關懷社區」的服務理念,為有需要的人提供全面的照顧支援。
                我們的特色是提供個人化的照顧計畫,結合專業團隊和先進設備,
                確保每位服務對象都能獲得最適合的照顧。
              </p>
              <nuxt-link href="/contact" class="btn-three icon-link mt-15 md-mb-40">
                <span>聯絡我們</span>
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

        <!-- 計數器區域 -->
        <counter-one spacing="mt-80 lg-mt-20" />
        <!-- 計數器區域 -->
      </div>
    </div>
    <!-- 文字特色區域結束 -->

    <!-- 區塊特色區域開始 -->
    <div class="block-feature-one position-relative light-bg-deep mt-150 lg-mt-80 pt-120 lg-pt-60 pb-130 lg-pb-60">
			<div class="container">
				<div class="position-relative">
					<div class="row">
						<div class="col-md-6">
							<div class="title-one text-center text-md-start mb-30 sm-mb-10">
								<h2>服務事項</h2>
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
              本計畫依據「長期照顧服務法」及「多元照顧服務心設立標準及人員配置標準」辦理。
              收費方式依照政府規定的長照服務給付及支付基準執行。
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
    <!-- 區塊特色區域結束 -->

    <!-- 注意事項區域開始 -->
    <div class="text-feature-one mt-150 lg-mt-80">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="title-one">
              <h2>注意事項</h2>
            </div>
            <ul class="list-style-one">
              <li>服務時間為週一至週五上午8點至下午5點,國定假日休息。</li>
              <li>請提前預約服務,以確保我們能夠安排適當的人力。</li>
              <li>如需取消或變更服務,請至少提前24小時通知我們。</li>
              <li>服務期間請配合工作人員的指導,以確保服務品質和安全。</li>
              <li>如有任何問題或建議,歡迎隨時與我們聯繫。</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- 注意事項區域結束 -->
    
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
