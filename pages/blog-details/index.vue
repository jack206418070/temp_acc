<template>
  <div>
    <!-- breadcrumb area start -->
    <breadcrumb-one
      title="Single Blog Details"
      subtitle="Meet our experts, guiding you through financial intricacies with precision"
      page="Blog"
      bg_img="/images/media/img_32.jpg"
      shape="/images/shape/shape_35.svg"
      :style_2="true"
    />
    <!-- breadcrumb area end -->

    <!-- blog details area start -->
    <blog-details-area :blog="blog" />
    <!-- blog details area end -->

    <!-- fancy banner area start -->
    <fancy-banner-three></fancy-banner-three>
    <!-- fancy banner area end -->

    <!-- news letter area start -->
    <newsletter-one />
    <!-- news letter area end -->
  </div>
</template>

<script setup lang="ts">
import blog_data from "@/data/blog-data";

useSeoMeta({ title: "Blog Details - Babun" });
const blog = blog_data[0];
</script>
