<template>
  <div>
    <!-- breadcrumb area start -->
    <breadcrumb-one
      title="最新消息"
      subtitle="計劃最新消息"
      page="最新消息"
      bg_img="/images/banner/banner_2.png"
      :style_2="true"
    />
    <!-- breadcrumb area end -->

    <!-- blog area start -->
    <news-list-area />
    <!-- blog area end -->

  
  </div>
</template>

<script setup lang="ts">
useSeoMeta({ title: "最新消息 ｜ 多元陪伴照顧服務計畫" });
</script>
