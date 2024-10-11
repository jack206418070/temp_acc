<template>
  <div>
    <nuxt-layout name="layout-one">
      <!-- breadcrumb area start -->
      <breadcrumb-two
        title="Our Talented Experts"
        subtitle="Meet our experts, guiding through financial intricacies with precision"
        page="Team"
        col="col-xl-7"
      />
      <!-- breadcrumb area end -->

      <!-- team v2 area start -->
      <team-area-five></team-area-five>
      <!-- team v2 area end -->

      <!-- fancy banner area start -->
      <fancy-banner-three></fancy-banner-three>
      <!-- fancy banner area end -->
    </nuxt-layout>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false });
useSeoMeta({ title: "Team v2 - Babun" });
</script>
