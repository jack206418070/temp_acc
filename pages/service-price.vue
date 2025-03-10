<template>
  <div>
    <div class="service-banner" v-if="price_data">
      <div class="main-container">
        <div class="img">
          <img :src="price_data.image_url" :alt="price_data.meta_data.name" />
        </div>
      </div>
    </div>
    <div v-else>
      <p></p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import { useSeoMeta } from '#imports';
  import { gsap } from 'gsap';
  
  // 定義 price_data 變數
  const price_data = ref<{
    image_url: string;
    id: string;
    meta_data: Record<string, any>;
  } | null>(null);
  
  // 模擬資料庫資料
  const allPrices = [
    {
      id: '1',
      image_url: '/images/assets/紅十字-price.avif',
      meta_data: { name: '中華民國紅十字會' }
    },
    {
      id: '2',
      image_url: '/images/assets/永信-price.avif',
      meta_data: { name: '財團法人台灣省私立永信社會福利基金會' }
    },
    {
      id: '3',
      image_url: '/images/assets/財團法人-price.avif',
      meta_data: { name: '財團法人臺中市私立童庭社會福利慈善事業基金會' }
    },
    {
      id: '4',
      image_url: '/images/assets/南投-price.avif',
      meta_data: { name: '社團法人南投縣新媳婦關懷協會' }
    },
    {
      id: '5',
      image_url: '/images/assets/kao-price.avif',
      meta_data: { name: '社團法人台灣萬人社福協會' }
    },
    {
      id: '6',
      image_url: '/images/assets/haland-price.avif',
      meta_data: { name: '社團法人花蓮縣家庭照顧者關懷協會' }
    }
  ];
  
  // 取得路由參數中的 id
  const route = useRoute();
  
  onMounted(() => {
    const idParam = route.query.id as string;
    if (idParam) {
      const found = allPrices.find(item => item.id === idParam);
      if (found) {
        price_data.value = found;
  
        // 設定 SEO 標題
        useSeoMeta({
          title: `${found.meta_data.name} - 收費標準｜多元陪伴照顧服務計畫`
        });
      }
    }
  });
  </script>

<style scoped>
</style>