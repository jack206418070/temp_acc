<template>
 <div>
  <nuxt-layout name="layout-one">
    <!-- breadcrumb area start -->
      <breadcrumb-two
        page="簡介"
        title="簡介"
        subtitle="Offering solutions & services to address a spectrum of financial issues"
        col="col-xl-8"
        :style_2="true"
      />
      <!-- breadcrumb area end -->

      <!-- service v2 area start -->
      <service-v2-area />
      <!-- service v2 area end -->

      <!-- fancy banner area start -->
      <fancy-banner-six></fancy-banner-six>
      <!-- fancy banner area end -->

      <!-- feedback area start -->
      <feedback-four spacing="mt-150 lg-mt-80" />
      <!-- feedback area end -->

      <!-- fancy banner area start -->
      <fancy-banner-three></fancy-banner-three>
      <!-- fancy banner area end -->
  </nuxt-layout>
 </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false });
useSeoMeta({ title: "Service v2 - Babun" });
</script>
