<template>
  <div>
    <div class="service-banner" v-if="serviceUnit">
      <div class="main-container">
        <div class="img">
          <img :src="`/api/service-unit/${serviceUnit.id}/price-image`" :alt="serviceUnit.name" />
        </div>
      </div>
    </div>
    <div v-else-if="error" class="error-container">
      <p>{{ error }}</p>
    </div>
    <div v-else class="loading-container">
      <p>載入中...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useSeoMeta } from '#imports';

interface ServiceUnit {
  id: number;
  name: string;
}

const serviceUnit = ref<ServiceUnit | null>(null);
const error = ref<string | null>(null);

// 取得路由參數中的 id
const route = useRoute();

// 獲取服務單位資料
async function fetchServiceUnit(id: string) {
  try {
    const response = await $fetch(`/api/service-unit/${id}`);
    if (response.success) {
      serviceUnit.value = response.data;
      
      // 設定 SEO 標題
      useSeoMeta({
        title: `${response.data.name} - 收費標準｜多元陪伴照顧服務計畫`
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
  if (idParam) {
    await fetchServiceUnit(idParam);
  } else {
    error.value = '無效的服務單位 ID';
  }
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