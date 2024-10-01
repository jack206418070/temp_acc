<template>
  <div>
    <nuxt-layout name="layout-one">
      <!-- breadcrumb area start -->
      <breadcrumb-two
        title="教育與資源"
        subtitle="Offering solutions & services to address a of financial issues"
        page="教育與資源"
        col="col-lg-8"
      />
      <!-- breadcrumb area end -->

      <!-- project area start -->
      <project-v1-area />
      <!-- project area end -->

      <!-- fancy banner area start -->
      <fancy-banner-three></fancy-banner-three>
      <!-- fancy banner area end -->
    </nuxt-layout>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false });
useSeoMeta({ title: "Project v1 - Babun" });
</script>
