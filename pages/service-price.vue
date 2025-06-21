<template>
  <div>
    <div class="service-banner" v-if="serviceUnit">
      <div class="main-container">
        <div class="img">
          <img 
            :src="`/api/service-unit/${serviceUnit.id}/price-image`" 
            :alt="sanitizeText(serviceUnit.name)"
            @error="handleImageError"
          />
        </div>
      </div>
    </div>
    <div v-else-if="error" class="error-container">
      <p v-html="sanitizeHtml(error)"></p>
    </div>
    <div v-else class="loading-container">
      <p>載入中...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useSeoMeta } from '#imports';

interface ServiceUnit {
  id: number;
  name: string;
}

const serviceUnit = ref<ServiceUnit | null>(null);
const error = ref<string | null>(null);

// 取得路由參數中的 id
const route = useRoute();
const router = useRouter();

// 輸入驗證函數
function validateId(input: any): string | null {
  // 轉換為字符串並移除所有非數字字符
  const cleaned = String(input).replace(/[^\d]/g, '');
  const num = parseInt(cleaned, 10);
  
  // 檢查是否為有效的正整數
  if (isNaN(num) || num <= 0 || num > 2147483647) {
    return null;
  }
  
  return cleaned;
}

// 檢測惡意模式
function containsMaliciousPatterns(input: any): boolean {
  const maliciousPatterns = [
    /^https?:\/\//i,
    /^ftp:\/\//i,
    /^javascript:/i,
    /^data:/i,
    /[a-zA-Z0-9-]+\.[a-zA-Z]{2,}/,
    /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/,
    /<script/i,
    /<iframe/i,
    /on\w+\s*=/i,
    /[<>'"&]/
  ];

  const inputStr = String(input);
  return maliciousPatterns.some(pattern => pattern.test(inputStr));
}

// 清理文本內容
function sanitizeText(text: string): string {
  if (!text) return '';
  return text
    .replace(/[<>'"&]/g, '') // 移除 HTML 特殊字符
    .replace(/javascript:/gi, '') // 移除 JavaScript 協議
    .replace(/on\w+\s*=/gi, '') // 移除事件處理器
    .replace(/\x00-\x1f/g, '') // 移除控制字符
    .trim();
}

// 清理 HTML 內容 (只允許純文本)
function sanitizeHtml(html: string): string {
  if (!html) return '';
  return sanitizeText(html);
}

// 處理圖片載入錯誤
function handleImageError(event: Event) {
  const img = event.target as HTMLImageElement;
  img.style.display = 'none';
  error.value = '無法載入價格圖片';
}

// 獲取服務單位資料
async function fetchServiceUnit(id: string) {
  try {
    const response = await $fetch(`/api/service-unit/${id}`);
    if (response.success) {
      serviceUnit.value = response.data;
      
      // 設定 SEO 標題 (清理輸出)
      const cleanTitle = sanitizeText(response.data.name);
      useSeoMeta({
        title: `${cleanTitle} - 收費標準｜多元陪伴照顧服務計畫`
      });
    } else {
      throw new Error(response.message || '獲取資料失敗');
    }
  } catch (err) {
    console.error('獲取服務單位資料失敗:', err);
    error.value = '獲取資料失敗，請稍後再試';
  }
}

onMounted(async () => {
  const idParam = route.query.id as string;
  
  // 驗證 ID 參數
  if (!idParam) {
    error.value = '缺少服務單位 ID';
    return;
  }
  
  // 檢測惡意模式
  if (containsMaliciousPatterns(idParam)) {
    console.warn('🚨 Malicious input detected in service-price:', idParam);
    error.value = '無效的參數格式';
    
    // 重定向到 404 頁面
    await navigateTo('/notfound', { replace: true });
    return;
  }
  
  // 驗證 ID 格式
  const validId = validateId(idParam);
  if (!validId) {
    error.value = '無效的服務單位 ID 格式';
    return;
  }
  
  await fetchServiceUnit(validId);
});
</script>

<style scoped>
.service-banner {
  padding: 2rem 0;
}

.img {
  max-width: 100%;
  text-align: center;
}

.img img {
  max-width: 100%;
  height: auto;
}

.error-container {
  text-align: center;
  padding: 2rem;
  color: #dc3545;
}

.loading-container {
  text-align: center;
  padding: 2rem;
}
</style>