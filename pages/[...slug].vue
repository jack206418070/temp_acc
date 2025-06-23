<template>
  <!-- 這個頁面不應該被渲染，應該重定向到 /notfound -->
  <div>重定向中...</div>
</template>

<script setup lang="ts">
// Catch-all 路由：重定向所有不存在的頁面到 /notfound

const route = useRoute();

// 避免 /notfound 自己重定向造成無限循環
if (route.path === '/notfound') {
  // 如果已經在 notfound 頁面，不執行重定向
} else {
  // 設定伺服器端的 404 狀態碼
  if (process.server) {
    setResponseStatus(404);
  }

  // 立即重定向到 notfound 頁面
  await navigateTo('/notfound', { replace: true });
}
</script> 