<template>
  <div>
    <!-- breadcrumb area start -->
    <breadcrumb-one
      title="預約服務"
      subtitle="提供全面的照顧解決方案,滿足不同族群的多元需求"
      page="服務介紹"
      bg_img="/images/banner/banner_1.png"
      :style_2="true"
      cls="me-xxl-4 me-lg-5"
    />
    <!-- breadcrumb area end -->

     <!-- breadcrumb area start -->
     <div class="inner-banner-two light-bg text-center pt-200 md-pt-150 pb-85 lg-pb-50 position-relative">
        <div class="container position-relative">
            <div class="row">
                <div class="col-xl-8 col-lg-9 m-auto">
                    <h1 class="hero-heading">試辦單位簡介</h1>
                    <p class="text-lg">目前試辦單位還在持續累積中，各試辦單位坐落在不同服務地區，所提供的服務項目、服務時數、收費、服務特色、注意事項或有不同，請進入試辦單位介紹區有更多完整的介紹，並可點選服務。</p>
                </div>
            </div>
        </div>
        <img src="/images/shape/shape_05.svg" alt="" class="lazy-img shapes shape_03">
        <img src="/images/shape/shape_05.svg" alt="" class="lazy-img shapes shape_04">
        <div class="d-inline-flex flex-wrap justify-content-center">
          <a class="btn-one mt-10 me-2 ht-btn" href="https://accompany-service-user.vercel.app/login" target="">我要預約</a>
        </div>
        
    </div>
    <service-unit-list-area />
    <!-- service area start -->
    <service-area />

    <service-targer />


    <service-details-area />

  </div>
</template>

<script setup lang="ts">
useSeoMeta({ title: "服務介紹 - 多元陪伴照顧服務計畫" });
</script>
