<template>
  <div class="home-banner">
    <div v-if="activeBanner" class="main-container home-bg" :style="bannerStyle"></div>
    <div v-else class="main-container home-bg"></div>
  </div>
	
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

const activeBanner = ref(null);
const bannerStyle = computed(() => {
  if (activeBanner.value) {
    return {
      backgroundImage: `url(data:${activeBanner.value.imageType};base64,${activeBanner.value.imageData})`,
      backgroundPosition: 'center center',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat'
    };
  }
  return {};
});

// 載入啟用中的 banner
async function loadActiveBanner() {
  try {
    const response = await $fetch('/api/banners', {
      params: {
        active: 1
      }
    });
    if (response.success && response.data?.length > 0) {
      activeBanner.value = response.data[0];
    }
  } catch (error) {
    console.error('載入 Banner 失敗:', error);
  }
}

// 頁面載入時獲取 banner
onMounted(() => {
  loadActiveBanner();
});
</script>
<style scoped>
.home-banner {
  background-color: #41BBBE;
}
.home-bg {
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
  height: 302px;
}
@media (max-width: 991px) {
  .home-banner {
    padding: 0 15px;
  }
  .home-bg {
    height: 202px;
  }
}
</style>