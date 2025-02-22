<template>
  <div class="admin-layout">
    <div v-if="isLoading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>載入中...</p>
    </div>
    <div v-else>
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const isLoading = ref(true);

onMounted(() => {
  // 給一個短暫的延遲確保樣式都載入完成
  setTimeout(() => {
    isLoading.value = false;
  }, 100);
});
</script>

<style lang="scss" scoped>
.admin-layout {
  min-height: 100vh;
  background-color: #f8f9fa;
}

/* Loading 樣式 */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f8f9fa;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #41BBBE;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading-container p {
  margin-top: 1rem;
  color: #41BBBE;
  font-size: 14px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style> 