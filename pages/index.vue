<template>
  <div>
    <hero-banner-empty-index />

    <div
      class="container bg-white position-relative "
    >
      <div class="d-flex justify-content-center" >
        <h2>最新消息</h2>

        <div class="section-btn sm-mt-40">
          <nuxt-link href="/news" class="btn-five icon-link">
            <span class="text">閱讀更多</span>
            <div
              class="icon tran3s rounded-circle d-flex align-items-center justify-content-center"
            >
              <i class="bi bi-arrow-up-right"></i>
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>

    <!-- 文字特徵區域開始 -->
    <!-- <text-feature-index /> -->
    <!-- 文字特徵區域結束 -->

    <!-- 常見問題區域開始 -->
    <!-- <faq-area-index /> -->
    <!-- 常見問題區域結束 -->
  </div>
</template>

<script setup lang="ts">
useSeoMeta({ title: "多元陪伴照顧服務" });
</script>


<style scoped>
.theme-main-menu {
}
</style>