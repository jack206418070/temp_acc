<template>
  <div class="home-banner">
    <div class="main-container">
      <Swiper
        v-if="activeBanners.length > 0"
        :modules="[SwiperAutoplay, SwiperPagination, SwiperNavigation]"
        :slides-per-view="1"
        :loop="true"
        :autoplay="{
          delay: 5000,
          disableOnInteraction: false
        }"
        :pagination="{
          clickable: true
        }"
        :navigation="true"
        class="banner-swiper"
      >
        <SwiperSlide v-for="banner in activeBanners" :key="banner.id">
          <div class="home-bg" :style="getBannerStyle(banner)"></div>
        </SwiperSlide>
      </Swiper>
      <div v-else class="home-bg"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const activeBanners = ref([]);
const SwiperAutoplay = Autoplay;
const SwiperPagination = Pagination;
const SwiperNavigation = Navigation;

// 取得 Banner 樣式
const getBannerStyle = (banner) => {
  return {
    backgroundImage: `url(data:${banner.imageType};base64,${banner.imageData})`,
    backgroundPosition: 'center center',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat'
  };
};

// 載入啟用中的 banner
async function loadActiveBanners() {
  try {
    const response = await $fetch('/api/banners', {
      params: {
        active: 1
      }
    });
    if (response.success && response.data?.length > 0) {
      activeBanners.value = response.data;
    }
  } catch (error) {
    console.error('載入 Banner 失敗:', error);
  }
}

// 頁面載入時獲取 banner
onMounted(() => {
  loadActiveBanners();
});
</script>

<style scoped>
.home-banner {
  background-color: #41BBBE;
}

.banner-swiper {
  width: 100%;
  height: 100%;
}

.home-bg {
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
  height: 302px;
}

:deep(.swiper-pagination-bullet) {
  background: #fff;
  opacity: 0.5;
}

:deep(.swiper-pagination-bullet-active) {
  background: #fff;
  opacity: 1;
}

:deep(.swiper-button-prev),
:deep(.swiper-button-next) {
  color: #fff;
}

:deep(.swiper-button-prev:after),
:deep(.swiper-button-next:after) {
  font-size: 24px;
}

@media (max-width: 991px) {
  .home-banner {
    padding: 0 15px;
  }
  .home-bg {
    height: 202px;
  }
  :deep(.swiper-button-prev:after),
  :deep(.swiper-button-next:after) {
    font-size: 20px;
  }
}
</style>