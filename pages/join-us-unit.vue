<template>
 <div>
  <nuxt-layout name="layout-one">
      <!-- breadcrumb area start -->
      <div class="inner-banner-two light-bg text-center pt-200 md-pt-150 pb-85 lg-pb-50 position-relative">
          <div class="container position-relative">
              <div class="row">
                  <div class="col-xl-8 col-lg-9 m-auto">
                      <div class="tag">Consulting</div>
                      <h1 class="hero-heading">合作與加入</h1>
                      <p class="text-lg">Offering solutions & services to address a spectrum of financial issues</p>
                  </div>
              </div>
          </div>
          <img src="/images/assets/ils_01.svg" alt="" class="lazy-img shapes shape_01">
          <img src="/images/assets/ils_02.svg" alt="" class="lazy-img shapes shape_02">
          <img src="/images/shape/shape_05.svg" alt="" class="lazy-img shapes shape_03">
          <img src="/images/shape/shape_05.svg" alt="" class="lazy-img shapes shape_04">
      </div>
      <!-- breadcrumb area end -->

      <!-- project details v2 area start -->
      <project-details-v2-area />
      <!-- project details v2 area end -->

      <!-- fancy banner area start -->
      <fancy-banner-three></fancy-banner-three>
      <!-- fancy banner area end -->
  </nuxt-layout>
</div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false });
useSeoMeta({ title: "Project Details v2 - Babun" });
</script>
