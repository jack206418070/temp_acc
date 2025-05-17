<template>
  <div class="service-unit-container">
    <div class="main-container">
      <div class="service-tab">
        <button v-for="tab in tabs" :key="tab.id"
          :class="['service-tab-btn', { active: currentTab === tab.id }]" @click="handleTabChange(tab.id)">
          {{ tab.name.split('-')[0] }}
          <span>{{ tab.name.split('-')[1] }}</span>
        </button>
      </div>
      <div class="tab-content mt-60 lg-mt-40">
        <!-- Loading 狀態 -->
        <div v-if="isLoading" class="loading-container">
          <div class="loading-spinner"></div>
          <p>載入中...</p>
        </div>
        <!-- 錯誤狀態 -->
        <div v-else-if="error" class="error-container">
          <p>{{ error }}</p>
          <button @click="fetchAllVendorData" class="retry-btn">重試</button>
        </div>
        <!-- 廠商卡片列表 -->
        <div v-else id="location-block" class="vendor-grid">
          <div v-for="vendor in filteredVendors" :key="vendor.id" class="vendor-card">
            <img :src="`/api/service-unit/${vendor.id}/unit-image`" :alt="vendor.name" class="vendor-image" />
            <div class="vendor-info">
              <p v-html="vendor.name" style="text-align: left; padding: 15px 0; font-size: 20px;"></p>
              <p class="vendor-category">
                <span class="vendor-category-tag" v-for="item in vendor.serviceArea.split(',')">{{ item }}</span>
              </p>
              <a href="#" class="vendor-contact">{{ vendor.phone }}</a>
              <a href="#" class="vendor-email">{{ vendor.email }}</a>
              <div class="vender-deatil-info">
                <a :href="`/service-price?id=${vendor.id}`" class="vender-detail-price">服務價格</a>
                <a :href="vendor.website" target="_blank" class="vender-detail-web">單位網站</a>
              </div>
              <a class="book-btn" href="https://serve-mcs.wda.gov.tw">我要預約</a>
            </div>
          </div>
        </div>
      </div>
      <p class="service-note">*離島地區於未來計畫擴充時建置 <br> <a class="template-btn" href="https://drive.google.com/drive/folders/1XQkk8vrucc-l2xYapD9JMFFjG3p6hpQ-?usp=sharing">合約範本</a></p>
    </div>
  </div>
</template>

<script setup lang="ts">
const tabs = [
  { id: "north", name: "北區-北北基桃竹" },
  { id: "central", name: "中區-苗中彰投雲" },
  { id: "south", name: "南區-嘉南高屏" },
  { id: "east", name: "東區-宜花東" },
];

const currentTab = ref("north");
const vendorData = ref([]);
const isLoading = ref(false);
const error = ref(null);

// 獲取所有服務單位資料
async function fetchAllVendorData() {
  isLoading.value = true;
  error.value = null;
  try {
    const response = await $fetch('/api/service-unit', {
      query: {
        includePriceImage: false
      }
    });
    vendorData.value = response.data;
  } catch (err) {
    console.error('獲取服務單位資料失敗:', err);
    error.value = '獲取資料失敗，請稍後再試';
  } finally {
    isLoading.value = false;
  }
}

// 處理分頁切換
function handleTabChange(tabId) {
  currentTab.value = tabId;
}

// 過濾廠商列表
const filteredVendors = computed(() => {
  return vendorData.value.filter(vendor => vendor.region === currentTab.value);
});

// 初始載入資料
onMounted(async () => {
  await fetchAllVendorData();
});
</script>

<style scoped>
  p {
    margin-bottom: 0;
  }
  .service-unit-container {
    padding: 0.5rem;
    margin-bottom: 100px;
  }

  .area-tabs {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .service-tab {
    display: flex;
  }
  .service-tab-btn {
    flex: 0 0 25%;
    cursor: pointer;
    padding: 20px 0;
    text-align: center;
    transition: all 0.3s;
  }
  .service-tab-btn:hover, .service-tab-btn.active {
    background-color: #41BBBE;
  }

  .service-tab-btn span {
    display: block;
    font-size: 14px;
    text-align: center;
  }
  .tab-btn {
    padding: 0.5rem 2rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    background: white;
    cursor: pointer;
    color: rgba(0, 0, 0, 0.5);
  }

  .vendor-grid {
    display: flex;
    align-items: stretch;
    justify-content: center;
    gap: 2rem;
    flex-wrap: wrap;
  }

  .vendor-card {
    flex: 0 0 30%;
    border: 1px solid #eee;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.6);
    padding-bottom: 12px;
  }

  .vendor-image {
    width: 100%;
    object-fit: cover;
  }

  .vendor-info {
    padding: 0 25px;
  }
  .vendor-category {
    color: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5%;
    margin-bottom: 15px;
  }
  .vendor-category-tag {
    background-color: #41BBBE;
    color: #fff;
    padding: 0px 12px;
    font-size: 18px;
    border-radius: 15px;
    cursor: pointer;
    transition: .3s;
    align-self: stretch;
    cursor: default;
  }

  .vendor-area {
    color: #000;
    font-size: 1rem;
  }

  .vendor-address {
    color: #000;
    font-size: 1rem;
  }

  .vendor-description {
    font-size: 0.9rem;
    line-height: 1.5;
  }

  .service-note {
    margin-top: 20px;
    font-size: 18px;
    text-align: right;
  }

  .vendor-rating {
    margin: 0.5rem 0;
  }

  .star {
    color: #ddd;
    margin-right: 2px;
  }
  .vendor-contact, .vendor-email {
    text-align: center;
    font-size: 1.5rem;
    display: block;
    margin-bottom: 10px;
  }
  .star .filled {
    color: #ffd700;
  }
  .vender-deatil-info {
    display: flex;
    justify-content: center;
    gap: 40px;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .vender-deatil-info a {
    transition: .3s;
    cursor: pointer;
  }
  .vender-deatil-info a:hover {
    color: #0c4426;
    font-weight: 500;
  }
  .book-btn {
    text-align: center;
    display: block;
    width: 50%;
    margin: 0 auto;
    background-color: #ec6717;
    color: #fff;
    border-radius: 20px;
    padding: 3px 10px;
  }
  .vender-detail-price {
    padding: 3px 10px;
    border: 2px solid #0c4426;
    border-radius: 20px;
    transition: .3s;
  }
  .vender-detail-price:hover {
    background-color: #0c4426;
    color: #fff !important;
  }
  .vender-detail-web {
    padding: 3px 8px;
    border: 2px solid #0c4426;
    border-radius: 20px;
    transition: .3s;
  }
  .vender-detail-web:hover {
    background-color: #0c4426;
    color: #fff !important;
  }
  .template-btn {
    color: #fff;
    font-size: 18px;
    background-color: #41BBBE;
    padding: 3px 10px;
    transition: .3s;
  }
  .template-btn:hover {
    background-color:#0c4426;
  }
  @media (max-width: 991px) {
    .service-unit-container {
      margin-bottom: 50px;
    }
    .vendor-card {
      flex: 0 0 100% !important;
    }
    .vendor-category-tag {
      font-size: 16px;
      padding: 0px 10px;
    }
  }

  .loading-container {
    text-align: center;
    padding: 2rem;
  }

  .loading-spinner {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #41BBBE;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
    margin: 0 auto 1rem;
  }

  .error-container {
    text-align: center;
    padding: 2rem;
    color: #dc3545;
  }

  .retry-btn {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background-color: #41BBBE;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .retry-btn:hover {
    background-color: #0c4426;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>
