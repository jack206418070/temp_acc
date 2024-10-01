<template>
  <div>
    <!-- breadcrumb area start -->
    <breadcrumb-one
      title="新聞與公告"
      subtitle="Meet our experts, guiding you through financial intricacies with precision"
      page="新聞與公告"
      bg_img="/images/media/img_32.jpg"
      :style_2="true"
      shape="/images/shape/shape_34.svg"
    />
    <!-- breadcrumb area end -->

    <!-- blog area start -->
    <blog-list-area />
    <!-- blog area end -->

    <!-- news letter area start -->
    <newsletter-one />
    <!-- news letter area end -->
  </div>
</template>

<script setup lang="ts">
useSeoMeta({ title: "Blog - Babun" });
</script>
