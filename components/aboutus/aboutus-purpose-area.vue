<template>
  <div>
    <!-- text feature area start -->
    <div class="text-feature-one mt-150 lg-mt-80">
      <div class="container">
        <div class="line-wrapper position-relative">
          <div class="row align-items-center">
            <div class="col-lg-12 wow fadeInLeft">
              <div class="title-one">
                <h2>計畫目的</h2>
              </div>
              <p class="text-lg mt-45 lg-mt-30 mb-35 lg-mb-30">
                多元陪伴照顧服務試辦計畫（下稱本計畫）主要是幫助有需要照顧的家庭，特別是在特定的情況下，提供短期或臨時的照顧人力，靈活且有效地滿足各種有照顧需求的家庭，讓家人可以減輕照顧的負擔。本計畫所需經費，由勞動部就業安定基金年度預算支應。
              </p>
              <p class="text-lg mt-45 lg-mt-30 mb-35 lg-mb-30">
                本計畫主要內容：
              </p>
              <ul class="list-decimal pl-6">
                <li class="mb-3">
                  短期照顧人力：協助需要有照顧人力的家庭（不論是否已經有外籍看護）在特定情況下，快速找到照顧人員。
                </li>
                <li class="mb-3">
                  試辦單位的服務：由公益組織和跨國人力仲介機構合作提供的。他們經過嚴格的選拔後會成為試辦單位，根據家庭的需求提供陪伴照顧服務人員。要使用這些服務的民眾需要符合以下任一條件：
                  <ul class="list-disc pl-6 mt-2">
                    <li>有身心障礙證明或有效的重大傷病保險資格。</li>
                    <li>最近三個月內的就醫或手術紀錄。</li>
                    <li>
                      符合聘僱外籍看護的資格，但還沒有申請的家庭，或現有的看護因某些原因無法提供服務。
                    </li>
                    <li>
                      經過評估屬於長期照顧等級第二至第八級，但服務仍不足的家庭。
                    </li>
                  </ul>
                </li>
                <li class="mb-3">
                  專業團隊輔導：藉由專業團隊的幫助，協助試辦單位進行申請和管理，包括照顧技巧的培訓和諮詢服務。透過專家顧問的指導和定期的服務檢視，確保服務的品質不斷提升，讓家庭在需要短期或臨時照顧時，可以迅速獲得支援。
                </li>
              </ul>

              <nuxt-link href="#" class="btn-three icon-link mt-15 mb-15 md-mb-40">
                <span cl>閱讀更多</span>
                <img
                  src="/images/icon/icon_09.svg"
                  alt=""
                  class="lazy-img icon ms-1"
                />
              </nuxt-link>
            </div>
          </div>
        </div>

      </div>
    </div>
    <!-- text feature area end -->

    <!-- block feature area start -->
    <div
      class="block-feature-one position-relative light-bg-deep mt-50 lg-mt-80 pt-120 lg-pt-60 pb-130 lg-pb-60"
    >
      <div class="container">
        <div class="position-relative">
          <div class="row">
            <div class="col-md-6">
              <div class="title-one text-center text-md-start mb-30 sm-mb-10">
                <h2>計畫架構</h2>
              </div>
              <!-- /.title-one -->
            </div>
          </div>
          <div class="row justify-content-center">
            <div
              v-for="(item, i) in service_data"
              :key="item.id"
              class="col-lg-4 col-md-6 d-flex wow fadeInUp"
              :data-wow-delay="`0.${i}s`"
            >
              <div class="card-style-two vstack tran3s w-100 mt-30">
                <img :src="item.icon" alt="" class="lazy-img icon me-auto" />
                <h4 class="fw-bold mt-30 mb-25">{{ item.title }}</h4>
                <p class="mb-20">{{ item.desc }}</p>
                <nuxt-link
                  href="/service-details"
                  class="arrow-btn tran3s mt-auto stretched-link"
                >
                  <img src="/images/icon/icon_09.svg" alt="" class="lazy-img" />
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
              <img
                src="/images/icon/icon_09.svg"
                alt=""
                class="lazy-img icon ms-1"
              />
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
const service_data = [
  {
    id: 1,
    icon: "/images/icon/icon_06.svg",
    title: "居家照顧服務",
    desc: "提供專業的居家照顧,包括生活照顧、健康促進等,讓長者在熟悉的環境中獲得妥善照顧。",
  },
  {
    id: 2,
    icon: "/images/icon/icon_07.svg",
    title: "日間照顧中心",
    desc: "提供日間照顧服務,包括生活照顧、健康促進、文康休閒活動等,減輕家庭照顧負擔。",
  },
  {
    id: 3,
    icon: "/images/icon/icon_08.svg",
    title: "喘息服務",
    desc: "提供短期照顧服務,讓家庭照顧者有休息的機會,維持身心健康和照顧品質。",
  },
];
</script>