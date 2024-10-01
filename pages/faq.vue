<template>
  <div>
    <nuxt-layout name="layout-one">
      <!-- breadcrumb area start -->
      <breadcrumb-two
        title="Questions & Answers"
        subtitle="Find out the all the question & answers you have about us"
        page="FAQ’s"
        col="col-xl-7"
      />
      <!-- breadcrumb area end -->

      <!-- faq area start -->
      <faq-area-three></faq-area-three>
      <!-- faq area end -->

      <!-- fancy banner area start -->
      <fancy-banner-three></fancy-banner-three>
      <!-- fancy banner area end -->
    </nuxt-layout>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false });
useSeoMeta({ title: "Pricing - Babun" });
</script>
