<template>
  <div>
    <!-- breadcrumb area start -->
    <breadcrumb-one
      title="Our offerings & Services"
      subtitle="Offering solutions & services to address a spectrum of financial issues"
      page="Services"
      bg_img="/images/media/img_32.jpg"
      :style_2="true"
      cls="me-xxl-4 me-lg-5"
    />
    <!-- breadcrumb area end -->

    <!-- service area start -->
    <service-v1-area />
    <!-- service area end -->

    <!-- feedback area start -->
    <feedback-two spacing="pt-120 pb-120" />
    <!-- feedback area end -->

    <!-- partners logo start -->
    <div class="partner-logo-one pt-80 lg-pt-50 pb-80 lg-pb-50">
      <div class="container">
        <partner-slider-one />
      </div>
    </div>
    <!-- partners logo end -->

    <!-- fancy banner area start -->
    <fancy-banner-five :style_2="true" />
    <!-- fancy banner area end -->

    <!-- faq area start -->
    <faq-area-one spacing="mt-150 lg-mt-80 mb-150 lg-mb-80"/>
    <!-- faq area end -->

    <!-- fancy banner area start -->
    <fancy-banner-three />
    <!-- fancy banner area end -->

    <!-- news letter area start -->
    <newsletter-one />
    <!-- news letter area end -->
  </div>
</template>

<script setup lang="ts">
useSeoMeta({ title: "Service v1 - Babun" });
</script>
