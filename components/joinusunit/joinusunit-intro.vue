<template>
  <div>
    <!-- text feature area start -->
    <div class="text-feature-one mt-150 lg-mt-80">
      <div class="container">
        <div class="line-wrapper position-relative">
          <div class="row align-items-center">
            <div class="col-lg-12 wow fadeInLeft">
              <h3 class="fw-bold mt-40 mb-20">申請資格</h3>
              <p class="text-lg mb-20">
                依法設立或登記滿五年之財團法人或非營利社團法人。
              </p>

              <h4 class="fw-bold mb-20">受委任之私立就業服務機構資格要求：</h4>
              <ul class="text-lg mb-35 ps-4">
                <li>
                  於申請日前五年內，評鑑成績依規定均屬於A級及績優免評鑑者。
                </li>
                <li>
                  於申請日前二年受雇主委任引進或聘僱之家庭幫傭及家庭看護工作外國人，佔該機構當年總引進或聘僱外國人人數二分之一以上。
                </li>
                <li>
                  於申請日前二年，無違反就業服務法相關法規，並經裁處確定。
                </li>
              </ul>

              <h3 class="fw-bold mt-40 mb-20">評選流程</h3>
              <p class="text-lg mb-20">
                有意願且符合資格的機構須自行提出申請計畫書，經勞動部召開專家審查會議評選通過後，始得成為合格之試辦單位。其評選標準包括：
              </p>

              <ul class="text-lg mb-35 ps-4">
                <li>組織公益性及績優事蹟（20%）</li>
                <li>服務內容及費用標準（15%）</li>
                <li>組織專業性（15%）</li>
                <li>服務品質確保機制（15%）</li>
                <li>外國籍陪伴照顧服務工作者聘僱管理及訓練、後援規劃（15%）</li>
                <li>創新作為（20%）</li>
              </ul>

              <nuxt-link
                href="#"
                class="btn-three icon-link mt-15 mb-15 md-mb-40"
              >
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
                <h2>趕快成為試辦單位</h2>
              </div>
              <!-- /.title-one -->
            </div>
          </div>
          <div class="row justify-content-center">
            <div
              class="col-lg-4 col-md-6 d-flex wow fadeInUp"
              data-wow-delay="`0.3s`"
            >
              <div class="card-style-two vstack tran3s w-100 mt-30">
                <h4 class="fw-bold mt-30 mb-25">申請辦法(或試辦計畫)</h4>
                <p class="mb-20">關於申請辦法</p>
                <nuxt-link
                  href=""
                  class="arrow-btn tran3s mt-auto stretched-link"
                >
                  <img src="/images/icon/icon_09.svg" alt="" class="lazy-img" />
                </nuxt-link>
              </div>
            </div>
            <div
              class="col-lg-4 col-md-6 d-flex wow fadeInUp"
              data-wow-delay="`0.3s`"
            >
              <div class="card-style-two vstack tran3s w-100 mt-30">
                <h4 class="fw-bold mt-30 mb-25">填寫申請表單</h4>
                <p class="mb-20">僅開放申請期間</p>
                <nuxt-link
                  href=""
                  class="arrow-btn tran3s mt-auto stretched-link"
                >
                  <img src="/images/icon/icon_09.svg" alt="" class="lazy-img" />
                </nuxt-link>
              </div>
            </div>
          </div>

          
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