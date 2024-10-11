<template>
  <div>
    <!-- breadcrumb area start -->
    <breadcrumb-one
      title="服務介紹"
      subtitle="提供全面的照顧解決方案,滿足不同族群的多元需求"
      page="服務介紹"
      shape="/images/shape/shape_26.svg"
      bg_img="/images/media/img_32.jpg"
      :style_2="true"
      cls="me-xxl-4 me-lg-5"
    />
    <!-- breadcrumb area end -->

    <!-- service area start -->
    <service-area />
    <!-- service area end -->
    <!-- team v1 area start -->
    <team-area-four />
    <!-- team v1 area end -->
    <service-details-area />

  </div>
</template>

<script setup lang="ts">
useSeoMeta({ title: "服務介紹 - 多元陪伴照顧服務計畫" });
</script>
