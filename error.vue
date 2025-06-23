<template>
  <div class="main-page-wrapper">
    <header-one></header-one>

    <main>
      <div class="error-page text-center d-flex align-items-center justify-content-center flex-column light-bg position-relative">
        <div class="error-content">
          <h1 class="font-magnita display-1 mb-4" style="font-size: 8rem; color: #ff6b6b;">404</h1>
          <h2 class="fw-bold mb-3">糟糕！找不到此頁面</h2>
          <p class="text-lg mb-4 text-muted">
            您訪問的頁面可能已被移動、刪除，或者您輸入了錯誤的網址。
          </p>
          <div class="d-flex justify-content-center gap-3 flex-wrap">
            <nuxt-link href="/" class="btn btn-primary btn-lg">
              <i class="bi bi-house-fill me-2"></i>回到首頁
            </nuxt-link>
            <button class="btn btn-outline-secondary btn-lg" @click="goBack">
              <i class="bi bi-arrow-left me-2"></i>返回上頁
            </button>
          </div>
        </div>
        
        <!-- 裝飾性圖形 -->
        <img src="/images/assets/ils_05.svg" alt="" class="lazy-img shapes shape_01" style="opacity: 0.1;">
        <img src="/images/assets/ils_06.svg" alt="" class="lazy-img shapes shape_02" style="opacity: 0.1;">
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
// 設定頁面配置
definePageMeta({ 
  layout: false 
});

// 頁面 SEO 設定
useSeoMeta({
  title: '404 - 頁面不存在 | 多元陪伴照顧服務試辦計畫',
  description: '抱歉，您訪問的頁面不存在。',
  robots: 'noindex, nofollow'
});

// 返回上一頁功能
const goBack = () => {
  if (typeof window !== 'undefined') {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      // 如果沒有歷史記錄，重定向到首頁
      navigateTo('/');
    }
  }
};
</script>