<template>
 <div>
  <!-- breadcrumb area start -->
  <breadcrumb-one
    title="關於我們"
    subtitle="致力於提供高品質的多元陪伴照顧服務,打造友善的高齡社會"
    page="關於我們"
    shape="/images/shape/shape_26.svg"
    bg_img="/images/media/img_32.jpg"
    :style_2="true"
    cls="me-xxl-4 me-lg-5"
  />
  <!-- breadcrumb area end -->

  <!-- 計畫簡介區塊 -->
  <aboutus-purpose-area />

  <service-targer />  


 </div>
</template>

<script setup lang="ts">
useSeoMeta({ title: "關於我們 - 多元陪伴照顧服務計畫" });
</script>
