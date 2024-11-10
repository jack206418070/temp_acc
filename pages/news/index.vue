<template>
  <div>
    <!-- breadcrumb area start -->
    <breadcrumb-one
      title="最新消息"
      subtitle="計劃最新消息"
      page="最新消息"
      bg_img="/images/media/img_32.jpg"
      :style_2="true"
      shape="/images/shape/shape_34.svg"
    />
    <!-- breadcrumb area end -->

    <!-- blog area start -->
    <news-list-area />
    <!-- blog area end -->

  
  </div>
</template>

<script setup lang="ts">
useSeoMeta({ title: "最新消息 ｜ 多元陪伴照顧服務計劃" });
</script>
