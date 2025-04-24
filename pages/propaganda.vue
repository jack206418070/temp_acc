<template>
  <div class="main-container">
    <div class="tab-list">
      <div class="tab-item" :class="{activated: tab_type === '1'}" @click="changeTab('1')">懶人包</div>
      <div class="tab-item" :class="{activated: tab_type === '2'}" @click="changeTab('2')">宣導資料</div>
    </div>
    <h2 class="default-title">
      {{ tab_data[tab_type].type }}
    </h2>
    
    <!-- 載入中提示 -->
    <div v-if="isLoading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>載入中...</p>
    </div>
    
    <!-- 資料列表 -->
    <div v-else class="tab-data-list" :class="{'block2': tab_type != '1'}">
      <template v-if="tab_type == '1'">
        <div class="tab-data-item" v-for="(data, index) in tab_data[tab_type].data" :key="data.kid" @click="openPopup(index)">
          <img :src="data.image" :alt="data.title">
        </div>
      </template>
      <template v-else>
        <div class="tab-data-item-block2" v-for="(data, index) in tab_data[tab_type].data" :key="data.kid" @click="openPopup(index)">
          <img :src="data.image" :alt="data.title">
        </div>
      </template>
    </div>
    
    <!-- 彈出視窗 -->
    <div v-if="showPopup" class="popup-overlay" @click.self="closePopup">
      <div class="popup-content">
        <button class="arrow left" v-if="currentIndex > 0" @click="prevImage">‹</button>
        <a v-if="tab_data[tab_type].data[currentIndex]?.image_url" 
           :href="tab_data[tab_type].data[currentIndex]?.image_url" 
           target="_blank"
           class="image-link">
          <img :src="tab_data[tab_type].data[currentIndex]?.image" :alt="tab_data[tab_type].data[currentIndex]?.title" />
          <span class="link-hint">點擊圖片開啟原始連結</span>
        </a>
        <img v-else 
             :src="tab_data[tab_type].data[currentIndex]?.image" 
             :alt="tab_data[tab_type].data[currentIndex]?.title" />
        <button class="arrow right" v-if="currentIndex < tab_data[tab_type].data.length - 1" @click="nextImage">›</button>
        <button class="close-btn" @click="closePopup">×</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

const tab_data = ref({
  '1': {
    type: '懶人包',
    data: []
  },
  '2': {
    type: '宣導資料',
    data: []
  }
});
const tab_type = ref('1');
const showPopup = ref(false);
const currentIndex = ref(0);
const isLoading = ref(false);
const blobUrls = ref([]); // 儲存所有創建的 Blob URLs

// 清理 Blob URLs
const cleanupBlobUrls = () => {
  blobUrls.value.forEach(url => URL.revokeObjectURL(url));
  blobUrls.value = [];
};

// 將二進制數據轉換為 Blob URL
const createBlobUrl = (imageData) => {
  const blob = new Blob([imageData], { type: 'image/jpeg' });
  const url = URL.createObjectURL(blob);
  blobUrls.value.push(url);
  return url;
};

// 獲取知識列表
const fetchKnowledgeList = async (category) => {
  try {
    isLoading.value = true;
    cleanupBlobUrls(); // 清理舊的 Blob URLs
    
    const response = await $fetch(`/api/knowledge?category=${category}&includeImage=true`, {
      headers: {
        'Accept': 'application/json'
      }
    });
    
    // 將 API 回傳的資料轉換成需要的格式
    const formattedData = response.data.map(item => {
      // 將 base64 字符串轉換為二進制數據
      const binaryString = atob(item.image_base64);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      
      // 創建 Blob URL
      const blob = new Blob([bytes], { type: item.image_type || 'image/jpeg' });
      const imageUrl = URL.createObjectURL(blob);
      blobUrls.value.push(imageUrl);
      
      return {
        kid: item.kid,
        title: item.title,
        image: imageUrl,
        image_url: item.image_url,
        display_order: item.display_order
      };
    });
    
    // 根據 display_order 排序
    formattedData.sort((a, b) => a.display_order - b.display_order);
    
    // 更新對應類別的資料
    tab_data.value[category].data = formattedData;
  } catch (error) {
    console.error('獲取資料失敗:', error);
  } finally {
    isLoading.value = false;
  }
};

