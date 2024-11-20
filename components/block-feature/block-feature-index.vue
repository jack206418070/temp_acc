<template>
  <div class="block-feature-one position-relative pt-75">
    <div class="upper-wrapper mb-110 lg-mb-80">
      <div class="container">
        <div class="row">
          <div
            v-for="(item, i) in upper_data"
            :key="i"
            class="col-lg-4 wow fadeInUp"
            :data-wow-delay="`0.${i}s`"
          >
            <div class="card-style-one d-flex w-100 mb-35">
              <div
                class="icon tran3s rounded-circle d-flex align-items-center justify-content-center"
              >
                <img :src="item.icon" alt="icon" class="lazy-img" />
              </div>
              <div class="text ps-4">
                <h4 class="fw-bold">{{ item.title }}</h4>
                <p class="pe-xl-4">{{ item.desc }}</p>
              </div>
            </div>
            <!-- /.card-style-one -->
          </div>
        </div>
      </div>
    </div>
    <!-- /.upper-wrapper -->

    <div class="container">
      <div class="position-relative">
        <div class="row">
          <div class="col-md-6">
            <div class="title-one text-center text-md-start mb-30 sm-mb-10">
              <h2>多元陪伴照顧服務</h2>
            </div>
            <!-- /.title-one -->
          </div>
        </div>
        <div class="row justify-content-center">
          <div
            v-for="item in service_data"
            :key="item.id"
            class="col-lg-4 col-md-6 d-flex wow fadeInUp"
            :data-wow-delay="`0.${item.id}s`"
          >
            <div class="card-style-two vstack tran3s w-100 mt-30">
              <img :src="item.icon" alt="icon" class="lazy-img icon me-auto" />
              <h4 class="fw-bold mt-30 mb-25">{{ item.title }}</h4>
              <p class="mb-20">{{ item.desc }}</p>
              
            </div>
          </div>
        </div>

        <div class="section-subheading sm-mt-40">
          <p class="text-lg">
            為減輕家庭照顧負擔，我們推出多元陪伴照顧服務試辦計畫。
          </p>
          <nuxt-link href="/services" class="btn-three icon-link">
            <span>查看所有服務</span>
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
</template>

<script setup lang="ts">
const upper_data = [
  {
    icon: "/images/icon/icon_03.svg",
    title: "費用預估 ",
    desc: "為有需求的家庭提供短期或臨時性的外籍家庭看護工照顧人力",
  },
  {
    icon: "/images/icon/icon_04.svg",
    title: "專業服務",
    desc: "旨在為有需求的家庭提供短期或臨時性的外籍家庭看護工照顧人力",
  },
  {
    icon: "/images/icon/icon_05.svg",
    title: "有效支援",
    desc: "為減輕家庭照顧負擔，我們推出多元陪伴照顧服務試辦計畫",
  },
];

const service_data = [
  {
    id: 1,
    icon: "/images/icon/icon_06.svg",
    title: "費用預估",
    desc: "通過提供短期或臨時性的外籍家庭看護工照顧人力，最大限度地提供便利。",
  },
  {
    id: 2,
    icon: "/images/icon/icon_07.svg",
    title: "專業服務",
    desc: "使用多種服務選項，為有需求的家庭提供如同本地的照顧服務。",
  },
  {
    id: 3,
    icon: "/images/icon/icon_08.svg",
    title: "有效支援",
    desc: "使用多種服務選項，為有需求的家庭提供如同本地的照顧服務。",
  },
];
</script>