// 切換分類
const changeTab = async (type) => {
  tab_type.value = type;
  await fetchKnowledgeList(type);
};

// 初始化時獲取第一個分類的資料
onMounted(async () => {
  console.log('onMounted')
  await fetchKnowledgeList('1');
});

// 組件銷毀前清理 Blob URLs
onBeforeUnmount(() => {
  cleanupBlobUrls();
});

const openPopup = (index) => {
  currentIndex.value = index;
  showPopup.value = true;
  document.body.style.overflow = 'hidden';
};

const closePopup = () => {
  showPopup.value = false;
  document.body.style.overflow = '';
};

const prevImage = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
};

const nextImage = () => {
  if (currentIndex.value < tab_data.value[tab_type.value].data.length - 1) {
    currentIndex.value++;
  }
};
useSeoMeta({ title: "懶人包/宣導資料｜ 多元陪伴照顧服務計畫" });
</script>

<style scoped>
h1, h2 {
  text-align: center;
}
.tab-data-list {
  display: flex;
  gap: 2%;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 100px;
}
.tab-data-list.block2 {
  justify-content: center;
}
.tab-data-item {
  flex: 0 0 32%;
  border-radius: 30px;
  margin-bottom: 30px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
}
.tab-data-item::after {
  content: ""; /* 確保非 hover 狀態下也存在 */
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: hsla(41, 15%, 50%, 0); /* 初始為透明 */
  z-index: 100;
  transition: all .5s;
}
.tab-data-item-block2 {
  flex: 0 0 50%;
  border-radius: 30px;
  margin-bottom: 30px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
}
.tab-data-item:hover::after{
  background-color: hsla(41, 15%, 50%, 0.5);
}
.tab-data-item img {
  object-fit: contain;
  display: block;
}
.tab-list {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 30px;
}
.tab-list .tab-item {
  padding: 5px 40px;
  color: #0C4426;
  border: 3px solid #EC6717;
  transition: all .5s;
  border-radius: 10px;
  font-size: 17px;
  cursor: pointer;
}
.tab-list .tab-item.activated, .tab-list .tab-item:hover {
  color: #fff;
  border: 3px solid #EC6717;
  background-color: #41BBBE;
}
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(245, 222, 179, 0.9); /* 米色背景 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup-content {
  position: relative;
  max-width: 80%;
  max-height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.popup-content img {
  max-width: 100%;
  max-height: 100%;
  border-radius: 10px;
}

.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #333;
  z-index: 1001;
}

.arrow.left {
  left: -50px;
  font-size: 3rem;
}

.arrow.right {
  right: -50px;
  font-size: 3rem;
}

.close-btn {
  position: absolute;
  top: -20px;
  right: -20px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
@media (max-width: 991px) {
  .tab-data-list {
    gap: 0;
    justify-content: center;
  }
  .popup-content img {
    max-width: 80%;
  }
  .tab-data-item {
    flex: 0 0 90%;
    margin-bottom: 20px;
  }
  .default-title {
    margin-bottom: 25px;
  }
  .tab-list {
    justify-content: center;
  }
  .popup-content {
    max-width: 90%;
    max-height: 70%;
  }

  .arrow.left {
    left: 10px;
    font-size: 3rem;
    z-index: 1000;
  }

  .arrow.right {
    right: 10px;
    font-size: 3rem;
    z-index: 1000;
  }

  .close-btn {
    top: -10px;
    right: 30px;
    font-size: 1.2rem;
    width: 30px;
    height: 30px;
  }
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #41BBBE;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.image-link {
  display: block;
  position: relative;
  text-decoration: none;
}

.link-hint {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 14px;
  opacity: 0;
  transition: opacity 0.3s;
}

.image-link:hover .link-hint {
  opacity: 1;
}

@media (max-width: 991px) {
  .link-hint {
    font-size: 12px;
    padding: 3px 8px;
    bottom: 5px;
  }
}
</style>